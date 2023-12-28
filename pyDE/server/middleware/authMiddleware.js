import jwt from 'jsonwebtoken';

export const authorizeToken = (req, res, next) => {
    console.log("Getting to middleware");
    const token = req.headers.authorization;
    const tokenPart = token && token.split(' ')[1];
    if (!tokenPart) {
        return res.status(403).json({ error: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        next();
    });
};
