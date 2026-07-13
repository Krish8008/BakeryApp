const groq = require("../../config/groq");

async function generateResponse(message) {

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: message,
            },
        ],
    });

    return response.choices[0].message.content;
}

module.exports = {
    generateResponse,
};