import { useChatStore } from "@/entities/chat";
import { useSession } from "@/entities/session";

export function useLogout() {
    const logout = useSession((s) => s.logout);
    const resetChats = useChatStore((s) => s.reset);

    return () => {
        logout();
        resetChats();
    };
}
