<?php
session_start();
include('../include_php/redirect.php');
if(isset($_SESSION['access_level_s']) && $_SESSION['access_level_s'] > 1 && isset($_SESSION['logged']) && $_SESSION['logged'] == 1 && isset($_SESSION['user_id_s'])) {
	include('./intro.php');
	include_once("../include_php/mysql.php");
?>	
		<link rel="stylesheet" type="text/css" media="print" href="../css/print_table.css" />
		<title>Elenco Soci</title>
	</head>
	<body>
<?php
	include_once("./header.php");
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
	$query = 'SELECT i.id_iscritto, i.num_tessera, i.nome, i.cognome, i.localita, i.tel_casa, i.tel_cell, s.anno
                FROM iscritti AS i, soci AS s
                WHERE  i.id_iscritto = s.id_iscritto
                ORDER BY i.num_tessera ASC, s.anno ASC;';
	$result = mysql_query($query, $db) or die(mysql_error($db));	
	$num_row_tot = mysql_num_rows($result);
	if($num_row_tot > 0) {
		if($num_row_tot > 1) {		
?>
    <main class="query">
        <div id="corpo" class="corpo">
<?php
    include_once("./menu-query.php");
?>
			<h2 class="tit_altre_oper">Elenco soci</h2>
			<h3 class="ris">Sono stati trovati "<?php echo $num_row_tot; ?>" RISULTATI!</h3>
<?php	
		} else {	
?>		
			<h4 class="ris">&Egrave; stato trovato un solo RISULTATO!</h4>
<?php		
		}		
?>		
			<table id="ris" class="restituzioni">
				<tr>
                                        <th width="10%">N&deg; Tessera</th>
                                        <th width="20%">Nome</th>
					<th width="20%">Cognome</th>				
					<th width="20%">Localita</th>
					<th width="20%">Telefono</th>
					<th width="10%">Anno</th>
				</tr>
<?php		
		// Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
		$odd = true;
		while($row = mysql_fetch_assoc($result)) {	
			extract($row);
			echo ($odd == true) ? "\t\t\t\t".'<tr class="odd_row">'."\n" : "\t\t\t\t".'<tr class="even_row">'."\n";
			$odd = !$odd;
			echo "\t\t\t\t\t".'<td class="center"><em><a title="Vai a Scheda Utente" class="catalog" href="../scheda_utente.php?CodUtente='.$id_iscritto.'">'.$num_tessera.'</a></em></td>';
			echo '<td><em><a title="Vai a Scheda Utente" class="catalog" href="../scheda_utente.php?CodUtente='.$id_iscritto.'">'.$nome.'</a></em></td>';
			echo '<td><em><a title="Vai a Scheda Utente" class="catalog" href="../scheda_utente.php?CodUtente='.$id_iscritto.'">'.$cognome.'</a></em></td>';
			echo '<td><a title="Vai a Scheda Utente" class="catalog" href="../scheda_utente.php?CodUtente='.$id_iscritto.'">'.$localita.'</a></td>';
			echo '<td class="center"><em><a title="Vai a Scheda Utente" class="catalog" href="../scheda_utente.php?CodUtente='.$id_iscritto.'">'.$tel_casa.'</a><a class="catalog" href="./scheda_utente.php?CodUtente='.$id_iscritto.'">'.$tel_cell.'</a></em></td>';
			echo '<td class="center">'.$anno.'</td>'."\n\t\t\t\t".'<tr>'."\n";	
		}		
		echo "\t\t\t".'</table>'."\n";
									
	} else {
		echo "\n\t\t\t".'<h2 class="tit_altre_oper">Elenco Soci</h2><h3>Nessun sollecito restituzione</h3>'."\n";					
	}
	
	# Chiusura della connessione
	mysql_free_result($result);
	mysql_close($db);	
	include('../include_php/end_gestione.php');
} else {
	redirect('../accesso.php');
}
?>