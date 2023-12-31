import { Router } from "express";
import { authorizeToken } from "../middleware/authMiddleware.js";
import { apiLimiter } from "../middleware/rateLimiting.js";
import { runCodeInDocker } from "../utils/helpers.js";

const router = Router();

const langOptions = new Set(["python", "cpp", "csharp", "r", "node", "rust", "java"]);

router.post("/:language", apiLimiter, authorizeToken, async (req, res) => {
    const { code } = req.body;
    const { language } = req.params;

    if (!langOptions.has(language)) {
        return res.status(400).json({ "error": `'${language}' is not available.` });
    }

    try {
        console.log('Recieving reqs');
        const output = await runCodeInDocker(language, code);
        res.status(200).json({ result: output });
    } catch (err) {
        res.status(500).json({ "error": err.toString() });
    }
});

export default router;
