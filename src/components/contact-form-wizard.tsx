"use client";

import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, PROJECT_LOCATIONS, type ContactSchema } from "@/lib/contact-schema";

const projectTypes = ["Full Custom Build", "Remodel / Addition to Home", "Investment Property", "ADU"] as const;
const budgetRanges = ["$500K-$1M", "$1M-$3M", "$3M-$7M", "$7M-$15M", "$15M+"] as const;
const timelines = ["ASAP", "1–3 months", "3–6 months", "6–12 months", "12+ months"] as const;
const drawingStatuses = [
  "Just exploring ideas",
  "Planning or early design",
  "Plans in progress",
  "Plans complete / Permits pending",
  "Permits approved / Ready to Build",
] as const;

const STEPS = [
  { id: 1, title: "Tell us about the project", fields: ["projectType", "budgetRange", "timeline"] as const },
  { id: 2, title: "Where things stand", fields: ["drawingsStatus", "projectLocation"] as const },
  { id: 3, title: "How can we reach you?", fields: ["name", "email", "phone"] as const },
] as const;

type StepIndex = 0 | 1 | 2;
type StepField = (typeof STEPS)[StepIndex]["fields"][number];

function friendlyFieldError(field: StepField | "projectType", message?: string): string | undefined {
  if (!message) return undefined;
  if (field === "email" && message.toLowerCase().includes("email")) {
    return "Please enter a valid email address.";
  }
  if (message === "Name is required") return "Please enter your name.";
  if (message === "Phone is required") return "Please enter your phone number.";
  if (message === "Valid email is required") return "Please enter a valid email address.";
  if (field === "projectLocation") return "Please select a project location.";
  if (field === "projectType" && (message.includes("Invalid") || message.includes("Required"))) {
    return "Please select a project type.";
  }
  if (message.includes("Invalid") && (field === "budgetRange" || field === "timeline" || field === "drawingsStatus")) {
    return "Please select an option.";
  }
  return message;
}

const inputClass =
  "min-h-[44px] w-full border border-coastal-line bg-white px-4 py-3 text-base text-coastal-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coastal-accent";
const selectClass = inputClass;
const btnClass =
  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded px-5 py-3 text-base font-medium transition-opacity disabled:opacity-60";

