const groq = require("../../config/groq");
const prompt = require("../prompts/intentPrompt");

async function detectIntent(question) {

    const response = await groq.chat.completions.create({

        model: "openai/gpt-oss-20b",
        temperature: 0,

        response_format: {
            type: "json_object"
        },

        messages: [

            {
                role: "system",
                content: prompt,
            },

            {
                role: "user",
                content: question,
            },
        ],
    });

    return JSON.parse(response.choices[0].message.content);
}

module.exports = {
    detectIntent,
};