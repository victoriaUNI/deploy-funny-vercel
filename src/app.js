const express = require('express');
const app = express();
const sequelize = require('./database');
const cors = require('cors');

// Configuração do CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Middleware para tratar erros de JSON inválido
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'JSON inválido' });
  }
  next();
});

const Crianca = require('./models/Crianca');
app.use('/criancas', require('./routes/criancas'));

const Diagnostico = require('./models/Diagnostico');
app.use('/diagnosticos', require('./routes/diagnosticos'));

const Atividade = require('./models/Atividade');
app.use('/atividades', require('./routes/atividades'));

const Progresso = require('./models/Progresso');
app.use('/progresso', require('./routes/progresso'));

const Responsavel = require('./models/Responsavel');
app.use('/responsaveis', require('./routes/responsaveis'));

const Usuario = require('./models/Usuario');
app.use('/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.json({ message: '🚀 API está funcionando!' });
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro na aplicação:', err);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Função para inicializar o banco de dados
const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o PostgreSQL estabelecida!');
    
    // Em produção, não vamos sincronizar automaticamente para evitar alterações não intencionais
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync();
      console.log('📦 Tabelas sincronizadas com sucesso!');
    }
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco:', error);
    // Não vamos derrubar o servidor em caso de erro de conexão
    // para permitir que a Vercel continue tentando
  }
};

// Inicializa o banco de dados
initializeDatabase();

module.exports = app;
