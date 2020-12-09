import fs from 'fs';
import path from 'path';
import memoize from 'nano-memoize';

export const getAccessTokenCert = memoize(() =>
  fs.readFileSync(path.join(process.env.HOME, '.ssh/id_rsa'), 'utf8'),
);
export const getAccessTokenCertPub = memoize(() =>
  fs.readFileSync(path.join(process.env.HOME, '.ssh/public.pem'), 'utf8'),
);

export const getRefreshTokenCert = memoize(() =>
  fs.readFileSync(path.join(process.env.HOME, '.ssh/id_rsa'), 'utf8'),
);

export const getRefreshTokenCertPub = memoize(() =>
  fs.readFileSync(path.join(process.env.HOME, '.ssh/public.pem'), 'utf8'),
);

export const getResetPWTokenCert = memoize(() =>
  fs.readFileSync(path.join(process.env.HOME, '.ssh/id_rsa'), 'utf8'),
);

export const getResetPWTokenCertPub = memoize(() =>
  fs.readFileSync(path.join(process.env.HOME, '.ssh/public.pem'), 'utf8'),
);
