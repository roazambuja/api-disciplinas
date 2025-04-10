import express from "express";
import subjectRepository from "./repository.js";

const subjects = subjectRepository();
const app = express();
const port = 3000;

app.use(express.json());

app.get("/disciplinas", (req, res) => {
  const { name } = req.query;
  const list = subjects.list(name);
  res.set("X-Total-Count", list.length);
  res.json(list);
});

app.get("/disciplinas/:id", (req, res) => {
  const { id } = req.params;
  const subject = subjects.findById(id);
  res.json(subject);
});

app.post("/disciplinas", (req, res) => {
  const { name, hours, isMandatory } = req.body;
  const subject = subjects.create({ name, hours, isMandatory });
  res.status(201).json(subject);
});

app.put("/disciplinas/:id", (req, res) => {
  const { name, hours, isMandatory } = req.body;
  const { id } = req.params;
  const subject = subjects.update(id, { name, hours, isMandatory });
  if (!subject) {
    return res.status(404).json({ message: "Disciplina não encontrada!" });
  }
  res.json(subject);
});

app.delete("/disciplinas/:id", (req, res) => {
  const { id } = req.params;
  const result = subjects.remove(id);
  if (!result) {
    return res.status(404).json({ message: "Disciplina não encontrada!" });
  }
  res.status(204).send();
});

app.get("/", (req, res) => {
  res.send("API Disciplinas");
});

app.listen(port, () => {
  console.log("Servidor rodando na porta", port);
});
