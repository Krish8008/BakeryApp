const groq = require("../../config/groq");
const systemPrompt = require("../prompts/systemPrompts");
const { getContext } = require("../retrieval/retrievalService");

async function generateResponse(prompt) {

    const response = await groq.chat.completions.create({

        model: "openai/gpt-oss-20b",

        messages: [

            {
                role: "system",
                content: systemPrompt,
            },

            {
                role: "user",
                content: prompt,
            }

        ]

    });

    return response.choices[0].message.content;

}

module.exports = {
    generateResponse,
};