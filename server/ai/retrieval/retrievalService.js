const path = require("path");

require("dotenv").config({
    path: path.join(__dirname, "../../.env"),
});

const { embed } = require("../embeddings/embeddingService");
const client = require("../vectorstore/qdrantClient");

const COLLECTION_NAME = process.env.QDRANT_COLLECTION;
console.log("collection anme - ", COLLECTION_NAME)

async function searchKnowledge(query, limit = 5) {

    const vector = await embed(query);

    const response = await client.search(COLLECTION_NAME, {
        vector,
        limit,
        with_payload: true,
    });

    return response.map((point) => ({
        score: point.score,
        text: point.payload.text,
        source: point.payload.source,
    }));
}

async function getContext(query) {

    const results = await searchKnowledge(query);

    const filtered = results.filter(item => item.score > 0.65);
    
    return filtered
        .map((item) => item.text)
        .join("\n\n-----------------\n\n");
}

module.exports = {
    searchKnowledge,
    getContext,
};