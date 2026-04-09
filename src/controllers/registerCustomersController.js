import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import customerModel from "../models/customers.js";

import { config } from "../config.js";

const registerCustomersController = {};

registerCustomersController.post = async (req, res) => {
  try {
    //Solicitar todos los datos a guardar
    const {
      name,
      lastName,
      birthdate,
      email,
      password,
      isVerified,
      loginAttempts,
      timeout,
    } = req.body;

    //Verificamos si el correo ya esta registrado
    const existsCustomer = await customerModel.findOne({ email });
    if (existsCustomer) {
      return res.status(400).json({ message: "Email already in use" });
    }

    //Encriptar la contra
    const passwordHash = await bcryptjs.hash(password, 10);

    //Guardamos todo en la base
    const newCustomer = new customerModel({
      name,
      lastName,
      birthdate,
      email,
      password: passwordHash,
      isVerified,
      loginAttempts,
      timeout,
    });

    await newCustomer.save();

    //Generar codigo aleatorio
    const verficationCode = crypto.randomBytes(3).toString("hex")

    //Guardamos el codigo en un token
    const tokenCode = jsonwebtoken.sign(
        //Que guardamos?
        {email, verficationCode},
        //Secret key
        config.JWT.secret,
        //Cuando expira?
        {expiresIn: "15m"}
    );

    res.cookie("verificationTokenCookie", tokenCode, {maxAge: 15 * 60 * 1000})

  } catch (error) {}
};
