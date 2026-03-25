const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  nombre: { type: String, required: true },
  telefono: String,
  email: String,
}, { timestamps: true });

module.exports = mongoose.model('Cliente', clienteSchema);
