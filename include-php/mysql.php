<?php	
    // define(NAME_DB,$_SESSION['name_db']);
    //Errore Connessione
    $err = '<h1>Non egrave; stato possibile collegarsi al DataBase. 
                    Controlla i tuoi parametri di connessioni e/o riprova.</h1>';

    // Connessione DataBase
    $db = mysql_connect('localhost', 'root', '') or
            die($err);

    // Collegamento a specifico DataBase (Use in MySql)
    mysql_select_db('programma_gestione_biblioteca', $db) or die(mysql_error($db));
?>