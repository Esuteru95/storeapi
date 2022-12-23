import sequelize from 'sequelize';
import Database from '../database.js';

const Company = Database.define('company', {
      id:{
          //כאשר יש יותר מפרמטר אחד בונים אובייקט
          type:sequelize.INTEGER,
          autoIncrement: true,
          allowNull:false,
          primaryKey: true
        },
    companyname:sequelize.STRING,
    logo:sequelize.STRING,
    email:sequelize.STRING,
    city:sequelize.STRING,
    phone:sequelize.STRING,
    bio:sequelize.STRING,
    categoryID:sequelize.INTEGER
})

export default Company;