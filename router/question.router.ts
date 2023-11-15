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
  getQuestionDetails,
  getAnswers,
  postDownvoteQuestion,
  deleteAnswer,
  deleteQuestion,
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
    url: "/answers",
    preHandler: [signToken],
    handler: getAnswers.handler,
  },

  {
    method: "POST",
    url: "/answer",
    preHandler: [signToken],
    handler: postQuestionAnswers.handler,
  },
  {
    method: "POST",
    url: "/details",
    handler: getQuestionDetails.handler,
  },

  {
    method: "POST",
    url: "/vote",
    preHandler: [signToken],
    handler: postVoteQuestion.handler,
  },
  {
    method: "POST",
    url: "/downvote",
    preHandler: [signToken],
    handler: postDownvoteQuestion.handler,
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
  {
    method: "POST",
    url: "/answer/delete",
    preHandler: [signToken],
    handler: deleteAnswer.handler,
  },
  {
    method: "POST",
    url: "/question/delete",
    preHandler: [signToken],
    handler: deleteQuestion.handler,
  },
];

const questionRouter = (app: FastifyInstance) => {
  router(app, routes, "/question");
};

export { questionRouter };
