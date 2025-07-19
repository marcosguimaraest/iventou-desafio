import * as bcrypt from 'bcryptjs';

export function hash(password: string, salt: number = 10): Promise<string> {
  return bcrypt.hash(password, salt);
}
