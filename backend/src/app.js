import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import { environment } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import todoRouter from "./routes/todos.routes.js";

const app = express();
const PORT = environment.server.port;
const HOST = environment.server.host;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use("/auth", authRouter);
app.use("/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`Server running in ${HOST}:${PORT}`);
});
