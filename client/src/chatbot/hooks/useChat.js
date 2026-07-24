import { useState, useEffect } from "react";
import { sendMessage as sendMessageAPI, fetchHistory } from "../services/chatApi";


export function useChat(user) {

    

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "👋 Welcome to Sweet Bakery! How can I help you today?",
        },
    ]);




useEffect(() => {

    async function loadHistory() {
        if (!user) return;
        try {

            const history = await fetchHistory();
            console.log("History received:", history);

            if (history.length === 0) {
                console.log("No history found");
                setMessages([
                    {
                        role: "assistant",
                        content:
                            "👋 Welcome to Sweet Bakery! How can I help you today?",
                    },
                ]);

            } else {
                console.log("Setting messages...");
                setMessages(history);
            }

        } catch (err) {
            console.error("History Error:", err);
        }
    }

    loadHistory();

}, [user]);



    const [loading, setLoading] = useState(false);

    async function sendMessage(text) {

        if (!text.trim()) return;

        // User message
        const userMessage = {
            role: "user",
            content: text,
        };

        // Show user message immediately
        setMessages((prev) => [...prev, userMessage]);

        setLoading(true);

        try {

            // Backend API
            const answer = await sendMessageAPI( text );

            const assistantMessage = {
                role: "assistant",
                content: answer,
            };

            setMessages((prev) => [
                ...prev,
                assistantMessage,
            ]);

        } catch (error) {

            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "⚠️ Something went wrong. Please try again.",
                },
            ]);

        } finally {

            setLoading(false);

        }
    }

    function resetChat() {
    setMessages([
        {
            role: "assistant",
            content:
                "👋 Welcome to Sweet Bakery! How can I help you today?",
        },
    ]);
    }

    return {
        messages,
        loading,
        sendMessage,
        resetChat
    };
}