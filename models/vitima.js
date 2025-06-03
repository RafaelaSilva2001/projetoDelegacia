const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vitimaSchema = new Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  dataNascimento: { type: Date, required: true },
  filiacao: { type: String, required: true },
  endereco: { type: String, required: true },
  telefone: { type: String, required: true },
  grauEscolaridade: { type: String, required: true }
});

module.exports = mongoose.model('Vitima', vitimaSchema);
