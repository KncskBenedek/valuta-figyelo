const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query).toString();
    const url = `http://api.napiarfolyam.hu/${params ? "?" + params : ""}`;
    const response = await fetch(url);

    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error("Hiba történt:", error);
    res.status(500).send("Hiba a proxy kérés során.");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy szerver fut: http://localhost:${PORT}`);
});
