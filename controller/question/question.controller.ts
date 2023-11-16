import questionModel from "../../model/sql/question/question.model";
import answerModel from "../../model/sql/answer/answer.model";
import voteModel from "../../model/sql/vote/vote.model";
import VoteAns from "../../model/sql/voteAns/voteAns.model";
import userModel from "../../model/sql/user/user.model";
import QuestionModel from "../../model/nosql/question/question.model";
import AnswerModel from "../../model/nosql/answer/answer.model";
import { error } from "console";
import User from "../../model/sql/user/user.model";
import { async } from "rxjs";
const getDetails = async (x: any) => {
  const questionDetail = await QuestionModel.findById(x);
  return questionDetail;
};

const getAnswers = {
  handler: async (req: any, res: any) => {
    try {
      let id = req.body.id;
      console.log(id);
      const answers = await answerModel.findAll({
        where: {
          questionId: id,
        },
      });
      let result = [];
      for (let i of answers) {
        console.log(i.answerText);
        let details = await AnswerModel.findOne({ _id: i.answerText });
        const userDetails = await User.findOne({
          where: {
            id: i.userId,
          },
        });
        //@ts-ignore
        let data = {
          answer: details,
          //@ts-ignore
          user: userDetails["username"],
          answerDetails: i,
        };
        result.push(data);
      }
      return res.code(200).send({
        questions: result,
      });
    } catch {
      return res.code(400);
    }
  },
};
const getQuestionDetails = {
  handler: async (req: any, res: any) => {
    try {
      let id = req.body.id;
      console.log(id);
      const question = await questionModel.findOne({
        where: {
          id: id,
        },
      });
      const user = await userModel.findOne({
        where: {
          id: question?.userId,
        },
      });
      const details = await QuestionModel.findOne({ _id: question?.details });
      return res.code(200).send({
        questions: details,
        misc: question,
        user: user,
      });
    } catch {
      return res.code(400);
    }
  },
};
const getQuestions = {
  handler: async (req: any, res: any) => {
    try {
      console.log("here");
      const question = await questionModel.findAll({});
      if (!question) {
        return res.status(400).send({
          message: "Question doesn't exist",
        });
      }

      const questionDetail = await QuestionModel.findById(question[0].details);
      console.log(questionDetail);
      //@ts-ignore
      const mapElem = {};
      let mapElem2 = {};
      let mapElem3 = {};
      for (let i = 0; i < question.length; i++) {
        const questionDetail = await QuestionModel.findById(
          question[i].details
        );
        //@ts-ignore
        mapElem[i] = questionDetail["questions"];
        //@ts-ignore
        mapElem3[i] = questionDetail["topic"];
      }
      for (let i = 0; i < question.length; i++) {
        const userDetails = await User.findOne({
          where: {
            id: question[i].userId,
          },
        });
        //@ts-ignore
        //@ts-ignore
        mapElem2[i] = userDetails["username"];
      }
      console.log("done");
      const questions = question.map((x, idx) => {
        return {
          id: x.id,
          //@ts-ignore
          details: mapElem[idx],
          status: x.status,
          view_count: x.viewCount,
          vote_count: x.voteCount,
          //@ts-ignore
          user_id: mapElem2[idx],
          //@ts-ignore
          topic: mapElem3[idx],
        };
      });
      return res.code(200).send({
        questions: questions,
      });
    } catch {
      return res.code(400);
    }
  },
};

const patchContent = {
  handler: async (req: any, res: any) => {
    try {
      const body = req.body;
      const answerText = body.answerText;
      const userId = req.currentUserId;
      const q_id = body.questionId;
      console.log(q_id);
      const questionAnswer = new AnswerModel({ answers: answerText });
      await questionAnswer.save();
      await answerModel.create({
        answerText: questionAnswer.id,
        accepted: false,
        voteCount: 0,
        userId: userId,
        questionId: q_id,
      });

      return res.status(200).send("Answer created");
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Error while obtain the answers for a question",
      });
    }
  },
};

