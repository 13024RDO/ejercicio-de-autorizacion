import { database } from "../db/database.js";
import generarJwt from "../helpers/generar-jwt.js";

export const signIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan credenciales" });
  }

  try {
    const user = database.user.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const token = await generarJwt(user.id);
    req.session.token = token;

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    return res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};

export const signOut = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error al cerrar sesión" });
      }

      res.clearCookie("authToken");
      return res.json({ message: "Cierre de sesión exitoso" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error Inesperado" });
  }
};

export const validateSession = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "No autenticado" });
  }

  return res.json({
    message: "Acceso permitido a área protegida",
    user: req.user,
  });
};
