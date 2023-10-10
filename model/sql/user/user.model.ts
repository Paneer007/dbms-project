import { Table, Model } from "sequelize-typescript";
import UserCreationAttributes from "./user.model";
interface UserAttributes {
  id: number;
  name: string;
}

@Table
class User extends Model<UserAttributes, UserCreationAttributes> {}

export default User;
