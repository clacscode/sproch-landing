"use client";

import * as React from "react";
import { ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  submitMembershipAction,
  type MembershipResult,
} from "@/server/actions/membership";
import { siteConfig } from "@/lib/site";

export function MembershipForm() {
  const [pending, startTransition] = React.useTransition();
  const [state, setState] = React.useState<MembershipResult | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const fieldErr = (k: string) =>
    !state || state.ok ? undefined : (state.fieldErrors as Record<string, string> | undefined)?.[k];

  const reset = () => {
    formRef.current?.reset();
    setState(null);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitMembershipAction(state, fd);
      setState(res);
      // No usar e.currentTarget acá: tras el await ya es null (React lo limpia
      // al terminar el dispatch del evento) y revienta la página.
      if (res.ok) formRef.current?.reset();
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
            Gracias por postular
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-emerald-900/80">
            Recibimos tu Solicitud de Incorporación como Socio de Número. El Directorio revisará tus
            antecedentes y te contactaremos con los próximos pasos formales (firma, fotografía y
            resolución).
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
    <form ref={formRef} onSubmit={onSubmit} className="space-y-8" noValidate>
      {/* — Datos personales — */}
      <fieldset className="space-y-5">
        <SectionTitle n="01">Datos personales</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nombre completo" required htmlFor="fullName" error={fieldErr("fullName")}>
            <Input id="fullName" name="fullName" autoComplete="name" />
          </Field>
          <Field label="Cédula de identidad" required htmlFor="rut" error={fieldErr("rut")}>
            <Input id="rut" name="rut" placeholder="12.345.678-9" />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Fecha de nacimiento" hint="Opcional" htmlFor="birthDate" error={fieldErr("birthDate")}>
            <Input id="birthDate" name="birthDate" type="date" />
          </Field>
          <Field label="Dirección particular" hint="Opcional" htmlFor="addressPersonal" error={fieldErr("addressPersonal")}>
            <Input id="addressPersonal" name="addressPersonal" autoComplete="street-address" />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="E-mail" required htmlFor="email" error={fieldErr("email")}>
            <Input id="email" name="email" type="email" autoComplete="email" />
          </Field>
          <Field label="Teléfono" required htmlFor="phone" error={fieldErr("phone")}>
            <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+56 9 1234 5678" />
          </Field>
        </div>
      </fieldset>

      {/* — Datos profesionales — */}
      <fieldset className="space-y-5">
        <SectionTitle n="02">Datos profesionales</SectionTitle>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Fecha de título" hint="Opcional" htmlFor="degreeDate" error={fieldErr("degreeDate")}>
            <Input id="degreeDate" name="degreeDate" type="date" />
          </Field>
          <Field label="Teléfono profesional" hint="Opcional" htmlFor="phoneProfessional" error={fieldErr("phoneProfessional")}>
            <Input id="phoneProfessional" name="phoneProfessional" type="tel" />
          </Field>
        </div>
        <Field label="Dirección profesional" hint="Opcional" htmlFor="addressProfessional" error={fieldErr("addressProfessional")}>
          <Input id="addressProfessional" name="addressProfessional" placeholder="Clínica, consulta, universidad…" />
        </Field>
      </fieldset>

      {/* — Antecedentes — */}
      <fieldset className="space-y-5">
        <SectionTitle n="03">Antecedentes académicos y profesionales</SectionTitle>
        <p className="-mt-2 text-xs text-ink-500">Todos los campos de esta sección son opcionales.</p>
        <div className="grid gap-5 sm:grid-cols-2">
          <AreaField label="Estudios universitarios" name="universityStudies" err={fieldErr("universityStudies")} />
          <AreaField label="Cursos de post-grado" name="postgrad" err={fieldErr("postgrad")} />
          <AreaField label="Becas" name="scholarships" err={fieldErr("scholarships")} />
          <AreaField label="Experiencia docente" name="teaching" err={fieldErr("teaching")} />
          <AreaField label="Sociedades a las que pertenece" name="societies" err={fieldErr("societies")} />
          <AreaField label="Cargos profesionales" name="professionalRoles" err={fieldErr("professionalRoles")} />
          <AreaField label="Cargos gremiales" name="guildRoles" err={fieldErr("guildRoles")} />
          <AreaField label="Trabajos científicos realizados" name="scientificWork" err={fieldErr("scientificWork")} />
        </div>
        <Field label="Idiomas" hint="Opcional" htmlFor="languages" error={fieldErr("languages")}>
          <Input id="languages" name="languages" placeholder="Ej. Español, Inglés, Portugués" />
        </Field>
      </fieldset>

      {/* — Patrocinante — */}
      <fieldset className="space-y-5">
        <SectionTitle n="04">Patrocinante</SectionTitle>
        <Field
          label="Socio que te presenta"
          hint="Opcional"
          htmlFor="sponsor"
          error={fieldErr("sponsor")}
        >
          <Input id="sponsor" name="sponsor" placeholder="Nombre y apellidos del socio patrocinante" />
        </Field>
      </fieldset>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <Input id="hp" name="hp" tabIndex={-1} autoComplete="off" />
      </div>

      {/* — Declaración — */}
      <div className="rounded-xl border border-ink-100 bg-ink-50/60 p-4">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
          <input
            type="checkbox"
            name="acceptStatutes"
            required
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink-300 text-brand-600 focus:ring-brand-600"
          />
          <span>
            Declaro estar en conocimiento de los Estatutos de la Sociedad de Prótesis y
            Rehabilitación Oral de Chile y me comprometo a respetarlos. Acepto que SPROCh utilice
            mis datos para gestionar esta solicitud.
          </span>
        </label>
        {fieldErr("acceptStatutes") && (
          <p className="mt-2 pl-7 text-xs font-medium text-brand-700">{fieldErr("acceptStatutes")}</p>
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
          Tras revisar tus antecedentes te solicitaremos la copia firmada y una fotografía para
          completar el registro. Enviar la solicitud no genera cobro automático.
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

function SectionTitle({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-sm text-brand-600 tabular-nums">{n}</span>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-700">{children}</h3>
      <span aria-hidden className="h-px flex-1 bg-ink-100" />
    </div>
  );
}

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, htmlFor, required, hint, error, children }: FieldProps) {
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

function AreaField({ label, name, err }: { label: string; name: string; err?: string }) {
  return (
    <Field label={label} hint="Opcional" htmlFor={name} error={err}>
      <Textarea id={name} name={name} rows={3} />
    </Field>
  );
}
