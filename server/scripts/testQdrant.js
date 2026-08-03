// require("dotenv").config();

// const { createCollection } = require("../ai/vectorstore/qdrantService");

// async function main() {

//     await createCollection();

//     console.log("Finished");

// }

// main();

// const path = require("path");

// require("dotenv").config({
//   path: path.join(__dirname, "../.env"),
// });

// console.log(__dirname);
// console.log(process.env.QDRANT_URL);

require("dotenv").config();

const client = require("../ai/vectorstore/qdrantClient");

async function main() {
  const info = await client.getCollection(
    process.env.QDRANT_COLLECTION
  );

  console.log(JSON.stringify(info, null, 2));
}

main();