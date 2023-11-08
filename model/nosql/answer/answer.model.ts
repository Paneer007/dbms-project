import { Schema, model } from "mongoose";
import AnswerInterface from "./answer.model.d";

const AnswerSchema = new Schema<AnswerInterface>({
  answers: {
    type: String,
  },
});

const AnswerModel = model<AnswerInterface>("Answer", AnswerSchema);

export default AnswerModel;
