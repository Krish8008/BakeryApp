require("dotenv").config();

const { createCollection } = require("../ai/vectorstore/qdrantService");

async function main() {

    await createCollection();

    console.log("Finished");

}

main();