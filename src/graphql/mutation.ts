import { userMutation } from "./resources/user/user.schema";
import { postMutations } from "./resources/post/post.schema";
import { commentMutations } from "./resources/comment/comment.schema";
const Mutation = `
    type Mutation {
        ${userMutation}
        ${postMutations}
        ${commentMutations}
    }
`;
export { Mutation };