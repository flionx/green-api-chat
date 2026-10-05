export function Logo({ className = "" }: { className?: string }) {
    return (
        <div
            className={`animate-float flex items-center gap-3 motion-reduce:animate-none ${className}`}
        >
            <span className="text-3xl leading-none font-extrabold tracking-tight">Green Chat</span>
        </div>
    );
}