const postQuestion = {
  handler: async (req: any, res: any) => {
    try {
      const body = req.body;
      const questionDetails = body.questionDetails;
      const topic = body.topic;
      if (!questionDetails) {
        return res.status(401).send("Error in fetching parameters");
      }

      const nosqlQuestion = new QuestionModel({
        questions: questionDetails,
        topic: topic,
      });
      nosqlQuestion.save();

      await questionModel.create({
        details: nosqlQuestion.id,
        viewCount: 0,
        status: "open",
        voteCount: 0,
        userId: req.currentUserId ? req.currentUserId : 0,
      });

      // create Question object with the details needed
      return res.status(200).send("Question created");
    } catch (e) {
      console.log(e);
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
      const answerText = body.answerText;
      const userId = req.currentUserId;
      const q_id = body.questionId;
      console.log(q_id);
      const questionAnswer = new AnswerModel({ answers: answerText });
      await questionAnswer.save();
      await answerModel.create({
        answerText: questionAnswer.id,
        accepted: false,
        voteCount: 0,
        userId: userId,
        questionId: q_id,
      });

      return res.status(200).send("Answer created");
    } catch (error) {
      console.log(error);
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
      const user_id = req.currentUserId;
      const details = body.details;
      const q_id = body.questionId;
      if (!q_id && !details) {
        return res.status(200).send("enter valid body");
      }
      const question = await questionModel.findOne({
        where: {
          id: q_id,
          userId: user_id,
        },
      });

      if (!question) {
        return res.status(400).send({
          message: "Question doesn't exist",
        });
      }

      const x = question.details;
      const questionDetail = await QuestionModel.findOne({ id: x });
      if (!questionDetail) {
        return res.status(500).send({
          message: "Error while obtain the answers for a question",
        });
      }
      questionDetail.questions = details;
      await questionDetail.save();

      return res.code(200).send("Updated");
    } catch {
      return res.code(500).send("internal server error");
    }
  },
};

const postVoteQuestion = {
  handler: async (req: any, res: any) => {
    try {
      console.log("no");
      const body = req.body;
      const q_id = body.questionId;
      if (!q_id) {
        return res.status(400).send("enter a question id");
      }
      const question = await questionModel.findOne({
        where: {
          id: q_id,
        },
      });
      if (!question) {
        return res.status(400).send("Question is not found");
      }
      const vote = await voteModel.findOne({
        where: {
          userId: req.currentUserId,
          questionId: q_id,
        },
      });

      if (!vote) {
        const vote = await voteModel.create({
          userId: req.currentUserId,
          questionId: q_id,
          upvote: true,
        });
        question.voteCount += 1;
        await question.save();
        return res.status(200).send("upvoted");
      }

      if (vote.upvote) {
        return res.status(401).send("Already voted");
      }

      vote.upvote = true;
      await vote.save();

      question.voteCount += 1;
      await question.save();
      return res.status(200).send("upvoted");
    } catch (e) {
      return res.status(500).send("Internal server error");
    }
  },
};

const postDownvoteQuestion = {
  handler: async (req: any, res: any) => {
    try {
      console.log("no");
      const body = req.body;
      const q_id = body.questionId;
      if (!q_id) {
        return res.status(400).send("enter a question id");
      }
      const question = await questionModel.findOne({
        where: {
          id: q_id,
        },
      });
      if (!question) {
        return res.status(400).send("Question is not found");
      }
      const vote = await voteModel.findOne({
        where: {
          userId: req.currentUserId,
          questionId: q_id,
        },
      });

      if (!vote) {
        const vote = await voteModel.create({
          userId: req.currentUserId,
          questionId: q_id,
          upvote: false,
        });
        question.voteCount -= 1;
        await question.save();
        return res.status(200).send("upvoted");
      }

      if (!vote.upvote) {
        return res.status(401).send("Already down voted");
      }

      vote.upvote = false;
      await vote.save();

      question.voteCount -= 1;
      await question.save();
      return res.status(200).send("upvoted");
    } catch (e) {
      return res.status(500).send("Internal server error");
    }
  },
};

