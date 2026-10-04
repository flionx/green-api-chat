import { formatTime } from "@/shared/lib";
import { Avatar } from "@/shared/ui";
import type { Chat, Message } from "../model/types";

interface ChatListItemProps {
    chat: Chat;
    lastMessage?: Message;
    active: boolean;
    onClick: () => void;
}

export function ChatListItem({ chat, lastMessage, active, onClick }: ChatListItemProps) {
    const preview = lastMessage
        ? `${lastMessage.direction === "out" ? "Вы: " : ""}${lastMessage.text}`
        : "Нет сообщений";

    return (
        <button
            onClick={onClick}
            className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                active ? "bg-selected" : "hover:bg-white/5"
            }`}
        >
            <Avatar name={chat.name} />
            <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate font-semibold">{chat.name}</span>
                    {lastMessage && (
                        <span className="text-muted shrink-0 text-xs">
                            {formatTime(lastMessage.ts)}
                        </span>
                    )}
                </div>
                <div className="text-muted truncate text-sm">{preview}</div>
            </div>
        </button>
    );
}
