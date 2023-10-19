import { Type } from "@sinclair/typebox";

const pingBody = Type.Object({
  message: Type.String(),
});

export { pingBody };
