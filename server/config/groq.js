require("dotenv").config();
const Groq  = require("groq-sdk");

if (!process.env.GROQ_API_KEY) {
  // Export null when GROQ_API_KEY is not provided to avoid crashes at module load
  module.exports = null;
} else {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });

  module.exports = groq;
}
