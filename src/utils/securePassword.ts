import crypto from 'crypto';

/**
 * This utitily method is used to encrypt the password sent.
 * @param plainpassword
 * @param salt
 * @returns
 */
export const encryptPassword = (
  plainpassword: string,
  salt: string
): string => {
  if (!plainpassword) {
    return '';
  }

  return crypto.createHmac('sha256', salt).update(plainpassword).digest('hex');
};
