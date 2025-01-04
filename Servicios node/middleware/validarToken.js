const jwt = require('jsonwebtoken');

const validarTokenUsuario = (tipoRol) => (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
      return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'DesarrolloSistemasEnRedUVTeamRocket', (err, decoded) => {
      if (err) {
          return res.status(403).json({ message: 'Token no válido' });
      }

      if (decoded.idTipoUsuario !== tipoRol) {
          return res.status(403).json({ message: `El usuario con ID ${decoded.idUsuario} no tiene permiso para acceder a este recurso` });
      }

      req.user = decoded;
      next();
  });
};

const validarTokenUsuarioGeneral = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
      return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'DesarrolloSistemasEnRedUVTeamRocket', (err, decoded) => {
      if (err) {
          return res.status(403).json({ message: 'Token no válido' });
      }
      
      req.user = decoded;
      next();
  });
};

module.exports = {validarTokenUsuario, validarTokenUsuarioGeneral};