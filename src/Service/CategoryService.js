import api from "./api";

// Add Category POST call
export const addCategory = (category) => {
  return api.post(
    "/admin/categories",
    category,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

// Delete Category DELETE call
export const deleteCategory = (categoryId) => {
  return api.delete(
    `/admin/categories/${categoryId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

// Read categories GET call
export const fetchCategories = () => {
  return api.get(
    "/categories",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
