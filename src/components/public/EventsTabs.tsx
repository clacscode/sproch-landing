"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard } from "@/components/public/EventCard";
import type { EventItem } from "@/lib/types";

interface EventsTabsProps {
  todos: EventItem[];
  cursos: EventItem[];
  congresos: EventItem[];
  /** Eventos ya finalizados, del más reciente al más antiguo. */
  pasados: EventItem[];
  comingSoon?: boolean;
}

function Empty({ comingSoon, message }: { comingSoon?: boolean; message?: string }) {
  if (message)
    return (
      <p className="border-ink-200 text-ink-500 rounded-lg border border-dashed p-12 text-center">
        {message}
      </p>
    );
  if (comingSoon)
    return (
      <div className="border-ink-200 rounded-3xl border border-dashed bg-white px-6 py-16 text-center">
        <p className="font-display text-ink-900 text-2xl tracking-tight uppercase">
          Próximamente más información
        </p>
        <p className="text-ink-600 mx-auto mt-3 max-w-md">
          Estamos preparando nuevas instancias formativas. Muy pronto publicaremos las fechas,
          programas e inscripciones.
        </p>
      </div>
    );
  return (
    <p className="border-ink-200 text-ink-500 rounded-lg border border-dashed p-12 text-center">
      No hay eventos publicados en esta categoría.
    </p>
  );
}

function Grid({
  items,
  comingSoon,
  emptyMessage,
  past,
}: {
  items: EventItem[];
  comingSoon?: boolean;
  emptyMessage?: string;
  past?: boolean;
}) {
  if (items.length === 0) return <Empty comingSoon={comingSoon} message={emptyMessage} />;
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((event) => (
        <li key={event.id}>
          <EventCard
            event={event}
            variant={!past && event.featured ? "featured" : "default"}
            past={past}
          />
        </li>
      ))}
    </ul>
  );
}

export function EventsTabs({ todos, cursos, congresos, pasados, comingSoon }: EventsTabsProps) {
  return (
    <Tabs defaultValue="todos">
      <TabsList className="h-auto flex-wrap">
        <TabsTrigger value="todos">Todos ({todos.length})</TabsTrigger>
        <TabsTrigger value="congresos">Congresos ({congresos.length})</TabsTrigger>
        <TabsTrigger value="cursos">Cursos ({cursos.length})</TabsTrigger>
        <TabsTrigger value="pasados">Eventos pasados ({pasados.length})</TabsTrigger>
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
      <TabsContent value="pasados">
        <Grid items={pasados} past emptyMessage="Todavía no hay eventos pasados publicados." />
      </TabsContent>
    </Tabs>
  );
}
