const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true},
  senha: { type: String, required: true}
});

module.exports = mongoose.model('Usuario', usuarioSchema);