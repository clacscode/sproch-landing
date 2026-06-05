/**
 * Estado de consentimiento de cookies (analítica). Se persiste en localStorage
 * y se sincroniza entre el banner y el cargador de Google Analytics mediante
 * eventos del window, sin librerías externas.
 *
 * - "granted": el usuario aceptó → se carga GA.
 * - "denied": el usuario rechazó → no se carga ningún script de medición.
 * - null: aún no decidió → se muestra el banner.
 */
export type ConsentValue = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "sproch-consent-v1";
/** Se dispara cuando cambia la decisión (detail = ConsentValue). */
export const CONSENT_CHANGE_EVENT = "sproch:consent-change";
/** Se dispara para reabrir el banner (link "Cookies" del footer). */
export const CONSENT_REOPEN_EVENT = "sproch:consent-reopen";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setStoredConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Modo privado o storage deshabilitado: igual emitimos el evento para la sesión.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: value }));
}

/** Reabre el banner para que el usuario pueda cambiar o retirar su decisión. */
export function openConsentSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_REOPEN_EVENT));
}
