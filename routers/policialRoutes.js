const express = require("express");
const routes = express.Router();
const policialController = require("../controllers/policialController");
const auth = require("../middlewares/usuarioAuth");
routes.get("/relatorio",auth, policialController.listar);
routes.get('/cadastrar',auth, policialController.cadastrar);
routes.get('/detalhar/:id',auth, policialController.detalhar);
routes.get('/editar/:id',auth, policialController.editar); 
routes.post('/atualizar/:id',auth, policialController.atualizar); 
routes.post('/:id/remover',auth, policialController.remover);
routes.post('/',auth, policialController.salvarPost);


module.exports = routes;