const express = require('express');
const auth = require('../middleware/auth');
const Producto = require('../models/Producto');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const productos = await Producto.find({ userId: req.userId }).sort({ nombre: 1 });
  res.json(productos);
});

router.post('/', auth, async (req, res) => {
  try {
    const producto = await Producto.create({ ...req.body, userId: req.userId });
    res.status(201).json(producto);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  await Producto.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ ok: true });
});

module.exports = router;
