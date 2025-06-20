// This is a placeholder for the Mongoose Message model schema.
// In a real application, you would define the schema here.
//
// import mongoose, { Schema, Document } from 'mongoose';
//
// export interface IMessage extends Document {
//   propertyId: mongoose.Schema.Types.ObjectId;
//   senderId: mongoose.Schema.Types.ObjectId;
//   landlordId: mongoose.Schema.Types.ObjectId;
//   message: string;
//   createdAt: Date;
// }
//
// const MessageSchema: Schema = new Schema({
//   propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
//   senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });
//
// export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
