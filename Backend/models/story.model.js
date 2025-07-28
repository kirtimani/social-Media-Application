import mongoose, { mongo } from "mongoose";

const storySchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mediaType: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },
    media: {
      type: String,
    },
    viewares: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:86400

    }
  },
  { timestamps: true }
);


const story = mongoose.model("Story",storySchema);

export default story