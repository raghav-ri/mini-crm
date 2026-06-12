import {
  createCampaignRepo,
  getCampaignsRepo,
} from "../repositories/campaign.repository.js";

export const createCampaign = async (data) => {
  return createCampaignRepo(data);
};

export const getCampaigns = async () => {
  return getCampaignsRepo();
};