const employeeController = {};

import employeeModel from "../models/employee.js";

employeeController.getEmployees = async (req, res) => {
  const employees = await employeeModel.find();
  res.json(employees);
};

employeeController.insertEmployees = async (req, res) => {
  const { name, lastName, salaty, DUI, phone, email, password, idBranches } =
    req.body;

  const newEmployee = new employeeModel({
    name,
    lastName,
    salaty,
    DUI,
    phone,
    email,
    password,
    idBranches,
  });

  await newEmployee.save();

  res.json({ message: "Employee saved" });
};

employeeController.deleteEmployee = async (req, res) => {
  await employeeModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted" });
};

employeeController.updateEmployee = async (req, res) => {
  const { name, lastName, salary, DUI, phone, email, password, idBranches } =
    req.body;

  await employeeModel.findByIdAndUpdate(req.params.id, {
    name,
    lastName,
    salary,
    DUI,
    phone,
    email,
    password,
    idBranches,
  },
  { new: true }
);

  res.json({message:"Employee updated"});
};

export default employeeController;