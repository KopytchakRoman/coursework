import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  color: { type: String, required: true },
});

const tagSchema = mongoose.Schema({
  title: { type: String, required: true },
  value: { type: String, required: true },
});

const perfumeSchema = mongoose.Schema(
  {
    brand: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    type: { type: String },
    imageUrl: { type: String, required: true },
    backgroundUrl: { type: String },
    description: { type: String },

    notes: [noteSchema],
    tags: [tagSchema],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Perfume = mongoose.model('Perfume', perfumeSchema);
export default Perfume;
