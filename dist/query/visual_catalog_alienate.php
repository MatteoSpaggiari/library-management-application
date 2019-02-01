<?php
session_start();
include('../include_php/redirect.php');
if(isset($_SESSION['access_level_s']) && $_SESSION['access_level_s'] > 1 && isset($_SESSION['logged']) && $_SESSION['logged'] == 1 && isset($_SESSION['user_id_s']) && isset($_SESSION['is_block_s']) && $_SESSION['is_block_s'] == "N") {
    include('./intro.php');
    include_once("../include_php/mysql.php");
    include_once("../function/generic_function.php");
    (isset($_GET['errore'])) ? $avviso = $_GET['errore'] : '';
    (isset($_GET['successo'])) ? $avviso = $_GET['successo'] : '';
    (isset($_GET['proprieta_a'])) ? $_SESSION['proprieta_a_s'] = $_GET['proprieta_a'] : '';
    (isset($_GET['anno_a'])) ? $_SESSION['anno_a_s'] = $_GET['anno_a'] : '';

?>
        <script type="text/javascript" src="../js/catalog_nov_alien.js"></script>
        <link rel="stylesheet" type="text/css" media="print" href="../css/print_table.css" />
        <title>Catalogazioni Alienate</title>
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
            <div id="avvisi" class="dialog"><?php isset($avviso) ? print(replace(urldecode($avviso))) : ''?></div>
<?php
    require_once('../function/generic_function.php');			
    function no_info($value) {
        if($value == "") {
            $info = '&minus;';
        } else {
            $info = $value;
        }
        return $info."\n";
    }
    # Preaparazione della Query
    $query = 'SELECT id_catalog, sigla_inv, num_inv, titolo, autore, scaffale, DATE_FORMAT(DATE(data_catalog),"%d-%m-%Y") AS data_catalog, DATE_FORMAT(data_alienazione,"%d-%m-%Y %H:%i:%s") AS data_alien
            FROM catalogazioni AS c LEFT JOIN alienazioni AS a ON c.id_catalog = a.id_catalogazione
            WHERE alienato = "Y"  '.(isset($_SESSION['proprieta_a_s']) ? ' && sigla_inv = "'.$_SESSION['proprieta_a_s'].'"' : '').' '.(isset($_SESSION['anno_a_s']) ? ' && data_alienazione LIKE "'.$_SESSION['anno_a_s'].'%"' : '').'
            ORDER BY data_alienazione DESC;';
    $result = mysql_query($query, $db) or die(mysql_error($db));
    $num_row = mysql_num_rows($result);
    if($num_row > 0) {
?>
                    <table id="ris" class="query">
                        <caption>
                            CATALOGO
                            <br />
<?php
        if($num_row > 1) {		
?>
                            <span class="ris">I testi alienati, relativi alla ricerca effettuata, sono <?php echo $num_row; ?></span>
<?php	
        } else {	
?>		
                            <span class="ris">&Egrave; stato trovato un solo testo alienato (relativi alla ricerca effettuata)</span>
<?php		
        }		
?>		
                        </caption>
                        <tr>
                            <th width="10%">Propriet&agrave;</th>
                            <th width="10%">N&deg; Inventario</th>
                            <th width="20%">Titolo</th>				
                            <th width="20%">Autore</th>
                            <th width="10%">Scaffale</th>
                            <th width="15%">Data Catalogazione</th>
                            <th width="15%">Data Alienazione</th>
                        </tr>
<?php		
        // Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
        $odd = true;
        $i = 1;
        while($row = mysql_fetch_assoc($result)) {	
            extract($row);
            echo ($odd == true) ? "\t\t\t\t\t\t".'<tr class="odd_row">'."\n" : "\t\t\t\t\t\t".'<tr class="even_row">'."\n";
            $odd = !$odd;
            echo "\t\t\t\t\t\t\t".'<td class="center"><strong><a title="Vai a Scheda Catalogazione" class="catalog" href="../scheda_catalog.php?CodCatalog='.$id_catalog.'">'.proprieta($sigla_inv).'</a></strong></td>';
            echo '<td class="center"><strong><a title="Vai a Scheda Catalogazione" class="catalog" href="../scheda_catalog.php?CodCatalog='.$id_catalog.'">'.$num_inv.'</a></strong></td>';
            echo '<td><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../scheda_catalog.php?CodCatalog='.$id_catalog.'">'.$titolo.'</a></em></td>';
            echo '<td><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../scheda_catalog.php?CodCatalog='.$id_catalog.'">'.$autore.'</a></em></td>';
            echo '<td class="center"><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../scheda_catalog.php?CodCatalog='.$id_catalog.'">'.$scaffale.'</a></em></td>';
            echo '<td class="center"><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../scheda_catalog.php?CodCatalog='.$id_catalog.'">'.$data_catalog.'</a></em></td>';
            echo '<td class="center"><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../scheda_catalog.php?CodCatalog='.$id_catalog.'">'.$data_alien.'</a></em></td>'."\n\t\t\t\t\t\t".'<tr>'."\n";
            $i = $i +1;
        }
?>
                    </table>
<?php
    }
    mysql_free_result($result);
    mysql_close($db);	
    include('../include_php/end_gestione.php');
} else {
    redirect('../accesso.php');
}
?>