import { Router } from "express";
import {getUserByEmail} from "../services/users.js";
import { authorizeToken } from "../middleware/authMiddleware.js";

const router = Router();

router
    .post("/:language", authorizeToken, async (req, res) => {
        const code = req.body.code;
        const email = req.body.email;
        const language = req.params.language;
        console.log(`'${code}' in ${language} language`);

        try {
            const userDetails = await getUserByEmail(email);
            return res.status(200).json(userDetails);
        } catch (err) {
            return res.status(err.status).json({"error": err.message});
        }
    })

export default router;
