"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

interface NewsSearchProps {
  initialQuery?: string;
  initialTag?: string;
}

export function NewsSearch({ initialQuery = "", initialTag }: NewsSearchProps) {
  const router = useRouter();
  const [value, setValue] = React.useState(initialQuery);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  const submit = (next: string) => {
    const sp = new URLSearchParams();
    if (initialTag) sp.set("tag", initialTag);
    const trimmed = next.trim();
    if (trimmed) sp.set("q", trimmed);
    const queryString = sp.toString();
    router.push(`/noticias${queryString ? `?${queryString}` : ""}`);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(value);
  };

  const clear = () => {
    setValue("");
    submit("");
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      aria-label="Buscar noticias"
      className="relative w-full max-w-md"
    >
      <Search
        size={16}
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-500"
      />
      <input
        ref={inputRef}
        type="search"
        placeholder="Buscar por palabra clave…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-11 w-full rounded-full border border-ink-200 bg-white pl-11 pr-12 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus-visible:border-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-1"
        aria-label="Buscar"
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          className="absolute right-3 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-ink-100 hover:text-ink-900"
          aria-label="Limpiar búsqueda"
        >
          <X size={14} aria-hidden />
        </button>
      )}
      <button type="submit" className="sr-only" aria-hidden>
        Buscar
      </button>
    </form>
  );
}
