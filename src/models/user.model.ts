// This is a placeholder for the Mongoose User model schema.
// In a real application, you would define the schema here.
//
// import mongoose, { Schema, Document } from 'mongoose';
//
// export interface IUser extends Document {
//   name: string;
//   email: string;
//   image?: string;
//   role: 'user' | 'landlord' | 'admin';
//   favorites: mongoose.Schema.Types.ObjectId[];
// }
//
// const UserSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   image: { type: String },
//   role: { type: String, enum: ['user', 'landlord', 'admin'], default: 'user' },
//   favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
// });
//
// export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
