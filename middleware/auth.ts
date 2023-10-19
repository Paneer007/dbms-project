import { verify, JwtPayload } from "jsonwebtoken";
import {
  preHandlerAsyncHookHandler,
  FastifyRequest,
  FastifyReply,
} from "fastify";
import userModel from "../model/sql/user/user.model";
const JWTPayload = (value: JwtPayload | string): JwtPayload => {
  return value as JwtPayload;
};

const checkLoggedIn: preHandlerAsyncHookHandler = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const token = req.headers.authorization as string;
  let payload: string | JwtPayload;
  try {
    payload = verify(token, process.env.JWT_SECRET as string);
  } catch (e) {
    return res.code(401).send({ message: "Not logged in" });
  }
  const finalPayload = JWTPayload(payload);

  const id = finalPayload["id"];
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
  req.currentUser = currentUser._id;
};

export default checkLoggedIn;
