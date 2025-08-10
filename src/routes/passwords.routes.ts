import passwordsControllers from "../controllers/passwords.controllers";
import auth from "../middlewares/auth.middlewares";
import { rateLimit } from 'express-rate-limit'
import { Router } from "express";

const router = Router();

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 10, // Limit each IP to 10 requests per `window`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: { errors: 'Too many requests, please try again in a few minutes !' },
});

router.get("/", auth, limiter, passwordsControllers.index);
router.post("/", auth, limiter, passwordsControllers.create);

export default router;