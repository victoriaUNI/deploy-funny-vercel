const express = require('express');
const app = express();
const sequelize = require('./database');

let isDbConnected = false;

async function connectDB() {
  if (!isDbConnected) {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('✅ Banco conectado e sincronizado!');
      isDbConnected = true;
    } catch (err) {
      console.error('❌ Erro ao conectar ao banco:', err);
    }
  }
}

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use(express.json());

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
  res.send('🚀 API está funcionando!');
});



module.exports = app;
