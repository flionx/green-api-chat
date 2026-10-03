import { useSession } from "@/entities/session";

export function ChatPage() {
    const credentials = useSession((s) => s.credentials);
    const logout = useSession((s) => s.logout);

    return (
        <main className="bg-space-pattern flex min-h-dvh flex-col items-center justify-center gap-4">
            <p className="text-muted">Вы вошли как инстанс {credentials?.idInstance}</p>
            <button
                onClick={logout}
                className="bg-field rounded-2xl px-4 py-2 text-sm font-medium hover:brightness-110"
            >
                Выйти
            </button>
        </main>
    );
}
