import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/todos.controllers.js";
import { authenticate } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", authenticate, getAllTodos);
router.post("/", authenticate, createTodo);
router.put("/:id", authenticate, updateTodo);
router.delete("/:id", authenticate, deleteTodo);

const todoRouter = router;
export default todoRouter;
