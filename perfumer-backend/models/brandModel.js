import mongoose from 'mongoose';

const brandSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    logoUrl: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Brand = mongoose.model('Brand', brandSchema);
export default Brand;
