const Vitima = require("../models/vitima");

class VitimaController{
    static async listar (req,res){
        const status = req.query.s;
        const vitimas = await Vitima.find();
        res.render('vitima/relatorio', { status, vitimas });
    }
    static async cadastrar(req,res){
        res.render('vitima/cadastrar');

    }
    static async salvarVitima(req,res){
        try {
            const { nome, cpf, dataNascimento, nomePai, nomeMae, endereco, telefone, grauEscolaridade } = req.body;
            const filiacao = `Pai: ${nomePai}, Mãe: ${nomeMae}`;
            const novaVitima = new Vitima({
                nome,
                cpf,
                dataNascimento,
                filiacao,
                endereco,
                telefone,
                grauEscolaridade
            });
            await novaVitima.save();
            res.redirect('/vitimas/relatorio?s=1');
        } catch (error) {
            res.status(500).send('Erro ao salvar vítima');
        }
    }
    static async detalhar(req,res){
        const id = req.params.id;
        const vitima = await Vitima.findById(id);
        res.render('vitima/detalhar', { vitima });
    }
    static async editar(req,res){
        const id = req.params.id;
        try {
            const vitima = await Vitima.findById(id);
            if (!vitima) {
                return res.status(404).send('Vítima não encontrada');
            }
            res.render('vitima/editar', { vitima });
        } catch (error) {
            res.status(500).send('Erro ao buscar vítima para edição');
        }
    }
    static async atualizar(req,res){
        const id = req.params.id;
        const { nome, cpf, dataNascimento, nomePai, nomeMae, endereco, telefone, grauEscolaridade } = req.body;
        const filiacao = `Pai: ${nomePai}, Mãe: ${nomeMae}`;
        try {
            await Vitima.findByIdAndUpdate(id, {
                nome,
                cpf,
                dataNascimento,
                filiacao,
                endereco,
                telefone,
                grauEscolaridade
            });
            res.redirect('/vitimas/relatorio');
        } catch (error) {
            res.status(500).send('Erro ao atualizar vítima');
        }
    }
    static async remover(req,res){
        const id = req.params.id;
        try {
            await Vitima.findByIdAndDelete(id);
            res.redirect('/vitimas/relatorio?s=2'); 
        } catch (error) {
            res.status(500).send('Erro ao deletar Vitima');
        }

    }
}
module.exports = VitimaController;
