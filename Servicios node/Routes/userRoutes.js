const {Router} = require('express');
const validarToken = require('../middleware/validarToken');

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
    pruebaGetExperiencias,
    consultarExperienciasCompletasPorUsuario
} = require('../Controller/experienciaEducativaController');

const {
    pruebaCrearTramite,
    pruebaEditarEstadoTramite,
    pruebaConsultarTramitesPorEstado,
} = require('../Controller/tramiteController');


const router = Router();

router.post("/Usuario", validarToken ,pruebaPost);
router.patch('/usuarios/:idUsuario', validarToken ,pruebaPatch);
router.delete('/usuarios/:idUsuario', validarToken ,pruebaDelete);
router.get('/usuarios/:idUsuario', validarToken, pruebaGetUsuarios);

router.post('/experiencias', pruebaPostExperiencia);
router.patch('/experiencias/:idExperienciaEducativa', validarToken ,pruebaPatchExperiencia);
router.delete('/experiencias/:idExperienciaEducativa', validarToken, pruebaDeleteExperiencia);
router.get('/experiencias', validarToken, pruebaGetExperiencias);
router.get('/experiencias/:idUsuario', validarToken, consultarExperienciasCompletasPorUsuario);

router.post('/tramites', validarToken, pruebaCrearTramite);
router.patch('/tramites/:idTramite', validarToken, pruebaEditarEstadoTramite);
router.get('/tramites/:estado', validarToken, pruebaConsultarTramitesPorEstado,
);

module.exports = router;