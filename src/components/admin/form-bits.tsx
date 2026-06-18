"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";

export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="ml-0.5 text-brand-600">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-ink-500">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function TagsInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = React.useState("");

  function commit(raw: string) {
    const tag = raw.trim().toLowerCase();
    if (tag && !value.includes(tag)) onChange([...value, tag]);
    setDraft("");
  }

  return (
    <div className="rounded-md border border-ink-200 bg-white p-2">
      {value.length > 0 && (
        <ul className="mb-2 flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <li
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
            >
              {tag}
              <button
                type="button"
                onClick={() => onChange(value.filter((t) => t !== tag))}
                aria-label={`Quitar ${tag}`}
                className="text-brand-500 hover:text-brand-800"
              >
                <X size={12} aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      )}
      <Input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            commit(draft);
          } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => draft && commit(draft)}
        placeholder={placeholder ?? "Escribe y presiona Enter"}
        className="border-0 focus-visible:ring-0"
      />
    </div>
  );
}

export function Select({
  className,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "flex h-11 w-full rounded-md border border-ink-200 bg-white px-3 py-2 text-sm text-ink-900",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1",
        className,
      )}
      {...props}
    />
  );
}

export function Checkbox({
  label,
  hint,
  ...props
}: { label: string; hint?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-start gap-2.5">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-600"
        {...props}
      />
      <span>
        <span className="text-sm font-medium text-ink-900">{label}</span>
        {hint && <span className="block text-xs text-ink-500">{hint}</span>}
      </span>
    </label>
  );
}
