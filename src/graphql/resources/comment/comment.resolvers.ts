import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { GraphQLResolveInfo } from "graphql";
import { PostInstance } from "../../../models/PostModel";
import { Transaction } from "sequelize";
import { CommentInstance } from "../../../models/CommentModel";
import { handleError } from "../../../utils/utils";

export const commetResolver = {
    Comment:{
        user:(parent, args, {db} : {db: DbConnection},info: GraphQLResolveInfo) => {
            return db.User.findById(parent.get(`user`)).catch(handleError);
        },
        post:(parent, args, {db} : {db: DbConnection},info: GraphQLResolveInfo) => {
            return db.Post.findById(parent.get(`post`));
        }
    },

    Query: {
        commenstByPost:(parent, {postId, first = 10, offset = 0}, {db} : {db: DbConnection},info: GraphQLResolveInfo) => {
            return db.Comment.findAll({
                where: { post : postId},
                limit: first,
                offset: offset
            }).catch(handleError);
        },
        
    },

    Mutation: {
        createComment:(parent, {input}, {db} : {db: DbConnection},info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment.create(input,{transaction: t});
            }).catch(handleError);
        },
        updateComment:(parent, {id,input}, {db} : {db: DbConnection},info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment.findById(id)
                    .then((comment:CommentInstance) => {
                        if(!!comment) throw new Error(`erro no update id ${id}`);
                        return comment.update(input, {transaction: t});
                    })
                
            }).catch(handleError);
        },
        deletePost:(parent, {id}, {db} : {db: DbConnection},info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Comment.findById(id)
                    .then((comment:CommentInstance) => {
                        if(!!comment) throw new Error(`erro no update id ${id}`);
                        return comment.destroy({transaction: t})
                            .then( comment => comment);
                    })
                
            }).catch(handleError);
        }
    }
}