const groq = require("../../config/groq");
const systemPrompt = require("../prompts/systemPrompts");


async function generateResponse(history) {

    const messages = history.map(msg => ({
        role: msg.role,
        content: msg.content,
    }));

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            ...messages,
        ],
    });

    return response.choices[0].message.content;
}

module.exports = {
    generateResponse,
};