import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Chat } from "./types";

interface ChatState {
    chats: Chat[];
    activeChatId: string | null;
    upsertChat: (chat: Chat) => void;
    selectChat: (id: string | null) => void;
    reset: () => void;
}

export const useChatStore = create<ChatState>()(
    persist(
        (set) => ({
            chats: [],
            activeChatId: null,
            upsertChat: (chat) =>
                set((state) => ({
                    chats: state.chats.some((c) => c.id === chat.id)
                        ? state.chats.map((c) => (c.id === chat.id ? chat : c))
                        : [chat, ...state.chats]
                })),
            selectChat: (id) => set({ activeChatId: id }),
            reset: () => set({ chats: [], activeChatId: null })
        }),
        {
            name: "green-chat-chats",
            partialize: (state) => ({ chats: state.chats })
        }
    )
);
