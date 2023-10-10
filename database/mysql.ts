import { Sequelize } from "sequelize-typescript";
import config from "../config/config";
import User from "../model/sql/user/user.model";

const db = new Sequelize(
  config.mysqldatabase,
  config.mysqlusername,
  config.mysqlpassword,
  {
    host: config.host,
    dialect: "mysql",
  }
);

// add models here
db.addModels([User]);

const connectSQLDatabase = () => {
  db.sync({ force: true })
    .then(() => console.log("Connected to db successfully 😎"))
    .catch((err) => console.log(err));
};

export { connectSQLDatabase, db };
