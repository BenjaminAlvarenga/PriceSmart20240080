import dotenv from "dotenv";

dotenv.config();

export const config = {
    db:{
        URI: process.env.DB_URI
    },
    server:{
        port:process.env.PORT
    },
    JWT:{
        secret: process.env.JWT_SECRET_KEY 
    },
    email: {
        user_mail: process.env.USER_MAIL,
        user_password: process.env.USER_PASSWORD
    }
};