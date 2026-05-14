"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventCard } from "@/components/public/EventCard";
import type { EventItem } from "@/lib/types";

interface EventsTabsProps {
  todos: EventItem[];
  cursos: EventItem[];
  congresos: EventItem[];
}

function Grid({ items }: { items: EventItem[] }) {
  if (items.length === 0)
    return (
      <p className="rounded-lg border border-dashed border-ink-200 p-12 text-center text-ink-500">
        No hay eventos publicados en esta categoría.
      </p>
    );
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

export function EventsTabs({ todos, cursos, congresos }: EventsTabsProps) {
  return (
    <Tabs defaultValue="todos">
      <TabsList>
        <TabsTrigger value="todos">Todos ({todos.length})</TabsTrigger>
        <TabsTrigger value="congresos">Congresos ({congresos.length})</TabsTrigger>
        <TabsTrigger value="cursos">Cursos ({cursos.length})</TabsTrigger>
      </TabsList>
      <TabsContent value="todos">
        <Grid items={todos} />
      </TabsContent>
      <TabsContent value="congresos">
        <Grid items={congresos} />
      </TabsContent>
      <TabsContent value="cursos">
        <Grid items={cursos} />
      </TabsContent>
    </Tabs>
  );
}
