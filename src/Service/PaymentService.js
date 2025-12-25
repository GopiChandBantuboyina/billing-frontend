import api from "./api";

export const createRazorpayOrder = (data) => {
  return api.post(
    "/payments/create-order",
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

export const verifyPayment = (paymentData) => {
  return api.post(
    "/payments/verify",
    paymentData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};
