import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

export const verifyToken = async <T extends { [key: string]: any }>({
  token,
  certPub,
  options,
}: {
  token: string;
  certPub: string;
  options?: jwt.VerifyOptions;
}): Promise<T> => {
  try {
    const decodedPayload = jwt.verify(token, certPub, {
      algorithms: [process.env.JWT_ALGORITHM as any],
      issuer: process.env.SERVER_NAME,
      complete: true,
      ...options,
    })['payload'];
    return decodedPayload;
  } catch (error) {
    throw new AuthenticationError(error?.name);
  }
};
