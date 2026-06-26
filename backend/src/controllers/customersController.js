import customerModel from "../models/customers.js";

const customerController = {};

customerController.getCustomers = async (req, res) => {
  try {
    const customers = await customerModel.find();
    return res.status(200).json(customers);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

customerController.deleteCustomer = async (req, res) => {
  try {
    const deleted = await customerModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Customer Not Found" });
    }

    return res.status(200).json({ message: "Customer Deleted" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

customerController.putCustomer = async (req, res) => {
  try {
    let {
      name,
      lastName,
      birthdate,
      email,
      password,
      isVerified,
      loginAttempts,
      timeout,
    } = req.body;

    name = name?.trim();
    email = email?.trim();

    if (name.length < 3 || name.length > 15) {
      return res.status(400).json({ message: "Invalid name" });
    }

    const updatedCustomer = await customerModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        lastName,
        birthdate,
        email,
        password,
        isVerified,
        loginAttempts,
        timeout,
      }, {new: true}
    );

    if(!updatedCustomer){
        return res.status(404).json({message:"Customer Not Found"})
    }

    return res.status(200).json({message:"Customer updated"})
  } catch (error) {
    console.log("error" + error)
    return res.status(500).json({message:"Internal Server Error"})
  }
};

export default customerController
