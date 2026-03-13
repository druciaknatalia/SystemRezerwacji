const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

const users = [
  { id: 1, name: "Anna Kowalska", email: "anna@example.com" },
  { id: 2, name: "Jan Nowak", email: "jan@example.com" },
  { id: 3, name: "Maria Wiśniewska", email: "maria@example.com" }
];

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API running on port ${PORT}`);
});
