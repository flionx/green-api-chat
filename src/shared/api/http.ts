import type { ZodType } from "zod";

export interface Credentials {
    apiUrl: string;
    idInstance: string;
    apiTokenInstance: string;
}

export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

interface Options {
    method?: "GET" | "POST" | "DELETE";
    body?: unknown;
    query?: Record<string, string | number>;
    tail?: string;
    signal?: AbortSignal;
}

export async function call<T>(
    creds: Credentials,
    method: string,
    schema: ZodType<T>,
    options: Options = {}
): Promise<T> {
    const query = options.query
        ? "?" + new URLSearchParams(Object.entries(options.query).map(([k, v]) => [k, String(v)]))
        : "";
    const url = `${creds.apiUrl}/waInstance${creds.idInstance}/${method}/${creds.apiTokenInstance}${options.tail ?? ""}${query}`;

    const response = await fetch(url, {
        method: options.method ?? "GET",
        headers: options.body ? { "Content-Type": "application/json" } : undefined,
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: options.signal
    });

    const text = await response.text();
    if (!response.ok) throw new ApiError(response.status, text);

    return schema.parse(text ? JSON.parse(text) : null);
}
