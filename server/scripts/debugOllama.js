const ollama = require("ollama");

console.log(ollama);

const response = await ollama.embed({
    model: "nomic-embed-text",
    input: "Hello World",
});

console.log(response);

