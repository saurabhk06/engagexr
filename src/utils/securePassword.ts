import crypto from 'crypto';

export const encryptPassword = (
  plainpassword: string,
  salt: string
): string => {
  if (!plainpassword) {
    return '';
  }

  return crypto.createHmac('sha256', salt).update(plainpassword).digest('hex');
};
