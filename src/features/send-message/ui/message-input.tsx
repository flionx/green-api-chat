import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";

const MAX_LENGTH = 4000;

interface MessageInputProps {
    onSend: (text: string) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
    const [text, setText] = useState("");
    const ref = useRef<HTMLTextAreaElement>(null);

    function resize() {
        const el = ref.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
    }

    function submit() {
        const value = text.trim();
        if (!value) return;
        onSend(value);
        setText("");
        if (ref.current) ref.current.style.height = "auto";
    }

    function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            submit();
        }
    }

    const empty = text.trim().length === 0;

    return (
        <div className="px-4 pb-4">
            <div className="bg-panel mx-auto flex min-h-12 w-full max-w-180 items-end gap-2 rounded-2xl py-1.5 pr-1.5 pl-5">
                <textarea
                    ref={ref}
                    rows={1}
                    maxLength={MAX_LENGTH}
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                        resize();
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Сообщение"
                    aria-label="Сообщение"
                    className="scroll-thin placeholder:text-muted max-h-60 flex-1 resize-none self-center bg-transparent text-base outline-none"
                />
                {!empty && (
                    <button
                        onClick={submit}
                        aria-label="Отправить"
                        className="bg-accent flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition hover:brightness-110"
                    >
                        <ArrowUp size={22} />
                    </button>
                )}
            </div>
        </div>
    );
}
