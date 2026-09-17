import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

function ChatWindow({ onClose, messages, loading, sendMessage }) {

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] max-w-[380px] h-[min(650px,calc(100dvh-2rem))] min-h-[420px] bg-white rounded-2xl shadow-2xl shadow-pink-900/20 border border-pink-100 flex flex-col overflow-hidden z-[60]">

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