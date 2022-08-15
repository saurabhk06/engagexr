import { Request, Response } from 'express';
import { StatusConstants } from '../constants/StatusConstants';
import Company from '../models/company.model';
import Employee from '../models/employee.model';

export const createEmployee = async (req: Request, res: Response) => {
  const { companyId, firstName, lastName, email, phone } = req.body;

  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(StatusConstants.CODE_400).json({
        msg: "Company doesn't exists. Please try with valid company id!!!",
      });
    }

    const employeeInDB = await Employee.findOne({ where: { email: email } });
    if (employeeInDB) {
      return res.status(StatusConstants.CODE_400).json({
        error: 'Employee already exists with the same email id.',
      });
    }
    const employee = await Employee.create({
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(companyId && { cmpId: companyId }),
    });

    return res.status(StatusConstants.CODE_201).json({
      msg: 'Employee created successfully',
      data: employee,
    });
  } catch (err) {
    return res
      .status(StatusConstants.CODE_500)
      .json({ msg: 'Error! Try after sometime.' });
  }
};

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employeeList = await Employee.findAll();
    return res.status(StatusConstants.CODE_200).json({ data: employeeList });
  } catch (err) {
    return res
      .status(StatusConstants.CODE_500)
      .json({ msg: 'Error! Try after sometime.' });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const empId = req.params.employeeId;

  try {
    const employee = await Employee.findByPk(empId);
    if (!employee) {
      return res.status(StatusConstants.CODE_200).json({
        msg: "Employee doesn't exists. Please try with valid employeeId!!!",
      });
    }
    return res.status(StatusConstants.CODE_200).json({ data: employee });
  } catch (err) {
    return res
      .status(StatusConstants.CODE_500)
      .json({ msg: 'Error! Try after sometime.' });
  }
};

export const getEmployeeByCompanyId = async (req: Request, res: Response) => {
  const cmpId = req.params.companyId;

  try {
    const company = await Company.findByPk(cmpId);
    if (!company) {
      return res.status(StatusConstants.CODE_400).json({
        msg: "Company doesn't exists. Please try with valid company id!!!",
      });
    }

    const employeeList = await company.$get('employees');
    return res.status(StatusConstants.CODE_200).json({
      data: employeeList,
    });
  } catch (err) {
    return res.status(StatusConstants.CODE_500).json({
      error: 'Error! Try again later.',
    });
  }
};

// TODO: UPDATE COMPANY ID
export const updateEmployeeById = async (req: Request, res: Response) => {
  const empId = req.params.employeeId;
  const { firstName, lastName, email, phone } = req.body;

  try {
    const employee = await Employee.findByPk(empId);
    if (!employee) {
      return res.status(StatusConstants.CODE_400).json({
        error: "Employee doesn't exists. Please try with valid employeeId.",
      });
    }

    // Check if company with same email exist.
    if (email) {
      const duplicateEmployee = await Employee.findOne({
        where: { email: email },
      });
      if (duplicateEmployee) {
        return res.status(StatusConstants.CODE_400).json({
          error: 'Email cannot be updated. Employee with same email exist!!!. ',
        });
      }
    }

    employee.set({
      ...(firstName && { firstName }),
      ...(lastName && { lastName }),
      ...(email && { email }),
      ...(phone && { phone }),
    });
    const result = await employee.save();

    return res
      .status(StatusConstants.CODE_200)
      .json({ msg: 'Employee updated successfully', data: result });
  } catch (err) {
    return res
      .status(StatusConstants.CODE_500)
      .json({ msg: 'Error! Try after sometime.' });
  }
};

export const deleteEmployeeById = async (req: Request, res: Response) => {
  const empId = req.params.employeeId;

  try {
    const employee = await Employee.findByPk(empId);
    if (!employee) {
      return res.status(StatusConstants.CODE_400).json({
        error: "Employee doesn't exists. Please try with valid employeeId.",
      });
    }

    const result = await employee.destroy();
    return res
      .status(StatusConstants.CODE_200)
      .json({ msg: 'Employee deleted successfully', data: result });
  } catch (err) {
    return res
      .status(StatusConstants.CODE_500)
      .json({ msg: 'Error! Try after sometime.' });
  }
};
