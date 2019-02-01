<?php
    include('./head.php');
    include('./intro.php');
?>
        <link rel="stylesheet" type="text/css" media="print" href="../css/print_table.css" />
        <title>Iscritti per Classe</title>
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
    if(isset($_GET['submit']) && $_GET['submit'] == 'Invia' && isset($_GET['num_classi']) && isset($_GET['action']))
    {
        if($_GET['action'] == "crea_classi")
        {
            $num_cla = $_GET['num_classi'];
?>
            <div class="query">
            <form id="registered_by_class" class="form classi registered_by_class" name="iscritti_per_classe" method="get" action="./iscritti_per_classe.php" enctype="application/x-www-form-urlencoded">
                <fieldset>
                    <h2>Scelta Classi</h2>
                    <ul>
<?php
            for($i = 1;$i <= $num_cla;$i++)
            {
                if($i == $num_cla)
                {
                    echo "\t\t\t\t\t\t".'<li>
                            <label>'.$i.'&deg; Classe:</label> 
                            &gt;=&nbsp;&nbsp;&nbsp;<input class="focus" type="text" name="'.$i.'" size="3" maxlength="3" value="'.(isset($_GET[$i]) ? $_GET[$i] : '').'" />
                        </li>'."\n";
                }
                else
                {
                    echo "\t\t\t\t\t\t".'<li>
                            <label>'.$i.'&deg; Classe:</label> 
                            da: <input class="focus" type="text" name="'.$i.'_da" size="3" maxlength="3" value="'.(isset($_GET[$i."_da"]) ? $_GET[$i."_da"] : '').'" />
                            &nbsp;
                            a: <input class="focus" type="text" name="'.$i.'_a" size="3" maxlength="3" value="'.(isset($_GET[$i."_a"]) ? $_GET[$i."_a"] : '').'" />
                        </li>'."\n";
                }
            }
?>	
                        <li class="li-container-radio">
                            <label>Tipo di Utenti:</label>
                            <ul class="container-radio">
                                <li>
                                    <input id="soci" class="radio" type="radio" name="tipo_utenti" value="soci" />
                                    <label for="soci">Soci</label>
                                </li>
                                <li>
                                    <input id="non-soci" class="radio" type="radio" name="tipo_utenti" value="non_soci" />
                                    <label for="non-soci">Non soci</label>
                                </li>
                                <li style="background-color: #96e979;">
                                    <input id="tutti" class="radio" type="radio" name="tipo_utenti" value="tutti" checked="checked" />
                                    <label for="tutti">Tutti</label>
                                </li>
                            </ul>
                        </li>
                        <li class="container-button">
                            <input type="hidden" name="action" value="visual_classi" />
                            <input type="hidden" name="num_classi" value="<?php echo $num_cla; ?>" />
                            <input id="reset" type="reset" name="reset" value="Reset" />
                            <input type="submit" name="submit" value="Invia" />
                        </li>
                    </ul>			
                </fieldset>
            </form>
            </div>
<?php

        }
        else if($_GET['action'] == "visual_classi")
        {
            $anno = date('Y');
            $num_cla = $_GET['num_classi'];
            switch($_GET['tipo_utenti']) {
                case 'soci':
                    $tipo = 'soci';
                    $titolo = 'BIBLIOTECA LUNETTA: UTENTI ISCRITTI AL PRESTITO (SOCI)';
                    $titolo_2 = 'SOCI';
                break;
                case 'non_soci':
                    $tipo = 'non soci';
                    $titolo = 'BIBLIOTECA LUNETTA: UTENTI ISCRITTI AL PRESTITO (NON SOCI)';
                    $titolo_2 = 'NON SOCI';
                break;
                case 'tutti':
                    $tipo = '';
                    $titolo = 'BIBLIOTECA LUNETTA: UTENTI ISCRITTI AL PRESTITO (SOCI + NON SOCI)';
                    $titolo_2 = 'SOCI + NON SOCI';
                break;
            }

            $query = 'SELECT ';
            if($tipo == '') {
                for($i = 1;$i <= $num_cla;$i++) {
                    if($i == $num_cla) {
                        $query .= '(SELECT COUNT(id_iscritto) FROM iscritti WHERE ('.$anno.'-YEAR(ddate_nascita)) >= '.$_GET[$i].') AS c'.$i;				
                        $_GET['cla_mag'.$i] = $_GET[$i];
                    } else {
                        $query .= '(SELECT COUNT(id_iscritto) FROM iscritti WHERE ('.$anno.'-YEAR(ddate_nascita)) BETWEEN '.$_GET[$i.'_da'].' AND '.$_GET[$i.'_a'].') AS c'.$i.',';
                        $_GET['cla_da'.$i] = $_GET[$i.'_da'];
                        $_GET['cla_a'.$i] = $_GET[$i.'_a'];
                    }
                }
                $Iscritti_classe = Utility::GetIscrittiClasse($objPDO, $query);
            } else if($tipo == "soci") {
                for($i = 1;$i <= $num_cla;$i++) {
                    if($i == $num_cla) {
                        $query .= '(SELECT COUNT(i.id_iscritto) FROM iscritti AS i, soci AS s WHERE i.id_iscritto = s.id_iscritto && s.anno = "'.$anno.'" && ('.$anno.'-YEAR(i.ddate_nascita)) >= '.$_GET[$i].') AS c'.$i;				
                        $_GET['cla_mag'.$i] = $_GET[$i];
                    } else {
                        $query .= '(SELECT COUNT(i.id_iscritto) FROM iscritti AS i, soci AS s  WHERE i.id_iscritto = s.id_iscritto && s.anno = "'.$anno.'" && ('.$anno.'-YEAR(ddate_nascita)) BETWEEN '.$_GET[$i.'_da'].' AND '.$_GET[$i.'_a'].') AS c'.$i.',';
                        $_GET['cla_da'.$i] = $_GET[$i.'_da'];
                        $_GET['cla_a'.$i] = $_GET[$i.'_a'];
                    }
                }
                $Iscritti_classe = Utility::GetIscrittiClasse($objPDO, $query);
            } else if($tipo == "non soci") {
                $query_s = 'SELECT ';
                for($i = 1;$i <= $num_cla;$i++) {
                    if($i == $num_cla) {
                        $query .= '(SELECT COUNT(id_iscritto) FROM iscritti WHERE ('.$anno.'-YEAR(ddate_nascita)) >= '.$_GET[$i].') AS c'.$i;		
                        $query_s .= '(SELECT COUNT(i.id_iscritto) FROM iscritti AS i, soci AS s WHERE i.id_iscritto = s.id_iscritto && s.anno = "'.$anno.'" && ('.$anno.'-YEAR(i.ddate_nascita)) >= '.$_GET[$i].') AS s'.$i;		
                        $_GET['cla_mag'.$i] = $_GET[$i];
                    } else {
                        $query .= '(SELECT COUNT(id_iscritto) FROM iscritti WHERE ('.$anno.'-YEAR(ddate_nascita)) BETWEEN '.$_GET[$i.'_da'].' AND '.$_GET[$i.'_a'].') AS c'.$i.',';
                        $query_s .= '(SELECT COUNT(i.id_iscritto) FROM iscritti AS i, soci AS s  WHERE i.id_iscritto = s.id_iscritto && s.anno = "'.$anno.'" && ('.$anno.'-YEAR(i.ddate_nascita)) BETWEEN '.$_GET[$i.'_da'].' AND '.$_GET[$i.'_a'].') AS s'.$i.',';
                        $_GET['cla_da'.$i] = $_GET[$i.'_da'];
                        $_GET['cla_a'.$i] = $_GET[$i.'_a'];
                    }
                }
                $Iscritti_classe = Utility::GetIscrittiClasse($objPDO, $query);
                $Iscritti_classe_soci = Utility::GetIscrittiClasse($objPDO, $query_s);
            }
?>
            <div class="query">
            <table id="ris" class="query classe">
                <caption><?php echo $titolo; ?></caption>
                <tr>
<?php
            for($i = 1;$i <= $num_cla;$i++) {
                if($i == $num_cla) {
                    echo "\t\t\t\t\t".'<th>Classe &gt;= '.$_GET[$i].'</th>'."\n";
                } else {
                    echo "\t\t\t\t\t".'<th>Classe '.$_GET[$i.'_da'].'&minus;'.$_GET[$i.'_a'].'</th>'."\n";					
                }
            }
?>               
                </tr>
                <tr>                
<?php
            $Num_tot_iscritti = Utility::GetTotaleIscritti($objPDO);
            $totale_parziale = 0;
            if($tipo == "non soci") {
                for($i = 1;$i <= $num_cla;$i++) {
                    echo "\t\t\t\t\t".'<td class="center">'.($Iscritti_classe["c".$i]-$Iscritti_classe_soci["s".$i]).'</td>'."\n";
                    $totale_parziale += ($Iscritti_classe["c".$i]-$Iscritti_classe_soci["s".$i]);
                }
            } else {
                for($i = 1;$i <= $num_cla;$i++) {
                    echo "\t\t\t\t\t".'<td class="center">'.$Iscritti_classe["c".$i].'</td>'."\n";
                    $totale_parziale += $Iscritti_classe["c".$i];
                }
            }
            echo "\n\t\t\t\t".'</tr>'."\n\t\t\t".'</table>'."\n";
            echo "\t\t\t".'<h2>'.$totale_parziale.' '.$titolo_2.' su un totale di '.$Num_tot_iscritti.' UTENTI</h2></div>'."\n";
        }
    }
    include('../include-php/end_gestione.php');
?>