import { Sidebar } from "./sidebar";
import { ChatWindow } from "./chat-window";

export function ChatPage() {
    return (
        <div className="flex h-dvh">
            <Sidebar />
            <ChatWindow />
        </div>
    );
}
