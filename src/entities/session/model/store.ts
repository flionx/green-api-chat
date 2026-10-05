import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Credentials } from "@/shared/api";

interface SessionState {
    credentials: Credentials | null;
    login: (credentials: Credentials) => void;
    logout: () => void;
}

export const useSession = create<SessionState>()(
    persist(
        (set) => ({
            credentials: null,
            login: (credentials) => set({ credentials }),
            logout: () => set({ credentials: null })
        }),
        { name: "green-chat-session" }
    )
);
