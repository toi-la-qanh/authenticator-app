import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import client from "../db/database";
import createSecretToken from "../auth/token";
import bcrypt from "bcrypt";

export default class UserController {
    /** 
    * Create a new user
    * @param req.body.name - Username
    * @param req.body.password - Password
    */
    static async create(req: Request, res: Response) {
        // Run validation
        await body('name')
            .notEmpty()
            .withMessage('Name is required')
            .isString()
            .withMessage('Name must be a string')
            .isLength({ min: 3, max: 50 })
            .withMessage('Name must be between 3 and 50 characters')
            .matches(/.*[a-zA-Z].*/)
            .withMessage('Name must contain at least one letter')
            .run(req);

        await body('password')
            .notEmpty()
            .withMessage('Password is required')
            .isString()
            .withMessage('Password must be a string')
            .isLength({ min: 6, max: 100 })
            .withMessage('Password must be between 6 and 100 characters')
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }

        const { name, password } = req.body;

        await client.set("user:" + name, bcrypt.hashSync(password, 10));
        const token = createSecretToken(name);

        res.cookie("token", token, {
            path: "/", // Cookie is accessible from all paths
            expires: new Date(Date.now() + 604800000), // Cookie expires in 7 days
            secure: process.env.NODE_ENV === "production", // Cookie will only be sent over HTTPS
            httpOnly: true, // Cookie cannot be accessed via client-side scripts
            sameSite: process.env.sameSite as any, // Set to Lax when run on local
        });
        res.status(200).json({ message: 'User created successfully' });
    }

    /**
     * Login a user
     * @param req.body.name - Username
     * @param req.body.password - Password
     */
    static async login(req: Request, res: Response) {
        // Run validation
        await body('name')
            .notEmpty()
            .withMessage('Name is required')
            .isString()
            .withMessage('Name must be a string')
            .isLength({ min: 3, max: 50 })
            .withMessage('Name must be between 3 and 50 characters')
            .matches(/.*[a-zA-Z].*/)
            .withMessage('Name must contain at least one letter')
            .run(req);

        await body('password')
            .notEmpty()
            .withMessage('Password is required')
            .isString()
            .withMessage('Password must be a string')
            .isLength({ min: 6, max: 100 })
            .withMessage('Password must be between 6 and 100 characters')
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }

        const { name, password } = req.body;

        const userPassword = await client.get("user:" + name);
        if (!userPassword) {
            return res.status(404).json({ errors: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, userPassword);

        if (!isPasswordValid) {
            return res.status(400).json({ errors: 'Invalid password' });
        }

        // Create a new token
        const token = createSecretToken(name);

        res.cookie("token", token, {
            path: "/", // Cookie is accessible from all paths
            expires: new Date(Date.now() + 604800000), // Cookie expires in 7 days
            secure: process.env.NODE_ENV === "production", // Cookie will only be sent over HTTPS
            httpOnly: true, // Cookie cannot be accessed via client-side scripts
            sameSite: process.env.sameSite as any, // Set to Lax when run on local
        });
        res.status(200).json({ message: 'Login successful' });
    }
}