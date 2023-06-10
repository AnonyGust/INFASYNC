import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import infatecFetch from '../../../axios/config';

export async function createUser(ra, name, email, password, selectedCourseId) {
    try {
      const data = {
        ra: ra,
        name: name,
        email: email,
        password: password,
        type: 1,
        coursesId: selectedCourseId,
        cpf: '11111111113',
      };
      console.log(data)
      const response = await infatecFetch.post('/api/Login/CreateUser', data);
      toast.success('Cadastrado com sucesso');
      console.log(response.data);
  
      // Faça o que precisar com a resposta do servidor, como armazenar o token de autenticação
  
    } catch (error) {
      console.error(error);
      // Trate os erros adequadamente
      toast.error('Não foi possível criar o usuário');
    }
  }

