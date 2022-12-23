import sequelize from 'sequelize';
import Database from '../database.js';
 
const Category = Database.define('category',{
    id:{type:sequelize.INTEGER,
             autoIncrement:true,
             allowNull:false,
             primaryKey:true
        },
    categoryname:sequelize.STRING
})

export default Category;