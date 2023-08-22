import * as bcrypt from 'bcryptjs';

const hashData = async (data: string) => {
  const saltRounds = +process.env.CRYPT_SALT || 10;
  return bcrypt.hash(data, saltRounds);
};

const compareData = async (data: string, hashData: string) => {
  return bcrypt.compare(data, hashData);
};

export { hashData, compareData };
