<?php
    include('./head.php');
    include('./intro.php');
?>
        <link rel="stylesheet" type="text/css" media="print" href="../css/print_table.css" />
        <title>Classificazione Codice Dewey</title>
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
    $query = 'SELECT (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 0%" || scodice LIKE "0%") && ealienato = "N") AS t_000,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 1%" || scodice LIKE "1%") && ealienato = "N") AS t_100,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 2%" || scodice LIKE "2%") && ealienato = "N") AS t_200,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 3%" || scodice LIKE "3%") && ealienato = "N") AS t_300,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 4%" || scodice LIKE "4%") && ealienato = "N") AS t_400,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 5%" || scodice LIKE "5%") && ealienato = "N") AS t_500,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 6%" || scodice LIKE "6%") && ealienato = "N") AS t_600,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 7%" || scodice LIKE "7%") && ealienato = "N") AS t_700,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 8%" || scodice LIKE "8%") && ealienato = "N") AS t_800,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 9%" || scodice LIKE "9%") && ealienato = "N") AS t_900';
    $Classificazione_codice_dewey = Utility::GetClassificazioneCodiceDewey($objPDO, $query);
    $query_p = 'SELECT (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 0%" || scodice LIKE "0%") && ealienato = "N" && csigla_inv = "P") AS p_000,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 1%" || scodice LIKE "1%") && ealienato = "N" && csigla_inv = "P") AS p_100,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 2%" || scodice LIKE "2%") && ealienato = "N" && csigla_inv = "P") AS p_200,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 3%" || scodice LIKE "3%") && ealienato = "N" && csigla_inv = "P") AS p_300,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 4%" || scodice LIKE "4%") && ealienato = "N" && csigla_inv = "P") AS p_400,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 5%" || scodice LIKE "5%") && ealienato = "N" && csigla_inv = "P") AS p_500,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 6%" || scodice LIKE "6%") && ealienato = "N" && csigla_inv = "P") AS p_600,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 7%" || scodice LIKE "7%") && ealienato = "N" && csigla_inv = "P") AS p_700,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 8%" || scodice LIKE "8%") && ealienato = "N" && csigla_inv = "P") AS p_800,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 9%" || scodice LIKE "9%") && ealienato = "N" && csigla_inv = "P") AS p_900';
    $Classificazione_codice_dewey_papillon = Utility::GetClassificazioneCodiceDewey($objPDO, $query_p);
    $query_p_r = 'SELECT (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 0%" && ealienato = "N" && csigla_inv = "P") AS p_r_000,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 1%" && ealienato = "N" && csigla_inv = "P") AS p_r_100,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 2%" && ealienato = "N" && csigla_inv = "P") AS p_r_200,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 3%" && ealienato = "N" && csigla_inv = "P") AS p_r_300,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 4%" && ealienato = "N" && csigla_inv = "P") AS p_r_400,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 5%" && ealienato = "N" && csigla_inv = "P") AS p_r_500,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 6%" && ealienato = "N" && csigla_inv = "P") AS p_r_600,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 7%" && ealienato = "N" && csigla_inv = "P") AS p_r_700,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 8%" && ealienato = "N" && csigla_inv = "P") AS p_r_800,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 9%" && ealienato = "N" && csigla_inv = "P") AS p_r_900';
    $Classificazione_codice_dewey_papillon_ragazzi = Utility::GetClassificazioneCodiceDewey($objPDO, $query_p_r);
    $query_c = 'SELECT (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 0%" || scodice LIKE "0%") && ealienato = "N" && csigla_inv = "C") AS c_000,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 1%" || scodice LIKE "1%") && ealienato = "N" && csigla_inv = "C") AS c_100,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 2%" || scodice LIKE "2%") && ealienato = "N" && csigla_inv = "C") AS c_200,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 3%" || scodice LIKE "3%") && ealienato = "N" && csigla_inv = "C") AS c_300,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 4%" || scodice LIKE "4%") && ealienato = "N" && csigla_inv = "C") AS c_400,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 5%" || scodice LIKE "5%") && ealienato = "N" && csigla_inv = "C") AS c_500,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 6%" || scodice LIKE "6%") && ealienato = "N" && csigla_inv = "C") AS c_600,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 7%" || scodice LIKE "7%") && ealienato = "N" && csigla_inv = "C") AS c_700,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 8%" || scodice LIKE "8%") && ealienato = "N" && csigla_inv = "C") AS c_800,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 9%" || scodice LIKE "9%") && ealienato = "N" && csigla_inv = "C") AS c_900';
    $Classificazione_codice_dewey_comune = Utility::GetClassificazioneCodiceDewey($objPDO, $query_c);
    $query_c_r = 'SELECT (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 0%" && ealienato = "N" && csigla_inv = "C") AS c_r_000,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 1%" && ealienato = "N" && csigla_inv = "C") AS c_r_100,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 2%" && ealienato = "N" && csigla_inv = "C") AS c_r_200,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 3%" && ealienato = "N" && csigla_inv = "C") AS c_r_300,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 4%" && ealienato = "N" && csigla_inv = "C") AS c_r_400,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 5%" && ealienato = "N" && csigla_inv = "C") AS c_r_500,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 6%" && ealienato = "N" && csigla_inv = "C") AS c_r_600,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 7%" && ealienato = "N" && csigla_inv = "C") AS c_r_700,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 8%" && ealienato = "N" && csigla_inv = "C") AS c_r_800,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 9%" && ealienato = "N" && csigla_inv = "C") AS c_r_900';
    $Classificazione_codice_dewey_comune_ragazzi = Utility::GetClassificazioneCodiceDewey($objPDO, $query_c_r);
    $query_f = 'SELECT (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 0%" || scodice LIKE "0%") && ealienato = "N" && csigla_inv = "F") AS f_000,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 1%" || scodice LIKE "1%") && ealienato = "N" && csigla_inv = "F") AS f_100,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 2%" || scodice LIKE "2%") && ealienato = "N" && csigla_inv = "F") AS f_200,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 3%" || scodice LIKE "3%") && ealienato = "N" && csigla_inv = "F") AS f_300,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 4%" || scodice LIKE "4%") && ealienato = "N" && csigla_inv = "F") AS f_400,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 5%" || scodice LIKE "5%") && ealienato = "N" && csigla_inv = "F") AS f_500,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 6%" || scodice LIKE "6%") && ealienato = "N" && csigla_inv = "F") AS f_600,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 7%" || scodice LIKE "7%") && ealienato = "N" && csigla_inv = "F") AS f_700,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 8%" || scodice LIKE "8%") && ealienato = "N" && csigla_inv = "F") AS f_800,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (scodice LIKE "% 9%" || scodice LIKE "9%") && ealienato = "N" && csigla_inv = "F") AS f_900';
    $Classificazione_codice_dewey_filofestival = Utility::GetClassificazioneCodiceDewey($objPDO, $query_f);
    $query_f_r = 'SELECT (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 0%" && ealienato = "N" && csigla_inv = "F") AS f_r_000,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 1%" && ealienato = "N" && csigla_inv = "F") AS f_r_100,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 2%" && ealienato = "N" && csigla_inv = "F") AS f_r_200,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 3%" && ealienato = "N" && csigla_inv = "F") AS f_r_300,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 4%" && ealienato = "N" && csigla_inv = "F") AS f_r_400,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 5%" && ealienato = "N" && csigla_inv = "F") AS f_r_500,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 6%" && ealienato = "N" && csigla_inv = "F") AS f_r_600,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 7%" && ealienato = "N" && csigla_inv = "F") AS f_r_700,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 8%" && ealienato = "N" && csigla_inv = "F") AS f_r_800,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE scodice LIKE "R 9%" && ealienato = "N" && csigla_inv = "F") AS f_r_900';
    $Classificazione_codice_dewey_filofestival_ragazzi = Utility::GetClassificazioneCodiceDewey($objPDO, $query_f_r);
    $query_p_r_t = 'SELECT COUNT(*) AS tot_p_r_t FROM `catalogazioni` WHERE scodice LIKE "R %" && ealienato = "N" && csigla_inv = "P"';
    $Classificazione_tot_codice_dewey_papillon_ragazzi = Utility::GetClassificazioneCodiceDewey($objPDO, $query_p_r_t);
    $query_p_t = 'SELECT COUNT(*) AS tot_p_t FROM `catalogazioni` WHERE ealienato = "N" && csigla_inv = "P"';
    $Classificazione_tot_codice_dewey_papillon = Utility::GetClassificazioneCodiceDewey($objPDO, $query_p_t);
    $query_c_r_t = 'SELECT COUNT(*) AS tot_c_r_t FROM `catalogazioni` WHERE scodice LIKE "R %" && ealienato = "N" && csigla_inv = "C"';
    $Classificazione_tot_codice_dewey_comune_ragazzi = Utility::GetClassificazioneCodiceDewey($objPDO, $query_c_r_t);
    $query_c_t = 'SELECT COUNT(*) AS tot_c_t FROM `catalogazioni` WHERE ealienato = "N" && csigla_inv = "C"';
    $Classificazione_tot_codice_dewey_comune = Utility::GetClassificazioneCodiceDewey($objPDO, $query_c_t);
    $query_f_r_t = 'SELECT COUNT(*) AS tot_f_r_t FROM `catalogazioni` WHERE scodice LIKE "R %" && ealienato = "N" && csigla_inv = "F"';
    $Classificazione_tot_codice_dewey_filofestival_ragazzi = Utility::GetClassificazioneCodiceDewey($objPDO, $query_f_r_t);
    $query_f_t = 'SELECT COUNT(*) AS tot_f_t FROM `catalogazioni` WHERE ealienato = "N" && csigla_inv = "F"';
    $Classificazione_tot_codice_dewey_filofestival = Utility::GetClassificazioneCodiceDewey($objPDO, $query_f_t);
    $Num_tot_catalog = Utility::GetTotaleCatalogazioni($objPDO);
