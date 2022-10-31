require("dotenv").config();
const app = require("./app");
const { MongoClient } = require("mongodb");

const PORT = process.env.PORT;
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const dbName = "db-contacts";

const start = async () => {
  await client.connect();
  console.log("connected");
  const db = client.db(dbName);
  const collection = db.collection("contacts");
  const findResult = await collection.find({}).toArray();
  console.log("Found documents =>", findResult);
  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};

start();
