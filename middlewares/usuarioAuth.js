function auth (req,res,next){
    if (req.session.usuarioId){
    next();
    } else {
        res.redirect("/usuarios/login");
    }
}

module.exports = auth;