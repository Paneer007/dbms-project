import { Document } from "mongoose";
interface questionInterface {
  id: number;
  questionDetails: string;
}
interface QuestionInterface extends Document {
  questions: string;
  topic: string;
}

export default QuestionInterface;
