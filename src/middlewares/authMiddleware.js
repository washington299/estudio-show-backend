const jwt = require('jsonwebtoken');
const { JWT_ALGORITH } = require('./configMiddleware');

const generateJWT = (payload) => (
  new Promise((resolve) => {
    jwt.sign(payload, process.env.SECRET, { algorithm: JWT_ALGORITH }, (err, token) => {
      if (err) {
        throw new Error('Token inválido!!!!!');
      }

      resolve(token);
    });
  })
);

const validateJWT = (req, res, next) => {
  const { token } = req.headers;

  jwt.verify(token, process.env.SECRET, (err) => {
    if (err) {
      res.json({ error: 'Token inválido!!!!!' });
      return;
    }

    next();
  });
};

const decodeJWT = (token) => {
  const decode = jwt.decode(token);
  if (!decode) {
    return { error: 'Token inválido!' };
  }

  return decode;
};

module.exports = {
  generateJWT,
  validateJWT,
  decodeJWT,
};
