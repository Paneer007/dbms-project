import { Optional } from "sequelize";
interface CommentAttributes {
  id: number;
  commentText: string; // replace with mongo id
  creation: Date;
  flagCount: number;
  voteCount: number;
}

type CommentCreationAttributes = Optional<CommentAttributes, "id">;
export default CommentCreationAttributes;
