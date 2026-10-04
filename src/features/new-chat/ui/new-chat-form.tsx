import { useState, type SyntheticEvent } from "react";
import { ApiError, checkAccount } from "@/shared/api";
import { normalizePhone } from "@/shared/lib";
import { useChatStore } from "@/entities/chat";
import { useSession } from "@/entities/session";

interface NewChatFormProps {
    onCreated: () => void;
}

export function NewChatForm({ onCreated }: NewChatFormProps) {
    const credentials = useSession((s) => s.credentials);
    const chats = useChatStore((s) => s.chats);
    const upsertChat = useChatStore((s) => s.upsertChat);
    const selectChat = useChatStore((s) => s.selectChat);

    const [value, setValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        const phone = normalizePhone(value);
        if (!phone || !credentials) {
            setError("Введите номер в международном формате, например +7 900 123-45-67");
            return;
        }

        const existing = chats.find((c) => c.phone === phone);
        if (existing) {
            selectChat(existing.id);
            onCreated();
            return;
        }

        setLoading(true);
        try {
            const { exist, chatId } = await checkAccount(credentials, phone);
            if (!exist || !chatId) {
                setError("Этот номер не зарегистрирован в MAX.");
                return;
            }
            const known = chats.find((c) => c.id === chatId);
            upsertChat({ id: chatId, name: known?.name ?? `+${phone}`, phone });
            selectChat(chatId);
            onCreated();
        } catch (e) {
            setError(
                e instanceof ApiError
                    ? `Не удалось проверить номер (код ${e.status}). Возможно, исчерпан лимит тарифа.`
                    : "Нет связи с GREEN-API. Проверьте подключение."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 px-1 pb-3" noValidate>
            <input
                autoFocus
                value={value}
                onChange={(e) => setValue(e.target.value)}
                inputMode="tel"
                placeholder="Номер телефона получателя"
                aria-label="Номер телефона получателя"
                className="bg-field placeholder:text-muted focus:ring-accent w-full rounded-2xl px-4 py-3 text-base ring-1 ring-transparent outline-none"
            />
            {error && (
                <p
                    role="alert"
                    className="rounded-2xl bg-red-500/10 px-4 py-2.5 text-sm text-red-400"
                >
                    {error}
                </p>
            )}
            <button
                type="submit"
                disabled={loading || !value.trim()}
                className="bg-accent disabled:bg-disabled disabled:text-muted cursor-pointer rounded-2xl px-4 py-3 font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:hover:brightness-100"
            >
                {loading ? "Проверяем..." : "Создать чат"}
            </button>
        </form>
    );
}
