const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/home-posters", async (_, res) => {
  try {
    const db = mongoose.connection;
    const collection = db.collection("Home-page-posters");
    const data = await collection.find({}).toArray();
    res.json(data?.[0]?.posters);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data from MongoDB");
  }
});

router.get("/", async (_, res) => {
  try {
    const db = mongoose.connection;
    const collection = db.collection("Product-Categories");
    const data = await collection.find({}).toArray();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data from MongoDB");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const reqId = req.params.id;
    const db = mongoose.connection;

    const categoryCollection = db.collection("Product-Categories");
    const categories = await categoryCollection.find({}).toArray();
    const categoryValues = categories.map((category) => category.category);
    const isValid = categoryValues.includes(reqId);

    if (isValid) {
      const collection = db.collection("Inventory");
      const data = await collection.find({ category: reqId }).toArray();
      res.json(data);
    } else res.json([]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data from MongoDB");
  }
});

module.exports = router;
