import mongoose, { Schema, model, Document } from "mongoose";

interface Card {
  listId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  tags: string[];
  dueDate: Date;
  order: number;
  assignees: mongoose.Types.ObjectId[];
  createdAt: Date;
}

interface CardDocument extends Card, Document {}

const cardSchema = new Schema<CardDocument>({
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  dueDate: { type: Date, required: true },
  order: { type: Number, required: true },
  assignees: { type: [mongoose.Schema.Types.ObjectId], ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Card = model<CardDocument>("Card", cardSchema);

export default Card;
export { Card };
