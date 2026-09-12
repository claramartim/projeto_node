const produtos = [ 
    { id: 1, nome: "Notebook", preco: 3500 },
    { id: 2, nome: "Mouse", preco: 120}
];

function listar(filtros = {}) {
    let resultado = produtos;

    if(filtros.nome) {
        resultado = resultado.filter(
            p => p.nome.toLowerCase().includes(filtros.nome.toLowerCase())
        );
    }

    return resultado;
}

function buscarPorId(id) {
    return produtos.find((p) => p.id === Number(id));
}

function criar(dados) {
    if(!dados.nome || dados.preco == null) {
        throw new Error("Nome e preços são obrigatórios.");
    }

    const novoProduto = {
        id: produtos.length ? produtos[produtos.length - 1 ].id +  1 : 1,
        nome: dados.nome,
        preco: dados.preco
    };

    produtos.push(novoProduto);
    return novoProduto;
}

function atualizarTotal(id, dados) {
    const index = produtos.findIndex((p) => p.id === Number(id));
    if (index === -1) return null;

    if (!dados.nome || dados.preco == null) {
        throw new Error("PUT exige o envio completo de 'nome' e 'preco'.");
    }

    produtos[index] = {
        id: Number(id),
        nome: dados.nome,
        preco: dados.preco
    };

    return produtos[index];
}

function atualizarParcial(id, dados) {
    const produto = produtos.find((p) => p.id === Number(id));
    if (!produto) return null;

    if (dados.nome !== undefined) produto.nome = dados.nome;
    if (dados.preco !== undefined) produto.preco = dados.preco;

    return produto;
}

function deletar(id) {
    const index = produtos.findIndex((p) => p.id === Number(id));
    if (index === -1) return false;

    produtos.splice(index, 1);
    return true;
}

module.exports = {
    listar, 
    buscarPorId,
    criar,
    atualizarParcial,
    atualizarTotal,
    deletar
};  