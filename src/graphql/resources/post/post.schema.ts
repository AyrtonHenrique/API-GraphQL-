const postTypes = `
    type Post {
        id: ID!
        title: String!
        content: String!
        photo: String!
        createdAt: String!
        updatedAt: String!
        author: User!
        commments: [ Comment! ]!
    }

    input PostInput {
        title: String!,
        content: String!
        photo: String!
        #vai mudar para json WEB TOKEN
        author: Int!
    }
`;

const postQuery = `
    post(first: Int, offset: Int):[ Post! ]!
    post(id: ID!): Post
`;

const postMutations = `
    createPost(input: PostInput!) : Post
    updatePost(id: ID!, input: PostInput): Post
    deletePost(id: ID!): Boolean
`;

export { postTypes, postMutations,postQuery}