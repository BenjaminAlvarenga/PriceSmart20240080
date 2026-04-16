import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken"

import customerModel from "../models/customers.js"

import { config } from "../config.js";


const loginCustomerController = {};

loginCustomerController.login = async (req, res) => {
    try {
        //Solicitar datos
        const {email, password} = req.body;
        //Verificar correo en la base de datos
        const userFound = await customerModel.findOne({email});
        //Si no lo encuentra
        if(!userFound){
            return res.status(404).json({message:"Customer not found"})
        }

        //Verificar si la cuenta esta bloqueada
        if(userFound.timeout && userFound.timeout > Date.now()){
            return res.status(403).json({message: "Customer blocked"})
        }

        //Verificar la contraseña
        const isMatch = await bcrypt.compare(password, userFound.password)

        if(!isMatch){
            userFound.loginAttempts = (userFound.loginAttempts || 0) + 1

         if(userFound.loginAttempts >= 5){
            userFound.timeout = Date.now() + 15 * 60 * 1000;
            userFound.loginAttempts = 0;

            await userFound.save();
            return res.status(403).json({message: "Account blocked"})
        }
        await userFound.save()
        return res.status(403).json({message:"Incorrect password"});
}
        userFound.loginAttempts = 0;
        userFound.timeout = null;
        await userFound.save()

        const token = jsonwebtoken.sign(
            //Que vamos a guardar
            {id: userFound._id, userType: "customer"},
            //Secret key
            config.JWT.secret,
            //Tiempo de expiracion
            {expiresIn:"30d"}
        );

        //Guardamos el token en una cookie
        res.cookie("authCookie", token)

        //listo
        return res.status(200).json({message:"Login exitoso"})
    }
    
    catch (error) {
        console.log("error"+ error)
        return res.status(500).json({message: "Internal server error" + email  + password})
    }
}

export default loginCustomerController;