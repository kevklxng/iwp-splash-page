"use client";

import { clsx } from "clsx";
import { useEffect, useId, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { CustomSelect } from "@/components/ui/custom-select";
import { MultiSelectChips } from "@/components/ui/multi-select-chips";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  DESCRIBES_YOU_OPTIONS,
  FINANCING_PARTICIPATION_OPTIONS,
  getHiddenFieldsForRole,
  INDUSTRY_OPTIONS,
  INVESTMENT_RANGE_OPTIONS,
  LENDING_AFFILIATION_OPTIONS,
  ROLE_FIELDS,
  type ContactSchema,
  type DescribesYouOption,
} from "@/lib/contact-schema";

export type ContactFormWizardProps = {
  appearance?: "default" | "glass";
  onExpandedChange?: (expanded: boolean) => void;
};

export function ContactFormWizard({ appearance = "default", onExpandedChange }: ContactFormWizardProps) {
  const formId = useId();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      describesYou: undefined,
      email: "",
      fullName: "",
      linkedIn: "",
      phone: "",
      referredBy: "",
      investmentRange: undefined,
      industry: [],
      service: "",
      financingParticipation: undefined,
      lendingAffiliation: undefined,
      company: "",
      sourcePage: undefined,
    },
  });

  const role = useWatch({ control, name: "describesYou" }) as DescribesYouOption | undefined;

  const activeFields = useMemo(
    () => new Set(role ? ROLE_FIELDS[role] : []),
    [role],
  );

  useEffect(() => {
    onExpandedChange?.(Boolean(role) || status === "success");
  }, [role, status, onExpandedChange]);

  useEffect(() => {
    if (!role) return;

    for (const field of getHiddenFieldsForRole(role)) {
      setValue(field, field === "industry" ? [] : undefined, {
        shouldValidate: false,
        shouldDirty: false,
      });
      clearErrors(field);
    }
  }, [role, setValue, clearErrors]);

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

  const labelClass = "mb-1.5 block text-sm font-semibold text-gray-800";
  const reqClass = "text-red-500";
  const inputClass =
    "min-h-[48px] w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 shadow-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e4642]/20 focus-visible:ring-offset-0";
  const invalidClass = "border-red-400 bg-red-50";
  const errClass = "mt-1 text-sm text-red-600";

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-950 shadow-sm lg:p-10"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-medium text-gray-900">
          Thank you for your interest. We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  const hasRole = Boolean(role);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 text-gray-950 shadow-sm lg:p-8">
      <form id={formId} className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("company")} />

        {/* Which best describes you? */}
        <div>
          <label htmlFor={`${formId}-describes`} className={labelClass}>
            Which best describes you? <span className={reqClass}>*</span>
          </label>
          <Controller
            name="describesYou"
            control={control}
            render={({ field }) => (
              <CustomSelect
                id={`${formId}-describes`}
                options={DESCRIBES_YOU_OPTIONS}
                placeholder="Select an option"
                error={!!errors.describesYou}
                aria-invalid={!!errors.describesYou}
                {...field}
              />
            )}
          />
          {errors.describesYou ? (
            <p className={errClass} role="alert">
              {errors.describesYou.message}
            </p>
          ) : null}
        </div>

        {hasRole ? (
          <>
            {/* Email */}
            <div>
              <label htmlFor={`${formId}-email`} className={labelClass}>
                Email <span className={reqClass}>*</span>
              </label>
              <input
                id={`${formId}-email`}
                type="email"
                placeholder="Email"
                className={clsx(inputClass, errors.email && invalidClass)}
                autoComplete="email"
                inputMode="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email ? (
                <p className={errClass} role="alert">
                  {errors.email.message}
                </p>
              ) : null}
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor={`${formId}-fullName`} className={labelClass}>
                Full Name <span className={reqClass}>*</span>
              </label>
              <input
                id={`${formId}-fullName`}
                type="text"
                placeholder="Full Name"
                className={clsx(inputClass, errors.fullName && invalidClass)}
                autoComplete="name"
                {...register("fullName")}
                aria-invalid={!!errors.fullName}
              />
              {errors.fullName ? (
                <p className={errClass} role="alert">
                  {errors.fullName.message}
                </p>
              ) : null}
            </div>

            {/* LinkedIn */}
            <div>
              <label htmlFor={`${formId}-linkedin`} className={labelClass}>
                What is your LinkedIn? <span className={reqClass}>*</span>
              </label>
              <input
                id={`${formId}-linkedin`}
                type="url"
                placeholder="LinkedIn URL goes here"
                className={clsx(inputClass, errors.linkedIn && invalidClass)}
                {...register("linkedIn")}
                aria-invalid={!!errors.linkedIn}
              />
              {errors.linkedIn ? (
                <p className={errClass} role="alert">
                  {errors.linkedIn.message}
                </p>
              ) : null}
            </div>

            {/* Phone */}
            {activeFields.has("phone") ? (
              <div>
                <label htmlFor={`${formId}-phone`} className={labelClass}>
                  Phone <span className={reqClass}>*</span>
                </label>
                <input
                  id={`${formId}-phone`}
                  type="tel"
                  placeholder="Phone"
                  className={clsx(inputClass, errors.phone && invalidClass)}
                  autoComplete="tel"
                  inputMode="tel"
                  {...register("phone")}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone ? (
                  <p className={errClass} role="alert">
                    {errors.phone.message}
                  </p>
                ) : null}
              </div>
            ) : null}

            {/* Who referred you? */}
            <div>
              <label htmlFor={`${formId}-referral`} className={labelClass}>
                Who referred you? <span className={reqClass}>*</span>
              </label>
              <input
                id={`${formId}-referral`}
                type="text"
                className={clsx(inputClass, errors.referredBy && invalidClass)}
                {...register("referredBy")}
                aria-invalid={!!errors.referredBy}
              />
              {errors.referredBy ? (
                <p className={errClass} role="alert">
                  {errors.referredBy.message}
                </p>
              ) : null}
            </div>

            {/* Investment Range */}
            {activeFields.has("investmentRange") ? (
              <div>
                <label htmlFor={`${formId}-investment`} className={labelClass}>
                  What investment range are you comfortable deploying?{" "}
                  <span className={reqClass}>*</span>
                </label>
                <Controller
                  name="investmentRange"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      id={`${formId}-investment`}
                      options={INVESTMENT_RANGE_OPTIONS}
                      placeholder="Select an option"
                      error={!!errors.investmentRange}
                      aria-invalid={!!errors.investmentRange}
                      {...field}
                    />
                  )}
                />
                {errors.investmentRange ? (
                  <p className={errClass} role="alert">
                    {errors.investmentRange.message}
                  </p>
                ) : null}
              </div>
            ) : null}

            {/* Industry */}
            {activeFields.has("industry") ? (
              <div>
                <label htmlFor={`${formId}-industry`} className={labelClass}>
                  What industry do you provide services for?{" "}
                  <span className={reqClass}>*</span>
                </label>
                <Controller
                  name="industry"
                  control={control}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <MultiSelectChips
                      id={`${formId}-industry`}
                      options={INDUSTRY_OPTIONS}
                      placeholder="Select options"
                      value={value ?? []}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={!!errors.industry}
                      aria-invalid={!!errors.industry}
                    />
                  )}
                />
                {errors.industry ? (
                  <p className={errClass} role="alert">
                    {errors.industry.message}
                  </p>
                ) : null}
              </div>
            ) : null}

            {/* Service */}
            {activeFields.has("service") ? (
              <div>
                <label htmlFor={`${formId}-service`} className={labelClass}>
                  What service do you provide? <span className={reqClass}>*</span>
                </label>
                <input
                  id={`${formId}-service`}
                  type="text"
                  className={clsx(inputClass, errors.service && invalidClass)}
                  {...register("service")}
                  aria-invalid={!!errors.service}
                />
                {errors.service ? (
                  <p className={errClass} role="alert">
                    {errors.service.message}
                  </p>
                ) : null}
              </div>
            ) : null}

            {/* Financing Participation */}
            {activeFields.has("financingParticipation") ? (
              <div>
                <label htmlFor={`${formId}-financing`} className={labelClass}>
                  How do you typically participate in financing opportunities?{" "}
                  <span className={reqClass}>*</span>
                </label>
                <Controller
                  name="financingParticipation"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      id={`${formId}-financing`}
                      options={FINANCING_PARTICIPATION_OPTIONS}
                      placeholder="Select an option"
                      error={!!errors.financingParticipation}
                      aria-invalid={!!errors.financingParticipation}
                      {...field}
                    />
                  )}
                />
                {errors.financingParticipation ? (
                  <p className={errClass} role="alert">
                    {errors.financingParticipation.message}
                  </p>
                ) : null}
              </div>
            ) : null}

            {/* Lending Affiliation */}
            {activeFields.has("lendingAffiliation") ? (
              <div>
                <label htmlFor={`${formId}-lending`} className={labelClass}>
                  Are you currently affiliated with a certified lending institution or
                  government-backed program? <span className={reqClass}>*</span>
                </label>
                <Controller
                  name="lendingAffiliation"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      id={`${formId}-lending`}
                      options={LENDING_AFFILIATION_OPTIONS}
                      placeholder="Select an option"
                      error={!!errors.lendingAffiliation}
                      aria-invalid={!!errors.lendingAffiliation}
                      {...field}
                    />
                  )}
                />
                {errors.lendingAffiliation ? (
                  <p className={errClass} role="alert">
                    {errors.lendingAffiliation.message}
                  </p>
                ) : null}
              </div>
            ) : null}
          </>
        ) : null}

        {status === "error" ? (
          <p className="text-sm text-red-600" role="alert">
            Something went wrong. Please try again.
          </p>
        ) : null}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "submitting"}
          className="mt-4 flex min-h-[52px] w-full items-center justify-center rounded-lg bg-[#1e4642] text-lg font-medium text-white transition-colors hover:bg-[#153532] disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting…" : "Submit"}
        </button>
      </form>
    </div>
  );
}
