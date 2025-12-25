import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import Menubar from "./components/Menubar/Menubar";

import Dashboard from "./pages/Dashboard/Dashboard";
import Explore from "./pages/Explore/Explore";
import ManageCategories from "./pages/ManageCategories/ManageCategories";
import ManageItems from "./pages/ManageItems/ManageItems";
import ManageUsers from "./pages/ManageUsers/ManageUsers";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import Login from "./pages/Login/Login";

import { Toaster } from "react-hot-toast";
import { AppContext } from "./context/AppContext";
import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  const { auth, loading } = useContext(AppContext);

  if (loading) return null;

  const ProtectedRoute = ({ element, allowedRoles }) => {
    if (!auth?.token) {
      return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(auth.role)) {
      return <Navigate to="/dashboard" replace />;
    }

    return element;
  };

  return (
    <div>
      {auth?.token && <Menubar />}
      <Toaster position="top-right" />

      <Routes>
        <Route
          path="/login"
          element={
            auth?.token ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />

        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />

        <Route
          path="/explore"
          element={<ProtectedRoute element={<Explore />} />}
        />

        <Route
          path="/orders"
          element={<ProtectedRoute element={<OrderHistory />} />}
        />

        <Route
          path="/category"
          element={
            <ProtectedRoute
              element={<ManageCategories />}
              allowedRoles={["ROLE_ADMIN"]}
            />
          }
        />

        <Route
          path="/items"
          element={
            <ProtectedRoute
              element={<ManageItems />}
              allowedRoles={["ROLE_ADMIN"]}
            />
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute
              element={<ManageUsers />}
              allowedRoles={["ROLE_ADMIN"]}
            />
          }
        />

        <Route
          path="/"
          element={
            auth?.token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
