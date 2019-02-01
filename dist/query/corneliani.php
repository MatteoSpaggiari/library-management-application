<?php
    include('./head.php');
    include('./intro.php');
?>	
        <link rel="stylesheet" type="text/css" media="print" href="../css/print_table.css" />
        <title>Utenti Corneliani</title>
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
    $Corneliani = Utility::GetCorneliani($objPDO);
    $Num_row_tot = count($Corneliani);
    if($Num_row_tot > 0) {
?>
            <div class="query">
            <table id="ris" class="query">
                <caption>
                    Utenti Corneliani
                    <br />
<?php            
        if($Num_row_tot > 1) {		
?>
                    <span class="ris">Sono stati trovati <span class="slinea"><?php echo $Num_row_tot; ?></span> UTENTI</span>
<?php	
        } else {	
?>		
                    <span class="ris">&Egrave; stato trovato un solo RISULTATO!</span>
<?php		
        }
?>
                </caption>
                <tr>
                    <th width="8%">N&deg; Tessera</th>
                    <th width="16%">Cognome</th>
                    <th width="16%">Nome</th>
                    <th width="10%">Data Nascita</th>
                    <th width="22%">Indirizzo</th>
                    <th width="17%">Localit&agrave;</th>
                    <th width="11%">Telefono</th>
                </tr>
<?php		
        // Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
        $odd = true;
        for($i=0;$i<$Num_row_tot;$i++)
        {
            echo ($odd == true) ? "\t\t\t\t".'<tr class="odd_row">'."\n" : "\t\t\t\t".'<tr class="even_row">'."\n";
            $odd = !$odd;
            echo "\t\t\t\t\t".'<td class="center"><strong><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Corneliani[$i]['id_iscritto'].'">'.$Corneliani[$i]['nnum_tessera'].'</a></strong></td>';
            echo '<td><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Corneliani[$i]['id_iscritto'].'">'.$Corneliani[$i]['scognome'].'</a></em></td>';
            echo '<td><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Corneliani[$i]['id_iscritto'].'">'.$Corneliani[$i]['snome'].'</a></em></td>';
            echo '<td class="center"><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Corneliani[$i]['id_iscritto'].'">'.$Corneliani[$i]['data_nascita'].'</a></em></td>';
            echo '<td><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Corneliani[$i]['id_iscritto'].'">'.$Corneliani[$i]['sindirizzo'].', '.$Corneliani[$i]['snum_civico'].'</a></em></td>';
            echo '<td><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Corneliani[$i]['id_iscritto'].'">'.$Corneliani[$i]['slocalita'].'</a></em></td>';
            echo '<td class="center"><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Corneliani[$i]['id_iscritto'].'">'.$Corneliani[$i]['stel_casa'].'</a><a class="catalog" href="./card_subscriber.php?id_iscritto='.$Corneliani[$i]['id_iscritto'].'">'.$Corneliani[$i]['stel_cell'].'</a></em></td>';
            echo "\n\t\t\t\t".'<tr>'."\n";	
        }		
            echo "\t\t\t".'</table></div>';
    } else {
        echo "\n\t\t\t".'<div class="query"><h2 class="tit_altre_oper">Sollecito Restituzioni</h2><h3>Nessun Utente Corneliani</h3></div>'."\n";					
    }	
    include('../include-php/end_gestione.php');
?>