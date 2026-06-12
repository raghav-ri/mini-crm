import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const generateCampaignMessage = async (
  campaignGoal,
  audienceDescription
) => {
  const prompt = `
You are a CRM marketing expert.

Campaign Goal:
${campaignGoal}

Audience:
${audienceDescription}

Generate:
1. Campaign title
2. Marketing message
3. CTA

Return plain text only.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};

export const suggestSegment = async (description) => {
  const prompt = `
You are a CRM audience segmentation expert.

Convert this marketing request into JSON rules.

Request:
${description}

Example:

{
  "totalSpent": {
    "gte": 5000
  }
}

Return JSON only.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
};