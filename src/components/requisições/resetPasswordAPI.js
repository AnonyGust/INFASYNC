import { toast } from "react-toastify";
import infatecFetch from "../../axios/config";

export const resetPassword = async (email, password, code) => {
  try {
    const data = {  
      email: email,
      password: password,
    };
    console.log(data);
      
    const response = await infatecFetch.put(`/api/ForgotPassword/NewPassword/${code}`, data);
    console.log(response);
    toast.success("Senha redefinida com sucesso.");
    return response; // Retorne a resposta da requisição, se necessário

  } catch (error) {
    toast.error("Falha ao redefinir senha.");
    console.error(error);
    return []; // Retorne um array vazio em caso de erro
  }
};
