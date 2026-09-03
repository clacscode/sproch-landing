"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertCircle, ArrowRight, CreditCard, ExternalLink, Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox, Field } from "@/components/admin/form-bits";
import { useToast } from "@/components/admin/feedback";
import { cn } from "@/lib/cn";
import { useUnsavedChanges } from "@/lib/use-unsaved-changes";
import {
  DEFAULT_PAYMENT_LABEL,
  paymentLinkSchema,
  type PaymentLinkInput,
} from "@/lib/validations/settings";
import { updatePaymentLink } from "@/server/actions/admin/settings";

/**
 * Réplica en miniatura de la botonera del header para que el admin vea, sin
 * salir del panel, dónde y cómo queda el botón que está configurando.
 */
function HeaderPreview({ label, visible }: { label: string; visible: boolean }) {
  return (
    <div className="border-ink-200 overflow-hidden rounded-lg border">
      <div className="bg-ink-950 flex flex-wrap items-center justify-end gap-2 px-4 py-4">
        <span className="font-display mr-auto text-sm tracking-[0.18em] text-white/40 uppercase">
          SPROCh
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
          <UserPlus size={13} aria-hidden />
          Hazte socio
        </span>
        {visible && (
          <span className="border-brand-500/50 bg-brand-500/10 ring-brand-500/30 inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold text-white ring-2">
            <CreditCard size={13} aria-hidden className="text-brand-400" />
            {label}
          </span>
        )}
        <span className="bg-brand-600 inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold text-white">
          Inscríbete
          <ArrowRight size={13} aria-hidden />
        </span>
      </div>
      <p className="bg-ink-50 text-ink-500 px-4 py-2 text-xs">
        {visible
          ? "Así se ve en el encabezado del sitio, entre “Hazte socio” e “Inscríbete”."
          : "El botón está oculto: el encabezado se ve sin él."}
      </p>
    </div>
  );
}

export function PaymentLinkForm({ initial }: { initial: PaymentLinkInput }) {
  const router = useRouter();
  const toast = useToast();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PaymentLinkInput>({
    resolver: zodResolver(paymentLinkSchema),
    defaultValues: initial,
  });

  useUnsavedChanges(isDirty && !isSubmitting);

  const enabled = watch("paymentEnabled");
  const label = watch("paymentLabel")?.trim() || DEFAULT_PAYMENT_LABEL;
  const url = watch("paymentUrl")?.trim() ?? "";
  const live = enabled && url !== "";

  async function onSubmit(values: PaymentLinkInput) {
    setServerError(null);
    const res = await updatePaymentLink(values);
    if (res.ok) {
      toast.success("Configuración guardada.");
      reset(values);
      router.refresh();
      return;
    }
    if (res.fieldErrors) {
      for (const [field, message] of Object.entries(res.fieldErrors)) {
        setError(field as keyof PaymentLinkInput, { message });
      }
    }
    setServerError(res.error);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <section className="border-ink-200 space-y-5 rounded-lg border bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-ink-900 text-lg tracking-tight uppercase">
              Botón de pago de socios
            </h2>
            <p className="text-ink-500 mt-1 text-sm">
              Agrega un botón en el encabezado del sitio que lleva al link de pago de tu pasarela.
              Se abre en una pestaña nueva.
            </p>
          </div>
          <span
            className={cn(
              "inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium",
              live ? "bg-green-50 text-green-700" : "bg-ink-100 text-ink-600",
            )}
          >
            {live ? "Visible en el sitio" : "Oculto"}
          </span>
        </div>

        <Checkbox
          label="Mostrar el botón en el sitio"
          hint="Desactívalo para esconderlo sin perder el link configurado."
          {...register("paymentEnabled")}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Texto del botón"
            htmlFor="paymentLabel"
            error={errors.paymentLabel?.message}
            hint={`Vacío = “${DEFAULT_PAYMENT_LABEL}”.`}
          >
            <Input
              id="paymentLabel"
              placeholder={DEFAULT_PAYMENT_LABEL}
              maxLength={40}
              {...register("paymentLabel")}
            />
          </Field>

          <Field
            label="Link de pago"
            htmlFor="paymentUrl"
            error={errors.paymentUrl?.message}
            hint="El link que entrega tu pasarela (Flow, Webpay, Mercado Pago, transferencia…)."
            required={enabled}
          >
            <Input
              id="paymentUrl"
              type="url"
              inputMode="url"
              placeholder="https://..."
              {...register("paymentUrl")}
            />
          </Field>
        </div>

        {url !== "" && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-700 hover:text-brand-800 inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            <ExternalLink size={14} aria-hidden />
            Probar el link en una pestaña nueva
          </a>
        )}

        <HeaderPreview label={label} visible={live} />
      </section>

      {serverError && (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle size={16} aria-hidden />
          {serverError}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 size={15} aria-hidden className="animate-spin" />}
          Guardar cambios
        </Button>
        {isDirty && !isSubmitting && (
          <span className="text-ink-400 text-xs">Cambios sin guardar</span>
        )}
      </div>
    </form>
  );
}
