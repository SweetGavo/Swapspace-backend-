import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

//compare password

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};


export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};


export const createToken = async (user: any) => {
  let secrete = process.env.JWT_SECRETE;
  if (secrete) {
    const token = jwt.sign({ id: user.id, username: user.username }, secrete, {
      expiresIn: "1d",
    });
    return token;
  } else {
    return null;
  }
};



export const protect = async (req: any, res: any, next: any) => {
  try {
    let bearer = req.headers.authorization;

    if (!bearer) {
      res.status(401).json({ message: "Not authorized to access this route" });
      return;
    }
    const [, token] = bearer.split(" ");
    console.log(token);
    if (!token) return res.status(401).json({ message: "Not valide token" });

    let secrete = process.env.JWT_SECRETE;
    if (secrete) {
      let user = jwt.verify(token, secrete);
      if (!user) return res.status(401).json({ message: "Not valide token" });
      req.user = user;
      next();
    } else {
      req.user = null;
      res.status(500).json({ code: 500, message: "internal server error" });
    }
  } catch (error) {
    // console.log(error);
    res.status(401).json({ message: "Not valide" });
  }
};
