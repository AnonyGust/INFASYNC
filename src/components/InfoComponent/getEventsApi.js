import infatecFetch from "../../axios/config";

export const getEvents = async () => {
  try {
    const token = sessionStorage.getItem('bearer');
    const response = await infatecFetch.get('/api/Events/GetEvents', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const events = response.data.data;


    // Faça o processamento adicional necessário com os eventos obtidos

    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};
