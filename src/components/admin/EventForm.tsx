"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import type { JSONContent } from "@tiptap/core";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  type Control,
  type Resolver,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { AlertCircle, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox, Field, Select } from "@/components/admin/form-bits";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { EMPTY_DOC } from "@/lib/tiptap";
import { eventSchema } from "@/lib/validations/event";
import { createEvent, updateEvent } from "@/server/actions/admin/events";

type Tier = "platinum" | "gold" | "silver" | "bronze" | "";

export interface EventFormValues {
  title: string;
  slug: string;
  summary: string;
  content: JSONContent;
  startDate: string;
  endDate: string;
  location: string;
  coverImage: string;
  capacity: number | null;
  priceCLP: number;
  priceFrom: boolean;
  hidePrice: boolean;
  registrationUrl: string;
  featured: boolean;
  category: "CURSO" | "CONGRESO";
  status: "DRAFT" | "PUBLISHED" | "CANCELLED" | "FINISHED";
  speakers: { name: string; country: string; bio: string; avatar: string }[];
  sponsors: { name: string; logo: string; url: string; tier: Tier }[];
  program: { day: string; items: { time: string; title: string }[] }[];
}

interface EventFormProps {
  mode: "create" | "edit";
  id?: string;
  initial?: EventFormValues;
}

const SectionCard = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) => (
  <section className="space-y-5 rounded-lg border border-ink-200 bg-white p-6">
    <div>
      <h2 className="font-display text-lg uppercase tracking-tight text-ink-900">{title}</h2>
      {description && <p className="mt-1 text-sm text-ink-500">{description}</p>}
    </div>
    {children}
  </section>
);

const RowBox = ({
  onRemove,
  children,
}: {
  onRemove: () => void;
  children: React.ReactNode;
}) => (
  <div className="relative rounded-md border border-ink-200 bg-ink-50/60 p-4">
    <button
      type="button"
      onClick={onRemove}
      aria-label="Eliminar"
      className="absolute right-2 top-2 rounded p-1 text-ink-400 hover:bg-ink-100 hover:text-red-600"
    >
      <Trash2 size={15} aria-hidden />
    </button>
    {children}
  </div>
);

/** Editor de ítems (hora + actividad) de un día del programa. */
function ProgramDayItems({
  control,
  dayIndex,
}: {
  control: Control<EventFormValues>;
  dayIndex: number;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `program.${dayIndex}.items` as const,
  });
  return (
    <div className="mt-3 space-y-2">
      {fields.map((item, i) => (
        <div key={item.id} className="flex items-center gap-2">
          <Controller
            control={control}
            name={`program.${dayIndex}.items.${i}.time` as const}
            render={({ field }) => (
              <Input {...field} placeholder="09:00" className="h-9 w-24 shrink-0" />
            )}
          />
          <Controller
            control={control}
            name={`program.${dayIndex}.items.${i}.title` as const}
            render={({ field }) => (
              <Input {...field} placeholder="Actividad" className="h-9 flex-1" />
            )}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            aria-label="Quitar actividad"
            className="rounded p-1.5 text-ink-400 hover:bg-ink-100 hover:text-red-600"
          >
            <Trash2 size={14} aria-hidden />
          </button>
        </div>
      ))}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => append({ time: "", title: "" })}
      >
        <Plus size={14} aria-hidden /> Agregar actividad
      </Button>
    </div>
  );
}

