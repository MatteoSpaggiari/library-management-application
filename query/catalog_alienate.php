<?php
    include('./head.php');
    include('./intro.php');
    (isset($_GET['errore'])) ? $avviso = $_GET['errore'] : '';
    (isset($_GET['successo'])) ? $avviso = $_GET['successo'] : '';
?>
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
<?php
    $Catalogazioni_alienate = Utility::GetCatalogazioniAlienate($objPDO);
    $Num_row_tot = count($Catalogazioni_alienate);
    $Num_cat_ali_pap = Utility::GetTotaleCatalogazioniAlienateSiglaInv($objPDO, "P");
    $Num_cat_ali_com = Utility::GetTotaleCatalogazioniAlienateSiglaInv($objPDO, "C");
    $Num_cat_ali_fil = Utility::GetTotaleCatalogazioniAlienateSiglaInv($objPDO, "F");
    $Num_row_cat = '<span class="slinea">'.$Num_cat_ali_com.'</span> Biblioteca, <span class="slinea">'.$Num_cat_ali_pap.'</span> Papillon e <span class="slinea">'.$Num_cat_ali_fil.'</span> Filo&minus;Festival';
    if($Num_row_tot > 0) {
?>
            <div class="query">
            <form id="form-alienate" class="form-alienate form" method="post" name="form-alienate" action="./trans_alienate.php" accept-charset="utf-8" enctype="application/x-www-form-urlencoded">
                <fieldset>
                    <table id="table-alienate" class="table-alienate">
                        <caption>
                            CATALOGAZIONI ALIENATE
                            <br />
<?php
        if($Num_row_tot > 1) {		
?>
                            <span class="ris">I testi alienati sono <span class="slinea"><?php echo $Num_row_tot."</span> di cui: ".$Num_row_cat ?></span>
<?php	
        } else {	
?>		
                            <span class="ris">&Egrave; stata trovato un solo testo alienato</span>
<?php		
        }		
?>		
                        </caption>
                        <tr>
                            <th width="8%">Propriet&agrave;</th>
                            <th width="10%">N&deg; Inventario</th>
                            <th width="24%">Titolo</th>				
                            <th width="18%">Autore</th>
                            <th width="10%">Scaffale</th>
                            <th width="15%">Data Catalogazione</th>
                            <th width="15%">Togli da alienato</th>
                        </tr>
<?php		
        $odd = true;
        for($i=0;$i<$Num_row_tot;$i++)
        {
            echo ($odd == true) ? "\t\t\t\t".'<tr class="odd_row">'."\n" : "\t\t\t\t".'<tr class="even_row">'."\n";
            $odd = !$odd;
            echo "\t\t\t\t\t\t\t".'<td class="center"><strong><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_alienate[$i]['id_catalog'].'">'.Utility::Proprieta($Catalogazioni_alienate[$i]['csigla_inv']).'</a></strong></td>';
            echo '<td class="center"><strong><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_alienate[$i]['id_catalog'].'">'.$Catalogazioni_alienate[$i]['snum_inv'].'</a></strong></td>';
            echo '<td><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_alienate[$i]['id_catalog'].'">'.$Catalogazioni_alienate[$i]['stitolo'].'</a></em></td>';
            echo '<td><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_alienate[$i]['id_catalog'].'">'.$Catalogazioni_alienate[$i]['sautore'].'</a></em></td>';
            echo '<td class="center"><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_alienate[$i]['id_catalog'].'">'.$Catalogazioni_alienate[$i]['sscaffale'].'</a></em></td>';
            echo '<td class="center"><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_alienate[$i]['id_catalog'].'">'.$Catalogazioni_alienate[$i]['data_catalog'].'</a></em></td>';
            echo '<td class="center"><input class="checkbox" type="checkbox" name="alienato_cat[]" value="'.$Catalogazioni_alienate[$i]['id_catalog'].'" tabindex="'.$i.'" />&nbsp;Togli da alienato</td>'."\n\t\t\t\t\t\t".'<tr>'."\n";	
        }
?>
                    </table>
                        <ul>
                            <li class="container-button">
                                <input id="reset" type="reset" name="reset" value="Reset" tabindex="<?php $i; ?>" />
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
            <table id="table-alienate-modificate" class="table-alienate">
                <caption>
                    Catalogazioni appena modificate
                    <br />
                    <span class="ris">
                        "<?php echo $Num_catalog; ?>" catalogazioni non pi&ugrave; alienate
                    </span>
                </caption>
                <tr>
                   <th width="8%">Propriet&agrave;</th>
                   <th width="10%">N&deg; Inventario</th>
                   <th width="24%">Titolo</th>				
                   <th width="18%">Autore</th>
                   <th width="10%">Scaffale</th>
                   <th width="15%">Data Catalogazione</th>
                   <th width="15%">Alienato</th>
               </tr>
<?php
            for($j=0;$j<$Num_catalog;$j++) {
                $Catalogazioni_alienate_deleted = array();
                $Catalogazioni_alienate_deleted = Utility::GetCatalogazioniAlienazioneDeleted($objPDO,$Catalog_array[$j]);
                echo ($odd == true) ? "\t\t\t\t\t\t".'<tr class="odd_row">'."\n" : "\t\t\t\t".'<tr class="even_row">'."\n";
                $odd = !$odd;
                echo "\t\t\t\t\t\t\t".'<td class="center"><strong><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_alienate_deleted[0]['id_catalog'].'">'.$Catalogazioni_alienate_deleted[0]['csigla_inv'].'</a></strong></td>';
                echo '<td><strong class="center"><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_alienate_deleted[0]['id_catalog'].'">'.$Catalogazioni_alienate_deleted[0]['snum_inv'].'</a></strong></td>';
                echo '<td><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_alienate_deleted[0]['id_catalog'].'">'.$Catalogazioni_alienate_deleted[0]['stitolo'].'</a></em></td>';
                echo '<td><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_alienate_deleted[0]['id_catalog'].'">'.$Catalogazioni_alienate_deleted[0]['sautore'].'</a></em></td>';
                echo '<td><em class="center"><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_alienate_deleted[0]['id_catalog'].'">'.$Catalogazioni_alienate_deleted[0]['sscaffale'].'</a></em></td>';
                echo '<td class="center"><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_alienate_deleted[0]['id_catalog'].'">'.$Catalogazioni_alienate_deleted[0]['data_catalog'].'</a></em></td>';
                echo '<td class="center"><em><a title="Vai a Scheda Catalogazione" class="catalog" href="../card_catalog.php?id_catalog='.$Catalogazioni_alienate_deleted[0]['id_catalog'].'">'.$Catalogazioni_alienate_deleted[0]['ealienato'].'</a></em></td>'."\n\t\t\t\t\t".'<tr>'."\n";	
                unset($Catalogazioni_alienate_deleted);
            }
            echo "\t\t\t".'</table>'."\n</div>";
        }
    } else {
        echo "\n\t\t\t".'<div class="query"><h2 class="tit_altre_oper">Catalogazioni Novit&agrave;</h2><h3 class="query no_result">Nessuna Catalogazione alienata</h2></div>'."\n";					
    }
    include('../include-php/end_gestione.php');
?>