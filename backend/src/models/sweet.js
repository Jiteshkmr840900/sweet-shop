import { DataTypes } from "sequelize";
import sequelize from "../config.js";

const Sweet = sequelize.define("Sweet", {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER
});

export default Sweet;