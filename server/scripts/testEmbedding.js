const { embed } = require("../ai/embeddings/embeddingService");

async function main() {

    const vector = await embed(
        "Orders above ₹1000 receive free delivery."
    );

    console.log("Dimensions:", vector.length);
    console.log(vector.slice(0, 10));

}

main();