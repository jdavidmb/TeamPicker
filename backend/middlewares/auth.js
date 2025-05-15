// backend/middlewares/auth.js
module.exports = function(req, res, next) {
  const clave = req.headers['x-clave-admin'];
  if (clave !== process.env.CLAVE_ADMIN) {
    return res.status(403).json({ error: 'Acceso denegado' });
  }
  next();
};