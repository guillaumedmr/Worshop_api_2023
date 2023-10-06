const crypto = require("crypto");

// Générer un sel aléatoire
const salt = crypto.randomBytes(16).toString("hex");

// Envoyer le sel au client (par exemple, en l'incluant dans la réponse JSON)
const responseData = {
  salt: salt,
  // ... autres données
};
res.json(responseData);