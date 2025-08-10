# Authenticator App
> Host yourself an authenticator app, no Google, manage your own datas, only you know your passwords and otps.

## Install
```
npm install
npm run dev
```

For dotenvx config, please visit dotenvx.com/encryption

## API
| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| POST | /users/signup | Create a new user | `name`, `password`
| POST | /users/login | Login a user | `name`, `password`
| GET | /passwords | Get all passwords stored of current user
| POST | /passwords | Store a new password | `passwordName`, `password`(optional)
| GET | /otp | Get all OTP codes for current user
| POST | /otp/add | Add a new OTP codes | `secret`, `name`
| POST | /otp/generate | Generate a OTP code for authenticating | `name`