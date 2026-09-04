import { headers } from "next/headers";

/**
 * Límite de frecuencia por IP, en memoria del proceso.
 *
 * El sitio corre como un único proceso Node en Hostinger, así que un Map basta:
 * no hay Redis ni instancias múltiples con las que compartir estado. Las dos
 * consecuencias a tener presentes son que el contador se reinicia con cada
 * deploy/restart y que no sirve si algún día el sitio escala a varias réplicas.
 *
 * Es una barrera contra floods y fuerza bruta, no contra un atacante decidido
 * con IPs rotativas. Para eso haría falta un WAF delante.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

/** Purga perezosa: sin esto el Map crece sin techo con IPs que no vuelven. */
function sweep(now: number) {
  if (buckets.size < 5_000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  /** Segundos que faltan para que se libere el cupo (0 si `ok`). */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  { limit, windowMs }: { limit: number; windowMs: number },
): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/**
 * IP del visitante según las cabeceras del proxy de Hostinger. El primer valor
 * de x-forwarded-for es el cliente; el resto son saltos intermedios.
 *
 * Es falsificable si alguien llega al puerto de Node sin pasar por el proxy,
 * pero en este hosting el tráfico entra siempre por ahí.
 */
export async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return h.get("x-real-ip")?.trim() || "desconocida";
}

/** Mensaje único para no dar pistas sobre el umbral exacto. */
export function tooManyRequestsMessage(retryAfter: number): string {
  const minutes = Math.max(1, Math.ceil(retryAfter / 60));
  return `Demasiados intentos. Vuelve a intentarlo en ${minutes} ${minutes === 1 ? "minuto" : "minutos"}.`;
}
