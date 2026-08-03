require("dotenv").config();

const { QdrantClient } = require("@qdrant/js-client-rest");

console.log("QDRANT_URL =", process.env.QDRANT_URL);

const client = new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
});

module.exports = client;