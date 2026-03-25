const router = require('express').Router();
const auth = require('../middleware/auth');
const Pedido = require('../models/Pedido');
const Costo = require('../models/Costo');

router.get('/', auth, async (req, res) => {
  const [pedidos, costos] = await Promise.all([
    Pedido.find({ userId: req.userId }),
    Costo.find({ userId: req.userId }),
  ]);
  const ingresos = pedidos.filter(p => p.estado === 'entregado').reduce((acc, p) => acc + p.monto, 0);
  const egresos = costos.reduce((acc, c) => acc + c.monto, 0);
  res.json({ flujoCaja: ingresos - egresos, ingresos, egresos });
});

module.exports = router;
