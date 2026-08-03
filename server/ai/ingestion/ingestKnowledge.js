const path = require("path");

require("dotenv").config({
    path: path.resolve(__dirname, "../../.env"),
});

const { randomUUID } = require("crypto");
const { readKnowledgeFiles } = require("../knowledge/fileService");
const { chunkText } = require("../chunking/chunkService");
const { embed } = require("../embeddings/embeddingService");
const { createCollection, uploadPoints } = require("../vectorstore/qdrantService");

async function ingestKnowledge() {

    console.log("QDRANT_URL:", process.env.QDRANT_URL);
console.log("QDRANT_API_KEY:", process.env.QDRANT_API_KEY);
    
    try {
        console.log("📖 Reading knowledge files...");
        const files = readKnowledgeFiles();
        await createCollection();
        const points = [];

        for (const file of files) {
            // Skip empty files
            if (!file.content.trim()) {
                console.log(`⏭ Skipping ${file.fileName}`);
                continue;
            }

            console.log(`\n📄 Processing ${file.fileName}`);
            const chunks = chunkText(file.content);
            console.log(`Found ${chunks.length} chunks`);

            for (let i = 0; i < chunks.length; i++) {

                const chunk = chunks[i];
                console.log(`Embedding chunk ${i + 1}/${chunks.length}`);
                const vector = await embed(chunk);

                points.push({
                    id: randomUUID(),
                    vector,
                    payload: {
                        text: chunk,
                        source: file.fileName,
                        chunkIndex: i,
                    },
                });
            }
        }

        console.log(`\nUploading ${points.length} vectors...`);
        await uploadPoints(points);
        console.log("🎉 Knowledge ingestion completed!");

    } catch (error) {
        console.error(error);
    }
}

ingestKnowledge();