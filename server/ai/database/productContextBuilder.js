function buildProductContext(products) {

    if (!products.length) {
        return "No matching products found.";
    }

    return products.map((product, index) => `
Product ${index + 1}

Name: ${product.name}
Price: ₹${product.price}
Category: ${product.category}
Flavor: ${product.flavor}
Weight: ${product.weight}
Eggless: ${product.eggless ? "Yes" : "No"}

`).join("\n");
}

module.exports = {
    buildProductContext,
};