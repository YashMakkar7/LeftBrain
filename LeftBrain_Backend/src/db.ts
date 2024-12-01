import mongoose, { model, Schema } from "mongoose";

// This is only for signup and signin endPoint
const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model('User', UserSchema);

const ContentSchema = new Schema({
  title: String,
  link: String,
  type:String,
  description:String,
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});

export const ContentModel = model("Content", ContentSchema);

const LinkSchema = new Schema({
  hash: String,//unique string generate for user 
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true , unique:true},// only one entry for a user
});

export const LinkModel = model("Links", LinkSchema);
