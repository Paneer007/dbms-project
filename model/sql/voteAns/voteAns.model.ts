import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import User from "../user/user.model";
import Answer from "../answer/answer.model";
import Question from "../question/question.model";

@Table
class VoteAns extends Model {
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Question)
  @Column
  answerId!: number;

  @Column
  upvote!: boolean;

  @Column
  downvote!: boolean;
}

export default VoteAns;
