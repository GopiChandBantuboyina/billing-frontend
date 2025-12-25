import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../Service/CategoryService";
import { fetchItems } from "../Service/ItemService";

export const AppContext = createContext(null);

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export const AppContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [auth, setAuth] = useState({ token: null, role: null });
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  //For CartItems inside explore..
  const addToCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.name === item.name
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.itemId !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // ✅ 1. Restore auth on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role && !isTokenExpired(token)) {
      setAuth({ token, role });
    } else {
      localStorage.clear();
      setAuth({ token: null, role: null });
    }

    setLoading(false);
  }, []);

  // ✅ 2. Fetch data AFTER login / auth restore
  useEffect(() => {
    if (!auth.token) return;

    async function loadData() {
      try {
        const response = await fetchCategories();
        const itemResponse = await fetchItems();
        setCategories(response.data);
        setItems(itemResponse.data);
      } catch (err) {
        console.error(err);
      }
    }

    loadData();
  }, [auth.token]);

  const setAuthData = (token, role) => {
    setAuth({ token, role });
  };

  const clearCart = () => {
    setCartItems([]);
  }

  return (
    <AppContext.Provider
      value={{
        categories,
        setCategories,
        items,
        setItems,
        auth,
        setAuthData,
        loading,
        addToCart,
        cartItems,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
