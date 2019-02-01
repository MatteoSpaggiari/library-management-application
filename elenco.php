<?php
    session_start();
    include('./include_php/redirect.php');
    include('./function/generic_function.php');
    include('./include_php/intro_elenco.php');
?>
        <title>Cerca Libro</title>
    </head>
    <body>
<?php
    include('./include_php/header_elenco.php');
    (isset($_GET['autore']) ? $Autore = urldecode(ucwords(trim(htmlspecialchars($_GET['autore'])))) : $Autore = "");
    (isset($_GET['titolo']) ? $Titolo = urldecode(ucwords(trim(htmlspecialchars($_GET['titolo'])))) : $Titolo = "");
    echo "\n";
?>
        <div id="contenuto">
            <p class="ricerca">
                <em>&quot;Benvenuto&quot;</em>
                <br />
                Digitando negli appositi spazi puoi verificare la presenza e la disponibilit&agrave; di <span class="slinea">libri/dvd/cd/vhs</span>.
                <br />
                Per quanto riguarda il campo <span class="slinea">autore</span>, digitare iniziando dal cognome.
            </p>						
            <form id="ricerca_libro" name="ricerca_libro" action="./elenco.php" method="get" enctype="application/x-www-form-urlencoded">
                <fieldset>
                    <legend>Modulo Ricerca Libro</legend>
                    <p>
                        <label>
                            Autore:
                        </label>
                        <input id="autore" class="focus" type="text" name="autore" value="" size="60" maxlength="100" autocomplete="off" autofocus="autofocus" />
                    </p>
                    <p>
                        <label>
                            Titolo:
                        </label>
                        <input id="titolo" class="focus" type="text" name="titolo" value="" size="60" maxlength="100" autocomplete="off" />
                    </p>
                    <div class="pos_but">
                        <input type="reset" name="reset" value="Reset" />
                        <input type="hidden" name="submit" value="invia_dati"  />
                        <input type="hidden" name="cerca" value="si"  />						
                        <input type="hidden" name="prima" value="si"  />						
                        <input type="hidden" name="p" value="1"  />						
                        <input type="submit" name="invia" value="Invia" />
                    </div>
                </fieldset>
            </form>
