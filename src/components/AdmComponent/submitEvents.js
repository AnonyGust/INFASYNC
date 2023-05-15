import infatecFetch from "../../axios/config";



export const createEvent = async (title, description, imageFile) => {
  
    const formData = new FormData();
  
    formData.append('title', title);
    formData.append('description', description);
    formData.append('imageFile', imageFile);
    formData.append('image_Uri', '');
  
    try {
      const token = sessionStorage.getItem('bearer');
      await infatecFetch.post('/api/Events/InsertNewEvent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };
  