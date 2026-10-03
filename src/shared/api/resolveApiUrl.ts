export function resolveApiUrl(idInstance: string): string {
    return `https://${idInstance.slice(0, 4)}.api.green-api.com`;
}
