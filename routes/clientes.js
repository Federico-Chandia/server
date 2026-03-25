const router = require('express').Router();
const auth = require('../middleware/auth');
const Cliente = require('../models/Cliente');

router.get('/', auth, async (req, res) => {
  const clientes = await Cliente.find({ userId: req.userId }).sort({ nombre: 1 });
  res.json(clientes);
});

router.post('/', auth, async (req, res) => {
  try {
    const cliente = await Cliente.create({ ...req.body, userId: req.userId });
    res.status(201).json(cliente);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  await Cliente.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ ok: true });
});

module.exports = router;
