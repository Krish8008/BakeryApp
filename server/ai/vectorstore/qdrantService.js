const { randomUUID } = require("crypto");
const client = require("./qdrantClient");

const COLLECTION_NAME = process.env.QDRANT_COLLECTION;

async function createCollection() {
    try {

        await client.createCollection(COLLECTION_NAME, {
            vectors: {
                size: 768,
                distance: "Cosine",
            },
        });

        console.log("✅ Collection Created");

    } catch (error) {

        if (error.status === 409) {
            console.log("✅ Collection Already Exists");
            return;
        }

        throw error;
    }
}

async function uploadPoints(points) {

    await client.upsert(COLLECTION_NAME, {
        wait: true,
        points,
    });

    console.log(`✅ Uploaded ${points.length} points`);

}

module.exports = {
    createCollection,
    uploadPoints,
};