export function EventForm({ mode, id, initial }: EventFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema) as unknown as Resolver<EventFormValues>,
    defaultValues:
      initial ??
      ({
        title: "",
        slug: "",
        summary: "",
        content: EMPTY_DOC,
        startDate: "",
        endDate: "",
        location: "",
        coverImage: "",
        capacity: null,
        priceCLP: 0,
        priceFrom: false,
        hidePrice: false,
        registrationUrl: "",
        featured: false,
        category: "CURSO",
        status: "DRAFT",
        speakers: [],
        sponsors: [],
        program: [],
      } satisfies EventFormValues),
  });

  const speakers = useFieldArray({ control, name: "speakers" });
  const sponsors = useFieldArray({ control, name: "sponsors" });
  const program = useFieldArray({ control, name: "program" });

  async function onSubmit(values: EventFormValues) {
    setServerError(null);
    const res = mode === "edit" && id ? await updateEvent(id, values) : await createEvent(values);
    if (res.ok) {
      router.push("/admin/eventos");
      router.refresh();
      return;
    }
    setServerError(res.error);
    if (res.fieldErrors) {
      for (const [key, message] of Object.entries(res.fieldErrors)) {
        setError(key as keyof EventFormValues, { message });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} aria-hidden />
          {serverError}
        </div>
      )}

      {/* Datos básicos */}
      <SectionCard title="Datos básicos">
        <Field label="Título" htmlFor="title" required error={errors.title?.message}>
          <Input id="title" {...register("title")} placeholder="Nombre del curso o congreso" />
        </Field>
        <Field
          label="Resumen"
          htmlFor="summary"
          required
          error={errors.summary?.message}
          hint="Bajada corta para tarjetas y hero."
        >
          <Textarea id="summary" rows={3} {...register("summary")} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Categoría" htmlFor="category" error={errors.category?.message}>
            <Select id="category" {...register("category")}>
              <option value="CURSO">Curso</option>
              <option value="CONGRESO">Congreso</option>
            </Select>
          </Field>
          <Field label="Estado" htmlFor="status" error={errors.status?.message}>
            <Select id="status" {...register("status")}>
              <option value="DRAFT">Borrador</option>
              <option value="PUBLISHED">Publicado</option>
              <option value="FINISHED">Finalizado</option>
              <option value="CANCELLED">Cancelado</option>
            </Select>
          </Field>
          <Field label="Fecha de inicio" htmlFor="startDate" required error={errors.startDate?.message}>
            <Input id="startDate" type="date" {...register("startDate")} />
          </Field>
          <Field label="Fecha de término" htmlFor="endDate" required error={errors.endDate?.message}>
            <Input id="endDate" type="date" {...register("endDate")} />
          </Field>
        </div>
        <Field label="Lugar / sede" htmlFor="location" required error={errors.location?.message}>
          <Input id="location" {...register("location")} placeholder="Hotel, ciudad" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Slug (URL)" htmlFor="slug" error={errors.slug?.message} hint="Opcional, se genera solo.">
            <Input id="slug" {...register("slug")} placeholder="se-genera-solo" />
          </Field>
          <Field label="Imagen / afiche" error={errors.coverImage?.message}>
            <Controller
              control={control}
              name="coverImage"
              render={({ field }) => (
                <ImageUploadField value={field.value} onChange={field.onChange} />
              )}
            />
          </Field>
        </div>
        <Controller
          control={control}
          name="featured"
          render={({ field }) => (
            <Checkbox
              label="Destacar en portada y hero"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          )}
        />
      </SectionCard>

      {/* Descripción */}
      <SectionCard title="Descripción" description="Cuerpo del evento (programa académico, detalles).">
        <Field label="Contenido" required error={errors.content?.message as string | undefined}>
          <Controller
            control={control}
            name="content"
            render={({ field }) => <RichTextEditor value={field.value} onChange={field.onChange} />}
          />
        </Field>
      </SectionCard>

      {/* Inscripción y tarifas */}
      <SectionCard title="Inscripción y tarifas">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Precio (CLP)" htmlFor="priceCLP" error={errors.priceCLP?.message} hint="0 = sin costo.">
            <Input
              id="priceCLP"
              type="number"
              min={0}
              step={1000}
              {...register("priceCLP", { valueAsNumber: true })}
            />
          </Field>
          <Field
            label="Cupos"
            htmlFor="capacity"
            error={errors.capacity?.message}
            hint="Opcional."
          >
            <Input
              id="capacity"
              type="number"
              min={1}
              {...register("capacity", {
                setValueAs: (v) => (v === "" || v === null ? null : Number(v)),
              })}
            />
          </Field>
        </div>
        <Field
          label="URL de inscripción externa"
          htmlFor="registrationUrl"
          error={errors.registrationUrl?.message}
          hint="Ej. Welcu. Si se define, el botón de inscripción la usa."
        >
          <Input id="registrationUrl" {...register("registrationUrl")} placeholder="https://welcu.com/…" />
        </Field>
        <div className="space-y-3">
          <Controller
            control={control}
            name="priceFrom"
            render={({ field }) => (
              <Checkbox
                label='Mostrar precio como "Desde …"'
                hint="Útil cuando hay varias tarifas."
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          <Controller
            control={control}
            name="hidePrice"
            render={({ field }) => (
              <Checkbox
                label="Ocultar precio destacado"
                hint="Las tarifas pueden ir dentro de la descripción."
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </div>
      </SectionCard>

      {/* Expositores */}
      <SectionCard title="Expositores">
        <div className="space-y-3">
          {speakers.fields.map((row, i) => (
            <RowBox key={row.id} onRemove={() => speakers.remove(i)}>
              <div className="grid gap-3 pr-6 sm:grid-cols-2">
                <Input {...register(`speakers.${i}.name`)} placeholder="Nombre" />
                <Input {...register(`speakers.${i}.country`)} placeholder="País (opcional)" />
                <Input
                  {...register(`speakers.${i}.bio`)}
                  placeholder="Bio breve (opcional)"
                  className="sm:col-span-2"
                />
              </div>
            </RowBox>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => speakers.append({ name: "", country: "", bio: "", avatar: "" })}
          >
            <Plus size={14} aria-hidden /> Agregar expositor
          </Button>
        </div>
      </SectionCard>

      {/* Auspiciadores */}
      <SectionCard title="Auspiciadores">
        <div className="space-y-3">
          {sponsors.fields.map((row, i) => (
            <RowBox key={row.id} onRemove={() => sponsors.remove(i)}>
              <div className="grid gap-3 pr-6 sm:grid-cols-2">
                <Input {...register(`sponsors.${i}.name`)} placeholder="Nombre" />
                <Select {...register(`sponsors.${i}.tier`)}>
                  <option value="">Sin nivel</option>
                  <option value="platinum">Platinum</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="bronze">Bronze</option>
                </Select>
                <Input {...register(`sponsors.${i}.url`)} placeholder="URL (opcional)" />
                <Controller
                  control={control}
                  name={`sponsors.${i}.logo` as const}
                  render={({ field }) => (
                    <ImageUploadField value={field.value} onChange={field.onChange} />
                  )}
                />
              </div>
            </RowBox>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => sponsors.append({ name: "", logo: "", url: "", tier: "" })}
          >
            <Plus size={14} aria-hidden /> Agregar auspiciador
          </Button>
        </div>
      </SectionCard>

      {/* Programa */}
      <SectionCard title="Programa" description="Agenda día a día (opcional).">
        <div className="space-y-4">
          {program.fields.map((row, i) => (
            <RowBox key={row.id} onRemove={() => program.remove(i)}>
              <div className="pr-6">
                <Input
                  {...register(`program.${i}.day`)}
                  placeholder="Día (ej. Jueves 30 de julio)"
                  className="font-medium"
                />
                <ProgramDayItems control={control} dayIndex={i} />
              </div>
            </RowBox>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => program.append({ day: "", items: [] })}
          >
            <Plus size={14} aria-hidden /> Agregar día
          </Button>
        </div>
      </SectionCard>

      <div className="flex items-center gap-3 border-t border-ink-200 pt-6">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 size={16} className="animate-spin" aria-hidden />}
          {mode === "edit" ? "Guardar cambios" : "Crear evento"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/eventos")}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
