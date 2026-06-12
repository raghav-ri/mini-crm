import {
  createSegment,
  getSegments,
  previewAudience,
} from "../services/segment.service.js";

export const createSegmentController = async (req, res) => {
  try {
    const segment = await createSegment(req.body);

    res.status(201).json({
      success: true,
      data: segment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSegmentsController = async (req, res) => {
  try {
    const segments = await getSegments();

    res.status(200).json({
      success: true,
      data: segments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const previewAudienceController = async (req, res) => {
  try {
    const result = await previewAudience(req.body);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};