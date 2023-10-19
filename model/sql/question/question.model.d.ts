import { Optional } from "sequelize";

interface QuestionAttributes {
  id: number;
  details: string;
  creationTime: Date;
  updateTime: Date;
  status: string;
  viewCount: number;
  voteCount: number;
}

type QuestionCreationAttributes = Optional<QuestionAttributes, "id">;
export default QuestionCreationAttributes;
