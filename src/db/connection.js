require("dotenv").config();
const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
const dbName = "db-contacts";

const connectMongo = async () => {
  await client.connect();
  const db = client.db(dbName);
  const Users = db.collection("contacts");
  console.log("DB connected successfully");
  return { Users };
};

module.exports = { connectMongo };
