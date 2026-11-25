export const PHONE_HREF = "tel:+380969984248"
export const PHONE_TEXT = "+38 (096) 998-42-48"

// The field already shows +380, so drop a 0, 38 or 380 the visitor enters again.
// 382, 384 and 385 are real area codes (Khmelnytskyi), so a 38 before 2, 4 or 5 is
// only a country code when a full 9-digit number follows it.
export function toLocalDigits(digits: string) {
  return digits
    .replace(/^(?:0|38(?=[036-9]))+/, "")
    .replace(/^38(?=d{9}$)/, "")
    .slice(0, 9)
}
