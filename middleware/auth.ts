import { verify, JwtPayload } from "jsonwebtoken";
import {
  preHandlerAsyncHookHandler,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import userModel from "../model/sql/user/user.model";

const checkLoggedIn: preHandlerAsyncHookHandler = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  let token = req.headers.authorization as string;
  let payload: string | JwtPayload;
  try {
    token = token.substring(7);
    payload = verify(token, process.env.JWT_SECRET as string);
  } catch (e) {
    return res.code(401).send({ message: "Not logged in" });
  }

  const id = payload;
  const currentUser = await userModel.findOne({
    where: {
      id: id,
    },
  });

  if (!currentUser) {
    return res.code(401).send({ message: "User doesn't exist" });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  req.currentUserId = currentUser.id;
};

export default checkLoggedIn;