export function ContactFormWizard() {
  const formId = useId();
  const [stepIndex, setStepIndex] = useState<StepIndex>(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    trigger,
    setFocus,
    getFieldState,
    watch,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: undefined,
      budgetRange: undefined,
      timeline: undefined,
      drawingsStatus: undefined,
      projectLocation: undefined,
      message: undefined,
      company: "",
      sourcePage: undefined,
    },
  });

  const step = STEPS[stepIndex];
  const stepTitleId = `${formId}-step-${step.id}-title`;
  const selectedProjectType = watch("projectType");

  useEffect(() => {
    const first = STEPS[stepIndex].fields[0];
    const t = requestAnimationFrame(() => setFocus(first));
    return () => cancelAnimationFrame(t);
  }, [stepIndex, setFocus]);

  async function goNext() {
    const fields = [...step.fields] as StepField[];
    const ok = await trigger(fields);
    if (!ok) {
      for (const f of fields) {
        if (getFieldState(f).invalid) {
          setFocus(f);
          break;
        }
      }
      return;
    }
    if (stepIndex < 2) {
      setStepIndex((s) => (s + 1) as StepIndex);
    }
  }

  function goBack() {
    if (stepIndex > 0) {
      setStepIndex((s) => (s - 1) as StepIndex);
    }
  }

  async function onSubmit(values: ContactSchema) {
    setStatus("submitting");
    const sourcePage = typeof window !== "undefined" ? window.location.pathname : "/";
    const payload = { ...values, sourcePage };
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className="rounded-lg border border-coastal-line bg-white p-6 shadow-sm lg:p-8"
        role="status"
        aria-live="polite"
      >
        <p className="text-center text-lg text-coastal-ink">Got it. Joel will be in touch within one business day.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-coastal-line bg-white p-6 shadow-sm lg:p-8">
      <p className="sr-only" aria-live="polite">
        Step {step.id} of {STEPS.length}: {step.title}
      </p>
      <ol className="mb-6 flex list-none items-center justify-center gap-2 p-0" aria-label="Form progress">
        {STEPS.map((s, i) => (
          <li key={s.id} className="list-none">
            <span
              className={`block h-2.5 w-2.5 rounded-full ${i === stepIndex ? "bg-coastal-accent" : "bg-coastal-line"}`}
              aria-current={i === stepIndex ? "step" : undefined}
              aria-label={`Step ${s.id} of ${STEPS.length}${i === stepIndex ? ", current" : ""}`}
            />
          </li>
        ))}
      </ol>

      <form
        id={formId}
        aria-labelledby={stepTitleId}
        className="space-y-5"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("company")} />

        <h2 id={stepTitleId} className="text-xl font-medium text-coastal-ink lg:text-2xl">
          {step.title}
        </h2>

        {stepIndex === 0 ? (
          <>
            <fieldset className="space-y-2">
              <legend className="mb-2 block text-sm uppercase tracking-[0.08em] text-coastal-ink">
                Project type <span className="text-red-700">*</span>
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {projectTypes.map((pt) => (
                  <label
                    key={pt}
                    className={`flex min-h-[44px] cursor-pointer items-center rounded border px-3 py-2 text-sm leading-snug transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-coastal-accent ${
                      selectedProjectType === pt
                        ? "border-coastal-accent bg-coastal-alt ring-1 ring-coastal-accent"
                        : errors.projectType
                          ? "border-red-300"
                          : "border-coastal-line hover:border-coastal-accent"
                    }`}
                  >
                    <input type="radio" value={pt} className="sr-only" {...register("projectType")} />
                    <span>{pt}</span>
                  </label>
                ))}
              </div>
              {errors.projectType ? (
                <p className="text-sm text-red-700" role="alert">
                  {friendlyFieldError("projectType", errors.projectType.message)}
                </p>
              ) : null}
            </fieldset>

            <div>
              <label htmlFor={`${formId}-budget`} className="mb-2 block text-sm uppercase tracking-[0.08em] text-coastal-ink">
                Budget range <span className="text-red-700">*</span>
              </label>
              <select id={`${formId}-budget`} className={selectClass} defaultValue="" {...register("budgetRange")}>
                <option value="" disabled>
                  Select an option
                </option>
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {errors.budgetRange ? (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {friendlyFieldError("budgetRange", errors.budgetRange.message)}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formId}-timeline`} className="mb-2 block text-sm uppercase tracking-[0.08em] text-coastal-ink">
                When do you want to break ground? <span className="text-red-700">*</span>
              </label>
              <select id={`${formId}-timeline`} className={selectClass} defaultValue="" {...register("timeline")}>
                <option value="" disabled>
                  Select an option
                </option>
                {timelines.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors.timeline ? (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {friendlyFieldError("timeline", errors.timeline.message)}
                </p>
              ) : null}
            </div>
          </>
        ) : null}

        {stepIndex === 1 ? (
          <>
            <div>
              <label htmlFor={`${formId}-process`} className="mb-2 block text-sm uppercase tracking-[0.08em] text-coastal-ink">
                Where are you in the process right now? <span className="text-red-700">*</span>
              </label>
              <select id={`${formId}-process`} className={selectClass} defaultValue="" {...register("drawingsStatus")}>
                <option value="" disabled>
                  Select an option
                </option>
                {drawingStatuses.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.drawingsStatus ? (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {friendlyFieldError("drawingsStatus", errors.drawingsStatus.message)}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formId}-location`} className="mb-2 block text-sm uppercase tracking-[0.08em] text-coastal-ink">
                Project location <span className="text-red-700">*</span>
              </label>
              <select
                id={`${formId}-location`}
                className={selectClass}
                defaultValue=""
                {...register("projectLocation")}
                aria-invalid={!!errors.projectLocation}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {PROJECT_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              {errors.projectLocation ? (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {friendlyFieldError("projectLocation", errors.projectLocation.message)}
                </p>
              ) : null}
            </div>
          </>
        ) : null}

        {stepIndex === 2 ? (
          <>
            <div>
              <label htmlFor={`${formId}-name`} className="mb-2 block text-sm uppercase tracking-[0.08em] text-coastal-ink">
                Name <span className="text-red-700">*</span>
              </label>
              <input
                id={`${formId}-name`}
                type="text"
                className={inputClass}
                autoComplete="name"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name ? (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {friendlyFieldError("name", errors.name.message)}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formId}-email`} className="mb-2 block text-sm uppercase tracking-[0.08em] text-coastal-ink">
                Email <span className="text-red-700">*</span>
              </label>
              <input
                id={`${formId}-email`}
                type="email"
                className={inputClass}
                autoComplete="email"
                inputMode="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email ? (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {friendlyFieldError("email", errors.email.message)}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formId}-phone`} className="mb-2 block text-sm uppercase tracking-[0.08em] text-coastal-ink">
                Phone <span className="text-red-700">*</span>
              </label>
              <input
                id={`${formId}-phone`}
                type="tel"
                className={inputClass}
                autoComplete="tel"
                inputMode="tel"
                {...register("phone")}
                aria-invalid={!!errors.phone}
              />
              {errors.phone ? (
                <p className="mt-1 text-sm text-red-700" role="alert">
                  {friendlyFieldError("phone", errors.phone.message)}
                </p>
              ) : null}
            </div>
          </>
        ) : null}

        {status === "error" ? (
          <p className="text-sm text-red-700" role="alert">
            Something went wrong. Please try again or call us directly.
          </p>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {stepIndex > 0 ? (
            <button type="button" onClick={goBack} className={`${btnClass} border border-coastal-line bg-white text-coastal-ink`}>
              Back
            </button>
          ) : (
            <span />
          )}
          {stepIndex < 2 ? (
            <button type="button" onClick={goNext} className={`${btnClass} ml-auto text-white`} style={{ backgroundColor: "var(--color-accent)" }}>
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "submitting"}
              className={`${btnClass} ml-auto text-white`}
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              {status === "submitting" ? "Sending…" : "Send to Joel"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
