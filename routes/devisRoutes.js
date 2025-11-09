import express from "express";
import {
  createDevis,
  getAllDevis,
  getDevisById,
  updateDevis,
  deleteDevis,
  getDevisStats
} from "../controllers/devisController.js";

const router = express.Router();

router.post("/", createDevis);
router.get("/", getAllDevis);
router.get("/stats", getDevisStats);
router.get("/:id", getDevisById);
router.put("/:id", updateDevis);
router.delete("/:id", deleteDevis);

export default router;