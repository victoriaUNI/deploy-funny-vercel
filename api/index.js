const express = require('express');
const cors = require('cors');
const config = require('../src/config');

const app = express();

// Configuração básica
app.use(cors(config.cors));
app.use(express.json());

// Rota de healthcheck
app.get('/', async (req, res) => {
  try {
    const db = require('../src/database');
    await db.authenticate();
    
    res.json({ 
      status: 'ok',
      message: '🚀 API está funcionando!',
      database: 'conectado',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro no healthcheck:', error);
    res.status(503).json({
      status: 'error',
      message: '🚨 API está com problemas!',
      database: 'desconectado',
      error: error.message
    });
  }
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro na aplicação:', err);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: err.message
  });
});

module.exports = app; 