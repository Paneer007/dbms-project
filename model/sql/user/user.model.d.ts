import { Optional } from "sequelize";

interface UserAttributes {
  id: number;
  name: string;
}

type UserCreationAttributes = Optional<UserAttributes, "id">;
export default UserCreationAttributes;
