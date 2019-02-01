        <header role="banner">
            <a title="Vai alla HOME" href="../index.php"><img id="logo_sx" class="logo" alt="Logo Matteo Spaggiari" title="Logo Matteo Spaggiari" src="../images/logoMSweb.png" /></a>
            <hgroup>
                <a title="Vai alla HOME" href="../index.php"><h1 title="Programma Gestione Biblioteca Lunetta">Programma Gestione Biblioteca</h1></a>
                <h2 class="utente_accesso">
<?php
    if($objUser->getAccess_level() == 3) {
            echo "\t\t\t\t<strong>Amministratore:</strong><em><a title=\"Accedi alla Pagina di Modifica Profilo\" href=\"../edit_profile.php\"><img id=\"operatore-image\" alt=\"Immagine Operatore\" title=\"Immagine Operatore\" src=\".".$objUser->getImage_profile()."\" />".$objUser->getName()." ".$objUser->getSurname()."</a></em>\n";
    } else if($objUser->getAccess_level() == 2) {
            echo "\t\t\t\t<strong>Operatore:</strong><em><a title=\"Accedi alla Pagina di Modifica Profilo\" href=\"../edit_profile.php\"><img id=\"operatore-image\" alt=\"Immagine Operatore\" title=\"Immagine Operatore\" src=\".".$objUser->getImage_profile()."\" />".$objUser->getName()." ".$objUser->getSurname()."</a></em>\n";		
    } else {
            echo "\t\t\t\t<strong>Altro:</strong><em><a title=\"Accedi alla Pagina di Modifica Profilo\" href=\"../edit_profile.php\"><img id=\"operatore-image\" alt=\"Immagine Operatore\" title=\"Immagine Operatore\" src=\".".$objUser->getImage_profile()."\" />".$objUser->getName()." ".$objUser->getSurname()."</a></em>\n";					
    }
		
?>
                &nbsp;(<a class="logout" alt="Esci" title="Esci" href="../azzera_sessioni.php?esci=si">Esci</a>)
                </h2>
            </hgroup>
            <a title="Vai alla HOME" href="../index.php"><img id="logo_dx" class="logo" alt="Logo Matteo Spaggiari" title="Logo Matteo Spaggiari" src="../images/logoMSweb.png" /></a>
        </header>
        <aside>
            <div id="mini-menu-query" class="mini-menu-query">
                <ul id="container-button" class="container-button">
                <?php
                    if(isset($_GET['action']) && $_GET['action'] == "visual_classi")
                    {
                ?>
                
                <?php
                        $query_string = str_replace('&action=visual_classi', '',$_SERVER['QUERY_STRING']);
                        echo '<li><a alt="Torna Pagina Iniziale" title="Torna Pagina Iniziale" href="./iscritti_per_classe.php?action=crea_classi&'.$query_string.'">Torna</a></li>';
                ?>
                
                <?php
                    }
                    else
                    {
                ?>
                    <li>
                        <a alt="Torna Pagina Iniziale" title="Torna Pagina Iniziale" href="../index.php">Torna</a>
                    </li>
                <?php
                    }
                ?>
                    <li>
                        <a id="stampa" alt="Stampa" title="Stampa" href="#">Stampa</a>
                    </li>
                </ul>
            </div>
        </aside>