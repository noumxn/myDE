import { Router } from "express";
import {getUserByEmail} from "../services/users.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router
    .post("/", verifyToken, async (req, res) => {
        const email = req.body.email;

        try {
            const userDetails = await getUserByEmail(email);
            console.log(userDetails);
            return res.status(200).json(userDetails);
        } catch (err) {
            return res.status(err.status).json({"error": err.message});
        }
    })

export default router;
