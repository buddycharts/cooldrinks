const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve images from drinks folder
app.use("/drinks", express.static(path.join(__dirname, "drinks")));

// Read drinks.json
app.get("/drinks", (req, res) => {
  fs.readFile("drinks.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading drinks.json" });
    }
    res.json(JSON.parse(data));
  });
});

// Render uses PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Drinks API running on port ${PORT}`);
});
