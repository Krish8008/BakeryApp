const { chatOrchestrator } = require("../ai/orchestrator/chatOrchestrator");

const {
    getHistory,
    addMessage,
} = require("../ai/conversation/conversationService");

async function chat(req, res) {

    try {

        const { message } = req.body;
        const userId = req.user.id;

        // Validate request
        if (!message) {
            return res.status(400).json({
                success: false,
                message: "message is required",
            });
        }

        // Save the user's message
        await addMessage(userId, "user", message);

        // Load complete conversation history
        const history = await getHistory(userId);

        // Generate AI response
        const answer = await chatOrchestrator(history);

        // Save assistant reply
        await addMessage(userId, "assistant", answer);

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

async function getHistoryy(req, res) {

    try {
        const userId = req.user.id;
        const history = await getHistory(userId);

        res.json({
            success: true,
            history,
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
    getHistoryy,
};