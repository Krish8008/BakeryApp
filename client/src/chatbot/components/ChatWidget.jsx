import { useState } from "react";
import ChatButton from "./ChatButton";
import ChatWindow from "./ChatWindow";
import { useChat } from "../hooks/useChat";


function ChatWidget({user}) {

    const [isOpen, setIsOpen] = useState(false);

    const {
        messages,
        loading,
        sendMessage,
    } = useChat(user);

    return (
        <>
            {!isOpen && (
                <ChatButton
                    onClick={() => setIsOpen(true)}
                />
            )}

            {isOpen && (
                <ChatWindow
                    onClose={() => setIsOpen(false)}
                    messages={messages}
                    loading={loading}
                    sendMessage={sendMessage}
                />
            )}
        </>
    );
}

export default ChatWidget;