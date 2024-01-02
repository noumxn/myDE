import { Router } from "express";
import {authenticateUser} from "../services/users.js";
import { generateJWToken } from "../utils/helpers.js";
import { apiLimiter } from "../middleware/rateLimiting.js";
import xss from "xss";
import { 
    parameterCheck, 
    strValidCheck, 
    emailValidCheck, 
} from '../utils/validate.js';

const router = Router();


router
    .post("/", apiLimiter, async (req, res) => {
        const email = xss(req.body.email);
        const password = xss(req.body.password);
        try {
            parameterCheck(email, password);
            strValidCheck(email, password);
            emailValidCheck(email);
        } catch (err) {
            return res.status(err.status).json({"error": err.message});
        }

        try {
            const user = await authenticateUser(email, password);
            const token = generateJWToken(user);
            return res.status(200).json({token});
        } catch (err) {
            return res.status(err.status).json({"error": err.message});
        }
    })

export default router;
