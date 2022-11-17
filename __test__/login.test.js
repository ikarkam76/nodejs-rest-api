// const mongoose = require("mongoose");
// require("dotenv").config();

// const { User } = require("../src/models/userModel");
// const jwt = require("jsonwebtoken");
// const { JWT_SECRET, MONGODB_URL } = process.env;

// const { loginController } = require("../src/controllers/authController");

// describe("insert", () => {
//     let connection;
//     const mReq = {
//         body: {
//             email: "robocop11@chicago.com",
//             password: '12345678'
//         },
//     };

//   beforeAll(async () => {
//     connection = await mongoose.connect(MONGODB_URL);
//   });

//   afterAll(async () => {
//     await connection.close();
//   });
    
    
//   it("should insert a doc into collection", async () => {
//      const user = await User.findOne({ email: mReq.body.email });

//       const newToken = await jwt.sign({ _id: user._id }, JWT_SECRET);
//       const response = await loginController(mReq, res);
//       console.log(response);
      

//     expect().toEqual();
//   });
// });
