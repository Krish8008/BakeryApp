const { detectIntent } = require("../router/intentRouter");
const { extractFilters } = require("../llm/queryExtractor");
const { findProducts } = require("../database/productRetriever");
const { buildProductContext } = require("../database/productContextBuilder");
const { getContext } = require("../retrieval/retrievalService");
const { buildPrompt } = require("../prompts/promptBuilder");
const { generateResponse } = require("../llm/groqService");

async function chatOrchestrator(history) {

    const question = history[history.length - 1].content;

    // 1. Detect Intent
    const intent = await detectIntent(question);

    // 2. Retrieve Product Context
    let productContext = "";

    if (intent.useProducts) {

        const filters = await extractFilters(question);

        const products = await findProducts(filters);

        productContext = buildProductContext(products);

    }


    // 3. Retrieve Knowledge Context
    let knowledgeContext = "";

    if (intent.useKnowledge) {

        knowledgeContext = await getContext(question);

    }

    
    // 4. Build Prompt
    const prompt = buildPrompt({

        history,

        productContext,

        knowledgeContext,

        question,

    });

    
    // 5. Generate AI Response
    const answer = await generateResponse(prompt);

    return answer;

}

module.exports = {
    chatOrchestrator,
};