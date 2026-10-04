import { useCallback } from "react";
import { ApiError, sendMessage } from "@/shared/api";
import { useChatStore, type Message } from "@/entities/chat";
import { useSession } from "@/entities/session";

export function useSendMessage() {
    const credentials = useSession((s) => s.credentials);
    const addMessage = useChatStore((s) => s.addMessage);
    const updateMessage = useChatStore((s) => s.updateMessage);

    const deliver = useCallback(
        async (chatId: string, currentId: string, text: string) => {
            if (!credentials) return;
            try {
                const { idMessage } = await sendMessage(credentials, chatId, text);
                updateMessage(chatId, currentId, {
                    id: idMessage,
                    status: "sent",
                    error: undefined
                });
            } catch (e) {
                updateMessage(chatId, currentId, {
                    status: "failed",
                    error:
                        e instanceof ApiError
                            ? `Не удалось отправить (код ${e.status})`
                            : "Нет связи с GREEN-API"
                });
            }
        },
        [credentials, updateMessage]
    );

    const send = useCallback(
        (chatId: string, text: string) => {
            const localId = `local-${crypto.randomUUID()}`;
            addMessage({
                id: localId,
                chatId,
                text,
                ts: Date.now(),
                direction: "out",
                status: "sending"
            });
            void deliver(chatId, localId, text);
        },
        [addMessage, deliver]
    );

    const retry = useCallback(
        (message: Message) => {
            updateMessage(message.chatId, message.id, { status: "sending", error: undefined });
            void deliver(message.chatId, message.id, message.text);
        },
        [deliver, updateMessage]
    );

    return { send, retry };
}
