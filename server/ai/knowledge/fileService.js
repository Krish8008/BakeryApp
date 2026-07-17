const fs = require("fs");
const path = require("path");

const KNOWLEDGE_PATH = path.join(__dirname, "../../knowledge");
console.log(KNOWLEDGE_PATH);
function readKnowledgeFiles() {

    const files = fs.readdirSync(KNOWLEDGE_PATH);

    const markdownFiles = files.filter(file => file.endsWith(".md"));

    return markdownFiles.map(file => {

        const content = fs.readFileSync(
            path.join(KNOWLEDGE_PATH, file),
            "utf-8"
        );

        return {
            fileName: file,
            content,
        };
    });
}

module.exports = {
    readKnowledgeFiles,
};