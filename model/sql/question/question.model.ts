import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import User from "../user/user.model";
import Answer from "../answer/answer.model";

@Table
class Question extends Model {
  @Column
  details!: string;

  @Column
  status!: string;

  @Column
  viewCount!: number;

  @Column
  voteCount!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @HasMany(() => Answer)
  answers!: Answer[];
}

export default Question;
