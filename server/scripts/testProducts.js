require("dotenv").config();
const mongoose = require("mongoose");

const { extractFilters } = require("../ai/llm/queryExtractor");
const { findProducts } = require("../ai/database/productRetriever");

async function main() {

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const filters = await extractFilters(
        "Show eggless chocolate cakes under 700"
    );

    console.log(filters);

    const products = await findProducts(filters);

    console.log(products);

    await mongoose.disconnect();
}

main().catch(console.error);