const Policial = require("../models/policial");

class PolicialController {

    static  async listar(req,res){
        const status = req.query.s;
        const policiais = await Policial.find();
        res.render('policial/relatorio', { status, policiais });
    }

    static async cadastrar(req,res){
        res.render('policial/cadastrar');
    }

    static async detalhar(req,res)
    {
        const id = req.params.id;
        const policial = await Policial.findById(id);
        if (policial) {
            res.render('policial/detalhar', { policial });
        } else {
            res.status(404).send('Policial não encontrado');
        }
    }
    static async salvarPost (req,res){

        const matricula = parseInt(req.body.matricula);
        const { nome, telefone, patente } = req.body;
        const novoPolicial = new Policial({
            matricula,
            nome,
            telefone,
            patente
        });
        const resultado = await novoPolicial.save();
        if (resultado) {
            res.redirect('/policiais/relatorio?s=1');
        } else {
            let errorMessage = 'Erro ao cadastrar policial.';
            res.status(400).render('policial/cadastrar', { errorMessage });
        }
    }
    static async editar(req,res){
        const id = req.params.id;
        const policial = await Policial.findById(id);
        if (policial) {
            res.render('policial/editar', { policial: policial, editando: true });
        } else {
            res.status(404).send('Policial não encontrado');
        }
    }
    static async atualizar(req,res){
        const id = req.params.id;
        const matricula = parseInt(req.body.matricula);
        const { nome, telefone, patente } = req.body;
        const resultado = await Policial.findByIdAndUpdate(id, {
            matricula,
            nome,
            telefone,
            patente
        });
        if (resultado) {
            res.redirect('/policiais/relatorio');
        } else {
            res.status(500).send('Erro ao atualizar policial');
        }
    }
    static async remover (req,res){
        const id = req.params.id;
        const resultado = await Policial.findByIdAndDelete(id);
        if (resultado) {
            res.redirect('/policiais/relatorio?s=2');
        } else {
            res.status(500).send('Erro ao deletar policial');
        }
    }
}
module.exports = PolicialController;
