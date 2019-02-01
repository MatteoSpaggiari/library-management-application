<?php
    include('./head.php');
    include('./intro.php');
    (isset($_GET['errore'])) ? $Avvisi = $_GET['errore'] : '';
    (isset($_GET['successo'])) ? $Avvisi = $_GET['successo'] : '';
?>
        <link rel="stylesheet" type="text/css" media="print" href="../css/print_table.css" />
        <title>Catalogazioni Novit&agrave;</title>
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
    $Catalogazioni_novita = Utility::GetCatalogazioniNovita($objPDO);
    $Num_row_tot = count($Catalogazioni_novita);
    $Num_cat_nov_pap = Utility::GetTotaleCatalogazioniNovitaSiglaInv($objPDO, "P");
    $Num_cat_nov_com = Utility::GetTotaleCatalogazioniNovitaSiglaInv($objPDO, "C");
    $Num_cat_nov_fil = Utility::GetTotaleCatalogazioniNovitaSiglaInv($objPDO, "F");
    $Num_row_cat = '<span class="slinea">'.$Num_cat_nov_com.'</span> Biblioteca, <span class="slinea">'.$Num_cat_nov_pap.'</span> Papillon e <span class="slinea">'.$Num_cat_nov_fil.'</span> Filo&minus;Festival';
    
    if($Num_row_tot > 0) {
?>
            <div class="query">
            <form id="form-novita" class="form-novita form" method="post" name="form-novita" action="./trans_novita.php" accept-charset="utf-8" enctype="application/x-www-form-urlencoded">
                <fieldset>
                    <table id="table-novita" class="table-novita">
                        <caption>
                            CATALOGAZIONI NOVIT&Agrave;
                            <br />
<?php
        if($Num_row_tot > 1) {	
?>
                            
                            <span class="ris">I libri &quot;Novit&agrave;&quot; in catalogo sono <span class="slinea"><?php echo $Num_row_tot."</span> di cui: ".$Num_row_cat ?></span>
<?php	
        } else {	
?>		
                            <span class="ris">Un solo libro &quot;novit&agrave;&quot; in catalogo</span>
<?php		
        }		
?>		
                        </caption>
                        <tr>
                            <th width="10%">Propriet&agrave;</th>
                            <th width="9%">N&deg; Inventario</th>
                            <th width="24%">Titolo</th>				
                            <th width="18%">Autore</th>
                            <th width="9%">Scaffale</th>
                            <th width="15%">Data Catalogazione</th>
                            <th width="15%">Togli da novit&agrave;</th>
                        </tr>
<?php		
        $odd = true;
        // Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
        for($i=0;$i<$Num_row_tot;$i++)
        {
            echo ($odd == true) ? "\t\t\t\t".'<tr class="odd_row">'."\n" : "\t\t\t\t".'<tr class="even_row">'."\n";
            $odd = !$odd;
            echo "\t\t\t\t\t\t\t".'<td class="center"><strong><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_novita[$i]['id_catalog'].'">'.Utility::Proprieta($Catalogazioni_novita[$i]['csigla_inv']).'</a></strong></td>';
            echo '<td class="center"><strong><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_novita[$i]['id_catalog'].'">'.$Catalogazioni_novita[$i]['snum_inv'].'</a></strong></td>';
            echo '<td><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_novita[$i]['id_catalog'].'">'.$Catalogazioni_novita[$i]['stitolo'].'</a></em></td>';
            echo '<td><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_novita[$i]['id_catalog'].'">'.$Catalogazioni_novita[$i]['sautore'].'</a></em></td>';
            echo '<td class="center"><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_novita[$i]['id_catalog'].'">'.$Catalogazioni_novita[$i]['sscaffale'].'</a></em></td>';
            echo '<td class="center"><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_novita[$i]['id_catalog'].'">'.$Catalogazioni_novita[$i]['data_catalog'].'</a></em></td>';
            echo '<td class="center"><input class="checkbox" type="checkbox" name="novita_cat[]" value="'.$Catalogazioni_novita[$i]['id_catalog'].'" tabindex="'.$i.'" />&nbsp;Togli da novit&agrave;</td>'."\n\t\t\t\t\t".'<tr>'."\n";	
        }
?>
                    </table>
                        <ul>
                            <li class="container-button">
                                <input type="reset" name="reset" value="Reset" tabindex="<?php $i; ?>" />
                                <input id="invia" type="submit" name="invia" value="Invia" tabindex="<?php ($i+1); ?>" onkeydown="return false;" />
                            </li>
                        </ul>
                </fieldset>
            </form>
<?php
        if(isset($_GET['catalogs'])) {
            $Catalog_array = explode(',',$_GET['catalogs']);
            $Num_catalog = count($Catalog_array);
?>
            <table id="table-novita-modificate" class="table-novita">
                <caption>
                    Catalogazioni appena modificate
                    <br />
                    <span class="ris">
                        "<?php echo $Num_catalog; ?>" catalogazioni non pi&ugrave; novit&agrave;
                    </span>
                </caption>
                     <tr>
                        <th width="8%">Propriet&agrave;</th>
                        <th width="10%">N&deg; Inventario</th>
                        <th width="24%">Titolo</th>				
                        <th width="18%">Autore</th>
                        <th width="10%">Scaffale</th>
                        <th width="15%">Data Catalogazione</th>
                        <th width="15%">Novit&agrave;</th>
                    </tr>
<?php
            $odd = true;
            for($j=0;$j<$Num_catalog;$j++) {
                $Catalogazioni_novita_deleted = array();
                $Catalogazioni_novita_deleted = Utility::GetCatalogazioniNovitaDeleted($objPDO,$Catalog_array[$j]);
                echo ($odd == true) ? "\t\t\t\t\t\t".'<tr class="odd_row">'."\n" : "\t\t\t\t".'<tr class="even_row">'."\n";
                $odd = !$odd;
                echo "\t\t\t\t\t\t\t".'<td class="center"><strong><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_novita_deleted[0]['id_catalog'].'">'.$Catalogazioni_novita_deleted[0]['csigla_inv'].'</a></strong></td>';
                echo '<td><strong class="center"><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_novita_deleted[0]['id_catalog'].'">'.$Catalogazioni_novita_deleted[0]['snum_inv'].'</a></strong></td>';
                echo '<td><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_novita_deleted[0]['id_catalog'].'">'.$Catalogazioni_novita_deleted[0]['stitolo'].'</a></em></td>';
                echo '<td><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_novita_deleted[0]['id_catalog'].'">'.$Catalogazioni_novita_deleted[0]['sautore'].'</a></em></td>';
                echo '<td><em class="center"><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_novita_deleted[0]['id_catalog'].'">'.$Catalogazioni_novita_deleted[0]['sscaffale'].'</a></em></td>';
                echo '<td class="center"><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_novita_deleted[0]['id_catalog'].'">'.$Catalogazioni_novita_deleted[0]['data_catalog'].'</a></em></td>';
                echo '<td class="center"><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_novita_deleted[0]['id_catalog'].'">'.$Catalogazioni_novita_deleted[0]['enovita'].'</a></em></td>'."\n\t\t\t\t\t".'<tr>'."\n";	
                unset($Catalogazioni_novita_deleted);
            }
            echo "\t\t\t".'</table>'."\n</div>";
        }
    } else {
        echo "\n\t\t\t".'<div class="query"><h2 class="tit_altre_oper">Catalogazioni Novit&agrave;</h2><h3>Nessuna Catalogazione novit&agrave;</h2></div>'."\n";					
    }
    include('../include-php/end_gestione.php');
?>