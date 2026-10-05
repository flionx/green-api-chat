import { LoginForm } from "@/features/auth";
import { Aurora } from "./aurora";
import { Logo } from "./logo";

export function LoginPage() {
    return (
        <main className="bg-space-pattern flex min-h-dvh items-center justify-center p-4">
            <div className="bg-panel relative flex min-h-160 w-full max-w-145 flex-col overflow-hidden rounded-4xl border border-white/10 px-6 pb-8 sm:min-h-173.75">
                <Aurora />

                <div className="relative mx-auto flex w-full max-w-84 flex-1 flex-col">
                    <Logo className="mt-28 self-center sm:mt-36" />

                    <h1 className="mt-10 mb-6 text-center text-xl leading-snug font-bold">
                        Введите данные инстанса GREEN-API
                    </h1>

                    <LoginForm />

                    <p className="text-muted mt-auto pt-8 text-center text-xs leading-relaxed">
                        Данные хранятся только в вашем браузере.
                        <br />
                        <a
                            href="https://console.green-api.com"
                            target="_blank"
                            rel="noreferrer"
                            className="text-accent mt-3 inline-block text-sm font-medium hover:underline"
                        >
                            Где взять idInstance и токен
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
