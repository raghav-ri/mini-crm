import {
  generateCampaignMessage,
  suggestSegment,
} from "../ai/gemini.service.js";

export const generateCampaignController = async (
  req,
  res
) => {
  try {
    const { campaignGoal, audienceDescription } =
      req.body;

    const response =
      await generateCampaignMessage(
        campaignGoal,
        audienceDescription
      );

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const suggestSegmentController = async (
  req,
  res
) => {
  try {
    const { description } = req.body;

    const response =
      await suggestSegment(description);

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};