import { useEffect, useState } from "react";
import api from "../api/axios";

function SegmentsPage() {
  const [segments, setSegments] =
    useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    minSpend: "",
  });

  const [prompt, setPrompt] =
    useState("");

  const [aiRules, setAiRules] =
    useState(null);

  const [
    aiSuggestion,
    setAiSuggestion,
  ] = useState(null);

  const fetchSegments =
    async () => {
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

  const createSegment =
    async (e) => {
      e.preventDefault();

      try {
        await api.post("/segments", {
          name: form.name,
          description:
            form.description,

          rules:
            aiRules || {
              totalSpent: {
                gte: Number(
                  form.minSpend
                ),
              },
            },
        });

        setForm({
          name: "",
          description: "",
          minSpend: "",
        });

        setPrompt("");
        setAiRules(null);
        setAiSuggestion(
          null
        );

        fetchSegments();

        alert(
          "Segment Created Successfully"
        );
      } catch (error) {
        console.log(error);
        alert(
          "Failed to create segment"
        );
      }
    };

  const generateSegment =
    async () => {
      try {
        const response =
          await api.post(
            "/ai/suggest-segment",
            {
              description:
                prompt,
            }
          );

        let generated =
          response.data.data;

        generated = generated
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const parsed =
          JSON.parse(generated);

        setAiRules(parsed);

        let suggestedName =
          "Smart Audience";

        if (
          prompt
            .toLowerCase()
            .includes("punjab")
        ) {
          suggestedName =
            "Punjab Customers";
        }

        if (
          prompt
            .toLowerCase()
            .includes(
              "less than"
            ) ||
          prompt
            .toLowerCase()
            .includes(
              "below"
            )
        ) {
          suggestedName =
            "Budget Customers";
        }

        if (
          prompt
            .toLowerCase()
            .includes(
              "greater"
            ) ||
          prompt
            .toLowerCase()
            .includes(
              "more than"
            )
        ) {
          suggestedName =
            "High Value Customers";
        }

        setAiSuggestion({
          name: suggestedName,
          description:
            prompt,
        });

        setForm({
          name:
            suggestedName,
          description:
            prompt,
          minSpend:
            parsed.totalSpent
              ?.gte || "",
        });
      } catch (error) {
        console.log(error);
        alert(
          "Failed to generate segment"
        );
      }
    };

  useEffect(() => {
    fetchSegments();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Segments
      </h1>

      {/* AI Generator */}

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-4">
          AI Segment Generator
        </h2>

        <input
          placeholder="Describe your audience..."
          value={prompt}
          onChange={(e) =>
            setPrompt(
              e.target.value
            )
          }
          className="border p-3 rounded w-full mb-4"
        />

        <button
          onClick={
            generateSegment
          }
          className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
        >
          Generate Segment
        </button>

        {aiSuggestion && (
          <div className="mt-5 border rounded-lg p-5 bg-indigo-50">
            <h3 className="font-bold text-lg">
              Suggested Segment
            </h3>

            <p className="mt-2">
              <span className="font-semibold">
                Name:
              </span>{" "}
              {
                aiSuggestion.name
              }
            </p>

            <p className="mt-1 text-gray-700">
              {
                aiSuggestion.description
              }
            </p>

            <p className="mt-3 text-sm text-green-700">
              Segment details
              have been prepared.
              You can edit the
              form below and save
              it.
            </p>
          </div>
        )}
      </div>

      {/* Create Segment */}

      <form
        onSubmit={
          createSegment
        }
        className="bg-white p-6 rounded-lg shadow mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Segment Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="Description"
            value={
              form.description
            }
            onChange={(e) =>
              setForm({
                ...form,
                description:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="Minimum Spend"
            value={
              form.minSpend
            }
            onChange={(e) =>
              setForm({
                ...form,
                minSpend:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded mt-4 hover:bg-green-700"
        >
          Create Segment
        </button>
      </form>

      {/* Segment List */}

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          Existing Segments
        </h2>

        {segments.length ===
        0 ? (
          <p>
            No segments
            available.
          </p>
        ) : (
          segments.map(
            (segment) => (
              <div
                key={segment.id}
                className="border-b py-4"
              >
                <h3 className="font-bold text-lg">
                  {
                    segment.name
                  }
                </h3>

                <p className="text-gray-600 mt-1">
                  {
                    segment.description
                  }
                </p>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default SegmentsPage;