import { Sidebar } from "./sidebar";
import { ChatWindow } from "./chat-window";
import { useReceiveMessages } from "@/features/receive-messages";

export function ChatPage() {
    const connectionError = useReceiveMessages();

    return (
        <div className="flex h-dvh flex-col">
            {connectionError && (
                <div
                    role="status"
                    className="bg-red-500/15 px-4 py-2 text-center text-sm text-red-300"
                >
                    {connectionError}
                </div>
            )}
            <div className="flex min-h-0 flex-1">
                <Sidebar />
                <ChatWindow />
            </div>
        </div>
    );
}
