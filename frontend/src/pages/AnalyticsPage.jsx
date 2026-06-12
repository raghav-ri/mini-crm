import { useEffect, useState } from "react";
import api from "../api/axios";

function AnalyticsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] =
    useState("");

  const [analytics, setAnalytics] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const fetchCampaigns = async () => {
    try {
      const response =
        await api.get("/campaigns");

      setCampaigns(
        response.data.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAnalytics = async () => {
    if (!selectedCampaign) return;

    try {
      setLoading(true);

      const response =
        await api.get(
          `/analytics/campaigns/${selectedCampaign}`
        );

      setAnalytics(
        response.data.data
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Campaign Analytics
      </h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">
          Select Campaign
        </h2>

        <div className="flex gap-3">
          <select
            value={selectedCampaign}
            onChange={(e) =>
              setSelectedCampaign(
                e.target.value
              )
            }
            className="border p-2 rounded w-full"
          >
            <option value="">
              Select Campaign
            </option>

            {campaigns.map(
              (campaign) => (
                <option
                  key={campaign.id}
                  value={campaign.id}
                >
                  {campaign.name}
                </option>
              )
            )}
          </select>

          <button
            onClick={
              fetchAnalytics
            }
            disabled={
              !selectedCampaign ||
              loading
            }
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {loading
              ? "Loading..."
              : "Fetch"}
          </button>
        </div>
      </div>

      {!analytics && (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          Select a campaign to view analytics
        </div>
      )}

      {analytics && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-gray-500">
                Sent
              </h3>

              <p className="text-4xl font-bold mt-2">
                {analytics.sent}
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-gray-500">
                Delivered
              </h3>

              <p className="text-4xl font-bold mt-2">
                {
                  analytics.delivered
                }
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-gray-500">
                Opened
              </h3>

              <p className="text-4xl font-bold mt-2">
                {analytics.opened}
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-gray-500">
                Clicked
              </h3>

              <p className="text-4xl font-bold mt-2">
                {analytics.clicked}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h2 className="text-xl font-bold mb-4">
              Campaign Performance
            </h2>

            <div className="space-y-3">
              <p>
                Delivery Rate:
                <span className="font-semibold ml-2">
                  {analytics.sent
                    ? (
                        (analytics.delivered /
                          analytics.sent) *
                        100
                      ).toFixed(1)
                    : 0}
                  %
                </span>
              </p>

              <p>
                Open Rate:
                <span className="font-semibold ml-2">
                  {analytics.delivered
                    ? (
                        (analytics.opened /
                          analytics.delivered) *
                        100
                      ).toFixed(1)
                    : 0}
                  %
                </span>
              </p>

              <p>
                Click Rate:
                <span className="font-semibold ml-2">
                  {analytics.opened
                    ? (
                        (analytics.clicked /
                          analytics.opened) *
                        100
                      ).toFixed(1)
                    : 0}
                  %
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AnalyticsPage;