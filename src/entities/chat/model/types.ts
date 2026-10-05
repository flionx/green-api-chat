export interface Chat {
    id: string;
    name: string;
    phone?: string;
}

export type MessageStatus = "sending" | "sent" | "delivered" | "read" | "failed";

export interface Message {
    id: string;
    chatId: string;
    text: string;
    ts: number;
    direction: "in" | "out";
    status?: MessageStatus;
    error?: string;
}
