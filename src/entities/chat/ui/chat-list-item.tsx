import { Avatar } from "@/shared/ui";
import type { Chat } from "../model/types";

interface ChatListItemProps {
    chat: Chat;
    active: boolean;
    onClick: () => void;
}

export function ChatListItem({ chat, active, onClick }: ChatListItemProps) {
    return (
        <button
            onClick={onClick}
            className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                active ? "bg-selected" : "hover:bg-white/5"
            }`}
        >
            <Avatar name={chat.name} />
            <div className="min-w-0">
                <div className="truncate font-semibold">{chat.name}</div>
                <div className="text-muted truncate text-sm">
                    {chat.phone ? `+${chat.phone}` : "Входящий чат"}
                </div>
            </div>
        </button>
    );
}
