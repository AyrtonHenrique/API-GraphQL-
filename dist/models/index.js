"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV.trim() || 'development';
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
//setup instancia de banco de dados 
let db = null;
if (!db) {
    db = {};
    const operatorAliases = false;
    config = Object.assign({ operatorAliases }, config);
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    fs.readdirSync(__dirname)
        .filter((file) => ((file.indexOf(".") !== 0) && (file != basename) && (file.slice(-3)) === '.js'))
        .forEach((file) => {
        //importa models  e adiciona no db;
        const model = sequelize.import(path.join(__dirname, file));
        db[model['name']] = model;
    });
    //setando associate as classes disponiveis no db
    Object.keys(db).forEach((modelName) => {
        db[modelName].associate && db[modelName].associate(db);
    });
    //set instancia do sequelize;
    db['sequelize'] = sequelize;
}
exports.default = db;
