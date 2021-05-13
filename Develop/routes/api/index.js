const router = require('express').Router();
const statsRoutes = require('./statsRoutes');
const exerciseRoutes = require('./exerciseRoutes');

router.use('/stats', statsRoutes);
router.use('/exercise', exerciseRoutes);

module.exports = router;