import { Schema, model } from "mongoose";
import QuestionInterface from "./question.model.d";

const QuestionSchema = new Schema<QuestionInterface>({
  questions: {
    type: String,
  },
  topic: {
    type: String,
  },
});

const QuestionModel = model<QuestionInterface>("Questions", QuestionSchema);

export default QuestionModel;
