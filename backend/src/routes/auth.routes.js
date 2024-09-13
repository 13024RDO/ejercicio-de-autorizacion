import { Router } from "express";
import {
  signIn,
  signOut,
  validateSession,
} from "../controllers/auth.controllers.js";
import { authenticate } from "../middlewares/validar-jwt.js";

const router = Router();

router.post("/sign-in", signIn);
router.post("/sign-out", signOut);
router.get("/session", authenticate, validateSession);

const authRouter = router;
export default authRouter;
