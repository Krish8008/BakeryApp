const { default: ollama } = require("ollama");

async function embed(text) {

    const response = await ollama.embed({
        model: "nomic-embed-text",
        input: text,
    });

    return response.embeddings[0];
}

module.exports = {
    embed,
};