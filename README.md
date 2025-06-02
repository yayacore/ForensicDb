# ForensicDataBase

Synopsis – Projet de fin de formation : Bibliothèque interactive de cas médico-légaux

Titre : CaseForensics

Description générale :
CaseForensics est une application web interactive permettant de consulter des cas médico-légaux fictifs ou historiques à des fins éducatives. Le site propose une liste de cas classés par type (accident, homicide, suicide, etc.), chacun accompagné d’un résumé, d’illustrations schématiques et d’explications scientifiques adaptées à un public étudiant ou curieux. L’objectif est de sensibiliser et d’informer sur les méthodes médico-légales utilisées pour résoudre des enquêtes. Un espace administrateur sécurisé par JWT permet de gérer les cas : ajout, modification et suppression.

Objectifs pédagogiques :
- Créer un projet web full-stack mêlant front-end et back-end.
- Implémenter une API REST sécurisée avec authentification JWT.
- Gérer une base de données MySQL pour stocker les cas et leurs détails.
- Proposer une interface utilisateur moderne et ergonomique avec React ou Angular.
- Respecter les bonnes pratiques en matière de développement web et de sécurité des données.

Fonctionnalités principales :
- Front-end :
  - Accueil avec liste des cas médico-légaux disponibles (titre, type et date).
  - Page de détail d’un cas avec résumé, explications détaillées et images schématiques.
  - Filtre des cas par type (accident, homicide, suicide, etc.).
  - Formulaire de connexion administrateur pour gérer les cas.

- Back-end :
  - API REST Express avec des routes publiques pour afficher les cas et leurs détails.
  - Routes protégées par JWT pour les opérations de gestion (CRUD).
  - Hachage des mots de passe administrateur avec bcrypt.
  - Connexion à une base de données MySQL pour stocker les informations des cas.

Stack technique :
- Front-end : React (ou Angular)
- Back-end : Node.js, Express, mysql2, bcrypt, jsonwebtoken.
- Base de données : MySQL/MariaDB via Docker.
- Outils : Docker, VSCode, Postman.

Public cible :
- Étudiants en médecine légale, criminologie ou tout public intéressé par les affaires médico-légales.
- Administrateurs (enseignants ou modérateurs) pour enrichir la base de données.

Durée estimée : 1 semaine.

Conclusion :
CaseForensics est un projet éducatif et interactif qui permet aux utilisateurs de découvrir les techniques médico-légales à travers des cas fictifs ou historiques. Le projet met en pratique les compétences acquises en développement full-stack.


!!! Ajouter le diagramme use cases & le MCD (cardinalités, relations SQL) !!!