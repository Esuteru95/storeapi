import Sequelize from 'sequelize';
const sequelize = new Sequelize(
    'storedb',//The name of database
    'root',//The username of the database
    '1264161995a',//The password of the database
    {
        dialect:'mysql',
        host:'localhost'
    }
);

export default sequelize;