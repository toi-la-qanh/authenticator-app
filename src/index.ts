import { config } from '@dotenvx/dotenvx';
config({path: ['.env'], ignore: ['MISSING_ENV_FILE']});

import express from 'express';
const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import http from 'http';
const PORT = Number(process.env.PORT);
const server = http.createServer(app);

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

// Database 
import client from './db/database';
client.connect();

// Cookie parser middleware
import cookieParser from 'cookie-parser';
app.use(cookieParser());

// CORS middleware
import cors from 'cors';
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
import mainRoutes from './routes/main.routes';
import usersRoutes from './routes/users.routes';
import passwordsRoutes from './routes/passwords.routes';
import authRoutes from './routes/auth.routes';

app.use('/', mainRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/passwords', passwordsRoutes);
app.use('/api/otp', authRoutes);

// Set the trust proxy for rate limit
app.set("trust proxy", 3 /* number of proxies between user and server */);