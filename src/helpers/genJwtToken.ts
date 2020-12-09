import { Token } from '../modules/users/resolver/object-type/Token';
import jwt from 'jsonwebtoken';

export function genJwtToken({
  payload,
  cert,
  options,
}: {
  payload: Record<string, unknown>;
  cert: string;
  options?: jwt.SignOptions;
}): Token {
  const token = jwt.sign(
    payload,
    { key: cert, passphrase: '' },
    {
      algorithm: process.env.JWT_ALGORITHM as any,
      issuer: process.env.SERVER_NAME,
      ...options,
    },
  );
  const { iat, exp } = jwt.decode(token, { complete: true })['payload'];
  return { token, iat, exp };
}
