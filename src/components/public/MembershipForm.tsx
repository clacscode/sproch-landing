"use client";

import * as React from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  submitMembershipAction,
  type MembershipResult,
} from "@/server/actions/membership";

const selectCls =
  "mt-1.5 flex h-11 w-full rounded-md border border-ink-200 bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600";

export function MembershipForm() {
  const [pending, startTransition] = React.useTransition();
  const [state, setState] = React.useState<MembershipResult | null>(null);

  const fieldErr = (k: string) =>
    !state || state.ok ? undefined : (state.fieldErrors as Record<string, string> | undefined)?.[k];

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await submitMembershipAction(state, fd);
      setState(res);
      if (res.ok) e.currentTarget.reset();
    });
  };

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-emerald-900">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={22} />
          <p className="text-lg font-semibold">¡Solicitud recibida!</p>
        </div>
        <p className="mt-2 text-sm">
          Recibimos tu solicitud para sumarte a SPROCh. Te contactaremos en un plazo de 48 horas
          hábiles con los próximos pasos (cuota anual, formulario formal y acceso a beneficios).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Nombre completo *</Label>
          <Input id="fullName" name="fullName" autoComplete="name" className="mt-1.5" />
          {fieldErr("fullName") && (
            <p className="mt-1 text-xs text-brand-700">{fieldErr("fullName")}</p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Correo electrónico *</Label>
          <Input id="email" name="email" type="email" autoComplete="email" className="mt-1.5" />
          {fieldErr("email") && (
            <p className="mt-1 text-xs text-brand-700">{fieldErr("email")}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Teléfono</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="rut">RUT o identificador profesional</Label>
          <Input id="rut" name="rut" className="mt-1.5" placeholder="12.345.678-9" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="category">Categoría *</Label>
          <select id="category" name="category" defaultValue="" className={selectCls}>
            <option value="" disabled>
              Selecciona…
            </option>
            <option value="ESPECIALISTA">Especialista titulado</option>
            <option value="DOCENTE">Docente universitario</option>
            <option value="RESIDENTE">Residente de postgrado</option>
            <option value="ESTUDIANTE">Estudiante de pregrado</option>
            <option value="OTRO">Otro</option>
          </select>
          {fieldErr("category") && (
            <p className="mt-1 text-xs text-brand-700">{fieldErr("category")}</p>
          )}
        </div>
        <div>
          <Label htmlFor="city">Ciudad</Label>
          <Input id="city" name="city" className="mt-1.5" placeholder="Santiago" />
        </div>
      </div>

      <div>
        <Label htmlFor="institution">Institución o lugar de trabajo</Label>
        <Input
          id="institution"
          name="institution"
          className="mt-1.5"
          placeholder="Universidad, clínica, hospital, consulta privada…"
        />
      </div>

      <div>
        <Label htmlFor="message">Comentarios (opcional)</Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1.5"
          placeholder="Cuéntanos brevemente sobre tu interés en sumarte a SPROCh."
        />
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <Input id="hp" name="hp" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 text-sm text-ink-700">
        <input
          type="checkbox"
          name="acceptTerms"
          required
          className="mt-1 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-600"
        />
        <span>
          Acepto que SPROCh utilice mis datos para gestionar mi solicitud de membresía y
          contactarme con información institucional.
        </span>
      </label>
      {fieldErr("acceptTerms") && (
        <p className="text-xs text-brand-700">{fieldErr("acceptTerms")}</p>
      )}

      {state && !state.ok && (
        <p className="rounded-md border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-800">
          {state.error}
        </p>
      )}

      <div>
        <Button type="submit" size="lg" disabled={pending} className="btn-glow min-w-52">
          {pending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Enviando…
            </>
          ) : (
            "Enviar solicitud"
          )}
        </Button>
      </div>
    </form>
  );
}
