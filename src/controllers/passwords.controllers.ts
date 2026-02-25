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
    
        const pattern = `${userName}:password:*`;
        const keys: string[] = [];
    
        for await (const key of client.scanIterator({ MATCH: pattern })) {
            keys.push(key[0]);
        }
    
        if (keys.length === 0) {
            return res.status(200).json({ message: 'No passwords found' });
        }
    
        const values = await client.mGet(keys);
    
        const passwords = keys.map((key, i) => ({
            name: key.split(':').pop(),
            password: JSON.parse(values[i] as string)
        }));
    
        return res.status(200).json(passwords);
    }

    /**
     * Store a new password in passwords storage
     * @param req.body.name - Password name
     * @param req.body.password - Password (optional)
     */
    static async create(req: Request, res: Response) {
        await body('name')
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

        const { password, name } = req.body;
        let storedPassword = null;
        if (!password) {
            storedPassword = crypto.randomBytes(10).toString('hex');
        } else {
            storedPassword = password;
        }

        const userName = req.user;
        await client.set(userName + ':password:' + name, JSON.stringify(storedPassword));
        return res.status(200).json({ message: 'Password created successfully' });
    }
}