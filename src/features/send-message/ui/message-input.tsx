import { useRef, useState, type KeyboardEvent } from "react";
import { SendHorizontal } from "lucide-react";

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
        el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
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
        <div className="px-3 pb-3 md:px-6 md:pb-4">
            <div className="bg-panel flex items-end gap-2 rounded-3xl py-2 pr-2 pl-5">
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
                    className="placeholder:text-muted max-h-40 flex-1 resize-none self-center bg-transparent py-1.5 text-base outline-none"
                />
                <button
                    onClick={submit}
                    disabled={empty}
                    aria-label="Отправить"
                    className="bg-accent disabled:bg-disabled disabled:text-muted flex size-10 shrink-0 items-center justify-center rounded-full transition hover:brightness-110 disabled:cursor-not-allowed disabled:hover:brightness-100"
                >
                    <SendHorizontal size={20} />
                </button>
            </div>
        </div>
    );
}
