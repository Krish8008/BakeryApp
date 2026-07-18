require("dotenv").config();
const mongoose = require("mongoose");

const { extractFilters } = require("../ai/llm/queryExtractor");
const { findProducts } = require("../ai/database/productRetriever");
const { buildProductContext } = require("../ai/database/productContextBuilder");

async function main() {

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    const filters = await extractFilters(
        "Show eggless chocolate cakes under 700"
    );

    const products = await findProducts(filters);

    const context = buildProductContext(products);

    console.log(context);

    await mongoose.disconnect();
}

main().catch(console.error);