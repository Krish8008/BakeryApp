require("dotenv").config();

const {
    readKnowledgeFiles,
} = require("../ai/knowledge/fileService");

const files = readKnowledgeFiles();

console.log(files);