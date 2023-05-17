import infatecFetch from "../../axios/config";

export const getCurses = async () => {
  try {
    const token = sessionStorage.getItem('bearer');
    const response = await infatecFetch.get('/api/Courses/GetAllCourses', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const courses = response.data.data;
    const courseNames = courses.map(course => course.name);

    console.log('Course Names:', courseNames);

    return courseNames;
  } catch (error) {
    console.error(error);
    return [];
  }
};
