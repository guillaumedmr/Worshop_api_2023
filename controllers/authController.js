const connection = require('../services/connectBDD');
const uuid = require('uuid');

module.exports.signupUser = async (req, res) => {
    try {
      // Récupérez les données du formulaire d'inscription depuis req.body
      const { u_nom, u_prenom, u_login, u_mail, u_telephone, u_age, u_password, u_sexe } = req.body;

      const u_token = uuid.v4();

  
      // Insérez les données dans la base de données
      const sql = `
        INSERT INTO coeurlocal.utilisateur
        (u_nom, u_prenom, u_login, u_mail, u_telephone, u_age, u_password, u_nombre_point, u_sexe, u_token)
        VALUES(?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
      `;
  
      connection.query(
        sql,
        [u_nom, u_prenom, u_login, u_mail, u_telephone, u_age, u_password, u_sexe, u_token],
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
  
  module.exports.signinUser = async (req, res) => {
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
            const user = results[0];
            req.session.loggedInUser = user.u_token;
            console.log("Connexion reussi")
            res.status(200).json({ message: 'Connexion réussie.', token: user.u_token });
          } else {
            // L'authentification a échoué
            res.status(200).json({ message: 'Email ou mot de passe incorrect.' });
          }
        }

      });

    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
    }
  };

  module.exports.signupOrg = async (req, res) => {
    try {
      // Récupérez les données du formulaire d'inscription depuis req.body
      const { o_nom, o_siret, o_adresse, o_code_postal, o_ville, o_forme_juridique, o_mail, o_telephone, o_interlocuteur, o_password, o_activite, o_site_web } = req.body;

      const o_token = uuid.v4();

  
      // Insérez les données dans la base de données
      const sql = `
      INSERT INTO coeurlocal.organisateur
      (o_nom, o_siret, o_adresse, o_code_postal, o_ville, o_forme_juridique, o_mail, o_telephone, o_interlocuteur, o_password, o_activite, o_token, o_site_web)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      `;
  
      connection.query(
        sql,
        [o_nom, o_siret, o_adresse, o_code_postal, o_ville, o_forme_juridique, o_mail, o_telephone, o_interlocuteur, o_password, o_activite, o_token, o_site_web],
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

  module.exports.signinOrg = async (req, res) => {
    try {
      // Récupérez les données d'authentification depuis req.body
      const { o_mail, o_password } = req.body;
  
      const sql = 'SELECT * FROM organisateur WHERE o_mail = ? AND o_password = ?';
      connection.query(sql, [o_mail, o_password], (err, results) => {
        if (err) {
          console.error('Erreur lors de la connexion :', err);
          res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
        } else {
          if (results.length === 1) {
            // L'utilisateur est authentifié avec succès
            const user = results[0];
            const sessionData = req.session.loggedInUser;
            sessionData = user.o_token;
            res.status(200).json({ message: 'Connexion réussie.', token: user.o_id });
          } else {
            // L'authentification a échoué
            res.status(200).json({ message: 'Email ou mot de passe incorrect.' });
          }
        }

      });
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
    }
  };

  module.exports.checkAuth = async (req, res) => {
    console.log(req.session)
    if (req.session.loggedInUser) {
      // L'utilisateur est authentifié, vous pouvez obtenir son e-mail
      console.log('Utilisateur connecté.');
      res.status(200).json({ message: 'Utilisateur authentifié'});
    } else {
      // L'utilisateur n'est pas authentifié
      console.log('Utilisateur non connecté.');
      res.status(200).json({ message: 'Utilisateur non connecté.' });
    }
  };

  module.exports.logout = async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: 'Une erreur est survenue lors de la déconnexion.' });
      } else {
        res.status(200).json({ message: 'Utilisateur déconnecté.'});
      }
    });
  }