import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import speakeasy from "speakeasy";
import client from "../db/database";

export default class AuthController {
    /**
    * Get all OTP codes for a user
    */
    static async index(req: Request, res: Response) {
        const userName = req.user;

        // Get all keys for this user's secrets
        const keys = await client.keys(`otp:${userName}:*`);

        if (!keys || keys.length === 0) {
            return res.status(404).json({
                error: 'No OTP codes found'
            });
        }

        // Extract secret names from keys
        const secretNames = keys.map(key => key.split(':')[2]);

        return res.status(200).json({
            data: { otpCodes: secretNames }
        });
    }

    /**
     * Add a new OTP code for a specific secret
     * @param req.body.secret - The secret of the OTP code
     * @param req.body.name - The name of the OTP code
     */
    static async add(req: Request, res: Response) {
        // Validate secret input
        await body('secret')
            .isString()
            .withMessage('Secret must be a string')
            .isLength({ min: 16, max: 250 })
            .withMessage('Secret must be between 16 and 250 characters')
            .matches(/^[A-Z2-7]+=*$/)
            .withMessage('Secret must be a valid Base32 string')
            .run(req);

        await body('name')
            .isString()
            .withMessage('Name must be a string')
            .isLength({ min: 1, max: 50 })
            .withMessage('Name must be between 1 and 50 characters')
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()[0].msg
            });
        }

        const { secret, name } = req.body;
        const userName = req.user;

        // Store the secret with user association
        await client.set(`otp:${userName}:${name}`, secret);

        return res.status(201).json({
            message: 'OTP code added successfully',
            data: { name }
        });
    }

    /**
     * Generate current OTP code for a specific secret
     * @param req.body.name - The name of the OTP code
     */
    static async generate(req: Request, res: Response) {
        await body('name')
            .isString()
            .withMessage('Name must be a string')
            .isLength({ min: 1, max: 50 })
            .withMessage('Name must be between 1 and 50 characters')
            .run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()[0].msg
            });
        }

        const { name } = req.body;
        const userName = req.user;

        // Get the secret from storage
        const secret = await client.get(`otp:${userName}:${name}`);

        if (!secret) {
            return res.status(404).json({
                error: 'OTP code not found'
            });
        }

        // Generate TOTP code
        const token = speakeasy.totp({
            secret,
            encoding: 'base32',
            step: 30, // 30 seconds
        });

        return res.status(200).json({
            data: {
                otp: token,
                name,
                timeRemaining: 30 - (Math.floor(Date.now() / 1000) % 30)
            }
        });
    }
} 