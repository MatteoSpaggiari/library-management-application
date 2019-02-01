<?php
session_start();
include('../include_php/redirect.php');
if(isset($_SESSION['access_level_s']) && $_SESSION['access_level_s'] > 1 && isset($_SESSION['logged']) && $_SESSION['logged'] == 1 && isset($_SESSION['user_id_s']) && isset($_SESSION['is_block_s']) && $_SESSION['is_block_s'] == "N") {
    include('./intro.php');
    include_once("../include_php/mysql.php");
?>	
        <link rel="stylesheet" type="text/css" media="print" href="../css/print_table.css" />
        <title>Classificazione Codice Dewey</title>
    </head>
    <body>
<?php
    include_once("./header.php");
    require_once('../function/generic_function.php');
    echo "\n";
?>
    <main class="query">
        <div id="corpo" class="corpo">
<?php
    include_once("./menu-query.php");
?>
<?php
    $query = 'SELECT (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 0%" || codice LIKE "0%") && alienato = "N") AS t_000,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 1%" || codice LIKE "1%") && alienato = "N") AS t_100,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 2%" || codice LIKE "2%") && alienato = "N") AS t_200,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 3%" || codice LIKE "3%") && alienato = "N") AS t_300,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 4%" || codice LIKE "4%") && alienato = "N") AS t_400,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 5%" || codice LIKE "5%") && alienato = "N") AS t_500,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 6%" || codice LIKE "6%") && alienato = "N") AS t_600,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 7%" || codice LIKE "7%") && alienato = "N") AS t_700,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 8%" || codice LIKE "8%") && alienato = "N") AS t_800,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 9%" || codice LIKE "9%") && alienato = "N") AS t_900;';
    $result = mysql_query($query, $db) or die(mysql_error($db));
    $query_p = 'SELECT (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 0%" || codice LIKE "0%") && alienato = "N" && sigla_inv = "P") AS p_000,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 1%" || codice LIKE "1%") && alienato = "N" && sigla_inv = "P") AS p_100,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 2%" || codice LIKE "2%") && alienato = "N" && sigla_inv = "P") AS p_200,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 3%" || codice LIKE "3%") && alienato = "N" && sigla_inv = "P") AS p_300,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 4%" || codice LIKE "4%") && alienato = "N" && sigla_inv = "P") AS p_400,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 5%" || codice LIKE "5%") && alienato = "N" && sigla_inv = "P") AS p_500,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 6%" || codice LIKE "6%") && alienato = "N" && sigla_inv = "P") AS p_600,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 7%" || codice LIKE "7%") && alienato = "N" && sigla_inv = "P") AS p_700,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 8%" || codice LIKE "8%") && alienato = "N" && sigla_inv = "P") AS p_800,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 9%" || codice LIKE "9%") && alienato = "N" && sigla_inv = "P") AS p_900;';
    $result_p = mysql_query($query_p, $db) or die(mysql_error($db));
    $query_p_r = 'SELECT (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 0%" && alienato = "N" && sigla_inv = "P") AS p_r_000,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 1%" && alienato = "N" && sigla_inv = "P") AS p_r_100,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 2%" && alienato = "N" && sigla_inv = "P") AS p_r_200,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 3%" && alienato = "N" && sigla_inv = "P") AS p_r_300,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 4%" && alienato = "N" && sigla_inv = "P") AS p_r_400,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 5%" && alienato = "N" && sigla_inv = "P") AS p_r_500,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 6%" && alienato = "N" && sigla_inv = "P") AS p_r_600,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 7%" && alienato = "N" && sigla_inv = "P") AS p_r_700,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 8%" && alienato = "N" && sigla_inv = "P") AS p_r_800,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 9%" && alienato = "N" && sigla_inv = "P") AS p_r_900;';
    $result_p_r = mysql_query($query_p_r, $db) or die(mysql_error($db));
    $query_c = 'SELECT (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 0%" || codice LIKE "0%") && alienato = "N" && sigla_inv = "C") AS c_000,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 1%" || codice LIKE "1%") && alienato = "N" && sigla_inv = "C") AS c_100,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 2%" || codice LIKE "2%") && alienato = "N" && sigla_inv = "C") AS c_200,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 3%" || codice LIKE "3%") && alienato = "N" && sigla_inv = "C") AS c_300,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 4%" || codice LIKE "4%") && alienato = "N" && sigla_inv = "C") AS c_400,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 5%" || codice LIKE "5%") && alienato = "N" && sigla_inv = "C") AS c_500,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 6%" || codice LIKE "6%") && alienato = "N" && sigla_inv = "C") AS c_600,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 7%" || codice LIKE "7%") && alienato = "N" && sigla_inv = "C") AS c_700,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 8%" || codice LIKE "8%") && alienato = "N" && sigla_inv = "C") AS c_800,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 9%" || codice LIKE "9%") && alienato = "N" && sigla_inv = "C") AS c_900;';
    $result_c = mysql_query($query_c, $db) or die(mysql_error($db));
    $query_c_r = 'SELECT (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 0%" && alienato = "N" && sigla_inv = "C") AS c_r_000,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 1%" && alienato = "N" && sigla_inv = "C") AS c_r_100,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 2%" && alienato = "N" && sigla_inv = "C") AS c_r_200,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 3%" && alienato = "N" && sigla_inv = "C") AS c_r_300,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 4%" && alienato = "N" && sigla_inv = "C") AS c_r_400,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 5%" && alienato = "N" && sigla_inv = "C") AS c_r_500,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 6%" && alienato = "N" && sigla_inv = "C") AS c_r_600,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 7%" && alienato = "N" && sigla_inv = "C") AS c_r_700,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 8%" && alienato = "N" && sigla_inv = "C") AS c_r_800,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 9%" && alienato = "N" && sigla_inv = "C") AS c_r_900;';
    $result_c_r = mysql_query($query_c_r, $db) or die(mysql_error($db));
    $query_f = 'SELECT (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 0%" || codice LIKE "0%") && alienato = "N" && sigla_inv = "F") AS f_000,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 1%" || codice LIKE "1%") && alienato = "N" && sigla_inv = "F") AS f_100,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 2%" || codice LIKE "2%") && alienato = "N" && sigla_inv = "F") AS f_200,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 3%" || codice LIKE "3%") && alienato = "N" && sigla_inv = "F") AS f_300,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 4%" || codice LIKE "4%") && alienato = "N" && sigla_inv = "F") AS f_400,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 5%" || codice LIKE "5%") && alienato = "N" && sigla_inv = "F") AS f_500,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 6%" || codice LIKE "6%") && alienato = "N" && sigla_inv = "F") AS f_600,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 7%" || codice LIKE "7%") && alienato = "N" && sigla_inv = "F") AS f_700,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 8%" || codice LIKE "8%") && alienato = "N" && sigla_inv = "F") AS f_800,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE (codice LIKE "% 9%" || codice LIKE "9%") && alienato = "N" && sigla_inv = "F") AS f_900;';
    $result_f = mysql_query($query_f, $db) or die(mysql_error($db));
    $query_f_r = 'SELECT (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 0%" && alienato = "N" && sigla_inv = "F") AS f_r_000,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 1%" && alienato = "N" && sigla_inv = "F") AS f_r_100,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 2%" && alienato = "N" && sigla_inv = "F") AS f_r_200,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 3%" && alienato = "N" && sigla_inv = "F") AS f_r_300,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 4%" && alienato = "N" && sigla_inv = "F") AS f_r_400,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 5%" && alienato = "N" && sigla_inv = "F") AS f_r_500,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 6%" && alienato = "N" && sigla_inv = "F") AS f_r_600,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 7%" && alienato = "N" && sigla_inv = "F") AS f_r_700,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 8%" && alienato = "N" && sigla_inv = "F") AS f_r_800,
                    (SELECT COUNT(*) FROM catalogazioni c WHERE codice LIKE "R 9%" && alienato = "N" && sigla_inv = "F") AS f_r_900;';
    $result_f_r = mysql_query($query_f_r, $db) or die(mysql_error($db));
    $query2 = 'SELECT COUNT(id_catalog) AS tot FROM catalogazioni WHERE alienato = "N";';	
    $result2 = mysql_query($query2, $db) or die(mysql_error($db));
    $row2 = mysql_fetch_assoc($result2);
?>
            <table id="ris" class="query dewey">
                <caption>
                    Classificazione Codice Dewey
                    <br />
                    <span class="ris">TOTALE TESTI IN CATALOGO: <span class="slinea"><?php echo $row2['tot']; ?></span></span>
                </caption>
                <tr>
                    <th style="width: 20%;">
                        Tipologia
                    </th>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<th style="width: 8%;">'.$i.'00'.'</th>'."\n";
    }
