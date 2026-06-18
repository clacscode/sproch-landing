"use client";

import * as React from "react";
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from "lucide-react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*  Toasts                                                                     */
/* -------------------------------------------------------------------------- */

type ToastVariant = "success" | "error" | "info";

interface ToastItem {
  id: number;
  variant: ToastVariant;
  message: string;
}

interface ToastApi {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = React.createContext<ToastApi | null>(null);

const TOAST_STYLES: Record<
  ToastVariant,
  { icon: typeof CheckCircle2; ring: string; iconColor: string }
> = {
  success: { icon: CheckCircle2, ring: "border-green-200", iconColor: "text-green-600" },
  error: { icon: XCircle, ring: "border-red-200", iconColor: "text-red-600" },
  info: { icon: Info, ring: "border-ink-200", iconColor: "text-ink-500" },
};

function ToastViewport({
  toasts,
  dismiss,
}: {
  toasts: ToastItem[];
  dismiss: (id: number) => void;
}) {
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-0 sm:items-end"
    >
      {toasts.map((t) => {
        const style = TOAST_STYLES[t.variant];
        const Icon = style.icon;
        return (
          <div
            key={t.id}
            role="status"
            className={cn(
              "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border bg-white px-4 py-3 shadow-lift",
              "animate-[toast-in_220ms_cubic-bezier(0.16,1,0.3,1)]",
              style.ring,
            )}
          >
            <Icon size={18} aria-hidden className={cn("mt-0.5 shrink-0", style.iconColor)} />
            <p className="flex-1 text-sm text-ink-800">{t.message}</p>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Cerrar aviso"
              className="-mr-1 rounded p-0.5 text-ink-400 transition-colors hover:bg-ink-100 hover:text-ink-700"
            >
              <X size={15} aria-hidden />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function useToast(): ToastApi {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de <AdminFeedbackProvider>");
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*  Confirmación                                                              */
/* -------------------------------------------------------------------------- */

interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Estilo destructivo (rojo) para acciones irreversibles. */
  danger?: boolean;
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = React.createContext<ConfirmFn | null>(null);

interface ConfirmState extends ConfirmOptions {
  open: boolean;
  resolve?: (value: boolean) => void;
}

function ConfirmDialog({
  state,
  onResolve,
}: {
  state: ConfirmState;
  onResolve: (value: boolean) => void;
}) {
  const confirmRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!state.open) return;
    confirmRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onResolve(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [state.open, onResolve]);

  if (!state.open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div
        className="absolute inset-0 bg-ink-950/40 animate-[fade-in_150ms_ease]"
        onClick={() => onResolve(false)}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-xl border border-ink-200 bg-white p-6 shadow-lift animate-[dialog-in_200ms_cubic-bezier(0.16,1,0.3,1)]">
        <div className="flex items-start gap-4">
          {state.danger && (
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
              <AlertTriangle size={20} aria-hidden />
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h2 id="confirm-title" className="text-base font-semibold text-ink-900">
              {state.title}
            </h2>
            {state.description && (
              <p className="mt-1.5 text-sm text-ink-600">{state.description}</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => onResolve(false)}
            className="inline-flex h-10 items-center rounded-md px-4 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100"
          >
            {state.cancelLabel ?? "Cancelar"}
          </button>
          <button
            ref={confirmRef}
            type="button"
            onClick={() => onResolve(true)}
            className={cn(
              "inline-flex h-10 items-center rounded-md px-4 text-sm font-medium text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              state.danger
                ? "bg-red-600 hover:bg-red-700 focus-visible:ring-red-600"
                : "bg-brand-600 hover:bg-brand-700 focus-visible:ring-brand-600",
            )}
          >
            {state.confirmLabel ?? "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function useConfirm(): ConfirmFn {
  const ctx = React.useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm debe usarse dentro de <AdminFeedbackProvider>");
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*  Provider                                                                  */
/* -------------------------------------------------------------------------- */

export function AdminFeedbackProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  const idRef = React.useRef(0);

  const dismiss = React.useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = React.useCallback(
    (variant: ToastVariant, message: string) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, variant, message }]);
      window.setTimeout(() => dismiss(id), 4500);
    },
    [dismiss],
  );

  const toastApi = React.useMemo<ToastApi>(
    () => ({
      success: (m) => push("success", m),
      error: (m) => push("error", m),
      info: (m) => push("info", m),
    }),
    [push],
  );

  const [confirmState, setConfirmState] = React.useState<ConfirmState>({
    open: false,
    title: "",
  });

  const confirm = React.useCallback<ConfirmFn>((options) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({ ...options, open: true, resolve });
    });
  }, []);

  const resolveConfirm = React.useCallback(
    (value: boolean) => {
      confirmState.resolve?.(value);
      setConfirmState((prev) => ({ ...prev, open: false, resolve: undefined }));
    },
    [confirmState],
  );

  return (
    <ToastContext.Provider value={toastApi}>
      <ConfirmContext.Provider value={confirm}>
        {children}
        <ToastViewport toasts={toasts} dismiss={dismiss} />
        <ConfirmDialog state={confirmState} onResolve={resolveConfirm} />
      </ConfirmContext.Provider>
    </ToastContext.Provider>
  );
}
