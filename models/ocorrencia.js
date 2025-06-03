const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ocorrenciaSchema = new Schema({
  tipoCrime: { type: String, required: true },
  dataHora: { type: Date, required: true },
  localOcorrencia: { type: String, required: true },
  pontoReferencia: { type: String, required: true },
  policial: { type: Schema.Types.ObjectId, ref: 'Policial', required: true },
  vitima: { type: Schema.Types.ObjectId, ref: 'Vitima', required: true }
});

module.exports = mongoose.model('Ocorrencia', ocorrenciaSchema);
