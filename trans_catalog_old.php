<?php	
session_start();
if(isset($_SESSION['access_level_s']) && $_SESSION['access_level_s'] > 1 && isset($_SESSION['logged']) && $_SESSION['logged'] == 1 && isset($_SESSION['user_id_s'])) {
	require_once('./Include_Php/mysql.php');
	require_once('./Include_Php/redirect.php');
	require_once('./Function/Generic_Function.php');

	$data_modif = date('Y-m-d H:i:s');	
	if(isset($_REQUEST['submit'])) {
		switch($_REQUEST['submit']) {
			case 'new_catalog' :
	
				$error = array();
				
				$Proprieta = (isset($_POST['proprieta'])) ? $_POST['proprieta'] : '';
				if(empty($Proprieta)) {
					$error[] = urlencode('&Egrave obbligatorio scegliere la PROPRIET&Agrave; della nuova catalogazione.');
				}
				$_SESSION['proprieta_n'] = $Proprieta;
						
				$Num_Inv = (isset($_POST['num_inv'])) ? trim($_POST['num_inv']) : '';
				$Num_Inv = replace($Num_Inv);
				if(empty($Num_Inv)) {
					$error[] = urlencode('&Egrave obbligatorio inserire il NUMERO INVENTARIO.');				
				} else if (!preg_match('|^[0-9()]+$|', $Num_Inv)) {
					$error[] = urlencode('Hai inserito un NUMERO INVENTARIO non corretto.');
				}
				$_SESSION['num_inv_n'] = $Num_Inv;
				
				$Cod_Dew = (isset($_POST['dewey'])) ? strtoupper(trim($_POST['dewey'])) : '';
				$Cod_Dew = replace($Cod_Dew);
				if(empty($Cod_Dew)) {
					$error[] = urlencode('&Egrave obbligatorio inserire il CODICE DEWEY.');				
				} else if (!preg_match('|^[A-Z0-9\. ]+$|', $Cod_Dew)) {
					$error[] = urlencode('Hai inserito un CODICE DEWEY non corretto.');
				}
				$_SESSION['dewey_n'] = $Cod_Dew;
			
				$Titolo = (isset($_POST['titolo'])) ? trim($_POST['titolo']) : '';
				$Titolo = replace($Titolo);
				if(empty($Titolo)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un TITOLO.');				
				} else if (!preg_match('|^[!\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Titolo)) {
					$error[] = urlencode('Hai inserito un TITOLO non corretto.');
				}
				$_SESSION['titolo_n'] = $Titolo;			
	
				$Autore = (isset($_POST['autore'])) ? ucwords(trim($_POST['autore'])) : '';
				$Autore = replace($Autore);
				if(empty($Autore)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un AUTORE.');				
				} else if(!preg_match('|^[\-\.\&\'\"0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,() ]+$|', $Autore)) {
					$error[] = urlencode('Hai inserito un AUTORE non corretto.');
				}
				$_SESSION['autore_n'] = $Autore;
				
				$Genere = (isset($_POST['genere'])) ? trim($_POST['genere']) : '';
				$Genere = replace($Genere);
				if(empty($Genere)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un GENERE.');	
				} else if(!preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$|', $Genere)) {
					$error[] = urlencode('Hai inserito un GENERE non corretto.');
				}
				$_SESSION['genere_n'] = $Genere;
	
				$Editore = (isset($_POST['editore'])) ? trim($_POST['editore']) : '';
				$Editore = replace($Editore);
				if(empty($Editore)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un EDITORE.');				
				} else if(!preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$|', $Editore)) {
					$error[] = urlencode('Hai inserito un EDITORE non corretto.');
				}
				$_SESSION['editore_n'] = $Editore;
				
				$Edizione = (isset($_POST['edizione'])) ? ucwords(trim($_POST['edizione'])) : '';
				$Edizione = replace($Edizione);
				if(empty($Edizione)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire la EDIZIONE.');				
				} else if(!preg_match('|^[A-Za-z ]+[A-Za-z]+[ ]{1}[-]{1}[ ]{1}[0-9]{4}$|', $Edizione)) {
					$error[] = urlencode('Hai inserito una EDIZIONE non corretta.');
				}
				$_SESSION['edizione_n'] = $Edizione;

				$Collana = (isset($_POST['collana'])) ? trim($_POST['collana']) : '';
				$Collana = replace($Collana);
				if(!empty($Collana) && !preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$|', $Collana)) {
					$error[] = urlencode('Hai inserito un COLLANA non corretta.');
				}
				$_SESSION['collana_n'] = $Collana;
				
				$Scaffale = (isset($_POST['scaffale'])) ? strtoupper(trim($_POST['scaffale'])) : '';
				$Scaffale = replace($Scaffale);
				if(empty($Scaffale)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire lo SCAFFALE.');				
				} else if(!preg_match('|^[0-9A-Z ]+$|', $Scaffale)) {
					$error[] = urlencode('Hai inserito uno SCAFFALE non corretto.');
				}
				$_SESSION['scaffale_n'] = $Scaffale;
				
				$Formato = (isset($_POST['formato'])) ? trim($_POST['formato']) : '';
				$Formato = replace($Formato);
				if(empty($Formato)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire il FORMATO.');				
				} else if(!preg_match('|^[0-9A-Za-z, \+]+$|', $Formato)) {
					$error[] = urlencode('Hai inserito uno FORMATO non corretto.');
				}
				$_SESSION['formato_n'] = $Formato;

				$Note_Formato = (isset($_POST['note_formato'])) ? trim($_POST['note_formato']) : '';
				$Note_Formato = replace($Note_Formato);
				if(!empty($Note_Formato) && !preg_match('|^[\+\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$|', $Note_Formato)) {
					$error[] = urlencode('Hai inserito una NOTA FORMATO non corretta.');
				}
				$_SESSION['note_formato_n'] = $Note_Formato;
				
				$Pagine = (isset($_POST['pagine'])) ? trim($_POST['pagine']) : '';
				$Pagine = replace($Pagine);
				if(empty($Pagine)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire il NUMERO DI PAGINE.');				
				} else if(!preg_match('|^[0-9]+$|', $Pagine)) {
					$error[] = urlencode('Hai inserito un NUMERO DI PAGINE non corretto.');
				}
				$_SESSION['pagine_n'] = $Pagine;
				
				$Data_c = (isset($_POST['data_c'])) ? trim($_POST['data_c']) : '';
				$Data_c = replace($Data_c);
				if(empty($Data_c)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire la DATA CATALOGAZIONE.');				
				} else if(!preg_match('|^[0-9]{4}-[0-9]{2}-[0-9]{2}$|', $Data_c)) {
					$error[] = urlencode('Hai inserito una DATA CATALOGAZIONE non corretta.');
				}
				$_SESSION['data_c_n'] = $Data_c;
						
				$Novita = (isset($_POST['novita'])) ? $_POST['novita'] : '';
				if(empty($Novita)) {
					$error[] = urlencode('&Egrave obbligatorio scegliere il campo NOVIT&Agrave;.');
				}
				$_SESSION['novita_n'] = $Novita;

				$Costo = (isset($_POST['costo'])) ? trim($_POST['costo']) : '';
				$Costo = replace(str_replace(",",".",$Costo));
				if(empty($Costo)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire il COSTO.');				
				} else if(!preg_match('|^[0-9\.]+$|', $Costo)) {
					$error[] = urlencode('Hai inserito un COSTO non corretto.');
				}
				$_SESSION['costo_n'] = $Costo;

				$Proven = (isset($_POST['provenienza'])) ? trim($_POST['provenienza']) : '';
				$Proven = replace($Proven);
				if (!empty($Proven) && !preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Proven)) {
					$error[] = urlencode('Hai inserito una PROVENIENZA non corretta.');
				}
				$_SESSION['provenienza_n'] = $Proven;

				$Lingua_o = (isset($_POST['lingua_o'])) ? $_POST['lingua_o'] : '';
				if(empty($Lingua_o)) {
					$error[] = urlencode('&Egrave obbligatorio scegliere la LINGUA ORIGINALE.');
				}
				$_SESSION['lingua_o_n'] = $Lingua_o;
				
				$Titolo_o = (isset($_POST['titolo_o'])) ? trim($_POST['titolo_o']) : '';
				$Titolo_o = replace($Titolo_o);
				if(!empty($Titolo_o) && !preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Titolo_o)) {
					$error[] = urlencode('Hai inserito un TITOLO ORIGINALE non corretto.');
				}
				$_SESSION['titolo_o_n'] = $Titolo_o;
				
				$Traduttore = (isset($_POST['traduttore'])) ? ucwords(trim($_POST['traduttore'])) : '';
				$Traduttore = replace($Traduttore);
				if(!empty($Traduttore) && !preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Traduttore)) {
					$error[] = urlencode('Hai inserito un TRADUTTORE non corretto.');
				}
				$_SESSION['traduttore_n'] = $Traduttore;

				$Testo_f = (isset($_POST['testo_f'])) ? $_POST['testo_f'] : '';
				if(empty($Testo_f)) {
					$error[] = urlencode('&Egrave obbligatorio scegliere il TESTO A FRONTE.');
				}
				$_SESSION['testo_f_n'] = $Testo_f;

				$Lingua = (isset($_POST['lingua'])) ? trim($_POST['lingua']) : '';
				$Lingua = replace($Lingua);
				if(!empty($Lingua) && !preg_match('|^[a-zA-Z, ]+$|', $Lingua)) {
					$error[] = urlencode('Hai inserito una LINGUA non corretta.');
				}
				$_SESSION['lingua_n'] = $Lingua;

				$Nazione = (isset($_POST['nazione'])) ? ucwords(trim($_POST['nazione'])) : '';
				$Nazione = replace($Nazione);
				if(empty($Nazione)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire la NAZIONE.');				
				} else if(!preg_match('|^[A-Za-z\. ()]+$|', $Nazione)) {
					$error[] = urlencode('Hai inserito una NAZIONE non corretta.');
				}
				$_SESSION['nazione_n'] = $Nazione;
			
				$Note = (isset($_POST['note'])) ? trim($_POST['note']) : '';
				$Note = replace($Note);
		/*		if(!empty($Note) && !preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$|', $Note)) {
					$error[] = urlencode('Hai inserito una NOTA non corretta.');
				}*/
				$_SESSION['note_n'] = $Note;
								
				if(isset($error) && !empty($error)) {					
					redirect('./nuova_catalog.php?errori='.join($error, urlencode('<br />')));				
				} else {						
					$query2 = 'SELECT id_catalog
						FROM catalogazioni
						WHERE sigla_inv = "'.$Proprieta.'" && num_inv = "'.$Num_Inv.'" ;';
					$result2 = mysql_query($query2, $db) or die(mysql_error($db));	
					$num_righe = mysql_num_rows($result2);
					if($num_righe > 0) {
						mysql_free_result($result2);
						$errore = "&Egrave; gi&agrave; presente una CATALOGAZIONE con questa PROPRIET&Agrave; E con questo NUMERO DI INVENTARIO.";
						redirect('./nuova_catalog.php?errori='.urlencode($errore));
						exit();
					}						
									
					$query = 'INSERT IGNORE INTO catalogazioni (id_catalog, sigla_inv, num_inv, codice, titolo, autore, genere, editore, edizione, collana, scaffale, formato, note_formato, pagine, data_catalog, novita, costo, provenienza, lingua_orig, titolo_orig,traduttore, testo_fronte, lingua, nazione, note, data_modifica, id_sog_modifica)
						VALUES (NULL, "'.mysql_real_escape_string($Proprieta,$db).'", "'.mysql_real_escape_string($Num_Inv,$db).'", "'.mysql_real_escape_string($Cod_Dew,$db).'", "'.mysql_real_escape_string($Titolo,$db).'", "'.mysql_real_escape_string($Autore,$db).'", "'.mysql_real_escape_string($Genere,$db).'", "'.mysql_real_escape_string($Editore,$db).'", "'.mysql_real_escape_string($Edizione,$db).'", "'.mysql_real_escape_string($Collana,$db).'", "'.mysql_real_escape_string($Scaffale,$db).'", "'.mysql_real_escape_string($Formato,$db).'", "'.mysql_real_escape_string($Note_Formato,$db).'", '.mysql_real_escape_string($Pagine,$db).', "'.mysql_real_escape_string($Data_c,$db).'", "'.mysql_real_escape_string($Novita,$db).'", '.mysql_real_escape_string($Costo,$db).', "'.mysql_real_escape_string($Proven,$db).'", "'.mysql_real_escape_string($Lingua_o,$db).'", "'.mysql_real_escape_string($Titolo_o,$db).'", "'.mysql_real_escape_string($Traduttore,$db).'", "'.mysql_real_escape_string($Testo_f,$db).'", "'.mysql_real_escape_string($Lingua,$db).'", "'.mysql_real_escape_string($Nazione,$db).'", "'.mysql_real_escape_string($Note,$db).'", "'.mysql_real_escape_string($data_modif,$db).'", '.mysql_real_escape_string($_SESSION['user_id_s'],$db).')';											
					mysql_query($query, $db) or die(mysql_error($db));
					$Cod_Catalog = mysql_insert_id($db);
				
					$query = 'SELECT autore
						FROM autori
						WHERE autore = "'.$Autore.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));						
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO autori (id_autore, autore)
						VALUES (NULL, "'.mysql_real_escape_string($Autore,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					
					$query = 'SELECT collana
						FROM collane
						WHERE collana = "'.$Collana.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));						
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO collane (id_collana, collana)
						VALUES (NULL, "'.mysql_real_escape_string($Collana,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
									
					$query = 'SELECT editore
						FROM editori
						WHERE editore = "'.$Editore.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));						
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO editori (id_editore, editore)
						VALUES (NULL, "'.mysql_real_escape_string($Editore,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					
					$query = 'SELECT formato
						FROM formati
						WHERE formato = "'.$Formato.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));						
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO formati (id_formato, formato)
						VALUES (NULL, "'.mysql_real_escape_string($Formato,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					
					$query = 'SELECT genere
						FROM generi
						WHERE genere = "'.$Genere.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));						
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO generi (id_genere, genere)
						VALUES (NULL, "'.mysql_real_escape_string($Genere,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					
					$query = 'SELECT nazione
						FROM nazioni
						WHERE nazione = "'.$Nazione.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));						
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO nazioni (id_nazione, nazione)
						VALUES (NULL, "'.mysql_real_escape_string($Nazione,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					
					$query = 'SELECT scaffale
						FROM scaffali
						WHERE scaffale = "'.$Scaffale.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));						
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO scaffali (id_scaffale, scaffale)
						VALUES (NULL, "'.mysql_real_escape_string($Scaffale,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					mysql_close($db);
					
					//Svuoto le variabili di sessione per evitare che cliccando su nuovo inserimento nel menu compaiano i dati
					unset($_SESSION['proprieta_n']);
					unset($_SESSION['num_inv_n']);
					unset($_SESSION['dewey_n']);
					unset($_SESSION['titolo_n']);
					unset($_SESSION['autore_n']);
					unset($_SESSION['genere_n']);
					unset($_SESSION['editore_n']);
					unset($_SESSION['edizione_n']);
					unset($_SESSION['collana_n']);
					unset($_SESSION['scaffale_n']);
					unset($_SESSION['formato_n']);
					unset($_SESSION['note_formato_n']);
					unset($_SESSION['pagine_n']);
					unset($_SESSION['data_c_n']);
					unset($_SESSION['novita_n']);
					unset($_SESSION['costo_n']);
					unset($_SESSION['provenienza_n']);
					unset($_SESSION['lingua_o_n']);
					unset($_SESSION['titolo_o_n']);
					unset($_SESSION['traduttore_n']);
					unset($_SESSION['testo_f_n']);
					unset($_SESSION['lingua_n']);
					unset($_SESSION['nazione_n']);
					unset($_SESSION['note_n']);
					
					$successo = urlencode("INSERIMENTO CATALOGAZIONE AVVENUTO CORRETTAMENTE");
					redirect('./scheda_catalog.php?CodCatalog='.$Cod_Catalog.'&p=1&tr=&successo='.$successo);			
				}			
			break;
				
			case 'modifica_catalog' :
				
				if(isset($_POST['Cod_L']) && ctype_digit($_POST['Cod_L'])) {
					$Cod_Catalog = trim($_POST['Cod_L']);
					$_SESSION['id_catalog'] = trim($_POST['Cod_L']);
				} else {
					redirect('./accesso.php');
				}
				
				$error = array();
				
				$Proprieta = (isset($_POST['proprieta'])) ? $_POST['proprieta'] : '';
				if(empty($Proprieta)) {
					$error[] = urlencode('&Egrave obbligatorio scegliere la PROPRIET&Agrave; della nuova catalogazione.');
				}
				$_SESSION['proprieta_u'] = $Proprieta;
						
				$Num_Inv = (isset($_POST['num_inv'])) ? trim($_POST['num_inv']) : '';
				$Num_Inv = replace($Num_Inv);
				if(empty($Num_Inv)) {
					$error[] = urlencode('&Egrave obbligatorio inserire il NUMERO INVENTARIO.');				
				} else if (!preg_match('|^[0-9()]+$|', $Num_Inv)) {
					$error[] = urlencode('Hai inserito un NUMERO INVENTARIO non corretto.');
				}
				$_SESSION['num_inv_u'] = $Num_Inv;
				
				$Cod_Dew = (isset($_POST['dewey'])) ? strtoupper(trim($_POST['dewey'])) : '';
				$Cod_Dew = replace($Cod_Dew);
				if(empty($Cod_Dew)) {
					$error[] = urlencode('&Egrave obbligatorio inserire il CODICE DEWEY.');				
				} else if (!preg_match('|^[A-Z0-9\. ]+$|', $Cod_Dew)) {
					$error[] = urlencode('Hai inserito un CODICE DEWEY non corretto.');
				}
				$_SESSION['dewey_u'] = $Cod_Dew;
			
				$Titolo = (isset($_POST['titolo'])) ? trim($_POST['titolo']) : '';
				$Titolo = replace($Titolo);
				if(empty($Titolo)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un TITOLO.');				
				} else if (!preg_match('|^[!\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Titolo)) {
					$error[] = urlencode('Hai inserito un TITOLO non corretto.');
				}
				$_SESSION['titolo_u'] = $Titolo;			
	
				$Autore = (isset($_POST['autore'])) ? ucwords(trim($_POST['autore'])) : '';
				$Autore = replace($Autore);
				if(empty($Autore)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un AUTORE.');				
				} else if(!preg_match('|^[\-\.\&\'\"0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,() ]+$|', $Autore)) {
					$error[] = urlencode('Hai inserito un AUTORE non corretto.');
				}
				$_SESSION['autore_u'] = $Autore;
				
				$Genere = (isset($_POST['genere'])) ? trim($_POST['genere']) : '';
				$Genere = replace($Genere);
				if(empty($Genere)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un GENERE.');				
				} else if(!preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$|', $Genere)) {
					$error[] = urlencode('Hai inserito un GENERE non corretto.');
				}
				$_SESSION['genere_u'] = $Genere;
	
				$Editore = (isset($_POST['editore'])) ? trim($_POST['editore']) : '';
				$Editore = replace($Editore);
				if(empty($Editore)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un EDITORE.');				
				} else if(!preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$|', $Editore)) {
					$error[] = urlencode('Hai inserito un EDITORE non corretto.');
				}
				$_SESSION['editore_u'] = $Editore;
				
				$Edizione = (isset($_POST['edizione'])) ? ucwords(trim($_POST['edizione'])) : '';
				$Edizione = replace($Edizione);
				if(empty($Edizione)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire la EDIZIONE.');				
				} else if(!preg_match('|^[A-Za-z ]+[A-Za-z]+[ ]{1}[-]{1}[ ]{1}[0-9]{4}$|', $Edizione)) {
					$error[] = urlencode('Hai inserito una EDIZIONE non corretta.');
				}
				$_SESSION['edizione_u'] = $Edizione;

				$Collana = (isset($_POST['collana'])) ? trim($_POST['collana']) : '';
				$Collana = replace($Collana);
				if(!empty($Collana) && !preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$|', $Collana)) {
					$error[] = urlencode('Hai inserito una COLLANA non corretta.');
				}
				$_SESSION['collana_u'] = $Collana;
				
				$Scaffale = (isset($_POST['scaffale'])) ? strtoupper(trim($_POST['scaffale'])) : '';
				$Scaffale = replace($Scaffale);
				if(empty($Scaffale)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire lo SCAFFALE.');				
				} else if(!preg_match('|^[0-9A-Z ]+$|', $Scaffale)) {
					$error[] = urlencode('Hai inserito uno SCAFFALE non corretto.');
				}
				$_SESSION['scaffale_u'] = $Scaffale;
				
				$Formato = (isset($_POST['formato'])) ? trim($_POST['formato']) : '';
				$Formato = replace($Formato);
				if(empty($Formato)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire il FORMATO.');				
				} else if(!preg_match('|^[0-9A-Za-z, \+]+$|', $Formato)) {
					$error[] = urlencode('Hai inserito un FORMATO non corretto.');
				}
				$_SESSION['formato_u'] = $Formato;

				$Note_Formato = (isset($_POST['note_formato'])) ? trim($_POST['note_formato']) : '';
				$Note_Formato = replace($Note_Formato);
				if(!empty($Note_Formato) && !preg_match('|^[\+\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$|', $Note_Formato)) {
					$error[] = urlencode('Hai inserito un valore per NOTE FORMATO non corretto.');
				}
				$_SESSION['note_formato_u'] = $Note_Formato;

				$Pagine = (isset($_POST['pagine'])) ? trim($_POST['pagine']) : '';
				$Pagine = replace($Pagine);
				if(empty($Pagine)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire il NUMERO DI PAGINE.');				
				} else if(!preg_match('|^[0-9]+$|', $Pagine)) {
					$error[] = urlencode('Hai inserito un NUMERO DI PAGINE non corretto.');
				}
				$_SESSION['pagine_u'] = $Pagine;
				
				$Data_c = (isset($_POST['data_c'])) ? trim($_POST['data_c']) : '';
				$Data_c = replace($Data_c);
				if(empty($Data_c)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire la DATA CATALOGAZIONE.');				
				} else if(!preg_match('|^[0-9]{4}-[0-9]{2}-[0-9]{2}$|', $Data_c)) {
					$error[] = urlencode('Hai inserito una DATA CATALOGAZIONE non corretta.');
				}
				$_SESSION['data_c_u'] = $Data_c;
				
				$Novita = (isset($_POST['novita'])) ? $_POST['novita'] : '';
				if(empty($Novita)) {
					$error[] = urlencode('&Egrave obbligatorio scegliere il campo NOVIT&Agrave;.');
				}
				$_SESSION['novita_u'] = $Novita;
				
				$Costo = (isset($_POST['costo'])) ? trim($_POST['costo']) : '';
				$Costo = replace(str_replace(",",".",$Costo));
				if(empty($Costo)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire il COSTO.');				
				} else if(!preg_match('|^[0-9\.]+$|', $Costo)) {
					$error[] = urlencode('Hai inserito un COSTO non corretto.');
				}
				$_SESSION['costo_u'] = $Costo;
				
				$Proven = (isset($_POST['provenienza'])) ? trim($_POST['provenienza']) : '';
				$Proven = replace($Proven);
				if (!empty($Proven) && !preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Proven)) {
					$error[] = urlencode('Hai inserito una PROVENIENZA non corretto.');
				}
				$_SESSION['provenienza_u'] = $Proven;
				
				$Lingua_o = (isset($_POST['lingua_o'])) ? $_POST['lingua_o'] : '';
				if(empty($Lingua_o)) {
					$error[] = urlencode('&Egrave obbligatorio scegliere la LINGUA ORIGINALE.');
				}
				$_SESSION['lingua_o_u'] = $Lingua_o;
				
				$Titolo_o = (isset($_POST['titolo_o'])) ? trim($_POST['titolo_o']) : '';
				$Titolo_o = replace($Titolo_o);
				if(!empty($Titolo_o) && !preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Titolo_o)) {
					$error[] = urlencode('Hai inserito un TITOLO ORIGINALE non corretto.');
				}
				$_SESSION['titolo_o_u'] = $Titolo_o;
				
				$Traduttore = (isset($_POST['traduttore'])) ? ucwords(trim($_POST['traduttore'])) : '';
				$Traduttore = replace($Traduttore);
				if(!empty($Traduttore) && !preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Traduttore)) {
					$error[] = urlencode('Hai inserito un TRADUTTORE non corretto.');
				}
				$_SESSION['traduttore_u'] = $Traduttore;
				
				$Testo_f = (isset($_POST['testo_f'])) ? $_POST['testo_f'] : '';
				if(empty($Testo_f)) {
					$error[] = urlencode('&Egrave obbligatorio scegliere il TESTO A FRONTE.');
				}
				$_SESSION['testo_f_u'] = $Testo_f;

				$Lingua = (isset($_POST['lingua'])) ? trim($_POST['lingua']) : '';
				$Lingua = replace($Lingua);
				if(!empty($Lingua) && !preg_match('|^[a-zA-Z, ]+$|', $Lingua)) {
					$error[] = urlencode('Hai inserito una LINGUA non corretta.');
				}
				$_SESSION['lingua_u'] = $Lingua;

				$Nazione = (isset($_POST['nazione'])) ? ucwords(trim($_POST['nazione'])) : '';
				$Nazione = replace($Nazione);
				if(empty($Nazione)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire la NAZIONE.');				
				} else if(!preg_match('|^[A-Za-z\. ()]+$|', $Nazione)) {
					$error[] = urlencode('Hai inserito una NAZIONE non corretta.');
				}
				$_SESSION['nazione_u'] = $Nazione;
							
				$Note = (isset($_POST['note'])) ? trim($_POST['note']) : '';
				$Note = replace($Note);
			/*	if(!empty($Note) && !preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$|', $Note)) {
					$error[] = urlencode('Hai inserito una NOTA non corretta.');
				}*/
				$_SESSION['note_u'] = $Note;
								
				$Alienato = (isset($_POST['alienato'])) ? $_POST['alienato'] : '';
				if(empty($Alienato)) {
					$error[] = urlencode('&Egrave obbligatorio scegliere il campo ALIENATO.');
				}
				$_SESSION['alienato_u'] = $Alienato;
				$_SESSION['access_level_s'] == 3 ? '' : $Alienato = "N";
				$Visibile = (isset($_POST['visibile'])) ? $_POST['visibile'] : '';
				if(empty($Visibile)) {
					$error[] = urlencode('&Egrave obbligatorio scegliere il campo VISIBILE.');
				}
				$_SESSION['visibile_u'] = $Visibile;
				
				if(isset($error) && !empty($error)) {				
					redirect('./modifica_catalog.php?errori='.join($error, urlencode('<br />')));
				} else {				
					$query = 'UPDATE IGNORE catalogazioni SET
						sigla_inv = "'.mysql_real_escape_string($Proprieta,$db).'",
						num_inv = "'.mysql_real_escape_string($Num_Inv,$db).'",
						codice = "'.mysql_real_escape_string($Cod_Dew,$db).'",
						titolo = "'.mysql_real_escape_string($Titolo,$db).'",
						autore = "'.mysql_real_escape_string($Autore,$db).'",
						genere = "'.mysql_real_escape_string($Genere,$db).'",
						editore = "'.mysql_real_escape_string($Editore,$db).'",
						edizione = "'.mysql_real_escape_string($Edizione,$db).'",
						collana = "'.mysql_real_escape_string($Collana,$db).'",
						scaffale = "'.mysql_real_escape_string($Scaffale,$db).'",
						formato = "'.mysql_real_escape_string($Formato,$db).'",
						note_formato = "'.mysql_real_escape_string($Note_Formato,$db).'",
						pagine = '.mysql_real_escape_string($Pagine,$db).',
						data_catalog = "'.mysql_real_escape_string($Data_c,$db).'",
						novita = "'.mysql_real_escape_string($Novita,$db).'",
						costo = '.mysql_real_escape_string($Costo,$db).',
						provenienza = "'.mysql_real_escape_string($Proven,$db).'",
						lingua_orig = "'.mysql_real_escape_string($Lingua_o,$db).'", 
						titolo_orig = "'.mysql_real_escape_string($Titolo_o,$db).'",
						traduttore = "'.mysql_real_escape_string($Traduttore,$db).'",
						testo_fronte = "'.mysql_real_escape_string($Testo_f,$db).'",
						lingua = "'.mysql_real_escape_string($Lingua,$db).'",
						nazione = "'.mysql_real_escape_string($Nazione,$db).'",
						note = "'.mysql_real_escape_string($Note,$db).'",
						alienato = "'.mysql_real_escape_string($Alienato,$db).'",
						visibile = "'.mysql_real_escape_string($Visibile,$db).'",
						data_modifica = "'.mysql_real_escape_string($data_modif,$db).'", 
						id_sog_modifica = '.mysql_real_escape_string($_SESSION['user_id_s'],$db).'
						WHERE id_catalog = '.mysql_real_escape_string($Cod_Catalog,$db);					
					mysql_query($query, $db) or die(mysql_error($db));
	
					$query = 'SELECT autore
						FROM autori
						WHERE autore = "'.$Autore.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));						
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO autori (id_autore, autore)
						VALUES (NULL, "'.mysql_real_escape_string($Autore,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					
					$query = 'SELECT collana
						FROM collane
						WHERE collana = "'.$Collana.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));						
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO collane (id_collana, collana)
						VALUES (NULL, "'.mysql_real_escape_string($Collana,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
									
					$query = 'SELECT editore
						FROM editori
						WHERE editore = "'.$Editore.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));						
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO editori (id_editore, editore)
						VALUES (NULL, "'.mysql_real_escape_string($Editore,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					
					$query = 'SELECT formato
						FROM formati
						WHERE formato = "'.$Formato.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));					
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO formati (id_formato, formato)
						VALUES (NULL, "'.mysql_real_escape_string($Formato,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					
					$query = 'SELECT genere
						FROM generi
						WHERE genere = "'.$Genere.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));						
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO generi (id_genere, genere)
						VALUES (NULL, "'.mysql_real_escape_string($Genere,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					
					$query = 'SELECT nazione
						FROM nazioni
						WHERE nazione = "'.$Nazione.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));						
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO nazioni (id_nazione, nazione)
						VALUES (NULL, "'.mysql_real_escape_string($Nazione,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					
					$query = 'SELECT scaffale
						FROM scaffali
						WHERE scaffale = "'.$Scaffale.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));						
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO scaffali (id_scaffale, scaffale)
						VALUES (NULL, "'.mysql_real_escape_string($Scaffale,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					mysql_close($db);
					$successo = urlencode("AGGIORNAMENTO CATALOGAZIONE AVVENUTO CORRETTAMENTE");
					redirect('./scheda_catalog.php?CodCatalog='.$Cod_Catalog.'&p=1&tr=&successo='.$successo);			
				}									
			break;
				
			case 'nuovo_utente':
					
				$error = array();
				
				$Num_Tes = (isset($_POST['num_tes'])) ? trim($_POST['num_tes']) : '';
				if(empty($Num_Tes)) {
					$error[] = urlencode('&Egrave obbligatorio inserire il NUMERO TESSERA.');
				} else if (!preg_match('|^[0-9]+$|', $Num_Tes)) {
					$error[] = urlencode('Hai inserito un NUMERO TESSERA non corretto.');
				}
				$_SESSION['num_tes_n'] = $Num_Tes;
						
				$Data_Isc = (isset($_POST['data_isc'])) ? trim($_POST['data_isc']) : '';
				$Data_Isc = replace($Data_Isc);
				if(empty($Data_Isc)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire la DATA DI ISCRIZIONE.');				
				} else if(!preg_match('|^[0-9]{4}-[0-9]{2}-[0-9]{2}$|', $Data_Isc)) {
					$error[] = urlencode('Hai inserito una DATA DI ISCRIZIONE non corretta.');
				}
				$_SESSION['data_isc_n'] = $Data_Isc;
			
				$Nome = (isset($_POST['nome'])) ? ucwords(trim($_POST['nome'])) : '';
				$Nome = replace($Nome);
				if(empty($Nome)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un NOME.');				
				} else if (!preg_match('|^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Nome)) {
					$error[] = urlencode('Hai inserito un NOME non corretto.');
				}
				$_SESSION['nome_n'] = $Nome;			
	
				$Cognome = (isset($_POST['cognome'])) ? ucwords(trim($_POST['cognome'])) : '';
				$Cognome = replace($Cognome);
				if(empty($Cognome)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un COGNOME.');				
				} else if(!preg_match('|^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Cognome)) {
					$error[] = urlencode('Hai inserito un COGNOME non corretto.');
				}
				$_SESSION['cognome_n'] = $Cognome;
				
				$Sesso = (isset($_POST['sesso'])) ? trim($_POST['sesso']) : '';
				if(empty($Sesso)) {
					$error[] = urlencode('&Egrave obbligatorio selezionare il SESSO.');
				}
				$_SESSION['sesso_n'] = $Sesso;
	
				$Data_Nas = (isset($_POST['data_nas'])) ? trim($_POST['data_nas']) : '';
				$Data_Nas = replace($Data_Nas);
				if(empty($Data_Nas)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire la DATA DI NASCITA.');				
				} else if(!preg_match('|^[0-9]{4}-[0-9]{2}-[0-9]{2}$|', $Data_Nas)) {
					$error[] = urlencode('Hai inserito una DATA DI NASCITA non corretta.');
				}
				$_SESSION['data_nas_n'] = $Data_Nas;
							
				$Professione = (isset($_POST['professione'])) ? ucfirst(trim($_POST['professione'])) : '';
				$Professione = replace($Professione);
				if(empty($Professione)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire una PROFESSIONE.');				
				} else if(!preg_match('|^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Professione)) {
					$error[] = urlencode('Hai inserito una PROFESSIONE non corretta.');
				}
				$_SESSION['professione_n'] = $Professione;
				
				$Indirizzo = (isset($_POST['indirizzo'])) ? ucwords(trim($_POST['indirizzo'])) : '';
				$Indirizzo = replace($Indirizzo);
				if(empty($Indirizzo)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un INDIRIZZO.');				
				} else if(!preg_match('|^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Indirizzo)) {
					$error[] = urlencode('Hai inserito un INDIRIZZO non corretto.');
				}
				$_SESSION['indirizzo_n'] = $Indirizzo;

				$Num_Civico = (isset($_POST['num_civ'])) ? strtoupper(trim($_POST['num_civ'])) : '';
				$Num_Civico = replace($Num_Civico);
				if(empty($Num_Civico)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un NUMERO CIVICO.');				
				} else if(!preg_match('|^[0-9a-zA-Z/ ]+$|', $Num_Civico)) {
					$error[] = urlencode('Hai inserito un NUMERO CIVICO non corretto.');
				}
				$_SESSION['num_civ_n'] = $Num_Civico;
								
				$Localita = (isset($_POST['localita'])) ? strtoupper(trim($_POST['localita'])) : '';
				$Localita = replace($Localita);
				if(empty($Localita)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire una LOCALIT&Agrave;.');				
				} else if(!preg_match('|^[\.\',0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Localita)) {
					$error[] = urlencode('Hai inserito una LOCALIT&Agrave; non corretta.');
				}
				$_SESSION['localita_n'] = $Localita;
				
				$Provincia = (isset($_POST['provincia'])) ? strtoupper(trim($_POST['provincia'])) : '';
				$Provincia = replace($Provincia);
				if(empty($Provincia)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire una PROVINCIA.');				
				} else if(!preg_match('|^[A-Za-z]{2}$|', $Provincia)) {
					$error[] = urlencode('Hai inserito una PROVINCIA non corretta.');
				}
				$_SESSION['provincia_n'] = $Provincia;
								
				$CAP = (isset($_POST['cap'])) ? trim($_POST['cap']) : '';
				$CAP = replace($CAP);
				if(empty($CAP)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un C.A.P..');				
				} else if(!preg_match('|^[0-9]{5}$|', $CAP)) {
					$error[] = urlencode('Hai inserito un C.A.P non corretto.');
				}
				$_SESSION['cap_n'] = $CAP;
			
				$Tel_Casa = (isset($_POST['tel_casa'])) ? trim($_POST['tel_casa']) : '';
				$Tel_Casa = replace($Tel_Casa);
				if(!empty($Tel_Casa) && !preg_match('|^[0-9]{5,12}$|', $Tel_Casa)) {
					$error[] = urlencode('Hai inserito un TELEFONO DI CASA non corretto.');
				}
				$_SESSION['tel_casa_n'] = $Tel_Casa;
				
				$Tel_Cell = (isset($_POST['tel_cell'])) ? trim($_POST['tel_cell']) : '';
				$Tel_Cell = replace($Tel_Cell);
				if(!empty($Tel_Cell) && !preg_match('|^[0-9]{8,10}$|', $Tel_Cell)) {
					$error[] = urlencode('Hai inserito un TELEFONO CELLULARE non corretto.');
				}
				$_SESSION['tel_cell_n'] = $Tel_Cell;
				
				$Email = (isset($_POST['email'])) ? strtolower(trim($_POST['email'])) : '';
				$Email = replace($Email);
				if(!empty($Email) && !preg_match('|^[a-z0-9\._%-]+@{1,1}[a-z0-9\._%-]+[\.]{1,1}[a-z]{2,6}$|', $Email)) {
					$error[] = urlencode('Hai inserito una E&minus;MAIL non corretta.');
				}
				$_SESSION['email_n'] = $Email;

				$Internet = (isset($_POST['internet'])) ? trim($_POST['internet']) : '';
				if(empty($Internet)) {
					$error[] = urlencode('&Egrave obbligatorio selezionare il campo INTERNET.');
				}
				$_SESSION['internet_n'] = $Internet;
				
				$Privacy = (isset($_POST['privacy'])) ? trim($_POST['privacy']) : '';
				if(empty($Privacy)) {
					$error[] = urlencode('&Egrave obbligatorio selezionare il campo PRIVACY.');
				}
				$_SESSION['privacy_n'] = $Privacy;
				
				$Tipo_Documento = (isset($_POST['tipo_documento'])) ? trim($_POST['tipo_documento']) : '';
				if(!empty($Tipo_Documento) && !preg_match('|^[0-9]+$|', $Tipo_Documento)) {
					$error[] = urlencode('Hai inserito un TIPO DI DOCUMENTO non corretto.');
				}
				$_SESSION['tip_doc_n'] = $Tipo_Documento;

				$Num_Documento = (isset($_POST['num_documento'])) ? strtoupper(trim($_POST['num_documento'])) : '';
				$Num_Documento = replace($Num_Documento);
				if(!empty($Num_Documento) && !preg_match('|^[0-9a-zA-Z ]+$|', $Num_Documento)) {
					$error[] = urlencode('Hai inserito un NUMERO DOCUMENTO non corretto.');
				} else if(!empty($Num_Documento) && $Tipo_Documento == 0) {					
					$error[] = urlencode('Devi scegliere anche il TIPO DI DOCUMENTO.');
				} else if(empty($Num_Documento) && $Tipo_Documento != 0) {
					$error[] = urlencode('Devi inserire un NUMERO DOCUMENTO.');					
				}
				$_SESSION['num_doc_n'] = $Num_Documento;
								
				$Note_i = (isset($_POST['note_i'])) ? trim($_POST['note_i']) : '';
				$Note_i = replace($Note_i);
				$_SESSION['note_i_n'] = $Note_i;
								
				$Tutore = (isset($_POST['tutore'])) ? trim($_POST['tutore']) : '';
				if(empty($Tutore)) {
					$error[] = urlencode('&Egrave obbligatorio selezionare il campo TUTORE.');
				}
				$_SESSION['tutore_n'] = $Tutore;
				//Controllo i campi del tutore solo se effettivamente esiste un tutore
				if(!empty($Tutore) && $Tutore == "Y") {
					$Nome_t = (isset($_POST['nome_t'])) ? ucwords(trim($_POST['nome_t'])) : '';
					$Nome_t = replace($Nome_t);
					if(empty($Nome_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire un NOME.');				
					} else if (!preg_match('|^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Nome_t)) {
						$error[] = urlencode('Hai inserito un NOME non corretto.');
					}
					$_SESSION['nome_t_n'] = $Nome_t;			
		
					$Cognome_t = (isset($_POST['cognome_t'])) ? ucwords(trim($_POST['cognome_t'])) : '';
					$Cognome_t = replace($Cognome_t);
					if(empty($Cognome_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire un COGNOME.');				
					} else if(!preg_match('|^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Cognome_t)) {
						$error[] = urlencode('Hai inserito un COGNOME non corretto.');
					}
					$_SESSION['cognome_t_n'] = $Cognome_t;
					
					$Sesso_t = (isset($_POST['sesso_t'])) ? trim($_POST['sesso_t']) : '';
					if(empty($Sesso_t)) {
						$error[] = urlencode('&Egrave obbligatorio selezionare il SESSO.');
					}
					$_SESSION['sesso_t_n'] = $Sesso_t;
					
					$Indirizzo_t = (isset($_POST['indirizzo_t'])) ? ucwords(trim($_POST['indirizzo_t'])) : '';
					$Indirizzo_t = replace($Indirizzo_t);
					if(empty($Indirizzo_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire un INDIRIZZO.');				
					} else if(!preg_match('|^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Indirizzo_t)) {
						$error[] = urlencode('Hai inserito un INDIRIZZO non corretto.');
					}
					$_SESSION['indirizzo_t_n'] = $Indirizzo_t;
	
					$Num_Civico_t = (isset($_POST['num_civ_t'])) ? strtoupper(trim($_POST['num_civ_t'])) : '';
					$Num_Civico_t = replace($Num_Civico_t);
					if(empty($Num_Civico_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire un NUMERO CIVICO.');				
					} else if(!preg_match('|^[0-9a-zA-Z/ ]+$|', $Num_Civico_t)) {
						$error[] = urlencode('Hai inserito un NUMERO CIVICO non corretto.');
					}
					$_SESSION['num_civ_t_n'] = $Num_Civico_t;
									
					$Localita_t = (isset($_POST['localita_t'])) ? strtoupper(trim($_POST['localita_t'])) : '';
					$Localita_t = replace($Localita_t);
					if(empty($Localita_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire una LOCALIT&Agrave;.');				
					} else if(!preg_match('|^[\.\',0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Localita_t)) {
						$error[] = urlencode('Hai inserito una LOCALIT&Agrave; non corretta.');
					}
					$_SESSION['localita_t_n'] = $Localita_t;
					
					$Provincia_t = (isset($_POST['provincia_t'])) ? strtoupper(trim($_POST['provincia_t'])) : '';
					$Provincia_t = replace($Provincia_t);
					if(empty($Provincia_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire una PROVINCIA.');				
					} else if(!preg_match('|^[A-Za-z]{2}$|', $Provincia_t)) {
						$error[] = urlencode('Hai inserito una PROVINCIA non corretta.');
					}
					$_SESSION['provincia_t_n'] = $Provincia_t;
									
					$CAP_t = (isset($_POST['cap_t'])) ? trim($_POST['cap_t']) : '';
					$CAP_t = replace($CAP_t);
					if(empty($CAP_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire un C.A.P..');				
					} else if(!preg_match('|^[0-9]{5}$|', $CAP_t)) {
						$error[] = urlencode('Hai inserito un C.A.P non corretto.');
					}
					$_SESSION['cap_t_n'] = $CAP_t;
				
					$Tel_Casa_t = (isset($_POST['tel_casa_t'])) ? trim($_POST['tel_casa_t']) : '';
					$Tel_Casa_t = replace($Tel_Casa_t);
					if(!empty($Tel_Casa_t) && !preg_match('|^[0-9]{5,12}$|', $Tel_Casa_t)) {
						$error[] = urlencode('Hai inserito un TELEFONO DI CASA non corretto.');
					}
					$_SESSION['tel_casa_t_n'] = $Tel_Casa_t;
					
					$Tel_Cell_t = (isset($_POST['tel_cell_t'])) ? trim($_POST['tel_cell_t']) : '';
					$Tel_Cell_t = replace($Tel_Cell_t);
					if(!empty($Tel_Cell_t) && !preg_match('|^[0-9]{8,10}$|', $Tel_Cell_t)) {
						$error[] = urlencode('Hai inserito un TELEFONO CELLULARE non corretto.');
					}
					$_SESSION['tel_cell_t_n'] = $Tel_Cell_t;
					
					$Email_t = (isset($_POST['email_t'])) ? strtolower(trim($_POST['email_t'])) : '';
					$Email_t = replace($Email_t);
					if(!empty($Email_t) && !preg_match('|^[a-z0-9\._%-]+@{1,1}[a-z0-9\._%-]+[\.]{1,1}[a-z]{2,6}$|', $Email_t)) {
						$error[] = urlencode('Hai inserito una E&minus;MAIL non corretta.');
					}
					$_SESSION['email_t_n'] = $Email_t;
					
					$Tipo_Documento_t = (isset($_POST['tipo_documento_t'])) ? trim($_POST['tipo_documento_t']) : '';
					if(empty($Tipo_Documento_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire il TIPO DI DOCUMENTO.');				
					} else if(!preg_match('|^[0-9]+$|', $Tipo_Documento_t)) {
						$error[] = urlencode('Hai inserito un TIPO DI DOCUMENTO non corretto.');
					}
					$_SESSION['tip_doc_t_n'] = $Tipo_Documento_t;
	
					$Num_Documento_t = (isset($_POST['num_documento_t'])) ? strtoupper(trim($_POST['num_documento_t'])) : '';
					$Num_Documento_t = replace($Num_Documento_t);
					if(empty($Num_Documento_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire il NUMERO DI DOCUMENTO.');				
					} else if(!preg_match('|^[0-9a-zA-Z ]+$|', $Num_Documento_t)) {
						$error[] = urlencode('Hai inserito un NUMERO DOCUMENTO non corretto.');
					}
					$_SESSION['num_doc_t_n'] = $Num_Documento_t;				
				}
				
				if(isset($error) && !empty($error)) {					
					redirect('./nuovo_utente.php?errori='.join($error, urlencode('<br />')));				
				} else {				
									
					$query = 'INSERT IGNORE INTO iscritti (id_iscritto, num_tessera, data_iscrizione, nome, cognome, sesso, data_nascita, professione, indirizzo, num_civico, localita, cap, provincia, tel_casa, tel_cell, email, internet, privacy, tipo_documento, num_documento, note, tutore, data_modifica, id_sog_modifica)
						VALUES (NULL, '.mysql_real_escape_string($Num_Tes,$db).', "'.mysql_real_escape_string($Data_Isc." ".date('H:i:s'),$db).'", "'.mysql_real_escape_string($Nome,$db).'", "'.mysql_real_escape_string($Cognome,$db).'", "'.mysql_real_escape_string($Sesso,$db).'", "'.mysql_real_escape_string($Data_Nas,$db).'", "'.mysql_real_escape_string($Professione,$db).'", "'.mysql_real_escape_string($Indirizzo,$db).'", "'.mysql_real_escape_string($Num_Civico,$db).'", "'.mysql_real_escape_string($Localita,$db).'", "'.mysql_real_escape_string($CAP,$db).'", "'.mysql_real_escape_string($Provincia,$db).'", "'.mysql_real_escape_string($Tel_Casa,$db).'", "'.mysql_real_escape_string($Tel_Cell,$db).'", "'.mysql_real_escape_string($Email,$db).'", "'.mysql_real_escape_string($Internet,$db).'", "'.mysql_real_escape_string($Privacy,$db).'", '.mysql_real_escape_string($Tipo_Documento,$db).', "'.mysql_real_escape_string($Num_Documento,$db).'", "'.mysql_real_escape_string($Note,$db).'", "'.mysql_real_escape_string($Tutore,$db).'", "'.mysql_real_escape_string($data_modif,$db).'", '.mysql_real_escape_string($_SESSION['user_id_s'],$db).')';										
					mysql_query($query, $db) or die(mysql_error($db));
					$Cod_Isc = mysql_insert_id($db);
					
					//Inserisco i dati nella tabella tutore solo se effettivamente esiste un tutore
					if(!empty($Tutore) && $Tutore == "Y") {
						$query = 'INSERT IGNORE INTO tutore (id_tutore, id_iscritto, tipo_documento, num_documento, nome, cognome, sesso, indirizzo, num_civico, localita, cap, provincia, tel_casa, tel_cell, email, data_modifica, id_sog_modifica)
							VALUES (NULL, '.mysql_real_escape_string($Cod_Isc,$db).', '.mysql_real_escape_string($Tipo_Documento_t,$db).', "'.mysql_real_escape_string($Num_Documento_t,$db).'", "'.mysql_real_escape_string($Nome_t,$db).'", "'.mysql_real_escape_string($Cognome_t,$db).'", "'.mysql_real_escape_string($Sesso_t,$db).'", "'.mysql_real_escape_string($Indirizzo_t,$db).'", "'.mysql_real_escape_string($Num_Civico_t,$db).'", "'.mysql_real_escape_string($Localita_t,$db).'", "'.mysql_real_escape_string($CAP_t,$db).'", "'.mysql_real_escape_string($Provincia_t,$db).'", "'.mysql_real_escape_string($Tel_Casa_t,$db).'", "'.mysql_real_escape_string($Tel_Cell_t,$db).'", "'.mysql_real_escape_string($Email_t,$db).'", "'.mysql_real_escape_string($data_modif,$db).'", '.mysql_real_escape_string($_SESSION['user_id_s'],$db).')';										
						mysql_query($query, $db) or die(mysql_error($db));
					}	
					
					$query = 'SELECT professione
						FROM professioni
						WHERE professione = "'.$Professione.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO professioni (id_professione, professione)
						VALUES (NULL, "'.mysql_real_escape_string($Professione,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					
					$query = 'SELECT localita
						FROM localita
						WHERE localita = "'.$Localita.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO localita (id_localita, localita, cap, provincia)
						VALUES (NULL, "'.mysql_real_escape_string($Localita,$db).'", "'.mysql_real_escape_string($CAP,$db).'", "'.mysql_real_escape_string($Provincia,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					
					$query = 'SELECT indirizzo
						FROM indirizzi
						WHERE indirizzo = "'.$Indirizzo.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO indirizzi (id_indirizzo, indirizzo)
						VALUES (NULL, "'.mysql_real_escape_string($Indirizzo,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					mysql_close($db);
					
					//Svuoto le variabili di sessione per evitare che cliccando su nuovo inserimento nel menu compaiano i dati
					unset($_SESSION['num_tes_n']);
					unset($_SESSION['data_isc_n']);
					unset($_SESSION['nome_n']);
					unset($_SESSION['cognome_n']);
					unset($_SESSION['sesso_n']);
					unset($_SESSION['data_nas_n']);
					unset($_SESSION['professione_n']);
					unset($_SESSION['indirizzo_n']);
					unset($_SESSION['localita_n']);
					unset($_SESSION['num_civ_n']);
					unset($_SESSION['provincia_n']);
					unset($_SESSION['cap_n']);
					unset($_SESSION['tel_casa_n']);
					unset($_SESSION['tel_cell_n']);
					unset($_SESSION['email_n']);
					unset($_SESSION['sospeso_n']);
					unset($_SESSION['internet_n']);
					unset($_SESSION['privacy_n']);
					unset($_SESSION['socio_n']);
					unset($_SESSION['tutore_n']);
					unset($_SESSION['note_i_n']);
					unset($_SESSION['tip_doc_n']);
					unset($_SESSION['num_doc_n']);
					//Sessioni tutore
					unset($_SESSION['nome_t_n']);
					unset($_SESSION['cognome_t_n']);
					unset($_SESSION['sesso_t_n']);
					unset($_SESSION['indirizzo_t_n']);
					unset($_SESSION['localita_t_n']);
					unset($_SESSION['num_civ_t_n']);
					unset($_SESSION['provincia_t_n']);
					unset($_SESSION['cap_t_n']);
					unset($_SESSION['tel_casa_t_n']);
					unset($_SESSION['tel_cell_t_n']);
					unset($_SESSION['email_t_n']);
					unset($_SESSION['tip_doc_t_n']);
					unset($_SESSION['num_doc_t_n']);
					$successo = urlencode("INSERIMENTO NUOVO UTENTE AVVENUTO CORRETTAMENTE");
			//		redirect('./modifica_utente.php?cod_u='.$Cod_Isc.'&successo='.$successo);
					redirect('./scheda_utente_stampa.php?CodUtente='.$Cod_Isc.'&successo='.$successo);							
				}			
			break;
	
			case 'modifica_utente':
					
				if(isset($_POST['Cod_U']) && ctype_digit($_POST['Cod_U'])) {
					$Cod_Utente = trim($_POST['Cod_U']);
					$_SESSION['id_iscritto_u'] = trim($_POST['Cod_U']);
				} else {
					redirect('./accesso.php');
				}
					
				$error = array();
				
				$Num_Tes = (isset($_POST['num_tes'])) ? trim($_POST['num_tes']) : '';
				$_SESSION['num_tes_u'] = $Num_Tes;
						
				$Data_Isc = (isset($_POST['data_isc'])) ? trim($_POST['data_isc']) : '';
				$Data_Isc = replace($Data_Isc);
				if(empty($Data_Isc)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire la DATA DI ISCRIZIONE.');				
				} else if(!preg_match('|^[0-9]{4}-[0-9]{2}-[0-9]{2}$|', $Data_Isc)) {
					$error[] = urlencode('Hai inserito una DATA DI ISCRIZIONE non corretta.');
				}
				$_SESSION['data_isc_u'] = $Data_Isc;
	
				$Ora_Isc = (isset($_POST['ora_isc'])) ? trim($_POST['ora_isc']) : '';
				$Ora_Isc = replace($Ora_Isc);
				$_SESSION['ora_isc_u'] = $Ora_Isc;
			
				$Nome = (isset($_POST['nome'])) ? ucwords(trim($_POST['nome'])) : '';
				$Nome = replace($Nome);
				if(empty($Nome)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un NOME.');				
				} else if (!preg_match('|^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Nome)) {
					$error[] = urlencode('Hai inserito un NOME non corretto.');
				}
				$_SESSION['nome_u'] = $Nome;			
	
				$Cognome = (isset($_POST['cognome'])) ? ucwords(trim($_POST['cognome'])) : '';
				$Cognome = replace($Cognome);
				if(empty($Cognome)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un COGNOME.');				
				} else if(!preg_match('|^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Cognome)) {
					$error[] = urlencode('Hai inserito un COGNOME non corretto.');
				}
				$_SESSION['cognome_u'] = $Cognome;
				
				$Sesso = (isset($_POST['sesso'])) ? trim($_POST['sesso']) : '';
				if(empty($Sesso)) {
					$error[] = urlencode('&Egrave obbligatorio selezionare il SESSO.');
				}
				$_SESSION['sesso_u'] = $Sesso;
	
				$Data_Nas = (isset($_POST['data_nas'])) ? trim($_POST['data_nas']) : '';
				$Data_Nas = replace($Data_Nas);
				if(empty($Data_Nas)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire la DATA DI NASCITA.');				
				} else if(!preg_match('|^[0-9]{4}-[0-9]{2}-[0-9]{2}$|', $Data_Nas)) {
					$error[] = urlencode('Hai inserito una DATA DI NASCITA non corretta.');
				}
				$_SESSION['data_nas_u'] = $Data_Nas;
							
				$Professione = (isset($_POST['professione'])) ? ucfirst(trim($_POST['professione'])) : '';
				$Professione = replace($Professione);
				if(empty($Professione)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire una PROFESSIONE.');				
				} else if(!preg_match('|^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Professione)) {
					$error[] = urlencode('Hai inserito una PROFESSIONE non corretta.');
				}
				$_SESSION['professione_u'] = $Professione;
				
				$Indirizzo = (isset($_POST['indirizzo'])) ? ucwords(trim($_POST['indirizzo'])) : '';
				$Indirizzo = replace($Indirizzo);
				if(empty($Indirizzo)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un INDIRIZZO.');				
				} else if(!preg_match('|^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Indirizzo)) {
					$error[] = urlencode('Hai inserito un INDIRIZZO non corretto.');
				}
				$_SESSION['indirizzo_u'] = $Indirizzo;

				$Num_Civico = (isset($_POST['num_civ'])) ? strtoupper(trim($_POST['num_civ'])) : '';
				$Num_Civico = replace($Num_Civico);
				if(empty($Num_Civico)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un NUMERO CIVICO.');				
				} else if(!preg_match('|^[0-9a-zA-Z/ ]+$|', $Num_Civico)) {
					$error[] = urlencode('Hai inserito un NUMERO CIVICO non corretto.');
				}
				$_SESSION['num_civ_u'] = $Num_Civico;
												
				$Localita = (isset($_POST['localita'])) ? strtoupper(trim($_POST['localita'])) : '';
				$Localita = replace($Localita);
				if(empty($Localita)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire una LOCALIT&Agrave;.');				
				} else if(!preg_match('|^[\.\',0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Localita)) {
					$error[] = urlencode('Hai inserito una LOCALIT&Agrave; non corretta.');
				}
				$_SESSION['localita_u'] = $Localita;
				
				$Provincia = (isset($_POST['provincia'])) ? strtoupper(trim($_POST['provincia'])) : '';
				$Provincia = replace($Provincia);
				if(empty($Provincia)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire una PROVINCIA.');				
				} else if(!preg_match('|^[a-zA-Z]{2}$|', $Provincia)) {
					$error[] = urlencode('Hai inserito una PROVINCIA non corretta.');
				}
				$_SESSION['provincia_u'] = $Provincia;
								
				$CAP = (isset($_POST['cap'])) ? trim($_POST['cap']) : '';
				$CAP = replace($CAP);
				if(empty($CAP)) {
					$error[] = urlencode('&Egrave; obbligatorio inserire un C.A.P..');				
				} else if(!preg_match('|^[0-9]{5}$|', $CAP)) {
					$error[] = urlencode('Hai inserito un C.A.P non corretto.');
				}
				$_SESSION['cap_u'] = $CAP;
				
				$Tel_Casa = (isset($_POST['tel_casa'])) ? trim($_POST['tel_casa']) : '';
				$Tel_Casa = replace($Tel_Casa);
				if(!empty($Tel_Casa) && !preg_match('|^[0-9]{5,12}$|', $Tel_Casa)) {
					$error[] = urlencode('Hai inserito un TELEFONO DI CASA non corretto.');
				}
				$_SESSION['tel_casa_u'] = $Tel_Casa;
				
				$Tel_Cell = (isset($_POST['tel_cell'])) ? trim($_POST['tel_cell']) : '';
				$Tel_Cell = replace($Tel_Cell);
				if(!empty($Tel_Cell) && !preg_match('|^[0-9]{8,10}$|', $Tel_Cell)) {
					$error[] = urlencode('Hai inserito un TELEFONO CELLULARE non corretto.');
				}
				$_SESSION['tel_cell_u'] = $Tel_Cell;
				
				$Email = (isset($_POST['email'])) ? strtolower(trim($_POST['email'])) : '';
				$Email = replace($Email);
				if(!empty($Email) && !preg_match('|^[a-z0-9\._%-]+@{1,1}[a-z0-9\._%-]+[\.]{1,1}[a-z]{2,6}$|', $Email)) {
					$error[] = urlencode('Hai inserito una E&minus;MAIL non corretta.');
				}
				$_SESSION['email_u'] = $Email;

				$Internet = (isset($_POST['internet'])) ? trim($_POST['internet']) : '';
				if(empty($Internet)) {
					$error[] = urlencode('&Egrave obbligatorio selezionare il campo INTERNET.');
				}
				$_SESSION['internet_u'] = $Internet;
				
				$Privacy = (isset($_POST['privacy'])) ? trim($_POST['privacy']) : '';
				if(empty($Privacy)) {
					$error[] = urlencode('&Egrave obbligatorio selezionare il campo PRIVACY.');
				}
				$_SESSION['privacy_u'] = $Privacy;
				
			/*	$Socio = (isset($_POST['socio'])) ? trim($_POST['socio']) : '';
				if(empty($Socio)) {
					$error[] = urlencode('&Egrave obbligatorio selezionare il campo SOCIO.');
				}
				$_SESSION['socio_u'] = $Socio;  */
				
				$Tipo_Documento = (isset($_POST['tipo_documento'])) ? trim($_POST['tipo_documento']) : '';
				if(!empty($Tipo_Documento) && !preg_match('|^[0-9]+$|', $Tipo_Documento)) {
					$error[] = urlencode('Hai inserito un TIPO DI DOCUMENTO non corretto.');
				}
				$_SESSION['tip_doc_u'] = $Tipo_Documento;

				$Num_Documento = (isset($_POST['num_documento'])) ? strtoupper(trim($_POST['num_documento'])) : '';
				$Num_Documento = replace($Num_Documento);
				if(!empty($Num_Documento) && !preg_match('|^[0-9a-zA-Z ]+$|', $Num_Documento)) {
					$error[] = urlencode('Hai inserito un NUMERO DOCUMENTO non corretto.');
				} else if(!empty($Num_Documento) && $Tipo_Documento == 0) {					
					$error[] = urlencode('Devi scegliere anche il TIPO DI DOCUMENTO.');
				} else if(empty($Num_Documento) && $Tipo_Documento != 0) {
					$error[] = urlencode('Devi inserire un NUMERO DOCUMENTO.');					
				}
				$_SESSION['num_doc_u'] = $Num_Documento;
							
				$Note_i = (isset($_POST['note_i'])) ? trim($_POST['note_i']) : '';
				$Note_i = replace($Note_i);
				$_SESSION['note_i_u'] = $Note_i;
				
				$Tutore = (isset($_POST['tutore'])) ? trim($_POST['tutore']) : '';
				if(empty($Tutore)) {
					$error[] = urlencode('&Egrave obbligatorio selezionare il campo TUTORE.');
				}
				$_SESSION['tutore_u'] = $Tutore;
				//Controllo i campi del tutore solo se effettivamente esiste un tutore
				if(!empty($Tutore) && $Tutore == "Y") {
					$Nome_t = (isset($_POST['nome_t'])) ? ucwords(trim($_POST['nome_t'])) : '';
					$Nome_t = replace($Nome_t);
					if(empty($Nome_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire un NOME.');				
					} else if (!preg_match('|^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Nome_t)) {
						$error[] = urlencode('Hai inserito un NOME non corretto.');
					}
					$_SESSION['nome_t_u'] = $Nome_t;			
		
					$Cognome_t = (isset($_POST['cognome_t'])) ? ucwords(trim($_POST['cognome_t'])) : '';
					$Cognome_t = replace($Cognome_t);
					if(empty($Cognome_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire un COGNOME.');				
					} else if(!preg_match('|^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Cognome_t)) {
						$error[] = urlencode('Hai inserito un COGNOME non corretto.');
					}
					$_SESSION['cognome_t_u'] = $Cognome_t;
					
					$Sesso_t = (isset($_POST['sesso_t'])) ? trim($_POST['sesso_t']) : '';
					if(empty($Sesso_t)) {
						$error[] = urlencode('&Egrave obbligatorio selezionare il SESSO.');
					}
					$_SESSION['sesso_t_u'] = $Sesso_t;
					
					$Indirizzo_t = (isset($_POST['indirizzo_t'])) ? ucwords(trim($_POST['indirizzo_t'])) : '';
					$Indirizzo_t = replace($Indirizzo_t);
					if(empty($Indirizzo_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire un INDIRIZZO.');				
					} else if(!preg_match('|^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Indirizzo_t)) {
						$error[] = urlencode('Hai inserito un INDIRIZZO non corretto.');
					}
					$_SESSION['indirizzo_t_u'] = $Indirizzo_t;
	
					$Num_Civico_t = (isset($_POST['num_civ_t'])) ? strtoupper(trim($_POST['num_civ_t'])) : '';
					$Num_Civico_t = replace($Num_Civico_t);
					if(empty($Num_Civico_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire un NUMERO CIVICO.');				
					} else if(!preg_match('|^[0-9a-zA-Z/ ]+$|', $Num_Civico_t)) {
						$error[] = urlencode('Hai inserito un NUMERO CIVICO non corretto.');
					}
					$_SESSION['num_civ_t_u'] = $Num_Civico_t;
									
					$Localita_t = (isset($_POST['localita_t'])) ? strtoupper(trim($_POST['localita_t'])) : '';
					$Localita_t = replace($Localita_t);
					if(empty($Localita_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire una LOCALIT&Agrave;.');				
					} else if(!preg_match('|^[\.\',0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $Localita_t)) {
						$error[] = urlencode('Hai inserito una LOCALIT&Agrave; non corretta.');
					}
					$_SESSION['localita_t_u'] = $Localita_t;
					
					$Provincia_t = (isset($_POST['provincia_t'])) ? strtoupper(trim($_POST['provincia_t'])) : '';
					$Provincia_t = replace($Provincia_t);
					if(empty($Provincia_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire una PROVINCIA.');				
					} else if(!preg_match('|^[A-Za-z]{2}$|', $Provincia_t)) {
						$error[] = urlencode('Hai inserito una PROVINCIA non corretta.');
					}
					$_SESSION['provincia_t_u'] = $Provincia_t;
									
					$CAP_t = (isset($_POST['cap_t'])) ? trim($_POST['cap_t']) : '';
					$CAP_t = replace($CAP_t);
					if(empty($CAP_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire un C.A.P..');				
					} else if(!preg_match('|^[0-9]{5}$|', $CAP_t)) {
						$error[] = urlencode('Hai inserito un C.A.P non corretto.');
					}
					$_SESSION['cap_t_u'] = $CAP_t;
				
					$Tel_Casa_t = (isset($_POST['tel_casa_t'])) ? trim($_POST['tel_casa_t']) : '';
					$Tel_Casa_t = replace($Tel_Casa_t);
					if(!empty($Tel_Casa_t) && !preg_match('|^[0-9]{5,12}$|', $Tel_Casa_t)) {
						$error[] = urlencode('Hai inserito un TELEFONO DI CASA non corretto.');
					}
					$_SESSION['tel_casa_t_u'] = $Tel_Casa_t;
					
					$Tel_Cell_t = (isset($_POST['tel_cell_t'])) ? trim($_POST['tel_cell_t']) : '';
					$Tel_Cell_t = replace($Tel_Cell_t);
					if(!empty($Tel_Cell_t) && !preg_match('|^[0-9]{8,10}$|', $Tel_Cell_t)) {
						$error[] = urlencode('Hai inserito un TELEFONO CELLULARE non corretto.');
					}
					$_SESSION['tel_cell_t_u'] = $Tel_Cell_t;
					
					$Email_t = (isset($_POST['email_t'])) ? strtolower(trim($_POST['email_t'])) : '';
					$Email_t = replace($Email_t);
					if(!empty($Email_t) && !preg_match('|^[a-z0-9\._%-]+@{1,1}[a-z0-9\._%-]+[\.]{1,1}[a-z]{2,6}$|', $Email_t)) {
						$error[] = urlencode('Hai inserito una E&minus;MAIL non corretta.');
					}
					$_SESSION['email_t_u'] = $Email_t;
					
					$Tipo_Documento_t = (isset($_POST['tipo_documento_t'])) ? trim($_POST['tipo_documento_t']) : '';
					if(empty($Tipo_Documento_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire il TIPO DI DOCUMENTO.');				
					} else if(!preg_match('|^[0-9]+$|', $Tipo_Documento_t)) {
						$error[] = urlencode('Hai inserito un TIPO DI DOCUMENTO non corretto.');
					}
					$_SESSION['tip_doc_t_u'] = $Tipo_Documento_t;
	
					$Num_Documento_t = (isset($_POST['num_documento_t'])) ? strtoupper(trim($_POST['num_documento_t'])) : '';
					$Num_Documento_t = replace($Num_Documento_t);
					if(empty($Num_Documento_t)) {
						$error[] = urlencode('&Egrave; obbligatorio inserire il NUMERO DI DOCUMENTO.');				
					} else if(!preg_match('|^[0-9a-zA-Z ]+$|', $Num_Documento_t)) {
						$error[] = urlencode('Hai inserito un NUMERO DOCUMENTO non corretto.');
					}
					$_SESSION['num_doc_t_u'] = $Num_Documento_t;
				}
				
				$Deceduto = (isset($_POST['deceduto'])) ? $_POST['deceduto'] : '';
				$_SESSION['deceduto_u'] = $Deceduto;
				$_SESSION['access_level_s'] == 3 ? '' : $Deceduto = "N";
											
				if(isset($error) && !empty($error)) {
					redirect('./modifica_utente.php?errori='.join($error, urlencode('<br />')));
				} else {
					//Elimino sessioni
					unset($_SESSION['tip_doc_u']);
					unset($_SESSION['num_doc_u']);
					
					$query = 'UPDATE IGNORE iscritti SET
						data_iscrizione = "'.mysql_real_escape_string($Data_Isc." ".$Ora_Isc,$db).'",
						nome = "'.mysql_real_escape_string($Nome,$db).'",
						cognome = "'.mysql_real_escape_string($Cognome,$db).'",
						sesso = "'.mysql_real_escape_string($Sesso,$db).'",
						data_nascita = "'.mysql_real_escape_string($Data_Nas,$db).'",
						professione = "'.mysql_real_escape_string($Professione,$db).'",
						indirizzo = "'.mysql_real_escape_string($Indirizzo,$db).'",
						num_civico = "'.mysql_real_escape_string($Num_Civico,$db).'",
						localita = "'.mysql_real_escape_string($Localita,$db).'",
						cap = "'.mysql_real_escape_string($CAP,$db).'",
						provincia = "'.mysql_real_escape_string($Provincia,$db).'",
						tel_casa = "'.mysql_real_escape_string($Tel_Casa,$db).'",
						tel_cell = "'.mysql_real_escape_string($Tel_Cell,$db).'",
						email = "'.mysql_real_escape_string($Email,$db).'",
						internet = "'.mysql_real_escape_string($Internet,$db).'",
						privacy = "'.mysql_real_escape_string($Privacy,$db).'",
						tipo_documento = '.mysql_real_escape_string($Tipo_Documento,$db).',
						num_documento = "'.mysql_real_escape_string($Num_Documento,$db).'",
						note = "'.mysql_real_escape_string($Note_i,$db).'",
						tutore = "'.mysql_real_escape_string($Tutore,$db).'",
						deceduto = "'.mysql_real_escape_string($Deceduto,$db).'",
						data_modifica = "'.mysql_real_escape_string($data_modif,$db).'", 
						id_sog_modifica = '.mysql_real_escape_string($_SESSION['user_id_s'],$db).'   
						WHERE id_iscritto = '.mysql_real_escape_string($Cod_Utente,$db).';';
											
					mysql_query($query, $db) or die(mysql_error($db));
					
					//Inserisco i dati nella tabella tutore solo se effettivamente esiste un tutore
					if(!empty($Tutore) && $Tutore == "Y") {
						//Controllo se l'utente ha già un tutore
						$query_control = 'SELECT id_tutore
										FROM tutore
										WHERE id_iscritto = '.$Cod_Utente.';';
						$result_control = mysql_query($query_control, $db) or die(mysql_error($db));
						//Se ha già il tutore eseguo l'UPDATE
						if(mysql_num_rows($result_control) == 1) {				
							$query = 'UPDATE IGNORE tutore SET
								tipo_documento = '.mysql_real_escape_string($Tipo_Documento_t,$db).',
								num_documento = "'.mysql_real_escape_string($Num_Documento_t,$db).'",
								nome = "'.mysql_real_escape_string($Nome_t,$db).'",
								cognome = "'.mysql_real_escape_string($Cognome_t,$db).'",
								sesso = "'.mysql_real_escape_string($Sesso_t,$db).'",
								indirizzo = "'.mysql_real_escape_string($Indirizzo_t,$db).'",
								num_civico = "'.mysql_real_escape_string($Num_Civico_t,$db).'",
								localita = "'.mysql_real_escape_string($Localita_t,$db).'",
								cap = "'.mysql_real_escape_string($CAP_t,$db).'",
								provincia = "'.mysql_real_escape_string($Provincia_t,$db).'",
								tel_casa = "'.mysql_real_escape_string($Tel_Casa_t,$db).'",
								tel_cell = "'.mysql_real_escape_string($Tel_Cell_t,$db).'",
								email = "'.mysql_real_escape_string($Email_t,$db).'",
								data_modifica = "'.mysql_real_escape_string($data_modif,$db).'", 
								id_sog_modifica = '.mysql_real_escape_string($_SESSION['user_id_s'],$db).'   
								WHERE id_iscritto = '.mysql_real_escape_string($Cod_Utente,$db).';';											
							mysql_query($query, $db) or die(mysql_error($db));
						} else {
							//Se non ha il tutore eseguo l'INSERT
							$query = 'INSERT IGNORE INTO tutore (id_tutore, id_iscritto, tipo_documento, num_documento, nome, cognome, sesso, indirizzo, num_civico, localita, cap, provincia, tel_casa, tel_cell, email, data_modifica, id_sog_modifica)
								VALUES (NULL, '.mysql_real_escape_string($Cod_Utente,$db).', '.mysql_real_escape_string($Tipo_Documento_t,$db).', "'.mysql_real_escape_string($Num_Documento_t,$db).'", "'.mysql_real_escape_string($Nome_t,$db).'", "'.mysql_real_escape_string($Cognome_t,$db).'", "'.mysql_real_escape_string($Sesso_t,$db).'", "'.mysql_real_escape_string($Indirizzo_t,$db).'", "'.mysql_real_escape_string($Num_Civico_t,$db).'", "'.mysql_real_escape_string($Localita_t,$db).'", "'.mysql_real_escape_string($CAP_t,$db).'", "'.mysql_real_escape_string($Provincia_t,$db).'", "'.mysql_real_escape_string($Tel_Casa_t,$db).'", "'.mysql_real_escape_string($Tel_Cell_t,$db).'", "'.mysql_real_escape_string($Email_t,$db).'", "'.mysql_real_escape_string($data_modif,$db).'", '.mysql_real_escape_string($_SESSION['user_id_s'],$db).')';										
							mysql_query($query, $db) or die(mysql_error($db));
						}
					}
					
					$query = 'SELECT professione
						FROM professioni
						WHERE professione = "'.$Professione.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO professioni (id_professione, professione)
						VALUES (NULL, "'.mysql_real_escape_string($Professione,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					
					$query = 'SELECT localita
						FROM localita
						WHERE localita = "'.$Localita.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO localita (id_localita, localita, cap, provincia)
						VALUES (NULL, "'.mysql_real_escape_string($Localita,$db).'", "'.mysql_real_escape_string($CAP,$db).'", '.mysql_real_escape_string($Provincia,$db).');';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					
					$query = 'SELECT indirizzo
						FROM indirizzi
						WHERE indirizzo = "'.$Indirizzo.'";';
					$result = mysql_query($query, $db) or die(mysql_error($db));
					$num_row = mysql_num_rows($result);
					if($num_row == 0) {
						$query2 = 'INSERT IGNORE INTO indirizzi (id_indirizzo, indirizzo)
						VALUES (NULL, "'.mysql_real_escape_string($Indirizzo,$db).'");';
						mysql_query($query2, $db) or die(mysql_error($db));
					}
					mysql_free_result($result);
					mysql_close($db);
					//Svuoto le variabili di sessione per evitare che cliccando su nuovo inserimento nel menu compaiano i dati
					unset($_SESSION['num_tes_u']);
					unset($_SESSION['data_isc_u']);
					unset($_SESSION['nome_u']);
					unset($_SESSION['cognome_u']);
					unset($_SESSION['sesso_u']);
					unset($_SESSION['data_nas_u']);
					unset($_SESSION['professione_u']);
					unset($_SESSION['indirizzo_u']);
					unset($_SESSION['localita_u']);
					unset($_SESSION['num_civ_u']);
					unset($_SESSION['provincia_u']);
					unset($_SESSION['cap_u']);
					unset($_SESSION['tel_casa_u']);
					unset($_SESSION['tel_cell_u']);
					unset($_SESSION['email_u']);
					unset($_SESSION['sospeso_u']);
					unset($_SESSION['internet_u']);
					unset($_SESSION['privacy_u']);
					unset($_SESSION['socio_u']);
					unset($_SESSION['tutore_u']);
					unset($_SESSION['note_i_u']);
					unset($_SESSION['tip_doc_u']);
					unset($_SESSION['num_doc_u']);
					//Svuoto variabili di sessioni del tutore
					unset($_SESSION['nome_t_u']);
					unset($_SESSION['cognome_t_u']);
					unset($_SESSION['sesso_t_u']);
					unset($_SESSION['indirizzo_t_u']);
					unset($_SESSION['localita_t_u']);
					unset($_SESSION['num_civ_t_u']);
					unset($_SESSION['provincia_t_u']);
					unset($_SESSION['cap_t_u']);
					unset($_SESSION['tel_casa_t_u']);
					unset($_SESSION['tel_cell_t_u']);
					unset($_SESSION['email_t_u']);
					unset($_SESSION['tip_doc_t_u']);
					unset($_SESSION['num_doc_t_u']);
					$successo = urlencode("AGGIORNAMENTO UTENTE AVVENUTO CORRETTAMENTE");
				//	redirect('./modifica_utente.php?successo='.$successo);			
					redirect('./scheda_utente_stampa.php?CodUtente='.$Cod_Utente.'&successo='.$successo);							
				}								
			break;
				
			case 'nuovo_prestito':
					
				$error = array();
				
				$Proprieta_p = (isset($_POST['proprieta_p'])) ? $_POST['proprieta_p'] : '';
				if(empty($Proprieta_p)) {
                                    $error[] = urlencode('&Egrave obbligatorio scegliere la PROPRIET&Agrave; della nuova catalogazione.');
				}
				$_SESSION['proprieta_p_s'] = $Proprieta_p;
						
				$Num_Inv_p = (isset($_POST['num_inv_p'])) ? trim($_POST['num_inv_p']) : '';
				$Num_Inv_p = replace($Num_Inv_p);
				if(empty($Num_Inv_p)) {
                                    $error[] = urlencode('&Egrave obbligatorio inserire il NUMERO INVENTARIO.');				
				} else if (!preg_match('|^[0-9()]+$|', $Num_Inv_p)) {
                                    $error[] = urlencode('Hai inserito un NUMERO INVENTARIO non corretto.');
				}
				$_SESSION['num_inv_p_s'] = $Num_Inv_p;
				
				$Num_Tes_p = (isset($_POST['num_tes_p'])) ? trim($_POST['num_tes_p']) : '';
				if(empty($Num_Tes_p)) {
                                    $error[] = urlencode('&Egrave obbligatorio inserire il NUMERO TESSERA.');
				} else if (!preg_match('|^[0-9]+$|', $Num_Tes_p)) {
                                    $error[] = urlencode('Hai inserito un NUMERO TESSERA non corretto.');
				}
				$_SESSION['num_tes_p_s'] = $Num_Tes_p;
						
				$Data_Pres_p = (isset($_POST['data_pres_p'])) ? trim($_POST['data_pres_p']) : '';
				$Data_Pres_p = replace($Data_Pres_p);
				if(empty($Data_Pres_p)) {
                                    $error[] = urlencode('&Egrave; obbligatorio inserire la DATA PRESTITO.');				
				} else if(!preg_match('|^[0-9]{4}-[0-9]{2}-[0-9]{2}$|', $Data_Pres_p)) {
                                    $error[] = urlencode('Hai inserito una DATA PRESTITO non corretta.');
				}
				$_SESSION['data_pres_p_s'] = $Data_Pres_p;
				
				if(!empty($error)) {
                                    if($_SESSION['num_tes_p_s'] !== "" && $_SESSION['proprieta_p_s'] !== "" && $_SESSION['num_inv_p_s'] !== "") {
                                        $url = './nuovo_prestito.php?numtes='.$_SESSION['num_tes_p_s'].'&prop='.$_SESSION['proprieta_p_s'].'&numinv='.$_SESSION['num_inv_p_s'].'&errori='.join($error, urlencode('<br />'));					
                                    } else if($_SESSION['num_tes_p_s'] !== "") {
                                        $url = './nuovo_prestito.php?numtes='.$_SESSION['num_tes_p_s'].'&errori='.join($error, urlencode('<br />'));
                                    } else if($_SESSION['proprieta_p_s'] !== "" && $_SESSION['num_inv_p_s'] !== "") {
                                        $url = './nuovo_prestito.php?prop='.$_SESSION['proprieta_p_s'].'&numinv='.$_SESSION['num_inv_p_s'].'&errori='.join($error, urlencode('<br />'));
                                    } else {
                                        $url = './nuovo_prestito.php?&errori='.join($error, urlencode('<br />'));
                                    }
                                    redirect($url);
                                    exit();
				} else {
                                    $error_2 = array();
                                    $sql_1 = 'SELECT id_catalog, codice
                                            FROM catalogazioni
                                            WHERE sigla_inv = "'.$Proprieta_p.'" && num_inv = '.$Num_Inv_p.';';
                                    $result_1 = mysql_query($sql_1, $db) or die(mysql_error($db));
                                    $row_1 = mysql_fetch_assoc($result_1);
					
                                    $sql_4 = 'SELECT resa
                                            FROM prestiti
                                            WHERE id_catalog = '.$row_1['id_catalog'].' && resa = "N";';
                                    $result_4 = mysql_query($sql_4, $db) or die(mysql_error($db));
                                    $presente = mysql_num_rows($result_4);
                                    if($presente > 0) {
                                        $error_2[] = urlencode("Questa catalogazione &egrave; gi&agrave; in prestito.");
                                    }
					
                                    $sql_2 = 'SELECT id_iscritto, nome, sospeso
                                            FROM iscritti
                                            WHERE num_tessera = '.$Num_Tes_p.';';
                                    $result_2 = mysql_query($sql_2, $db) or die(mysql_error($db));
                                    $row_2 = mysql_fetch_assoc($result_2);				
                                    if($row_2['sospeso'] == "Y") {
                                        $error_2[] = urlencode("L'utente &egrave; sospeso per cui non &egrave; possibile effettuare il prestito.");
                                    }
					
                                    if($row_2['nome'] != "Scuola Elementare" && $row_2['nome'] != "Scuola Materna") {
                                        $sql_3 = 'SELECT resa
                                                FROM prestiti
                                                WHERE id_iscritto = '.$row_2['id_iscritto'].' && resa = "N";';
                                        $result_3 = mysql_query($sql_3, $db) or die(mysql_error($db));
                                        $num_prestiti = mysql_num_rows($result_3);
                                        if($num_prestiti > 2) {
                                            $error_2[] = urlencode("L'utente ha gi&agrave; 3 prestiti per cui non &egrave; possibile effettuare un ulteriore prestito.");
                                        }
                                    }
					
                                    if(!empty($error_2)) {					
                                        redirect('./nuovo_prestito.php?numtes='.$_SESSION['num_tes_p_s'].'&prop='.$_SESSION['proprieta_p_s'].'&numinv='.$_SESSION['num_inv_p_s'].'&avvisi='.join($error_2, urlencode('<br />')));			
                                        exit();                         
                                    } else {					
                                        $Data_Pres_v_p = explode('-',$Data_Pres_p);
                                        $Ora = date('H:i:s');
                                        $Ora = explode(":",$Ora);
                                        $Data_Pres_u_p = mktime($Ora[0],$Ora[1],$Ora[2],$Data_Pres_v_p[1],$Data_Pres_v_p[2],$Data_Pres_v_p[0]);
                                        $Data_Pres_p = date('Y-m-d H:i:s',$Data_Pres_u_p);
                                        $ini_cod = substr($row_1['codice'],0,1);
                                        if($ini_cod == "C" || $ini_cod == "D" || $ini_cod == "V") {
                                            $Data_Res_u_p = mktime($Ora[0],$Ora[1],$Ora[2],$Data_Pres_v_p[1],$Data_Pres_v_p[2]+7,$Data_Pres_v_p[0]);				
                                        } else {
                                            $Data_Res_u_p = mktime($Ora[0],$Ora[1],$Ora[2],$Data_Pres_v_p[1],$Data_Pres_v_p[2]+30,$Data_Pres_v_p[0]);				
                                        }
                                        $Data_Res_p = date('Y-m-d H:i:s',$Data_Res_u_p);
					
                                        $query = 'INSERT IGNORE INTO prestiti (id_prestito, id_catalog, id_iscritto, data_pres, data_res, resa, data_modifica, id_sog_modifica)
                                                VALUES (NULL, '.mysql_real_escape_string($row_1['id_catalog'],$db).', '.mysql_real_escape_string($row_2['id_iscritto'],$db).', "'.mysql_real_escape_string($Data_Pres_p,$db).'", "'.mysql_real_escape_string($Data_Res_p,$db).'", "N", "'.mysql_real_escape_string($data_modif,$db).'", '.mysql_real_escape_string($_SESSION['user_id_s'],$db).');';

                                        mysql_query($query, $db) or die(mysql_error($db));				
                                        mysql_close($db);
                                        $successo = urlencode("INSERIMENTO PRESTITO AVVENUTO CORRETTAMENTE.");

                                        //Svuoto le variabili di sessione per evitare che cliccando su nuovo inserimento nel menu compaiano i dati
                                        unset($_SESSION['proprieta_p_s']);
                                        unset($_SESSION['num_inv_p_s']);
                                        unset($_SESSION['num_tes_p_s']);
                                        unset($_SESSION['data_pres_p_s']);
						
                                        $data_pres_invia = explode(" ",$Data_Pres_p);
                                        redirect('./nuovo_prestito.php?numtes='.$Num_Tes_p.'&datapres='.$data_pres_invia[0].'&successo='.$successo);
                                        exit();
                                    }
				}			
			break;
			
			case "sospendi":
				if(isset($_GET['Cod'])) {
					$id_utente = trim($_GET['Cod']);
				} else {
					redirect('./gestione.php');
				}
				$query = 'INSERT IGNORE INTO sospesi (id_sospeso, id_iscritto, data_sosp, data_modifica, id_sog_modifica)
						VALUES (NULL, '.mysql_real_escape_string($id_utente,$db).', "'.date('Y-m-d').'", "'.mysql_real_escape_string($data_modif,$db).'", '.mysql_real_escape_string($_SESSION['user_id_s'],$db).');';
											
				mysql_query($query, $db) or die(mysql_error($db));
				$query = 'UPDATE IGNORE iscritti SET
						sospeso = "Y"
						WHERE id_iscritto = '.$id_utente.';';
											
				mysql_query($query, $db) or die(mysql_error($db));			
				mysql_close($db);
				$successo = urlencode("SOSPENSIONE UTENTE AVVENUTA CORRETTAMENTE.");
				redirect('./scheda_utente.php?successo='.$successo.'&CodUtente='.$id_utente);							
				
			break;
			
			case "riammetti":
				if(isset($_GET['Cod'])) {
					$id_utente = trim($_GET['Cod']);
				} else {
					redirect('./gestione.php');
				}
				$query = 'UPDATE IGNORE sospesi SET
						data_riammis = "'.date('Y-m-d').'",
						data_modifica = "'.mysql_real_escape_string($data_modif,$db).'", 
						id_sog_modifica = '.mysql_real_escape_string($_SESSION['user_id_s'],$db).'
						WHERE id_iscritto = '.$id_utente.';';
											
				mysql_query($query, $db) or die(mysql_error($db));
				$query = 'UPDATE IGNORE iscritti SET
						sospeso = "N"
						WHERE id_iscritto = '.$id_utente.';';
											
				mysql_query($query, $db) or die(mysql_error($db));			
				mysql_close($db);
				$successo = urlencode("RIAMMISSIONE UTENTE AVVENUTA CORRETTAMENTE.");
				redirect('./scheda_utente.php?successo='.$successo.'&CodUtente='.$id_utente);
				
			break;
			
			case "socio":
				if(isset($_GET['id_iscritto']) && $_GET['anno_socio']) {
					$id_utente = trim($_GET['id_iscritto']);
                                        $Anno_s = trim($_GET['anno_socio']);
				} else {
					redirect('./gestione.php');
                                        exit();
				}
                                $query = 'SELECT id_socio
                                          FROM soci 
                                          WHERE id_iscritto = '.$id_utente.' && anno= "'.$Anno_s.'";';
                                $result = mysql_query($query, $db) or die(mysql_error($db));
                                if(mysql_num_rows($result) > 0) {
                                   mysql_close($db);
                                   $errore = urlencode("L'ISCRITTO &Egrave; GIi&Agrave; SOCIO PER L'ANNO SELEZIONATO: ".$Anno_s.".");
                                   echo $errore;
                                   exit(); 
                                } else {                      
                                    $query = 'INSERT IGNORE INTO soci (id_socio, id_iscritto, anno, data_modifica, id_sog_modifica)
                                                    VALUES (NULL, '.mysql_real_escape_string($id_utente,$db).', "'.$Anno_s.'", "'.mysql_real_escape_string($data_modif,$db).'", '.mysql_real_escape_string($_SESSION['user_id_s'],$db).');';
                                    mysql_query($query, $db) or die(mysql_error($db));
                                    mysql_close($db);
                                    $successo = urlencode("INSERIMENTO SOCIO AVVENUTO CORRETTAMENTE.");
                                    echo $successo;
                                    exit();
                                }			
			break;
                        
                        case "eli_socio":
				if(isset($_GET['cod_iscritto']) && $_GET['anno_socio']) {
					$id_utente = trim($_GET['cod_iscritto']);
                                        $Anno_s = trim($_GET['anno_socio']);
				} else {
					redirect('./gestione.php');
                                        exit();
				}
                                $query = 'DELETE
                                          FROM soci 
                                          WHERE id_iscritto ='.$id_utente.' && anno="'.$Anno_s.'";';
                                mysql_query($query, $db) or die(mysql_error($db));
                                mysql_close($db);
                                $successo = urlencode("Eliminazione socio per l'anno ".$Anno_s." avvenuta correttamente.");
                                redirect('./scheda_utente.php?CodUtente='.$id_utente.'&p=1&tr=&successo='.$successo);
                                exit();
			break;
			
			case "rinnova":
                            if(isset($_GET['CodCatalog']) && isset($_GET['CodUtente']) && isset($_GET['CodPrestito']) && isset($_GET['ini_cod'])) {
                                $id_utente = trim($_GET['CodUtente']);
                                $id_catalog = trim($_GET['CodCatalog']);
                                $id_prestito = trim($_GET['CodPrestito']);
                                $ini_codice = trim($_GET['ini_cod']);
                            } else {
                                redirect('./gestione.php');
                            }
				
                            $query2 = 'SELECT novita
                                    FROM catalogazioni
                                    WHERE id_catalog = '.$id_catalog.';';
                            $result2 = mysql_query($query2, $db) or die(mysql_error($db));
                            $row2 = mysql_fetch_assoc($result2);
                            extract($row2);
                            if($novita == "Y") {
                                $error = urlencode("QUESTO PRESTITO NON PU&Ograve; ESSERE RINNOVATO PERCH&Egrave; SI TRATTA DI UNA NOVIT&Agrave;.");
                                redirect('./scheda_utente.php?errori='.$error.'&CodUtente='.$id_utente);
                            } else {	
                                mysql_free_result($result2);

                                $query2 = 'SELECT data_pres, data_res
                                        FROM prestiti
                                        WHERE id_prestito = '.$id_prestito.' && id_catalog = '.$id_catalog.' && id_iscritto = '.$id_utente.';';
                                $result2 = mysql_query($query2, $db) or die(mysql_error($db));
                                $row2 = mysql_fetch_assoc($result2);
                                extract($row2);
                                $data_pres_v = explode(' ',$data_pres);
                                $data_pres_u_v = explode('-',$data_pres_v[0]);
                                $data_pres_u = mktime(0,0,0,$data_pres_u_v[1],$data_pres_u_v[2],$data_pres_u_v[0]);
                                $data_res_v = explode(' ',$data_res);
                                $data_res_u_v = explode('-',$data_res_v[0]);			
                                $data_res_u = mktime(0,0,0,$data_res_u_v[1],$data_res_u_v[2],$data_res_u_v[0]);
                                $controllo = ($data_res_u-$data_pres_u)/(60*60*24);
					
                                if($ini_codice == "C" || $ini_codice == "D" || $ini_codice == "V") {
                                    if($controllo > 9) {
                                        $error = urlencode("QUESTO PRESTITO NON PU&Ograve; PI&Ugrave; ESSERE RINNOVATO.");
                                        redirect('./scheda_utente.php?errori='.$error.'&CodUtente='.$id_utente);		
                                    } else {
                                        $Ora = explode(":",$data_pres_v[1]);
                                        $Data_Res_u_p = mktime($Ora[0],$Ora[1],$Ora[2],$data_res_u_v[1],$data_res_u_v[2]+7,$data_res_u_v[0]);				
                                        $Data_Res_p = date('Y-m-d H:i:s',$Data_Res_u_p);
                                        $query = 'UPDATE IGNORE prestiti SET
                                                data_res = "'.$Data_Res_p.'",
                                                data_modifica = "'.mysql_real_escape_string($data_modif,$db).'",
                                                id_sog_modifica = '.mysql_real_escape_string($_SESSION['user_id_s'],$db).'
                                                WHERE id_prestito = '.$id_prestito.' && id_catalog = '.$id_catalog.' && id_iscritto = '.$id_utente.';';										
                                        mysql_query($query, $db) or die(mysql_error($db));		
                                        mysql_close($db);
                                        $successo = urlencode("IL RINNOVO DI QUESTO PRESTITO &Egrave; AVVENUTO CORRETTAMENTE.");
                                        redirect('./scheda_utente.php?successo='.urlencode($successo).'&CodUtente='.$id_utente);						
                                    }
                                } else {
                                    if($controllo > 35) {
                                        $error = urlencode("QUESTO PRESTITO NON PU&Ograve; PI&Ugrave; ESSERE RINNOVATO.");
                                        redirect('./scheda_utente.php?errori='.$error.'&CodUtente='.$id_utente);		
                                    } else {
                                        $Ora = explode(":",$data_pres_v[1]);
                                        $Data_Res_u_p = mktime($Ora[0],$Ora[1],$Ora[2],$data_res_u_v[1],$data_res_u_v[2]+30,$data_res_u_v[0]);				
                                        $Data_Res_p = date('Y-m-d H:i:s',$Data_Res_u_p);
                                        $query = 'UPDATE IGNORE prestiti SET
                                                data_res = "'.$Data_Res_p.'",
                                                data_modifica = "'.mysql_real_escape_string($data_modif,$db).'",
                                                id_sog_modifica = '.mysql_real_escape_string($_SESSION['user_id_s'],$db).'
                                                WHERE id_prestito = '.$id_prestito.' && id_catalog = '.$id_catalog.' && id_iscritto = '.$id_utente.';';										
                                        mysql_query($query, $db) or die(mysql_error($db));		
                                        mysql_close($db);
                                        $successo = urlencode("IL RINNOVO DI QUESTO PRESTITO &Egrave; AVVENUTO CORRETTAMENTE.");
                                        redirect('./scheda_utente.php?successo='.urlencode($successo).'&CodUtente='.$id_utente);						
                                    }	
                                }
                            }
			break;
	
			case "restituisce":
				if(isset($_GET['CodCatalog']) && isset($_GET['CodUtente']) && isset($_GET['CodPrestito'])) {
					$id_utente = trim($_GET['CodUtente']);
					$id_catalog = trim($_GET['CodCatalog']);
					$id_prestito = trim($_GET['CodPrestito']);
				} else {
					redirect('./gestione.php');
				}
				
				$query = 'UPDATE IGNORE prestiti SET
						resa = "Y",
						data_modifica = "'.mysql_real_escape_string($data_modif,$db).'",
						id_sog_modifica = '.mysql_real_escape_string($_SESSION['user_id_s'],$db).'
						WHERE id_prestito = '.$id_prestito.' && id_catalog = '.$id_catalog.' && id_iscritto = '.$id_utente.';';
											
				mysql_query($query, $db) or die(mysql_error($db));		
				mysql_close($db);
				$successo = urlencode("INSERIMENTO RESTITUZIONE AVVENUTO CORRETTAMENTE.");
				redirect('./scheda_utente.php?successo='.$successo.'&CodUtente='.$id_utente);		
			break;
			
			case "elimina_prestito":
				if(isset($_GET['CodCatalog']) && isset($_GET['CodUtente']) && isset($_GET['CodPrestito'])) {
					$id_utente = trim($_GET['CodUtente']);
					$id_catalog = trim($_GET['CodCatalog']);
					$id_prestito = trim($_GET['CodPrestito']);
				} else {
					redirect('./gestione.php');
				}
				
				$query = 'DELETE FROM prestiti
						WHERE id_prestito = '.$id_prestito.' && id_catalog = '.$id_catalog.' && id_iscritto = '.$id_utente.';';
											
				mysql_query($query, $db) or die(mysql_error($db));		
				mysql_close($db);
				$successo = urlencode("ELIMINAZIONE PRESTITO AVVENUTA CORRETTAMENTE.");
				redirect('./scheda_utente.php?successo='.$successo.'&CodUtente='.$id_utente);		
			break;
		}
	} else {
		redirect('./accesso.php');
	}
} else {
	redirect('./accesso.php');
}
?>