require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/products");
const mongoose = require("mongoose");
const cors = require("cors");

const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI)
  .then((data) => {
    console.log("DB connection successful!");
  })
  .catch((error) => {
    console.log("Error connecting to DB", error);
  });

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(productRoutes);
app.listen(process.env.PORT);
