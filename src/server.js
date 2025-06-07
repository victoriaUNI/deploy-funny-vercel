const app = require('./app');
const config = require('./config');

// Em desenvolvimento, inicia o servidor
if (config.app.env !== 'production') {
  app.listen(config.app.port, () => {
    console.log(`Servidor rodando na porta ${config.app.port}`);
  });
}

// Exporta o app para a Vercel
module.exports = app;
