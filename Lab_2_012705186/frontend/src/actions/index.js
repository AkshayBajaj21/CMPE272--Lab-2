export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_COURSES = 'GET_COURSES';

export function afterlogin(data) {
  console.log("userdata in action index.js is " , data)
    return {
        type : GET_USER,
        payload : data
    }
};

export function updateUser(data) {

  return {
      type : UPDATE_USER,
      payload : data
  }
};

export function getCourses(data) {
  console.log("userdata in action getCourses is " , data)
  return {
      type : GET_COURSES,
      payload : data
  }
};