import axios from "axios";

import {
  getCampaignByIdRepo,
  getSegmentByIdRepo,
  getAudienceRepo,
  createRecipientRepo,
} from "../repositories/campaign-send.repository.js";

const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

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

  const channelUrl =
    process.env.CHANNEL_SERVICE_URL;

  for (const customer of audience) {
    const recipient =
      await createRecipientRepo(
        campaign.id,
        customer.id
      );

    recipientsCreated++;

    let sent = false;

    for (
      let attempt = 1;
      attempt <= 3;
      attempt++
    ) {
      try {
        await axios.post(
          `${channelUrl}/api/channel/send`,
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
          },
          {
            timeout: 30000,
          }
        );

        sent = true;
        break;
      } catch (error) {
        console.log(
          `Attempt ${attempt} failed:`,
          error.message
        );

        if (attempt < 3) {
          console.log(
            "Waiting 10 seconds before retry..."
          );

          await sleep(10000);
        }
      }
    }

    if (!sent) {
      throw new Error(
        "Channel service unavailable. Please try again in a few seconds."
      );
    }
  }

  return {
    audienceSize:
      audience.length,
    recipientsCreated,
  };
};