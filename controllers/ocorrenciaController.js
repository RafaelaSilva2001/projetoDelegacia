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
        const resultado = await novaOcorrencia.save();
        if (resultado) {
            res.redirect('ocorrencias/relatorio?s=1');
        } else {
            res.status(500).send('Erro ao salvar ocorrência');
        }
    }
    static async detalhar(req,res){
        const id = req.params.id;
        const ocorrencia = await Ocorrencia.findById(id).populate('policial', 'nome').populate('vitima', 'nome');
        res.render('ocorrencia/detalhar', { ocorrencia });
    }
    static async editar(req,res){
        const id = req.params.id;
        let policiais, vitimas, ocorrencia;
        policiais = await Policial.find();
        vitimas = await Vitima.find();
        ocorrencia = await Ocorrencia.findById(id);
        if (!ocorrencia) {
            return res.status(404).send('Ocorrência não encontrada');
        }
        res.render('ocorrencia/editar', { ocorrencia, policiais, vitimas });
    }
    static async atualizar(req,res){
        const id = req.params.id;
        const { tipoCrime, dataHora, localOcorrencia, pontoReferencia, idPolicial, idVitima } = req.body;
        const resultado = await Ocorrencia.findByIdAndUpdate(id, {
            tipoCrime,
            dataHora,
            localOcorrencia,
            pontoReferencia,
            policial: idPolicial,
            vitima: idVitima,
        });
        if (resultado) {
            res.redirect('/ocorrencias/relatorio');
        } else {
            res.status(500).send('Erro ao atualizar ocorrência');
        }
    }
    static async remover (req,res){
        const id = req.params.id;
        const resultado = await Ocorrencia.findByIdAndDelete(id);
        if (resultado) {
            res.redirect('/ocorrencias/relatorio?s=2');
        } else {
            res.status(500).send('Erro ao deletar Ocorrência');
        }
    }
}
module.exports = OcorrenciaController;
