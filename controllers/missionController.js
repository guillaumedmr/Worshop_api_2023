const connection = require('../services/connectBDD');
const axios = require('axios');
const key_api_map = process.env.SECRET_API_MAPBOX;

    async function fetchMapboxData(string) {            
        try {
            // Définissez l'URL de l'API Mapbox
            const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${string}.json?access_token=${key_api_map}`;
        
            // Effectuez la requête GET à l'API Mapbox
            const response = await axios.get(apiUrl);
        
            // Vérifiez si la requête a réussi
            if (response.status === 200) {
              // Récupérez les données de réponse JSON
              const data = response.data;

              return data.features[0].center;
            } else {
              throw new Error('La requête vers l\'API Mapbox a échoué.');
            }
          } catch (error) {
            console.error('Erreur lors de la requête Mapbox :', error);
            throw error;
          }
    }

    module.exports.map = async (req, res) => {
        const search = req.body['search'];
        console.log(fetchMapboxData(search));
    }


module.exports.create = async (req, res) => {
    if (req.session.loggedInUser) {
        try {
            // Récupérez les données du formulaire d'inscription depuis req.body
            const { m_nom, m_adresse, m_date, m_nombre_participant, m_description, m_id_categorie } = req.body;  
        
            // Insérez les données dans la base de données
            const sql = `
                INSERT INTO mission
                (m_nom, m_adresse, m_location, m_date, m_nombre_participant, m_id_organisateur, m_description, m_id_categorie)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?);
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
                [m_nom, m_adresse, m_location, m_date, m_nombre_participant, m_id_organisateur, m_description, m_id_categorie],
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