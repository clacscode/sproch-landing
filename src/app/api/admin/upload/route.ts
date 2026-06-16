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

  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(absDir, filename), buffer);

  // URL pública: se sirve estáticamente quitando el prefijo "public/".
  const publicPath = `/${path.posix.join(uploadDir.replace(/^public\/?/, ""), filename)}`;
  return NextResponse.json({ url: publicPath });
}
