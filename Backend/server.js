require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactRoutes = require("./routes/contact");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// Connexion à MongoDB + lancement serveur
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connecté à MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("Erreur MongoDB :", err));