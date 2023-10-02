# routes/siret.py

from flask import jsonify, request

def get_siret_data():
    if request.method == 'POST':
        # Récupérez les données JSON du corps de la requête
        data = request.get_json()

        # Traitez les données (par exemple, faites quelque chose avec elles)
        # Ici, nous renvoyons simplement les mêmes données pour l'exemple
        return jsonify(data)

    return jsonify({'message': 'Aucun contenu n\'a été renseigné dans cette requête.'}), 400
