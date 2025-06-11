// app.js
const mariadb = require('mariadb'); // Si vous utilisez MariaDB, sinon mysql2 est suffisant
const express = require("express");
const cors = require("cors");
const application = express();
const port = process.env.PORT || 2077; // Le port d'écoute, peut être défini ds 1 fichier .env comme ls variables globales ds 1 fichier global.h en C

application.listen(port, () => {
    console.log(`Le serveur tourne actuellement sur le port ${port}`);
});

// On établit la co
const connexion = mysql.createConnection({
    host: 'localhost', // L'adresse du serveur bdD
    user: 'root',      // Le nm d'utilisateur bdD
    password: '',      // Le mot de passe (souvent vide pour root en local)
    database: 'maBdD', // Le nm bdD
});

// Gérer ls erreurs de connexion initiale (pr 1 co directe)
connexion.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err.stack);
        // Attention !!! : gérer cette erreur de la bonne façon (par ex arrêter l'app si la co est pas ouf)
        return;
    }
    console.log('Connecté à la base de données avec l\'ID de thread', connexion.threadId);
});

// REQUETES SQL HERE ?
// Pr ls requetes, utiliser 'connexion.query'

connexion.query('SELECT * FROM user', (err, results) => {
    if (err) {
        console.error('Erreur lors de l\'exécution de la requête :', err);
        return;
    }
    console.log('Résultats de la requête :', results);
});

// !!!!!!!!!!!!!    Ne pas oublier de fermer la connexion qd l'app s'arrête

//  On s'assure que la fermeture ne s'exécute qu'une seule fois
let isShuttingDown = false;

process.on('SIGINT', () => {
    // Si la fermeture est déjà en cours, ne rien faire
    if (isShuttingDown) {
        console.log('L\'application est en cours de fermeture.');
        return;
    }

    isShuttingDown = true; // Ici l'app est censée être fermée 
    console.log('Signal SIGINT reçu. Tentative de fermeture de la connexion MySQL...');

    try {
        // Tentative de fermer la connexion
        connexion.end((err) => {
            if (err) {
                /**
                *  Si une erreur survient pendant la fermeture (par exemple, la connexion était déjà fermée par le serveur)
                +  si elle pop de manière asynchrone dans le processus de `end`.
                */
                console.error('Erreur lors de la fermeture de la connexion MySQL (callback) :', err.stack);
                process.exit(1); // Quit avec 1 code d'erreur

            } else {
                console.log('Connexion MySQL fermée avec succès.');
                process.exit(0); // Quit proprement
            }
        });

    } catch (e) {
        // Capture les erreurs synchrones qui peuvent être lancées par `connexion.end()` + si la connexion est déjà dans un état fermé et ne peut pas accepter de nouvelles commandes.
        console.warn('La connexion MySQL était probablement déjà fermée ou en état d\'erreur lors de la tentative de fermeture :', e.message);
        process.exit(0); // Quitter proprement, car l'objectif de fermeture a été atteint (même si la connexion était déjà fermée)
    }
});

/**
 * MEMO
 */

// raccourci console log => tapper "log" puis choisir "log to console"

// ORG + STRUCTURE

/**
 * PhPMyAdmin ou postgreSQL (SGBD) pr relier la bdD au fichier node  
 * création des tables
 *  

CREATE DATABASE forensicDb;

USE forensicDb;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    location VARCHAR,
    user_id INT,
    passwrd VARCHAR
);

CREATE TABLE autopsy (
    id INT PRIMARY KEY AUTO_INCREMENT,
    documentNumber INT,
    coordoninates VARCHAR,
    juridiction, VARCHAR
    subjectName VARCHAR, 
    subjectLastName VARCHAR,
    subjectBirtDate VARCHAR
);

CREATE TABLE injuriesCat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    injuryType VARCHAR, 
);

CREATE TABLE injuries (
    id INT PRIMARY KEY AUTO_INCREMENT,
    injuryName VARCHAR,
    injuryDescription VARCHAR,
    idCat INT
);

 * 
 * 
 */