import { webhookBodySchema } from "@/shared/api";
import { useChatStore, type MessageStatus } from "@/entities/chat";

type DeliveryStatus = Exclude<MessageStatus, "sending">;

const DELIVERY_STATUSES: readonly string[] = ["sent", "delivered", "read", "failed"];

const RANK: Record<MessageStatus, number> = {
    sending: 0,
    failed: 0,
    sent: 1,
    delivered: 2,
    read: 3
};

const TEXT_TYPES: readonly string[] = ["textMessage", "extendedTextMessage", "quotedMessage"];

const isDeliveryStatus = (s: string): s is DeliveryStatus => DELIVERY_STATUSES.includes(s);

export function handleNotification(body: unknown): void {
    const parsed = webhookBodySchema.safeParse(body);
    if (!parsed.success) return;
    const data = parsed.data;
    const store = useChatStore.getState();

    if (data.typeWebhook === "incomingMessageReceived") {
        const sender = data.senderData;
        const type = data.messageData?.typeMessage;
        if (!type || !TEXT_TYPES.includes(type)) return;

        const text =
            data.messageData?.textMessageData?.textMessage ??
            data.messageData?.extendedTextMessageData?.text;
        if (!sender || !text || !data.idMessage) return;
        if (sender.chatType && sender.chatType !== "user") return;

        const name = sender.chatName || sender.senderName;
        const existing = store.chats.find((c) => c.id === sender.chatId);
        if (!existing) {
            store.upsertChat({ id: sender.chatId, name: name ?? sender.chatId });
        } else if (name && /^\+?\d+$/.test(existing.name)) {
            store.upsertChat({ ...existing, name });
        }

        store.addMessage({
            id: data.idMessage,
            chatId: sender.chatId,
            text,
            ts: (data.timestamp ?? Date.now() / 1000) * 1000,
            direction: "in"
        });
        return;
    }

    if (data.typeWebhook === "outgoingMessageStatus") {
        const { idMessage, chatId, status, description } = data;
        if (!idMessage || !chatId || !status || !isDeliveryStatus(status)) return;

        const current = store.messages[chatId]?.find((m) => m.id === idMessage);
        if (!current || current.direction !== "out") return;

        if (status === "failed") {
            store.updateMessage(chatId, idMessage, {
                status,
                error: description ? `Не доставлено: ${description}` : "Не доставлено"
            });
        } else if (!current.status || RANK[status] > RANK[current.status]) {
            store.updateMessage(chatId, idMessage, { status, error: undefined });
        }
    }
}
