import express from "express";
import jwt from "jsonwebtoken";
import adminAuth from "../middleware/adminAuth.js";
import {
  createRealisation,
  getAllRealisations,
  getRealisationById,
  updateRealisation,
  deleteRealisation
} from "../controllers/realisationController.js";

const router = express.Router();


router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email: process.env.ADMIN_EMAIL },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        message: "Connexion réussie",
        token
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Email ou mot de passe incorrect"
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
});

// Routes publiques
router.get("/", getAllRealisations);
router.get("/:id", getRealisationById);

router.post("/", adminAuth, createRealisation);
router.put("/:id", adminAuth, updateRealisation);
router.delete("/:id", adminAuth, deleteRealisation);

export default router;