// Make Calls to the backend server
import axios from "axios";

// Add Category POST call
export const addCategory = async (category) => {
  return await axios.post(
    "http://localhost:8080/api/v1.0/admin/categories",
    category,
    {
      headers : {'Authorization' : `Bearer ${localStorage.getItem('token')}`}
    }
  );
};

//Delete Category DELETE call
export const deleteCategory = async (categoryId) => {
  return await axios.delete(
    `http://localhost:8080/api/v1.0/admin/categories/${categoryId}`
    ,
    {
      headers : {'Authorization' : `Bearer ${localStorage.getItem('token')}`}
    }
  );
};

//Read categories GET call
export const fetchCategories = async () => {
  return await axios.get("http://localhost:8080/api/v1.0/categories",
    {
      headers : {'Authorization' : `Bearer ${localStorage.getItem('token')}`}
    }
  );
};
