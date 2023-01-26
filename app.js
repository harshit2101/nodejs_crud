const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const userRouter = require("./routes/users");
require('dotenv').config()

app.get("/", (req, res) => {
  res.send("Hello world 2");
});

app.use(express.json());

app.use("/users", userRouter);

const port = 3000 || process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Listening at port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
