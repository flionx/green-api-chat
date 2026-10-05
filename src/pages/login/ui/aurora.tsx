export function Aurora() {
    return (
        <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-75 overflow-hidden mask-[linear-gradient(to_bottom,black_30%,transparent)]"
        >
            <div className="bg-aurora animate-rotate-slow absolute top-0 left-1/2 aspect-square w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-75 blur-[50px] motion-reduce:animate-none" />
        </div>
    );
}
