import { Document } from "mongoose";
interface questionInterface {
  id: number;
  question: string;
}
interface QuestionInterface extends Document {
  questions: [questionInterface];
}

export default QuestionInterface;
