require("dotenv").config();
const Sequelize = require("sequelize");
// import getUserModel from "./user";
// import getMessageModel from "./message";

const dbName = "messagingapp";
const sequelize = new Sequelize(
  dbName,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "postgres",
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// const models = {
//   User: getUserModel(sequelize, Sequelize),
//   // Message: getMessageModel(sequelize, Sequelize),
// };

db.user = require("../models/user.js")(sequelize, Sequelize);
db.role = require("../models/role.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

// Object.keys(models).forEach((key) => {
//   if ("associate" in models[key]) {
//     models[key].associate(models);
//   }
// });

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
