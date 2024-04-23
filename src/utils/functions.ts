export const validateLoginData = (email: string, password: string) => {
  let valid = false;
  const emailRejex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/;
  if (
    emailRejex.test(email) === true &&
    passwordRegex.test(password) === true
  ) {
    valid = true;
  }
  return valid;
};

export const validateSignUpData = (
  email: string,
  password: string,
  username: string
) => {
  let valid = false;
  const emailRejex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/;
  username = username.trim();
  if (
    emailRejex.test(email) &&
    passwordRegex.test(password) &&
    username.length > 3
  ) {
    valid = true;
  }
  return valid;
};
