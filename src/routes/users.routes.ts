import { Router } from "express";
import usersControllers from "../controllers/users.controllers";
import { rateLimit } from 'express-rate-limit'

const router = Router();

// Set the rate limit
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 10, // Limit each IP to 10 requests per `window`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: { errors: 'Too many requests, please try again in a few minutes !' },
});

router.post("/signup", limiter, usersControllers.create);
router.post("/login", limiter, usersControllers.login);

export default router;