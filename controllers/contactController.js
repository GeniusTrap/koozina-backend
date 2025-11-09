import contactModel from "../models/contactModel.js";

// Créer un nouveau contact
export const createContact = async (req, res) => {
  try {
    const { nom, telephone, email, message } = req.body;

    const newContact = new contactModel({
      nom,
      telephone,
      email,
      message
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      message: "Message de contact envoyé avec succès",
      data: savedContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi du message",
      error: error.message
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const contacts = await contactModel
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await contactModel.countDocuments();

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalContacts: total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des contacts",
      error: error.message
    });
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await contactModel.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact non trouvé"
      });
    }

    res.status(200).json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du contact",
      error: error.message
    });
  }
};

export const updateContact = async (req, res) => {
  try {
    const updatedContact = await contactModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact non trouvé"
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact mis à jour avec succès",
      data: updatedContact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du contact",
      error: error.message
    });
  }
};

// Supprimer un contact
export const deleteContact = async (req, res) => {
  try {
    const deletedContact = await contactModel.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact non trouvé"
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact supprimé avec succès"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression du contact",
      error: error.message
    });
  }
};

// Récupérer les statistiques des contacts
export const getContactStats = async (req, res) => {
  try {
    const totalContacts = await contactModel.countDocuments();
    const newContacts = await contactModel.countDocuments({ status: 'nouveau' });
    const repliedContacts = await contactModel.countDocuments({ status: 'repondu' });

    res.status(200).json({
      success: true,
      data: {
        total: totalContacts,
        nouveaux: newContacts,
        repondus: repliedContacts
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