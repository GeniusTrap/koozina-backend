import mongoose from "mongoose";

const devisSchema = new mongoose.Schema({
  nom: { 
    type: String, 
    required: true, 
    trim: true 
  },
  prenom: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true
  },
  telephone: { 
    type: String, 
    required: true 
  },
  superficie: { 
    type: Number, 
    required: true,
    min: 0.1
  },
  couleur: { 
    type: String, 
    required: true 
  },
  gouvernorat: { 
    type: String, 
    required: true 
  },
  // Champs remplis par l'admin
  prixMateriel: { type: Number, default: 0 },
  fraisLivraison: { type: Number, default: 0 },
  prixTotal: { type: Number, default: 0 },
}, {
  timestamps: true 
});

const devisModel = mongoose.models.devis || mongoose.model('devis', devisSchema);

export default devisModel;