const { Sequelize } = require('sequelize');
const config = require('./config');

// Cria a instância do Sequelize com as configurações
const sequelize = new Sequelize(config.database.url, {
  ...config.database.options,
  // Adiciona logging condicional
  logging: (msg) => {
    if (config.app.env === 'development') {
      console.log(msg);
    }
  }
});

// Testa a conexão
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexão com o PostgreSQL estabelecida!');
  })
  .catch(err => {
    console.error('❌ Erro ao conectar ao banco:', err);
  });

module.exports = sequelize;
