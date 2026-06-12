import { useEffect, useState } from "react";
import api from "../api/axios";

function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [segments, setSegments] = useState([]);

  const [form, setForm] = useState({
    name: "",
    message: "",
    channel: "EMAIL",
    segmentId: "",
  });

  const [aiGoal, setAiGoal] = useState("");
  const [aiAudience, setAiAudience] = useState("");
  const [generatedMessage, setGeneratedMessage] =
    useState("");

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

  const fetchSegments = async () => {
    try {
      const response =
        await api.get("/segments");

      setSegments(
        response.data.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createCampaign = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/campaigns",
        form
      );

      alert(
        "Campaign Created Successfully"
      );

      setForm({
        name: "",
        message: "",
        channel: "EMAIL",
        segmentId: "",
      });

      fetchCampaigns();
    } catch (error) {
      console.log(error);
    }
  };

  const generateCampaign = async () => {
    try {
      const response =
        await api.post(
          "/ai/generate-campaign",
          {
            campaignGoal:
              aiGoal,
            audienceDescription:
              aiAudience,
          }
        );

      setGeneratedMessage(
        response.data.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const sendCampaign = async (
    campaignId
  ) => {
    try {
      await api.post(
        `/campaigns/${campaignId}/send`
      );

      alert(
        "Campaign Sent Successfully"
      );

      fetchCampaigns();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    fetchSegments();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Campaigns
      </h1>

      {/* AI Campaign Generator */}

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">
          AI Campaign Generator
        </h2>

        <input
          type="text"
          placeholder="Campaign Goal"
          value={aiGoal}
          onChange={(e) =>
            setAiGoal(
              e.target.value
            )
          }
          className="border p-2 rounded w-full mb-3"
        />

        <input
          type="text"
          placeholder="Audience Description"
          value={aiAudience}
          onChange={(e) =>
            setAiAudience(
              e.target.value
            )
          }
          className="border p-2 rounded w-full mb-3"
        />

        <button
          onClick={
            generateCampaign
          }
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Generate Campaign
        </button>

        {generatedMessage && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">
              Generated Message
            </h3>

            <textarea
              rows="6"
              value={
                generatedMessage
              }
              onChange={(e) =>
                setGeneratedMessage(
                  e.target.value
                )
              }
              className="w-full border rounded p-3"
            />
          </div>
        )}
      </div>

      {/* Create Campaign */}

      <form
        onSubmit={
          createCampaign
        }
        className="bg-white p-6 rounded-lg shadow mb-6"
      >
        <h2 className="text-xl font-bold mb-4">
          Create Campaign
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Campaign Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name:
                  e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          />

          <select
            value={form.segmentId}
            onChange={(e) =>
              setForm({
                ...form,
                segmentId:
                  e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          >
            <option value="">
              Select Segment
            </option>

            {segments.map(
              (segment) => (
                <option
                  key={
                    segment.id
                  }
                  value={
                    segment.id
                  }
                >
                  {segment.name}
                </option>
              )
            )}
          </select>

          <select
            value={form.channel}
            onChange={(e) =>
              setForm({
                ...form,
                channel:
                  e.target.value,
              })
            }
            className="border p-2 rounded"
          >
            <option value="EMAIL">
              EMAIL
            </option>
            <option value="SMS">
              SMS
            </option>
          </select>

          <input
            type="text"
            placeholder="Message"
            value={form.message}
            onChange={(e) =>
              setForm({
                ...form,
                message:
                  e.target.value,
              })
            }
            className="border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded mt-4 hover:bg-purple-700"
        >
          Create Campaign
        </button>
      </form>

      {/* Campaign List */}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3 text-left">
                Name
              </th>

              <th className="p-3 text-left">
                Channel
              </th>

              <th className="p-3 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {campaigns.length >
            0 ? (
              campaigns.map(
                (campaign) => (
                  <tr
                    key={
                      campaign.id
                    }
                    className="border-b"
                  >
                    <td className="p-3">
                      {
                        campaign.name
                      }
                    </td>

                    <td className="p-3">
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-sm">
                        {
                          campaign.channel
                        }
                      </span>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() =>
                          sendCampaign(
                            campaign.id
                          )
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Send
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="p-4 text-center text-gray-500"
                >
                  No campaigns
                  found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CampaignsPage;