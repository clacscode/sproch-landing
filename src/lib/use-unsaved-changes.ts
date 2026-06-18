"use client";

import * as React from "react";

/**
 * Avisa al usuario antes de cerrar o recargar la pestaña cuando hay cambios
 * sin guardar en un formulario. Para la navegación interna (botón Cancelar,
 * enlaces) usar `useConfirm` explícitamente antes de navegar.
 */
export function useUnsavedChanges(enabled: boolean) {
  React.useEffect(() => {
    if (!enabled) return;
    function onBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [enabled]);
}
