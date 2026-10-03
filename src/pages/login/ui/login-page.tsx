import { LoginForm } from "@/features/auth";

export function LoginPage() {
    return (
        <main className="flex min-h-dvh items-center justify-center bg-slate-100 p-4">
            <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold text-slate-900">Вход в чат</h1>
                <p className="mt-1 mb-6 text-sm text-slate-500">
                    Введите данные инстанса из личного кабинета GREEN-API.
                </p>
                <LoginForm />
            </div>
        </main>
    );
}
