import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import employeeModel from "../models/employee.js";
import customerModel from "../models/customers.js";

import { config } from "../config.js";

const registerEmployeeController = {};

registerEmployeeController.post = async (req, res) => {
  try {
    const { name, lastName, salary, DUI, phone, email, password, idBranches, isVerified } =
      req.body;

    //Verificamos si no es cliente
    const existsCustomer = await customerModel.findOne({ email });
    if (existsCustomer) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const existsEmployee = await employeeModel.findOne({ email });
    if (existsEmployee) {
      return res.status(400).json({ message: "Email already in use" });
    }

    //Encriptar la contra
    const passwordHash = await bcryptjs.hash(password, 10);

    //Guardamos todo en la base
    const newEmployee = new employeeModel({
      name,
      lastName,
      salary,
      DUI,
      phone,
      email,
      password: passwordHash,
      idBranches,
      isVerified
    });

    await newEmployee.save();

    //Generar codigo aleatorio
    const verficationCode = crypto.randomBytes(3).toString("hex");

    //Guardamos el codigo en un token
    const tokenCode = jsonwebtoken.sign(
      //Que guardamos?
      { email, verficationCode },
      //Secret key
      config.JWT.secret,
      //Cuando expira?
      { expiresIn: "15m" },
    );

    res.cookie("verificationTokenCookie", tokenCode, {
      maxAge: 15 * 60 * 1000,
    });

    //Envio de correo electronico
    //Transporter -> Quien envia el correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email.user_mail,
        pass: config.email.user_password,
      },
    });

    //Quien lo va a recibir
    const mailOptions = {
      from: config.email.user_mail,
      to: email,
      subject: "Verficación de cuenta",
      text:
        "Para verificar tu cuenta, utiliza este código " +
        verficationCode +
        " expira en 15 minutos",
    };

    //Enviar el correo electronico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error " + error);
        return res.status(500).json({ message: "Error" });
      }

      res.status(200).json({ message: "Email sent" });
    });
  } catch (error) {
    console.log("error " + error)
    return res.status(500).json({message:"Internal Server Error"})
  }
};

registerEmployeeController.verifyCode = async (req, res) => {
  try {
    //Solicitamos el codigo que el usuario recibió en el frontend
    const { verficationCodeRequest } = req.body

    //Obtener el token de la cookie
    const token = req.cookies.verificationTokenCookie;

    //Extraer la informacion del token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret)
    const {email, verficationCode: storedCode} = decoded;

    //Comparamos el token que el usuario recibio en el frontend con el que esta guardado
    if(verficationCodeRequest !== storedCode){
      return res.status(400).json({message:"Invalid code"});
    }

    //Si el codigo esta bien, se coloca el campo de isVerified a true
    const customer = await employeeModelModel.findOne({ email });
    customer.isVerified = true
    await customer.save();

    res.clearCookie("verificationTokenCookie")

    res.json({message:"Email verified successfully"});
  } catch (error) {
    console.log("error " + error)
    return res.status(500).json({message: "Internal Server Error"})
  }
}

export default registerEmployeeController;
