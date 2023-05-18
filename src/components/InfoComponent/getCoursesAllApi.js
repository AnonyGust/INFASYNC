import infatecFetch from "../../axios/config";

export const getAllCourses = async () => {
  try {
    const token = sessionStorage.getItem('bearer');
    const response = await infatecFetch.get('/api/Courses/GetAllCourses', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const courses = response.data.data;
    console.log(courses);

    // Faça o processamento adicional necessário com os eventos obtidos

    return courses;
  } catch (error) {
    console.error(error);
    return [];
  }
};
