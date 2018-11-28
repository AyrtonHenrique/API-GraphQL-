import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { GraphQLResolveInfo } from "graphql";
import { PostInstance } from "../../../models/PostModel";
import { Transaction } from "sequelize";
import { handleError } from "../../../utils/utils";

export const postResolver = {
    Post:{
        author:(parent, args, {db} : {db: DbConnection},info: GraphQLResolveInfo) => {
            return db.User.findById(parent.get(`author`)).catch(handleError);
        },
        comments:(parent, { first = 10, offset = 0}, {db} : {db: DbConnection},info: GraphQLResolveInfo) => {
            return db.Comment.findAll({
                where: { post: parent.get(`id`)},
                limit: first,
                offset: offset
            }).catch(handleError);
        }
    },

    Query: {
        posts:(parent, { first = 10, offset = 0}, {db} : {db: DbConnection},info: GraphQLResolveInfo) => {
            return db.Post.findAll({
                limit: first,
                offset: offset
            });
        },
        post:(parent, { id}, {db} : {db: DbConnection},info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.Post.findById(id)
               .then((post: PostInstance) => {
                   if (!post) throw new Error(`erro ao buscar posts`);
                   return post;
               }).catch(handleError);
        }
    },

    Mutation: {
        createPost:(parent, {input}, {db} : {db: DbConnection},info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post.create(input,{transaction: t});
            }).catch(handleError);
        },
        updatePost:(parent, {id,input}, {db} : {db: DbConnection},info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post.findById(id)
                    .then((post:PostInstance) => {
                        if(!!post) throw new Error(`erro no update id ${id}`);
                        return post.update(input, {transaction: t});
                    })
                
            }).catch(handleError);
        },
        deletePost:(parent, {id}, {db} : {db: DbConnection},info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Post.findById(id)
                    .then((post:PostInstance) => {
                        if(!!post) throw new Error(`erro no update id ${id}`);
                        return post.destroy({transaction: t})
                            .then( post => post);
                    });
            }).catch(handleError);
        }
    }
}