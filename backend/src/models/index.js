import sequelize from "../config.js";
import User from "./user.js";
import Sweet from "./sweet.js";

await sequelize.sync();

export { sequelize, User, Sweet };