const deleteAnswer = {
  handler: async (req: any, res: any) => {
    try {
      console.log("jklfshlfjsk 5127890");
      const body = req.body;
      const answer_id = body.answerId;
      const user_id = req.currentUserId;
      if (!answer_id) {
        return res.status(200).send("enter valid body");
      }
      const answer = await answerModel.findOne({
        where: {
          id: answer_id,
          userId: user_id,
        },
      });
      if (!answer) {
        return res.status(400).send({
          message: "answer doesn't exist",
        });
      }
      if (answer.userId != user_id) {
        return res.status(400).send({
          message: "wrong user ",
        });
      }
      await AnswerModel.findByIdAndDelete(answer.answerText);
      await answerModel.destroy({
        where: {
          id: answer_id,
        },
      });
      // code the rest of the route lamo
      return res.status(200).send("Answer updated");
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: "Error while obtain the answers for a question",
      });
    }
  },
};

const deleteQuestion = {
  handler: async (req: any, res: any) => {
    try {
      const body = req.body;
      const questionId = body.questionId;
      const user_id = req.currentUserId;

      const questionDetails = await questionModel.findOne({
        where: { id: questionId },
      });

      if (!questionDetails) {
        return res.status(401).send("Enter valid question id");
      }

      if (questionDetails.userId != user_id) {
        return res.status(401).send("Cope");
      }

      await answerModel.destroy({
        where: {
          questionId: questionId,
        },
      });

      await questionModel.destroy({
        where: {
          id: questionId,
        },
      });

      return res.status(200).send("Answer updated");
    } catch (err) {
      return res.status(500).send({
        message: "Error while obtain the answers for a question",
      });
    }
  },
};

const patchAnswer = {
  handler: async (req: any, res: any) => {
    try {
      const body = req.body;
      const answer_id = body.answerId;
      const user_id = req.currentUserId;
      const details = body.details;

      if (!answer_id && !details) {
        return res.status(200).send("enter valid body");
      }

      const answer = await answerModel.findOne({
        where: {
          id: answer_id,
          userId: user_id,
        },
      });
      if (!answer) {
        return res.status(400).send({
          message: "answer doesn't exist",
        });
      }

      if (answer.userId != user_id) {
        return res.status(400).send({
          message: "wrong user ",
        });
      }

      const answerDetail = await AnswerModel.findById(answer.answerText);

      console.log("djkfsdkhdfjk", answerDetail);

      if (!answerDetail) {
        return res.status(500).send("Internal server error");
      }

      answerDetail.answers = details;
      await answerDetail.save();

      // code the rest of the route lamo
      return res.status(200).send("Answer updated");
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: "Error while obtain the answers for a question",
      });
    }
  },
};

const upVoteAnswer = {
  handler: async (req: any, res: any) => {
    try {
      const body = req.body;
      const answer_id = body.answerId;
      const user_id = req.currentUserId;

      if (!answer_id) {
        return res.status(200).send("enter valid body");
      }

      const answer = await answerModel.findOne({
        where: {
          id: answer_id,
        },
      });

      if (!answer) {
        return res.status(400).send({
          message: "answer doesn't exist",
        });
      }

      // if (answer.userId != user_id) {
      //   return res.status(400).send({
      //     message: "wrong user ",
      //   });
      // }
      const vote = await VoteAns.findOne({
        where: {
          userId: req.currentUserId,
          answerId: answer_id,
        },
      });
      if (!vote) {
        const vote = await VoteAns.create({
          userId: req.currentUserId,
          answerId: answer_id,
          upvote: true,
          downvote: false,
        });
        answer.set({
          voteCount: answer.voteCount + 1,
        });
        const update = await vote.save();
        const updated = await answer.save();
        if (updated) {
          return res.status(200).send("Answer updated");
        } else {
          return res.status(500).send({
            message: "Error while obtain the answers for a question",
          });
        }
      }

      if (vote.upvote) {
        return res.status(200).send("Already voted");
      }
      answer.set({
        voteCount: answer.voteCount + 1,
      });
      vote.set({ upvote: true, downvote: false });
      const update = vote.save();
      const updated = await answer.save();
      if (!updated || !update) {
        return res.code(500).send({ message: "Error while updating vote" });
      }

      return res.status(200).send("Answer updated");
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: "Error while obtain the answers for a question",
      });
    }
  },
};

