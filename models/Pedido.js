const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  descripcion: { type: String, required: true },
  cliente: { type: String, required: true },
  hora: { type: String, required: true },
  fecha: { type: Date, required: true },
  estado: { type: String, enum: ['pendiente', 'en_preparacion', 'listo', 'entregado'], default: 'pendiente' },
  monto: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Pedido', pedidoSchema);
