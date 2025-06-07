const express = require('express');
const app = express();
const sequelize = require('./database');

app.use(cors());
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

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
