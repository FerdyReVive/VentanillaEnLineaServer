const jwt = require('jsonwebtoken');

const validarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  const tokenNuevo = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

  jwt.verify(tokenNuevo, 'DesarrolloSistemasEnRedUVTeamRocket', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    
    req.user = decoded;
    next();
  });
  
};

module.exports = validarToken;