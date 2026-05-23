"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, ChevronDown, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  INQUIRY_LABELS,
  INQUIRY_TYPES,
  MESSAGE_MAX,
  SUBJECT_MAX,
  contactSchema,
  type ContactInput,
  type InquiryType,
} from "@/lib/validations/contact";
import { submitContactAction } from "@/server/actions/contact";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      inquiryType: "general",
      subject: "",
      message: "",
      website: "",
    },
  });

  const messageValue = watch("message") ?? "";
  const subjectValue = watch("subject") ?? "";

  const [serverError, setServerError] = React.useState<string | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const result = await submitContactAction(values);
    if (!result.ok) {
      if (result.fieldErrors) {
        for (const [key, message] of Object.entries(result.fieldErrors)) {
          setError(key as keyof ContactInput, { message });
        }
      }
      setServerError(result.error);
      return;
    }
    reset();
  });

  if (isSubmitSuccessful && !serverError) {
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
            Mensaje enviado
          </p>
          <h3 className="mt-2 font-display text-3xl uppercase leading-tight tracking-tight text-emerald-950 md:text-4xl">
            Gracias por escribirnos
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-emerald-900/80">
            Recibimos tu consulta correctamente. Un miembro del equipo te responderá en un
            plazo máximo de <strong className="font-semibold">48 horas hábiles</strong> al correo
            que indicaste.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              type="button"
              onClick={() => reset()}
              variant="outline"
              size="sm"
            >
              Enviar otro mensaje
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

  const messageOverMax = messageValue.length > MESSAGE_MAX;
  const messageWarning = messageValue.length > MESSAGE_MAX * 0.9 && !messageOverMax;

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Nombre completo"
          required
          htmlFor="name"
          error={errors.name?.message}
        >
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name || undefined}
            {...register("name")}
          />
        </Field>
        <Field
          label="Correo electrónico"
          required
          htmlFor="email"
          error={errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email || undefined}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Teléfono" hint="Opcional" htmlFor="phone" error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+56 9 1234 5678"
            {...register("phone")}
          />
        </Field>
        <Field
          label="Tipo de consulta"
          htmlFor="inquiryType"
          error={errors.inquiryType?.message}
        >
          <div className="relative">
            <select
              id="inquiryType"
              {...register("inquiryType")}
              className="flex h-11 w-full appearance-none rounded-md border border-ink-200 bg-white px-3 pr-9 py-2 text-sm text-ink-900 transition-colors focus-visible:border-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1"
              defaultValue="general"
            >
              {INQUIRY_TYPES.map((t: InquiryType) => (
                <option key={t} value={t}>
                  {INQUIRY_LABELS[t]}
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
      </div>

      <Field
        label="Asunto"
        required
        htmlFor="subject"
        error={errors.subject?.message}
        counter={`${subjectValue.length}/${SUBJECT_MAX}`}
      >
        <Input
          id="subject"
          aria-invalid={!!errors.subject || undefined}
          placeholder="Resumen breve de tu consulta"
          maxLength={SUBJECT_MAX + 20}
          {...register("subject")}
        />
      </Field>

      <Field
        label="Mensaje"
        required
        htmlFor="message"
        error={errors.message?.message}
        counter={
          <span
            className={
              messageOverMax
                ? "text-brand-700"
                : messageWarning
                  ? "text-amber-700"
                  : "text-ink-500"
            }
          >
            {messageValue.length.toLocaleString("es-CL")}/{MESSAGE_MAX.toLocaleString("es-CL")}
          </span>
        }
      >
        <Textarea
          id="message"
          rows={7}
          placeholder="Cuéntanos en qué te podemos apoyar. Mientras más contexto, mejor podremos derivar tu consulta."
          aria-invalid={!!errors.message || undefined}
          {...register("message")}
        />
      </Field>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <Label htmlFor="website">No completar</Label>
        <Input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {serverError && (
        <p
          role="alert"
          className="rounded-md border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800"
        >
          {serverError}
        </p>
      )}

      <div className="flex flex-col gap-4 border-t border-ink-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-ink-500">
          Al enviar este formulario aceptas que SPROCh utilice tus datos exclusivamente para
          responder tu consulta. No compartimos información con terceros.
        </p>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="btn-glow min-w-44"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden />
              Enviando…
            </>
          ) : (
            <>
              Enviar mensaje
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
        <Label htmlFor={htmlFor} className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-700">
          {label}
          {required && <span className="ml-1 text-brand-600">*</span>}
          {hint && (
            <span className="ml-2 font-normal normal-case tracking-normal text-ink-400">
              {hint}
            </span>
          )}
        </Label>
        {counter && (
          <span className="text-[11px] tabular-nums text-ink-500">{counter}</span>
        )}
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
