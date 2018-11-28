"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postTypes = `
    type Post {
        id: ID!
        title: String!
        content: String!
        photo: String!
        createdAt: String!
        updatedAt: String!
        author: User!
        comments(first: Int, offset:Int): [ Comment! ]!
    }

    input PostInput {
        title: String!,
        content: String!
        photo: String!
        #vai mudar para json WEB TOKEN
        author: Int!
    }
`;
exports.postTypes = postTypes;
const postQuery = `
    posts(first: Int, offset: Int):[ Post! ]!
    post(id: ID!): Post
`;
exports.postQuery = postQuery;
const postMutations = `
    createPost(input: PostInput!) : Post
    updatePost(id: ID!, input: PostInput): Post
    deletePost(id: ID!): Boolean
`;
exports.postMutations = postMutations;
