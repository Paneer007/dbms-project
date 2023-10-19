import Question from "../../model/sql/question/question.model";
import userModel from "../../model/sql/user/user.model";
import bcrypt from "bcrypt";
const excludes = {
  password: 0,
  hasSecondaryCreds: 0,
  isSecodaryCredsVerified: 0,
};

const dummyUser = {
  handler: async (req: any, res: any) => {
    try {
      const users = await userModel.findOne({
        where: {
          username: "paneer",
        },
      });

      if (users) {
        return res.code(404).send({ message: "Dummy user is found" });
      }
      const hashPass = await bcrypt.hash("password", 10);
      await userModel.create({
        name: "sanjai",
        username: "paneer",
        password: hashPass,
      });
      return res.code(200).send({ message: "user created" });
    } catch (err) {
      return res
        .code(500)
        .send({ message: "Error while trying to make dummy user" });
    }
  },
};

const getUsers = {
  handler: async (req: any, res: any) => {
    try {
      const users = await userModel.findAll({});
      if (users.length > 0) {
        return res.code(200).send({ users });
      } else {
        return res.code(404).send({ message: "Users not found" });
      }
    } catch {
      return res.code(500).send({ message: "Error while trying to get users" });
    }
  },
};

const getUserById = {
  handler: async (req: any, res: any) => {
    try {
      const userId = req.query.id;
      if (!userId) {
        return res.code(400).send({ message: "User does not exist" });
      }
      const user = await userModel.findOne({ where: { id: userId } });
      if (user) {
        return res.code(200).send({ user: user });
      } else {
        return res.code(404).send({ message: "User not found" });
      }
    } catch {
      return res
        .code(500)
        .send({ message: "Error while trying to get the user" });
    }
  },
};

const updateProfile = {
  handler: async (req: any, res: any) => {
    try {
      //update user profile
      const user = await userModel.findOne({
        where: {
          id: req.currentUser.id,
        },
      });
      if (!user) {
        return res.code(400).send({ message: "User not found" });
      }
      user.set({
        name: "temp",
      });
      const updated = await user.save();
      if (!updated) {
        return res.code(500).send({ message: "Error while updating profile" });
      }
      return res
        .code(200)
        .send({ message: "Updated the profile successfully" });
    } catch {
      return res.code(500).send({ message: "Error while updating profile" });
    }
  },
};

const postQuestion = {
  handler: async (req: any, res: any) => {
    try {
      const body = req.body;

      const details = body.details; // replace with mongo db when needed
      const status = "unanswered";
      const viewCount = 0;
      const voteCount = 0;

      if (!details) {
        return res.code(500).send({
          mesage: "Invalid question",
        });
      }

      await Question.create({
        details,
        status,
        viewCount,
        voteCount,
      });
      return res.code(200).send({ message: "created new user successfully" });
    } catch {
      return res.code(500).send({
        message: "Error while posting the question",
      });
    }
  },
};

const userLogin = {
  handler: async (req: any, res: any) => {
    try {
      const body = req.body;
      const username = body.username;
      const password = body.pasword;

      if (!username || !password) {
        return res.status(400).send({ message: "Enter valid credentials" });
      }

      const user = await userModel.findOne({
        where: {
          username: username,
        },
      });

      if (!user) {
        return res.status(400).send({
          message: "User doesn't exist",
        });
      }

      const match = bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).send({
          message: "Enter a valid password",
        });
      }
    } catch {
      return res.status(500).send({
        message: "Error while sending the question",
      });
    }
  },
};

export {
  getUsers,
  getUserById,
  updateProfile,
  dummyUser,
  postQuestion,
  userLogin,
  //   getSearch,
};
