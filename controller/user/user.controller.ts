import userModel from "../../model/sql/user/user.model";
import bcrypt from "bcrypt";
import { newToken } from "../../utils/createToken";

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

const getProfile = {
  handler: async (req: any, res: any) => {
    try {
      const userId = req.currentUserId;
      const user = await userModel.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return res.status(400).send("User doesnt exists");
      }
      return res.status(200).send(user);
    } catch {
      return res.status(500).send("Internal server error");
    }
  },
};

const patchProfile = {
  handler: async (req: any, res: any) => {
    try {
      //update user profile
      const user = await userModel.findOne({
        where: {
          id: req.currentUserId,
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

const userSignup = {
  handler: async (req: any, res: any) => {
    try {
      const body = req.body;
      const username = body.username;
      const password = body.password;
      if (!username || !password) {
        return res.status(400).send({ message: "Enter valid credentials" });
      }

      const user = await userModel.findOne({
        where: {
          username: username,
        },
      });

      if (user) {
        return res.status(400).send({
          message: "User exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.create({
        username: username,
        password: hashedPassword,
      });
      return res.status(200).send("User created");
    } catch (e) {
      console.log(e);
      return res.status(500).send({
        message: "Error while sending the question",
      });
    }
  },
};

const userLogin = {
  handler: async (req: any, res: any) => {
    try {
      const body = req.body;
      const username = body.username;
      const password = body.password;
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

      const match = bcrypt.compare(user.password, password);
      if (!match) {
        return res.status(400).send({
          message: "Enter a valid password",
        });
      }
      const token = newToken(user.id);
      return res.status(200).send(token);
    } catch (e) {
      return res.status(500).send({
        message: "Error while logging in",
      });
    }
  },
};

export {
  getUsers,
  getUserById,
  patchProfile,
  getProfile,
  userLogin,
  userSignup,
  //   getSearch,
};
