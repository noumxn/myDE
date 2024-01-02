import express from 'express';
import cors from 'cors';
import path from 'path';
import configRoutes from './api/index.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const buildPath = path.join(__dirname, 'client/build');

const corsOptions = {
    origin: process.env.APP_URL || 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(buildPath));

app.get('*', (_, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

configRoutes(app);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});
