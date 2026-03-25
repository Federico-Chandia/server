const mongoose = require('mongoose');

const calculoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  materiales: { type: Number, default: 0 },
  manoObra: { type: Number, default: 0 },
  indirectos: { type: Number, default: 0 },
  margen: { type: Number, default: 0 },
  costo: { type: Number, required: true },
  ganancia: { type: Number, required: true },
  precio: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Calculo', calculoSchema);
