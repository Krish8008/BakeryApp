function chunkText(text, chunkSize = 500) {

    const chunks = [];

    if (!text || typeof text !== "string") {
        return chunks;
    }

    // Remove extra spaces and line breaks
    text = text.replace(/\r\n/g, "\n").trim();

    // Split into paragraphs
    const paragraphs = text
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(Boolean);

    let currentChunk = "";

    for (const paragraph of paragraphs) {

        if ((currentChunk + paragraph).length < chunkSize) {

            currentChunk += paragraph + "\n\n";

        } else {

            if (currentChunk) {
                chunks.push(currentChunk.trim());
            }

            currentChunk = paragraph + "\n\n";
        }
    }

    if (currentChunk) {
        chunks.push(currentChunk.trim());
    }

    return chunks;
}

module.exports = {
    chunkText,
};