const connection = require('../services/connectBDD');

module.exports.create = async (req, res) => {
    res.status(200).json({ message: 'Création réussie.' });
}