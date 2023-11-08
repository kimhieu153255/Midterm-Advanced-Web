const express = require("express");
const session = require("express-session");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 1000 * 10 },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong");
});

app.listen(port, () => {
  console.log(`server is running in http://localhost:${port}`);
});
