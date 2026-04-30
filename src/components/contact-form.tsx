"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactSchema } from "@/lib/contact-schema";

const projectTypes = ["New Custom Build", "Remodel", "Addition", "ADU", "Not sure yet"] as const;
const budgetRanges = ["$500K-$1M", "$1M-$3M", "$3M-$7M", "$7M-$15M", "$15M+"] as const;
const timelines = ["Ready to start in 1-3 months", "3-6 months", "6-12 months", "Just exploring"] as const;
const drawingStatuses = ["Submitted to city", "In progress with architect", "Haven't started", "Not sure"] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactSchema) {
    setStatus("submitting");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      setStatus("error");
      return;
    }
    setStatus("success");
    reset();
  }

  if (status === "success") {
    return <p className="border border-coastal-line bg-coastal-alt p-6 text-lg">Got it. Joel will be in touch within one business day.</p>;
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("company")} />
      <Field label="Name" error={errors.name?.message}>
        <input className="w-full border border-coastal-line bg-white px-4 py-3" {...register("name")} aria-invalid={!!errors.name} />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <input type="email" className="w-full border border-coastal-line bg-white px-4 py-3" {...register("email")} aria-invalid={!!errors.email} />
      </Field>
      <Field label="Phone" error={errors.phone?.message}>
        <input type="tel" className="w-full border border-coastal-line bg-white px-4 py-3" {...register("phone")} aria-invalid={!!errors.phone} />
      </Field>
      <SelectField label="Project type" error={errors.projectType?.message} options={projectTypes} {...register("projectType")} />
      <SelectField label="Budget range" error={errors.budgetRange?.message} options={budgetRanges} {...register("budgetRange")} />
      <SelectField label="Timeline" error={errors.timeline?.message} options={timelines} {...register("timeline")} />
      <SelectField label="Drawings status" error={errors.drawingsStatus?.message} options={drawingStatuses} {...register("drawingsStatus")} />
      <Field label="Project location" error={errors.projectLocation?.message}>
        <input className="w-full border border-coastal-line bg-white px-4 py-3" {...register("projectLocation")} aria-invalid={!!errors.projectLocation} />
      </Field>
      <Field label="Message (optional)" error={errors.message?.message}>
        <textarea className="w-full border border-coastal-line bg-white px-4 py-3" rows={5} {...register("message")} />
      </Field>
      {status === "error" ? <p className="text-sm text-red-700">Submission failed. Please call or email directly.</p> : null}
      <button type="submit" disabled={status === "submitting"} className="rounded px-5 py-3 text-white disabled:opacity-70" style={{ backgroundColor: "var(--color-accent)" }}>
        {status === "submitting" ? "Sending..." : "Submit project details"}
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
  error,
  options,
  ...props
}: {
  label: string;
  error?: string;
  options: readonly string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="mb-2 block text-sm uppercase tracking-[0.08em]">
        {label} *
      </label>
      <select className="w-full border border-coastal-line bg-white px-4 py-3" defaultValue="" {...props}>
        <option value="" disabled>
          Select an option
        </option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {error ? <p className="mt-1 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
