import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {  ///to add saltrounds
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const isPasswordValid = await bcrypt.compare(password, hash);
  return isPasswordValid;
};
