import { Optional } from "sequelize";

interface AnswerAttributes {
  id: number;
  AnswerText: string; // replace with mongo id
  accepted: boolean;
  voteCount: number;
  create: Date;
  questionId: number;
}

type AnswerCreationAttributes = Optional<AnswerAttributes, "id">;
export default AnswerCreationAttributes;