?>
            <div class="query">
            <table id="ris" class="query dewey">
                <caption>
                    Classificazione Codice Dewey
                    <br />
                    <span class="ris">TOTALE TESTI IN CATALOGO: <span class="slinea"><?php echo $Num_tot_catalog; ?></span></span>
                </caption>
                <tr>
                    <th style="width: 20%;">
                        Tipologia
                    </th>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<th style="width: 7%;">'.$i.'00'.'</th>'."\n";
    }
?>
                    <th style="width: 10%;">Totali</th>
                </tr>
                <tr>
                    <td class="center">
                        <strong>Papillon Ragazzi</strong>
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.$Classificazione_codice_dewey_papillon_ragazzi['p_r_'.$i.'00'].'</td>'."\n";
    }
    echo "\t\t\t\t\t".'<td class="center">'.$Classificazione_tot_codice_dewey_papillon_ragazzi['tot_p_r_t'].'</td>'."\n";
?>
                </tr>
                <tr>
                    <td class="center">
                        <strong>Papillon Adulti</strong>
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.($Classificazione_codice_dewey_papillon['p_'.$i.'00']-$Classificazione_codice_dewey_papillon_ragazzi['p_r_'.$i.'00']).'</td>'."\n";
    }
    echo "\t\t\t\t\t".'<td class="center">'.($Classificazione_tot_codice_dewey_papillon['tot_p_t']-$Classificazione_tot_codice_dewey_papillon_ragazzi['tot_p_r_t']).'</td>'."\n";
