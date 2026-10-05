import { useState, type SyntheticEvent } from "react";
import { ApiError, getStateInstance, resolveApiUrl } from "@/shared/api";
import { useSession } from "@/entities/session";
import { loginSchema } from "../model/schema";

const inputClass =
    "bg-field placeholder:text-muted focus:ring-accent w-full rounded-2xl px-4 py-3.5 text-base text-white ring-1 ring-transparent outline-none transition";

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
            <label className="text-muted flex flex-col gap-1.5 text-sm font-medium">
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

            <label className="text-muted flex flex-col gap-1.5 text-sm font-medium">
                apiTokenInstance
                <input
                    className={inputClass}
                    type="password"
                    value={apiTokenInstance}
                    onChange={(e) => setApiTokenInstance(e.target.value)}
                    autoComplete="off"
                />
            </label>

            <details className="text-muted text-sm">
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
                <p
                    role="alert"
                    className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                    {error}
                </p>
            )}

            <button
                type="submit"
                disabled={loading || !idInstance.trim() || !apiTokenInstance.trim()}
                className="bg-accent disabled:bg-disabled disabled:text-muted cursor-pointer rounded-2xl px-4 py-3.5 font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
                {loading ? "Проверяем..." : "Войти"}
            </button>
        </form>
    );
}
