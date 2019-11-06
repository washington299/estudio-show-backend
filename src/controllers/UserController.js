const bcrypt = require('bcrypt');
const jwt = require('../middlewares/authMiddleware');
const { JWT_ISS, JWT_EXP_TIME } = require('../middlewares/configMiddleware');

const User = require('../models/User');

const create = async (req, res) => {
  let photographer = false;
  let client = false;

  if (req.body.userType === 'photographer') {
    photographer = true;
  } else if (req.body.userType === 'client') {
    client = true;
  } else {
    res.json({ error: 'Identifique o seu tipo de usuário' });
    return;
  }

  const {
    name,
    email,
    password,
    confirmedPassword,
  } = req.body;

  if (password !== confirmedPassword) {
    res.json({ error: 'Suas senhas não estão iguais!!' });
    return;
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.findOne({ email });

  if (!user) {
    await User.create({
      name,
      email,
      password: hash,
      photographer,
      client,
    });

    res.json({ success: 'Usuário criado' });
    return;
  }

  res.json({ error: 'Esse e-mail já existe' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.json({ error: 'Esse usuário não existe' });
    return;
  }

  const pass = await bcrypt.compare(password, user.password);
  if (!pass) {
    res.json({ error: 'Senha incorreta' });
    return;
  }

  const {
    id,
    name,
    photo,
    photo_url,
  } = user;

  const tokenData = {
    iss: JWT_ISS,
    exp: JWT_EXP_TIME,
    sub: id,
    name,
    email,
    photo,
    photo_url,
  };

  const Token = await jwt.generateJWT(tokenData);
  res.json({ jwt: Token });
};

const logout = async (req, res) => {
  const { token } = req.headers;

  const tokens = await jwt.deleteJWT(token);
  res.json(tokens);
};

const show = (req, res) => {
  const { token } = req.headers;

  const data = jwt.decodeJWT(token);

  res.json(data);
};

const update = async (req, res) => {
  const {
    photo,
    name,
    email,
    password,
    confirmedPassword,
  } = req.body;

  if (password !== confirmedPassword) {
    res.json({ error: 'Suas senhas não estão iguais!!' });
    return;
  }

  const newPass = await bcrypt.hash(password, 10);

  const user = await User.findOneAndUpdate({
    email,
  },
  {
    name,
    password: newPass,
    photo,
  },
  {
    new: true,
  });

  if (!user) {
    res.json({ error: 'Esse usuário não existe' });
    return;
  }

  res.json({ success: 'Atualizações feitas com sucesso' });
};

module.exports = {
  create,
  login,
  logout,
  show,
  update,
};
