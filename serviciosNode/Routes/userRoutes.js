const {Router} = require('express');
const {validarTokenUsuario, validarTokenUsuarioGeneral} = require('../middleware/validarToken');

const {
    pruebaGetUsuarios,
    pruebaPost,
    pruebaPatch,
    pruebaDelete,
    validarUsuario,
    obtenerUsuario
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
    pruebaConsultarTramitesPorUsuario,
    pruebaConsultarTramitesPorSecretario,
    pruebaConsultarDocumentosPorTramite
} = require('../Controller/tramiteController');


const router = Router();

router.post("/Usuario", validarTokenUsuario(1) ,pruebaPost);
router.patch('/usuarios/:idUsuario', validarTokenUsuario(1) ,pruebaPatch);
router.patch('/estausuarios/:idUsuario', validarTokenUsuario(1) ,pruebaDelete);
router.get('/usuarios/:idUsuario', validarTokenUsuario(1), pruebaGetUsuarios);
router.post('/validar-usuario', validarUsuario);

router.post('/experiencias', validarTokenUsuario(1), pruebaPostExperiencia);
router.patch('/experiencias/:idExperienciaEducativa', validarTokenUsuario(1) ,pruebaPatchExperiencia);
router.delete('/experiencias/:idExperienciaEducativa', validarTokenUsuario(1), pruebaDeleteExperiencia);
router.get('/experiencias', validarTokenUsuario(1), pruebaGetExperiencias);
router.get('/experiencias/:idUsuario', validarTokenUsuarioGeneral, consultarExperienciasCompletasPorUsuario);

router.post('/tramites', validarTokenUsuario(2), pruebaCrearTramite);
router.patch('/tramites/:idTramite', validarTokenUsuario(1), pruebaEditarEstadoTramite);
router.get('/tramites/:idUsuario', validarTokenUsuario(2), pruebaConsultarTramitesPorUsuario);
router.get('/tramites/secretario/:idSecretarioAsignado', validarTokenUsuario(1), pruebaConsultarTramitesPorSecretario);
router.get('/documentos/:idTramite', validarTokenUsuario(1), pruebaConsultarDocumentosPorTramite);

module.exports = router;