const DownVoteAnswer = {
  handler: async (req: any, res: any) => {
    try {
      const body = req.body;
      const answer_id = body.answerId;
      const user_id = req.currentUserId;

      if (!answer_id) {
        return res.status(200).send("enter valid body");
      }

      const answer = await answerModel.findOne({
        where: {
          id: answer_id,
        },
      });

      if (!answer) {
        return res.status(400).send({
          message: "answer doesn't exist",
        });
      }

      // if (answer.userId != user_id) {
      //   return res.status(400).send({
      //     message: "wrong user ",
      //   });
      // }
      const vote = await VoteAns.findOne({
        where: {
          userId: req.currentUserId,
          answerId: answer_id,
        },
      });
      if (!vote) {
        const vote = await VoteAns.create({
          userId: req.currentUserId,
          answerId: answer_id,
          upvote: false,
          downvote: true,
        });
        answer.set({
          voteCount: answer.voteCount - 1,
        });
        const update = await vote.save();
        const updated = await answer.save();
        if (updated) {
          return res.status(200).send("Answer updated");
        } else {
          return res.status(500).send({
            message: "Error while obtain the answers for a question",
          });
        }
      }

      if (vote.downvote) {
        return res.status(200).send("Already voted");
      }
      answer.set({
        voteCount: answer.voteCount - 1,
      });
      vote.set({ upvote: false, downvote: true });
      const update = vote.save();
      const updated = await answer.save();
      if (!updated || !update) {
        return res.code(500).send({ message: "Error while updating vote" });
      }

      return res.status(200).send("Answer updated");
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: "Error while obtain the answers for a question",
      });
    }
  },
};

const getAllUserQuestions = {
  handler: async (req: any, res: any) => {
    try {
      console.log("this is fired");
      const userId = req.currentUserId;
      const questions = await questionModel.findAll({
        where: {
          userId: userId,
        },
      });

      if (!questions || questions.length == 0) {
        return res.status(500).send("No questions exists");
      }
      let mapElem = {};
      let mapElem2 = {};
      for (let i = 0; i < questions.length; i++) {
        const questionDetail = await QuestionModel.findById(
          questions[i].details
        );
        //@ts-ignore
        mapElem[i] = questionDetail["questions"];
        //@ts-ignore
        mapElem2[i] = questionDetail["topic"];
      }
      return res.code(200).send({
        questions: questions.map((x, idx) => {
          return {
            id: x.id,
            //@ts-ignore
            details: mapElem[idx],
            status: x.status,
            view_count: x.viewCount,
            vote_count: x.voteCount,
            //@ts-ignore
            topic: mapElem2[idx],
          };
        }),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
  },
};

// update this route when you get time
const getSpecificQuestion = {
  handler: async (req: any, res: any) => {
    try {
      const { questionId } = req.params;
      const questionDetails = await questionModel.findOne({
        where: { id: questionId },
        include: [answerModel],
      });
      return res.status(200).send(questionDetails);
    } catch {
      return res.status(500).send({
        message: "Error while fetching the question details",
      });
    }
  },
};

export {
  getAllUserQuestions,
  getQuestions,
  getSpecificQuestion,
  postQuestion,
  postQuestionAnswers,
  postVoteQuestion,
  postDownvoteQuestion,
  patchQuestion,
  patchAnswer,
  getQuestionDetails,
  getAnswers,
  deleteAnswer,
  deleteQuestion,
  upVoteAnswer,
  DownVoteAnswer,
};
