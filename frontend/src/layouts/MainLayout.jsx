import { Link } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-slate-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-8">
          Xeno CRM
        </h1>

        <nav className="flex flex-col gap-4">
          <Link to="/">Dashboard</Link>

          <Link to="/customers">
            Customers
          </Link>

          <Link to="/orders">
            Orders
          </Link>

          <Link to="/segments">
            Segments
          </Link>

          <Link to="/campaigns">
            Campaigns
          </Link>

          <Link to="/analytics">
            Analytics
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;