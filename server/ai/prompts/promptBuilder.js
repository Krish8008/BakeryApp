function buildPrompt({
    history = [],
    productContext = "",
    knowledgeContext = "",
    question,
}) {

    const conversation = history
        .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
        .join("\n\n");

    return `
Conversation History

${conversation}

${productContext
            ? `

=============================
AVAILABLE PRODUCTS
=============================

${productContext}
`
            : ""
        }

${knowledgeContext
            ? `

=============================
BAKERY KNOWLEDGE
=============================

${knowledgeContext}
`
            : ""
        }

=============================
CURRENT USER QUESTION
=============================

${question}
`;
}

module.exports = {
    buildPrompt,
};