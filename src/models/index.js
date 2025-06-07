const Crianca = require('./Crianca');
const Diagnostico = require('./Diagnostico');
const Atividade = require('./Atividade');
const Progresso = require('./Progresso');
const Responsavel = require('./Responsavel');
const Usuario = require('./Usuario');

// Define as associações entre os modelos
const initializeModels = () => {
  // Aqui você pode definir as associações entre os modelos
  // Por exemplo:
  // Usuario.hasMany(Crianca);
  // Crianca.belongsTo(Usuario);
};

module.exports = {
  Crianca,
  Diagnostico,
  Atividade,
  Progresso,
  Responsavel,
  Usuario,
  initializeModels
}; 