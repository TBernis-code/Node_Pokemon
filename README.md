# API Pokémon Par Tony Bernis

Cette API permet d'enregistrer des dresseurs et des Pokemons, ainsi que de faire des échanges entre les dresseurs. 

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
5. Utilisez le login "leopkmn" et le mot de passe "cynthia" pour vous connecter à l'API avec un compte admin créer par défault. Vous pouvez ensuite créer des comptes dresseurs et des Pokemons.


# Tests

Pour exécuter les tests, utilisez la commande "npm run test" dans le dossier Node_Pokemon une fois le serveur démarré. Les tests sont exécutés avec Mocha et Supertest. 

# Documentation

La documentation de l'API est générée à l'aide de Swagger et est disponible à l'adresse http://localhost:8081/api-docs une fois le serveur démarré.

Pour plus d'informations sur la structure du projet, voir la section "Structure du projet" ci-dessous.

# Logs

Les logs sont générés avec Winston et sont enregistrés dans un fichier log.log. 
Vous pouvez y accéder à l'adresse http://localhost:8081/logs une fois le serveur démarré. Il faut être connecté avec un compte dresseur avec des droit d'admin pour y accéder.

# Structure du projet
### Voici la structure du projet :

`app` : contient les fichiers de l'application, organisés en différents dossiers selon leur fonction

``config`` : contient les fichiers de configuration, tels que la configuration de la base de données

``controllers`` : contient les contrôleurs qui gèrent les logiques de l'application et les interactions avec les modèles

``middleware`` : contient les middlewares qui sont exécutés avant les routes et qui peuvent être utilisés pour vérifier l'authentification, la validation de données, etc.

``models`` : contient les modèles qui définissent les schémas de données de l'application et gèrent les interactions avec la base de données

``routes`` : contient les fichiers de routes qui gèrent les requêtes HTTP et définissent les actions à effectuer en fonction de l'URL et du type de requête

``test`` : contient les fichiers de tests de l'application

``.env.sample`` : un fichier d'exemple de configuration des variables d'environnement

``.eslintrc.yml`` : un fichier de configuration d'Eslint pour définir les règles de style de code
.gitignore : un fichier qui indique les fichiers à ignorer par Git

``Dockerfile`` : un fichier de configuration de l'image Docker de l'application

``README.md`` : ce fichier readme

``log.log`` : le fichier de log de l'application

``logger.js`` : un module qui gère la création de logs avec Winston

``package.json`` : un fichier qui décrit les dépendances de l'application et les scripts NPM disponibles

``server.js`` : le fichier d'entrée de l'application qui démarre le serveur et configure les middlewares et les routes

``swagger.json`` : un fichier de configuration de Swagger pour la documentation de l'API

# Problèmes connus

- Il y a parfois un problème avec la base de données qui ne se remplit pas correctement. Il faut donc relancer la commande "docker-compose up" pour que la base de données soit correctement remplie.
- 2 tests ne passent pas certaine fois, mais je n'ai pas réussi à les corriger. Il s'agit des tests de la route PUT /pokemons/:id et DELETE /pokemons/:id. Je n'ai pas réussi à trouver pourquoi.


### Attrapez les tous !