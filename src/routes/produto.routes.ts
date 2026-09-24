const express = require("express");
const router = express.Router();
const controller = require("../controllers/produto.controller");

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.post("/", controller.criar);
router.put("/:id", controller.atualizarTotal);
router.patch("/:id", controller.atualizarParcial);
router.delete("/:id", controller.deletar);

module.exports = router;