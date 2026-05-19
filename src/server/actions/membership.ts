"use server";

import { membershipSchema, type MembershipInput } from "@/lib/validations/membership";

export type MembershipResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<keyof MembershipInput, string>> };

export async function submitMembershipAction(
  _: MembershipResult | null,
  formData: FormData,
): Promise<MembershipResult> {
  const parsed = membershipSchema.safeParse({
    fullName: formData.get("fullName")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    rut: formData.get("rut")?.toString() ?? "",
    category: formData.get("category")?.toString() ?? "",
    institution: formData.get("institution")?.toString() ?? "",
    city: formData.get("city")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    acceptTerms: formData.get("acceptTerms")?.toString() ?? "",
    hp: formData.get("hp")?.toString() ?? "",
  });
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof MembershipInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof MembershipInput | undefined;
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Revisa los campos marcados", fieldErrors };
  }
  if (parsed.data.hp) return { ok: true };

  // TODO (F2): persistir en DB + email
  if (process.env.NODE_ENV !== "production") {
    console.info("[membership] nueva solicitud:", {
      name: parsed.data.fullName,
      email: parsed.data.email,
      category: parsed.data.category,
    });
  }

  return { ok: true };
}
