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
class Vote extends Model {
  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Question)
  @Column
  questionId!: number;

  @Column
  upvote!: boolean;
}

export default Vote;
