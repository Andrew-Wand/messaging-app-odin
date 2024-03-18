const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();
const bodyParser = require("body-parser");
// let corsOptions = {
//   origin: "http://localhost:8081",
// };
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static(path.join(__dirname, "public")));

const db = require("./models");
const Role = db.role;
const Message = db.message;
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
//   initial();
// });
db.sequelize.sync().then(() => {
  // initial();
  // initalMessages();
});

const PORT = 8081 || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

// function initalMessages() {
//   Message.create({
//     text: "Hello, this is a message.",
//     owner: "sample text",
//     receiver: "sample text",
//   });
// }
// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// const items = [
//   {
//     name: "Laptop",
//     price: 500,
//   },
//   {
//     name: "Desktop",
//     price: 700,
//   },
// ];

// app.get("/api/items", (req, res) => {
//   res.send(items);
// });

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/message.routes")(app);

module.exports = app;
