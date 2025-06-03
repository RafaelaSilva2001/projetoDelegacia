const Ocorrencia = require("../models/ocorrencia");
const Policial = require("../models/policial");
const Vitima = require("../models/vitima");

class OcorrenciaController{

    static async listar(req,res){
        const status = req.query.s;
        const ocorrencias = await Ocorrencia.find().populate('policial', 'nome').populate('vitima', 'nome');
        res.render('ocorrencia/relatorio', { status, ocorrencias });
    }
    static async cadastrar(req,res){
        const policiais = await Policial.find();
        const vitimas = await Vitima.find();
        res.render('ocorrencia/cadastrar', { policiais, vitimas });
    }
    static async salvarOcorrencia(req,res){
            const { tipoCrime, dataHora, localOcorrencia, pontoReferencia, idPolicial, idVitima } = req.body;
            const novaOcorrencia = new Ocorrencia({
                tipoCrime,
                dataHora,
                localOcorrencia,
                pontoReferencia,
                policial: idPolicial,
                vitima: idVitima,
            });
            await novaOcorrencia.save();
            res.redirect('ocorrencias/relatorio?s=1');
        
        
    }
    static async detalhar(req,res){
        const id = req.params.id;
        const ocorrencia = await Ocorrencia.findById(id).populate('policial', 'nome').populate('vitima', 'nome');
        res.render('ocorrencia/detalhar', { ocorrencia });
    }
    static async editar(req,res){
        const id = req.params.id;
        try {
            const policiais = await Policial.find();
            const vitimas = await Vitima.find();
            const ocorrencia = await Ocorrencia.findById(id);
            if (!ocorrencia) {
                return res.status(404).send('Ocorrência não encontrada');
            }
            res.render('ocorrencia/editar', { ocorrencia, policiais, vitimas });
        } catch (error) {
            res.status(500).send('Erro ao buscar ocorrência para edição');
        }
    }
    static async atualizar(req,res){
        const id = req.params.id;
        const { tipoCrime, dataHora, localOcorrencia, pontoReferencia, idPolicial, idVitima } = req.body;
        try {
            await Ocorrencia.findByIdAndUpdate(id, {
                tipoCrime,
                dataHora,
                localOcorrencia,
                pontoReferencia,
                policial: idPolicial,
                vitima: idVitima,
            });
            res.redirect('/ocorrencias/relatorio');
        } catch (error) {
            res.status(500).send('Erro ao atualizar ocorrência');
        }
    }
    static async remover (req,res){
        const id = req.params.id;
        try {
            const ocorrencia = await Ocorrencia.findById(id);
            if (ocorrencia && ocorrencia.vitima) {
                await Vitima.findByIdAndDelete(ocorrencia.vitima);
            }
            await Ocorrencia.findByIdAndDelete(id);
            res.redirect('/ocorrencias/relatorio?s=2');
        } catch (error) {
            res.status(500).send('Erro ao deletar Ocorrência');
        }
    }
}
module.exports = OcorrenciaController;
