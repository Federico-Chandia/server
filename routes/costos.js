const express = require('express');
const auth = require('../middleware/auth');
const Costo = require('../models/Costo');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const costos = await Costo.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(costos);
});

router.post('/', auth, async (req, res) => {
  try {
    const costo = await Costo.create({ ...req.body, userId: req.userId });
    res.status(201).json(costo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  await Costo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ ok: true });
});

module.exports = router;
