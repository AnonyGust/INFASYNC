import { toast } from "react-toastify";
import infatecFetch from "../../../axios/config";


export const resetPassword = async (email, password) => {
  try {
    const data = {
      email: email,
      password: password,
    };
    console.log(data)

    const token = sessionStorage.getItem('bearer');
      
    const response = await infatecFetch.put('/api/ForgotPassword/NewPassword', data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(response);
    toast.success("Senha redefinida com sucesso.")
    return response; // Retorne a resposta da requisição, se necessário
    

  } catch (error) {
    toast.error("Falha ao redefinir senha.")
    console.error(error);
    return []; // Retorne um array vazio em caso de erro
  }
};
