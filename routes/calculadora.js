const express = require('express');
const auth = require('../middleware/auth');
const Calculo = require('../models/Calculo');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const calculos = await Calculo.find({ userId: req.userId }).sort({ createdAt: -1 }).limit(10);
  res.json(calculos);
});

router.post('/', auth, async (req, res) => {
  try {
    const { materiales = 0, manoObra = 0, indirectos = 0, margen = 0 } = req.body;
    const costo = materiales + manoObra + indirectos;
    const ganancia = costo * (margen / 100);
    const precio = costo + ganancia;
    
    const calculo = await Calculo.create({
      userId: req.userId,
      materiales, manoObra, indirectos, margen,
      costo, ganancia, precio
    });
    
    res.status(201).json(calculo);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
