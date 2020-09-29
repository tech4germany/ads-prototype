"use strict";

const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 8000;

const app = express();

app.use("/", express.static(path.join(__dirname, "../build")));

// React App
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is up and running: http://0.0.0.0:${PORT}`);
});

