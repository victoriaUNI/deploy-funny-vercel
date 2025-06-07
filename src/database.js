const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL || 'postgresql://autismo_db_ftev_user:9Qyy1dk3jJZgA6cpxpo0hmNmtuS1sbT8@dpg-d129t7buibrs73f0rav0-a/autismo_db_ftev';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 2,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
  retry: {
    max: 3,
    timeout: 30000
  }
});

module.exports = sequelize;
