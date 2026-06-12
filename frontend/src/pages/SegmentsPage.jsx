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
    useState("");

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

          rules: {
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

        fetchSegments();
      } catch (error) {
        console.log(error);
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

        setAiRules(
          response.data.data
        );
      } catch (error) {
        console.log(error);
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

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-bold mb-4">
          AI Segment Generator
        </h2>

        <input
          placeholder="Describe audience"
          value={prompt}
          onChange={(e) =>
            setPrompt(
              e.target.value
            )
          }
          className="border p-2 rounded w-full mb-3"
        />

        <button
          onClick={
            generateSegment
          }
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Generate Segment
        </button>

        {aiRules && (
          <pre className="mt-4 whitespace-pre-wrap">
            {aiRules}
          </pre>
        )}
      </div>

      {/* Create Segment */}

      <form
        onSubmit={
          createSegment
        }
        className="bg-white p-4 rounded shadow mb-6"
      >
        <div className="grid grid-cols-3 gap-4">
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
            className="border p-2 rounded"
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
            className="border p-2 rounded"
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
            className="border p-2 rounded"
          />
        </div>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
          Create Segment
        </button>
      </form>

      {/* Segment List */}

      <div className="bg-white rounded-lg shadow p-4">
        {segments.map(
          (segment) => (
            <div
              key={segment.id}
              className="border-b py-4"
            >
              <h2 className="font-bold">
                {segment.name}
              </h2>

              <p>
                {
                  segment.description
                }
              </p>

              <p className="text-sm text-gray-500 mt-1">
                ID:
                {" "}
                {segment.id}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default SegmentsPage;