import { useState, type SyntheticEvent } from "react";
import { ApiError, getStateInstance, resolveApiUrl } from "@/shared/api";
import { useSession } from "@/entities/session";
import { loginSchema } from "../model/schema";

const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

export function LoginForm() {
    const login = useSession((s) => s.login);
    const [idInstance, setIdInstance] = useState("");
    const [apiTokenInstance, setApiTokenInstance] = useState("");
    const [apiUrl, setApiUrl] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        const parsed = loginSchema.safeParse({ idInstance, apiTokenInstance, apiUrl });
        if (!parsed.success) {
            setError(parsed.error.issues[0].message);
            return;
        }

        const values = parsed.data;
        const credentials = {
            idInstance: values.idInstance,
            apiTokenInstance: values.apiTokenInstance,
            apiUrl: (values.apiUrl || resolveApiUrl(values.idInstance)).replace(/\/+$/, "")
        };

        setLoading(true);
        try {
            const { stateInstance } = await getStateInstance(credentials);
            if (stateInstance !== "authorized") {
                setError(
                    `Инстанс не авторизован (статус: ${stateInstance}). Отсканируйте QR-код в личном кабинете GREEN-API.`
                );
                return;
            }
            login(credentials);
        } catch (e) {
            if (e instanceof ApiError && [400, 401, 403, 404].includes(e.status)) {
                setError("Неверные idInstance или apiTokenInstance.");
            } else {
                setError("Не удалось связаться с GREEN-API. Проверьте подключение и адрес API.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4" noValidate>
            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                idInstance
                <input
                    className={inputClass}
                    value={idInstance}
                    onChange={(e) => setIdInstance(e.target.value)}
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="310012345678"
                />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
                apiTokenInstance
                <input
                    className={inputClass}
                    type="password"
                    value={apiTokenInstance}
                    onChange={(e) => setApiTokenInstance(e.target.value)}
                    autoComplete="off"
                />
            </label>

            <details className="text-sm text-slate-500">
                <summary className="cursor-pointer select-none">Адрес API (необязательно)</summary>
                <input
                    className={`${inputClass} mt-2`}
                    value={apiUrl}
                    onChange={(e) => setApiUrl(e.target.value)}
                    placeholder="https://3100.api.green-api.com"
                    aria-label="Адрес API"
                />
            </details>

            {error && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60"
            >
                {loading ? "Проверяем..." : "Войти"}
            </button>
        </form>
    );
}
