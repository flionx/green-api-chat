const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

export function formatTime(ts: number): string {
    return new Date(ts).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

export function formatListTime(ts: number, now = Date.now()): string {
    const date = new Date(ts);
    if (sameDay(date, new Date(now))) return formatTime(ts);
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}

export const dayKey = (ts: number): string => new Date(ts).toDateString();

export function formatDay(ts: number, now = Date.now()): string {
    const date = new Date(ts);
    const today = new Date(now);
    if (sameDay(date, today)) return "Сегодня";

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (sameDay(date, yesterday)) return "Вчера";

    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
    if (date.getFullYear() !== today.getFullYear()) options.year = "numeric";
    return date.toLocaleDateString("ru-RU", options);
}
