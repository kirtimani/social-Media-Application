import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
     bio: {
      type: String,
    },
     profession: {
      type: String,
    },
     gender: {
      type: String,
      enum:["male","female","others"]
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    saved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    loops: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loop",
      },
    ],
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
    resetOtp: {
      type: String,

    },
    otpExpires: {
      type: Date,
    },
    isotpVerified: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
