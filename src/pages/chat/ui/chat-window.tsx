import { ArrowLeft } from "lucide-react";
import { useChatStore, useMessages } from "@/entities/chat";
import { MessageInput, useSendMessage } from "@/features/send-message";
import { MessageList } from "./message-list";
import { Avatar } from "@/shared/ui";

export function ChatWindow() {
    const chat = useChatStore((s) => s.chats.find((c) => c.id === s.activeChatId));
    const selectChat = useChatStore((s) => s.selectChat);
    const messages = useMessages(chat?.id ?? null);
    const { send, retry } = useSendMessage();

    return (
        <section
            className={`bg-space-pattern min-w-0 flex-1 flex-col md:flex ${chat ? "flex" : "hidden"}`}
        >
            {chat ? (
                <>
                    <header className="bg-panel flex items-center gap-3 border-b border-white/5 px-4 py-3">
                        <button
                            onClick={() => selectChat(null)}
                            aria-label="Назад к списку чатов"
                            className="cursor-pointer rounded-full p-1.5 transition hover:bg-white/10"
                        >
                            <ArrowLeft size={22} />
                        </button>
                        <Avatar name={chat.name} className="size-10" />
                        <div className="min-w-0">
                            <div className="truncate font-semibold">{chat.name}</div>
                            {chat.phone && <div className="text-muted text-xs">+{chat.phone}</div>}
                        </div>
                    </header>

                    <MessageList key={`list-${chat.id}`} messages={messages} onRetry={retry} />
                    <MessageInput key={`input-${chat.id}`} onSend={(text) => send(chat.id, text)} />
                </>
            ) : (
                <div className="text-muted flex flex-1 items-center justify-center text-sm">
                    Выберите чат или создайте новый
                </div>
            )}
        </section>
    );
}
