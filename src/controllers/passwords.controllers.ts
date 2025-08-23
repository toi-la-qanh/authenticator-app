import { Request, Response } from "express";
import client from "../db/database";
import crypto from 'crypto';
import { body, validationResult } from "express-validator";

export default class PasswordController {
    /**
     * Get all passwords of a user from passwords storage
     */
    static async index(req: Request, res: Response) {
        const userName = req.user;
        if (!userName) {
            return res.status(400).json({ errors: 'User name not found' });
        }

        const keys = await client.get('password:' + userName);
        if (!keys) {
            return res.status(404).json({ errors: 'No passwords found' });
        }

        return res.status(200).json({
            message: 'Passwords retrieved successfully',
            data: { keys: JSON.parse(keys) }
        });
    }

    /**
     * Store a new password in passwords storage
     * @param req.body.passwordName - Password name
     * @param req.body.password - Password (optional)
     */
    static async create(req: Request, res: Response) {
        await body('passwordName')
        .notEmpty()
        .withMessage('Password name is required')
        .isString()
        .withMessage('Password name must be a string')
        .isLength({ min: 3, max: 50 })
        .withMessage('Password name must be between 3 and 50 characters')
        .run(req);

        await body('password')
        .optional()
        .isString()
        .isLength({ min: 8, max: 100 })
        .withMessage('Password must be between 8 and 100 characters')
        .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }

        const { password, passwordName } = req.body;
        let storedPassword = null;
        if (!password) {
            storedPassword = crypto.randomBytes(32).toString('hex');
        } else {
            storedPassword = password;
        }

        try {
            await client.set('password:' + passwordName, JSON.stringify({ password: storedPassword }));
            return res.status(200).json({ message: 'Password created successfully' });
        } catch (error) {
            return res.status(500).json({
                errors: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}