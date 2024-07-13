const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());

const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

app.use(cookieParser());

dotenv.config();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/cors", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send({ msg: "This has CORS enabled 🎈" });
});

//routers
 app.use("/authUser", require("./routers/userRouter"));
 app.use("/ticket", require("./routers/ticketBookingRouter"));

app.get("/", function (req, res) {
  res.send("Metro Train Backend");
});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


const connectToDB = async () => {
  try {
    mongoose.connect(process.env.MDB_CONNECT_STRING);
    console.log("connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
connectToDB();
