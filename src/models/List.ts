import mongoose, { model, Schema, Document } from "mongoose";

interface List {
  boardId: mongoose.Types.ObjectId;
  name: string;
  order: number;
}

interface ListDocument extends List, Document {}

const listSchema = new Schema<ListDocument>({
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
  name: { type: String, required: true },
  order: { type: Number, required: true },
});

const List = model<ListDocument>("List", listSchema);

export default List;
export { List };
