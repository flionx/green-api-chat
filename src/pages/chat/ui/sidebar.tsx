import { useState } from "react";
import { LogOut, Plus, X } from "lucide-react";
import { useLogout } from "@/features/auth";
import { NewChatForm } from "@/features/new-chat";
import { ChatListItem, useChatStore } from "@/entities/chat";

export function Sidebar() {
    const chats = useChatStore((s) => s.chats);
    const activeChatId = useChatStore((s) => s.activeChatId);
    const selectChat = useChatStore((s) => s.selectChat);
    const logout = useLogout();
    const [creating, setCreating] = useState(false);

    return (
        <aside
            className={`bg-panel w-full flex-col md:flex md:w-95 md:shrink-0 md:border-r md:border-white/5 ${
                activeChatId ? "hidden" : "flex"
            }`}
        >
            <header className="flex items-center justify-between px-5 py-4">
                <h1 className="text-2xl font-bold">Чаты</h1>
                <button
                    onClick={() => setCreating((v) => !v)}
                    aria-label={creating ? "Закрыть" : "Новый чат"}
                    className="bg-accent flex size-9 items-center justify-center rounded-full transition hover:brightness-110"
                >
                    {creating ? <X size={20} /> : <Plus size={20} />}
                </button>
            </header>

            <div className="px-3">
                {creating && <NewChatForm onCreated={() => setCreating(false)} />}
            </div>

            <nav className="flex-1 overflow-y-auto px-3">
                {chats.length === 0 ? (
                    <p className="text-muted px-3 py-8 text-center text-sm">
                        Чатов пока нет. Нажмите "+", чтобы начать переписку.
                    </p>
                ) : (
                    chats.map((chat) => (
                        <ChatListItem
                            key={chat.id}
                            chat={chat}
                            active={chat.id === activeChatId}
                            onClick={() => selectChat(chat.id)}
                        />
                    ))
                )}
            </nav>

            <footer className="border-t border-white/5 p-3">
                <button
                    onClick={logout}
                    className="text-muted flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm transition hover:bg-white/5 hover:text-white"
                >
                    <LogOut size={18} />
                    Выйти
                </button>
            </footer>
        </aside>
    );
}
