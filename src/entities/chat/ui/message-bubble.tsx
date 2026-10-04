import { Check, CheckCheck, CircleAlert, Clock } from "lucide-react";
import { formatTime } from "@/shared/lib";
import type { Message, MessageStatus } from "../model/types";

interface MessageBubbleProps {
    message: Message;
    onRetry?: (message: Message) => void;
}

function StatusIcon({ status }: { status?: MessageStatus }) {
    switch (status) {
        case "sending":
            return <Clock size={12} aria-label="Отправляется" />;
        case "sent":
        case "delivered":
            return <Check size={14} aria-label="Отправлено" />;
        case "read":
            return <CheckCheck size={14} aria-label="Прочитано" />;
        case "failed":
            return <CircleAlert size={14} className="text-red-300" aria-label="Не доставлено" />;
        default:
            return null;
    }
}

export function MessageBubble({ message, onRetry }: MessageBubbleProps) {
    const outgoing = message.direction === "out";

    return (
        <div className={`flex flex-col ${outgoing ? "items-end" : "items-start"}`}>
            <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 md:max-w-[65%] ${
                    outgoing ? "bg-bubble-out rounded-br-md" : "bg-bubble-in rounded-bl-md"
                }`}
            >
                <p className="wrap-break-word whitespace-pre-wrap">{message.text}</p>
                <div className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-white/60">
                    {formatTime(message.ts)}
                    {outgoing && <StatusIcon status={message.status} />}
                </div>
            </div>

            {message.status === "failed" && (
                <div className="mt-1 flex items-center gap-2 text-xs text-red-400">
                    <span>{message.error ?? "Не доставлено"}</span>
                    {onRetry && (
                        <button
                            onClick={() => onRetry(message)}
                            className="cursor-pointer font-semibold underline"
                        >
                            Повторить
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
