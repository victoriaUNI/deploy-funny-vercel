const express = require('express');
const cors = require('cors');
const config = require('./config');

// Inicializa o express
const app = express();

// Configuração do CORS
app.use(cors(config.cors));

// Parse JSON payloads
app.use(express.json());

// Middleware para tratar erros de JSON inválido
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'JSON inválido' });
  }
  next();
});

// Carregamento das rotas
app.use('/criancas', require('./routes/criancas'));
app.use('/diagnosticos', require('./routes/diagnosticos'));
app.use('/atividades', require('./routes/atividades'));
app.use('/progresso', require('./routes/progresso'));
app.use('/responsaveis', require('./routes/responsaveis'));
app.use('/auth', require('./routes/auth'));

// Rota de healthcheck
app.get('/', async (req, res) => {
  try {
    const db = require('./database');
    await db.authenticate();
    
    res.json({ 
      status: 'ok',
      message: '🚀 API está funcionando!',
      database: 'conectado',
      timestamp: new Date().toISOString(),
      env: config.app.env
    });
  } catch (error) {
    console.error('Erro no healthcheck:', error);
    res.status(503).json({
      status: 'error',
      message: '🚨 API está com problemas!',
      database: 'desconectado',
      timestamp: new Date().toISOString(),
      env: config.app.env
    });
  }
});

// Middleware para tratar rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro na aplicação:', err);
  
  // Se for um erro do Sequelize, retorna uma mensagem mais amigável
  if (err.name && err.name.startsWith('Sequelize')) {
    return res.status(503).json({
      error: 'Erro de banco de dados',
      message: config.app.env === 'development' ? err.message : 'Erro ao acessar o banco de dados'
    });
  }
  
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: config.app.env === 'development' ? err.message : 'Ocorreu um erro interno'
  });
});

module.exports = app;

