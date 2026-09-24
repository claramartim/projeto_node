import Produto from '../models/produto.model.js';

const produtos = [
    new Produto(1, "Notebook", 3500),
    new Produto(2, "Mouse", 120)
];

function listar(filtros: any = {}) {
    let resultado = produtos;

    if(filtros.nome) {
        resultado = resultado.filter(
            p => p.nome.toLowerCase().includes(filtros.nome.toLowerCase())
        );
    }

    return resultado;
}

function buscarPorId(id: any) {
    return produtos.find((p) => p.id === Number(id));
}

function criar(dados: any) {
    if(!dados.nome || dados.preco == null) {
        throw new Error("Nome e preços são obrigatórios.");
    }

    const novoProduto = {
        id: produtos.length ? produtos[produtos.length - 1 ]!.id +  1 : 1,
        nome: dados.nome,
        preco: dados.preco
    };

    produtos.push(novoProduto as any);
    return novoProduto;
}

function atualizarTotal(id: any, dados: any) {
    const index = produtos.findIndex((p) => p.id === Number(id));
    if (index === -1) return null;

    if (!dados.nome || dados.preco == null) {
        throw new Error("PUT exige o envio completo de 'nome' e 'preco'.");
    }

    produtos[index] = {
        id: Number(id),
        nome: dados.nome,
        preco: dados.preco
    } as any;

    return produtos[index];
}

function atualizarParcial(id: any, dados: any) {
    const produto = produtos.find((p) => p.id === Number(id));
    if (!produto) return null;

    if (dados.nome !== undefined) produto.nome = dados.nome;
    if (dados.preco !== undefined) produto.preco = dados.preco;

    return produto;
}

function deletar(id: any) {
    const index = produtos.findIndex((p) => p.id === Number(id));
    if (index === -1) return false;

    produtos.splice(index, 1);
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