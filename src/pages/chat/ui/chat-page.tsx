import { useSession } from "@/entities/session";

export function ChatPage() {
    const credentials = useSession((s) => s.credentials);
    const logout = useSession((s) => s.logout);

    return (
        <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-slate-100">
            <p className="text-slate-700">Вы вошли как инстанс {credentials?.idInstance}</p>
            <button
                onClick={logout}
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-slate-50"
            >
                Выйти
            </button>
        </main>
    );
}
