from flask import Flask
from routes import siret

app = Flask(__name__)

# Définissez une route POST pour la fonction siret.get_siret_data()
@app.route('/api/siret', methods=['POST'])
def siret_data():
    return siret.get_siret_data()

if __name__ == '__main__':
    app.run(debug=True)
