import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET as string;

export function signToken(payload:{userId:string}){
    return jwt.sign(payload, JWT_SECRET , { expiresIn: "7d" });
};
export function verifyToken(token:string){
    return jwt.verify(token, JWT_SECRET);
}