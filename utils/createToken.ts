import { sign } from "jsonwebtoken";

interface userData {
  email?: string;
  name?: string;
  rollNumber?: string;
  isAdmin: boolean;
}

const newToken = (data: userData) => {
  return sign(data, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
    algorithm: "HS256",
  });
};

export { newToken };
