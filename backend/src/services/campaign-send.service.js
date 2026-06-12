import axios from "axios";

import {
  getCampaignByIdRepo,
  getSegmentByIdRepo,
  getAudienceRepo,
  createRecipientRepo,
} from "../repositories/campaign-send.repository.js";

export const sendCampaign = async (
  campaignId
) => {
  const campaign =
    await getCampaignByIdRepo(campaignId);

  if (!campaign) {
    throw new Error("Campaign not found");
  }

  const segment =
    await getSegmentByIdRepo(
      campaign.segmentId
    );

  if (!segment) {
    throw new Error("Segment not found");
  }

  const audience =
    await getAudienceRepo(segment.rules);

  let recipientsCreated = 0;

  for (const customer of audience) {
    const recipient =
      await createRecipientRepo(
        campaign.id,
        customer.id
      );

    recipientsCreated++;

    await axios.post(
      process.env.CHANNEL_SERVICE_URL +
        "/api/channel/send",
      {
        campaignRecipientId:
          recipient.id,

        customerId:
          customer.id,

        campaignId:
          campaign.id,

        message:
          campaign.message,

        channel:
          campaign.channel,
      }
    );
  }

  return {
    audienceSize:
      audience.length,

    recipientsCreated,
  };
};