import mongoose from "mongoose";

const realisationSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
}, {
  timestamps: true 
});

const realisationModel = mongoose.models.realisation || mongoose.model('realisation', realisationSchema);

export default realisationModel;