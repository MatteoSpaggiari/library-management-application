<?php
    class Search
    {   

        const NUMBER_USER_FOR_PAGE = 30;
        
        public static function GetCountCatalog($objPDO,$Parametri_ricerca,$Livello_accesso)
        {
        #    $strQuery = 'SELECT COUNT(id_catalog) FROM catalogazioni WHERE ealienato = "N" '.($Livello_accesso == 3 ? '' : ('&& evisibile = "Y"')).'
            $strQuery = 'SELECT COUNT(c.id_catalog) FROM catalogazioni AS c '.(!empty($Parametri_ricerca['data_a']) ? (', alienazioni AS a WHERE c.id_catalog = a.id_catalogazione') : 'WHERE ealienato = "N"').'
                            '.(!empty($Parametri_ricerca['data_a']) ? ('&& a.data_alienazione LIKE :data_alienazione && c.ealienato = "Y"') : '').' '.(!empty($Parametri_ricerca['isbn']) ? ('&& sisbn = :isbn') : '').' '.(!empty($Parametri_ricerca['proprieta']) ? ('&& csigla_inv = :proprieta') : '').' '.(!empty($Parametri_ricerca['num_inv']) ? (' && snum_inv = :numero_inventario') : '').' '.(!empty($Parametri_ricerca['dewey']) ? ('&& scodice LIKE :codice_dewey') : '').' '.(!empty($Parametri_ricerca['titolo']) ? (' && stitolo = :titolo') : '').' 
                            '.(!empty($Parametri_ricerca['autore']) ? ('&& sautore = :autore') : '').' '.(!empty($Parametri_ricerca['genere']) ? (' && sgenere = :genere') : '').' '.(!empty($Parametri_ricerca['collana']) ? ('&& scollana = :collana') : '').' '.(!empty($Parametri_ricerca['scaffale']) ? (' && sscaffale = :scaffale') : '').' '.(!empty($Parametri_ricerca['data_c']) ? (' && ddate_catalog LIKE :data_catalog') : '');
            $objStatement = $objPDO->prepare($strQuery);
            if(!empty($Parametri_ricerca['data_a']))
            {
                $Parametri_ricerca['data_a'] = "%".$Parametri_ricerca['data_a']."%";
                $objStatement->bindParam(':data_alienazione',$Parametri_ricerca['data_a'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['isbn']))
            {
                $objStatement->bindParam(':isbn',$Parametri_ricerca['isbn'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['proprieta']))
            {
                $objStatement->bindParam(':proprieta',$Parametri_ricerca['proprieta'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['num_inv']))
            {
                $objStatement->bindParam(':numero_inventario',$Parametri_ricerca['num_inv'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['dewey']))
            {
                $Parametri_ricerca['dewey'] = "%".$Parametri_ricerca['dewey']."%";
                $objStatement->bindParam(':codice_dewey',$Parametri_ricerca['dewey'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['titolo']))
            {
                $objStatement->bindParam(':titolo',$Parametri_ricerca['titolo'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['autore']))
            {
                $objStatement->bindParam(':autore',$Parametri_ricerca['autore'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['genere']))
            {
                $objStatement->bindParam(':genere',$Parametri_ricerca['genere'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['collana']))
            {
                $objStatement->bindParam(':collana',$Parametri_ricerca['collana'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['scaffale']))
            {
                $objStatement->bindParam(':scaffale',$Parametri_ricerca['scaffale'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['data_c']))
            {
                $Parametri_ricerca['data_c'] = "%".$Parametri_ricerca['data_c']."%";
                $objStatement->bindParam(':data_catalog',$Parametri_ricerca['data_c'],PDO::PARAM_STR);
            }
            $objStatement->execute();
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $value)
                {
                    $numberCatalog = $value;
                }
            }
            return $numberCatalog;
        }
        
        public static function GetCatalog($objPDO,$Parametri_ricerca,$from = 0,$Livello_accesso)
        {
            $i = 0;
            $Catalog = array();
            # $strQuery = 'SELECT id_catalog, csigla_inv, snum_inv, simage, stitolo, sautore, sgenere, seditore, sscaffale FROM catalogazioni WHERE ealienato = "N" '.($Livello_accesso == 3 ? '' : ('&& evisibile = "Y"')).'
            $strQuery = 'SELECT id_catalog, csigla_inv, snum_inv, simage, stitolo, sautore, sgenere, seditore, sscaffale FROM catalogazioni AS c '.(!empty($Parametri_ricerca['data_a']) ? (', alienazioni AS a WHERE c.id_catalog = a.id_catalogazione') : 'WHERE ealienato = "N"').'
                            '.(!empty($Parametri_ricerca['data_a']) ? ('&& a.data_alienazione LIKE :data_alienazione && c.ealienato = "Y"') : '').' '.(!empty($Parametri_ricerca['isbn']) ? ('&& sisbn = :isbn') : '').' '.(!empty($Parametri_ricerca['proprieta']) ? ('&& csigla_inv = :proprieta') : '').' '.(!empty($Parametri_ricerca['num_inv']) ? (' && snum_inv = :numero_inventario') : '').' '.(!empty($Parametri_ricerca['dewey']) ? ('&& scodice LIKE :codice_dewey') : '').' '.(!empty($Parametri_ricerca['titolo']) ? (' && stitolo = :titolo') : '').' 
                            '.(!empty($Parametri_ricerca['autore']) ? ('&& sautore = :autore') : '').' '.(!empty($Parametri_ricerca['genere']) ? (' && sgenere = :genere') : '').' '.(!empty($Parametri_ricerca['collana']) ? ('&& scollana = :collana') : '').' '.(!empty($Parametri_ricerca['scaffale']) ? (' && sscaffale = :scaffale') : '').' '.(!empty($Parametri_ricerca['data_c']) ? (' && ddate_catalog LIKE :data_catalog') : '').' GROUP BY id_catalog ORDER BY '.$Parametri_ricerca['ordinamento'].' '.$Parametri_ricerca['tipo_ordinamento'].', id_catalog LIMIT '.$from.', '.self::NUMBER_USER_FOR_PAGE;
            $objStatement = $objPDO->prepare($strQuery);
            if(!empty($Parametri_ricerca['data_a']))
            {
                $Parametri_ricerca['data_a'] = "%".$Parametri_ricerca['data_a']."%";
                $objStatement->bindParam(':data_alienazione',$Parametri_ricerca['data_a'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['isbn']))
            {
                $objStatement->bindParam(':isbn',$Parametri_ricerca['isbn'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['proprieta']))
            {
                $objStatement->bindParam(':proprieta',$Parametri_ricerca['proprieta'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['num_inv']))
            {
                $objStatement->bindParam(':numero_inventario',$Parametri_ricerca['num_inv'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['dewey']))
            {
                $Parametri_ricerca['dewey'] = "%".$Parametri_ricerca['dewey']."%";
                $objStatement->bindParam(':codice_dewey',$Parametri_ricerca['dewey'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['titolo']))
            {
                $objStatement->bindParam(':titolo',$Parametri_ricerca['titolo'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['autore']))
            {
                $objStatement->bindParam(':autore',$Parametri_ricerca['autore'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['genere']))
            {
                $objStatement->bindParam(':genere',$Parametri_ricerca['genere'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['collana']))
            {
                $objStatement->bindParam(':collana',$Parametri_ricerca['collana'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['scaffale']))
            {
                $objStatement->bindParam(':scaffale',$Parametri_ricerca['scaffale'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['data_c']))
            {
                $Parametri_ricerca['data_c'] = "%".$Parametri_ricerca['data_c']."%";
                $objStatement->bindParam(':data_catalog',$Parametri_ricerca['data_c'],PDO::PARAM_STR);
            }
            $objStatement->execute();
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $key => $value)
                {
                    $Catalog[$i][$key] = $value;
                }
                $i++;
            }
            return $Catalog;
        }
        
        public static function GetCountSubscriber($objPDO,$Parametri_ricerca,$Livello_accesso)
        {
            $strQuery = 'SELECT COUNT(id_iscritto) FROM iscritti WHERE (esospeso = "Y" || esospeso = "N")
                            '.(!empty($Parametri_ricerca['num_tes']) ? ('&& nnum_tessera = :numero_tessera') : '').' '.(!empty($Parametri_ricerca['data_isc']) ? (' && ddate_iscrizione LIKE :data_iscrizione') : '').' '.(!empty($Parametri_ricerca['nome']) ? ('&& snome LIKE :nome') : '').' '.(!empty($Parametri_ricerca['cognome']) ? (' && scognome = :cognome') : '').' 
                            '.(!empty($Parametri_ricerca['professione']) ? ('&& sprofessione = :professione') : '');
            $objStatement = $objPDO->prepare($strQuery);
            if(!empty($Parametri_ricerca['num_tes']))
            {
                $objStatement->bindParam(':numero_tessera',$Parametri_ricerca['num_tes'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['data_isc']))
            {
                $Parametri_ricerca['data_isc'] = "%".$Parametri_ricerca['data_isc']."%";
                $objStatement->bindParam(':data_iscrizione',$Parametri_ricerca['data_isc'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['nome']))
            {
                $objStatement->bindParam(':nome',$Parametri_ricerca['nome'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['cognome']))
            {
                $objStatement->bindParam(':cognome',$Parametri_ricerca['cognome'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['professione']))
            {
                $objStatement->bindParam(':professione',$Parametri_ricerca['professione'],PDO::PARAM_STR);
            }
            $objStatement->execute();
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $value)
                {
                    $numberSubscriber = $value;
                }
            }
            return $numberSubscriber;
        }
        
        public static function GetSubscribers($objPDO,$Parametri_ricerca,$from = 0,$Livello_accesso)
        {
            $i = 0;
            $Subscriber = array();
            $strQuery = 'SELECT id_iscritto, nnum_tessera, simage, ddate_nascita, snome, scognome, sprofessione, sindirizzo, snum_civico, slocalita FROM iscritti WHERE (esospeso = "Y" || esospeso = "N")
                            '.(!empty($Parametri_ricerca['num_tes']) ? ('&& nnum_tessera = :numero_tessera') : '').' '.(!empty($Parametri_ricerca['data_isc']) ? (' && ddate_iscrizione LIKE :data_iscrizione') : '').' '.(!empty($Parametri_ricerca['nome']) ? ('&& snome LIKE :nome') : '').' '.(!empty($Parametri_ricerca['cognome']) ? (' && scognome = :cognome') : '').' 
                            '.(!empty($Parametri_ricerca['professione']) ? ('&& sprofessione = :professione') : '').' GROUP BY id_iscritto ORDER BY '.$Parametri_ricerca['ordinamento'].' '.$Parametri_ricerca['tipo_ordinamento'].', id_iscritto LIMIT '.$from.', '.self::NUMBER_USER_FOR_PAGE;
            $objStatement = $objPDO->prepare($strQuery);
            if(!empty($Parametri_ricerca['num_tes']))
            {
                $objStatement->bindParam(':numero_tessera',$Parametri_ricerca['num_tes'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['data_isc']))
            {
                $Parametri_ricerca['data_isc'] = "%".$Parametri_ricerca['data_isc']."%";
                $objStatement->bindParam(':data_iscrizione',$Parametri_ricerca['data_isc'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['nome']))
            {
                $objStatement->bindParam(':nome',$Parametri_ricerca['nome'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['cognome']))
            {
                $objStatement->bindParam(':cognome',$Parametri_ricerca['cognome'],PDO::PARAM_STR);
            }
            if(!empty($Parametri_ricerca['professione']))
            {
                $objStatement->bindParam(':professione',$Parametri_ricerca['professione'],PDO::PARAM_STR);
            }
            $objStatement->execute();
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $key => $value)
                {
                    $Subscriber[$i][$key] = $value;
                }
                $i++;
            }
            return $Subscriber;
        }
        
    }
?>

