"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";
import { submitContactAction } from "@/server/actions/contact";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "", website: "" },
  });

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
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-emerald-900">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={22} />
          <p className="text-lg font-semibold">¡Mensaje enviado!</p>
        </div>
        <p className="mt-2 text-sm">
          Recibimos tu consulta. Te responderemos en un plazo de 48 horas hábiles.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Nombre completo *</Label>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name || undefined}
            {...register("name")}
            className="mt-1.5"
          />
          {errors.name && <p className="mt-1 text-xs text-brand-700">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Correo electrónico *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email || undefined}
            {...register("email")}
            className="mt-1.5"
          />
          {errors.email && <p className="mt-1 text-xs text-brand-700">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Teléfono (opcional)</Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register("phone")}
            className="mt-1.5"
          />
          {errors.phone && <p className="mt-1 text-xs text-brand-700">{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="subject">Asunto *</Label>
          <Input
            id="subject"
            aria-invalid={!!errors.subject || undefined}
            {...register("subject")}
            className="mt-1.5"
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-brand-700">{errors.subject.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="message">Mensaje *</Label>
        <Textarea
          id="message"
          rows={6}
          aria-invalid={!!errors.message || undefined}
          {...register("message")}
          className="mt-1.5"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-brand-700">{errors.message.message}</p>
        )}
      </div>

      {/* Honeypot: oculto a usuarios humanos */}
      <div className="hidden" aria-hidden>
        <Label htmlFor="website">No completar</Label>
        <Input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {serverError && (
        <p className="rounded-md border border-brand-200 bg-brand-50 px-3 py-2 text-sm text-brand-800">
          {serverError}
        </p>
      )}

      <div>
        <Button type="submit" size="lg" disabled={isSubmitting} className="min-w-44">
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Enviando…
            </>
          ) : (
            "Enviar mensaje"
          )}
        </Button>
      </div>

      <p className="text-xs text-ink-500">
        Al enviar este formulario aceptas que SPROCh utilice tus datos exclusivamente para
        responder tu consulta.
      </p>
    </form>
  );
}
