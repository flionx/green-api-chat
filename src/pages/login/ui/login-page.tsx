import { LoginForm } from "@/features/auth";

export function LoginPage() {
    return (
        <main className="bg-space-pattern flex min-h-dvh items-center justify-center p-4">
            <div className="bg-panel relative w-full max-w-md overflow-hidden rounded-4xl p-8 sm:p-10">
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(104,58,200,0.55),rgba(30,50,110,0.25)_55%,transparent_80%)]"
                />
                <div className="relative">
                    <h1 className="mt-6 text-center text-3xl font-bold tracking-tight">
                        Green Chat
                    </h1>
                    <p className="text-muted mt-3 mb-8 text-center text-sm">
                        Введите данные из личного кабинета GREEN-API
                    </p>
                    <LoginForm />
                </div>
            </div>
        </main>
    );
}
