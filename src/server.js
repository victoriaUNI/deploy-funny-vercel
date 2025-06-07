require('dotenv').config();
const app = require('./app');

// Em desenvolvimento, inicia o servidor
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

// Exporta o app para a Vercel
module.exports = app;
