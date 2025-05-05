console.log("Initialisation du serveur...");

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
  methods: ['GET', 'POST', 'OPTIONS'],   
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://monsite-lemon.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  next();
});
app.use(cors(corsOptions));
console.log("Middleware CORS appliqué");
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
    console.log("PORT utilisé :", PORT); // debug

    app.listen(PORT, () => {
      console.log(`Serveur lancé sur port ${PORT}`);
    });
  })
  .catch(err => console.error("Erreur MongoDB :", err));