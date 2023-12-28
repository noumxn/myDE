import { Router } from "express";
import {getUserByEmail} from "../services/users.js";
import { authorizeToken } from "../middleware/authMiddleware.js";

const router = Router();

router
    .post("/", authorizeToken, async (req, res) => {
        console.log("I'm getting to the route /interpreter");
        const email = req.body.email;

        try {
            const userDetails = await getUserByEmail(email);
            return res.status(200).json(userDetails);
        } catch (err) {
            return res.status(err.status).json({"error": err.message});
        }
    })

export default router;
