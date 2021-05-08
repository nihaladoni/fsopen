require("dotenv").config();
const express = require("express");
const jsonparser = require("json-parser");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// morgan configuration

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send(`<h1>API available at route /api/persons and /info</h1>`);
});

app.get("/info", (req, res) => {
  Person.find({}).then((persons) => {
    const date = new Date(Date.now());
    const numPersons = persons.length;

    res.send(
      `<div>Phonebook of ${numPersons} person(s)</div>` + `<div>${date}</div>`
    );
  });
});

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((person) => {
      res.json(person);
    })
    .catch((e) => next(e));
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(400).end({ error: "Id find error" });
      }
    })
    .catch((e) => next(e));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  });

  person
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((e) => next(e));
});

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndUpdate(id, { number: req.body.number }, { new: true })
    .then((doc) => res.json(doc))
    .catch((e) => next(e));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndRemove(id)
    .then((doc) => console.log(doc))
    .catch((e) => next(e));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error(err.name);

  switch (err.name) {
    case "CastError":
      return res.status(400).send({ error: "malformatted id" });
    case "TypeError":
      return res.status(400).send({ error: "GET method error" });
    case "ValidationError":
      return res.status(400).json({ error: err.message });
    default:
      break;
  }

  next(err);
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
