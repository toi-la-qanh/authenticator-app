# Authenticator App
![Node.js](https://img.shields.io/badge/Node.js-v24.x-green.svg) ![Express.js](https://img.shields.io/badge/Express.js-v5.1-yellow.svg) ![TypeScript](https://img.shields.io/badge/Typescript-v5.9-blue.svg)
> Host yourself an authenticator app, don't use Google, manage your own datas, only you know your passwords and otps.

## Install
```
npm install
npm run dev
```

## Features
- Create account and login.
- Store, generate and retrieve OTPs.
- Store and retrieve passwords.

## API
| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| POST | api/users/signup | Create a new user | `name`, `password`
| POST | api/users/login | Login a user | `name`, `password`
| GET | api/passwords | Get all passwords stored of current user
| POST | api/passwords | Store a new password | `passwordName`, `password`(optional)
| GET | api/otp | Get all OTP codes for current user
| POST | api/otp/add | Add a new OTP codes | `secret`, `name`
| POST | api/otp/generate | Generate a OTP code for authenticating | `name`