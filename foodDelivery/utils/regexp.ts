/* eslint-disable no-useless-escape */

export const checkEmail = (email: string) => {
  return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
    email,
  );
};

/** 비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상, 50자 이하 */
export const checkPassword = (password: string) => {
  return /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password);
};
