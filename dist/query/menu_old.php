		<header>
			<h2>&minus; PROGRAMMA GESTIONE BIBLIOTECA LUNETTA &minus;</h2>
			<p class="utente_accesso">
<?php
		if($_SESSION['access_level_s'] == 3) {
			echo "\t\t\t\t<strong>Amministratore: </strong><em><mark>".$_SESSION['nome_u_s']." ".$_SESSION['cognome_u_s']."</mark></em>\n";
		} else if($_SESSION['access_level_s'] == 2) {
			echo "\t\t\t\t<strong>Operatore:</strong> <em><mark>".$_SESSION['nome_u_s']." ".$_SESSION['cognome_u_s']."</mark></em>\n";		
		} else {
			echo "\t\t\t\t<strong>Altro:</strong> <em><mark>".$_SESSION['nome_u_s']." ".$_SESSION['cognome_u_s']."</mark></em>\n";					
		}
		
?>
				&nbsp;(<a class="logout" alt="Esci" title="Esci" href="../azzera_sessioni.php?esci=si">Esci</a>)
			</p>
		</header>	
		<div id="menu">
			<ul id="accordion" class="voci">
				<li>
					<h3>Catalogazione</h3>
					<ul>
<?php
	if($_SESSION['access_level_s'] == 3) {
?>
						<li><a alt="Inserimento nuova catalogazione" title="Inserimento nuova catalogazione" href="../nuova_catalog.php">Nuova catalogazione</a></li>
<?php
	}
?>
						<li><a alt="Cerca catalogazione" title="Cerca catalogazione" href="../azzera_sessioni.php?ricerca_cat=y">Cerca catalogazione</a></li>
					</ul>
				</li>
				<li>
					<h3>Utenti</h3>
					<ul>
						<li><a alt="Inserimento nuovo utente" title="Inserimento nuovo utente" href="../nuovo_utente.php">Nuovo utente</a></li>
						<li><a alt="Cerca utente" title="Cerca utente" href="../azzera_sessioni.php?ricerca_ute=y">Cerca utente</a></li>
					</ul>
				</li>
				<li>
					<h3>Prestiti</h3>
					<ul>
						<li><a alt="Inserimento nuovo prestito" title="Inserimento nuovo prestito" href="../nuovo_prestito.php">Nuovo prestito</a></li>
					</ul>
				</li>
				<li>
					<h3>Altre Operazioni</h3>
					<ul>
						<li><a alt="Sollecito Restituzioni" title="Sollecito Restituzioni" href="./sol_restituzioni.php">Sollecito Restituzioni</a></li>
						<li><a alt="Utente Adulto con numero maggiore di prestiti" title="Utente Adulto con numero maggiore di prestiti" href="./utenti_pres.php?tipo=adulti">Classifica prestiti adulti</a></li>
						<li><a alt="Utente Giovane con numero maggiore di prestiti" title="Utente Giovane con numero maggiore di prestiti" href="./utenti_pres.php?tipo=giovani">Classifica prestiti giovani</a></li>
					</ul>
				</li>
			</ul>
		</div>