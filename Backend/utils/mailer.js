// Configure l'envoi d'email
const nodemailer = require("nodemailer");
require("dotenv").config();

//création d'un transporteur SMTP pour envoyer des emails via Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // Désactive la vérification du certificat (à ne pas faire en prod !)
  }
});

//Envoi du mail de confirmation via Gmail
function sendConfirmationEmail(to, firstname) {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject: "Merci pour votre message !",
    text: `Bonjour ${firstname}, 
    
    Merci de m’avoir contacté. Je reviens vers vous rapidement !
    
    À très vite,
    Alexis`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendConfirmationEmail;