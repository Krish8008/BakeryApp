const { extractFilters } = require("../ai/llm/queryExtractor");

async function main() {

    const filters = await extractFilters(
        "This keeps the AI prompt simple and moves the search logic into the retriever, which is where it belongs."
    );

    console.log(filters);

}

main();