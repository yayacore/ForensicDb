const express = require("express");
const cors = require("cors");
const mariadb = require("mariadb");

const app = express();
app.use(express.json());
app.use(cors());

async function main() {
    try {
        const connection = await mariadb.createConnection({
            host: 'localhost', // L'adresse du serveur bdD
            user: 'root',      // Le nm d'utilisateur bdD
            password: '',      // Le mot de passe (souvent vide pour root en local)
            database: 'maBdD', // Le nm bdD
        });

        console.log(" Connecté à MariaDB");













        // Créer la table Quizz
        // const sqlQuizz = 
        //     CREATE TABLE IF NOT EXISTS Quizz (
        //         id INT AUTO_INCREMENT PRIMARY KEY,
        //         titre VARCHAR(255) NOT NULL,
        //         description TEXT,
        //         date_creation DATETIME DEFAULT CURRENT_TIMESTAMP
        //     );
        // ;
        // await connection.query(sqlQuizz);
        // console.log(" Table Quizz créée ou déjà existante");











        // Fermer la connexion
        await connection.end();
        console.log(" Connexion fermée");
    } catch (err) {
        console.error(" Erreur :", err);
    }
}

main();