const commentTypes = `
    type Comment{
        id: ID!
        comment: String!
        createdAt: String!
        updatedAt: String!
        post: Post!
        user: User!
    }

    input CommentInput {
        comment: String!
        post: Int!
        user: Int!
    }
`;

const commentQueries = `
    commenstByPost(postId: ID!, first: Int, offset: Int): [ Comment! ]!
`;

const commentMutations = `
    createComment(input: CommentInput!): Comment
    updateComment(id: ID!, input: CommentInput!): Comment
    deleteComment(id: ID!): Boolean
`;

export {commentTypes,commentQueries,commentMutations }