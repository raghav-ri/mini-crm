import {
  createSegmentRepo,
  getSegmentsRepo,
  previewAudienceRepo,
} from "../repositories/segment.repository.js";

export const createSegment = async (data) => {
  return createSegmentRepo(data);
};

export const getSegments = async () => {
  return getSegmentsRepo();
};

export const previewAudience = async (rules) => {
  const customers = await previewAudienceRepo(rules);

  return {
    audienceSize: customers.length,
    customers,
  };
};