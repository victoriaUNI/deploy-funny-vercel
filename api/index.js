const express = require('express');
const cors = require('cors');
const config = require('../src/config');

const app = express();

// Configuração do CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware para OPTIONS requests
app.options('*', cors());

app.use(express.json());

// Middleware para verificar se a requisição é OPTIONS
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Carrega as rotas existentes
app.use('/api/auth', require('../src/routes/auth'));
app.use('/api/criancas', require('../src/routes/criancas'));
app.use('/api/diagnosticos', require('../src/routes/diagnosticos'));
app.use('/api/atividades', require('../src/routes/atividades'));
app.use('/api/progresso', require('../src/routes/progresso'));
app.use('/api/responsaveis', require('../src/routes/responsaveis'));

// Rota de healthcheck
app.get('/', async (req, res) => {
  try {
    const db = require('../src/database');
    await db.authenticate();
    
    res.json({ 
      status: 'ok',
      message: '🚀 API está funcionando!',
      database: 'conectado',
      timestamp: new Date().toISOString(),
      endpoints: [
        '/api/auth',
        '/api/criancas',
        '/api/diagnosticos',
        '/api/atividades',
        '/api/progresso',
        '/api/responsaveis'
      ]
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

// Middleware para tratar rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.path,
    method: req.method,
    availableEndpoints: [
      '/api/auth',
      '/api/criancas',
      '/api/diagnosticos',
      '/api/atividades',
      '/api/progresso',
      '/api/responsaveis'
    ]
  });
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