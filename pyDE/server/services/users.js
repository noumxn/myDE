import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import {users} from '../config/mongoCollections.js';
dotenv.config();

export const createUser = async (username, email, password) => {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = {
        username: username,
        email: email,
        password: hashedPassword,
    }
    const userCollection = await users();
    const insertInfo = await userCollection.insertOne(newUser);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw {status: 500, message: 'Internal Server Error'};
    }
    return newUser;
}

export const getUserByEmail = async (email) => {
    const userCollection = await users();
    const user = userCollection.findOne({email: email});
    if (!user) {
        throw {status: 404, message: `No User with email: ${email}`};
    }
    return user;
}

export const authenticateUser = async (email, password) => {
    const user = await getUserByEmail(email);
    const authentic = await bcrypt.compare(password, user.password);
    if (!authentic) { 
        throw {status: 403, message: 'Email and Password do not match'};
    } else {
        return user;
    }
}
