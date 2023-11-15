import { Table, Column, Model, HasMany } from "sequelize-typescript";
import Question from "../question/question.model";

@Table
class User extends Model {
  @Column
  username!: string;

  @Column
  password!: string;

  @Column
  name!: string;

  @Column
  isAdmin!: boolean;

  @HasMany(() => Question)
  questions!: Question[];
}

export default User;
