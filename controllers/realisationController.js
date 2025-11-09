import realisationModel from "../models/realisationModel.js";


export const createRealisation = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const newRealisation = new realisationModel({
      title,
      description,
      image
    });

    const savedRealisation = await newRealisation.save();

    res.status(201).json({
      success: true,
      message: "Réalisation créée avec succès",
      data: savedRealisation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création de la réalisation",
      error: error.message
    });
  }
};

// Récupérer toutes les réalisations (public)
export const getAllRealisations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;

    const realisations = await realisationModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await realisationModel.countDocuments();

    res.status(200).json({
      success: true,
      data: realisations,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalRealisations: total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des réalisations",
      error: error.message
    });
  }
};

// Récupérer une réalisation par ID
export const getRealisationById = async (req, res) => {
  try {
    const realisation = await realisationModel.findById(req.params.id);

    if (!realisation) {
      return res.status(404).json({
        success: false,
        message: "Réalisation non trouvée"
      });
    }

    res.status(200).json({
      success: true,
      data: realisation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération de la réalisation",
      error: error.message
    });
  }
};

// Mettre à jour une réalisation
export const updateRealisation = async (req, res) => {
  try {
    const updatedRealisation = await realisationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedRealisation) {
      return res.status(404).json({
        success: false,
        message: "Réalisation non trouvée"
      });
    }

    res.status(200).json({
      success: true,
      message: "Réalisation mise à jour avec succès",
      data: updatedRealisation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour de la réalisation",
      error: error.message
    });
  }
};

// Supprimer une réalisation
export const deleteRealisation = async (req, res) => {
  try {
    const deletedRealisation = await realisationModel.findByIdAndDelete(req.params.id);

    if (!deletedRealisation) {
      return res.status(404).json({
        success: false,
        message: "Réalisation non trouvée"
      });
    }

    res.status(200).json({
      success: true,
      message: "Réalisation supprimée avec succès"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de la réalisation",
      error: error.message
    });
  }
};