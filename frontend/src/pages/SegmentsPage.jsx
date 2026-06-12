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

        setForm({
          name:
            "AI Generated Segment",
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

      {/* AI Segment Generator */}

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="font-bold text-lg mb-4">
          AI Segment Generator
        </h2>

        <input
          placeholder="Describe audience..."
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

        {aiRules && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">
              AI Generated Rules
            </h3>

            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(
                aiRules,
                null,
                2
              )}
            </pre>
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

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-4">
          Existing Segments
        </h2>

        {segments.length ===
        0 ? (
          <p>
            No segments found.
          </p>
        ) : (
          segments.map(
            (segment) => (
              <div
                key={segment.id}
                className="border-b py-4"
              >
                <h2 className="font-bold text-lg">
                  {
                    segment.name
                  }
                </h2>

                <p className="text-gray-700">
                  {
                    segment.description
                  }
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Rules:
                </p>

                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto mt-1">
                  {JSON.stringify(
                    segment.rules,
                    null,
                    2
                  )}
                </pre>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default SegmentsPage;