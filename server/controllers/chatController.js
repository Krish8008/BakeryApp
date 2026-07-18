const { chatOrchestrator } = require("../ai/orchestrator/chatOrchestrator");

const {
    getHistory,
    addMessage,
} = require("../ai/conversation/conversationService");

async function chat(req, res) {

    try {

        const { sessionId, message } = req.body;

        // Validate request
        if (!sessionId || !message) {
            return res.status(400).json({
                success: false,
                message: "sessionId and message are required",
            });
        }

        // Save the user's message
        await addMessage(sessionId, "user", message);

        // Load complete conversation history
        const history = await getHistory(sessionId);

        // Generate AI response
        const answer = await chatOrchestrator(history);

        // Save assistant reply
        await addMessage(sessionId, "assistant", answer);

        res.json({
            success: true,
            answer,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message,
        });

    }

}

module.exports = {
    chat,
};