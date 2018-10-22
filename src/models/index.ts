import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { DbConnection } from '../interfaces/DbConnectionInterface';

const basename: string  = path.basename(module.filename);
const env : string = process.env.NODE_ENV.trim() || 'development';
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];


//setup instancia de banco de dados 
let db = null;
    if (!db){
        db = {};

        const operatorAliases = false;

        config = Object.assign({operatorAliases},config);

        const sequelize : Sequelize.Sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config
        );

        fs.readdirSync(__dirname)
        .filter((file: string) =>( (file.indexOf(".") !== 0 ) && (file != basename) && (file.slice(-3)) === '.js') )
        .forEach((file: string) => {
            //importa models  e adiciona no db;
            const model = sequelize.import(path.join(__dirname, file));
            db[model['name']] = model;
        })

        //setando associate as classes disponiveis no db
        Object.keys(db).forEach((modelName: string) => {
            db[modelName].associate && db[modelName].associate(db);
        });

        //set instancia do sequelize;
        db['sequelize'] = sequelize;
    }

 export default <DbConnection>db;