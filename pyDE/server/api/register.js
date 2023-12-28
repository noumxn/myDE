import { Router } from "express";
import {createUser} from "../services/users.js";

const router = Router();


router
    .route("/")
    .post( async (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        try {
            const newUser = await createUser(username, email, password);
            return res.status(200).json(newUser);
        } catch (err) {
            return res.status(err.status).json({"error": err.message});
        }
    })

export default router;
