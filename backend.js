import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Fetch SPX Options
app.get("/options", async (req, res) => {
  try {
    const response = await fetch("https://query2.finance.yahoo.com/v7/finance/options/^SPX");
    const data = await response.json();
    res.json(data.optionChain.result[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch options data" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
