import {
  createCampaign,
  getCampaigns,
} from "../services/campaign.service.js";

export const createCampaignController = async (
  req,
  res
) => {
  try {
    const campaign = await createCampaign(req.body);

    res.status(201).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCampaignsController = async (
  req,
  res
) => {
  try {
    const campaigns = await getCampaigns();

    res.status(200).json({
      success: true,
      data: campaigns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};