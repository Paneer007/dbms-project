import userModel from "../../model/sql/user/user.model";
import questionModel from "../../model/sql/question/question.model";

const banProfile = {
  handler: async (req: any, res: any) => {
    try {
      //update user profile
      if (!req.isAdmin) {
        return res.code(400).send({ message: "You are not an admin" });
      }
      const body = req.body;
      const username = body.username;
      if (!username) {
        return res.status(400).send({ message: "Enter valid credentials" });
      }

      const user = await userModel.findOne({
        where: {
          username: username,
        },
      });

      if (!user) {
        return res.code(400).send({ message: "User not found" });
      }
      user.set({
        isBanned: true,
      });
      const updated = await user.save();
      if (!updated) {
        return res.code(500).send({ message: "Error while banning profile" });
      }
      return res.code(200).send({ message: "Banned the profile successfully" });
    } catch {
      return res.code(500).send({ message: "Error while banning profile" });
    }
  },
};

const unBanProfile = {
  handler: async (req: any, res: any) => {
    try {
      //update user profile
      if (!req.isAdmin) {
        return res.code(400).send({ message: "You are not an admin" });
      }
      const body = req.body;
      const username = body.username;
      if (!username) {
        return res.status(400).send({ message: "Enter valid credentials" });
      }

      const user = await userModel.findOne({
        where: {
          username: username,
        },
      });
      if (!user) {
        return res.code(400).send({ message: "User not found" });
      }
      user.set({
        isBanned: false,
      });
      const updated = await user.save();
      if (!updated) {
        return res.code(500).send({ message: "Error while unbanning profile" });
      }
      return res
        .code(200)
        .send({ message: "Unbanned the profile successfully" });
    } catch {
      return res.code(500).send({ message: "Error while unbanning profile" });
    }
  },
};

const closeQuestion = {
  handler: async (req: any, res: any) => {
    try {
      const userId = req.currentUserId;
      const users = await userModel.findOne({
        where: {
          id: userId,
        },
      });
      console.log(users);
      //@ts-ignore
      if (!users.isAdmin) {
        return res.code(400).send({ message: "You are not an admin" });
      }
      const body = req.body;
      const q_id = body.questionId;
      if (!q_id) {
        return res.status(200).send("enter valid body");
      }
      const question = await questionModel.findOne({
        where: {
          id: q_id,
        },
      });

      if (!question) {
        return res.status(400).send({
          message: "Question doesn't exist",
        });
      }

      question.status = "closed";
      await question.save();

      return res.code(200).send("Updated");
    } catch {
      return res.code(500).send("internal server error");
    }
  },
};

export { banProfile, unBanProfile, closeQuestion };
