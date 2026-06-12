import { useEffect, useState } from "react";
import api from "../api/axios";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [formData, setFormData] = useState({
    customerId: "",
    amount: "",
  });

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      setOrders(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers");
      setCustomers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async () => {
    try {
      if (!formData.customerId || !formData.amount) {
        alert("Please select customer and amount");
        return;
      }

      await api.post("/orders", {
        customerId: formData.customerId,
        amount: Number(formData.amount),
      });

      setFormData({
        customerId: "",
        amount: "",
      });

      fetchOrders();

      alert("Order Created Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to create order");
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchCustomers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Orders
      </h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            className="border p-3 rounded"
            value={formData.customerId}
            onChange={(e) =>
              setFormData({
                ...formData,
                customerId: e.target.value,
              })
            }
          >
            <option value="">
              Select Customer
            </option>

            {customers.map((customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Order Amount"
            className="border p-3 rounded"
            value={formData.amount}
            onChange={(e) =>
              setFormData({
                ...formData,
                amount: e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={createOrder}
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Create Order
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">
                Amount
              </th>

              <th className="p-3 text-left">
                Customer
              </th>

              <th className="p-3 text-left">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b"
              >
                <td className="p-3">
                  ₹{order.amount}
                </td>

                <td className="p-3">
                  {order.customer?.name}
                </td>

                <td className="p-3">
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;