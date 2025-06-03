const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const policialSchema = new Schema({
  nome: { type: String, required: true },
  matricula: { type: Number, required: true, unique: true },
  telefone: { type: String, required: true },
  patente: { type: String, required: true }
});

module.exports = mongoose.model('Policial', policialSchema);
