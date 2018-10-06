import * as  Sequelize from "sequelize";
import { baseModelInterface } from "../interfaces/baseModelInterface";

//esta interface espellha os campos da tabela users no banco de dados.
export interface UserAttributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    photo?: string;
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

//alem de mapear os campos para tabela user
 

