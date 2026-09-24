const express = require("express");
const produtoRoutes = require("./src/routes/produto.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API funcionando!");
});

app.use("/produtos", produtoRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});