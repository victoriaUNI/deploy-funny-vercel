const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL || 'postgresql://autismo_db_ftev_user:9Qyy1dk3jJZgA6cpxpo0hmNmtuS1sbT8@dpg-d129t7buibrs73f0rav0-a/autismo_db_ftev';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
    keepAlive: true
  },
  pool: {
    max: 2,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  retry: {
    max: 3,
    timeout: 30000
  },
  define: {
    timestamps: true,
    underscored: true
  }
});

// Testa a conexão e reconecta se necessário
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o PostgreSQL estabelecida!');
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco:', error);
    // Tenta reconectar em 5 segundos
    setTimeout(testConnection, 5000);
  }
};

// Inicia o teste de conexão
testConnection();

module.exports = sequelize;
