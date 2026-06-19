import jsonwebtoken, { decode } from "jsonwebtoken"
import { config } from "../config.js"

export const validateAuthCookie = (allowedTypes = []) => {
    return (req, res, next) => {
        try {
            const {authCookie} = req.cookies;

            if(!authCookie){
                return res.status(403).json({message: "Cookie not found, authorization required"})
            }

            const decoded = jsonwebtoken.verify(authCookie, config.JWT.secret)

            if(!allowedTypes.includes(decoded.userType)){
                return res.status(401).json({message:"Access denied"})
            }

            next()
        } catch (error) {
            
        }
    }
}