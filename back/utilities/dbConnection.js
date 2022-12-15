const Sequelize = require('sequelize');

database = {
    NAME: 'datawarehouse',
    HOST: 'localhost',
    USER: 'root',
    // PASSWORD: '5555',
    dialect: 'mysql',
    PORT: 3306
}

const sequelize = new Sequelize(database.NAME, database.USER, database.PASSWORD, {
    host: database.HOST,
    port: database.PORT,
    dialect: database.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

sequelize.authenticate().then( () => {
    console.log('Conectado.');
}).catch(err => {
    console.error('Error de conexion:', err);
})


module.exports = sequelize;