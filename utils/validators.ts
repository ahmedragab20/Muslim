// email validation
export const validateEmail = (email: string): boolean => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
// password validation
export const validatePassword = (password: string): boolean => {
  // at least 8 characters long, contain one uppercase letter, one lowercase, one number and one special character
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
  return re.test(password);

  //TEST:: 12345678aA@
};

// url validation
export const validateUrl = (url: string): boolean => {
  const re = /^(ftp|http|https):\/\/[^ "]+$/;
  return re.test(url);
};

export const isCDNUrl = (url: string): boolean => {
  const cdnRegex = /^(https?:\/\/)?(?:[a-z]+\.)?(?:cdn\.)[^\s/$.?#].[^\s]*$/i;
  return cdnRegex.test(url);
};
