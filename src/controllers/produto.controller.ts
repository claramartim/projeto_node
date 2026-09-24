const service = require("../services/produto.service");

exports.listar = (req, res) => {
    const userAgent = req.headers["user-agent"];
    const produtos = service.listar(req.query);

    res.status(200).json(produtos);
};

exports.buscarPorId = (req, res) => {
    const produto = service.buscarPorId(req.params.id);

    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado."});
    }

    res.status(200).json(produto);
};

exports.criar = (req, res) => {
    try{
        const produto = service.criar(req.body);
        res.status(201).json(produto);
    }catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
};

exports.atualizarTotal = (req, res) => {
    try{
        const produto = service.atualizarTotal(req.params.id, req.body);
        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado."});
        }
        res.status(200).json(produto);
    }catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
};

exports.atualizarParcial = (req, res) => {
    try{
        const produto = service.atualizarParcial(req.params.id, req.body);
        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado."});
        }
        res.status(200).json(produto);
    }catch (error) {
        res.status(400).json({ mensagem: error.message });
    }
};

exports.deletar = (req, res) => {
    const deletado = service.deletar(req.params.id);

    if (!deletado) {
        return res.status(404).json({ mensagem: "Produto não encontrado."});
    }

    res.status(200).json({ mensagem: "Produto removido com sucesso."});
};