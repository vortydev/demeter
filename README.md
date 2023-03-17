# Demeter
Une application web de gestion créée dans le cadre du cours Projet de développement d'applications de 3e année du programme de Techniques de l'informatique du Cégep de Sherbrooke.

Cette application est composée d'un serveur NodeJS avec Express et Sequilize, et d'un client React TypeScript.

## Commandes

### Démarrage de l'application
Pour démarrer l'application dans un environnement local de développement, il suffit simplement d'entrer la commande suivante à la racine du projet:
```
$ docker-compose up -d
```

### Démarrage de l'application en production
Pour démarrer l'application sur un serveur de production, il faut joindre le fichier de production en paramètre:
```
$ docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build
```

### Sauvegarder la base de données
Pour effectuer une sauvegarde de la base de données, il suffit d'exécuter le script suivant:
```
$ bash backup-db.sh
```
Les sauvegardes sont groupées sous `/backups/`.

### Restaurer une sauvegarde
Pour restaurer une sauvegarde, exécutez le script suivant:
```
$ bash restore-db.sh
```
Entrez le numéro du fichier que vous voulez restaurer, puis confirmez.

## Auteurs
- [Étienne Ménard](https://github.com/vortydev)
- Valery Beauchemin
- Isabelle Rioux
- David Pelletier