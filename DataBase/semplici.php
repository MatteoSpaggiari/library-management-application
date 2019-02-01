<?php
	include('../include_php/mysql_old.php');
/*
	// Prima Sistemazione Tabella Comuni in tabelle Comuni e Province
	$query = 'SELECT DISTINCT *
			FROM comuni_2';
	
	$result = mysql_query($query, $db) or die(mysql_error($db));
	
	while($row = mysql_fetch_assoc($result)) {	
		extract($row);
		$comune = explode('  ',$CittaCampo);
		$com = strtoupper(trim($comune[0]));
		$pro = strtoupper(trim($comune[1]));
		$query2 = 'INSERT IGNORE INTO comuni
				(nome_comune)
				VALUES 
				("'.mysql_real_escape_string(trim($com),$db).'")';
		$query3 = 'INSERT IGNORE INTO province
				(sigla_provincia)
				VALUES 
				("'.mysql_real_escape_string(trim($pro),$db).'")';

		mysql_query($query2, $db) or die(mysql_error($db));
		mysql_query($query3, $db) or die(mysql_error($db));
	}

	// Prima Sistemazione Tabella libri
	$query = 'SELECT *
			FROM ok.libri;';
	
	$result = mysql_query($query, $db) or die(mysql_error($db));
	
	while($row = mysql_fetch_assoc($result)) {	
		extract($row);
		//sistemazione inventario in sig_inv e num_inv
		if(preg_match('|/|', $inventario)) {
			$inv = explode('/',$inventario);
		} else {
			$inv[0] = ' ';
			$inv[1] = $inventario;			
		}
		$num = substr($inv[1],2);
		switch($inv[0]) {
			case 'AP':
				$sigla = "P";
			break;
			case 'F':
				$sigla = "F";
			break;
			case ' ':
				$sigla = "C";
			break;	
		}
		//sistemazione collana
		($collana == "-") ? $collana = "" : "";
		//sistemazione scaffale
		if(preg_match('|/|', $scaffale)) {
			$scaf = explode('/',$scaffale);
		} else {
			$scaf[1] = trim($scaffale);
		}
		//sistemazione formato e note formato
		$format = explode(' ',$formato);
		$formato_ok = $format[0]." ".$format[1]." ".$format[2];
		$num_ele_form = count($format);
		$note_formato = "";
		if($num_ele_form >= 4) { 
			for($i = 3;$i < $num_ele_form;$i++) {
				$note_formato .= " ".$format[$i];
			}
		}
		//sistemazione pagine
		$pagine == "" ? $pagine = "null" : "";
		//sistemazione data catalogazione
		if(!empty($giorno_mese)) {
			$giorno = substr($giorno_mese,0,2);
			$mese = substr($giorno_mese,2,2);
		} else {
			$giorno = "01";
			$mese = "01";
		}
		$data_catal = trim($catalogazione).'-'.trim($mese).'-'.trim($giorno);
		//sistemazione costo e provenienza
		$provenienza = "";
		$costo_v = explode(" ",trim($costo),3);
		if(count($costo_v) > 1) {
			switch(trim($costo_v[0])) {
				case "\xA3":
					if(!preg_match('|[0-9]+[,\.]*$|', trim($costo_v[1]))) {
						$costo_ok = "null";
					} else {
						$costo_ok = trim(str_replace(".","",trim($costo_v[1])));
						$costo_ok = trim($costo_ok)/1936.27;
					}
					isset($costo_v[2]) ? $provenienza = str_replace("AP/","",$costo_v[2]) : $provenienza = "";
				break;
				case "\x80":
					if(!preg_match('|[0-9]+[,\.]*|', trim($costo_v[1]))) {
						$costo_ok = "null";
					} else {
						$costo_ok = trim(str_replace(",",".",trim($costo_v[1])));
					}	
					isset($costo_v[2]) ? $provenienza = str_replace("AP/","",$costo_v[2]) : $provenienza = "";
				break;
				default:
					if(preg_match('|[0-9\.\x80\xA30]+|', $costo_v[0])) {
						$costo_ok = trim(str_replace(".","",$costo_v[0]));
						$costo_ok = trim(str_replace("\x80","",$costo_ok));
						$costo_ok = trim(str_replace("\xA3","",$costo_ok));
						$costo_ok = trim($costo_ok)/1936.27;
					} else if(preg_match('|[0-9,\x80\xA30]+|', $costo_v[0])) {
						$costo_ok = trim(str_replace(",",".",$costo_v[0]));
						$costo_ok = trim(str_replace("\x80","",$costo_ok));
						$costo_ok = trim(str_replace("\xA3","",$costo_ok));
					} else {
						$costo_ok = "null";				
					}
					isset($costo_v[1]) ? $provenienza = str_replace("AP/","",$costo_v[1]) : $provenienza = "";
				break;
			}
		} else {
			if(preg_match('|[0-9\.\x80\xA30]+|', $costo)) {
				$costo_ok = trim(str_replace(".","",$costo));
				$costo_ok = trim(str_replace("\x80","",$costo_ok));
				$costo_ok = trim(str_replace("\xA3","",$costo_ok));
				$costo_ok = trim($costo_ok)/1936.27;
			} else if(preg_match('|[0-9,\x80\xA30]+|', $costo)) {
				$costo_ok = trim(str_replace(",",".",$costo));
				$costo_ok = trim(str_replace("\x80","",$costo_ok));
				$costo_ok = trim(str_replace("\xA3","",$costo_ok));
			} else {
				$costo_ok = "null";				
			}
		}
		//sistemazione lingua orig, testo a fronte
		($linguaroginale == -1) ? $lingua_o = 'Y' : $lingua_o = 'N';
		($testo_originale == -1) ? $testo_f = 'Y' : $testo_f = 'N';

		$query2 = 'INSERT IGNORE INTO biblioteca.catalogazioni
				(sigla_inv,num_inv,codice,titolo,autore,genere,editore,edizione,collana,scaffale,formato,note_formato,pagine,data_catalog,novita,costo,provenienza,lingua_orig,titolo_orig,traduttore,testo_fronte,lingua,nazione,note,alienato,visibile)
				VALUES 
				("'.mysql_real_escape_string(trim($sigla),$db).'",
				"'.mysql_real_escape_string(trim($num),$db).'",
				"'.mysql_real_escape_string(trim($codice),$db).'",
				"'.mysql_real_escape_string(trim($titolo),$db).'",
				"'.mysql_real_escape_string(ucwords(trim($autorecampo)),$db).'",
				"'.mysql_real_escape_string(ucfirst(trim($genere)),$db).'",
				"'.mysql_real_escape_string(ucfirst(trim($editore)),$db).'",
				"'.mysql_real_escape_string(ucfirst(trim($edizione)),$db).'",
				"'.mysql_real_escape_string(trim($collana),$db).'",
				"'.mysql_real_escape_string(trim($scaf[1]),$db).'",
				"'.mysql_real_escape_string(trim($formato_ok),$db).'",
				"'.mysql_real_escape_string(trim($note_formato),$db).'",
				'.mysql_real_escape_string(trim($pagine),$db).',
				"'.mysql_real_escape_string(trim($data_catal),$db).'",
				"N",
				'.mysql_real_escape_string(trim($costo_ok),$db).',
				"'.mysql_real_escape_string(trim($provenienza),$db).'",
				"'.mysql_real_escape_string(trim($lingua_o),$db).'",
				"'.mysql_real_escape_string(ucfirst(trim($titolo_orig)),$db).'",
				"'.mysql_real_escape_string(ucwords(trim($traduttore)),$db).'",
				"'.mysql_real_escape_string(trim($testo_f),$db).'",
				"'.mysql_real_escape_string(trim($lingua),$db).'",
				"'.mysql_real_escape_string(ucwords(trim($nazione)),$db).'",
				"'.mysql_real_escape_string(trim($note2),$db).'",
				"N",
				"Y"
				);';

		mysql_query($query2, $db) or die(mysql_error($db));
	}
*/
	// Prima Sistemazione Tabella iscritti
	$query = 'SELECT *
			FROM ok.iscritti;';
	
	$result = mysql_query($query, $db) or die(mysql_error($db));
	
	while($row = mysql_fetch_assoc($result)) {	
		extract($row);
		
		//sistemazione privacy
		$aggiornamento = trim($aggiornamento);
		($aggiornamento == -1) ? $privacy = 'Y' : $privacy = 'N';
		//sistemazione data iscrizione
		if($iscrizione != '' || $iscrizione != 'null'){
			$data_is = explode("/",substr(trim($iscrizione),0,10));
			$data_is_ok = $data_is[2].'/'.$data_is[1].'/'.$data_is[0];
		} else {
			$data_is_ok == "";
		}
		//sistemazione nome e cognome
		$cognome = ucfirst(strtolower(trim($cognome)));
		$nome = ucfirst(strtolower(trim($nome)));
		//sistemazione località ecc.
		$localita_v = explode("  ",trim($comune));
		$localita = trim(strtoupper($localita_v[0]));
		$provincia = trim(strtoupper($localita_v[1]));
		//sistemazione data di nascita
		if($datanascita != '' || $datanascita != 'null'){
			$data_nas = explode("/",trim($datanascita));
			$data_nas_ok = $data_nas[2].'/'.$data_nas[1].'/'.$data_nas[0];
		} else {
			$data_nas_ok == "";
		}
		$cellulare = trim($Cellulare);
		$professione = ucfirst(strtolower(trim($professione)));
		if($prefisso != '' && $telefono != '') {
			$tel_casa = trim($prefisso).trim($telefono);
		} else if(strlen($telefono) > 7) {
			$cellulare = trim($telefono);
			$tel_casa = '';
		} else {
			$tel_casa = '';
		}
		$email = trim($email);
		($sospeso == -1) ? $sospeso = 'Y' : $sospeso = 'N';
		($internet == -1) ? $internet = 'Y' : $internet = 'N';
		$Papillon = trim($Papillon);
		($Papillon == 0 || $Papillon == 'Non socio') ? $soc_papillon = 'N' : $soc_papillon = 'Y';
		($Papillon == 0 || $Papillon == 'Non socio') ? $data_socio = '' : $data_socio = $Papillon.'-00-00';
		
		$query2 = 'INSERT IGNORE INTO biblioteca.iscritti
				(num_tessera,data_iscrizione,nome,cognome,sesso,data_nascita,professione,indirizzo,localita,cap,provincia,tel_casa,tel_cell,email,sospeso,internet,privacy,socio_papillon,note,deceduto)
				VALUES 
				('.mysql_real_escape_string(trim($num_tessera),$db).',
				"'.mysql_real_escape_string(trim($data_is_ok),$db).'",
				"'.mysql_real_escape_string(ucwords(trim($nome)),$db).'",
				"'.mysql_real_escape_string(ucwords(trim($cognome)),$db).'",
				"'.mysql_real_escape_string(trim($sesso),$db).'",
				"'.mysql_real_escape_string(trim($data_nas_ok),$db).'",
				"'.mysql_real_escape_string(trim($professione),$db).'",
				"'.mysql_real_escape_string(trim($indirizzo),$db).'",
				"'.mysql_real_escape_string(strtoupper(trim($localita)),$db).'",
				"'.mysql_real_escape_string(trim($cap),$db).'",
				"'.mysql_real_escape_string(strtoupper(trim($provincia)),$db).'",
				"'.mysql_real_escape_string(trim($tel_casa),$db).'",
				"'.mysql_real_escape_string(trim($cellulare),$db).'",
				"'.mysql_real_escape_string(strtolower(trim($email)),$db).'",
				"'.mysql_real_escape_string(trim($sospeso),$db).'",
				"'.mysql_real_escape_string(trim($internet),$db).'",
				"'.mysql_real_escape_string(trim($privacy),$db).'",
				"'.mysql_real_escape_string(trim($soc_papillon),$db).'",
				"'.mysql_real_escape_string(trim($note),$db).'",
				"N"
				);';
		mysql_query($query2, $db) or die(mysql_error($db));
		
		$id = mysql_insert_id($db);
		
		if($soc_papillon == 'Y') {		
			$query3 = 'INSERT IGNORE INTO biblioteca.soci
					(id_socio,id_iscritto,anno)
					VALUES 
					("null",
					'.mysql_real_escape_string(trim($id),$db).',
					"'.mysql_real_escape_string(trim($data_socio),$db).'"
					);';
			mysql_query($query3, $db) or die(mysql_error($db));
		}
		if($sospeso == 'Y') {
			if(trim($note) != "") {
				$note_v = explode(" ",trim($note),3);
			}
			if(preg_match('|^[0-9]{2}[/]{1}[0-9]{1,2}[/]{1}[0-9]{2,4}$|',$note_v[1])) {				
				$data_v = explode("/",$note_v[1]);
				$data_sospeso = $data_v[2]."-".$data_v[1]."-".$data_v[0];
				$query4 = 'INSERT IGNORE INTO biblioteca.sospesi
						(id_sospeso,id_iscritto,data_sosp,motivazione)
						VALUES 
						("null",
							'.mysql_real_escape_string(trim($id),$db).',
							"'.mysql_real_escape_string(trim($data_sospeso),$db).'",
							"'.mysql_real_escape_string(trim($note_v[2]),$db).'"
						);';
				mysql_query($query4, $db) or die(mysql_error($db));
			}
		}

	}
