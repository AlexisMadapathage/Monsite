// Configure l'envoi d'email
const nodemailer = require("nodemailer");
require("dotenv").config();

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