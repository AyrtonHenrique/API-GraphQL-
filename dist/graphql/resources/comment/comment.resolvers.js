"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../utils/utils");
exports.commetResolver = {
    Comment: {
        user: (parent, args, { db }, info) => {
            return db.User.findById(parent.get(`user`)).catch(utils_1.handleError);
        },
        post: (parent, args, { db }, info) => {
            return db.Post.findById(parent.get(`post`));
        }
    },
    Query: {
        commenstByPost: (parent, { postId, first = 10, offset = 0 }, { db }, info) => {
            return db.Comment.findAll({
                where: { post: postId },
                limit: first,
                offset: offset
            }).catch(utils_1.handleError);
        },
    },
    Mutation: {
        createComment: (parent, { input }, { db }, info) => {
            return db.sequelize.transaction((t) => {
                return db.Comment.create(input, { transaction: t });
            }).catch(utils_1.handleError);
        },
        updateComment: (parent, { id, input }, { db }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Comment.findById(id)
                    .then((comment) => {
                    if (!!comment)
                        throw new Error(`erro no update id ${id}`);
                    return comment.update(input, { transaction: t });
                });
            }).catch(utils_1.handleError);
        },
        deletePost: (parent, { id }, { db }, info) => {
            id = parseInt(id);
            return db.sequelize.transaction((t) => {
                return db.Comment.findById(id)
                    .then((comment) => {
                    if (!!comment)
                        throw new Error(`erro no update id ${id}`);
                    return comment.destroy({ transaction: t })
                        .then(comment => comment);
                });
            }).catch(utils_1.handleError);
        }
    }
};
