import infatecFetch from "../../axios/config";

export const editCourses = async (cursoSelecionado, formData) => {
  try {
    const token = sessionStorage.getItem('bearer');
      
    const response = await infatecFetch.put(`/api/Courses/UpdateCourse/2`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data; // Retorne a resposta da requisição, se necessário
  } catch (error) {
    console.error(error);
    return []; // Retorne um array vazio em caso de erro
  }
};
