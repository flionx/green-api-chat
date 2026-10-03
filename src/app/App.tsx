import { useSession } from "@/entities/session";
import { ChatPage } from "@/pages/chat";
import { LoginPage } from "@/pages/login";

function App() {
    const isLoggedIn = useSession((s) => s.credentials !== null);
    return isLoggedIn ? <ChatPage /> : <LoginPage />;
}

export default App;
