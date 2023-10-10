import { Schema } from "mongoose";
import { pingBody } from "./types";
const ping = {
  schema: {
    body: pingBody,
  },
  handler: async (req: any, res: any) => {
    try {
      return res.code(200).send({ message: "pong" });
    } catch {
      return res.code(400);
    }
  },
};

export { ping };
