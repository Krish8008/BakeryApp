const { buildPrompt } = require("../ai/builder/promptBuilder");

const prompt = buildPrompt({

    history: [

        {
            role: "user",
            content: "Hi"
        },

        {
            role: "assistant",
            content: "Hello! Welcome to Sweet Bakery."
        }

    ],

    productContext: `
Product 1

Name: Chocolate Cake
Price: ₹450
Weight: 1kg
Eggless: Yes
`,

    knowledgeContext: `
Delivery is available within 15 km.

Orders above ₹1000 get free delivery.
`,

    question: "Can you deliver this today?"
});

console.log(prompt);