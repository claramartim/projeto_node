import Produto, { IProduto } from '../models/produto.model.js';

export async function listar(filtros: any = {}){
    if(filtros.nome) {
        return await Produto.findAll({
            where: { nome: filtros.nome}
        });
    }
    return await Produto.findAll();
}

export async function buscarPorId(id: any) {
    return await Produto.findByPk(id);
}

export async function criar(dados: IProduto) {
    if (!dados.nome || dados.nome.trim() === '' || dados.preco == null) {
        throw new Error("Nome e preco é obrigatório.");
    }

    return await Produto.create({
        nome: dados.nome,
        preco: dados.preco
    }); 
}

export async function atualizarTotal(id: any, dados: IProduto) {
    const produto = await Produto.findByPk(id);
    if (!produto) return  null;

    if (!dados.nome || dados.nome.trim() === '' || dados.preco == null) {
        throw new Error("PUT exige o envio completo de 'nome' e 'preco'.");
    }

    return await produto.update(dados);
}

export async function atualizarParcial(id: any, dados: Partial<IProduto>) {
    const produto = await Produto.findByPk(id);
    if (!produto) return null;

    if (dados.nome !== undefined) produto.nome = dados.nome;
    if (dados.preco !== undefined) produto.preco = dados.preco;

    return await produto.save();
}

export  async function deletar(id: any) {
    const produto = await Produto.findByPk(id);
    if (!produto) return false;

    await produto.destroy();
    return true;
}

export default {
    listar, 
    buscarPorId,
    criar,
    atualizarParcial,
    atualizarTotal,
    deletar
};  