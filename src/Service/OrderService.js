import api from "./api";

export const latestOrders = () => {
  return api.get(
    "/orders/latest",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const createOrder = (order) => {
  return api.post(
    "/orders",
    order,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const deleteOrder = (id) => {
  return api.post(
    `/orders/${id}`,
    null,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
