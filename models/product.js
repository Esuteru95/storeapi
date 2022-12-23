import sequelize from 'sequelize';
import Database from '../database.js';
 
const Product = Database.define('product',{
    id:{type:sequelize.INTEGER,
             autoIncrement:true,
             allowNull:false,
             primaryKey:true
        },
    productPrice: sequelize.DECIMAL,
    productName:sequelize.STRING,
    productDescription:sequelize.TEXT,
    productImage:sequelize.STRING,
    unitInStock: sequelize.INTEGER,
    categoryId:sequelize.INTEGER,
    companyId:sequelize.INTEGER
})

export default Product;