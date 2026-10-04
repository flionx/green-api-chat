import { Fragment, useLayoutEffect, useRef } from "react";
import { MessageBubble, type Message } from "@/entities/chat";
import { dayKey, formatDay } from "@/shared/lib";

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
        <div
            ref={ref}
            onScroll={handleScroll}
            className="scroll-thin flex-1 overflow-y-auto px-4 py-4"
        >
            <div className="mx-auto flex min-h-full w-full max-w-180 flex-col justify-end gap-1.5">
                {count === 0 ? (
                    <p className="text-muted self-center pb-6 text-sm">
                        Сообщений пока нет. Напишите первым.
                    </p>
                ) : (
                    messages.map((m, i) => (
                        <Fragment key={m.id}>
                            {(i === 0 || dayKey(m.ts) !== dayKey(messages[i - 1].ts)) && (
                                <div className="my-2 self-center rounded-full bg-[#282c42b2] px-1.5 py-px text-sm text-white backdrop-blur-xl">
                                    {formatDay(m.ts)}
                                </div>
                            )}
                            <MessageBubble message={m} onRetry={onRetry} />
                        </Fragment>
                    ))
                )}
            </div>
        </div>
    );
}
