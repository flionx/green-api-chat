import { ArrowLeft } from "lucide-react";
import { useChatStore } from "@/entities/chat";
import { Avatar } from "@/shared/ui";

export function ChatWindow() {
    const chat = useChatStore((s) => s.chats.find((c) => c.id === s.activeChatId));
    const selectChat = useChatStore((s) => s.selectChat);

    return (
        <section
            className={`bg-space-pattern min-w-0 flex-1 flex-col md:flex ${chat ? "flex" : "hidden"}`}
        >
            {chat ? (
                <header className="bg-panel flex items-center gap-3 px-4 py-3">
                    <button
                        onClick={() => selectChat(null)}
                        aria-label="Назад к списку чатов"
                        className="rounded-full p-1.5 transition hover:bg-white/10 md:hidden"
                    >
                        <ArrowLeft size={22} />
                    </button>
                    <Avatar name={chat.name} className="size-10" />
                    <div className="min-w-0">
                        <div className="truncate font-semibold">{chat.name}</div>
                        {chat.phone && <div className="text-muted text-xs">+{chat.phone}</div>}
                    </div>
                </header>
            ) : (
                <div className="text-muted flex flex-1 items-center justify-center text-sm">
                    Выберите чат или создайте новый
                </div>
            )}
        </section>
    );
}
