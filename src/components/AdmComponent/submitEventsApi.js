import infatecFetch from "../../axios/config";
import { toast } from "react-toastify";


export const createEvent = async (title, description, imageFile) => {
  
    const formData = new FormData();
  
    formData.append('title', title);
    formData.append('description', description);
    formData.append('imageFile', imageFile);
    formData.append('imageName', 'teste');
    formData.append('imgUri', '');
  
    try {
      const token = sessionStorage.getItem('bearer');
      await infatecFetch.post('/api/Events/InsertNewEvent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      toast.success("Evento enviado com sucesso")
    } catch (error) {
      console.error(error);
      toast.error("Falha ao enviar o evento")
    }
  };
  