# Authenticator App
![Node.js](https://img.shields.io/badge/Node.js-v24.x-green.svg) ![Express.js](https://img.shields.io/badge/Express.js-v5.1-yellow.svg) ![TypeScript](https://img.shields.io/badge/Typescript-v5.9-blue.svg)

[Tiếng Việt](./README.vi-VN.md) | [日本語](./README.ja-JP.md)

> Host yourself an authenticator app, don't use Google, manage your own datas, only you know your passwords and otps.

*This is the backend-only application. You may need other platforms like Postman to call the apis.*

## Features
- Create account and login.
- Store, generate and retrieve OTPs.
- Store and retrieve passwords.

## Install
```
git clone https://github.com/toi-la-qanh/authenticator-app.git
cd authenticator-app
npm install
```

Set up your redis database in [.env.local](./.env.local)
Then run the app:
```
npm run dev
```

### Set Up for Production?
>I use dotenvx for this project, so please read their [instruction page](https://dotenvx.com/docs/) if you get trouble with dotenvx.

So basically, you need to delete all the things in [.env.production](./.env.production), or just delete the whole file and create a new one. You may need to create one varible to make it work, like:
```
dotenvx set HELLO production -f .env.production
```

Or you could just copy the whole thing in [.env.local](./.env.local) and paste to [.env.production](./.env.production), add your new varibles, and then run this command:
```
dotenvx encrypt -f .env.production
```
And you're good to go now.

## APIs
| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| POST | api/users/signup | Create a new user | `name`, `password`
| POST | api/users/login | Login a user | `name`, `password`
| GET | api/passwords | Get all passwords stored of current user
| POST | api/passwords | Store a new password. <br>Generate random password if user does not set `password` | `name`, `password`(optional)
| GET | api/otp | Get all OTP codes for current user
| POST | api/otp/add | Add a new OTP codes | `secret`, `name`
| POST | api/otp/generate | Generate a OTP code for authenticating | `name`