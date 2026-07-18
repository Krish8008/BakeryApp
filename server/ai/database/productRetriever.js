const Product = require("../../models/Product");

async function findProducts(filters) {

    const query = {};

    // Always show available products unless specified otherwise
    query.available = filters.available ?? true;

    // Eggless
    if (filters.eggless !== null) {
        query.eggless = filters.eggless;
    }

    // Weight
    if (filters.weight) {
        query.weight = filters.weight;
    }

    // Category
    if (filters.category) {
        query.category = filters.category;
    }

    // Rating
    if (filters.minRating) {
        query.ratings = {
            $gte: filters.minRating,
        };
    }

    // Price
    if (filters.minPrice || filters.maxPrice) {

        query.price = {};

        if (filters.minPrice)
            query.price.$gte = filters.minPrice;

        if (filters.maxPrice)
            query.price.$lte = filters.maxPrice;
    }

    // Search by text
    if (filters.flavor || filters.name) {

        const keyword = filters.flavor || filters.name;

        query.$or = [
            {
                name: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                flavor: {
                    $regex: keyword,
                    $options: "i",
                },
            },
            {
                category: {
                    $regex: keyword,
                    $options: "i",
                },
            },
        ];
    }

    return await Product.find(query).lean();

}

module.exports = {
    findProducts,
};