import { Request, Response } from 'express';
import service from '../services/produto.service.js';

export const listar = (req: Request, res: Response) => {
    const userAgent = req.headers["user-agent"];
    const produtos = service.listar(req.query);

    res.status(200).json(produtos);
};

export const buscarPorId = (req: Request, res: Response) => {
    const produto = service.buscarPorId(req.params.id);

    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado."});
    }

    res.status(200).json(produto);
};

export const criar = (req: Request, res: Response) => {
    try{
        const produto = service.criar(req.body);
        res.status(201).json(produto);
    }catch (error: any) {
        res.status(400).json({ mensagem: error.message });
    }
};

export const atualizarTotal = (req: Request, res: Response) => {
    try{
        const produto = service.atualizarTotal(req.params.id, req.body);
        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado."});
        }
        res.status(200).json(produto);
    }catch (error: any) {
        res.status(400).json({ mensagem: error.message });
    }
};

export const atualizarParcial = (req: Request, res: Response) => {
    try{
        const produto = service.atualizarParcial(req.params.id, req.body);
        if (!produto) {
            return res.status(404).json({ mensagem: "Produto não encontrado."});
        }
        res.status(200).json(produto);
    }catch (error: any) {
        res.status(400).json({ mensagem: error.message });
    }
};

export const deletar = (req: Request, res: Response) => {
    const deletado = service.deletar(req.params.id);

    if (!deletado) {
        return res.status(404).json({ mensagem: "Produto não encontrado."});
    }

    res.status(200).json({ mensagem: "Produto removido com sucesso."});
};