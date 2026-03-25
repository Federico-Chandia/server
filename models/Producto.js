const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nombre: { type: String, required: true },
  stock: { type: Number, default: 0 },
  stockMinimo: { type: Number, default: 5 },
  precio: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema);
