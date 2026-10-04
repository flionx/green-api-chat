export function normalizePhone(input: string): string | null {
    let digits = input.replace(/\D/g, "");
    if (digits.length === 11 && digits.startsWith("8")) digits = "7" + digits.slice(1);
    else if (digits.length === 10) digits = "7" + digits;
    return /^\d{11,15}$/.test(digits) ? digits : null;
}
