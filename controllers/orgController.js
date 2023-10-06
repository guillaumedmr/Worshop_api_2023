const connection = require('../services/connectBDD');

module.exports.getAllOrganisation = async (req, res) => {
    const sql = `
        select o_id, o_nom, o_siret, o_adresse, o_code_postal, o_ville, o_forme_juridique, o_mail, o_telephone, o_site_web, o_interlocuteur, o_activite from organisateur 
    `

    connection.query(sql, (err, results) => {
        if (err) {
          console.error('Erreur lors de la requête SQL :', err);
          res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des organisations.' });
        } else {
          // Renvoyer les résultats en format JSON
          res.status(200).json(results);
        }
      });
}

module.exports.getOrganisation = async (id, res) => {
    const sql = `
        SELECT o_id, o_nom, o_siret, o_adresse, o_code_postal, o_ville, o_forme_juridique, o_mail, o_telephone, o_site_web, o_interlocuteur, o_activite 
        FROM organisateur 
        WHERE o_id = ?`;

    const idAsString = id.toString();
    connection.query(sql, idAsString, (err, results) => {
        if (err) {
          console.error('Erreur lors de la requête SQL :', err);
          res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'organisation.' });
        } else {
          // Renvoyer les résultats en format JSON
          res.status(200).json(results);
        }
    });

    console.log("Requête SQL :", sql, "avec ID :", idAsString);

}
