import { Request, Response } from 'express';
import { StatusConstants } from '../constants/StatusConstants';
import Company from '../models/company.model';
import { logger } from '../utils/logger';

export const createCompany = async (req: Request, res: Response) => {
  logger.info('createCompany controller started');

  const { name, email, phone, website } = req.body;

  try {
    const companyInDB = await Company.findOne({ where: { email: email } });
    if (companyInDB) {
      return res.status(StatusConstants.CODE_400).json({
        error:
          'Company already exists with the email id. Please try with different one.',
      });
    }

    const company = await Company.create({
      ...(name && { name }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(website && { website }),
    });
    return res.status(StatusConstants.CODE_201).json({
      msg: 'company created successfully',
      data: company,
    });
  } catch (err: any) {
    return res.status(StatusConstants.CODE_500).json({
      error: 'Error! Try again later.',
    });
  }
};

export const getAllCompanies = async (req: Request, res: Response) => {
  logger.info('getAllCompanies controller started');

  try {
    const companyList = await Company.findAll();
    return res.status(StatusConstants.CODE_200).json({ data: companyList });
  } catch (err) {
    return res.status(StatusConstants.CODE_500).json({
      error: 'Error! Try again later.',
    });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  logger.info('getCompanyById controller started');

  const cmpId = req.params.companyId;

  try {
    const company = await Company.findByPk(cmpId);
    if (!company) {
      return res.status(StatusConstants.CODE_400).json({
        msg: "Company doesn't exists. Please try with valid companyId!!!",
      });
    }

    return res.status(StatusConstants.CODE_200).json({ data: company });
  } catch (err) {
    return res.status(StatusConstants.CODE_500).json({
      error: 'Error! Try again later.',
    });
  }
};

export const updateCompanyById = async (req: Request, res: Response) => {
  logger.info('updateCompanyById controller started');

  const companyId = req.params.companyId;
  const { name, email, phone, website } = req.body;

  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(StatusConstants.CODE_400).json({
        error: "Company doesn't exists. Please try with valid companyId.",
      });
    }

    // Check if company with same email exist.
    if (email) {
      const duplicateCompany = await Company.findOne({
        where: { email: email },
      });
      if (duplicateCompany) {
        return res.status(StatusConstants.CODE_400).json({
          error: 'Email cannot be updated. Company with same email exist!!!. ',
        });
      }
    }

    company.set({
      ...(name && { name }),
      ...(email && { email }),
      ...(phone && { phone }),
      ...(website && { website }),
    });
    const result = await company.save();
    return res
      .status(StatusConstants.CODE_200)
      .json({ msg: 'Company updated successfully', data: result });
  } catch (err) {
    return res.status(StatusConstants.CODE_500).json({
      error: 'Error! Try again later.',
    });
  }
};

export const deleteCompanyById = async (req: Request, res: Response) => {
  logger.info('deleteCompanyById controller started');

  const companyId = req.params.companyId;

  try {
    const company = await Company.findByPk(companyId);
    if (!company) {
      return res.status(StatusConstants.CODE_400).json({
        error: "Company doesn't exists. Please try with valid companyId.",
      });
    }
    const empCount = await company?.$count('employees');
    if (empCount > 0) {
      return res.status(StatusConstants.CODE_400).json({
        error: 'Employee still exist in this company!!',
      });
    }
    await company.destroy();
    return res
      .status(StatusConstants.CODE_200)
      .json({ msg: 'Company deleted successfully' });
  } catch (err) {
    return res.status(StatusConstants.CODE_500).json({
      error: 'Error! Try again later.',
    });
  }
};
