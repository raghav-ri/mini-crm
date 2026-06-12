import { useEffect, useState } from "react";
import api from "../api/axios";

function CustomersPage() {
  const [customers, setCustomers] =
    useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const fetchCustomers = async () => {
    try {
      const response =
        await api.get("/customers");

      setCustomers(
        response.data.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createCustomer =
    async (e) => {
      e.preventDefault();

      try {
        await api.post(
          "/customers",
          form
        );

        setForm({
          name: "",
          email: "",
          phone: "",
          city: "",
        });

        fetchCustomers();
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Customers
      </h1>

      <form
        onSubmit={createCustomer}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className="border p-2 rounded"
          />

          <input
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city: e.target.value,
              })
            }
            className="border p-2 rounded"
          />
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Create Customer
        </button>
      </form>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Email
              </th>

              <th className="p-3 text-left">
                City
              </th>

              <th className="p-3 text-left">
                Total Spent
              </th>
            </tr>
          </thead>

          <tbody>
            {customers.map(
              (customer) => (
                <tr
                  key={customer.id}
                  className="border-b"
                >
                  <td className="p-3">
                    {customer.name}
                  </td>

                  <td className="p-3">
                    {customer.email}
                  </td>

                  <td className="p-3">
                    {customer.city}
                  </td>

                  <td className="p-3">
                    ₹
                    {
                      customer.totalSpent
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomersPage;