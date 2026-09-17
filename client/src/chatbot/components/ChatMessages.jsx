import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

function ChatMessages({ messages, loading }) {

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    return (
        <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 bg-gradient-to-b from-pink-50/60 to-gray-50 overscroll-contain">

            {messages.map((message, index) => (
                <MessageBubble
                    key={`${message.role}-${index}`}
                    role={message.role}
                    message={message.content}
                />
            ))}

            {loading && <TypingIndicator />}

            <div ref={bottomRef}></div>

        </div>
    );
}

export default ChatMessages;