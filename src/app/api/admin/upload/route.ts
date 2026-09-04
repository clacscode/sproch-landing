import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const ALLOWED_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/**
 * Firma real del archivo. `file.type` lo declara el cliente, así que por sí
 * solo no prueba nada: comprobamos los primeros bytes antes de escribir a
 * disco, y que coincidan con el tipo declarado.
 */
function sniffImageType(buf: Buffer): keyof typeof ALLOWED_EXT | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    buf.length >= 8 &&
    buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    return "image/png";
  }
  // RIFF....WEBP
  if (
    buf.length >= 12 &&
    buf.subarray(0, 4).toString("ascii") === "RIFF" &&
    buf.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "image/webp";
  }
  return null;
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Archivo no recibido" }, { status: 400 });
  }

  const ext = ALLOWED_EXT[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Formato no permitido (usa JPG, PNG o WebP)" },
      { status: 415 },
    );
  }

  const maxMb = Number(process.env.UPLOAD_MAX_MB ?? "6");
  if (file.size > maxMb * 1024 * 1024) {
    return NextResponse.json({ error: `La imagen supera ${maxMb} MB` }, { status: 413 });
  }

  const uploadDir = process.env.UPLOAD_DIR ?? "public/uploads";
  const absDir = path.join(process.cwd(), uploadDir);
  await mkdir(absDir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  const sniffed = sniffImageType(buffer);
  if (!sniffed || sniffed !== file.type) {
    return NextResponse.json(
      { error: "El archivo no es una imagen JPG, PNG o WebP válida" },
      { status: 415 },
    );
  }

  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  await writeFile(path.join(absDir, filename), buffer);

  // URL pública: se sirve estáticamente quitando el prefijo "public/".
  const publicPath = `/${path.posix.join(uploadDir.replace(/^public\/?/, ""), filename)}`;
  return NextResponse.json({ url: publicPath });
}
