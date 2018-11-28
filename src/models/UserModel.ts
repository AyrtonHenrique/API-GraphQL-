import * as  Sequelize from "sequelize";
import { baseModelInterface } from "../interfaces/baseModelInterface";
import {genSaltSync, hashSync, compareSync } from 'bcryptjs'
import { ModelsInterface } from "../interfaces/ModelsInterface";
//esta interface espellha os campos da tabela users no banco de dados.
export interface UserAttributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
    createdAt?: string;
    updatedAt?: string;
}

// esta interface permite utilizar a instancia do sequelize
//junto com os parametros de User e já atribui a instancia do sequelize
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes{
    //metodo para comparar senhas e obter o token
    isPassword(encodePassword: string, password: string): boolean;
}

//metodo para relizar operacoes com  user(update,insert e etc)
export interface UserModel extends baseModelInterface , Sequelize.Model<UserInstance, UserAttributes> {
}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {
    const User: UserModel = 
        sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }, 
            name: {
                type: DataTypes.STRING(128),
                allowNull:false
            },
            email: {
                type: DataTypes.STRING(128),
                allowNull:false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(128),
                allowNull:false,
                validate: {
                    notEmpty: true
                }
            },
            photo: {
                type: DataTypes.BLOB({
                    length: 'long'
                }),
                allowNull:true,
                defaultValue: null
            }
        }, {
            tableName: 'users',
            hooks: {
                beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
                    const salt = genSaltSync();
                    user.password = hashSync(user.password,salt);
                },
                beforeUpdate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
                    if (user.changed(`password`)) {
                        const salt = genSaltSync();
                        user.password = hashSync(user.password,salt);
                    }
                }
            }
        });

        User.associate = (model: ModelsInterface): void => {};

        User.prototype.isPassword = (encodePassword: string, password: string): boolean => {
            return compareSync(password, encodePassword);
        }
    return User;
}
//alem de mapear os campos para tabela user
 

