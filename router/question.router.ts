import { FastifyInstance, RouteOptions } from "fastify";
import router from "../utils/router";
import signToken from "../middleware/auth";
import {
  getAllUserQuestions,
  getQuestions,
  getSpecificQuestion,
  patchAnswer,
  patchQuestion,
  postQuestion,
  postQuestionAnswers,
  postVoteQuestion,
} from "../controller/question/question.controller";

const routes: RouteOptions[] = [
  {
    method: "GET",
    url: "/user",
    preHandler: [signToken],
    handler: getAllUserQuestions.handler,
  },

  {
    method: "GET",
    url: "/",
    //  preHandler: [signToken],
    handler: getQuestions.handler,
  },

  {
    method: "GET",
    url: "/:questionid",
    //  preHandler: [signToken],
    handler: getSpecificQuestion.handler,
  },

  {
    method: "POST",
    url: "/post",
    preHandler: [signToken],
    handler: postQuestion.handler,
  },

  {
    method: "POST",
    url: "/answer",
    preHandler: [signToken],
    handler: postQuestionAnswers.handler,
  },

  {
    method: "POST",
    url: "/vote",
    preHandler: [signToken],
    handler: postVoteQuestion.handler,
  },

  {
    method: "PATCH",
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
];

const questionRouter = (app: FastifyInstance) => {
  router(app, routes, "/question");
};

export { questionRouter };
