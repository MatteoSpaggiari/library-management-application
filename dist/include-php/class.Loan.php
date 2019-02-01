<?php
    class Loan extends DataBoundObject {
        protected $Id_catalog;
        protected $Id_iscritto;
        protected $Date_pres;
        protected $Date_res;
        protected $Resa;
        protected $Date_modifica;
        protected $Id_sog_modifica;

        protected function DefineTableName() {
            return("prestiti");
        }
        
        protected function DefineNameID() {
            return("id_prestito");
        }
        
        protected function DefineRelationMap() {
            return (array(
                "id_prestito" => "ID",
                "nid_catalog" => "Id_catalog",
                "nid_iscritto" => "Id_iscritto",
                "ddate_pres" => "Date_pres",
                "ddate_res" => "Date_res",
                "eresa" => "Resa",
                "ddate_modifica" => "Date_modifica",
                "nid_sog_modifica" => "Id_sog_modifica"
            ));
        }
        
        public function validate() {
            
            //Id Catalogazione
            if(empty($this->Id_catalog))
            {
                $this->errors['Id_catalog'] = '&Egrave; obbligatorio scegliera una CATALOGAZIONE.';
            }
            else if (!preg_match('|^[0-9]+$|', $this->Id_catalog))
            {
                $this->errors['Id_catalog'] = 'Hai inserito una CATALOGAZIONE non corretta.';
            }
            
            //Id Iscritto
            if(empty($this->Id_iscritto))
            {
                $this->errors['Id_iscritto'] = '&Egrave; obbligatorio scegliere il NUMERO TESSERA DELL\'ISCRITTO.';
            }
            else if (!preg_match('|^[0-9]+$|', $this->Id_iscritto))
            {
                $this->errors['Id_iscritto'] = 'Hai inserito un NUMERO TESSERA DELL\'ISCRITTO non corretto.';
            }
            
            //Data Prestito
            if(empty($this->Date_pres))
            {
                $this->errors['Date_prestito'] = '&Egrave; obbligatorio inserire la DATA DEL PRESTITO.';
            }
            else if (!preg_match('|^[0-9]{4}-[0-9]{2}-[0-9]{2}[ ]{1}[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}$|', $this->Date_pres))
            {
                $this->errors['Date_prestito'] = 'Hai inserito una DATA DEL PRESTITO non corretta.';
            }
            
            //Data Restituzione
            if(empty($this->Date_res))
            {
                $this->errors['Date_restituzione'] = '&Egrave; obbligatorio inserire la DATA DELLA RESTITUZIONE.';
            }
            else if (!preg_match('|^[0-9]{4}-[0-9]{2}-[0-9]{2}[ ]{1}[0-9]{2}[:]{1}[0-9]{2}[:]{1}[0-9]{2}$|', $this->Date_res))
            {
                $this->errors['Date_restituzione'] = 'Hai inserito una DATA DELLA RESTITUZIONE non corretta.';
            }
            
            //Resa
            if(empty($this->Resa))
            {
                $this->errors['Resa'] = '&Egrave; obbligatorio inserire la RESA.';
            }
            else if ($this->Resa != "Y" && $this->Resa != "N")
            {
                $this->errors['Resa'] = 'Hai inserito un valore per RESA non corretto.';
            }
            
            //Controllo se sono presenti errori
            if(sizeof($this->errors) > 0)
            {
                return $this->errors;
            }               
        }
        
        public static function ControlIfLent($objPDO,$id_catalog)
        {
            $strQuery = 'SELECT eresa FROM prestiti WHERE nid_catalog = :id_catalog && eresa = "N"';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_catalog',$id_catalog,PDO::PARAM_INT);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row > 0)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        
        public static function ControlNumberLents($objPDO,$id_iscritto)
        {
            $strQuery = 'SELECT eresa FROM prestiti WHERE nid_iscritto = :id_iscritto && eresa = "N"';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':id_iscritto',$id_iscritto,PDO::PARAM_INT);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            return $num_row;
        }
                
    }
?>

