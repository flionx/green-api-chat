import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Chat, Message } from "./types";

interface ChatState {
    chats: Chat[];
    messages: Record<string, Message[]>;
    activeChatId: string | null;
    upsertChat: (chat: Chat) => void;
    selectChat: (id: string | null) => void;
    addMessage: (message: Message) => void;
    updateMessage: (chatId: string, id: string, patch: Partial<Message>) => void;
    reset: () => void;
}

export const useChatStore = create<ChatState>()(
    persist(
        (set) => ({
            chats: [],
            messages: {},
            activeChatId: null,

            upsertChat: (chat) =>
                set((state) => ({
                    chats: state.chats.some((c) => c.id === chat.id)
                        ? state.chats.map((c) => (c.id === chat.id ? chat : c))
                        : [chat, ...state.chats]
                })),

            selectChat: (id) => set({ activeChatId: id }),

            addMessage: (message) =>
                set((state) => {
                    const list = state.messages[message.chatId] ?? [];
                    if (list.some((m) => m.id === message.id)) return state;

                    const next = [...list, message].sort((a, b) => a.ts - b.ts);
                    const isNewest = next[next.length - 1] === message;
                    const chat = state.chats.find((c) => c.id === message.chatId);

                    return {
                        messages: { ...state.messages, [message.chatId]: next },
                        chats:
                            isNewest && chat
                                ? [chat, ...state.chats.filter((c) => c.id !== chat.id)]
                                : state.chats
                    };
                }),

            updateMessage: (chatId, id, patch) =>
                set((state) => ({
                    messages: {
                        ...state.messages,
                        [chatId]: (state.messages[chatId] ?? []).map((m) =>
                            m.id === id ? { ...m, ...patch } : m
                        )
                    }
                })),

            reset: () => set({ chats: [], messages: {}, activeChatId: null })
        }),
        {
            name: "green-chat-chats",
            partialize: (state) => ({ chats: state.chats, messages: state.messages }),
            merge: (persisted, current) => {
                const saved = persisted as
                    Partial<Pick<typeof current, "chats" | "messages">> | undefined;
                const messages: Record<string, Message[]> = {};
                for (const [chatId, list] of Object.entries(saved?.messages ?? {})) {
                    messages[chatId] = list.map((m) =>
                        m.status === "sending"
                            ? { ...m, status: "failed" as const, error: "Отправка прервана" }
                            : m
                    );
                }
                return { ...current, chats: saved?.chats ?? [], messages };
            }
        }
    )
);

const EMPTY: Message[] = [];

export const useMessages = (chatId: string | null) =>
    useChatStore((s) => (chatId ? s.messages[chatId] : undefined) ?? EMPTY);
