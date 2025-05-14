require('dotenv').config()

module.exports = {
  local: {
    username: 'root',
    password: null,
    database: 'miniProject',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: true,
  },
  development: {
    username: 'root',
    password: null,
    database: 'miniProject',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: true,
  },
  test: {
    username: 'root',
    password: '',
    database: 'miniProject_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
}
