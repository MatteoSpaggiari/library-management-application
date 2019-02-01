<?php
    include_once './include-php/redirect.php';
    switch($_GET['type'])
    {
        case "error_login":
            $title = "ERRORE LOGIN";
            $message = "Lo USERNAME e/o la PASSWORD sono errati, si prega di riprovare ad accedere o di cliccare su PASSWORD DIMENTICATA nella pagina principale per reimpostare una NUOVA PASSWORD.";
            $url = "./index.php";
        break;
        case "entry":
            $title = "Iscrizione avvenuta correttamente";
            $message = "Si prega di accedere alla propria mail e cliccare sul pulsante 'Conferma Email'.";
            $url = "./index.php";
        break;
        case "error_entry":
            $title = "ERRORE ISCRIZIONE";
            $message = "Purtroppo non &egrave; stato possibile inviare l'email di conferma di registrazione, si prega di contattare l'amministrazione a questo indirizzo <a title=\"Email amministrazione\" href=\"mailto:amministrazione@male4male.it\">amministrazione@male4male.it</a>.";
            $url = "./index.php";
        break;
        case "edit_profile":
            $title = "MODIFICA PROFILO";
            $message = "Modifica del PROFILO avvenuta correttamente";
            $url = "./profile.php";
        break;
        case "error_edit_profile":
            $title = "ERRORE MODIFICA PROFILO";
            $message = "Purtroppo non &egrave; stato possibile modificare il proprio profilo, si prega di contattare l'amministrazione a questo indirizzo <a title=\"Email amministrazione\" href=\"mailto:amministrazione@male4male.it\">amministrazione@male4male.it</a>.";
            $url = "./profile.php";
        break;
        case "change_image_profile":
            $title = "CAMBIO IMMAGINE PROFILO";
            $message = "L'IMMAGINE DEL PROFILO è stata cambiata correttamente.";
            $url = "./profile.php";
        break;
        case "error_change_image_profile":
            $title = "ERRORE CAMBIO IMMAGINE PROFILO";
            $message = "L'IMMAGINE DEL PROFILO non è stata cambiata correttamente, si prega di riprovare e/o di contattare l'amministrazione a questo indirizzo <a title=\"Email amministrazione\" href=\"mailto:amministrazione@male4male.it\">amministrazione@male4male.it</a>.";
            $url = "./change_image_profile.php";
        break;
        case "send_message":
            $title = "MESSAGGIO INVIATO CORRETTAMENTE";
            $message = "Il messaggio è stato inviato correttamente.";
            $url = "./home.php";
        break;
        case "error_send_message":
            $title = "ERRORE NELL'INVIO DEL MESSAGGIO";
            $message = "IL MESSAGGIO NON &Egrave; STATO INVIATO, si prega di riprovare e/o di contattare l'amministrazione a questo indirizzo <a title=\"Email amministrazione\" href=\"mailto:amministrazione@male4male.it\">amministrazione@male4male.it</a>.";
            $url = "./index.php";
        break;
        case "add_preferred":
            $title = "UTENTE AGGIUNTO AI TUOI PREFERITI";
            $message = "L'utente &egrave; stato aggiunto ai tuoi preferiti.";
            $url = "./preferred.php";
        break;
        case "error_add_preferred":
            $title = "ERRORE NELL'AGGIUNTA DELL'UTENTE AI TUOI PREFERITI";
            $message = "Probabilmente l'utente fa gi&agrave; parte dei tuoi PREFERITI, controlla, se cos&igrave; non fosse si prega di riprovare e/o di contattare l'amministrazione a questo indirizzo <a title=\"Email amministrazione\" href=\"mailto:amministrazione@male4male.it\">amministrazione@male4male.it</a>.";
            $url = "./preferred.php";
        break;
        default :
            redirect("./index.php");
        break;
    }
    include('./include-php/intro.php');
?>
    </head>
    <body id="info_page">
        <div id="container">
            <h2><?php echo $title; ?></h2>
            <p><?php echo $message; ?></p>
            <?php
                redirect( $url,"10" );
            ?>
            <p>Sarai indirizzato alla pagina corretta tra pochi secondi, altrimenti fai click sul link sottostante:</p>
            <p class="center"><a class="slinea" title="Torna alla pagina corretta" href="<?php echo $url; ?>">Torna alla pagina corretta</a></p>
        </div>
    </body>
</html>

