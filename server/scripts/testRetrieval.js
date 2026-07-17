require("dotenv").config();

const {
    searchKnowledge,
} = require("../ai/retrieval/retrievalService");

async function main() {

    const results = await searchKnowledge(
        "Do you provide free delivery?"
    );

    console.log(results);

}

main();