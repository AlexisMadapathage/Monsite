const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const sendConfirmationEmail = require("../utils/mailer");

//Récupérer les informations utilisateurs
router.post("/", async (req, res) => {
  const { lastname, firstname, email, message } = req.body;

  //nouvelle instance du modèle Message et tu la sauvegardes dans MongoDB
  try {
    const newMessage = new Message({ lastname, firstname, email, message });
    await newMessage.save();

    // Envoi de l’email de confirmation
    await sendConfirmationEmail(email, firstname);

    res.status(201).json({ message: "Message enregistré avec succès." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l'enregistrement du message." });
  }
});

// Récupère tous les messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des messages." });
  }
});

// Supprime un message par son ID
router.delete("/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "Message supprimé avec succès." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la suppression du message." });
  }
});

module.exports = router;