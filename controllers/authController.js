const connection = require('../services/connectBDD');
module.exports.signup = async (req, res) => {
    try {

      console.log(req.body)
      // Récupérez les données du formulaire d'inscription depuis req.body
      const { u_nom, u_prenom, u_login, u_mail, u_telephone, u_role, u_age, u_sexe, u_password } = req.body;

  
      // Insérez les données dans la base de données
      const sql = `
        INSERT INTO coeurlocal.utilisateur
        (u_nom, u_prenom, u_login, u_mail, u_telephone, u_role, u_age, u_sexe, u_nombre_point, u_password)
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
      `;
  
      connection.query(
        sql,
        [0, u_nom, u_prenom, u_login, u_mail, u_telephone, u_role, u_age, u_sexe, u_password],
        (err, results) => {
          if (err) {
            console.error('Erreur lors de l\'inscription :', err);
            res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription.' });
          } else {
            console.log('Utilisateur inscrit avec succès');
            res.status(200).json({ message: 'Inscription réussie.' });
          }
        }
      );
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription.' });
    }
  };
  
  module.exports.signin = async (req, res) => {
    try {
      // Récupérez les données d'authentification depuis req.body
      const { u_mail, u_password } = req.body;
  
      const sql = 'SELECT * FROM utilisateur WHERE u_mail = ? AND u_password = ?';
      connection.query(sql, [u_mail, u_password], (err, results) => {
        if (err) {
          console.error('Erreur lors de la connexion :', err);
          res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
        } else {
          if (results.length === 1) {
            // L'utilisateur est authentifié avec succès
            req.session.loggedInUser = u_mail;
            res.status(200).json({ message: 'Connexion réussie.' });
          } else {
            // L'authentification a échoué
            res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
          }
        }

      });
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
    }
  };

  module.exports.checkAuth = async (req, res) => {
    if (req.session.loggedInUser) {
      // L'utilisateur est authentifié, vous pouvez obtenir son e-mail
      res.status(200).json({ message: 'Utilisateur authentifié'});
    } else {
      // L'utilisateur n'est pas authentifié
      res.status(401).json({ message: 'Accès non autorisé.' });
    }
  };

  module.exports.logout = async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Erreur lors de la déconnexion :', err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la déconnexion.' });
      } else {
        res.status(200).json({ message: 'Utilisateur déconnecté.'});
      }
    });
  }
  
  