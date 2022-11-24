import sequelize from 'sequelize';
import Database from '../database.js';
const User = Database.define('user',{
    id:{
        //כאשר יש יותר מפרמטר אחד בונים אובייקט
        type:sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true
    },
    firstname: sequelize.STRING, //אם יש רק פרמטר אחד אפשר לא לכתוב סוגריים
    lastname: sequelize.STRING, 
    email:{type:sequelize.STRING, allowNull:false},
    password:{type:sequelize.STRING, allowNull:false},
    isApproved:{type:sequelize.BOOLEAN}
})

export default User;