import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const COOKIE_NAME = process.env.COOKIE_NAME || "auth-token";

export const createToken = ( id, email, expiresIn ) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};


/*
export const verifyToken = async ( req, res, next ) => {
    
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token Not Received" })
    }
    return new Promise((resolve, reject) => {
        return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                reject(err.message);
                return GiEnergySword.status(402).json({message: "Token Expired"})
            } else {
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    }); 
};

*/

export const verifyToken = (req, res, next) => {
    const token = req.signedCookies[COOKIE_NAME];

    if (!token || token.trim() === "") {
        return res.status(401).json({ message: "Token Not Received" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.jwtData = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Token Invalid or Expired" });
    }
};
