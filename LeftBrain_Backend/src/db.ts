import mongoose, { model, Schema, Types } from "mongoose";
mongoose.connect(
  "mongodb+srv://admin:P18Uq8bZf73f5bf8@cluster0.9lrbd.mongodb.net/Brainly"
);

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
