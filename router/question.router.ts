import { FastifyInstance, RouteOptions } from "fastify";
import router from "../utils/router";
import signToken from "../middleware/auth";
import { postQuestion } from "../controller/user/user.controller";
import {
  getQuestions,
  patchAnswer,
  patchQuestion,
  postQuestionAnswers,
} from "../controller/question/question.controller";

const routes: RouteOptions[] = [
  {
    method: "GET",
    url: "/",
    //  preHandler: [signToken],
    handler: getQuestions.handler,
  },
  {
    method: "POST",
    url: "/post",
    preHandler: [signToken],
    handler: postQuestion.handler,
  },

  {
    method: "POST",
    url: "/patch",
    preHandler: [signToken],
    handler: patchQuestion.handler,
  },

  {
    method: "PATCH",
    url: "/answer",
    preHandler: [signToken],
    handler: patchAnswer.handler,
  },

  {
    method: "POST",
    url: "/answer",
    preHandler: [signToken],
    handler: postQuestionAnswers.handler,
  },
];

const questionRouter = (app: FastifyInstance) => {
  router(app, routes, "/question");
};

export { questionRouter };
