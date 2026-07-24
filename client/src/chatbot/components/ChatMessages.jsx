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
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">

            {messages.map((message, index) => (
                <MessageBubble
                    key={index}
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