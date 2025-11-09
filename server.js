import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/db.js";

import contactRoutes from "./routes/contactRoutes.js";
import devisRoutes from "./routes/devisRoutes.js";
import realisationRoutes from "./routes/realisationRoutes.js";

const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174', 
    'https://koozina.tn',
    'https://www.koozina.tn',
    'https://admin.koozina.tn'
  ],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


app.use("/api/contacts", contactRoutes);
app.use("/api/devis", devisRoutes);
app.use("/api/realisations", realisationRoutes);


app.get("/", (req, res) => {
  res.json({ 
    message: "🚀 API Plan de Travail Working",
    timestamp: new Date().toISOString()
  });
});

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected - Plan de Travail");
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server started on PORT: ${PORT}`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();