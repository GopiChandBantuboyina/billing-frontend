// Make Calls to the backend server
import axios from "axios";

// Add Item POST call
export const addItem = async (item) => {
  return await axios.post(
    "http://localhost:8080/api/v1.0/admin/items",
    item,
    {
      headers : {'Authorization' : `Bearer ${localStorage.getItem('token')}`}
    }
  );
};

//Delete item API DELETE call
export const deleteItem = async (itemId) => {
  return await axios.delete(
    `http://localhost:8080/api/v1.0/admin/items/${itemId}`
    ,
    {
      headers : {'Authorization' : `Bearer ${localStorage.getItem('token')}`}
    }
  );
};

//Read items GET call
export const fetchItems = async () => {
  return await axios.get("http://localhost:8080/api/v1.0/items",
    {
      headers : {'Authorization' : `Bearer ${localStorage.getItem('token')}`}
    }
  );
};
