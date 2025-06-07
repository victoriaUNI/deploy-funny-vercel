const express = require('express');
const cors = require('cors');
const config = require('../src/config');

const app = express();

// Configuração do CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true
}));

// Middleware para OPTIONS requests
app.options('*', cors());

// Parse JSON payloads
app.use(express.json());

// Carrega as rotas existentes sem o prefixo /api
app.use('/auth', require('../src/routes/auth'));
app.use('/criancas', require('../src/routes/criancas'));
app.use('/diagnosticos', require('../src/routes/diagnosticos'));
app.use('/atividades', require('../src/routes/atividades'));
app.use('/progresso', require('../src/routes/progresso'));
app.use('/responsaveis', require('../src/routes/responsaveis'));

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
        '/auth',
        '/criancas',
        '/diagnosticos',
        '/atividades',
        '/progresso',
        '/responsaveis'
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
      '/auth',
      '/criancas',
      '/diagnosticos',
      '/atividades',
      '/progresso',
      '/responsaveis'
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