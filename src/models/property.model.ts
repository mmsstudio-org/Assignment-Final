import mongoose, { Schema, Document, models } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  city: string;
  images: string[];
  propertyType: string;
  landlordId: mongoose.Schema.Types.ObjectId;
  amenities: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  images: [{ type: String }],
  propertyType: { 
    type: String, 
    enum: ['Apartment', 'House', 'Villa', 'Studio', 'Cottage'],
    required: true 
  },
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amenities: [{ type: String }],
}, { timestamps: true });

export default models.Property || mongoose.model<IProperty>('Property', PropertySchema);
