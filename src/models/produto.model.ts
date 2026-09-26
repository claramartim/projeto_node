import { Model, DataTypes, Optional} from 'sequelize';
import sequelize from '../config/database.js';

export interface IProduto{
    id?: number;
    nome: string;
    preco: number;
}

export interface ProdutoCreationAttributes extends Optional<IProduto, 'id'> {}

class Produto extends Model<IProduto, ProdutoCreationAttributes> implements IProduto{
        declare id: number;
        declare nome: string;
        declare preco: number;
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