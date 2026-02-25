# Ứng dụng xác thực
![Node.js](https://img.shields.io/badge/Node.js-v24.x-green.svg) ![Express.js](https://img.shields.io/badge/Express.js-v5.1-yellow.svg) ! [TypeScript](https://img.shields.io/badge/Typescript-v5.9-blue.svg)

> Tự host ứng dụng xác thực của riêng bạn, không sử dụng Google, quản lý dữ liệu của riêng bạn, chỉ bạn mới biết mật khẩu và OTP của mình.

*Đây là ứng dụng chỉ có phần backend. Bạn có thể cần các nền tảng khác như Postman để gọi API.*

## Tính năng
- Tạo tài khoản và đăng nhập.
- Lưu trữ, tạo và lấy OTP.
- Lưu trữ và lấy mật khẩu.

## Cài đặt
```
git clone https://github.com/toi-la-qanh/authenticator-app.git
cd authenticator-app
npm install
```

Cấu hình Redis trong [.env.local](./.env.local)
Sau đó chạy ứng dụng:
```
npm run dev
```

### Sử dụng cho Production?
>Mình xài dotenvx cho dự án này, nên là nếu bị dính lỗi với dotenvx thì lên [trang hướng dân](https://dotenvx.com/docs) nếu gặp vấn đề với dotenvx.

Đầu tiên, xóa hết các biến trong [.env.production](./.env.production), còn không xóa luôn cái file rồi tạo file mới. Cần phải set đại 1 cái biến bất kỳ mới chạy được:
```
dotenvx set HELLO production -f .env.production
```

Nếu vẫn không được thì copy hết file [.env.local](./.env.local) và rồi paste vô [.env.production](./.env.production), sửa lại cho khớp với dữ liệu của bạn, rồi chạy:
```
dotenvx encrypt -f .env.production
```

## APIs
| Phương thức | Đường dẫn | Mô tả | Đầu vào dữ liệu |
|--------|----------|-------------|------------|
| POST | api/users/signup | Tạo tài khoản | `name`, `password`
| POST | api/users/login | Đăng nhập | `name`, `password`
| GET | api/passwords | Lấy hết mật khẩu có trong kho dữ liệu
| POST | api/passwords | Tạo mật khẩu mới. <br>Tự tạo mật khẩu ngẫu nhiên nếu không set biến `password` | `name`, `password`(optional)
| GET | api/otp | Lấy hết mã OTP trong kho  
| POST | api/otp/add | Tạo mã OTP mới | `secret`, `name`
| POST | api/otp/generate | Lấy mã OTP để xác thực | `name`