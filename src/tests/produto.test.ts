import sequelize from '../config/database.js';
import service from '../services/produto.service.js';
import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('Testes do CRUD de Produtos (Service)', () => {
    let produtoId: number; 

    test('Deve criar um produto com sucesso', async () => {
        const prod = await service.criar({ nome: 'Teclado', preco: 150});
        expect(prod).toHaveProperty('id');
        expect(prod.nome).toBe('Teclado');
        produtoId = prod.id!;
    });

    test('Deve falhar ao criar produto sem nome', async () => {
    await expect(service.criar({ nome: '', preco: 100 })).rejects.toThrow();
  });

  test('Deve listar produtos', async () => {
    const lista = await service.listar();
    expect(lista.length).toBeGreaterThan(0);
  });

  test('Deve filtrar produtos por nome', async () => {
    const lista = await service.listar({ nome: 'Teclado' });
    expect(lista.length).toBeGreaterThan(0);
  });

  test('Deve buscar produto por ID', async () => {
    const prod = await service.buscarPorId(produtoId);
    expect(prod?.id).toBe(produtoId);
  });

  test('Deve atualizar totalmente o produto (PUT)', async () => {
    const prod = await service.atualizarTotal(produtoId, { nome: 'Teclado RGB', preco: 200 });
    expect(prod?.nome).toBe('Teclado RGB');
  });

  test('Deve falhar ao atualizar totalmente sem nome', async () => {
    await expect(service.atualizarTotal(produtoId, { nome: '', preco: 200 })).rejects.toThrow();
  });

  test('Deve retornar null ao atualizar produto inexistente', async () => {
    const prod = await service.atualizarTotal(999, { nome: 'Inexistente', preco: 10 });
    expect(prod).toBeNull();
  });

  test('Deve atualizar parcialmente o produto (PATCH)', async () => {
    const prod = await service.atualizarParcial(produtoId, { preco: 180 });
    expect(prod?.preco).toBe(180);
  });

  test('Deve retornar null ao atualizar parcialmente produto inexistente', async () => {
    const prod = await service.atualizarParcial(999, { preco: 10 });
    expect(prod).toBeNull();
  });

  test('Deve deletar o produto', async () => {
    const deletado = await service.deletar(produtoId);
    expect(deletado).toBe(true);
  });

  test('Deve retornar false ao tentar deletar produto inexistente', async () => {
    const deletado = await service.deletar(999);
    expect(deletado).toBe(false);
  });
});