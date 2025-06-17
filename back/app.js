// app.js
/**
 * ajout des "bibliothèques" nécessaires
*/

const mariadb = require('mariadb');
const express = require("express");
const cors = require("cors");
const application = express();
const port = process.env.PORT || 3000; // Le port d'écoute, peut être défini ds 1 fichier ".env" (comme ls variables globales ds 1 fichier global.h en C)

// verif du port
application.listen(port, () => {
    console.log(`Le serveur tourne actuellement sur le port ${port}`);
});

async function main() { // le main (boucle d'evnmnt) 
    try {
        // On établit la co à la bdD
        const connection = await mariadb.createConnection({
            host: 'localhost', // adresse du serveur bdD
            user: 'root',      // nm d'utilisateur bdD
            password: '',      // mdp(souvent vide pour root en local)
            database: 'maBdD', // nm bdD
        });

        console.log("Vous êtes connecté à la base de donnée");

        // Gérer ls erreurs de co
        await connection.end();
        console.log(" Connexion fermée");
    } catch (err) {
        console.error(" Erreur :", err);

        /**
         * !!! Ne pas oublier de fermer la connexion qd l'app s'arrête
         * On s'assure que la fermeture ne s'exécute qu'une seule fois
         */

        let isShuttingDown = false;

        process.on('SIGINT', () => {
            // Si la fermeture est déjà en cours, ne rien faire
            if (isShuttingDown) {
                console.log('L\'application est en cours de fermeture.');
                return;
            }

            isShuttingDown = true; // Ici l'app est censée être fermée 
            console.log('Signal SIGINT reçu. Tentative de fermeture de la connexion en cours ...');

            try {
                // Tentative de fermer la connexion
                connexion.end((err) => {
                    if (err) {
                        /**
                        *  Si erreur pdt fermeture (par ex, la co était déjà fermée / le serveur),
                        +  si elle pop de manière async dans le processus de `end`.
                        */
                        console.error('Erreur lors de la fermeture de la connexion', err.stack);
                        process.exit(1); // Quit avec 1 code d'erreur

                    } else {
                        console.log('Connexion fermée avec succès.');
                        process.exit(0); // Quit proprement
                    }
                });

            } catch (e) {
                // Capture les erreurs synchrones qui peuvent être lancées par `connexion.end()` + si la connexion est déjà dans un état fermé et ne peut pas accepter de nouvelles commandes.
                console.warn('La connexion était probablement déjà fermée ou en état d\'erreur lors de la tentative de fermeture :', e.message);
                process.exit(0); // Quitter proprement, car l'objectif de fermeture a été atteint (même si la connexion était déjà fermée)
            }
        });

        // REQUETES SQL HERE 
        // (Pr ls requetes, utiliser 'connexion.query' ???)

        const sqlUser = `
            CREATE TABLE users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                location VARCHAR(100) NOT null,
                email VARCHAR(255) NOT NULL UNIQUE,
                psw VARCHAR(255) NOT NULL
                
            );`

        console.log("Table users créée ou déjà existante");

        const sqlAutopsy = `
            CREATE TABLE autopsy (
                id INT PRIMARY KEY AUTO_INCREMENT,
                documentNumber INT,
                coordoninates VARCHAR(255),
                juridiction, VARCHAR(255),
                subjectName VARCHAR(255),
                subjectLastName VARCHAR(255),
                subjectBirtDate VARCHAR(255)
            );`

        console.log("Table autopsy créée ou déjà existante");

        const sqlInjuriesCat = `
            CREATE TABLE injuriesCat (
                idCat INT PRIMARY KEY AUTO_INCREMENT,
                injuryType VARCHAR(255)
            );`

        console.log("Table injuriesCat créée ou déjà existante");

        const sqlInjureis = `
            CREATE TABLE injuries (
                id INT PRIMARY KEY AUTO_INCREMENT,
                injuryName VARCHAR(255),
                injuryDescription VARCHAR(255),
                FOREIGN KEY (idCat) REFERENCES inJuriesCat(idCat) 
            );`

        console.log("Table injuries créée ou déjà existante");

        // LES ENDPOINTS AVEC LES METHODES (fonctions callback)


        application.get("/", (req, res) => {
            res.send("Bienvenue sur l'API de l'application de forensic");
        }
        );










        /**
         * EVITER LES FUITES DE DATAS ET INJECTIONS PIRATES
         * Pour sanitariser les données de l'input utilisateur,
         * il faut retirer les données avant la concaténation du readfile 
         * ou alors refuser la requête utilisateur si elle n'est pas conforme (caractère indésirable par ex)
         * il est par ailleurs possible d'utiliser une regex à la place 
         */
        //req.url = req.url.replaceAll("../", "");






    }
}







/**
 * MEMO
 */

// raccourci console log => tapper "log" puis choisir "log to console"

// ORG + STRUCTURE

/**
 * PhPMyAdmin ou postgreSQL (SGBD) pr relier la bdD au fichier node  
 * création des tables
 *  
commandes SQL 
 pour créer une database : CREATE DATABASE forensicDb;

 pour manipuler la database : USE forensicDb;

 pour montrer la database : SHOW DATABASES;

 pour créer une table : CREATE TABLE;

 * 
 * 
 */
