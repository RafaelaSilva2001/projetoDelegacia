const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const mongoose = require("mongoose");
require('dotenv/config');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

const policialRoutes = require('./routers/policialRoutes');
const vitimaRoutes = require('./routers/vitimaRoutes');
const ocorrenciaRoutes = require('./routers/ocorrenciaRoutes');
const { detalhar } = require('./controllers/policialController');
const usuarioRoutes = require('./routers/usuarioRoutes');
const session = require("express-session");

app.use(session({
  secret : 'ifpe',
  saveUninitialized: false,
  resave: false
}));
 

app.get("/", async function (req, res) {
  if (req.session && req.session.usuarioId) {
    const pessoa = {
      nome: "João",
      curso: "Computação"
    };
    res.render("index", { pessoa });
  } else {
    res.redirect('/usuarios/login');
  }
});
app.use("/policiais",policialRoutes);
app.use("/",vitimaRoutes);
app.use("/",ocorrenciaRoutes);
app.use("/usuarios",usuarioRoutes);

app.listen(process.env.PORT, function () {
  console.log('Rodando....');
});
