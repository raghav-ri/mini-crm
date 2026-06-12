import { Link } from "react-router-dom";

function DashboardPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Xeno AI CRM
      </h1>

      <div className="grid grid-cols-2 gap-6">
        <Link
          to="/customers"
          className="bg-white p-6 rounded shadow"
        >
          <h2 className="text-2xl font-bold">
            Customers
          </h2>

          <p>
            Manage customer records
          </p>
        </Link>

        <Link
          to="/orders"
          className="bg-white p-6 rounded shadow"
        >
          <h2 className="text-2xl font-bold">
            Orders
          </h2>

          <p>
            View customer orders
          </p>
        </Link>

        <Link
          to="/segments"
          className="bg-white p-6 rounded shadow"
        >
          <h2 className="text-2xl font-bold">
            Segments
          </h2>

          <p>
            Audience segmentation
          </p>
        </Link>

        <Link
          to="/campaigns"
          className="bg-white p-6 rounded shadow"
        >
          <h2 className="text-2xl font-bold">
            Campaigns
          </h2>

          <p>
            Marketing campaigns
          </p>
        </Link>
      </div>
    </div>
  );
}

export default DashboardPage;