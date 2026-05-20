"use client";

import { Select } from "@base-ui/react/select";
import { ChevronDown } from "lucide-react";
import { forwardRef, useMemo } from "react";
import { cn } from "@/lib/utils";

export type CustomSelectProps = {
  options: readonly string[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  name?: string;
  id?: string;
  glass?: boolean;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-invalid"?: boolean;
};

export const CustomSelect = forwardRef<HTMLButtonElement, CustomSelectProps>(function CustomSelect(
  {
    options,
    placeholder = "Select an option",
    value,
    onChange,
    onBlur,
    name,
    id,
    glass = false,
    error = false,
    disabled = false,
    className,
    "aria-invalid": ariaInvalid,
  },
  ref,
) {
  const items = useMemo(
    () => options.map((opt) => ({ value: opt, label: opt })),
    [options],
  );

  const selectedValue = value && value.length > 0 ? value : null;

  const triggerClass = cn(
    "flex min-h-[44px] w-full items-center justify-between gap-2 px-4 py-3 text-base text-left",
    glass
      ? "rounded border border-white/25 bg-white/10 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      : "border border-coastal-line bg-white text-coastal-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coastal-accent",
    error && (glass ? "border-red-400/80 bg-red-500/10" : "border-red-400 bg-red-50"),
    disabled && "cursor-not-allowed opacity-60",
    className,
  );

  const popupClass = cn(
    "z-50 max-h-60 overflow-auto rounded border shadow-lg outline-none",
    glass ? "border-white/25 bg-gray-900 text-white" : "border-coastal-line bg-white text-coastal-ink",
  );

  const itemClass = cn(
    "cursor-default px-4 py-2.5 text-base outline-none",
    glass ? "data-[highlighted]:bg-white/15" : "data-[highlighted]:bg-coastal-alt",
  );

  const placeholderClass = glass ? "text-white/45" : "text-coastal-ink/50";

  return (
    <Select.Root
      name={name}
      items={items}
      value={selectedValue}
      disabled={disabled}
      modal={false}
      onValueChange={(next) => {
        onChange(next ?? "");
        onBlur?.();
      }}
    >
      <Select.Trigger
        ref={ref}
        id={id}
        className={triggerClass}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        onBlur={onBlur}
      >
        <Select.Value
          placeholder={placeholder}
          className={(state) => cn("min-w-0 flex-1 truncate", state.placeholder && placeholderClass)}
        />
        <Select.Icon className={cn("shrink-0", glass ? "text-white/70" : "text-coastal-ink/60")}>
          <ChevronDown className="h-4 w-4" aria-hidden />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner alignItemWithTrigger={false} sideOffset={4}>
          <Select.Popup className={popupClass}>
            <Select.List>
              {items.map((item) => (
                <Select.Item key={item.value} value={item.value} className={itemClass}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
});
