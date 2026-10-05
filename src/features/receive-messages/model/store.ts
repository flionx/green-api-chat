import { useEffect, useState } from "react";
import { ApiError, deleteNotification, receiveNotification } from "@/shared/api";
import { sleep } from "@/shared/lib";
import { useSession } from "@/entities/session";
import { handleNotification } from "./handle-notification";

const FATAL_STATUSES = [400, 401, 403];

export function useReceiveMessages(): string | null {
    const credentials = useSession((s) => s.credentials);
    const [connectionError, setConnectionError] = useState<string | null>(null);

    useEffect(() => {
        if (!credentials) return;
        const controller = new AbortController();
        const { signal } = controller;

        async function poll() {
            if (!credentials) return;
            let delay = 1000;

            while (!signal.aborted) {
                try {
                    const notification = await receiveNotification(credentials, signal);
                    setConnectionError(null);
                    delay = 1000;
                    if (!notification) continue;

                    handleNotification(notification.body);
                    await deleteNotification(credentials, notification.receiptId, signal);
                } catch (e) {
                    if (signal.aborted) return;
                    if (e instanceof ApiError && FATAL_STATUSES.includes(e.status)) {
                        setConnectionError(
                            `Получение сообщений остановлено (код ${e.status}). Проверьте данные инстанса и что в его настройках не задан webhookUrl.`
                        );
                        return;
                    }
                    setConnectionError("Нет связи с GREEN-API. Пробуем переподключиться…");
                    await sleep(delay, signal);
                    delay = Math.min(delay * 2, 30_000);
                }
            }
        }

        void poll();
        return () => controller.abort();
    }, [credentials]);

    return connectionError;
}
