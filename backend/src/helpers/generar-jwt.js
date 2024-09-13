import { environment } from "../config/env.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = environment.auth.secret;

const generateJWT = async (userId) => {
  try {
    const payload = { userId };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "4h" });
    return token;
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo generar el token");
  }
};

export default generateJWT;
