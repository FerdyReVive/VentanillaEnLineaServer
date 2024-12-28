const {Router} = require('express');
const {
    pruebaGetUsuarios,
    pruebaPost,
    pruebaPatch,
    pruebaDelete
} = require('../Controller/usuarioController');

const {
    pruebaPostExperiencia,
    pruebaPatchExperiencia,
    pruebaDeleteExperiencia,
    pruebaGetExperiencias
} = require('../Controller/experienciaEducativaController');

const router = Router();

router.post("/Usuario", pruebaPost);
router.patch('/usuarios/:idUsuario', pruebaPatch);
router.delete('/usuarios/:idUsuario', pruebaDelete);
router.get('/usuarios', pruebaGetUsuarios);
router.post('/experiencias', pruebaPostExperiencia);
router.patch('/experiencias/:idExperienciaEducativa', pruebaPatchExperiencia);
router.delete('/experiencias/:idExperienciaEducativa', pruebaDeleteExperiencia);
router.get('/experiencias', pruebaGetExperiencias);

module.exports = router;