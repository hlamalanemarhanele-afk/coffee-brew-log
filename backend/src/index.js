require("dotenv").config();
const express = require("express");
const cors = require("cors");
const brewsRouter = require("./routes/brews");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok", service: "coffee-brew-log-api" });
});

app.use("/api/brews", brewsRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  console.log(`Coffee Brew Log API listening on port ${PORT}`);
});