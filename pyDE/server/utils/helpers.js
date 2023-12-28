export const generateJWToken = (user) => {
    const expiresIn = '2h'; // Token expiration time
    const payload = {
        id: user._id,
        username: user.username,
        email: user.email
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};
