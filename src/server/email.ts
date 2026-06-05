import "server-only";
import { siteConfig } from "@/lib/site";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Tabla simple etiqueta → valor; omite los campos vacíos. */
export function fieldsTable(fields: { label: string; value?: string | null }[]): string {
  const rows = fields
    .filter((f) => f.value && String(f.value).trim())
    .map(
      (f) => `
        <tr>
          <td style="padding:8px 12px;border:1px solid #e5e5e5;background:#fafafa;font-weight:600;vertical-align:top;white-space:nowrap;">${escapeHtml(f.label)}</td>
          <td style="padding:8px 12px;border:1px solid #e5e5e5;white-space:pre-wrap;">${escapeHtml(String(f.value))}</td>
        </tr>`,
    )
    .join("");
  return `<table style="border-collapse:collapse;width:100%;font-size:14px;">${rows}</table>`;
}

export function emailLayout(opts: {
  title: string;
  subtitle?: string;
  bodyHtml: string;
  footer?: string;
}): string {
  return `
    <div style="font-family:system-ui,Arial,sans-serif;color:#111;max-width:680px;">
      <h2 style="margin:0 0 4px;">${escapeHtml(opts.title)}</h2>
      ${opts.subtitle ? `<p style="margin:0 0 16px;color:#555;">${escapeHtml(opts.subtitle)}</p>` : ""}
      ${opts.bodyHtml}
      ${opts.footer ? `<p style="margin:18px 0 0;color:#888;font-size:12px;">${escapeHtml(opts.footer)}</p>` : ""}
    </div>`;
}

interface SendEmailArgs {
  subject: string;
  html: string;
  /** Correo del remitente real, para poder responderle directo. */
  replyTo?: string;
  /** Destino; por defecto CONTACT_INBOX o el email institucional. */
  to?: string;
}

/**
 * Envía un email vía la API de Resend. Devuelve true si se envió.
 * Si falta RESEND_API_KEY (o falla el envío), devuelve false sin lanzar,
 * para que quien llama decida el respaldo (ej. loguear el contenido).
 */
export async function sendEmail({ subject, html, replyTo, to }: SendEmailArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.EMAIL_FROM ?? "SPROCh <onboarding@resend.dev>";
  const dest = to ?? process.env.CONTACT_INBOX ?? siteConfig.email;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: dest, reply_to: replyTo, subject, html }),
    });
    if (!res.ok) {
      console.error("[email] Resend respondió con error:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] fallo al enviar por Resend:", err);
    return false;
  }
}
