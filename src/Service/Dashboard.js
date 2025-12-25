import api from "./api";

export const fetchDashboardData = () => {
  return api.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
