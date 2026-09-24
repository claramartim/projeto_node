import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

export interface IProduto{
    id: number;
    nome: string;
    preco: number;
}

class Produto extends Model<IProduto> implements IProduto{
        public id!: number;
        public nome!: string;
        public preco!: number;
    }

Produto.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
        nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
        preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
},
  {
    sequelize,
    tableName: 'produtos',
    timestamps: false,
  }
);
export default Produto;