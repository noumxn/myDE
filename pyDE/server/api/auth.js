import { Router } from "express";
import {authenticateUser} from "../services/users.js";
import { generateJWToken } from "../utils/helpers.js";

const router = Router();


router
    .route("/")
    .post( async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        try {
            const user = await authenticateUser(email, password);
            const token = await generateJWToken(user);
            console.log(user);
            return res.status(200).json({token});
        } catch (err) {
            return res.status(err.status).json({"error": err.message});
        }
    })

export default router;