/*
	// Prima Sistemazione Tabella prestiti
	$query = 'SELECT *
			FROM prestiti_2;';
	
	$result = mysql_query($query, $db) or die(mysql_error($db));
	
	while($row = mysql_fetch_assoc($result)) {	
		extract($row);
		
		$tessera = explode(".",$Tessera);
		($Resa == -1) ? $resa = 'Y' : $resa = 'N';

		$query2 = 'INSERT IGNORE INTO prestiti
				(codice,titolo,autore,tessera,nome,cognome,data_pres,data_res,resa)
				VALUES 
				("'.mysql_real_escape_string(trim($codice),$db).'",
				"'.mysql_real_escape_string(trim($Titolo),$db).'",
				"'.mysql_real_escape_string(trim($Autore),$db).'",
				"'.mysql_real_escape_string(trim($tessera[0]),$db).'",
				"'.mysql_real_escape_string(ucfirst(strtolower(trim($Nome))),$db).'",
				"'.mysql_real_escape_string(ucfirst(strtolower(trim($Cognome))),$db).'",
				"'.mysql_real_escape_string(trim($Data_pres),$db).'",
				"'.mysql_real_escape_string(trim($Data_res),$db).'",
				"'.mysql_real_escape_string(trim($resa),$db).'"
				);';


		mysql_query($query2, $db) or die(mysql_error($db));

	}
 */
	mysql_free_result($result);
	mysql_close($db);
?>