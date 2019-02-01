<?php
    $page = "";
    include('./include-php/head.php');
    include('./include-php/intro.php');
    include_once("./include-php/class.Search.php");
?>
        <style type="text/css">
            form#nuova_catalog fieldset div.data {
                left: 196px;
            }
        </style>
        <script language="JavaScript" type="text/javascript" src="./js/list_subscriber.js"></script>
        <title>Lista Iscritti</title>
    </head>
    <body>
<?php
    include_once("./include-php/menu.php");
    echo "\n";
        //Salvo e controllo parametri di ricerca da GET
    $Parametri_ricerca = array();
    isset($_GET['num_tes']) ? $Parametri_ricerca['num_tes'] = urldecode($_GET['num_tes']) : "";
    isset($_GET['data_isc']) ? $Parametri_ricerca['data_isc'] = urldecode($_GET['data_isc']) : "";
    isset($_GET['nome']) ? $Parametri_ricerca['nome'] = urldecode($_GET['nome']) : "";
    isset($_GET['cognome']) ? $Parametri_ricerca['cognome'] = urldecode($_GET['cognome']) : "";
    isset($_GET['professione']) ? $Parametri_ricerca['professione'] = urldecode($_GET['professione']) : "";
    isset($_GET['o']) ? $Parametri_ricerca['ordinamento'] = urldecode($_GET['o']) : "";
    isset($_GET['a']) ? $Parametri_ricerca['tipo_ordinamento'] = urldecode($_GET['a']) : "";
    $Stringa_param_ricerca = "";
    foreach ($Parametri_ricerca as $key => $value) {
        $Stringa_param_ricerca .= "&".$key."=".urlencode($value);
    }
    if(isset($_GET['prima'])) {
        $number_results = Search::GetCountSubscriber($objPDO,$Parametri_ricerca,$objUser->getAccess_level());
    } else {
        $number_results = $_GET['nt'];
    }
    $num_pagine = ceil($number_results / Search::NUMBER_USER_FOR_PAGE);
    $num_indice = ceil($num_pagine / 10);
    $from = (isset($_GET['p'])? (($_GET['p']-1)*Search::NUMBER_USER_FOR_PAGE) : 0);
?>
        <div id="corpo" class="corpo" role="main">
            <h3 class="parametri_ricerca">Parametri di ricerca:<em>
<?php
    !empty($Parametri_ricerca['num_tes']) ? print(" &minus; N&deg; tessera: ".Utility::Replace($Parametri_ricerca['num_tes'])) : '';
    !empty($Parametri_ricerca['data_isc']) ? print(" &minus; Data Iscrizione: ".Utility::Replace($Parametri_ricerca['data_isc'])) : '';
    !empty($Parametri_ricerca['nome']) ? print(" &minus; Nome: ".Utility::Replace($Parametri_ricerca['nome'])) : '';
    !empty($Parametri_ricerca['cognome']) ? print(" &minus; Cognome: ".Utility::Replace($Parametri_ricerca['cognome'])) : '';
    !empty($Parametri_ricerca['professione']) ? print(" &minus; Professione: ".Utility::Replace($Parametri_ricerca['professione'])) : '';
    echo '</em></h3>'."\n\t\t\t";
    $Subscriber = Search::GetSubscribers($objPDO,$Parametri_ricerca,$from,$objUser->getAccess_level());
    $number_subscribers = count($Subscriber);
    if($number_subscribers > 0)
    {
        if($number_subscribers > 1)
        {		
?>		
                <h3 class="ris">Sono stati trovati "<?php echo $number_results; ?>" RISULTATI!</h3>	
<?php	
        }
        else
        {	
?>		
                <h3 class="ris">&Egrave; stato trovato un solo RISULTATO!</h3>
<?php		
        }		
?>		
            <div id="container-subscriber" class="container-subscriber">
<?php		
        // Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
        for($i = 0;$i < $number_subscribers;$i++)
        {	
            echo "\t\t\t\t".'<ul class="subscriber" tabindex="0">'."\n";
            echo "\t\t\t\t\t".'<li><a href="./card_subscriber.php?id_iscritto='.$Subscriber[$i]['id_iscritto'].'&p='.$_GET['p'].(isset($_GET['ni']) ? ('&ni='.$_GET['ni']) : '').'&tr="><img class="image_subscriber" alt="Immagine Utente" title="Immagine Utente" src="'.$Subscriber[$i]['simage'].'" /></a></li>';
            echo "\t\t\t\t\t".'<li><strong><a href="./card_subscriber.php?id_iscritto='.$Subscriber[$i]['id_iscritto'].'&p='.$_GET['p'].(isset($_GET['ni']) ? ('&ni='.$_GET['ni']) : '').'&tr=">Numero Tessera: '.$Subscriber[$i]['nnum_tessera'].'</a></strong></li>';
            echo '<li><em><a href="./card_subscriber.php?id_iscritto='.$Subscriber[$i]['id_iscritto'].'&p='.$_GET['p'].(isset($_GET['ni']) ? ('&ni='.$_GET['ni']) : '').'&tr=">'.$Subscriber[$i]['snome'].' '.$Subscriber[$i]['scognome'].' ('.$Subscriber[$i]['sprofessione'].')</a></em></li>';						
            echo '<li><a href="./card_subscriber.php?id_iscritto='.$Subscriber[$i]['id_iscritto'].'&p='.$_GET['p'].(isset($_GET['ni']) ? ('&ni='.$_GET['ni']) : '').'&tr=">'.Utility::DateTimeTransform($Subscriber[$i]['ddate_nascita']).'</a></li>';
            echo '<li><a href="./card_subscriber.php?id_iscritto='.$Subscriber[$i]['id_iscritto'].'&p='.$_GET['p'].(isset($_GET['ni']) ? ('&ni='.$_GET['ni']) : '').'&tr=">'.$Subscriber[$i]['sindirizzo'].', '.$Subscriber[$i]['snum_civico'].' &minus; '.$Subscriber[$i]['slocalita'].'</a></li>';	
            echo '<li class="icona-modifica"><a href="./edit_subscriber.php?id_iscritto='.$Subscriber[$i]['id_iscritto'].'"><img alt="Icona modifica" title="Modifica i dati di questo Utente" src="./images/icone/icona-modifica.png" /></a></li>';
            echo '<li class="icona-prestito"><a href="./add_loan.php?num_tes='.$Subscriber[$i]['nnum_tessera'].'"><img alt="Icona prestito" title="Fai un prestito a questo Utente" src="./images/icone/icona-aggiungi-prestito-hover.png" /></a></li>';
            echo "\n\t\t\t".'</ul>';
        }
        echo "\n\t\t\t".'</div>';
        require './include-php/pagine.php';
    }
    else
    {
            echo '<h2 class="no_result">Nessun ISCRITTO con questa ricerca</h2>';					
    }
    include('./include-php/end_gestione.php');
?>