"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
exports.userResolver = {
    User: {
        posts: (parent, { first = 10, offset = 100 }, { db }, info) => {
            return db.Post
                .findAll({
                where: { author: parent.get(`id`) },
                limit: first,
                offset: offset
            }).catch(utils_1.handleError);
        }
    },
    Query: {
        users: (parent, { first = 10, offset = 100 }, { db }, info) => {
            //camada para banco de dados , podendo ser facilmente trocada para mongodb e etc
            return db.User.findAll({
                limit: first,
                offset: offset
            }).catch(utils_1.handleError);
        },
        user: (parent, { id }, { db }, info) => {
            return db.User
                .findById(id)
                .then((user) => {
                if (!user)
                    throw new Error(`Usario não encontrado com o id ${id}`);
                return user;
            }).catch(utils_1.handleError);
        }
    },
    Mutation: {
        createUser: (parent, { input }, { db }, info) => {
            return db.sequelize.transaction((t) => {
                return db.User.create(input, { transaction: t });
            }).catch(utils_1.handleError);
        },
        updateUser: (parent, { id, input }, { db }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.User.
                    findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`erro ao atualizar usuario ${id}`);
                    return user.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        },
        updateUserPassword: (parent, { id, input }, { db }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.User.
                    findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`erro ao atualizar usuario ${id}`);
                    return user.update(input, { transaction: t })
                        .then((user) => !!user);
                });
            }).catch(utils_1.handleError);
        },
        deleteUser: (parent, { id }, { db }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.User.
                    findById(id)
                    .then((user) => {
                    if (!user)
                        throw new Error(`erro ao atualizar usuario ${id}`);
                    return user.destroy({ transaction: t })
                        .then(user => user);
                });
            }).catch(utils_1.handleError);
        }
    }
};
