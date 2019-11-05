const express = require('express');
const UserController = require('./controllers/UserController');
const authMiddleware = require('./middlewares/authMiddleware');
const { upload, resize } = require('./middlewares/imageMiddleware');

const routes = express.Router();

routes.post('/register', UserController.create);
routes.post('/login', UserController.login);
routes.get('/logout', UserController.logout);

routes.get('/user/edit', authMiddleware.validateJWT, UserController.show);
routes.put(
  '/user/edit',
  authMiddleware.validateJWT,
  upload.single('photo'),
  resize,
  UserController.update,
);

module.exports = routes;
