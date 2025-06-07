require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 8080;

// Wrap em try-catch para capturar erros de inicialização
try {
  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  }
} catch (error) {
  console.error('Erro ao iniciar o servidor:', error);
}

// Exporta o app para a Vercel
module.exports = app;
