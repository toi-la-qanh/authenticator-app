import { Router } from "express";
import auth from "../middlewares/auth.middlewares";
import AuthController from "../controllers/auth.controllers";
import { rateLimit } from 'express-rate-limit'

const router = Router();

// OTP Authentication routes
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 10, // Limit each IP to 10 requests per `window`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: { errors: 'Too many requests, please try again in a few minutes !' },
});

router.get("/", auth, limiter, AuthController.index);
router.post("/add", auth, limiter, AuthController.add);
router.post("/generate", auth, limiter, AuthController.generate);
// router.post("/otp/verify", auth, limiter, AuthController.verify);


export default router; 