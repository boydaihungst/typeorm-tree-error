import bcryptjs from 'bcryptjs';

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean | Error> {
  return new Promise((resolve, reject) => {
    bcryptjs.compare(
      plainPassword,
      hashedPassword,
      (err: Error, isMatch: boolean) => {
        if (err) {
          reject(err);
        }
        if (isMatch) {
          resolve(true);
        } else {
          resolve(false);
        }
      },
    );
  });
}
