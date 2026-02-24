const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// test endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// minimalny CRUD "visits" w pamięci (na razie bez DB)
let visits = [];
let nextId = 1;

app.get("/api/visits", (req, res) => res.json(visits));

app.get("/api/visits/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = visits.find(v => v.id === id);
  if (!item) return res.status(404).json({ message: "Not found" });
  res.json(item);
});

app.post("/api/visits", (req, res) => {
  const { date, time, service, note } = req.body;
  if (!date || !time || !service) {
    return res.status(400).json({ message: "date, time, service are required" });
  }
  const newItem = { id: nextId++, date, time, service, note: note || "" };
  visits.push(newItem);
  res.status(201).json(newItem);
});

app.put("/api/visits/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = visits.findIndex(v => v.id === id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });

  const { date, time, service, note } = req.body;
  if (!date || !time || !service) {
    return res.status(400).json({ message: "date, time, service are required" });
  }

  visits[idx] = { id, date, time, service, note: note || "" };
  res.json(visits[idx]);
});

app.delete("/api/visits/:id", (req, res) => {
  const id = Number(req.params.id);
  visits = visits.filter(v => v.id !== id);
  res.status(204).send();
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});
