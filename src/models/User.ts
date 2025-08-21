import { Schema, model, Document } from "mongoose";

interface User {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
}

interface UserDocument extends User, Document {}

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = model<UserDocument>("User", userSchema);

export default User;
export { User };
