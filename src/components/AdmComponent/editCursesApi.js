import infatecFetch from "../../axios/config";
import { toast } from "react-toastify";
export const editCourses = async (idCourse, nomeCurso, materia, andar, nomeProfessor) => {

  const dados = {
    id: idCourse,
    name: nomeCurso,
    period: "string",
    matter: materia,
    start: "30/12/1899 12:00",
    end: "30/12/1899 12:00",
    floor: andar,
    coordinator: nomeProfessor
  };
  try {
    const token = sessionStorage.getItem('bearer');
      
    const response = await infatecFetch.put(`/api/Courses/UpdateCourse`, dados, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    toast.success('curso editado com sucesso')
    return response.data; // Retorne a resposta da requisição, se necessário
  } catch (error) {
    toast.error('erro ao editar curso')
    console.error(error);
    return []; // Retorne um array vazio em caso de erro
  }
};
