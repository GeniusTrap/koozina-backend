import express from "express";
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  getContactStats
} from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/stats", getContactStats);
router.get("/:id", getContactById);
router.put("/:id", updateContact);
router.delete("/:id", deleteContact);

export default router;