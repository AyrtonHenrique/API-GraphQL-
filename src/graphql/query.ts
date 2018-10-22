import { userQueries } from "./resources/user/user.schema";
import { postQuery } from "./resources/post/post.schema";
import { commentQueries } from "./resources/comment/comment.schema";

const Query = `
    type Query {
        ${userQueries}
        ${postQuery}
        ${commentQueries}
    }
`;
export { Query } 