import QuestionModel from "../../model/sql/question/question.model";
const getQuestions = {
  handler: async (req: any, res: any) => {
    try {
      const question = await QuestionModel.findAll({});
      if (!question) {
        return res.status(400).send({
          message: "Question doesn't exist",
        });
      }

      return res.code(200).send({
        questions: question.map((x) => {
          return {
            details: x.details,
            status: x.status,
            view_count: x.viewCount,
            vote_count: x.voteCount,
          };
        }),
      });
    } catch {
      return res.code(400);
    }
  },
};

const postQuestion = {
  handler: async (req: any, res: any) => {
    try {
      const body = req.body;
      const question = body.question;
      if (body.size() == 0) {
        return res.status(401).send("Error in fetching parameters");
      }
      if (!question) {
        return res.status(401).send("Error in fetching questions");
      }
      // create Question object with the details needed
      return res.status(200).send(question);
    } catch {
      return res.status(500).send({
        message: "Error while posting question",
      });
    }
  },
};

const postQuestionAnswers = {
  handler: async (req: any, res: any) => {
    try {
      const body = req.body;
      const answer = body.answer;
      const q_id = body.questionId;
      // code the rest of the route lamo
      return res.status(200).send("Answer created");
    } catch {
      return res.status(500).send({
        message: "Error while obtain the answers for a question",
      });
    }
  },
};

const patchQuestion = {
  handler: async (req: any, res: any) => {
    try {
      const body = req.body;
      const answer = body.answer;
      const q_id = body.questionId;
      const question = await QuestionModel.findOne({
        where: {
          id: q_id,
        },
      });
      if (!question) {
        return res.status(400).send({
          message: "Question doesn't exist",
        });
      }
      question.answers = answer;
      return res.code(200).send("Updated");
    } catch {
      return res.code(400);
    }
  },
};

const patchAnswer = {
  handler: async (req: any, res: any) => {
    try {
      const body = req.body;
      const answer = body.answer;
      const answer_id = body.questionId;
      // code the rest of the route lamo
      return res.status(200).send("Answer created");
    } catch {
      return res.status(500).send({
        message: "Error while obtain the answers for a question",
      });
    }
  },
};

export {
  getQuestions,
  postQuestion,
  postQuestionAnswers,
  patchQuestion,
  patchAnswer,
};
