const express = require("express");

const cors = require("cors");
const errorHandle = require("./middleware/errorHandeler");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const connectToMongoDB = require("./db");

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/uploads", express.static("uploads"));

app.use(errorHandle);

app.use(
  cors({
    origin: "*",
    "Access-Control-Allow-Origin": "*",
  })
);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/question", require("./routes/question"));

connectToMongoDB();

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
