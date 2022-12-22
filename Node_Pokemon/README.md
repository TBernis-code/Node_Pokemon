# API Pokémon Par Tony Bernis

Cette API permet d'enregistrer des dresseurs et des pokemons, ainsi que de faire des échanges entre les dresseurs. 

Elle a été développée avec Node.js et utilise Express comme framework de routing, Sequelize comme ORM pour la gestion de la base de données, Mocha et Supertest pour les tests, Swagger pour la documentation de l'API et OAuth2 pour le système d'identification avec des Bearer Tokens. 

Enfin, Winston est utilisé pour la création de logs et Eslint est utilisé pour assurer la qualité du code.
Ce projet utilise Docker et Docker Compose pour faciliter son déploiement et sa mise en place.

## Prérequis

Docker et Docker Compose installés sur votre ordinateur

## Installation

1. Clonez ce dépôt sur votre ordinateur
2. Créez un fichier .env à partir du fichier .env.example et remplissez les valeurs avec vos informations de configuration de base de données 
3. Exécutez la " commande docker-compose build " pour construire les images Docker
4. Exécutez la commande " docker-compose up " pour démarrer le serveur et la base de données (Par défaut, le serveur est accessible à l'adresse http://localhost:8081)

## Documentation

La documentation de l'API est générée à l'aide de Swagger et est disponible à l'adresse http://localhost:8081/api-docs une fois le serveur démarré.

## Tests

Pour exécuter les tests, utilisez la commande "npm run test" dans le dossier Node_Pokemon une fois le serveur démarré. Les tests sont exécutés avec Mocha et Supertest. 

## Logs

Les logs sont générés avec Winston et sont enregistrés dans un fichier log.log. 
Vous pouvez y accéder à l'adresse http://localhost:8081/logs une fois le serveur démarré. Il faut être connecté avec un compte dresseur avec des droit d'admin pour y accéder.