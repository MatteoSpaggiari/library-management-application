<?php
    class LegalGuardian extends DataBoundObject {
        protected $Id_iscritto;
        protected $Tipo_documento;
        protected $Num_documento;
        protected $Nome;
        protected $Cognome;
        protected $Sesso;
        protected $Indirizzo;
        protected $Num_civico;
        protected $Localita;
        protected $Cap;
        protected $Provincia;
        protected $Tel_casa;
        protected $Tel_cell;
        protected $Email;
        protected $Date_modifica;
        protected $Id_sog_modifica;

        protected function DefineTableName() {
            return("tutore");
        }
        
        protected function DefineNameID() {
            return("id_tutore");
        }
        
        protected function DefineRelationMap() {
            return (array(
                "id_tutore" => "ID",
                "nid_iscritto" => "Id_iscritto",
                "ntipo_documento" => "Tipo_documento",
                "snum_documento" => "Num_documento",
                "snome" => "Nome",
                "scognome" => "Cognome",
                "esesso" => "Sesso",
                "sindirizzo" => "Indirizzo",
                "snum_civico" => "Num_civico",
                "slocalita" => "Localita",
                "ccap" => "Cap",
                "cprovincia" => "Provincia",
                "stel_casa" => "Tel_casa",
                "stel_cell" => "Tel_cell",
                "semail" => "Email",
                "ddate_modifica" => "Date_modifica",
                "nid_sog_modifica" => "Id_sog_modifica"
            ));
        }
        
        public function validate() {
            
            //Tipo documento
            if(!empty($this->Tipo_documento))
            {
                if (!preg_match('|^[0-9]+$|', $this->Tipo_documento))
                {
                    $this->errors['Tipo_documento_t'] = 'Hai inserito un TIPO DOCUMENTO DEL TUTORE non corretto.';
                }
            }
            
            //Numero documento
            if(!empty($this->Num_documento))
            {
                if (!preg_match('|^[0-9a-zA-Z ]+$|', $this->Num_documento))
                {
                    $this->errors['Num_documento_t'] = 'Hai inserito un NUMERO DOCUMENTO DEL TUTORE non corretto.';
                }
            }
            else if(!empty($this->Num_documento) && $this->Tipo_documento == 0)
            {					
                $this->errors['Num_documento_t'] = 'Devi scegliere anche il TIPO DI DOCUMENTO DEL TUTORE.';
            }
            else if(empty($this->Num_documento) && $this->Tipo_documento != 0)
            {
                $this->errors['Num_documento_t'] = 'Devi inserire un NUMERO DOCUMENTO DEL TUTORE.';					
            }            
            
            //Nome
            if(empty($this->Nome))
            {
                $this->errors['Nome_t'] = '&Egrave; obbligatorio inserire il NOME DEL TUTORE.';
            }
            else if (!preg_match('|^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $this->Nome))
            {
                $this->errors['Nome_t'] = 'Hai inserito un NOME DEL TUTORE non corretto.';
            }
            
            //Cognome
            if(empty($this->Cognome))
            {
                $this->errors['Cognome_t'] = '&Egrave; obbligatorio inserire il COGNOME DEL TUTORE.';
            }
            else if (!preg_match('|^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $this->Cognome))
            {
                $this->errors['Cognome_t'] = 'Hai inserito un COGNOME DEL TUTORE non corretto.';
            }
            
            //Sesso
            if(empty($this->Sesso))
            {
                $this->errors['Sesso_t'] = '&Egrave; obbligatorio inserire il SESSO DEL TUTORE.';
            }
            
            //Indirizzo
            if(empty($this->Indirizzo))
            {
                $this->errors['Indirizzo_t'] = '&Egrave; obbligatorio inserire un INDIRIZZO DEL TUTORE.';
            }
            else if (!preg_match('|^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $this->Indirizzo))
            {
                $this->errors['Indirizzo_t'] = 'Hai inserito un INDIRIZZO DEL TUTORE non corretto.';
                echo "ciao".$this->Indirizzo;
            }
            
            //Numero civico
            if(empty($this->Num_civico))
            {
                $this->errors['Num_civico_t'] = '&Egrave; obbligatorio inserire il NUMERO CIVICO DEL TUTORE.';
            }
            else if (!preg_match('|^[0-9a-zA-Z/ ]+$|', $this->Num_civico))
            {
                $this->errors['Num_civico_t'] = 'Hai inserito un NUMERO CIVICO DEL TUTORE non corretto.';
                echo "ciao".$this->Num_civico;
            }
            
            //Localita
            if(empty($this->Localita))
            {
                $this->errors['Localita_t'] = '&Egrave; obbligatorio inserire la LOCALIT&Agrave; DEL TUTORE.';
            }
            else if (!preg_match('|^[\.\',0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $this->Localita))
            {
                $this->errors['Localita_t'] = 'Hai inserito una LOCALIT&Agrave; DEL TUTORE non corretta.';
            }
            
            //Provincia
            if(empty($this->Provincia))
            {
                $this->errors['Provincia_t'] = '&Egrave; obbligatorio inserire la PROVINCIA DEL TUTORE.';
            }
            else if (!preg_match('|^[A-Za-z]{2}$|', $this->Provincia))
            {
                $this->errors['Provincia_t'] = 'Hai inserito una PROVINCIA DEL TUTORE non corretta.';
            }
            
            //Cap
            if(empty($this->Cap))
            {
                $this->errors['Cap_t'] = '&Egrave; obbligatorio inserire il C.A.P. DEL TUTORE.';
            }
            else if (!preg_match('|^[0-9]{5}$|', $this->Cap))
            {
                $this->errors['Cap_t'] = 'Hai inserito un C.A.P. DEL TUTORE non corretto.';
            }
            
            //Telofono di casa
            if(!empty($this->Tel_casa))
            {
                if (!preg_match('|^[0-9]{5,12}$|', $this->Tel_casa))
                {
                    $this->errors['Tel_casa_t'] = 'Hai inserito un TELEFONO DI CASA DEL TUTORE non corretto.';
                }
            }
            
            //Telofono cellulare
            if(!empty($this->Tel_cell))
            {
                if (!preg_match('|^[0-9]{8,10}$|', $this->Tel_cell))
                {
                    $this->errors['Tel_cell_t'] = 'Hai inserito un TELEFONO CELLULARE DEL TUTORE non corretto.';
                }
            }
            
            //Email
            if(!empty($this->Email))
            {
                if (!preg_match('|^[a-z0-9\._%-]+@{1,1}[a-z0-9\._%-]+[\.]{1,1}[a-z]{2,6}$|', $this->Email))
                {
                    $this->errors['Email_t'] = 'Hai inserito un E&minus;MAIL DEL TUTORE non corretta.';
                }
            }
            
            //Controllo se sono presenti errori
            if(sizeof($this->errors) > 0)
            {
                return $this->errors;
            }               
        }
        
        public static function GetIdLegalGuardian($objPDO,$id_iscritto) {
            $LegalGuardian = array();
            $strQuery = "SELECT id_tutore FROM tutore WHERE nid_iscritto = :id_iscritto";
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_iscritto',$id_iscritto,PDO::PARAM_INT);
            $objStatement->execute();
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $value)
                {
                    $LegalGuardian = $value;
                }
            }
            return $LegalGuardian;
        }
        
    }
?>

