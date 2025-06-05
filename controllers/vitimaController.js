const Vitima = require("../models/vitima");
const Ocorrencia = require("../models/ocorrencia");

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
        const resultado = await novaVitima.save();
        if (resultado) {
            res.redirect('/vitimas/relatorio?s=1');
        } else {
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
        const vitima = await Vitima.findById(id);
        if (vitima) {
            res.render('vitima/editar', { vitima });
        } else {
            res.status(404).send('Vítima não encontrada');
        }
    }
    static async atualizar(req,res){
        const id = req.params.id;
        const { nome, cpf, dataNascimento, nomePai, nomeMae, endereco, telefone, grauEscolaridade } = req.body;
        const filiacao = `Pai: ${nomePai}, Mãe: ${nomeMae}`;
        const resultado = await Vitima.findByIdAndUpdate(id, {
            nome,
            cpf,
            dataNascimento,
            filiacao,
            endereco,
            telefone,
            grauEscolaridade
        });
        if (resultado) {
            res.redirect('/vitimas/relatorio');
        } else {
            res.status(500).send('Erro ao atualizar vítima');
        }
    }
    static async remover(req,res){
        const id = req.params.id;
        const resultadoOcorrencia = await Ocorrencia.deleteOne({ vitima: id });
        const resultadoVitima = await Vitima.findByIdAndDelete(id);
        if (resultadoOcorrencia && resultadoVitima) {
            res.redirect('/vitimas/relatorio?s=2');
        } else {
            res.status(500).send('Erro ao deletar Vítima');
        }
    }
}
module.exports = VitimaController;
