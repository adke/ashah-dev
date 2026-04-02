export const CONTACT_EMAIL = "adish.shah2003@gmail.com" as const

export async function copyContactEmail(): Promise<boolean> {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      return true
    }
  } catch {
    /* ignore */
  }
  return false
}
