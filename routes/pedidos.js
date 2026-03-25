const router = require('express').Router();
const auth = require('../middleware/auth');
const Pedido = require('../models/Pedido');

router.get('/', auth, async (req, res) => {
  const pedidos = await Pedido.find({ userId: req.userId }).sort({ fecha: 1 });
  res.json(pedidos);
});

router.post('/', auth, async (req, res) => {
  try {
    const pedido = await Pedido.create({ ...req.body, userId: req.userId });
    res.status(201).json(pedido);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    const pedido = await Pedido.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
    if (!pedido) return res.status(404).json({ error: 'No encontrado' });
    res.json(pedido);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  await Pedido.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ ok: true });
});

module.exports = router;
