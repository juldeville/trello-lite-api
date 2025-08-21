import mongoose, { Schema, model, Document } from "mongoose";

interface Activity {
  boardId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  action: string;
  createdAt: Date;
}

interface ActivityDocument extends Activity, Document {}

const activitySchema = new Schema<ActivityDocument>({
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Activity = model<ActivityDocument>("Activity", activitySchema);

export default Activity;
export { Activity };
