//basic express server with logs
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { legacyController } = require("./controllers");

const PORT = process.env.PORT || 3001;

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/users", async (req, res) => {
  const { sort = "desc" } = req.query;
  const users = await legacyController.getUsers(sort);
  return res.json(users);
});

const server = app.listen(PORT, () => {
  console.log(
    `Server is running on port ${server.address().port}\nhttp://localhost:${
      server.address().port
    }`
  );
});
