const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const { createUserTable } = require("./models/auth-model");

createUserTable()
  .then(() => console.log("Table user has been created"))
  .catch((error) => console.log(error));

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/auth-route"));

app.listen(5000, () => {
  console.log("Server Running on port 5000");
});
