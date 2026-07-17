async function detectIntent(question) {

    const text = question.toLowerCase();

    if (text.includes("cake"))
        return "cakes";

    if (text.includes("price"))
        return "cakes";

    if (text.includes("delivery"))
        return "knowledge";

    if (text.includes("refund"))
        return "knowledge";

    if (text.includes("payment"))
        return "knowledge";

    return "general";

}

module.exports = {
    detectIntent,
};