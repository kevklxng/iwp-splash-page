"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { CustomSelect } from "@/components/ui/custom-select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  DESCRIBES_YOU_OPTIONS,
  INVESTMENT_RANGE_OPTIONS,
  INDUSTRY_OPTIONS,
  FINANCING_PARTICIPATION_OPTIONS,
  LENDING_AFFILIATION_OPTIONS,
  type ContactSchema,
} from "@/lib/contact-schema";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactSchema) {
    setStatus("submitting");
    const sourcePage = typeof window !== "undefined" ? window.location.pathname : "/";
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, sourcePage }),
    });
    if (!response.ok) {
      setStatus("error");
      return;
    }
    setStatus("success");
    reset();
  }

  if (status === "success") {
    return <p className="border border-coastal-line bg-coastal-alt p-6 text-lg">Thank you for your interest. We&apos;ll be in touch soon.</p>;
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("company")} />
      <SelectField label="Which best describes you?" name="describesYou" control={control} error={errors.describesYou?.message} options={DESCRIBES_YOU_OPTIONS} />
      <Field label="Email" error={errors.email?.message}>
        <input type="email" className="w-full border border-coastal-line bg-white px-4 py-3" {...register("email")} aria-invalid={!!errors.email} />
      </Field>
      <Field label="Full Name" error={errors.fullName?.message}>
        <input className="w-full border border-coastal-line bg-white px-4 py-3" {...register("fullName")} aria-invalid={!!errors.fullName} />
      </Field>
      <Field label="What is your LinkedIn?" error={errors.linkedIn?.message}>
        <input type="url" placeholder="LinkedIn URL goes here" className="w-full border border-coastal-line bg-white px-4 py-3" {...register("linkedIn")} aria-invalid={!!errors.linkedIn} />
      </Field>
      <Field label="Phone" error={errors.phone?.message}>
        <input type="tel" className="w-full border border-coastal-line bg-white px-4 py-3" {...register("phone")} aria-invalid={!!errors.phone} />
      </Field>
      <Field label="Who referred you?" error={errors.referredBy?.message}>
        <input className="w-full border border-coastal-line bg-white px-4 py-3" {...register("referredBy")} aria-invalid={!!errors.referredBy} />
      </Field>
      <SelectField label="What investment range are you comfortable deploying?" name="investmentRange" control={control} error={errors.investmentRange?.message} options={INVESTMENT_RANGE_OPTIONS} />
      <SelectField label="What industry do you provide services for?" name="industry" control={control} error={errors.industry?.message} options={INDUSTRY_OPTIONS} />
      <Field label="What service do you provide?" error={errors.service?.message}>
        <input className="w-full border border-coastal-line bg-white px-4 py-3" {...register("service")} aria-invalid={!!errors.service} />
      </Field>
      <SelectField label="How do you typically participate in financing opportunities?" name="financingParticipation" control={control} error={errors.financingParticipation?.message} options={FINANCING_PARTICIPATION_OPTIONS} />
      <SelectField label="Are you affiliated with a certified lending institution or government-backed program?" name="lendingAffiliation" control={control} error={errors.lendingAffiliation?.message} options={LENDING_AFFILIATION_OPTIONS} />
      {status === "error" ? <p className="text-sm text-red-700">Submission failed. Please try again.</p> : null}
      <button type="submit" disabled={status === "submitting"} className="rounded px-5 py-3 text-white disabled:opacity-70" style={{ backgroundColor: "var(--color-accent)" }}>
        {status === "submitting" ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm uppercase tracking-[0.08em]">
        {label} *
      </label>
      {children}
      {error ? <p className="mt-1 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  control,
  error,
  options,
}: {
  label: string;
  name: keyof ContactSchema;
  control: ReturnType<typeof useForm<ContactSchema>>["control"];
  error?: string;
  options: readonly string[];
}) {
  const fieldId = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      <label htmlFor={fieldId} className="mb-2 block text-sm uppercase tracking-[0.08em]">
        {label} *
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CustomSelect
            id={fieldId}
            options={options}
            error={!!error}
            aria-invalid={!!error}
            {...field}
          />
        )}
      />
      {error ? <p className="mt-1 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
