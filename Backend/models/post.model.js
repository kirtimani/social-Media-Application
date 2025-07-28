import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
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
      required: true,
    },
    caption:{
        type:String,

    },
    like:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        }
    ],
    comments:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        }
    ]
  },
  { timestamps: true }
);

const Post = mongoose.model("post",postMessage);
export default Post;