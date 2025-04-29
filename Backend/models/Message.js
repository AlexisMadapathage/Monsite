const mongoose = require("mongoose");

//Création du schéma mongoose "messageSchema"
const messageSchema = new mongoose.Schema({
  lastname: String,
  firstname: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

//Exporte le modèle "Message" basé sur le schéma précédent
module.exports = mongoose.model("Message", messageSchema);