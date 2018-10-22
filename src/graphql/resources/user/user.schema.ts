const userTypes = `

    # User definition type
    type User {
        id: ID!
        name: String!
        email:String!
        photo: String
        createdAt: String!
        updatedAt:String!
    }

    input UserCreateInput {
        name: String!
        email: String!
        password: String!
    }

    input UserUpdateInput {
        name:String!
        email: String!
        photo: String!
    }

    input UserUpdatePasswordInput {
        password:String!
    }
`;

const userQueries = `
    users(first: Int, offset:Int): [ User! ]!
    user(id: ID!): User
`;

const userMutation =`
    createuser(input: UserCreateInput!): User
    updateUser(id: ID!, input: UserUpdateInput!):User
    updateUserpassword(id: ID!, input: UserUpdatePasswordInput!): Boolean
    deleteUser(id: ID!): Boolean
`;

export { userTypes, userQueries, userMutation }