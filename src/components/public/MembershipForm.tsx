"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2, ChevronDown, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  submitMembershipAction,
  type MembershipResult,
} from "@/server/actions/membership";
import { siteConfig } from "@/lib/site";

const COMMENT_MAX = 1000;

const categoryOptions = [
  { value: "ESPECIALISTA", label: "Especialista titulado" },
  { value: "DOCENTE", label: "Docente universitario" },
  { value: "RESIDENTE", label: "Residente de postgrado" },
  { value: "ESTUDIANTE", label: "Estudiante de pregrado" },
  { value: "OTRO", label: "Otro" },
] as const;

export function MembershipForm() {
  const [pending, startTransition] = React.useTransition();
  const [state, setState] = React.useState<MembershipResult | null>(null);
  const [messageLen, setMessageLen] = React.useState(0);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const fieldErr = (k: string) =>
    !state || state.ok ? undefined : (state.fieldErrors as Record<string, string> | undefined)?.[k];

  const reset = () => {
    formRef.current?.reset();
    setMessageLen(0);
    setState(null);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitMembershipAction(state, fd);
      setState(res);
      if (res.ok) {
        e.currentTarget.reset();
        setMessageLen(0);
      }
    });
  };

  if (state?.ok) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl"
        />
        <div className="relative">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-[0_8px_24px_-6px_rgba(5,150,105,0.5)]">
            <CheckCircle2 size={28} aria-hidden />
          </div>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-700">
            Solicitud recibida
          </p>
          <h3 className="mt-2 font-display text-3xl uppercase leading-tight tracking-tight text-emerald-950 md:text-4xl">
            Bienvenido a la comunidad
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-emerald-900/80">
            Recibimos tu solicitud para sumarte a SPROCh. Te contactaremos en un plazo máximo de{" "}
            <strong className="font-semibold">48 horas hábiles</strong> con los próximos pasos —
            cuota anual, formulario formal y acceso a tu paquete de beneficios.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button type="button" onClick={reset} variant="outline" size="sm">
              Enviar otra solicitud
              <ArrowRight size={14} aria-hidden />
            </Button>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-emerald-800 transition-colors hover:text-emerald-900"
            >
              <Mail size={14} aria-hidden />
              Escribirnos directo
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre completo" required htmlFor="fullName" error={fieldErr("fullName")}>
          <Input id="fullName" name="fullName" autoComplete="name" />
        </Field>
        <Field label="Correo electrónico" required htmlFor="email" error={fieldErr("email")}>
          <Input id="email" name="email" type="email" autoComplete="email" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Teléfono" hint="Opcional" htmlFor="phone" error={fieldErr("phone")}>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+56 9 1234 5678"
          />
        </Field>
        <Field label="RUT" hint="Opcional" htmlFor="rut" error={fieldErr("rut")}>
          <Input id="rut" name="rut" placeholder="12.345.678-9" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Categoría" required htmlFor="category" error={fieldErr("category")}>
          <div className="relative">
            <select
              id="category"
              name="category"
              defaultValue=""
              className="flex h-11 w-full appearance-none rounded-md border border-ink-200 bg-white px-3 pr-9 py-2 text-sm text-ink-900 transition-colors focus-visible:border-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1"
            >
              <option value="" disabled>
                Selecciona…
              </option>
              {categoryOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400"
            />
          </div>
        </Field>
        <Field label="Ciudad" hint="Opcional" htmlFor="city" error={fieldErr("city")}>
          <Input id="city" name="city" placeholder="Santiago" />
        </Field>
      </div>

      <Field
        label="Institución o lugar de trabajo"
        hint="Opcional"
        htmlFor="institution"
        error={fieldErr("institution")}
      >
        <Input
          id="institution"
          name="institution"
          placeholder="Universidad, clínica, hospital, consulta privada…"
        />
      </Field>

      <Field
        label="Comentarios"
        hint="Opcional"
        htmlFor="message"
        error={fieldErr("message")}
        counter={
          <span
            className={messageLen > COMMENT_MAX ? "text-brand-700" : "text-ink-500"}
          >
            {messageLen.toLocaleString("es-CL")}/{COMMENT_MAX.toLocaleString("es-CL")}
          </span>
        }
      >
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Cuéntanos brevemente sobre tu interés en sumarte a SPROCh."
          onChange={(e) => setMessageLen(e.target.value.length)}
        />
      </Field>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <Input id="hp" name="hp" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="rounded-xl border border-ink-100 bg-ink-50/60 p-4">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
          <input
            type="checkbox"
            name="acceptTerms"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-brand-600 focus:ring-brand-600"
          />
          <span>
            Acepto que SPROCh utilice mis datos para gestionar mi solicitud de membresía y
            contactarme con información institucional.
          </span>
        </label>
        {fieldErr("acceptTerms") && (
          <p className="mt-2 pl-7 text-xs font-medium text-brand-700">{fieldErr("acceptTerms")}</p>
        )}
      </div>

      {state && !state.ok && (
        <p
          role="alert"
          className="rounded-md border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800"
        >
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-ink-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-ink-500">
          Enviar la solicitud no genera cobro automático. La cuota se gestiona en una segunda
          etapa una vez validados tus antecedentes.
        </p>
        <Button type="submit" size="lg" disabled={pending} className="btn-glow min-w-52">
          {pending ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden />
              Enviando…
            </>
          ) : (
            <>
              Enviar solicitud
              <ArrowRight size={16} aria-hidden />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  counter?: React.ReactNode;
  children: React.ReactNode;
}

function Field({ label, htmlFor, required, hint, error, counter, children }: FieldProps) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <Label
          htmlFor={htmlFor}
          className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-700"
        >
          {label}
          {required && <span className="ml-1 text-brand-600">*</span>}
          {hint && (
            <span className="ml-2 font-normal normal-case tracking-normal text-ink-400">
              {hint}
            </span>
          )}
        </Label>
        {counter && <span className="text-[11px] tabular-nums text-ink-500">{counter}</span>}
      </div>
      {children}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-brand-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
