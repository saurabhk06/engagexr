import { body, check, param } from 'express-validator';

export const signupSanitize = [
  check('firstName', 'firstName cannot be empty.').not().isEmpty(),
  check('lastName', 'lastName cannot be empty.').not().isEmpty(),
  body('email', 'Please provide a valid email').isEmail().normalizeEmail(),
  check('password', 'password cannot be empty.').not().isEmpty(),
];

export const signinSanitize = [
  body('email', 'Please provide a valid email').isEmail().normalizeEmail(),
  check('password', 'password cannot be empty.').not().isEmpty(),
];

export const createCompanySanitize = [
  check('name', 'name cannot be empty.').not().isEmpty(),
  body('email', 'Please provide a valid email').isEmail().normalizeEmail(),
];

export const companyIdSanitize = [
  param('companyId', 'CompanyId is not valid').exists().isInt(),
];

export const createEmployeeSanitize = [
  check('companyId', 'CompanyId cannot be empty.').not().isEmpty(),
  check('companyId', 'CompanyId must be an Integer.').isInt(),
  check('firstName', 'firstName cannot be empty.').not().isEmpty(),
  check('lastName', 'lastName cannot be empty.').not().isEmpty(),
  body('email', 'Please provide a valid email').isEmail().normalizeEmail(),
];

export const employeeIdSanitize = [
  param('employeeId', 'EmployeeId is not valid').exists().isInt(),
];
