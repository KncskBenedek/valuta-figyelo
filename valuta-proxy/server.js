const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Engedélyezzük a CORS-ot minden origin-re
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const response = await fetch("http://api.napiarfolyam.hu/?valuta=eur");
    const data = await response.text(); // az API XML-ben válaszol
    res.send(data);
  } catch (error) {
    console.error("Hiba történt:", error);
    res.status(500).send("Hiba a proxy kérés során.");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy szerver fut: http://localhost:${PORT}`);
});
