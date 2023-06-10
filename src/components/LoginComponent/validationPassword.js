import { toast } from 'react-toastify';

export const validatePassword = (password) => {
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (!uppercaseRegex.test(password)) {
    toast.error('A senha deve conter pelo menos um caractere maiúsculo.');
    return false;
  }

  if (!lowercaseRegex.test(password)) {
    toast.error('A senha deve conter pelo menos um caractere minúsculo.');
    return false;
  }

  if (!numberRegex.test(password)) {
    toast.error('A senha deve conter pelo menos um número.');
    return false;
  }

  if (!specialCharRegex.test(password)) {
    toast.error('A senha deve conter pelo menos um caractere especial.');
    return false;
  }

  return true;
};
