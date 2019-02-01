<?php
    $page = "";
    include('./include-php/head.php');
    include('./include-php/intro.php');
    include_once("./include-php/class.Search.php");
?>
        <title>Lista Catalogazioni</title>
    </head>
    <body>
<?php
    include_once("./include-php/menu.php");
    echo "\n";
        //Salvo e controllo parametri di ricerca da GET
    $Parametri_ricerca = array();
    isset($_GET['isbn']) ? $Parametri_ricerca['isbn'] = urldecode($_GET['isbn']) : "";
    isset($_GET['proprieta']) ? $Parametri_ricerca['proprieta'] = urldecode($_GET['proprieta']) : "";
    isset($_GET['num_inv']) ? $Parametri_ricerca['num_inv'] = urldecode($_GET['num_inv']) : "";
    isset($_GET['dewey']) ? $Parametri_ricerca['dewey'] = urldecode($_GET['dewey']) : "";
    isset($_GET['titolo']) ? $Parametri_ricerca['titolo'] = urldecode($_GET['titolo']) : "";
    isset($_GET['autore']) ? $Parametri_ricerca['autore'] = urldecode($_GET['autore']) : "";
    isset($_GET['genere']) ? $Parametri_ricerca['genere'] = urldecode($_GET['genere']) : "";
    isset($_GET['collana']) ? $Parametri_ricerca['collana'] = urldecode($_GET['collana']) : "";
    isset($_GET['scaffale']) ? $Parametri_ricerca['scaffale'] = urldecode($_GET['scaffale']) : "";
    isset($_GET['data_c']) ? $Parametri_ricerca['data_c'] = urldecode($_GET['data_c']) : "";
    isset($_GET['data_a']) ? $Parametri_ricerca['data_a'] = urldecode($_GET['data_a']) : "";
    isset($_GET['o']) ? $Parametri_ricerca['ordinamento'] = urldecode($_GET['o']) : "";
    isset($_GET['a']) ? $Parametri_ricerca['tipo_ordinamento'] = urldecode($_GET['a']) : "";
    $Stringa_param_ricerca = "";
    foreach ($Parametri_ricerca as $key => $value) {
        $Stringa_param_ricerca .= "&".$key."=".urlencode($value);
    }
    if(isset($_GET['prima'])) {
        $number_results = Search::GetCountCatalog($objPDO,$Parametri_ricerca,$objUser->getAccess_level());
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
    !empty($Parametri_ricerca['isbn']) ? print(" &minus; ".Utility::Replace($Parametri_ricerca['isbn'])) : '';
    !empty($Parametri_ricerca['proprieta']) ? print(" &minus; ".Utility::Replace($Parametri_ricerca['proprieta'])) : '';
    !empty($Parametri_ricerca['num_inv']) ? print(" &minus; ".Utility::Replace($Parametri_ricerca['num_inv'])) : '';
    !empty($Parametri_ricerca['dewey']) ? print(" &minus; ".Utility::Replace($Parametri_ricerca['dewey'])) : '';
    !empty($Parametri_ricerca['titolo']) ? print(" &minus; ".Utility::Replace($Parametri_ricerca['titolo'])) : '';
    !empty($Parametri_ricerca['autore']) ? print(" &minus; ".Utility::Replace($Parametri_ricerca['autore'])) : '';
    !empty($Parametri_ricerca['genere']) ? print(" &minus; ".Utility::Replace($Parametri_ricerca['genere'])) : '';
    !empty($Parametri_ricerca['collana']) ? print(" &minus; ".Utility::Replace($Parametri_ricerca['collana'])) : '';
    !empty($Parametri_ricerca['scaffale']) ? print(" &minus; ".Utility::Replace($Parametri_ricerca['scaffale'])) : '';
    !empty($Parametri_ricerca['data_c']) ? print(" &minus; ".Utility::Replace($Parametri_ricerca['data_c'])) : '';
    !empty($Parametri_ricerca['data_a']) ? print(" &minus; ".Utility::Replace($Parametri_ricerca['data_a'])) : '';
    echo '</em></h3>'."\n\t\t\t";
    $Catalog = Search::GetCatalog($objPDO,$Parametri_ricerca,$from,$objUser->getAccess_level());
    $number_catalog = count($Catalog);
    if($number_catalog > 0)
    {
        if($number_catalog > 1)
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
            <div id="container-catalog" class="container-catalog">             
<?php
        
        // Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
        for($i = 0;$i < $number_catalog;$i++)
        {	
            echo "\t\t\t\t".'<ul class="catalog" tabindex="0">'."\n";
            echo "\t\t\t\t\t".'<li><a href="./card_catalog.php?id_catalog='.$Catalog[$i]['id_catalog'].'&p='.$_GET['p'].(isset($_GET['ni']) ? ('&ni='.$_GET['ni']) : '').'&tr="><img class="image_catalog" alt="Immagine Catalogazione" title="Immagine Catalogazione" src="'.$Catalog[$i]['simage'].'" /></a></li>';
            echo "\t\t\t\t\t".'<li><strong><a href="./card_catalog.php?id_catalog='.$Catalog[$i]['id_catalog'].'&p='.$_GET['p'].(isset($_GET['ni']) ? ('&ni='.$_GET['ni']) : '').'&tr=">'.$Catalog[$i]['csigla_inv'].$Catalog[$i]['snum_inv'].'</a></strong></li>';
            echo "\t\t\t\t\t".'<li><em><a href="./card_catalog.php?id_catalog='.$Catalog[$i]['id_catalog'].'&p='.$_GET['p'].(isset($_GET['ni']) ? ('&ni='.$_GET['ni']) : '').'&tr=">'.$Catalog[$i]['stitolo'].'</a></em></li>';
            echo "\t\t\t\t\t".'<li><em><a href="./card_catalog.php?id_catalog='.$Catalog[$i]['id_catalog'].'&p='.$_GET['p'].(isset($_GET['ni']) ? ('&ni='.$_GET['ni']) : '').'&tr=">'.$Catalog[$i]['sautore'].'</a></em></li>';
            echo "\t\t\t\t\t".'<li><a href="./card_catalog.php?id_catalog='.$Catalog[$i]['id_catalog'].'&p='.$_GET['p'].(isset($_GET['ni']) ? ('&ni='.$_GET['ni']) : '').'&tr=">'.$Catalog[$i]['sgenere'].'</a></li>';	
            echo "\t\t\t\t\t".'<li><strong><a href="./card_catalog.php?id_catalog='.$Catalog[$i]['id_catalog'].'&p='.$_GET['p'].(isset($_GET['ni']) ? ('&ni='.$_GET['ni']) : '').'&tr=">'.$Catalog[$i]['sscaffale'].'</a></strong></li>'."\n";	
            echo "\t\t\t\t\t".'<li class="icona-modifica"><a href="./edit_catalog.php?id_catalog='.$Catalog[$i]['id_catalog'].'"><img alt="Modifica Catalogazione" title="Accedi alla pagina di Modifica Catalogazione" src="./images/icone/icona-modifica.png" /></a></li>';
            echo "\t\t\t\t\t".'<li class="icona-prestito"><a href="./add_loan.php?sigla_inv='.$Catalog[$i]['csigla_inv'].'&num_inv='.$Catalog[$i]['snum_inv'].'"><img alt="Presta questa Catalogazione" title="Accedi alla pagina dei Prestiti" src="./images/icone/icona-aggiungi-prestito-hover.png" /></a></li>';
            echo "\n\t\t\t".'</ul>';
        }
        echo '</div>';
        require './include-php/pagine.php';
    }
    else
    {
            echo '<h2 class="no_result">Nessuna CATALOGAZIONE con questa ricerca</h2>';					
    }
    include('./include-php/end_gestione.php');
?>