import api from "./api";

// Add User
export const addUser = (user) => {
  return api.post(
    "/admin/register",
    user,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

// Delete User
export const deleteUser = (userId) => {
  return api.delete(
    `/admin/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

// Fetch Users
export const fetchUsers = () => {
  return api.get(
    "/admin/users",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
