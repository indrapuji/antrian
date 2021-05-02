import { verify } from 'jsonwebtoken';

export default (token: any) => {
  if (!token) return false;
  const tokenSecret = process.env.TOKEN_SECRET || '';
  const data = verify(token, tokenSecret);
  return data;
};
