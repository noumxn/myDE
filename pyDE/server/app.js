import configRoutes from './api/index.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

configRoutes(app);

app.listen(process.env.PORT, () => {
    console.log("We've now got a server!");
});
