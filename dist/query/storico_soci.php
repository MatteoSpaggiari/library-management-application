<?php
    include('./head.php');
    include('./intro.php');
?>
        <link rel="stylesheet" type="text/css" media="print" href="../css/print_table.css" />
        <title>Storico Soci</title>
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
    $Storico_soci = Utility::GetStoricoSoci($objPDO);
    $Num_row_tot = count($Storico_soci);
    if($Num_row_tot > 0) {
?>
            <div class="query">
            <table id="table-storico-soci" class="table-storico-soci">
                <caption>
                    Storico soci
                    <br />
<?php
        if($Num_row_tot > 1) {		
?>
                    <span class="ris">Sono stati trovati <span class="slinea"><?php echo $Num_row_tot; ?></span> RISULTATI</span>
<?php	
        } else {	
?>		
                    <span class="ris">&Egrave; stato trovato un solo RISULTATO</span>
<?php		
        }		
?>
                </caption>
                <tr>
                    <th width="10%">N&deg; Tessera</th>
                    <th width="20%">Cognome</th>				
                    <th width="20%">Nome</th>
                    <th width="20%">Localita</th>
                    <th width="20%">Telefono</th>
                    <th width="10%">Anno</th>
                </tr>
<?php
        $odd = true;
        // Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
        for($i=0;$i<$Num_row_tot;$i++)
        {
            echo ($odd == true) ? "\t\t\t\t".'<tr class="odd_row">'."\n" : "\t\t\t\t".'<tr class="even_row">'."\n";
            $odd = !$odd;
            echo "\t\t\t\t\t".'<td class="center"><strong><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Storico_soci[$i]['id_iscritto'].'&socio=1">'.$Storico_soci[$i]['nnum_tessera'].'</strong></a></strong></td>';
            echo '<td><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Storico_soci[$i]['id_iscritto'].'&socio=1">'.$Storico_soci[$i]['scognome'].'</a></em></td>';
            echo '<td><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Storico_soci[$i]['id_iscritto'].'&socio=1">'.$Storico_soci[$i]['snome'].'</a></em></td>';
            echo '<td><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Storico_soci[$i]['id_iscritto'].'&socio=1">'.$Storico_soci[$i]['slocalita'].'</a></td>';
            echo '<td class="center"><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Storico_soci[$i]['id_iscritto'].'&socio=1">'.$Storico_soci[$i]['stel_casa'].'</a><br /><a class="catalog" href="../card_subscriber.php?id_iscritto='.$Storico_soci[$i]['id_iscritto'].'&socio=1">'.$Storico_soci[$i]['stel_cell'].'</a></em></td>';
            echo '<td class="center">'.$Storico_soci[$i]['anno'].'</td>'."\n\t\t\t\t".'<tr>'."\n";	
        }		
        echo "\t\t\t".'</table></div>';
    } else {
        echo "\n\t\t\t".'<div class="query"><h2 class="tit_altre_oper">Elenco Soci</h2><h3>Nessun socio</h3></div>'."\n";					
    }
    include('../include-php/end_gestione.php');
?>