import infatecFetch from "../../axios/config";

export const getCourses = async () => {
    try {
      const token = sessionStorage.getItem('bearer');
      const response = await infatecFetch.get('/api/Courses/GetAllCourses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      const courses = response.data.data.map((course) => ({
       Curso: course.matter,
       Id: course.id,
      }));
      console.log(courses)
      return courses;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
