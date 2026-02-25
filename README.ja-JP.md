# 認証アプリ
![Node.js](https://img.shields.io/badge/Node.js-v24.x-green.svg) ![Express.js](https://img.shields.io/badge/Express.js-v5.1-yellow.svg) ![TypeScript](https://img.shields.io/badge/Typescript-v5.9-blue.svg)

> 認証アプリを自分でホストし、Googleは使わないでください。自身のデータを管理し、パスワードとOTPを知っているのはあなただけです。

*これはバックエンド専用のアプリケーションです。APIを呼び出すにはPostmanなどの他のプラットフォームが必要になる場合があります。*

## 特長
- アカウントを作成してログインする。
- OTP（ワンタイムパスワード）を保存、生成、取得する。
- パスワードを保存、取得する。

## インストール
```
git clone https://github.com/toi-la-qanh/authenticator-app.git
cd authenticator-app
npm install
```

[.env.local](./.env.local) で Redis データベースを設定してください。
その後、アプリを実行します：
```
npm run dev
```

### 本番環境のセットアップ？
>このプロジェクトではdotenvxを使用しています。dotenvxで問題が発生した場合は、彼らの[説明ページ](https://dotenvx.com/docs)をお読みください。

基本的に、[.env.production](./.env.production) 内のすべての内容を削除するか、ファイル全体を削除して新規作成する必要があります。動作させるために変数を1つ作成する必要があるかもしれません。例えば：
```
dotenvx set HELLO production -f .env.production
```

あるいは、[.env.local](./.env.local) の内容をすべてコピーして [.env.production](./.env.production) に貼り付け、新しい変数を追加した後、次のコマンドを実行する方法もあります：
```
dotenvx encrypt -f .env.production
```
これで準備完了です。

## APIs
| メソッド | エンドポイント | 説明 | パラメータ |
|--------|----------|-------------|------------|
| POST | api/users/signup | 新規ユーザー作成 | `name`, `password`
| POST | api/users/login | ユーザーログイン | `name`, `password`
| GET | api/passwords | 現在のユーザーの保存済みパスワード一覧取得
| POST | api/passwords | 新規パスワード保存。<br>`password`を設定しない場合、ランダムパスワードを生成 | `name`, `password`(オプション)
| GET | api/otp | 現在のユーザーの全OTPコードを取得
| POST | api/otp/add | 新しいOTPコードを追加 | `secret`, `name`
| POST | api/otp/generate | 認証用OTPコードを生成 | `name`