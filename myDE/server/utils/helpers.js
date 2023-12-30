import jwt from 'jsonwebtoken';

export const generateJWToken = (user) => {
    const expiresIn = '2h'; // Token expiration time
    const payload = {
        id: user._id.toString(),
        username: user.username,
        email: user.email
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
