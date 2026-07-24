import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

function ChatWindow({
    onClose,
    messages,
    loading,
    sendMessage,
}) {

    return (
        <div className="fixed bottom-6 right-6 w-[380px] h-[650px] bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden z-50">

            <ChatHeader onClose={onClose} />

            <ChatMessages
                messages={messages}
                loading={loading}
            />

            <ChatInput
                sendMessage={sendMessage}
                loading={loading}
            />

        </div>
    );
}

export default ChatWindow;