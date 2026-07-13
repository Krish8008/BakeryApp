const groqService = require("../ai/llm/groqService");

async function chat(req, res) {

    try {

        const { message } = req.body;

        const answer = await groqService.generateResponse(message);

        res.json({
            success: true,
            answer,
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