const connection = require('../services/connectBDD');
const axios = require('axios');
const key_api_map = process.env.SECRET_API_MAPBOX;

module.exports.getAllMission = async (req, res) => {
  const sql = `
  SELECT m.m_nom, m.m_adresse, m.m_location, m.m_date, m.m_nombre_participant, m.m_description, m.m_majeur, c.c_name as categorie, o.o_nom as organisateur, o.o_telephone as telephone_organisateur, o.o_mail as mail_organisateur
  FROM mission m
  JOIN categorie c ON c.c_id = m.m_id_categorie 
  JOIN organisateur o ON o.o_id = m.m_id_organisateur
  WHERE m.m_date_suppression IS NULL;
  `

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête SQL :', err);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des missions.' });
    } else {
      // Renvoyer les résultats en format JSON
      res.status(200).json(results);
    }
  });
}

module.exports.create = async (req, res) => {
    if (req.session.loggedInUser) {
        try {
            // Récupérez les données du formulaire d'inscription depuis req.body
            const { m_nom, m_adresse, m_date, m_nombre_participant, m_description, m_id_categorie, m_majeur } = req.body;  
        
            // Insérez les données dans la base de données
            const sql = `
                INSERT INTO mission
                (m_nom, m_adresse, m_location, m_date, m_nombre_participant, m_id_organisateur, m_description, m_id_categorie, m_majeur)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

            const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${m_adresse}.json?access_token=${key_api_map}`;
        
            // Effectuez la requête GET à l'API Mapbox
            const response = await axios.get(apiUrl);
        
            // Vérifiez si la requête a réussi
            if (response.status === 200) {
                // Récupérez les données de réponse JSON
                const data = response.data;
                
                const m_location = (data.features[0].center).join(', ');

                const m_id_organisateur = req.session.loggedInUser[1];
        
                connection.query(
                sql,
                [m_nom, m_adresse, m_location, m_date, m_nombre_participant, m_id_organisateur, m_description, m_id_categorie, m_majeur],
                (err, results) => {
                    if (err) {
                    console.error('Erreur lors de la création :', err);
                    res.status(500).json({ message: 'Une erreur est survenue lors de la création.' });
                    } else {
                    console.log('Création de la mission avec succès');
                    res.status(200).json({ message: 'Création réussie.' });
                    }
                }
                );
            } else {
              throw new Error('La requête vers l\'API Mapbox a échoué.');
            }

          } catch (error) {
            console.error('Erreur lors de la création de mission :', error);
            res.status(500).json({ message: 'Une erreur est survenue lors de la création de mission.' });
          }
      } else {
        // L'utilisateur n'est pas authentifié
        res.status(401).json({ message: 'Accès non autorisé.' });
      }
}
