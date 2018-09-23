"use strict";
exports.__esModule = true;
var graphql_tools_1 = require("graphql-tools");
var users = [
    {
        id: 1,
        name: "ayrton",
        email: "ayrton@live.com"
    }
];
var typeDefs = "\n  type User {\n    id: ID!\n    name: String!\n    email: String!\n  }\n\n  type Query {\n    allUsers: [User!]!\n  }\n\n  type Mutation {\n    createUser(name: String!, email: String!): User\n  }\n";
var resolvers = {
    Query: {
        allUsers: function () { return users; }
    },
    Mutation: {
        createUser: function (parent, args) {
            var newUser = Object.assign({ id: users.length + 1 }, args);
            users.push(newUser);
            return newUser;
        }
    }
};
exports["default"] = graphql_tools_1.makeExecutableSchema({ typeDefs: typeDefs, resolvers: resolvers });
