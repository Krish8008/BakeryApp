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

        <div className="border-t p-3 flex gap-2">
            <input
                type="text"
                value={text}
                onChange={(e) =>
                    setText(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={loading}
                className="flex-1 border rounded-full px-4 py-2 outline-none"
            />

            <button
                onClick={handleSend}
                disabled={loading}
                className="w-11 h-11 rounded-full bg-pink-600 text-white flex items-center justify-center"
            >

                <FaPaperPlane />
            </button>
        </div>

    );

}

export default ChatInput;