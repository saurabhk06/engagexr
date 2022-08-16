import { Request, Response } from 'express';
import { StatusConstants } from '../constants/StatusConstants';
import User from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { encryptPassword } from '../utils/securePassword';
import jwt from 'jsonwebtoken';
import { Auth } from '../types/custom';
import { logger } from '../utils/logger';

/**
 * This controller is used to do signup.
 *
 * @param req
 * @param res
 * @returns
 */
export const signup = async (req: Request, res: Response) => {
  logger.info('signup controller started');

  const { firstName, lastName, email, password, role } = req.body;

  const salt: string = uuidv4();
  const encrypt_password: string = encryptPassword(password, salt);

  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(StatusConstants.CODE_400).json({
        error: 'Email id already exists.',
      });
    }

    await User.create({
      firstName,
      lastName,
      email,
      ...(role && { role }),
      salt,
      encrypt_password,
    });

    return res
      .status(StatusConstants.CODE_200)
      .json({ msg: 'User created successfully.' });
  } catch (err) {
    res.status(StatusConstants.CODE_500).json({
      error: 'Error! Try again later.',
    });
  }
};

/**
 * This method is used to perform sigin operation.
 *
 * @param req
 * @param res
 * @returns
 */
export const signin = async (req: Request, res: Response) => {
  logger.info('signin controller ended');

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(StatusConstants.CODE_400).json({
        error: 'User does not exists.',
      });
    }

    //verify password
    if (encryptPassword(password, user.salt) !== user.encrypt_password) {
      return res.status(StatusConstants.CODE_401).json({
        error: 'Email and password do not match.',
      });
    }

    const authPayload: Auth = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      id: user.id!,
      name: user.firstName,
      email: user.email,
      role: user.role,
    };
    //Create token if email and password are correct
    const token: string = jwt.sign(authPayload, process.env.SECRET!, {
      expiresIn: '1h',
    });

    const { id, firstName, email: mailId, role } = user;

    return res.status(StatusConstants.CODE_200).json({
      token,
      id,
      firstName,
      mailId,
      role,
    });
  } catch (err: any) {
    res.status(StatusConstants.CODE_500).json({
      error: 'Error! Try again later.',
    });
  }
};
