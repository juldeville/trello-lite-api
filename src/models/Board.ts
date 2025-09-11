import mongoose, { Schema, model, Document, mongo } from "mongoose";

interface Board {
  ownerId: mongoose.Types.ObjectId;
  name: string;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
}

export interface BoardDocument extends Board, Document {}

const boardSchema = new Schema<BoardDocument>({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  members: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
  createdAt: { type: Date, default: Date.now },
});

const Board = model<BoardDocument>("Board", boardSchema);

export default Board;
export { Board };
