import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 250, // change to 200 later
    standardHeaders: true,
    legacyHeaders: false
});
