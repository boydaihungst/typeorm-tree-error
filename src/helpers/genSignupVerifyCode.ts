export async function generateSignUpVerifyCode() {
  let confirmCodeLength = +process.env.SIGN_UP_VERIFY_CODE_LENGTH;
  let count = 1;
  while (confirmCodeLength--) {
    count *= 10;
  }
  const generatedCode = Math.floor(Math.random() * count);
  return generatedCode;
}
