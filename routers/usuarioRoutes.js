const express = require("express");
const routes = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/usuarioAuth");
const UsuarioController = require("../controllers/usuarioController");


routes.get("/relatorio", auth, usuarioController.listar);
routes.get('/cadastrar', usuarioController.cadastrar);
routes.get('/detalhar/:id', auth, usuarioController.detalhar);
routes.get('/editar/:id', auth, usuarioController.editar);
routes.post('/atualizar/:id', auth, usuarioController.atualizar);
routes.post('/', usuarioController.salvarPost);
routes.post('/:id/remover',auth, usuarioController.remover);
routes.get('/login', usuarioController.loginForm);
routes.post('/login', usuarioController.login);
routes.get('/logout',UsuarioController.logout);

module.exports = routes;
