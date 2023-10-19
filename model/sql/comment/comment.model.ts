import { Table, Model } from "sequelize-typescript";
import CommentCreationAttributes from "./comment.model";
interface CommentAttributes {
  id: number;
  commentText: string; // replace with mongo id
  creation: Date;
  flagCount: number;
  voteCount: number;
}

@Table
class Comment extends Model<CommentAttributes, CommentCreationAttributes> {}

export default Comment;
