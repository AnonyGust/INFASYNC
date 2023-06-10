import infatecFetch from "../../../axios/config";
import { toast } from "react-toastify";

export const deleteCourses = async () => {
  try {
    const token = sessionStorage.getItem('bearer');
    await infatecFetch.delete('/api/Courses/DeleteAllCourses', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    toast.success("Cursos deletados com sucesso");
    console.log("")
  } catch (error) {
    console.error(error);
    toast.error("Não foi possível deletar os cursos");
  }
};
