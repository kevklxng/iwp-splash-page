"use client";

import { Check, ChevronDown, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type MultiSelectChipsProps = {
  options: readonly string[];
  placeholder?: string;
  value?: string[];
  onChange: (value: string[]) => void;
  onBlur?: () => void;
  id?: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
};

export function MultiSelectChips({
  options,
  placeholder = "Select options",
  value = [],
  onChange,
  onBlur,
  id,
  error = false,
  disabled = false,
  className,
}: MultiSelectChipsProps) {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open, onBlur]);

  function toggleOption(option: string) {
    const selected = new Set(value);
    if (selected.has(option)) {
      selected.delete(option);
    } else {
      selected.add(option);
    }
    onChange(options.filter((opt) => selected.has(opt)));
  }

  function removeOption(option: string, event: React.MouseEvent) {
    event.stopPropagation();
    onChange(value.filter((item) => item !== option));
  }

  const triggerClass = cn(
    "flex min-h-[48px] w-full items-center justify-between gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-base text-left shadow-sm",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1e4642]/20 focus-visible:ring-offset-0",
    error && "border-red-400 bg-red-50",
    disabled && "cursor-not-allowed opacity-60",
    className,
  );

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        className={triggerClass}
        onClick={() => {
          if (disabled) return;
          setOpen((prev) => !prev);
        }}
        onBlur={() => {
          if (!open) onBlur?.();
        }}
      >
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
          {value.length > 0 ? (
            value.map((item) => (
              <span
                key={item}
                className="inline-flex max-w-full items-center gap-1 rounded-md bg-[#1e4642]/10 px-2 py-1 text-sm text-[#1e4642]"
              >
                <span className="truncate">{item}</span>
                <span
                  role="button"
                  tabIndex={-1}
                  aria-label={`Remove ${item}`}
                  className="rounded-sm hover:bg-[#1e4642]/15"
                  onClick={(event) => removeOption(item, event)}
                  onMouseDown={(event) => event.preventDefault()}
                >
                  <X className="h-3.5 w-3.5 shrink-0" aria-hidden />
                </span>
              </span>
            ))
          ) : (
            <span className="px-1 text-gray-400">{placeholder}</span>
          )}
        </span>
        <ChevronDown
          className={cn("h-4 w-4 shrink-0 text-[#1e4642]/70 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-multiselectable="true"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 text-[#1e4642] shadow-md"
        >
          {options.map((option) => {
            const isSelected = value.includes(option);
            return (
              <li key={option} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center justify-between gap-2 px-4 py-2.5 text-left text-base",
                    "hover:bg-[#1e4642]/10 focus-visible:bg-[#1e4642]/10 focus-visible:outline-none",
                    isSelected && "bg-[#1e4642]/5",
                  )}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => toggleOption(option)}
                >
                  <span>{option}</span>
                  {isSelected ? <Check className="h-4 w-4 shrink-0" aria-hidden /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
