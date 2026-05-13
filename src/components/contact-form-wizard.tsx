"use client";

import { clsx } from "clsx";
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

function prettyStepFieldName(field: StepField): string {
  const map: Record<StepField, string> = {
    projectType: "Project type",
    budgetRange: "Budget range",
    timeline: "Timeline",
    drawingsStatus: "Process status",
    projectLocation: "Project location",
    name: "Name",
    email: "Email",
    phone: "Phone",
  };
  return map[field];
}

/** DOM id for scroll/focus (matches existing select/input ids). */
function domIdForStepField(formId: string, field: StepField): string {
  if (field === "projectType") return `${formId}-projectType`;
  if (field === "budgetRange") return `${formId}-budget`;
  if (field === "drawingsStatus") return `${formId}-process`;
  if (field === "projectLocation") return `${formId}-location`;
  return `${formId}-${field}`;
}

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

const btnClass =
  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded px-5 py-3 text-base font-medium transition-opacity disabled:opacity-60";

export type ContactFormWizardProps = {
  /** `glass` — translucent controls for splash hero over photography */
  appearance?: "default" | "glass";
};

export function ContactFormWizard({ appearance = "default" }: ContactFormWizardProps) {
  const glass = appearance === "glass";
  const formId = useId();
  const [stepIndex, setStepIndex] = useState<StepIndex>(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [missingFields, setMissingFields] = useState<StepField[]>([]);

  const shellClass = glass
    ? "rounded-xl p-6 lg:p-8"
    : "rounded-lg border border-coastal-line bg-white p-6 shadow-sm lg:p-8";

  const labelClass = glass
    ? "mb-2 block text-sm uppercase tracking-[0.08em] text-white/90"
    : "mb-2 block text-sm uppercase tracking-[0.08em] text-coastal-ink";

  const reqClass = glass ? "text-red-300" : "text-red-700";

  const inputClass = glass
    ? "min-h-[44px] w-full rounded border border-white/25 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    : "min-h-[44px] w-full border border-coastal-line bg-white px-4 py-3 text-base text-coastal-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coastal-accent";

  const selectClass = clsx(inputClass, glass && "[color-scheme:dark]");

  const invalidGlass = "border-red-400/80 bg-red-500/10";
  const invalidLight = "border-red-400 bg-red-50";

  const errClass = glass ? "text-sm text-red-200" : "text-sm text-red-700";

  const titleClass = glass ? "text-xl font-medium text-white lg:text-2xl" : "text-xl font-medium text-coastal-ink lg:text-2xl";

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
    mode: "onTouched",
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
  const values = watch();

  const stepComplete = step.fields.every((f) => {
    const v = values[f as keyof ContactSchema];
    return v !== undefined && v !== "" && v !== null;
  });

  useEffect(() => {
    const first = STEPS[stepIndex].fields[0];
    const t = requestAnimationFrame(() => setFocus(first));
    return () => cancelAnimationFrame(t);
  }, [stepIndex, setFocus]);

  useEffect(() => {
    setMissingFields([]);
  }, [stepIndex]);

  async function goNext() {
    const fields = [...step.fields] as StepField[];
    const ok = await trigger(fields);
    if (!ok) {
      const invalid = fields.filter((f) => getFieldState(f).invalid);
      setMissingFields(invalid);
      const firstInvalid = invalid[0];
      if (firstInvalid) {
        const el = document.getElementById(domIdForStepField(formId, firstInvalid));
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        try {
          setFocus(firstInvalid);
        } catch {
          /* radio groups can't be focused via setFocus */
        }
      }
      return;
    }
    setMissingFields([]);
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
        className={clsx(
          shellClass,
          glass && "border border-white/15 bg-white/10 shadow-inner backdrop-blur-sm",
        )}
        role="status"
        aria-live="polite"
      >
        <p className={clsx("text-center text-lg", glass ? "text-white" : "text-coastal-ink")}>
          Got it. Joel will be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className={clsx(shellClass, glass && "border border-white/10 bg-white/5 shadow-inner")}>
      <p className="sr-only" aria-live="polite">
        Step {step.id} of {STEPS.length}: {step.title}
      </p>
      <ol className="mb-6 flex list-none items-center justify-center gap-2 p-0" aria-label="Form progress">
        {STEPS.map((s, i) => (
          <li key={s.id} className="list-none">
            <span
              className={clsx(
                "block h-2.5 w-2.5 rounded-full",
                glass ? (i === stepIndex ? "bg-white" : "bg-white/35") : i === stepIndex ? "bg-coastal-accent" : "bg-coastal-line",
              )}
              aria-current={i === stepIndex ? "step" : undefined}
              aria-label={`Step ${s.id} of ${STEPS.length}${i === stepIndex ? ", current" : ""}`}
            />
          </li>
        ))}
      </ol>

      <form id={formId} aria-labelledby={stepTitleId} className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("company")} />

        <h2 id={stepTitleId} className={titleClass}>
          {step.title}
        </h2>

        {stepIndex === 0 ? (
          <>
            <fieldset id={`${formId}-projectType`} className="space-y-2">
              <legend className={labelClass}>
                Project type <span className={reqClass}>*</span>
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {projectTypes.map((pt) => (
                  <label
                    key={pt}
                    className={clsx(
                      "flex min-h-[44px] cursor-pointer items-center rounded border px-3 py-2 text-sm leading-snug transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2",
                      glass && "text-white",
                      glass ? "focus-within:outline-white" : "focus-within:outline-coastal-accent",
                      selectedProjectType === pt
                        ? glass
                          ? "border-white bg-white/20 ring-1 ring-white/80"
                          : "border-coastal-accent bg-coastal-alt ring-1 ring-coastal-accent"
                        : errors.projectType
                          ? glass
                            ? "border-red-400/90"
                            : "border-red-300"
                          : glass
                            ? "border-white/30 text-white hover:border-white/55"
                            : "border-coastal-line hover:border-coastal-accent",
                    )}
                  >
                    <input type="radio" value={pt} className="sr-only" {...register("projectType")} />
                    <span>{pt}</span>
                  </label>
                ))}
              </div>
              {errors.projectType ? (
                <p className={clsx(errClass)} role="alert">
                  {friendlyFieldError("projectType", errors.projectType.message)}
                </p>
              ) : null}
            </fieldset>

            <div>
              <label htmlFor={`${formId}-budget`} className={labelClass}>
                Budget range <span className={reqClass}>*</span>
              </label>
              <select
                id={`${formId}-budget`}
                className={clsx(selectClass, errors.budgetRange && (glass ? invalidGlass : invalidLight))}
                defaultValue=""
                {...register("budgetRange")}
              >
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
                <p className={clsx(errClass, "mt-1")} role="alert">
                  {friendlyFieldError("budgetRange", errors.budgetRange.message)}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formId}-timeline`} className={labelClass}>
                When do you want to break ground? <span className={reqClass}>*</span>
              </label>
              <select
                id={`${formId}-timeline`}
                className={clsx(selectClass, errors.timeline && (glass ? invalidGlass : invalidLight))}
                defaultValue=""
                {...register("timeline")}
              >
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
                <p className={clsx(errClass, "mt-1")} role="alert">
                  {friendlyFieldError("timeline", errors.timeline.message)}
                </p>
              ) : null}
            </div>
          </>
        ) : null}

        {stepIndex === 1 ? (
          <>
            <div>
              <label htmlFor={`${formId}-process`} className={labelClass}>
                Where are you in the process right now? <span className={reqClass}>*</span>
              </label>
              <select
                id={`${formId}-process`}
                className={clsx(selectClass, errors.drawingsStatus && (glass ? invalidGlass : invalidLight))}
                defaultValue=""
                {...register("drawingsStatus")}
              >
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
                <p className={clsx(errClass, "mt-1")} role="alert">
                  {friendlyFieldError("drawingsStatus", errors.drawingsStatus.message)}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formId}-location`} className={labelClass}>
                Project location <span className={reqClass}>*</span>
              </label>
              <select
                id={`${formId}-location`}
                className={clsx(selectClass, errors.projectLocation && (glass ? invalidGlass : invalidLight))}
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
                <p className={clsx(errClass, "mt-1")} role="alert">
                  {friendlyFieldError("projectLocation", errors.projectLocation.message)}
                </p>
              ) : null}
            </div>
          </>
        ) : null}

        {stepIndex === 2 ? (
          <>
            <div>
              <label htmlFor={`${formId}-name`} className={labelClass}>
                Name <span className={reqClass}>*</span>
              </label>
              <input
                id={`${formId}-name`}
                type="text"
                className={clsx(inputClass, errors.name && (glass ? invalidGlass : invalidLight))}
                autoComplete="name"
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name ? (
                <p className={clsx(errClass, "mt-1")} role="alert">
                  {friendlyFieldError("name", errors.name.message)}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formId}-email`} className={labelClass}>
                Email <span className={reqClass}>*</span>
              </label>
              <input
                id={`${formId}-email`}
                type="email"
                className={clsx(inputClass, errors.email && (glass ? invalidGlass : invalidLight))}
                autoComplete="email"
                inputMode="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email ? (
                <p className={clsx(errClass, "mt-1")} role="alert">
                  {friendlyFieldError("email", errors.email.message)}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formId}-phone`} className={labelClass}>
                Phone <span className={reqClass}>*</span>
              </label>
              <input
                id={`${formId}-phone`}
                type="tel"
                className={clsx(inputClass, errors.phone && (glass ? invalidGlass : invalidLight))}
                autoComplete="tel"
                inputMode="tel"
                {...register("phone")}
                aria-invalid={!!errors.phone}
              />
              {errors.phone ? (
                <p className={clsx(errClass, "mt-1")} role="alert">
                  {friendlyFieldError("phone", errors.phone.message)}
                </p>
              ) : null}
            </div>
          </>
        ) : null}

        {status === "error" ? (
          <p className={clsx(errClass)} role="alert">
            Something went wrong. Please try again or call us directly.
          </p>
        ) : null}

        {missingFields.length > 0 ? (
          <div
            role="alert"
            className={clsx(
              "rounded border px-3 py-2 text-sm",
              glass ? "border-red-300/50 bg-red-500/15 text-red-100" : "border-red-300 bg-red-50 text-red-800",
            )}
          >
            Please complete: {missingFields.map(prettyStepFieldName).join(", ")}.
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {stepIndex > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className={clsx(
                btnClass,
                glass
                  ? "border border-white/40 bg-white/10 text-white hover:bg-white/20"
                  : "border border-coastal-line bg-white text-coastal-ink",
              )}
            >
              Back
            </button>
          ) : (
            <span />
          )}
          {stepIndex < 2 ? (
            <button
              type="button"
              onClick={goNext}
              disabled={!stepComplete}
              aria-disabled={!stepComplete}
              title={stepComplete ? undefined : "Complete the fields above to continue"}
              className={clsx(
                btnClass,
                "ml-auto text-white",
                !stepComplete && "cursor-not-allowed opacity-50",
              )}
              style={{ backgroundColor: glass ? "var(--color-accent-warm)" : "var(--color-accent)" }}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "submitting"}
              className={clsx(btnClass, "ml-auto text-white")}
              style={{ backgroundColor: glass ? "var(--color-accent-warm)" : "var(--color-accent)" }}
            >
              {status === "submitting" ? "Sending…" : "Send to Joel"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
