const { Sequelize } = require('sequelize');
const config = require('./config');

let sequelize = null;

const getConnection = () => {
  if (!sequelize) {
    sequelize = new Sequelize(config.database.url, config.database.options);
  }
  return sequelize;
};

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

module.exports = getConnection();
