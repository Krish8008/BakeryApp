import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

function ChatInput({
    sendMessage,
    loading,
}) {

    const [text, setText] = useState("");

    async function handleSend() {
        if (!text.trim()) return;
        await sendMessage(text);
        setText("");
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    return (

        <div className="border-t border-pink-100 bg-white p-3 flex gap-2">
            <input
                type="text"
                value={text}
                onChange={(e) =>
                    setText(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={loading}
                aria-label="Chat message"
                className="min-w-0 flex-1 border border-gray-200 rounded-full px-4 py-2.5 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100 disabled:bg-gray-50"
            />

            <button
                type="button"
                aria-label="Send message"
                onClick={handleSend}
                disabled={loading}
                className="w-11 h-11 shrink-0 rounded-full bg-pink-600 text-white flex items-center justify-center transition hover:bg-pink-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
            >

                <FaPaperPlane />
            </button>
        </div>

    );

}

export default ChatInput;