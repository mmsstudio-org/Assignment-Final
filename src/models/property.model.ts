// This is a placeholder for the Mongoose Property model schema.
// In a real application, you would define the schema here.
//
// import mongoose, { Schema, Document } from 'mongoose';
//
// export interface IProperty extends Document {
//   title: string;
//   description: string;
//   price: number;
//   city: string;
//   images: string[];
//   propertyType: string;
//   landlordId: mongoose.Schema.Types.ObjectId;
//   amenities: string[];
// }
//
// const PropertySchema: Schema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   city: { type: String, required: true },
//   images: [{ type: String }],
//   propertyType: { type: String, required: true },
//   landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   amenities: [{ type: String }],
// });
//
// export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);
