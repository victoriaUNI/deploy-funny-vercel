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
  logging: false
});

module.exports = sequelize;
