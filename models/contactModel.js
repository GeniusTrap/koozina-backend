import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  nom: { 
    type: String, 
    required: true, 
    trim: true 
  },
  telephone: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true
  },
  message: { 
    type: String, 
    required: true 
  },
  status: {
    type: String,
    enum: ['nouveau', 'lu', 'repondu'],
    default: 'nouveau'
  }
}, {
  timestamps: true 
});

const contactModel = mongoose.models.contact || mongoose.model('contact', contactSchema);

export default contactModel;