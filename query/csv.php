<?php
    include_once("./head.php");
    unlink("../public/query_scaricabile.csv");
    $fp  = fopen("../public/query_scaricabile.csv", "w");
    if(!$fp) die ("Errore nella operaione con il file");
    switch ($_GET['param']) {
        case "soci":
            $Tabella_soci = Utility::GetTabellaSoci($objPDO);
            $Num_row_tot = count($Tabella_soci);
            if($Num_row_tot > 0) {
                $intestazione = "NUMERO TESSERA{COGNOME{NOME{INDIRIZZO{NUMERO CIVICO{LOCALITA{CAP{TELEFONO FISSO{CELLULARE{ANNO ISCRIZIONE\r\n";
                fwrite($fp, $intestazione);
                for($i=0;$i<$Num_row_tot;$i++)
                {	
                    $ris = $Tabella_soci[$i]['nnum_tessera']."{".$Tabella_soci[$i]['snome']."{".$Tabella_soci[$i]['scognome']."{".$Tabella_soci[$i]['sindirizzo']."{".$Tabella_soci[$i]['snum_civico']."{".$Tabella_soci[$i]['slocalita']."{".$Tabella_soci[$i]['ccap']."{".$Tabella_soci[$i]['stel_casa']."{".$Tabella_soci[$i]['stel_cell']."{".$Tabella_soci[$i]['anno']."\r\n";
                    fwrite($fp, $ris);
                }
            }
        break;
        
        case "catalogazioni":
            $Tabella_catalogazioni = Utility::GetTabellaCatalogazioni($objPDO);
            $Num_row_tot = count($Tabella_catalogazioni);
            if($Num_row_tot > 0) {
                $intestazione = "ID{ISBN{SIGLA INVENTARIO{NUMERO INVENTARIO{CODICE{TITOLO{AUTORE{GENERE{EDITORE{EDIZIONE{COLLANA{SCAFFALE{FORMATO{NOTE FORMATO{PAGINE{DATA CATALOGAZIONE{NOVITA{COSTO{PROVENIENZA{LINGUA ORIGINALE{TITOLO ORIGINALE{TRADUTTORE{TESTO FRONTE{LINGUA{NAZIONE{NOTE{ALIENATO{VISIBILE{DATA MODIFICA{ID SOG MODIFICA{ID ALIENAZIONE{ID CATALOGAZIONE{DATA ALIENAZIONE{ID SOG MODIFICA\r\n";
                fwrite($fp, $intestazione);
                for($i=0;$i<$Num_row_tot;$i++)
                {	
                    $ris = implode("{", $Tabella_catalogazioni[$i]);
                    $ris .= "\r\n";
                    fwrite($fp, $ris);
                }
            }
        break;
        
        case "iscritti":
            $Tabella_iscritti = Utility::GetTabellaIscritti($objPDO);
            $Num_row_tot = count($Tabella_iscritti);
            if($Num_row_tot > 0) {
                $intestazione = "ID{NUMERO TESSERA{DATA ISCRIZIONE{NOME{COGNOME{SESSO{DATA DI NASCITA{PROFESSIONE{INDIRIZZO{NUMERO CIVICO{LOCALITA{CAP{PROVINCIA{TELEFONO CASA{CELLULARE{EMAIL{SOSPESO{INTERNET{PRIVACY{TIPO DOCUMENTO{NUMERO DOCUMENTO{NOTE{TUTORE{DECEDUTO{DATA MODIFICA{ID SOG MODIFICA{ID SOSPESO{ID ISCRITTO{DATA SOPSENSIONE{DATA RIAMMISSIONE{MOTIVAZIONE{DATA MODIFICA{ID SOG MODIFICA{ID TUTORE{ID ISCRITTO{TIPO DOCUMENTO{NUMERO DOCUMENTO{NOME{COGNOME{SESSO{INDIRIZZO{NUMERO CIVICO{LOCALITA{CAP{PROVINCIA{TEL CASA{TEL CELL{EMAIL{DATA MODOFICA{ID SOG MODIFICA\r\n";
                fwrite($fp, $intestazione);
                for($i=0;$i<$Num_row_tot;$i++)
                {	
                    $ris = implode("{", $Tabella_iscritti[$i]);
                    $ris .= "\r\n";
                    fwrite($fp, $ris);
                }
            }
            break;
    }
    fclose($fp);
    redirect('../public/query_scaricabile.csv');
?>
