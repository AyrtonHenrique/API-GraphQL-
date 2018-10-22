import * as Sequelize  from "sequelize";
import { baseModelInterface } from "../interfaces/baseModelInterface";
import { ModelsInterface } from "../interfaces/ModelsInterface";

export interface CommentAtrributes {
    id?: number;
    comment?: string;
    post?: number;
    user?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CommentInstance extends  Sequelize.Instance<CommentAtrributes> {}

export interface CommentModel extends baseModelInterface, Sequelize.Model<CommentInstance, CommentAtrributes> {};

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): CommentModel => {
    const Comment: CommentModel = sequelize.define('Comment', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: 'comments'
    });

    Comment.associate = (model: ModelsInterface) : void => {
        Comment.belongsTo(model.Post, {
            foreignKey: {
                allowNull: false,
                field: 'post',
                name: 'post'
            }
        });
        Comment.belongsTo(model.User, {
            foreignKey: {
                allowNull:false,
                field: 'user',
                name: 'user'
            }
        });
    }

    return Comment;
}