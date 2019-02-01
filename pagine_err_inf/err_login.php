<?php
	session_start();
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
        <title>Profilo utente errato</title>
        <link rel="stylesheet" type="text/css" href="../css/pag_info.css">
    </head>
    <body>
		<div>
			<h1 id="rosso">
			 	Profilo Utente Errato
			</h1>
			<p>
				Username e/o Password errate. Prova ad inserirle nuovamente.
			</p>
			<p>
				Se hai dimenticato lo Username e/o la tua Password richiedi informazioni al tuo AMMINISTRATORE.
			</p>
			<p>
				Se non sarai indirizzato alla pagina principale entro pochi secondi, 
				<a href="../accesso.php"> clicca qui.</a>
			</p>
		</div>
		<?php 
			header('Refresh: 10; URL=../accesso.php');
		?>
		 
    </body>
</html>
