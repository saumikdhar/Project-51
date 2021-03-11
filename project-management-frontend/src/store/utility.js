export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const backendUrl = () => {
  return process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://project-management-001-backend.herokuapp.com/';
};
