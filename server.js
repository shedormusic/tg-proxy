const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(bodyParser.json());

app.post("/send", async (req, res) => {
  const token = process.env.TELEGRAM_TOKEN;
  const chat_id = process.env.TELEGRAM_CHAT_ID;

  const message = Object.entries(req.body)
    .map(([key, value]) => `<b>${key}</b>: ${value}`)
    .join("\n");

  try {
    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id,
      text: message,
      parse_mode: "HTML"
    });
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.toString() });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});