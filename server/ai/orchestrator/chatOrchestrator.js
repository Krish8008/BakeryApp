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

    console.log("intent - ", intent);


    // 2. Retrieve Product Context
    let productContext = "";

    if (intent.useProducts) {
        const filters = await extractFilters(question);
        const products = await findProducts(filters);
        productContext = await buildProductContext(products);
    }

        console.log("product context - ", productContext);

    // 3. Retrieve Knowledge Context
    let knowledgeContext = "";

    if (intent.useKnowledge) {
        knowledgeContext = await getContext(question);
    }

    console.log("knowledge context - ", knowledgeContext);

    
    // 4. Build Prompt
    const prompt = await buildPrompt({
        history,
        productContext,
        knowledgeContext,
        question,
    });

    console.log("prompt", prompt);

    
    // 5. Generate AI Response
    const answer = await generateResponse(prompt);

    return answer;

}

module.exports = {
    chatOrchestrator,
};