<?php
    class Subscriber extends DataBoundObject {
        protected $Num_tessera;
        protected $Data_iscrizione;
        protected $Image;
        protected $Nome;
        protected $Cognome;
        protected $Sesso;
        protected $Data_nascita;
        protected $Professione;
        protected $Indirizzo;
        protected $Num_civico;
        protected $Localita;
        protected $Cap;
        protected $Provincia;
        protected $Tel_casa;
        protected $Tel_cell;
        protected $Email;
        protected $Sospeso;
        protected $Internet;
        protected $Privacy;
        protected $Tipo_documento;
        protected $Num_documento;
        protected $Note;
        protected $Tutore;
        protected $Deceduto;
        protected $Data_modifica;
        protected $Id_sog_modifica;

        protected function DefineTableName() {
            return("iscritti");
        }
        
        protected function DefineNameID() {
            return("id_iscritto");
        }
        
        protected function DefineRelationMap() {
            return (array(
                "id_iscritto" => "ID",
                "nnum_tessera" => "Num_tessera",
                "ddate_iscrizione" => "Data_iscrizione",
                "simage" => "Image",
                "snome" => "Nome",
                "scognome" => "Cognome",
                "esesso" => "Sesso",
                "ddate_nascita" => "Data_nascita",
                "sprofessione" => "Professione",
                "sindirizzo" => "Indirizzo",
                "snum_civico" => "Num_civico",
                "slocalita" => "Localita",
                "ccap" => "Cap",
                "cprovincia" => "Provincia",
                "stel_casa" => "Tel_casa",
                "stel_cell" => "Tel_cell",
                "semail" => "Email",
                "esospeso" => "Sospeso",
                "einternet" => "Internet",
                "eprivacy" => "Privacy",
                "ntipo_documento" => "Tipo_documento",
                "snum_documento" => "Num_documento",
                "snote" => "Note",
                "etutore" => "Tutore",
                "edeceduto" => "Deceduto",
                "ddate_modifica" => "Data_modifica",
                "nid_sog_modifica" => "Id_sog_modifica"
            ));
        }
        
        public function validate() {
            
            //Numero tessera
            if(empty($this->Num_tessera))
            {
                $this->errors['Num_tessera'] = '&Egrave; obbligatorio inserire il NUMERO TESSERA.';
            }
            else if (!preg_match('|^[0-9]+$|', $this->Num_tessera))
            {
                $this->errors['Num_tessera'] = 'Hai inserito un NUMERO TESSERA non corretto.';
            }
            
            //Data iscrizione
            if(empty($this->Data_iscrizione))
            {
                $this->errors['Data_iscrizione'] = '&Egrave; obbligatorio inserire la DATA ISCRIZIONE.';
            }
            else if (!preg_match('|^[0-9]{4}-[0-9]{2}-[0-9]{2}$|', $this->Data_iscrizione))
            {
                $this->errors['Data_iscrizione'] = 'Hai inserito una DATA ISCRIZIONE non corretta.';
            }
            
            //Nome
            if(empty($this->Nome))
            {
                $this->errors['Nome'] = '&Egrave; obbligatorio inserire il NOME.';
            }
            else if (!preg_match('|^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $this->Nome))
            {
                $this->errors['Nome'] = 'Hai inserito un NOME non corretto.';
            }
            
            //Cognome
            if(empty($this->Cognome))
            {
                $this->errors['Cognome'] = '&Egrave; obbligatorio inserire il COGNOME.';
            }
            else if (!preg_match('|^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $this->Cognome))
            {
                $this->errors['Cognome'] = 'Hai inserito un COGNOME non corretto.';
            }
            
            //Sesso
            if(empty($this->Sesso))
            {
                $this->errors['Sesso'] = '&Egrave; obbligatorio inserire il SESSO.';
            }
            
            //Data_nascita
            if(empty($this->Data_nascita))
            {
                $this->errors['Data_nascita'] = '&Egrave; obbligatorio inserire la DATA DI NASCITA.';
            }
            else if (!preg_match('|^[0-9]{4}-[0-9]{2}-[0-9]{2}$|', $this->Data_nascita))
            {
                $this->errors['Data_nascita'] = 'Hai inserito una DATA DI NASCITA non corretta.';
            }
            
            //Professione
            if(empty($this->Professione))
            {
                $this->errors['Professione'] = '&Egrave; obbligatorio inserire la PROFESSIONE.';
            }
            else if (!preg_match('|^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $this->Professione))
            {
                $this->errors['Professione'] = 'Hai inserito una PROFESSIONE non corretta.';
            }
            
            //Indirizzo
            if(empty($this->Indirizzo))
            {
                $this->errors['Indirizzo'] = '&Egrave; obbligatorio inserire un INDIRIZZO.';
            }
            else if (!preg_match('|^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $this->Indirizzo))
            {
                $this->errors['Indirizzo'] = 'Hai inserito un INDIRIZZO non corretto.';
            }
            
            //Numero civico
            if(empty($this->Num_civico))
            {
                $this->errors['Num_civico'] = '&Egrave; obbligatorio inserire il NUMERO CIVICO.';
            }
            else if (!preg_match('|^[0-9a-zA-Z/ ]+$|', $this->Num_civico))
            {
                $this->errors['Num_civico'] = 'Hai inserito un NUMERO CIVICO non corretto.';
            }
            
            //Localita
            if(empty($this->Localita))
            {
                $this->errors['Localita'] = '&Egrave; obbligatorio inserire la LOCALIT&Agrave;.';
            }
            else if (!preg_match('|^[\.\',0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $this->Localita))
            {
                $this->errors['Localita'] = 'Hai inserito una LOCALIT&Agrave; non corretta.';
            }
            
            //Provincia
            if(empty($this->Provincia))
            {
                $this->errors['Provincia'] = '&Egrave; obbligatorio inserire la PROVINCIA.';
            }
            else if (!preg_match('|^[A-Za-z]{2}$|', $this->Provincia))
            {
                $this->errors['Provincia'] = 'Hai inserito una PROVINCIA non corretta.';
            }
            
            //Cap
            if(empty($this->Cap))
            {
                $this->errors['Cap'] = '&Egrave; obbligatorio inserire il C.A.P..';
            }
            else if (!preg_match('|^[0-9]{5}$|', $this->Cap))
            {
                $this->errors['Cap'] = 'Hai inserito un C.A.P. non corretto.';
            }
            
            //Telofono di casa
            if(!empty($this->Tel_casa))
            {
                if (!preg_match('|^[0-9]{5,12}$|', $this->Tel_casa))
                {
                    $this->errors['Tel_casa'] = 'Hai inserito un TELEFONO DI CASA non corretto.';
                }
            }
            
            //Telofono cellulare
            if(!empty($this->Tel_cell))
            {
                if (!preg_match('|^[0-9]{8,10}$|', $this->Tel_cell))
                {
                    $this->errors['Tel_cell'] = 'Hai inserito un TELEFONO CELLULARE non corretto.';
                }
            }
            
            //Email
            if(!empty($this->Email))
            {
                if (!preg_match('|^[a-z0-9\._%-]+@{1,1}[a-z0-9\._%-]+[\.]{1,1}[a-z]{2,6}$|', $this->Email))
                {
                    $this->errors['Email'] = 'Hai inserito una E&minus;MAIL non corretta.';
                }
            }
            
            //Internet
            if(empty($this->Internet))
            {
                $this->errors['Internet'] = '&Egrave; obbligatorio scegliere il campo INTERNET.';
            }
            
            //Privacy
            if(empty($this->Privacy))
            {
                $this->errors['Privacy'] = '&Egrave; obbligatorio scegliere il campo PRIVACY.';
            }
            
            //Tipo documento
            if(!empty($this->Tipo_documento))
            {
                if (!preg_match('|^[0-9]+$|', $this->Tipo_documento))
                {
                    $this->errors['Tipo_documento'] = 'Hai inserito un TIPO DOCUMENTO non corretto.';
                }
            }
            
            //Numero documento
            if(!empty($this->Num_documento))
            {
                if (!preg_match('|^[0-9a-zA-Z ]+$|', $this->Num_documento))
                {
                    $this->errors['Num_documento'] = 'Hai inserito un NUMERO DOCUMENTO non corretto.';
                }
            }
            else if(!empty($this->Num_documento) && $this->Tipo_documento == 0)
            {					
                $this->errors['Num_documento'] = 'Devi scegliere anche il TIPO DI DOCUMENTO.';
            }
            else if(empty($this->Num_documento) && $this->Tipo_documento != 0)
            {
                $this->errors['Num_documento'] = 'Devi inserire un NUMERO DOCUMENTO.';					
            }
            
            //Controllo se sono presenti errori
            if(sizeof($this->errors) > 0)
            {
                return $this->errors;
            }               
        }
        
        public static function GetIdSubscriber($objPDO,$num_tes)
        {
            $Id_subscriber = array();
            $strQuery = "SELECT id_iscritto FROM iscritti WHERE nnum_tessera = :num_tes";
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':num_tes',$num_tes,PDO::PARAM_INT);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row == 1)
            {
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    foreach($arRow as $key => $value)
                    {
                        $Id_subscriber[$key] = $value;
                    }
                }
                return $Id_subscriber['id_iscritto'];
            }
            else
            {
                return 0;
            }
        }
        
        public static function GetNumTesseraMax($objPDO)
        {
            $strQuery = "SELECT max(nnum_tessera) AS max_num_tes FROM iscritti";
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->execute();
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $value)
                {
                    $Max_num_tes = $value;
                }
            }
            return ($Max_num_tes+1);
        }
        
        public static function AddProfessione($objPDO,$professione)
        {
            $strQuery = 'INSERT IGNORE INTO professioni (id_professione, professione) VALUES (NULL, :professione)';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':professione',$professione,PDO::PARAM_STR);
            $objStatement->execute();
        }
        
        public static function AddLocalita($objPDO,$localita, $cap, $provincia)
        {
            $strQuery = 'INSERT IGNORE INTO localita (id_localita, localita, cap, provincia) VALUES (NULL, :localita, :cap, :provincia)';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':localita',$localita,PDO::PARAM_STR);
            $objStatement->bindParam(':cap',$cap,PDO::PARAM_STR);
            $objStatement->bindParam(':provincia',$provincia,PDO::PARAM_STR);
            $objStatement->execute();
        }
        
        public static function AddIndirizzo($objPDO,$indirizzo)
        {
            $strQuery = 'INSERT IGNORE INTO indirizzi (id_indirizzo, indirizzo) VALUES (NULL, :indirizzo)';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':indirizzo',$indirizzo,PDO::PARAM_STR);
            $objStatement->execute();
        }
        
        public static function SaveImageSubscriber($objPDO,$subscriber_id,$image)
        {
            $strQuery = "UPDATE iscritti SET simage = :image WHERE id_iscritto = :subscriber_id";
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':subscriber_id',$subscriber_id,PDO::PARAM_INT);
            $objStatement->bindParam(':image',$image,PDO::PARAM_STR);
            return $objStatement->execute();
        }
    }
?>

