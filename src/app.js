const express = require("express");
const app   = express();

app.use(express.json());

const produtos = [
    { id: 1, nome: "Notebook", preco: 3500 },
    { id: 2, nome: "Mouse", preco: 120 }
];

app.get("/produtos", (req ,res) => {
    return res.status(200).json(produtos);
});

app.get("/produtos/id", (req, res) => {
    const { id } = req.params;
    const produto = produtos.find((p) => p.id === number(id));

    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado" });
    }

    return res.status(200).json(produto);
});

app.post("/produtos", (req, res) => {
    const { nome, preco } = req.body;

    const novoProduto = {
        id: produtos.length + 1,
        nome,
        preco
    };

    produtos.push(novoProduto);
    return res.status(201).json(novoProduto);
});