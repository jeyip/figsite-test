const PORT = process.env.PORT || 6789;
const axios = require("axios");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json("Test");
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
