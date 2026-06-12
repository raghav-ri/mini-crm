import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout.jsx";

import DashboardPage from "../pages/DashboardPage.jsx";
import CustomersPage from "../pages/CustomersPage.jsx";
import OrdersPage from "../pages/OrdersPage.jsx";
import SegmentsPage from "../pages/SegmentsPage.jsx";
import CampaignsPage from "../pages/CampaignsPage.jsx";
import AnalyticsPage from "../pages/AnalyticsPage.jsx";

function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route
          path="/"
          element={<DashboardPage />}
        />

        <Route
          path="/customers"
          element={<CustomersPage />}
        />

        <Route
          path="/orders"
          element={<OrdersPage />}
        />

        <Route
          path="/segments"
          element={<SegmentsPage />}
        />

        <Route
          path="/campaigns"
          element={<CampaignsPage />}
        />

        <Route
          path="/analytics"
          element={<AnalyticsPage />}
        />
      </Routes>
    </MainLayout>
  );
}

export default AppRoutes;