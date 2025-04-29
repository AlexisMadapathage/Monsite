require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactRoutes = require("./routes/contact");

const app = express();

// Ajoute les bonnes options CORS
const corsOptions = {
  origin: [
    'https://monsite-lemon.vercel.app', // site Vercel
    'http://127.0.0.1:5500'              // Live Server
  ],
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type']
};

// Utilise directement les bonnes options
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// Connexion à MongoDB + lancement serveur
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connecté à MongoDB");
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`Serveur lancé sur port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error("Erreur MongoDB :", err));