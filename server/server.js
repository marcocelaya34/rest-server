require("./config/config");

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();

  app.options("*", (req, res) => {
    // allowed XHR methods
    res.header(
      "Access-Control-Allow-Methods",
      "GET, PATCH, PUT, POST, DELETE, OPTIONS"
    );
    res.send();
  });
});

app.use(require("./routes/usuario"));

async function connectDB() {
  let setURL = require("./config/config");
  await setURL();

  mongoose.connect(
    process.env.URLDB,
    { useNewUrlParser: true, useCreateIndex: true },
    (err, res) => {
      if (err) throw err;

      console.log("Base de Datos Online");
    }
  );
}

connectDB();

app.listen(process.env.PORT, () => {
  console.log("Escuchando puerto: ", process.env.PORT);
});
