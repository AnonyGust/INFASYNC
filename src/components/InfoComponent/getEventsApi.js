import infatecFetch from "../../axios/config";

export const getEvents = async () => {
  try {
    const token = sessionStorage.getItem('bearer');
    const response = await infatecFetch.get('/api/Events/GetEventById/13', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const events = response.data.data;
    console.log(events);

    // Faça o processamento adicional necessário com os eventos obtidos

    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};