<?php
    if(isset($_GET['cerca']) && $_GET['cerca'] == "si" && isset($_GET['submit']) && $_GET['submit'] == "invia_dati") {
        include('./include_php/mysql.php');
        if($Autore != "" || $Titolo != "") {
?>
            <h3>Parole cercate: <?php trim($Autore) != "" ? print("Autore &#8594; ".replace(htmlspecialchars($Autore))) : ""; trim($Titolo) != "" ? print("&nbsp;&nbsp;Titolo &#8594; ".replace(htmlspecialchars($Titolo))) : ""; ?></h3>
<?php
            if(isset($_GET['prima'])) {
                require_once('./function/func_num_pag.php');
                $num_row_tot = Num_Pag();
            } else {
                $num_row_tot = $_GET['nt'];
            }
            if($num_row_tot > 0) {				
                $num_pagine = ceil($num_row_tot / 10);
                $num_indice = ceil($num_pagine / 10);
                $i = (isset($_GET['p'])? (($_GET['p']-1)*10) : 0);			
                $sql = 'SELECT
                       c.id_catalog, c.sigla_inv AS s_inv, c.num_inv AS n_inv, c.titolo AS tit, c.autore AS aut, p.resa AS disp
                    FROM
                                catalogazioni AS c LEFT JOIN (SELECT id_catalog, resa FROM prestiti p GROUP BY id_catalog, resa) AS p ON c.id_catalog = p.id_catalog
                    WHERE
                                alienato = "N" && visibile = "Y" '.(isset($Titolo) ? (' && c.titolo LIKE "%'.mysql_real_escape_string($Titolo,$db).'%" ') : "").' '.(isset($Autore) ? (' && c.autore LIKE "%'.mysql_real_escape_string($Autore,$db).'%" ') : '').'
                    ORDER BY
                        c.autore ASC, c.titolo ASC, p.resa ASC
                    LIMIT '.$i.',10;';
                $result = mysql_query($sql, $db) or die(mysql_error($db));			
                $num_row = mysql_num_rows($result);
                if($num_row_tot > 1) {
?>
            <h3 class="ris">Sono stati trovati "<?php echo $num_row_tot; ?>" RISULTATI!</h3>
<?php	
                } else {
?>
            <h3 class="ris">&Egrave; stato trovato un solo RISULTATO!</h3>
<?php
                }
?>
            <table id="ris">
                <tr>
                    <th width="10%">n&deg; inventario</th>
                    <th width="25%">Autore</th>
                    <th width="40%">Titolo</th>		
                    <th width="10%">Disponibile</th>
                </tr>
<?php
                    // Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
                    $odd = true;
                    $catalogo = "";
                    while($row = mysql_fetch_assoc($result)) {	
                        extract($row);
                        if($catalogo != $id_catalog) {
                            echo ($odd == true) ? "\t\t\t\t".'<tr class="odd_row">'."\n" : "\t\t\t\t".'<tr class="even_row">'."\n";
                            $odd = !$odd;
                            echo "\t\t\t\t\t".'<td><strong>'.$s_inv.'/'.$n_inv.'</strong></td>';
                            echo '<td><em>'.$aut.'</em></td>';						
                            echo '<td>'.$tit.'</td>';
                            echo '<td class="center">'.(($disp == "N") ? "no" : "si").'</td>'."\n\t\t\t\t".'</tr>'."\n";
                            $catalogo = $id_catalog;
                        }					
                    }		
                    echo "\t\t\t".'</table>';
                    echo "\n\t\t\t".'<p id="pagine">Numero Pagina:'."\n\t\t\t\t";
                    if ($_GET['p'] >=1 && $_GET['p'] <=10) {	
                        for($pa = 1; $pa <= min(11,$num_pagine); $pa++) {				
                            if($pa == $_GET['p']) {									
                                echo '<a style="text-decoration: none; color: #000" id="numpag">'.$pa.'</a>';							
                            } else if($pa == 11) {									
                                echo '<a id="numpag" href="./elenco.php?autore='.$Autore.'&titolo='.$Titolo.'&p='.$pa.'&nt='.$num_row_tot.'&ni=2&cerca=si&submit=invia_dati">&#8594;</a>';						
                            } else {						
                                echo '<a id="numpag" href="./elenco.php?autore='.$Autore.'&titolo='.$Titolo.'&p='.$pa.'&nt='.$num_row_tot.'&ni=1&cerca=si&submit=invia_dati">'.$pa.'</a>';							
                            }
                        }
                        echo "\n\t\t\t".'</p>'."\n";
                    } else if($_GET['ni'] >= 2 && ($_GET['ni'] < $num_indice)) {						
                        for($pa = (10 * ($_GET['ni'] - 1)); $pa <= ((10 * $_GET['ni']) + 1); $pa++) {										
                            if($pa == $_GET['p']) {											
                                echo '<a style="text-decoration: none; color: #000" id="numpag">'.$pa.'</a>';									
                            } else if($pa == (10 * ($_GET['ni'] - 1)) && ($_GET['p'] > (10 * ($_GET['ni'] - 1)) && ($_GET['p']) <= (10 * $_GET['ni']))){											
                                echo '<a id="numpag" href="./elenco.php?autore='.$Autore.'&titolo='.$Titolo.'&p='.$pa.'&nt='.$num_row_tot.'&ni='.($_GET['ni'] - 1).'&cerca=si&submit=invia_dati">&#8592;</a>';												
                            } else if($pa == ((10 * $_GET['ni']) + 1) && ($_GET['p'] > (10 * ($_GET['ni'] - 1)) && ($_GET['p']) <= (10 * $_GET['ni']))){											
                                echo '<a id="numpag" href="./elenco.php?autore='.$Autore.'&titolo='.$Titolo.'&p='.$pa.'&nt='.$num_row_tot.'&ni='.($_GET['ni'] + 1).'&cerca=si&submit=invia_dati">&#8594;</a>';											
                            } else {									 
                                echo '<a id="numpag" href="./elenco.php?autore='.$Autore.'&titolo='.$Titolo.'&p='.$pa.'&nt='.$num_row_tot.'&ni='.$_GET['ni'].'&cerca=si&submit=invia_dati">'.$pa.'</a>';
                            }
                        }
                        echo "\n\t\t\t".'</p>'."\n";
                    } else if($_GET['ni'] == $num_indice) {						
                        for($pa = (10 * ($_GET['ni'] - 1)); $pa <= min($num_pagine,((10 * $_GET['ni']) + 1)); $pa++) {										
                            if($pa == $_GET['p']) {												
                                echo '<a style="text-decoration: none; color: #000" id="numpag">'.$pa.'</a>';									
                            } else if($pa == (10 * ($_GET['ni'] - 1)) && ($_GET['p'] > (10 * ($_GET['ni'] - 1)) && ($_GET['p']) <= (10 * $_GET['ni']))){												
                                echo '<a id="numpag" href="./elenco.php?autore='.$Autore.'&titolo='.$Titolo.'&p='.$pa.'&nt='.$num_row_tot.'&ni='.($_GET['ni'] - 1).'&cerca=si&submit=invia_dati">&#8592;</a>';												
                            } else {					 
                                echo '<a id="numpag" href="./elenco.php?autore='.$Autore.'&titolo='.$Titolo.'&p='.$pa.'&nt='.$num_row_tot.'&ni='.$_GET['ni'].'&cerca=si&submit=invia_dati">'.$pa.'</a>';								
                            }
                        }			
                        echo "\n\t\t\t".'</p>'."\n";
                    }
                mysql_free_result($result);
                mysql_close($db);
            } else {
                echo "\t\t\t<h3 class='no_ris'><strong>Nessun libro trovato con questi parametri di ricerca.</strong></h3>\n";
            }
        } else {
            echo "\t\t\t<h3><strong>Devi inserire almeno un AUTORE o un TITOLO.</strong></h3>\n";
        }
    }
    include('./include_php/end.php');
?>