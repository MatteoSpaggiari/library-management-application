<?php
	include('./include_php/redirect.php');
	include('./include_php/intro.php');
?>
	</head>
	<body>
<?php
	(isset($_GET['autore']) ? $Autore = urldecode(ucwords(trim(htmlspecialchars($_GET['autore'])))) : "");
	(isset($_GET['titolo']) ? $Titolo = urldecode(ucwords(trim(htmlspecialchars($_GET['titolo'])))) : "");
?>
		<div id="box_sx">
			<img id="logo" alt="Logo Biblioteca" title="Logo Biblioteca" src="./images/logo_biblio.gif" />
			<p class="info">
				Associazione culturale di volontari operante presso
				<br />
				la Biblioteca di quartiere Lunetta&minus;Frassino:
			</p>
			<ul>
				<li>
					Viale Veneto 31/A Mantova
				</li>
				<li>
					Tel: 0376-370712
				</li>
				<li>
					Fax: 0376-370712
				</li>
				<li>
					Email: <a alt="email" title="email" href="mailto:info@papillon-centrolettura.it">info@papillon-centrolettura.it</a>			
				</li>
			</ul>
		</div>
		<div id="contenuto">	
			<p class="ricerca">
				Benvenuto nel <em>Modulo di Ricerca Libro.</em>
				<br />
				Questo modulo ti consentir&agrave; di cercare un libro attraverso il <span class="slinea">nome dell'autore</span> e/o il <span class="slinea">titolo del libro</span>.
			</p>						
			<form id="Ricerca_Libro" name="ricerca_libro" action="./elenco_old.php" method="get" enctype="application/x-www-form-urlencoded">
				<fieldset>
					<legend>Modulo Ricerca Libro</legend>
					<p>
						<label>
							Autore:
						</label>
						<input name="autore" class="focus" type="text" value="" size="20" maxlength="20" tabindex="1" />
					</p>		
					<p>
						<label>
							Titolo:
						</label>
						<input name="titolo" class="focus" type="text" value="" size="20" maxlength="20" tabindex="2" />
					</p>
					<div>
						<input id="reset" class="reset" type="reset" name="reset" value=" " tabindex="13" />
						<input type="hidden" name="submit" value="invia_dati"  />
						<input type="hidden" name="cerca" value="si"  />						
						<input type="hidden" name="prima" value="si"  />						
						<input type="hidden" name="p" value="1"  />						
						<input id="invia" type="image" name="image_i" value="Invia" src="./images/invia_i.png" tabindex="14" onkeydown="return false;" />
					</div>
				</fieldset>
			</form>
<?php
	if(isset($_GET['cerca']) && $_GET['cerca'] == "si" && isset($_GET['submit']) && $_GET['submit'] == "invia_dati") {
		include('./include_php/mysql_old.php');		
?>
			<h3>Parole cercate: <?php trim($Autore) != "" ? print("Autore &#8594; ".htmlspecialchars($Autore)) : ""; trim($Titolo) != "" ? print("&nbsp;&nbsp;Titolo &#8594; ".htmlspecialchars($Titolo)) : ""; ?></h3>
<?php    	
			if(isset($_GET['prima'])) {
				require_once('./Function/FuncNumPag.php');
				$num_row_tot = Num_Pag();
			} else {
				$num_row_tot = $_GET['nt'];
			}
			
			if($num_row_tot > 0) {
				
				$num_pagine = ceil($num_row_tot / 10);
				$num_indice = ceil($num_pagine / 10);
				$i = (isset($_GET['p'])? (($_GET['p']-1)*10) : 0);
				
				$sql = 'SELECT
				        l.inventario AS inv, l.titolo AS tit, l.autorecampo AS aut, p.resa AS disp
				    FROM
				        libri AS l, prestiti_new AS p
				    WHERE
				    	l.codice = p.codice '.(isset($Autore) ? (' && l.autorecampo like "%'.mysql_real_escape_string($Autore,$db).'%" ') : '').' '.(isset($Titolo) ? (' && l.titolo like "%'.mysql_real_escape_string($Titolo,$db).'%" ') : '').' 
				    GROUP BY
				    	l.inventario
				    ORDER BY
				        l.titolo
				    LIMIT '.$i.',10';
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
					<th width="15%">n&deg; inventario</th>
					<th width="25%">Autore</th>
					<th width="35%">Titolo</th>		
					<th width="10%">Disponibile</th>
				</tr>
<?php		
					// Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
					$odd = true;
					while($row = mysql_fetch_assoc($result)) {	
						extract($row);
						echo ($odd == true) ? '<tr class="odd_row">'."\n" : '<tr class="even_row">'."\n";
						$odd = !$odd;
						echo "\t\t\t\t\t".'<td><strong>'.$inv.'</strong></td>';
						echo '<td><em>'.$aut.'</em></td>';						
						echo '<td>'.$tit.'</td>';
						echo '<td class="center">'.(($disp == 0) ? "no" : "si").'</td>'."\n\t\t\t\t".'</tr>'."\n\t\t\t\t";						
					}		
					echo "\n\t\t\t".'</table>';
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
						echo "\n\t\t\t".'</p>';
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
						echo "\n\t\t\t".'</p>';
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
						echo "\n\t\t\t".'</p>';
					}	
				mysql_free_result($result);
				mysql_close($db);
			} else {
			echo "\t\t<h3><strong>Nessun libro trovato con questi parametri di ricerca.</strong></h3>";
		}	

	}
	include('./include_php/end.php');
?>