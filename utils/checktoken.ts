/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { verify } from 'jsonwebtoken';

export default (token: any) => {
  if (!token) return false;
  const tokenSecret = process.env.TOKEN_SECRET || '';
  const data = verify(token, tokenSecret);
  return data;
};