?>
                </tr>
                <tr>
                    <td class="center">
                        Papillon Ragazzi
                    </td>
<?php
    $row_p = mysql_fetch_assoc($result_p);
    $row_p_r = mysql_fetch_assoc($result_p_r);
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.$row_p_r['p_r_'.$i.'00'].'</td>'."\n";
    }
?>
                </tr>
                <tr>
                    <td class="center">
                        Papillon Adulti
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.($row_p['p_'.$i.'00']-$row_p_r['p_r_'.$i.'00']).'</td>'."\n";
    }
?>
                </tr>
                <tr>
                    <td class="center">
                        Papillon Totali
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.$row_p['p_'.$i.'00'].'</td>'."\n";
    }
?>
                </tr>
                <tr>
                    <td class="center">
                        Comune Ragazzi
                    </td>
<?php
    $row_c = mysql_fetch_assoc($result_c);
    $row_c_r = mysql_fetch_assoc($result_c_r);
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.$row_c_r['c_r_'.$i.'00'].'</td>'."\n";
    }
?>
                </tr>
                <tr>
                    <td class="center">
                        Comune Adulti
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.($row_c['c_'.$i.'00']-$row_c_r['c_r_'.$i.'00']).'</td>'."\n";
    }
?>
                </tr>
                <tr>
                    <td class="center">
                        Comune Totali
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.$row_c['c_'.$i.'00'].'</td>'."\n";
    }
