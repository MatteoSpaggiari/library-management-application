<?php
    class Utility
    {                
        public static function DateTimeTransform($datetime, $type = null, $format = null)
        {
            if(isset($format) && $format = "EN")
            {
                $date_time_v = explode(" ",$datetime);
                if(!empty($date_time_v[1]) && !isset($type))
                {
                    $date_end = $datetime;
                }
                else if(empty($date_time_v[1]) || $type == "date")
                {
                    $date_end = $date_time_v[0];
                }
                return $date_end;
            }
            else
            {
                $date_time_v = explode(" ",$datetime);
                $date_v = explode("-",$date_time_v[0]);
                $date_ok = $date_v[2]."-".$date_v[1]."-".$date_v[0];
                if(!empty($date_time_v[1]) && !isset($type))
                {
                    $date_end = $date_ok." ".$date_time_v[1];
                }
                else if(empty($date_time_v[1]) || $type == "date")
                {
                    $date_end = $date_ok;
                }
                return $date_end;
            }
        }
        
        public static function NoInfo($stringa)
        {
            if(empty($stringa)) {
                $info = '&minus;';
            } else {
                $info = $stringa;
            }
            return $info."\n";
        }
        
        public static function Replace($stringa)
        {
            $stringa_r = str_replace('\\','',$stringa);
            return $stringa_r;
        }

        // Modifica valori catalogazioni e utenti in scheda visualizzazzione dei prestiti
        public static function em($stringa) {
            if(empty($stringa)) {
                $stringa = "&minus;";
            }
            return "<em>".$stringa."</em>";
        }
        
        public static function modVoce($stringa) {
            switch($stringa) {
                case "Y":
                    $stringa_mod = "Si";
                break;
                case "N":
                    $stringa_mod = "No";
                break;
                case "F":
                    $stringa_mod = "Femmina";
                break;
                case "M":
                    $stringa_mod = "Maschio";
                break;
                default:
                    $stringa_mod = "";
                break;
            }
            return $stringa_mod;
        }
        
        public static function Proprieta($stringa) {
            switch($stringa) {
                case "P":
                    $stringa_mod = "Papillon";
                break;
                case "C":
                    $stringa_mod = "Biblioteca";
                break;
                case "F":
                    $stringa_mod = "Filo&minus;Festival";
                break;
                default:
                    $stringa_mod = "";
                break;
            }
            return $stringa_mod;
        }
        
        public static function Documento($stringa) {
            switch($stringa) {
                case 0:
                    $stringa_mod = "&minus;";
                break;
                case 1:
                    $stringa_mod = "Carta d'Identit&agrave;";
                break;
                case 2:
                    $stringa_mod = "Patente";
                break;
                case 3:
                    $stringa_mod = "Passaporto";
                break;
                case 4:
                    $stringa_mod = "Tessera Sanitaria";
                break;
                default:
                    $stringa_mod = "";
                break;
                }
            return $stringa_mod;
        }
        
        public static function SaveLastLogin($objPDO,$user_id)
        {
            //Carico LastLogin dalla Sessione
            $strQuery = "SELECT dcreated FROM http_session WHERE nuser_id = :user_id";
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':user_id',$user_id,PDO::PARAM_INT);
            $objStatement->execute();
            $arRow = $objStatement->fetch(PDO::FETCH_ASSOC);
            foreach($arRow as $value)
            {
                $last_login = $value;
            }
            $strQuery = "UPDATE users SET dlast_login = :last_login WHERE user_id = :user_id";
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':user_id',$user_id,PDO::PARAM_INT);
            $objStatement->bindParam(':last_login',$last_login,PDO::PARAM_STR);
            $objStatement->execute();
            return(true);
        }
        
        public static function GetTypeDocument($objPDO)
        {
            $TypeDocument = array();
            $i = 0;
            $strQuery = "SELECT tipo_documento FROM documenti ORDER BY tipo_documento";
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->execute();
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $value)
                {
                    $TypeDocument[$i] = $value;
                    $i++;
                }
            }
            return $TypeDocument;
        }
        
        public static function GetProprietaNumInvSelect($objPDO,$isbn)
        {
            if(!empty($isbn))
            {
                $strQuery = 'SELECT DISTINCT csigla_inv, snum_inv FROM catalogazioni WHERE sisbn = :isbn LIMIT 0,8';
                $objStatement = $objPDO->prepare($strQuery);
                $objStatement->bindParam(':isbn',$isbn,PDO::PARAM_STR);
                $objStatement->execute();
                $SiglaNumInv = "";
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    $SiglaNumInv = $arRow['csigla_inv'].'#'.$arRow['snum_inv'];
                }
                $SiglaNumInv_e = utf8_encode($SiglaNumInv);
                return $SiglaNumInv_e;
            }
        }
        
        public static function GetNumInvMax($objPDO,$sigla_inv)
        {
            $sigla_inv = trim($sigla_inv);
            $strQuery = "SELECT MAX(CAST(snum_inv AS SIGNED)) AS id_inv FROM catalogazioni WHERE csigla_inv = :sigla_inv";
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':sigla_inv',$sigla_inv,PDO::PARAM_STR);
            $objStatement->execute();
            $MaxNumInv = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $MaxNumInv = $MaxNumInv.$arRow['id_inv'];
            }
            return $MaxNumInv;
        }
        
        public static function GetNumInvSelect($objPDO,$num_inv,$sigla_inv)
        {
            $num_inv = "%".$num_inv."%";
            $strQuery = 'SELECT snum_inv FROM catalogazioni WHERE ealienato = "N" && evisibile = "Y" && snum_inv LIKE :num_inv && csigla_inv = :sigla_inv GROUP BY snum_inv ORDER BY snum_inv LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':num_inv',$num_inv,PDO::PARAM_STR);
            $objStatement->bindParam(':sigla_inv',$sigla_inv,PDO::PARAM_STR);
            $objStatement->execute();
            $NumInv = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $NumInv = $NumInv.$arRow['snum_inv'].'#';
            }
            $NumInv_e = utf8_encode(NumInv);
            $NumInv_v = explode("#",$NumInv_e);
            return json_encode($NumInv_v);
        }
        
        public static function GetCodDeweySelect($objPDO,$cod_dewey)
        {
            $cod_dewey = "%".$cod_dewey."%";
            $strQuery = 'SELECT scodice FROM catalogazioni WHERE ealienato = "N" && evisibile = "Y" && scodice LIKE :cod_dewey GROUP BY scodice ORDER BY scodice LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':cod_dewey',$cod_dewey,PDO::PARAM_STR);
            $objStatement->execute();
            $CodDewey = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $CodDewey = $CodDewey.$arRow['scodice'].'#';
            }
            $CodDewey_e = utf8_encode($CodDewey);
            $CodDewey_v = explode("#",$CodDewey_e);
            return json_encode($CodDewey_v);
        }
        
        public static function GetTitoloSelect($objPDO,$titolo)
        {
            $titolo = "%".$titolo."%";
            $strQuery = 'SELECT stitolo FROM catalogazioni WHERE ealienato = "N" && evisibile = "Y" && stitolo LIKE :titolo GROUP BY stitolo ORDER BY stitolo LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':titolo',$titolo,PDO::PARAM_STR);
            $objStatement->execute();
            $Titolo = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $Titolo = $Titolo.$arRow['stitolo'].'#';
            }
            $Titolo_e = utf8_encode($Titolo);
            $Titolo_v = explode("#",$Titolo_e);
            return json_encode($Titolo_v);
        }
        
        public static function GetAutoreSelect($objPDO,$autore)
        {
            if(!empty($autore)) {
                $autore = "%".$autore."%";
                $strQuery = 'SELECT sautore FROM catalogazioni WHERE ealienato = "N" && evisibile = "Y" && sautore LIKE :autore GROUP BY sautore ORDER BY sautore LIMIT 0,8';
                $objStatement = $objPDO->prepare($strQuery);
                $objStatement->bindParam(':autore',$autore,PDO::PARAM_STR);
                $objStatement->execute();
                $Autore = "";
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    $Autore = $Autore.$arRow['sautore'].'#';
                }
                $Autore_e = utf8_encode($Autore);
                $Autore_v = explode("#",$Autore_e);
                return json_encode($Autore_v);
            } else {
                return "";
            }
        }
        
        public static function GetGenereSelect($objPDO,$genere)
        {
            $genere = "%".$genere."%";
            $strQuery = 'SELECT sgenere FROM catalogazioni WHERE ealienato = "N" && evisibile = "Y" && sgenere LIKE :genere GROUP BY sgenere ORDER BY sgenere LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':genere',$genere,PDO::PARAM_STR);
            $objStatement->execute();
            $Genere = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $Genere = $Genere.$arRow['sgenere'].'#';
            }
            $Genere_e = utf8_encode($Genere);
            $Genere_v = explode("#",$Genere_e);
            return json_encode($Genere_v);
        }
        
        public static function GetEditoreSelect($objPDO,$editore)
        {
            $editore = "%".$editore."%";
            $strQuery = 'SELECT seditore FROM catalogazioni WHERE ealienato = "N" && evisibile = "Y" && seditore LIKE :editore GROUP BY seditore ORDER BY seditore LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':editore',$editore,PDO::PARAM_STR);
            $objStatement->execute();
            $Editore = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $Editore = $Editore.$arRow['seditore'].'#';
            }
            $Editore_e = utf8_encode($Editore);
            $Editore_v = explode("#",$Editore_e);
            return json_encode($Editore_v);
        }
        
        public static function GetCollanaSelect($objPDO,$collana)
        {
            $collana = "%".$collana."%";
            $strQuery = 'SELECT scollana FROM catalogazioni WHERE ealienato = "N" && evisibile = "Y" && scollana LIKE :collana GROUP BY scollana ORDER BY scollana LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':collana',$collana,PDO::PARAM_STR);
            $objStatement->execute();
            $Collana = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $Collana = $Collana.$arRow['scollana'].'#';
            }
            $Collana_e = utf8_encode($Collana);
            $Collana_v = explode("#",$Collana_e);
            return json_encode($Collana_v);
        }
        
        public static function GetScaffaleSelect($objPDO,$scaffale)
        {
            $scaffale = "%".$scaffale."%";
            $strQuery = 'SELECT sscaffale FROM catalogazioni WHERE ealienato = "N" && evisibile = "Y" && sscaffale LIKE :scaffale GROUP BY sscaffale ORDER BY sscaffale LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':scaffale',$scaffale,PDO::PARAM_STR);
            $objStatement->execute();
            $Scaffale = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $Scaffale = $Scaffale.$arRow['sscaffale'].'#';
            }
            $Scaffale_e = utf8_encode($Scaffale);
            $Scaffale_v = explode("#",$Scaffale_e);
            return json_encode($Scaffale_v);
        }
        
        public static function GetFormatoSelect($objPDO,$formato)
        {
            $formato = "%".$formato."%";
            $strQuery = 'SELECT sformato FROM catalogazioni WHERE ealienato = "N" && evisibile = "Y" && sformato LIKE :formato GROUP BY sformato ORDER BY sformato LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':formato',$formato,PDO::PARAM_STR);
            $objStatement->execute();
            $Formato = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $Formato = $Formato.$arRow['sformato'].'#';
            }
            $Formato_e = utf8_encode($Formato);
            $Formato_v = explode("#",$Formato_e);
            return json_encode($Formato_v);
        }
        
        
        public static function GetNazioneSelect($objPDO,$nazione)
        {
            $nazione = "%".$nazione."%";
            $strQuery = 'SELECT snazione FROM catalogazioni WHERE ealienato = "N" && evisibile = "Y" && snazione LIKE :nazione GROUP BY snazione ORDER BY snazione LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':nazione',$nazione,PDO::PARAM_STR);
            $objStatement->execute();
            $Nazione = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $Nazione = $Nazione.$arRow['snazione'].'#';
            }
            $Nazione_e = utf8_encode($Nazione);
            $Nazione_v = explode("#",$Nazione_e);
            return json_encode($Nazione_v);
        }
        
        public static function GetProfessioneSelect($objPDO,$professione)
        {
            $professione = "%".$professione."%";
            $strQuery = 'SELECT professione FROM professioni WHERE professione LIKE :professione GROUP BY professione ORDER BY professione LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':professione',$professione,PDO::PARAM_STR);
            $objStatement->execute();
            $Professione = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $Professione = $Professione.$arRow['professione'].'#';
            }
            $Professione_e = utf8_encode($Professione);
            $Professione_v = explode("#",$Professione_e);
            return json_encode($Professione_v);
        }

        public static function GetIndirizzoSelect($objPDO,$indirizzo)
        {
            $indirizzo = "%".$indirizzo."%";
            $strQuery = 'SELECT indirizzo FROM indirizzi WHERE indirizzo LIKE :indirizzo GROUP BY indirizzo ORDER BY indirizzo LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':indirizzo',$indirizzo,PDO::PARAM_STR);
            $objStatement->execute();
            $Indirizzo = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $Indirizzo = $Indirizzo.$arRow['indirizzo'].'#';
            }
            $Indirizzo_e = utf8_encode($Indirizzo);
            $Indirizzo_v = explode("#",$Indirizzo_e);
            return json_encode($Indirizzo_v);
        }
        
        public static function GetLocalitaSelect($objPDO,$localita)
        {
            $localita = "%".$localita."%";
            $strQuery = 'SELECT localita FROM localita WHERE localita LIKE :localita GROUP BY localita ORDER BY localita LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':localita',$localita,PDO::PARAM_STR);
            $objStatement->execute();
            $Localita = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $Localita = $Localita.$arRow['localita'].'#';
            }
            $Localita_e = utf8_encode($Localita);
            $Localita_v = explode("#",$Localita_e);
            return json_encode($Localita_v);
        }
        
        public static function GetProvinciaCapSelect($objPDO,$localita)
        {
            $strQuery = 'SELECT DISTINCT provincia, cap FROM localita WHERE localita = :localita LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':localita',$localita,PDO::PARAM_STR);
            $objStatement->execute();
            $ProvinciaCap = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $ProvinciaCap = $arRow['provincia'].'#'.$arRow['cap'];
            }
            $ProvinciaCap_e = utf8_encode($ProvinciaCap);
            return $ProvinciaCap_e;
        }
        
        public static function GetProvinciaSelect($objPDO,$provincia)
        {
            $provincia = "%".$provincia."%";
            $strQuery = 'SELECT provincia FROM localita WHERE provincia LIKE :provincia GROUP BY provincia ORDER BY provincia LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':provincia',$provincia,PDO::PARAM_STR);
            $objStatement->execute();
            $Provincia = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $Provincia = $Provincia.$arRow['provincia'].'#';
            }
            $Provincia_e = utf8_encode($Provincia);
            $Provincia_v = explode("#",$Provincia_e);
            return json_encode($Provincia_v);
        }
        
        public static function GetCapSelect($objPDO,$cap)
        {
            $cap = "%".$cap."%";
            $strQuery = 'SELECT cap FROM localita WHERE cap LIKE :cap GROUP BY cap ORDER BY cap LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':cap',$cap,PDO::PARAM_STR);
            $objStatement->execute();
            $Cap = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $Cap = $Cap.$arRow['cap'].'#';
            }
            $Cap_e = utf8_encode($Cap);
            $Cap_v = explode("#",$Cap_e);
            return json_encode($Cap_v);
        }
        
        public static function GetNomeSelect($objPDO,$nome)
        {
            $nome = "%".$nome."%";
            $strQuery = 'SELECT snome FROM iscritti WHERE snome LIKE :nome GROUP BY snome ORDER BY snome LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':nome',$nome,PDO::PARAM_STR);
            $objStatement->execute();
            $Nome = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $Nome = $Nome.$arRow['snome'].'#';
            }
            $Nome_e = utf8_encode($Nome);
            $Nome_v = explode("#",$Nome_e);
            return json_encode($Nome_v);
        }
        
        public static function GetCognomeSelect($objPDO,$cognome)
        {
            $cognome = "%".$cognome."%";
            $strQuery = 'SELECT scognome FROM iscritti WHERE scognome LIKE :cognome GROUP BY scognome ORDER BY scognome LIMIT 0,8';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':cognome',$cognome,PDO::PARAM_STR);
            $objStatement->execute();
            $Cognome = "";
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                $Cognome = $Cognome.$arRow['scognome'].'#';
            }
            $Cognome_e = utf8_encode($Cognome);
            $Cognome_v = explode("#",$Cognome_e);
            return json_encode($Cognome_v);
        }
        
        public static function GetSchedaCataloguing($objPDO,$sigla_inv,$num_inv)
        {
            $strQuery = 'SELECT * FROM catalogazioni WHERE ealienato = "N" && evisibile = "Y" && csigla_inv = :sigla_inv && snum_inv = :num_inv';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':sigla_inv',$sigla_inv,PDO::PARAM_STR);
            $objStatement->bindParam(':num_inv',$num_inv,PDO::PARAM_STR);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row == 1)
            {
                $i = 0;
                $Scheda_catalog = array();
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    foreach($arRow as $value)
                    {
                        if(empty($value))
                        {
                            $value = utf8_encode("-");
                        }
                        $Scheda_catalog[$i] = htmlentities($value);
                        $i++;
                    }
                }
                $Scheda_catalog_stringa = implode('#',$Scheda_catalog);
                echo $Scheda_catalog_stringa;
            }
            else if($num_row == 0)
            {
                $Scheda_catalog = 0;
                echo $Scheda_catalog;
            }
        }
        
        public static function GetSchedaSubscriber($objPDO,$num_tessera)
        {
            $strQuery = 'SELECT * FROM iscritti WHERE nnum_tessera = :num_tessera';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':num_tessera',$num_tessera,PDO::PARAM_INT);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row == 1)
            {
                $i = 0;
                $Scheda_iscritto = array();
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    foreach($arRow as $value)
                    {
                        if(empty($value))
                        {
                            $value = utf8_encode("-");
                        }
                        $Scheda_iscritto[$i] = htmlentities($value);
                        $i++;
                    }
                }
                $Scheda_iscritto_stringa = implode('#',$Scheda_iscritto);
                echo $Scheda_iscritto_stringa;
            }
            else if($num_row == 0)
            {
                $Scheda_iscritto = 0;
                echo $Scheda_iscritto;
            }
        }
        
        public static function AddMotivazione($objPDO,$motivazione,$id_sospeso)
        {
            $motivazione = utf8_decode($motivazione);
            $strQuery = 'UPDATE IGNORE sospesi SET smotivazione = :motivazione WHERE id_sospeso = :id_sospeso';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':motivazione',$motivazione,PDO::PARAM_STR);
            $objStatement->bindParam(':id_sospeso',$id_sospeso,PDO::PARAM_INT);
            if($objStatement->execute())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        
        public static function AddSospensione($objPDO,$id_sospeso,$id_user)
        {
            $date_sospensione = date('Y-m-d');
            $strQuery = 'INSERT IGNORE INTO sospesi (id_sospeso, nid_iscritto, ddate_sosp, nid_sog_modifica) VALUES (NULL, :id_sospeso, :date_sospensione, :id_user)';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_sospeso',$id_sospeso,PDO::PARAM_INT);
            $objStatement->bindParam(':date_sospensione',$date_sospensione,PDO::PARAM_STR);
            $objStatement->bindParam(':id_user',$id_user,PDO::PARAM_INT);
            if($objStatement->execute())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        
        public static function UpdateSospensione($objPDO,$id_sospeso,$id_user)
        {
            $date_modifica = date('Y-m-d H:i:s');
            $strQuery = 'UPDATE IGNORE iscritti SET esospeso = "Y", ddate_modifica = :date_modifica, nid_sog_modifica = :id_user WHERE id_iscritto = :id_sospeso';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_sospeso',$id_sospeso,PDO::PARAM_INT);
            $objStatement->bindParam(':date_modifica',$date_modifica,PDO::PARAM_STR);
            $objStatement->bindParam(':id_user',$id_user,PDO::PARAM_INT);
            if($objStatement->execute())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        
        public static function AddRiammissione($objPDO,$id_riammesso,$id_user)
        {
            $date_riammissione = date('Y-m-d');
            $date_modifica = date('Y-m-d H:i:s');
            $strQuery = 'UPDATE IGNORE sospesi SET ddate_riammis = :date_riammis, ddate_modifica = :date_modifica, nid_sog_modifica = :id_user WHERE nid_iscritto = :id_riammesso';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_riammesso',$id_riammesso,PDO::PARAM_INT);
            $objStatement->bindParam(':date_riammis',$date_riammissione,PDO::PARAM_STR);
            $objStatement->bindParam(':date_modifica',$date_modifica,PDO::PARAM_STR);
            $objStatement->bindParam(':id_user',$id_user,PDO::PARAM_INT);
            if($objStatement->execute())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        
        public static function UpdateRiammissione($objPDO,$id_riammesso,$id_user)
        {
            $date_modifica = date('Y-m-d H:i:s');
            $strQuery = 'UPDATE IGNORE iscritti SET esospeso = "N", ddate_modifica = :date_modifica, nid_sog_modifica = :id_user  WHERE id_iscritto = :id_riammesso';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_riammesso',$id_riammesso,PDO::PARAM_INT);
            $objStatement->bindParam(':date_modifica',$date_modifica,PDO::PARAM_STR);
            $objStatement->bindParam(':id_user',$id_user,PDO::PARAM_INT);
            if($objStatement->execute())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        
        public static function ControlSocioAnno($objPDO,$id_iscritto,$anno)
        {
            $Id_socio = array();
            $i = 0;
            $strQuery = 'SELECT id_socio FROM soci WHERE id_iscritto = :id_iscritto && anno = :anno';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_iscritto',$id_iscritto,PDO::PARAM_INT);
            $objStatement->bindParam(':anno',$anno,PDO::PARAM_STR);
            $objStatement->execute();
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $value)
                {
                    $Id_socio[$i] = $value;
                    $i++;
                }
            }
            return count($Id_socio);
        }
        
        public static function ControlSocio($objPDO,$id_iscritto)
        {
            $anno = date('Y');
            $strQuery = 'SELECT id_socio FROM soci WHERE id_iscritto = :id_iscritto && anno >= :anno';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_iscritto',$id_iscritto,PDO::PARAM_INT);
            $objStatement->bindParam(':anno',$anno,PDO::PARAM_STR);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row > 0)
            {
                return "Y";
            }
            else
            {
                return "N";
            }
        }
        
        public static function AddSocioAnno($objPDO,$id_iscritto,$anno,$id_user)
        {
            $date = date('Y-m-d');
            $strQuery = 'INSERT IGNORE INTO soci (id_iscritto, anno, id_sog_modifica) VALUES (:id_iscritto, :anno, :id_user)';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_iscritto',$id_iscritto,PDO::PARAM_INT);
            $objStatement->bindParam(':anno',$anno,PDO::PARAM_STR);
            $objStatement->bindParam(':id_user',$id_user,PDO::PARAM_INT);
            if($objStatement->execute())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        
        public static function DeleteSocioAnno($objPDO,$id_iscritto,$anno)
        {
            $strQuery = 'DELETE FROM soci WHERE id_iscritto = :id_iscritto && anno = :anno';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_iscritto',$id_iscritto,PDO::PARAM_INT);
            $objStatement->bindParam(':anno',$anno,PDO::PARAM_STR);
            if($objStatement->execute())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        
        public static function GetPrestitiCataloguing($objPDO,$id_catalog)
        {
            $Prestiti_catalog = array();
            $strQuery = 'SELECT i.id_iscritto, i.nnum_tessera, i.snome, i.scognome, DATE_FORMAT(DATE(p.ddate_pres),"%d-%m-%Y") AS data_pres, DATE_FORMAT(DATE(p.ddate_res),"%d-%m-%Y") AS data_res, p.eresa
                    FROM iscritti AS i, prestiti AS p, catalogazioni AS c
                    WHERE p.nid_catalog = c.id_catalog && p.nid_iscritto = i.id_iscritto && p.nid_catalog = :id_catalog
                    GROUP BY p.id_prestito
                    ORDER BY p.ddate_pres DESC';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_catalog',$id_catalog,PDO::PARAM_INT);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row > 0)
            {
                $i = 0;
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    foreach($arRow as $key => $value)
                    {
                        $Prestiti_catalog[$i][$key] = $value;
                    }
                    $i++;
                }
            }
            return $Prestiti_catalog;
        }
        
        public static function GetPrestitiIscritto($objPDO,$id_iscritto,$anno)
        {
            $Prestiti_iscritto = array();
            $strQuery = 'SELECT c.id_catalog, c.stitolo, c.sautore, c.sgenere, c.scodice, DATE_FORMAT(DATE(p.ddate_pres),"%d-%m-%Y") AS data_pres, DATE_FORMAT(DATE(p.ddate_res),"%d-%m-%Y") AS data_res, p.eresa, p.id_prestito
                    FROM catalogazioni AS c, prestiti AS p, iscritti AS i
                    WHERE p.nid_iscritto = i.id_iscritto && p.nid_catalog = c.id_catalog && p.nid_iscritto = :id_iscritto '.(!empty($anno) ? (' && YEAR(p.ddate_pres) =  :anno') : '').'
                    GROUP BY p.id_prestito
                    ORDER BY p.ddate_pres DESC';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_iscritto',$id_iscritto,PDO::PARAM_INT);
            If(!empty($anno))
            {
                $objStatement->bindParam(':anno',$anno,PDO::PARAM_STR);
            }
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row > 0)
            {
                $i = 0;
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    foreach($arRow as $key => $value)
                    {
                        $Prestiti_iscritto[$i][$key] = $value;
                    }
                    $i++;
                }
            }
            return $Prestiti_iscritto;
        }
        
        public static function GetSospensioniIscritto($objPDO,$id_iscritto)
        {
            $Sospensioni_iscritto = array();
            $strQuery = 'SELECT id_sospeso, DATE_FORMAT(DATE(ddate_sosp),"%d-%m-%Y") AS data_sosp, DATE_FORMAT(DATE(ddate_riammis),"%d-%m-%Y") AS data_riammis, smotivazione
                    FROM sospesi
                    WHERE nid_iscritto = :id_iscritto
                    GROUP BY id_sospeso
                    ORDER BY ddate_sosp DESC';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_iscritto',$id_iscritto,PDO::PARAM_INT);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row > 0)
            {
                $i = 0;
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    foreach($arRow as $key => $value)
                    {
                        $Sospensioni_iscritto[$i][$key] = $value;
                    }
                    $i++;
                }
            }
            return $Sospensioni_iscritto;
        }
        
        public static function GetAnniSocioIscritto($objPDO,$id_iscritto)
        {
            $Anni_socio_iscritto = array();
            $strQuery = 'SELECT anno
                FROM soci
                WHERE id_iscritto = :id_iscritto
                GROUP BY anno
                ORDER BY anno DESC';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_iscritto',$id_iscritto,PDO::PARAM_INT);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row > 0)
            {
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    foreach($arRow as $value)
                    {
                        $Anni_socio_iscritto[] = $value;
                    }
                }
            }
            return $Anni_socio_iscritto;
        }
        
        public static function GetSollecitoRestituzioni($objPDO)
        {
            $Data_odierna = date('Y-m-d H:i:s');
            $Sollecito_restituzioni = array();
            $strQuery = 'SELECT c.id_catalog, c.sautore, c.stitolo, c.enovita, i.id_iscritto, i.nnum_tessera, i.snome, i.scognome, i.stel_casa, i.stel_cell, i.esospeso, p.ddate_pres, p.ddate_res 
                FROM iscritti AS i, catalogazioni AS c, prestiti AS p
                WHERE p.nid_catalog = c.id_catalog && p.nid_iscritto = i.id_iscritto && p.eresa = "N" && p.ddate_res < :datetime_actual
                ORDER BY p.ddate_res ASC';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':datetime_actual',$Data_odierna,PDO::PARAM_STR);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row > 0)
            {
                $i = 0;
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    foreach($arRow as $key => $value)
                    {
                        $Sollecito_restituzioni[$i][$key] = $value;
                    }
                    $i++;
                }
            }
            return $Sollecito_restituzioni;
        }
        
        public static function GetClassificaIscritti($objPDO,$anno,$type)
        {
            $data_prestito = $anno."-01-01 00:00:00";
            $data_restituzione = $anno."-12-31 23:59:59";
            $data_nascita = ($anno-18)."-01-01";
            $Classifica_iscritti = array();
            $strQuery = 'SELECT COUNT(i.id_iscritto) AS num_pres, i.id_iscritto, i.nnum_tessera, i.snome, i.scognome, i.esesso, i.ddate_nascita, i.stel_casa, i.stel_cell
                FROM iscritti AS i, prestiti AS p, catalogazioni AS c
                WHERE p.nid_catalog = c.id_catalog && p.nid_iscritto = i.id_iscritto && YEAR(p.ddate_pres) = :anno && p.ddate_pres <= :data_restutizione && i.ddate_nascita '.($type == "adulti" ? '<' : '>=').' :data_nascita
                GROUP BY i.id_iscritto
                ORDER BY num_pres DESC';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':anno',$anno,PDO::PARAM_STR);
            $objStatement->bindParam(':data_restutizione',$data_restituzione,PDO::PARAM_STR);
            $objStatement->bindParam(':data_nascita',$data_nascita,PDO::PARAM_STR);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row > 0)
            {
                $i = 0;
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    foreach($arRow as $key => $value)
                    {
                        $Classifica_iscritti[$i][$key] = $value;
                    }
                    $i++;
                }
            }
            return $Classifica_iscritti;
        }
        
        public static function GetClassificaNumeroTotalePrestiti($objPDO,$anno,$type)
        {
            $data_prestito = $anno."-01-01 00:00:00";
            $data_restituzione = $anno."-12-31 23:59:59";
            $data_nascita = ($anno-18)."-01-01";
            $strQuery = 'SELECT p.id_prestito
                FROM iscritti AS i, catalogazioni AS c, prestiti AS p
                WHERE p.nid_catalog = c.id_catalog && p.nid_iscritto = i.id_iscritto && p.ddate_pres >= :data_prestito && p.ddate_pres <= :data_restutizione && i.ddate_nascita '.($type == "adulti" ? '<' : '>=').' :data_nascita
                GROUP BY p.id_prestito';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':data_prestito',$data_prestito,PDO::PARAM_STR);
            $objStatement->bindParam(':data_restutizione',$data_restituzione,PDO::PARAM_STR);
            $objStatement->bindParam(':data_nascita',$data_nascita,PDO::PARAM_STR);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            return $num_row;
        }
        
        public static function GetClassificaNumeroPrestitiMaschi($objPDO,$anno,$type)
        {
            $data_prestito = $anno."-01-01 00:00:00";
            $data_restituzione = $anno."-12-31 23:59:59";
            $data_nascita = ($anno-18)."-01-01";
            $strQuery = 'SELECT i.id_iscritto
                FROM iscritti AS i, catalogazioni AS c, prestiti AS p
                WHERE p.nid_catalog = c.id_catalog && p.nid_iscritto = i.id_iscritto && i.esesso = "M" && p.ddate_pres >= :data_prestito && p.ddate_pres <= :data_restutizione && i.ddate_nascita '.($type == "adulti" ? '<' : '>=').' :data_nascita
                GROUP BY i.id_iscritto';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':data_prestito',$data_prestito,PDO::PARAM_STR);
            $objStatement->bindParam(':data_restutizione',$data_restituzione,PDO::PARAM_STR);
            $objStatement->bindParam(':data_nascita',$data_nascita,PDO::PARAM_STR);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            return $num_row;
        }
        
        public static function GetClassificaNumeroPrestitiFemmine($objPDO,$anno,$type)
        {
            $data_prestito = $anno."-01-01 00:00:00";
            $data_restituzione = $anno."-12-31 23:59:59";
            $data_nascita = ($anno-18)."-01-01";
            $strQuery = 'SELECT i.id_iscritto
                FROM iscritti AS i, catalogazioni AS c, prestiti AS p
                WHERE p.nid_catalog = c.id_catalog && p.nid_iscritto = i.id_iscritto && i.esesso = "F" && p.ddate_pres >= :data_prestito && p.ddate_pres <= :data_restutizione && i.ddate_nascita '.($type == "adulti" ? '<' : '>=').' :data_nascita
                GROUP BY i.id_iscritto';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':data_prestito',$data_prestito,PDO::PARAM_STR);
            $objStatement->bindParam(':data_restutizione',$data_restituzione,PDO::PARAM_STR);
            $objStatement->bindParam(':data_nascita',$data_nascita,PDO::PARAM_STR);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            return $num_row;
        }
        
        public static function GetIscrittiClasse($objPDO,$query)
        {
            $Iscritti_classe = array();
            $objStatement = $objPDO->prepare($query);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row > 0)
            {
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    foreach($arRow as $key => $value)
                    {
                        $Iscritti_classe[$key] = $value;
                    }
                }
            }
            else
            {
                $Iscritti_classe = 0;
            }
            return $Iscritti_classe;
        }
        
        public static function GetTotaleIscritti($objPDO)
        {
            $strQuery = 'SELECT COUNT(id_iscritto) AS tot FROM iscritti';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->execute();
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $value)
                {
                    $Num_tot_iscritti = $value;
                }
            }
            return $Num_tot_iscritti;
        }
        
        public static function GetClassificazioneCodiceDewey($objPDO,$query)
        {
            $Classificazione_codice_dewey = array();
            $objStatement = $objPDO->prepare($query);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row > 0)
            {
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    foreach($arRow as $key => $value)
                    {
                        $Classificazione_codice_dewey[$key] = $value;
                    }
                }
            }
            else
            {
                $Classificazione_codice_dewey = 0;
            }
            return $Classificazione_codice_dewey;
        }
        
        public static function GetCatalogazioniStatistiche($objPDO,$query)
        {
            $Catalogazioni_statistiche = array();
            $objStatement = $objPDO->prepare($query);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row > 0)
            {
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    foreach($arRow as $key => $value)
                    {
                        $Catalogazioni_statistiche[$key] = $value;
                    }
                }
            }
            else
            {
                $Catalogazioni_statistiche = 0;
            }
            return $Catalogazioni_statistiche;
        }
        
        public static function GetTotaleCatalogazioni($objPDO)
        {
            $strQuery = 'SELECT COUNT(id_catalog) AS tot FROM catalogazioni WHERE ealienato = "N"';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->execute();
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $value)
                {
                    $Num_tot_catalogazioni = $value;
                }
            }
            return $Num_tot_catalogazioni;
        }
        
        public static function GetStoricoSoci($objPDO)
        {
            $strQuery = 'SELECT i.id_iscritto, i.nnum_tessera, i.snome, i.scognome, i.slocalita, i.stel_casa, i.stel_cell, s.anno
                FROM iscritti AS i, soci AS s
                WHERE  i.id_iscritto = s.id_iscritto
                ORDER BY  s.anno DESC, i.scognome ASC';
            $Storico_soci = array();
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->execute();
            $i = 0;
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $key => $value)
                {
                    $Storico_soci[$i][$key] = $value;
                }
                $i++;
            }
            return $Storico_soci;
        }
        
        public static function GetSociAnnoCorrente($objPDO)
        {
            $Anno = date("Y");
            $Soci_anno_corrente = array();
            $strQuery = 'SELECT i.id_iscritto, i.nnum_tessera, i.snome, i.scognome, i.slocalita, i.stel_casa, i.stel_cell, s.anno
                    FROM iscritti AS i, soci AS s
                    WHERE  i.id_iscritto = s.id_iscritto && s.anno = :anno
                    ORDER BY i.scognome ASC';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':anno',$Anno,PDO::PARAM_STR);
            $objStatement->execute();
            $i = 0;
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $key => $value)
                {
                    $Soci_anno_corrente[$i][$key] = $value;
                }
                $i++;
            }
            return $Soci_anno_corrente;
        }
        
        public static function GetCatalogazioniNovita($objPDO)
        {
            $Catalogazioni_novita = array();
            $strQuery = 'SELECT id_catalog, csigla_inv, snum_inv, stitolo, sautore, sscaffale, DATE_FORMAT(DATE(ddate_catalog),"%d-%m-%Y") AS data_catalog
                    FROM catalogazioni
                    WHERE enovita = "Y" && ealienato = "N"
                    ORDER BY csigla_inv ASC, snum_inv ASC';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->execute();
            $i = 0;
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $key => $value)
                {
                    $Catalogazioni_novita[$i][$key] = $value;
                }
                $i++;
            }
            return $Catalogazioni_novita;
        }
        
        public static function GetTotaleCatalogazioniNovitaSiglaInv($objPDO,$sigla_inv)
        {
            $strQuery = 'SELECT COUNT(id_catalog) AS tot FROM catalogazioni WHERE ealienato = "N" && enovita = "Y" && csigla_inv = :sigla_inv';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':sigla_inv',$sigla_inv,PDO::PARAM_STR);            
            $objStatement->execute();
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $value)
                {
                    $Num_tot_cat_nov_sigla_inv = $value;
                }
            }
            return $Num_tot_cat_nov_sigla_inv;
        }

        public static function GetCatalogazioniAlienate($objPDO)
        {
            $Catalogazioni_alienate = array();
            $strQuery = 'SELECT c.id_catalog, c.csigla_inv, c.snum_inv, c.stitolo, c.sautore, c.sscaffale, DATE_FORMAT(DATE(c.ddate_catalog),"%d-%m-%Y") AS data_catalog
                    FROM catalogazioni as c, alienazioni as a
                    WHERE c.id_catalog = a.id_catalogazione && ealienato = "Y"
                    ORDER BY csigla_inv ASC, snum_inv ASC';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->execute();
            $i = 0;
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $key => $value)
                {
                    $Catalogazioni_alienate[$i][$key] = $value;
                }
                $i++;
            }
            return $Catalogazioni_alienate;
        }
        
        public static function GetTotaleCatalogazioniAlienateSiglaInv($objPDO,$sigla_inv)
        {
            $strQuery = 'SELECT COUNT(c.id_catalog) AS tot
                            FROM catalogazioni as c, alienazioni as a
                             WHERE c.id_catalog = a.id_catalogazione && c.ealienato = "Y" && c.csigla_inv = :sigla_inv';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':sigla_inv',$sigla_inv,PDO::PARAM_STR);            
            $objStatement->execute();
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $value)
                {
                    $Num_tot_cat_ali_sigla_inv = $value;
                }
            }
            return $Num_tot_cat_ali_sigla_inv;
        }
        
        public static function GetTabellaSoci($objPDO)
        {
            $strQuery = 'SELECT i.id_iscritto, i.nnum_tessera, i.snome, i.scognome, i.sindirizzo, i.snum_civico, i.slocalita, ccap, i.stel_casa, i.stel_cell, s.anno
                FROM iscritti AS i, soci AS s
                WHERE  i.id_iscritto = s.id_iscritto
                ORDER BY i.scognome ASC, s.anno DESC';
            $Tabella_soci = array();
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->execute();
            $i = 0;
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $key => $value)
                {
                    $Tabella_soci[$i][$key] = $value;
                }
                $i++;
            }
            return $Tabella_soci;
        }
        
        public static function GetTabellaCatalogazioni($objPDO)
        {
            $strQuery = 'SELECT * FROM catalogazioni AS c LEFT JOIN alienazioni AS a ON c.id_catalog = a.id_catalogazione ORDER BY c.id_catalog';
            $Tabella_catalog = array();
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->execute();
            $i = 0;
            while($arRow = $objStatement->fetch(PDO::FETCH_NUM))
            {
                foreach($arRow as $value)
                {
                    $Tabella_catalog[$i][] = $value;
                }
                $i++;
            }
            return $Tabella_catalog;
        }
        
        public static function GetTabellaIscritti($objPDO)
        {
            $strQuery = 'SELECT * FROM iscritti AS i LEFT JOIN sospesi AS s ON i.id_iscritto = s.nid_iscritto LEFT JOIN tutore AS t ON i.id_iscritto = t.nid_iscritto ORDER BY i.id_iscritto';
            $Tabella_iscritti = array();
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->execute();
            $i = 0;
            while($arRow = $objStatement->fetch(PDO::FETCH_NUM))
            {
                foreach($arRow as $value)
                {
                    $Tabella_iscritti[$i][] = $value;
                }
                $i++;
            }
            return $Tabella_iscritti;
        }
        
        public static function AddAlienazione($objPDO,$id_catalog,$id_user)
        {
            $date_modifica = date('Y-m-d H:i:s');
            $strQuery = 'INSERT IGNORE INTO alienazioni (id_alienazione, id_catalogazione, data_alienazione, id_sog_modifica)
                                VALUES (NULL, :id_catalog, :date_modifica, :id_user)';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_catalog',$id_catalog,PDO::PARAM_INT);
            $objStatement->bindParam(':date_modifica',$date_modifica,PDO::PARAM_STR);
            $objStatement->bindParam(':id_user',$id_user,PDO::PARAM_INT);
            if($objStatement->execute())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        
        public static function DeleteAlienazione($objPDO,$id_catalog)
        {
            $strQuery = 'DELETE FROM alienazioni WHERE id_catalogazione = :id_catalog';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_catalog',$id_catalog,PDO::PARAM_INT);
            if($objStatement->execute())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        
        public static function UpdateNovita($objPDO,$id_catalog,$id_user)
        {
            $date_modifica = date('Y-m-d H:i:s');
            $strQuery = 'UPDATE catalogazioni SET enovita = "N", ddate_modifica = :date_modifica, nid_sog_modifica = :id_user WHERE id_catalog = :id_catalog';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_catalog',$id_catalog,PDO::PARAM_INT);
            $objStatement->bindParam(':date_modifica',$date_modifica,PDO::PARAM_STR);
            $objStatement->bindParam(':id_user',$id_user,PDO::PARAM_INT);
            if($objStatement->execute())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        
        public static function GetCatalogazioniNovitaDeleted($objPDO,$id_catalog)
        {
            $Catalogazioni_novita_deleted = array();
            $strQuery = 'SELECT id_catalog, csigla_inv, snum_inv, stitolo, sautore, sscaffale, DATE_FORMAT(DATE(ddate_catalog),"%d-%m-%Y") AS data_catalog, enovita
                    FROM catalogazioni
                    WHERE id_catalog = :id_catalog
                    ORDER BY id_catalog ASC';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_catalog',$id_catalog,PDO::PARAM_INT);
            $objStatement->execute();
            $i = 0;
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $key => $value)
                {
                    $Catalogazioni_novita_deleted[$i][$key] = $value;
                }
                $i++;
            }
            return $Catalogazioni_novita_deleted;
        }
        
        public static function UpdateAlienazione($objPDO,$id_catalog,$id_user)
        {
            $date_modifica = date('Y-m-d H:i:s');
            $strQuery = 'UPDATE catalogazioni SET ealienato = "N", ddate_modifica = :date_modifica, nid_sog_modifica = :id_user WHERE id_catalog = :id_catalog';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_catalog',$id_catalog,PDO::PARAM_INT);
            $objStatement->bindParam(':date_modifica',$date_modifica,PDO::PARAM_STR);
            $objStatement->bindParam(':id_user',$id_user,PDO::PARAM_INT);
            if($objStatement->execute())
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        
        public static function GetCatalogazioniAlienazioneDeleted($objPDO,$id_catalog)
        {
            $Catalogazioni_alienate_deleted = array();
            $strQuery = 'SELECT id_catalog, csigla_inv, snum_inv, stitolo, sautore, sscaffale, DATE_FORMAT(DATE(ddate_catalog),"%d-%m-%Y") AS data_catalog, ealienato
                    FROM catalogazioni
                    WHERE id_catalog = :id_catalog
                    ORDER BY id_catalog ASC';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_catalog',$id_catalog,PDO::PARAM_INT);
            $objStatement->execute();
            $i = 0;
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $key => $value)
                {
                    $Catalogazioni_alienate_deleted[$i][$key] = $value;
                }
                $i++;
            }
            return $Catalogazioni_alienate_deleted;
        }
        
        public static function GetCorneliani($objPDO)
        {
            $Corneliani = array();
            $strQuery = 'SELECT i.id_iscritto, i.nnum_tessera, i.snome, i.scognome, DATE_FORMAT(DATE(i.ddate_nascita),"%d-%m-%Y") AS data_nascita, i.sindirizzo, i.snum_civico, i.slocalita, i.stel_casa, i.stel_cell
                    FROM catalogazioni c, iscritti i, prestiti p
                    WHERE c.id_catalog = p.nid_catalog && i.id_iscritto = p.nid_iscritto && c.sscaffale = "CORNELIANI" && i.snote LIKE "%corn%"
                    GROUP BY i.nnum_tessera
                    ORDER BY i.scognome ASC';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->execute();
            $i = 0;
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $key => $value)
                {
                    $Corneliani[$i][$key] = $value;
                }
                $i++;
            }
            return $Corneliani;
        }
        
        public static function GetCornelianiTanti($objPDO)
        {
            $Corneliani_tanti = array();
            $strQuery = 'SELECT i.id_iscritto, i.nnum_tessera, i.snome, i.scognome, DATE_FORMAT(DATE(i.ddate_nascita),"%d-%m-%Y") AS data_nascita, i.sindirizzo, i.snum_civico, i.slocalita, i.stel_casa, i.stel_cell
                    FROM catalogazioni c, iscritti i, prestiti p
                    WHERE c.id_catalog = p.nid_catalog && i.id_iscritto = p.nid_iscritto && c.sscaffale = "CORNELIANI"
                    GROUP BY i.nnum_tessera
                    ORDER BY i.scognome ASC';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->execute();
            $i = 0;
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $key => $value)
                {
                    $Corneliani_tanti[$i][$key] = $value;
                }
                $i++;
            }
            return $Corneliani_tanti;
        }
    }
?>

