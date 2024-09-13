import jwt from "jsonwebtoken";
import { environment } from "../config/env.js";
import { database } from "../db/database.js";

const SECRET_KEY = environment.auth.secret;

export const authenticate = (req, res, next) => {
  console.log(req.session);
  console.log("-----------");
  console.log(req.cookies);

  const token = req.cookies.authToken || req.session.token;

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = database.user.find((user) => user.id === decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "Token inválido" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Token inválido" });
  }
};
