require ("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactRoutes = require("./routes/contact");

const app = express();

// CORS 
const corsOptions = {
  origin: [
    'https://monsite-lemon.vercel.app', // frontend en prod
    'http://127.0.0.1:5500'              // frontend local
  ],
  methods: ['GET', 'POST', 'OPTIONS'],   // ne pas oublier OPTIONS !
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // GÈRE LES REQUÊTES OPTIONS PRÉVOL

// Middleware
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connecté à MongoDB");
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Serveur lancé sur port ${PORT}`);
    });
  })
  .catch(err => console.error("Erreur MongoDB :", err));