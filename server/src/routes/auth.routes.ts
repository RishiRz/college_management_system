import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login, logout, logoutAll, me } from "../controllers/auth.controller.js";
import { loadSession, requireAuth } from "../middleware/auth.js";
import {
  LOGIN_RATE_MAX,
  LOGIN_RATE_WINDOW_MS,
} from "../config/auth.js";

const router = Router();

// Session must be loaded before logout/me so the cookie is resolved.
router.use(loadSession);

const loginLimiter = rateLimit({
  windowMs: LOGIN_RATE_WINDOW_MS,
  limit: LOGIN_RATE_MAX,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many login attempts. Try again later." },
});

router.post("/login", loginLimiter, login);
router.post("/logout", logout);
router.post("/logout-all", requireAuth, logoutAll);
router.get("/me", me);

export default router;
