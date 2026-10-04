interface AvatarProps {
    name: string;
    className?: string;
}

export function Avatar({ name, className = "size-12" }: AvatarProps) {
    const letter = name.replace(/^\+/, "").trim().charAt(0).toUpperCase() || "?";
    return (
        <div
            aria-hidden
            className={`bg-bubble-out flex shrink-0 items-center justify-center rounded-full text-lg font-semibold ${className}`}
        >
            {letter}
        </div>
    );
}