?>
                </tr>
                <tr>
                    <td class="center">
                        Filo&minus;Festival Ragazzi
                    </td>
<?php
    $row_f = mysql_fetch_assoc($result_f);
    $row_f_r = mysql_fetch_assoc($result_f_r);
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.$row_f_r['f_r_'.$i.'00'].'</td>'."\n";
    }
?>
                </tr>
                <tr>
                    <td class="center">
                        Filo&minus;Festival Adulti
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.($row_f['f_'.$i.'00']-$row_f_r['f_r_'.$i.'00']).'</td>'."\n";
    }
?>
                </tr>
                <tr>
                    <td class="center">
                        Filo&minus;Festival Totali
                    </td>
<?php
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.$row_f['f_'.$i.'00'].'</td>'."\n";
    }
?>
                </tr>
                <tr class="totali">
                    <td class="center">
                        Totali
                    </td>
<?php                    
    $row = mysql_fetch_assoc($result);
    for($i = 0;$i <= 9;$i++) {
        echo "\t\t\t\t\t".'<td class="center">'.$row['t_'.$i.'00'].'</td>'."\n";
    }
    echo "\t\t\t\t".'</tr>'."\n\t\t\t".'</table>'."\n";
    mysql_free_result($result);
    mysql_free_result($result2);
    mysql_free_result($result_p);
    mysql_free_result($result_c);
    mysql_free_result($result_f);
    mysql_free_result($result_p_r);
    mysql_free_result($result_c_r);
    mysql_free_result($result_f_r);
    mysql_close($db);			
    include('../include_php/end_gestione.php');
} else {
    redirect('../accesso.php');
}
?>