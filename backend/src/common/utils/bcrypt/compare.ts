import * as bcrypt from 'bcryptjs';

export function compare(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
