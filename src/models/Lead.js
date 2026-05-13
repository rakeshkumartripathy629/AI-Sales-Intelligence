import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    website: {
      type: String,
      default: "",
      trim: true
    },

    scrapedContent: {
      type: String,
      default: ""
    },

    companyOverview: {
      type: String,
      default: ""
    },

    coreServices: {
      type: [String],
      default: []
    },

    targetAudience: {
      type: String,
      default: ""
    },

    b2bQualification: {
      type: Boolean,
      default: false
    },

    qualificationReason: {
      type: String,
      default: ""
    },

    salesQuestions: {
      type: [String],
      default: []
    },

    pagesScraped: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: [
        "processing",
        "completed",
        "failed"
      ],
      default: "processing"
    },

    error: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Lead = mongoose.model(
  "Lead",
  leadSchema
);

export default Lead;