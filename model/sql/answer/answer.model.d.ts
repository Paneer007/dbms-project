import { Optional } from "sequelize";

interface AnswerAttributes {
  id: number;
  AnswerText: string; // replace with mongo id
  accepted: boolean;
  voteCount: number;
  create: Date;
}

type AnswerCreationAttributes = Optional<AnswerAttributes, "id">;
export default AnswerCreationAttributes;
