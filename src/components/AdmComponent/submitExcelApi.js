import infatecFetch from "../../axios/config";
import { toast } from "react-toastify";

export const createCourse = async (excel) => {
    const formData = new FormData();
    
    formData.append('file', excel);
  
    try {
      const token = sessionStorage.getItem('bearer');
      await infatecFetch.post('/api/Courses/InsertNewCourseByXLSX', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      toast.success("Cursos enviados com sucesso")
      console.log(formData);
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível enviar os cursos")
    }
  };