import { Table, Column, Model, ForeignKey } from "sequelize-typescript";
import User from "../user/user.model";
import Question from "../question/question.model";

@Table
class Answer extends Model {
  @Column
  answerText!: string;

  @Column
  accepted!: boolean;

  @Column
  voteCount!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Question)
  @Column
  questionId!: number;
}

export default Answer;