?>
                </tr>
                <tr>
                    <td class="center">
                        <strong>Papillon Totali</strong>
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.$Classificazione_codice_dewey_papillon['p_'.$i.'00'].'</td>'."\n";
    }
    echo "\t\t\t\t\t".'<td class="center">'.$Classificazione_tot_codice_dewey_papillon['tot_p_t'].'</td>'."\n";
?>
                </tr>
                <tr>
                    <td class="center">
                        <strong>Comune Ragazzi</strong>
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.$Classificazione_codice_dewey_comune_ragazzi['c_r_'.$i.'00'].'</td>'."\n";
    }
    echo "\t\t\t\t\t".'<td class="center">'.$Classificazione_tot_codice_dewey_comune_ragazzi['tot_c_r_t'].'</td>'."\n";

?>
                </tr>
                <tr>
                    <td class="center">
                        <strong>Comune Adulti</strong>
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.($Classificazione_codice_dewey_comune['c_'.$i.'00']-$Classificazione_codice_dewey_comune_ragazzi['c_r_'.$i.'00']).'</td>'."\n";
    }
    echo "\t\t\t\t\t".'<td class="center">'.($Classificazione_tot_codice_dewey_comune['tot_c_t']-$Classificazione_tot_codice_dewey_comune_ragazzi['tot_c_r_t']).'</td>'."\n";
?>
                </tr>
                <tr>
                    <td class="center">
                        <strong>Comune Totali</strong>
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.$Classificazione_codice_dewey_comune['c_'.$i.'00'].'</td>'."\n";
    }
    echo "\t\t\t\t\t".'<td class="center">'.$Classificazione_tot_codice_dewey_comune['tot_c_t'].'</td>'."\n";
?>
                </tr>
                <tr>
                    <td class="center">
                        <strong>Filo&minus;Festival Ragazzi</strong>
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.$Classificazione_codice_dewey_filofestival_ragazzi['f_r_'.$i.'00'].'</td>'."\n";
    }
    echo "\t\t\t\t\t".'<td class="center">'.$Classificazione_tot_codice_dewey_filofestival_ragazzi['tot_f_r_t'].'</td>'."\n";
?>
                </tr>
                <tr>
                    <td class="center">
                        <strong>Filo&minus;Festival Adulti</strong>
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.($Classificazione_codice_dewey_filofestival['f_'.$i.'00']-$Classificazione_codice_dewey_filofestival_ragazzi['f_r_'.$i.'00']).'</td>'."\n";
    }
    echo "\t\t\t\t\t".'<td class="center">'.($Classificazione_tot_codice_dewey_filofestival['tot_f_t']-$Classificazione_tot_codice_dewey_filofestival_ragazzi['tot_f_r_t']).'</td>'."\n";
?>
                </tr>
                <tr>
                    <td class="center">
                        <strong>Filo&minus;Festival Totali</strong>
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.$Classificazione_codice_dewey_filofestival['f_'.$i.'00'].'</td>'."\n";
    }
    echo "\t\t\t\t\t".'<td class="center">'.$Classificazione_tot_codice_dewey_filofestival['tot_f_t'].'</td>'."\n";
?>
                </tr>
                <tr class="totali">
                    <td class="center">
                        <strong>Totali</strong>
                    </td>
<?php                    
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.$Classificazione_codice_dewey['t_'.$i.'00'].'</td>'."\n";
    }
    echo "\t\t\t\t\t".'<td class="center">'.($Classificazione_tot_codice_dewey_papillon['tot_p_t']+$Classificazione_tot_codice_dewey_comune['tot_c_t']+$Classificazione_tot_codice_dewey_filofestival['tot_f_t']).'</td>'."\n";
    echo "\t\t\t\t".'</tr>'."\n\t\t\t".'</table>'."\n</div>";		
    include('../include-php/end_gestione.php');
?>