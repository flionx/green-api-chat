import { useLayoutEffect, useRef } from "react";
import { MessageBubble, type Message } from "@/entities/chat";

interface MessageListProps {
    messages: Message[];
    onRetry: (message: Message) => void;
}

export function MessageList({ messages, onRetry }: MessageListProps) {
    const ref = useRef<HTMLDivElement>(null);
    const stickToBottom = useRef(true);

    const count = messages.length;
    const lastDirection = messages[count - 1]?.direction;

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (stickToBottom.current || lastDirection === "out") el.scrollTop = el.scrollHeight;
    }, [count, lastDirection]);

    function handleScroll() {
        const el = ref.current;
        if (!el) return;
        stickToBottom.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    }

    return (
        <div ref={ref} onScroll={handleScroll} className="flex-1 overflow-y-auto px-4 py-4 md:px-6">
            <div className="flex min-h-full flex-col justify-end gap-1.5">
                {count === 0 ? (
                    <p className="text-muted self-center pb-6 text-sm">
                        Сообщений пока нет. Напишите первым.
                    </p>
                ) : (
                    messages.map((m) => <MessageBubble key={m.id} message={m} onRetry={onRetry} />)
                )}
            </div>
        </div>
    );
}
