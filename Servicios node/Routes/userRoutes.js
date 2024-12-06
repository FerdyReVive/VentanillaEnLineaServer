const {Router} = require('express');
const {
    pruebaGet,
    pruebaPost
} = require('../Controller/usuarioController');
const router = Router();
router.get("/Usuario",pruebaGet);
router.post("/Usuario", pruebaPost);
module.exports = router;