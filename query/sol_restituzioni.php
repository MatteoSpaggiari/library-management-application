<?php
    include('./head.php');
    include('./intro.php');
?>
        <link rel="stylesheet" type="text/css" media="print" href="../css/print_table.css" />
        <title>Sollecito Restituzioni</title>
    </head>
    <body>
<?php
    include_once("./header.php");
?>
    <main class="query">
        <div id="corpo" class="corpo">
<?php
    include_once("./menu-query.php");
?>
<?php
    $Sollecito_restituzioni = Utility::GetSollecitoRestituzioni($objPDO);
    $Num_row_tot = count($Sollecito_restituzioni);
    if($Num_row_tot > 0) {
?>
            <div class="query">
            <table id="table-sollecito-restituzioni" class="table-sollecito-restituzioni">
                <caption>
                    Sollecito Restituzioni
                    <br />
<?php            
        if($Num_row_tot > 1) {		
?>
                    <span class="ris">Sono stati trovati <span class="slinea"><?php echo $Num_row_tot; ?></span> prestiti</span>
<?php	
        } else {	
?>		
                    <span class="ris">&Egrave; stato trovato un solo RISULTATO!</span>
<?php		
        }
?>
                </caption>
                <tr>
                    <th width="12%">Autore</th>
                    <th width="12%">Titolo</th>		
                    <th width="7%">N&deg; Tessera</th>
                    <th width="10%">Nome</th>
                    <th width="10%">Cognome</th>
                    <th width="10%">Telefono</th>
                    <th width="8%">Data Prestito</th>
                    <th width="8%">Data Restituzione</th>
                    <th width="5%">Novit&agrave;</th>
                    <th width="13%">Note</th>
                    <th width="5%">Timbro</th>
                </tr>
<?php		
        // Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
        $odd = true;
        for($i=0;$i<$Num_row_tot;$i++)
        {
            echo ($odd == true) ? "\t\t\t\t".'<tr class="odd_row">'."\n" : "\t\t\t\t".'<tr class="even_row">'."\n";
            $odd = !$odd;
            echo "\t\t\t\t\t".'<td><strong><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Sollecito_restituzioni[$i]['id_catalog'].'">'.$Sollecito_restituzioni[$i]['sautore'].'</a></strong></td>';
            echo '<td><strong><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Sollecito_restituzioni[$i]['id_catalog'].'">'.$Sollecito_restituzioni[$i]['stitolo'].'</a></strong></td>';						
            echo '<td class="center"><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Sollecito_restituzioni[$i]['id_iscritto'].'">'.$Sollecito_restituzioni[$i]['nnum_tessera'].'</a></em></td>';
            echo '<td><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Sollecito_restituzioni[$i]['id_iscritto'].'">'.$Sollecito_restituzioni[$i]['snome'].'</a></em></td>';
            echo '<td><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Sollecito_restituzioni[$i]['id_iscritto'].'">'.$Sollecito_restituzioni[$i]['scognome'].'</a></em></td>';
            echo '<td class="center"><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Sollecito_restituzioni[$i]['id_iscritto'].'">'.$Sollecito_restituzioni[$i]['stel_casa'].'</a><br /><a class="catalog" href="./scheda_utente.php?id_iscritto='.$Sollecito_restituzioni[$i]['id_iscritto'].'">'.$Sollecito_restituzioni[$i]['stel_cell'].'</a></em></td>';
            echo '<td class="center">'.Utility::DateTimeTransform($Sollecito_restituzioni[$i]['ddate_pres'],"date").'</td>';
            echo '<td class="center">'.Utility::DateTimeTransform($Sollecito_restituzioni[$i]['ddate_res'],"date").'</td>';	
            echo '<td class="center"><a class="catalog" href="../card_catalog.php?id_catalog='.$Sollecito_restituzioni[$i]['id_catalog'].'">'.Utility::modVoce($Sollecito_restituzioni[$i]['enovita']).'</a></td>';
            echo '<td class="sospeso">'.($Sollecito_restituzioni[$i]['esospeso'] == "Y" ? "UTENTE SOSPESO" : "").'</td>';
            echo '<td></td>'."\n\t\t\t\t".'<tr>'."\n";
        }
        echo "\t\t\t".'</table></div>';
    } else {
        echo "\n\t\t\t".'<div class="query"><h2 class="tit_altre_oper">Sollecito Restituzioni</h2><h3>Nessun sollecito restituzione</h3></div>'."\n";					
    }
?>
        </div>
<?php
    include('../include-php/end_gestione.php');
?>