const groq = require("../../config/groq");
const systemPrompt = require("../prompts/systemPrompts");
const { getContext } = require("../retrieval/retrievalService");

async function generateResponse(history) {

    // Last user message
    const userQuestion = history[history.length - 1].content;

    // Retrieve relevant bakery knowledge
    const context = await getContext(userQuestion);

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [

            {
                role: "system",
                content: systemPrompt,
            },

            {
                role: "system",
                content:
                    `Relevant Bakery Knowledge:\n\n${context}`,
            },

            ...history,
        ],
    });

    return response.choices[0].message.content;
}

module.exports = {
    generateResponse,
};