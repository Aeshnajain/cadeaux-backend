require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/products");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(
  cors({
    "origin": "*",
  })
);

app.use(productRoutes);

mongoose
  .connect(process.env.MONG_URI)
  .then((data) => {
    console.log("DB connection successful!");
  })
  .catch((error) => {
    console.log("Error connecting to DB", error);
  });

app.listen(process.env.PORT);
