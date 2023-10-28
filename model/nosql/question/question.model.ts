import { Schema, model } from "mongoose";
import QuestionInterface from "./question.model.d";

const QuestionSchema = new Schema<QuestionInterface>({
  questions: {
    type: [
      {
        id: {
          type: Number,
          default: -1,
        },
        question: {
          type: String,
          default: "",
        },
      },
    ],
    default: [],
  },
});

const QuestionModel = model<QuestionInterface>("Questions", QuestionSchema);

export default QuestionModel;
