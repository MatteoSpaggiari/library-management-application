<?php
    include('./head.php');
    include('./intro.php');
?>
        <link rel="stylesheet" type="text/css" media="print" href="../css/print_table.css" />
        <title>Statistiche Catalogazioni</title>
    </head>
    <body>
<?php
    include_once("./header.php");
    echo "\n";
?>
    <main class="query">
        <div id="corpo" class="corpo">
<?php
    include_once("./menu-query.php");
?>
<?php
    # Preaparazione delle Query
    $query_papillon = 'SELECT COUNT(id_catalog) AS papillon
            FROM catalogazioni
            WHERE csigla_inv = "P" && ealienato = "N";';
    $Catalog_statis_pap = Utility::GetCatalogazioniStatistiche($objPDO, $query_papillon);
    $query_comune = 'SELECT COUNT(id_catalog) AS comune
            FROM catalogazioni
            WHERE csigla_inv = "C" && ealienato = "N";';
    $Catalog_statis_com = Utility::GetCatalogazioniStatistiche($objPDO, $query_comune);
    $query_filo = 'SELECT COUNT(id_catalog) AS filo
            FROM catalogazioni
            WHERE csigla_inv = "F" && ealienato = "N";';
    $Catalog_statis_fil = Utility::GetCatalogazioniStatistiche($objPDO, $query_filo);
    $query_novita = 'SELECT COUNT(id_catalog) AS novita
            FROM catalogazioni
            WHERE enovita = "Y" && ealienato = "N";';
    $Catalog_statis_nov = Utility::GetCatalogazioniStatistiche($objPDO, $query_novita);
    $query_alienate = 'SELECT COUNT(id_catalog) AS alienate
            FROM catalogazioni
            WHERE ealienato = "Y";';
    $Catalog_statis_ali = Utility::GetCatalogazioniStatistiche($objPDO, $query_alienate);
    $query_costo = 'SELECT SUM(fcosto) AS costo
            FROM catalogazioni
            WHERE ealienato = "N";';
    $Catalog_statis_cos = Utility::GetCatalogazioniStatistiche($objPDO, $query_costo);
    $Num_tot_no_alien = $Catalog_statis_pap['papillon']+$Catalog_statis_com['comune']+$Catalog_statis_fil['filo'];    
?>
            <div class="query">
            <table id="ris" class="statistiche">
                <caption>
                    Statistiche catalogazioni
                </caption>
                <tr>
                    <th width="12%">Papillon</th>
                    <th width="12%">Comune</th>
                    <th width="16%">Filo&minus;Festival</th>				
                    <th width="10%">Novit&agrave;</th>
                    <th width="10%">Alienate</th>
                    <th width="25%">Patrimonio Biblioteca Lunetta</th>
                    <th width="15%">Valore Indicativo [&euro;]</th>
                </tr>
                <tr>
<?php		
    echo "\t\t\t\t\t".'<td title="Numero catalogazioni papillon"><strong>'.Utility::NoInfo($Catalog_statis_pap['papillon']).'</strong></td>';
    echo '<td title="Numero catalogazioni comune"><strong>'.Utility::NoInfo($Catalog_statis_com['comune']).'</strong></td>';
    echo '<td title="Numero catalogazioni filo&minus;festival"><strong>'.Utility::NoInfo($Catalog_statis_fil['filo']).'</strong></td>';
    echo '<td><strong><a alt="Vai all\'elenco catalogazioni novit&agrave;" title="Vai all\'elenco catalogazioni novit&agrave;" href="./catalog_novita.php">'.Utility::NoInfo($Catalog_statis_nov['novita']).'</a></strong></td>';
    echo '<td><strong><a alt="Vai all\'elenco catalogazioni alienate" title="Vai all\'elenco catalogazioni alienate" href="./catalog_alienate.php">'.Utility::NoInfo($Catalog_statis_ali['alienate']).'</a></strong></td>';
    echo '<td title="Numero catalogazioni totali escluse le alienate"><strong>'.Utility::NoInfo($Num_tot_no_alien).'</strong></td>';
    echo '<td title="Valore totale catalogazioni escluse quelle senza costo"><strong>'.Utility::NoInfo($Catalog_statis_cos['costo']).'</strong></td>';
?>
                </tr>
            </table>
            </div>
<?php
    include('../include-php/end_gestione.php');
?>