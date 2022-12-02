# Demeter
Une application web de gestion créée dans le cadre du cours Projet de développement d'applications de 3e année du programme de Techniques de l'informatique du Cégep de Sherbrooke.

Cette application est composée d'un serveur NodeJS avec Express et Sequilize, et d'un client React TypesScript.

## Commandes

### Démarrage de l'application
Pour démarrer l'application dans un environnement local de développement, il suffit simplement d'entrer la commande suivante à la racine du projet:
```
$ docker-compose up -d
```

### Démarrage de l'application sur un serveur
Pour démarrer l'application sur un serveur distant, il faut joindre le fichier de production en paramètre:
```
$ docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d
```

## Auteurs
- Valery Beauchemin
- [Étienne Ménard](https://github.com/vortydev)
- David Pelletier
- Isabelle Rioux