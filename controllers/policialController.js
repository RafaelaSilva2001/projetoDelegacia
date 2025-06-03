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
        try {
            const policial = await Policial.findById(id);
            res.render('policial/detalhar', { policial });
        } catch (error) {
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
            try {
                await novoPolicial.save();
                res.redirect('/policiais/relatorio?s=1');
            } catch (error) {
                let errorMessage = 'Erro ao cadastrar policial.';
                if (error.name === 'ValidationError') {
                    errorMessage = 'Falha na validação do policial: ' + Object.values(error.errors).map(e => e.message).join(', ');
                } else if (error.code === 11000) {
                    errorMessage = 'Matrícula já cadastrada.';
                }
                res.status(400).render('policial/cadastrar', { errorMessage });
            }
        }
        static async editar(req,res){
            const id = req.params.id;
            try {
                const policial = await Policial.findById(id);
                if (!policial) {
                    return res.status(404).send('Policial não encontrado');
                }
                res.render('policial/editar', { policial: policial, editando: true });
            } catch (error) {
                res.status(500).send('Erro ao buscar policial para edição');
            }
        }
        static async atualizar(req,res){
            const id = req.params.id;
            const matricula = parseInt(req.body.matricula);
            const { nome, telefone, patente } = req.body;
            try {
                await Policial.findByIdAndUpdate(id, {
                    matricula,
                    nome,
                    telefone,
                    patente
                });
                res.redirect('/policiais/relatorio');
            } catch (error) {
                res.status(500).send('Erro ao atualizar policial');
            }
        }
        static async remover (req,res){
            
                const id = req.params.id;
                try {
                    await Policial.findByIdAndDelete(id);
                    res.redirect('/policiais/relatorio?s=2');
                } catch (error) {
                    res.status(500).send('Erro ao deletar policial');
                }
            
        }
    
}
module.exports = PolicialController;
