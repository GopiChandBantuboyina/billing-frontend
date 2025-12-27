import { useEffect, useState } from "react";
import "./Dashboard.css";
import { fetchDashboardData } from "../../Service/Dashboard";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [data, setData] = useState({
    todaySales: 0,
    todayOrderCount: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchDashboardData();
        setData({
          todaySales: response.data.todaySales ?? 0,
          todayOrderCount: response.data.todayOrderCount ?? 0,
          recentOrders: response.data.recentOrders ?? [],
        });
      } catch (error) {
        console.log(error);
        toast.error("Unable to view the data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-currency-rupee"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Sales</h3>
              <p>₹{data.todaySales.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-cart-check"></i>
            </div>
            <div className="stat-content">
              <h3>Today's Orders</h3>
              <p>{data.todayOrderCount}</p>
            </div>
          </div>
        </div>

        <div className="recent-orders-card">
          <h3 className="recent-orders-title">
            <i className="bi bi-clock-history"></i> Recent Orders
          </h3>

          <div className="orders-table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>
                      No recent orders
                    </td>
                  </tr>
                ) : (
                  data.recentOrders.map((order) => (
                    <tr key={order.orderId}>
                      <td>{order.orderId.substring(0, 8)}...</td>
                      <td>{order.customerName}</td>
                      <td>₹{order.grandTotal.toFixed(2)}</td>
                      <td>
                        <span
                          className={`payment-method ${order.paymentMethod.toLowerCase()}`}
                        >
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${order.paymentDetails.status.toLowerCase()}`}
                        >
                          {order.paymentDetails.status}
                        </span>
                      </td>
                      <td>
                        {order.createdAt
                          ? new Date(order.createdAt + "Z").toLocaleString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                                timeZone: "Asia/Kolkata",
                              }
                            )
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
