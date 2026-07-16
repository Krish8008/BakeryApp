const groqService = require("../ai/llm/groqService");
const conversationService = require("../ai/conversation/conversationService");

async function chat(req, res) {
    
    

    try {
        const { sessionId, message } = req.body;

        if (!sessionId || !message) {
            return res.status(400).json({
            success: false,
            message: "sessionId and message are required",
        });
    }
    
        await conversationService.addMessage(sessionId, "user", message);
        const history = await conversationService.getHistory(sessionId);

        const answer = await groqService.generateResponse(history);
        
        await conversationService.addMessage(sessionId, "assistant", answer);

        res.json({
            success:true,
            answer
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });

    }

}

module.exports = {
    chat,
};