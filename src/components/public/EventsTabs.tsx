"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard } from "@/components/public/EventCard";
import type { EventItem } from "@/lib/types";

interface EventsTabsProps {
  todos: EventItem[];
  cursos: EventItem[];
  congresos: EventItem[];
  comingSoon?: boolean;
}

function Empty({ comingSoon }: { comingSoon?: boolean }) {
  if (comingSoon)
    return (
      <div className="rounded-3xl border border-dashed border-ink-200 bg-white px-6 py-16 text-center">
        <p className="font-display text-2xl uppercase tracking-tight text-ink-900">
          Próximamente más información
        </p>
        <p className="mx-auto mt-3 max-w-md text-ink-600">
          Estamos preparando nuevas instancias formativas. Muy pronto publicaremos las fechas,
          programas e inscripciones.
        </p>
      </div>
    );
  return (
    <p className="rounded-lg border border-dashed border-ink-200 p-12 text-center text-ink-500">
      No hay eventos publicados en esta categoría.
    </p>
  );
}

function Grid({ items, comingSoon }: { items: EventItem[]; comingSoon?: boolean }) {
  if (items.length === 0) return <Empty comingSoon={comingSoon} />;
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((event) => (
        <li key={event.id}>
          <EventCard event={event} variant={event.featured ? "featured" : "default"} />
        </li>
      ))}
    </ul>
  );
}

export function EventsTabs({ todos, cursos, congresos, comingSoon }: EventsTabsProps) {
  return (
    <Tabs defaultValue="todos">
      <TabsList>
        <TabsTrigger value="todos">Todos ({todos.length})</TabsTrigger>
        <TabsTrigger value="congresos">Congresos ({congresos.length})</TabsTrigger>
        <TabsTrigger value="cursos">Cursos ({cursos.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="todos">
        <Grid items={todos} comingSoon={comingSoon} />
      </TabsContent>
      <TabsContent value="congresos">
        <Grid items={congresos} comingSoon={comingSoon} />
      </TabsContent>
      <TabsContent value="cursos">
        <Grid items={cursos} comingSoon={comingSoon} />
      </TabsContent>
    </Tabs>
  );
}
