import {
  Table,
  Column,
  Model,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";
import User from "../user/user.model";
import Answer from "../answer/answer.model";
import Vote from "../vote/vote.model";

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

  @HasMany(() => Vote)
  votes!: Vote[];
}

export default Question;
