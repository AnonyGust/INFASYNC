import infatecFetch from "../../axios/config";
import { toast } from "react-toastify";

export const sendEmail = async (email) => {

  const dados = {
    body: "este é seu código: ",
    email: email
    
  };
  console.log(dados)
  try {
      
    const response = await infatecFetch.post(`/api/ForgotPassword/SendEmail/2`, dados, {
    });
    toast.success('enviado código para o email com sucesso')
    console.log(response)
    return response.data; // Retorne a resposta da requisição, se necessário
  } catch (error) {
    toast.error('erro ao enviar código')
    console.error(error);
    return []; // Retorne um array vazio em caso de erro
  }
};
