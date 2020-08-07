require('dotenv').config();

module.exports = {
        development: {
        username: "root",
            password: process.env.SEQUELIZE_PASSWORD,
            database: "nodebird",
            host: "127.0.0.1",
            dialect: "mysql",
            operatorsAliases: "false",
    },
        production: {
        username: "root",
            password: process.env.SEQUELIZE_PASSWORD,
            database: "nodebird",
            host: "127.0.0.1",
            dialect: "mysql",
            operatorsAliases: "false",
            logging: false, //실제 배포용에서는 sql문 어떤게 찍혔는지 로그 남기지 않게 함
    }

}