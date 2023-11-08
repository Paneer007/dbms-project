import { Document } from "mongoose";
interface answerInterface {
  id: number;
  questionDetails: string;
}
interface AnswerInterface extends Document {
  answers: string;
}

export default AnswerInterface;
