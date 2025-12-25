import api from "./api";

// Add Item POST call
export const addItem = (item) => {
  return api.post(
    "/admin/items",
    item,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

// Delete Item DELETE call
export const deleteItem = (itemId) => {
  return api.delete(
    `/admin/items/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

// Read Items GET call
export const fetchItems = () => {
  return api.get(
    "/items",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
