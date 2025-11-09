import devisModel from "../models/devisModel.js";

// Créer un nouveau devis
export const createDevis = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, superficie, couleur, gouvernorat } = req.body;

    const newDevis = new devisModel({
      nom,
      prenom,
      email,
      telephone,
      superficie,
      couleur,
      gouvernorat
    });

    const savedDevis = await newDevis.save();

    res.status(201).json({
      success: true,
      message: "Demande de devis envoyée avec succès",
      data: savedDevis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi du devis",
      error: error.message
    });
  }
};

// Récupérer tous les devis
export const getAllDevis = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const devis = await devisModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await devisModel.countDocuments();

    res.status(200).json({
      success: true,
      data: devis,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalDevis: total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des devis",
      error: error.message
    });
  }
};

// Récupérer un devis par ID
export const getDevisById = async (req, res) => {
  try {
    const devis = await devisModel.findById(req.params.id);

    if (!devis) {
      return res.status(404).json({
        success: false,
        message: "Devis non trouvé"
      });
    }

    res.status(200).json({
      success: true,
      data: devis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du devis",
      error: error.message
    });
  }
};

// Mettre à jour un devis (pour l'admin)
export const updateDevis = async (req, res) => {
  try {
    const { prixMateriel, fraisLivraison } = req.body;
    
    // Calculer le prix total
    const prixTotal = (parseFloat(prixMateriel) || 0) + (parseFloat(fraisLivraison) || 0);

    const updatedDevis = await devisModel.findByIdAndUpdate(
      req.params.id,
      {
        prixMateriel,
        fraisLivraison,
        prixTotal,
      },
      { new: true, runValidators: true }
    );

    if (!updatedDevis) {
      return res.status(404).json({
        success: false,
        message: "Devis non trouvé"
      });
    }

    res.status(200).json({
      success: true,
      message: "Devis mis à jour avec succès",
      data: updatedDevis
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du devis",
      error: error.message
    });
  }
};

// Supprimer un devis
export const deleteDevis = async (req, res) => {
  try {
    const deletedDevis = await devisModel.findByIdAndDelete(req.params.id);

    if (!deletedDevis) {
      return res.status(404).json({
        success: false,
        message: "Devis non trouvé"
      });
    }

    res.status(200).json({
      success: true,
      message: "Devis supprimé avec succès"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression du devis",
      error: error.message
    });
  }
};

// Récupérer les statistiques des devis
export const getDevisStats = async (req, res) => {
  try {
    const totalDevis = await devisModel.countDocuments();
    const nouveauxDevis = await devisModel.countDocuments({ status: 'nouveau' });
    const enCoursDevis = await devisModel.countDocuments({ status: 'en_cours' });
    const acceptesDevis = await devisModel.countDocuments({ status: 'accepte' });

    res.status(200).json({
      success: true,
      data: {
        total: totalDevis,
        nouveaux: nouveauxDevis,
        en_cours: enCoursDevis,
        acceptes: acceptesDevis
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des statistiques",
      error: error.message
    });
  }
};