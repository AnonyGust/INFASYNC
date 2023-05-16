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
    const courseOptions = courses.map(course => ({
      label: course.name,
      value: course.id
    }));

    console.log('Course Options:', courseOptions);

    return courseOptions;
  } catch (error) {
    console.error(error);
    return [];
  }
};
