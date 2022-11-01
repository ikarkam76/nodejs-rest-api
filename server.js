require("dotenv").config();
const app = require("./app");
const { connectMongo } = require("./src/db/connection");

const PORT = process.env.PORT;

const start = async () => {
  try {
    await connectMongo();
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

start();