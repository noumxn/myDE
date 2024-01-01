import configRoutes from './api/index.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

dotenv.config();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

configRoutes(app);

app.listen(process.env.PORT, () => {
    console.log("We've now got a server!");
});
