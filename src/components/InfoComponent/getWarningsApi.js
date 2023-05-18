import infatecFetch from "../../axios/config";

export const getWarnings = async () => {
  try {
    const token = sessionStorage.getItem('bearer');
    const response = await infatecFetch.get('/api/Warnings/GetAllWarnings', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const warnings = response.data.data;
    console.log(warnings);

    // Faça o processamento adicional necessário com os eventos obtidos

    return warnings;
  } catch (error) {
    console.error(error);
    return [];
  }
};