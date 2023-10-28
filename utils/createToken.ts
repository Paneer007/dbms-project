import { sign } from "jsonwebtoken";

interface userData {
  id: string;
}

const newToken = (data: userData) => {
  return sign(data, process.env.JWT_SECRET as string, {
    algorithm: "HS256",
  });
};

export { newToken };
