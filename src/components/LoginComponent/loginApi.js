import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import infatecFetch from '../../axios/config';

export async function loginUser(email, password, navigate) {


  try {
    const data = {
      email: email,
      password: password,

      
    };
    const response = await infatecFetch.post('/api/Login/LoginUser', data);
    const token = response.data.bearer; // obter o token a partir da resposta da API
    sessionStorage.setItem('bearer', token); // armazenar o token na sessionStorage
    console.log(sessionStorage)

    await toast.promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('Login realizado com sucesso');
        }, 3000); // Tempo de exibição do toast em milissegundos
      }),
      {
        pending: 'Realizando login...',
        success: 'Login realizado com sucesso',
        error: 'Não foi possível realizar login',
      }
    );

    console.log(response.data);
    navigate('/adm');

    
  } catch (error) {
    console.error(error);
    // Trate os erros adequadamente
    toast.error('Não foi possível realizar login');
  }
}
