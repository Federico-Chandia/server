const mongoose = require('mongoose');

const costoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  concepto: { type: String, required: true },
  monto: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Costo', costoSchema);
