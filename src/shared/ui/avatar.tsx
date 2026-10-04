import { User } from "lucide-react";

interface AvatarProps {
    name: string;
    className?: string;
}

export function Avatar({ name, className = "size-12" }: AvatarProps) {
    const first = name.replace(/^\+/, "").trim().charAt(0);
    const hasLetter = /\p{L}/u.test(first);

    return (
        <div
            aria-hidden
            className={`bg-bubble-out flex shrink-0 items-center justify-center rounded-full text-lg font-semibold ${className}`}
        >
            {hasLetter ? first.toUpperCase() : <User className="size-1/2" />}
        </div>
    );
}
