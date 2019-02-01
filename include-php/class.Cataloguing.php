<?php
    class Cataloguing extends DataBoundObject {
        protected $Isbn;
        protected $Sigla_inv;
        protected $Num_inv;
        protected $Codice;
        protected $Image;
        protected $Titolo;
        protected $Autore;
        protected $Genere;
        protected $Editore;
        protected $Edizione;
        protected $Collana;
        protected $Scaffale;
        protected $Formato;
        protected $Note_formato;
        protected $Pagine;
        protected $Date_catalog;
        protected $Novita;
        protected $Costo;
        protected $Provenienza;
        protected $Lingua_orig;
        protected $Titolo_orig;
        protected $Traduttore;
        protected $Testo_fronte;
        protected $Lingua;
        protected $Nazione;
        protected $Note;
        protected $Alienato;
        protected $Visibile;
        protected $Date_modifica;
        protected $Id_sog_modifica;
        
        protected function DefineTableName() {
            return("catalogazioni");
        }
        
        protected function DefineNameID() {
            return("id_catalog");
        }
        
        protected function DefineRelationMap() {
            return (array(
                "id_catalog" => "ID",
                "sisbn" => "Isbn",
                "csigla_inv" => "Sigla_inv",
                "snum_inv" => "Num_inv",
                "scodice" => "Codice",
                "simage" => "Image",
                "stitolo" => "Titolo",
                "sautore" => "Autore",
                "sgenere" => "Genere",
                "seditore" => "Editore",
                "sedizione" => "Edizione",
                "scollana" => "Collana",
                "sscaffale" => "Scaffale",
                "sformato" => "Formato",
                "snote_formato" => "Note_formato",
                "npagine" => "Pagine",
                "ddate_catalog" => "Date_catalog",
                "enovita" => "Novita",
                "fcosto" => "Costo",
                "sprovenienza" => "Provenienza",
                "elingua_orig" => "Lingua_orig",
                "stitolo_orig" => "Titolo_orig",
                "straduttore" => "Traduttore",
                "etesto_fronte" => "Testo_fronte",
                "slingua" => "Lingua",
                "snazione" => "Nazione",
                "snote" => "Note",
                "ealienato" => "Alienato",
                "evisibile" => "Visibile",
                "ddate_modifica" => "Date_modifica",
                "nid_sog_modifica" => "Id_sog_modifica"
            ));
        }
        
        public function validate() {
            
            //ISBN
            if(!empty($this->Isbn))
            {
                if (!preg_match('|^[0-9]{10,13}$|', $this->Isbn))
                {
                    $this->errors['ISBN'] = 'Hai inserito un CODICE ISBN non corretto.';
                }
            }
            
            //Sigla_inv
            if(empty($this->Sigla_inv))
            {
                $this->errors['Sigla_inv'] = '&Egrave; obbligatorio scegliere la PROPRIET&Agrave;.';
            }
            
            //Num_inv
            if(empty($this->Num_inv))
            {
                $this->errors['Num_inv'] = '&Egrave; obbligatorio inserire il NUMERO INVENTARIO.';
            }
            else if (!preg_match('|^[0-9()]+$|', $this->Num_inv))
            {
                $this->errors['Num_inv'] = 'Hai inserito un NUMERO INVENTARIO non corretto.';
            }

            //Codice Dewey
            if(empty($this->Codice))
            {
                $this->errors['Codice'] = '&Egrave; obbligatorio inserire il CODICE DEWEY.';
            }
            else if (!preg_match('|^[A-Z0-9\. ]+$|', $this->Codice))
            {
                $this->errors['Codice'] = 'Hai inserito un CODICE DEWEY non corretto.';
            }
            
            //Titolo
            if(empty($this->Titolo))
            {
                $this->errors['Titolo'] = '&Egrave; obbligatorio inserire il TITOLO.';
            }
            
            //Autore
            if(empty($this->Autore))
            {
                $this->errors['Autore'] = '&Egrave; obbligatorio inserire il AUTORE.';
            }
            else if (!preg_match('|^[\-\.\&\'\"0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,() ]+$|', $this->Autore))
            {
                $this->errors['Autore'] = 'Hai inserito un AUTORE non corretto.';
            }
            
            //Genere
            if(empty($this->Genere))
            {
                $this->errors['Genere'] = '&Egrave; obbligatorio inserire il GENERE.';
            }
            else if (!preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ()]+$|', $this->Genere))
            {
                $this->errors['Genere'] = 'Hai inserito un GENERE non corretto.';
            }
            
            //Editore
            if(empty($this->Editore))
            {
                $this->errors['Editore'] = '&Egrave; obbligatorio inserire il EDITORE.';
            }
            else if (!preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$|', $this->Editore))
            {
                $this->errors['Editore'] = 'Hai inserito un EDITORE non corretto.';
            }
            
            //Edizione
            if(empty($this->Edizione))
            {
                $this->errors['Edizione'] = '&Egrave; obbligatorio inserire la EDIZIONE.';
            }
            else if (!preg_match('|^[A-Za-z ]+[A-Za-z]+[ ]{1}[-]{1}[ ]{1}[0-9]{4}$|', $this->Edizione))
            {
                $this->errors['Edizione'] = 'Hai inserito una EDIZIONE non corretta.';
            }
            
            //Collana
            if(!empty($this->Collana))
            {
                if (!preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; !]+$|', $this->Collana))
                {
                    $this->errors['Collana'] = 'Hai inserito una COLLANA non corretta.';
                }
            }
            
            //Scaffale
            if(empty($this->Scaffale))
            {
                $this->errors['Scaffale'] = '&Egrave; obbligatorio inserire lo SCAFFALE.';
            }
            else if (!preg_match('|^[0-9A-Z ]+$|', $this->Scaffale))
            {
                $this->errors['Scaffale'] = 'Hai inserito uno SCAFFALE non corretto.';
            }
            
            //Formato
            if(empty($this->Formato))
            {
                $this->errors['Formato'] = '&Egrave; obbligatorio inserire il FORMATO.';
            }
            else if (!preg_match('|^[0-9A-Za-z, \+]+$|', $this->Formato))
            {
                $this->errors['Formato'] = 'Hai inserito un FORMATO non corretto.';
            }
            
            //Note formato
            if(!empty($this->Note_formato))
            {
            }
            
            //Pagine
            if(empty($this->Pagine))
            {
                $this->errors['Pagine'] = '&Egrave; obbligatorio inserire il NUMERO DI PAGINE.';
            }
            else if (!preg_match('|^[0-9]+$|', $this->Pagine))
            {
                $this->errors['Pagine'] = 'Hai inserito un NUMERO DI PAGINE non corretto.';
            }
            
            //Data catalogazione
            if(empty($this->Date_catalog))
            {
                $this->errors['Date_catalog'] = '&Egrave; obbligatorio inserire la DATA CATALOGAZIONE.';
            }
            else if (!preg_match('|^[0-9]{4}-[0-9]{2}-[0-9]{2}$|', $this->Date_catalog))
            {
                $this->errors['Date_catalog'] = 'Hai inserito una DATA CATALOGAZIONE non corretta.';
            }
            
            //Novita
            if(empty($this->Novita))
            {
                $this->errors['Novita'] = '&Egrave; obbligatorio scegliere il campo NOVIT&Agrave;.';
            }
            
            //Costo
            if(empty($this->Costo))
            {
                $this->errors['Costo'] = '&Egrave; obbligatorio inserire il COSTO.';
            }
            else if (!preg_match('|^[0-9\.]+$|', $this->Costo))
            {
                $this->errors['Costo'] = 'Hai inserito un COSTO non corretto.';
            }
            
            //Provenienza
            if(!empty($this->Provenienza))
            {
                if (!preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $this->Provenienza))
                {
                    $this->errors['Provenienza'] = 'Hai inserito una PROVENIENZA non corretta.';
                }
            }
            
            //Lingua originale
            if(empty($this->Lingua_orig))
            {
                $this->errors['Lingua_orig'] = '&Egrave; obbligatorio scegliere il campo LINGUA ORIGINALE.';
            }
            
            //Traduttore
            if(!empty($this->Traduttore))
            {
                if (!preg_match('|^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $this->Traduttore))
                {
                    $this->errors['Traduttore'] = 'Hai inserito un TRADUTTORE non corretto.';
                }
            }
            
            //Testo fronte
            if(empty($this->Testo_fronte))
            {
                $this->errors['Testo_fronte'] = '&Egrave; obbligatorio scegliere il campo TESTO FRONTE.';
            }

            //Lingua
            if(!empty($this->Lingua))
            {
                if (!preg_match('|^[a-zA-Z, ]+$|', $this->Lingua))
                {
                    $this->errors['Lingua'] = 'Hai inserito una LINGUA non corretta.';
                }
            }
            
            //Nazione
            if(empty($this->Nazione))
            {
                $this->errors['Nazione'] = '&Egrave; obbligatorio inserire la NAZIONE.';
            }
            else if (!preg_match('|^[A-Za-z\. ()]+$|', $this->Nazione))
            {
                $this->errors['Nazione'] = 'Hai inserito una NAZIONE non corretta.';
            }
            
            //Note
            if(!empty($this->Note))
            {
            }
            
            //Alienato
            if(empty($this->Alienato))
            {
                $this->errors['Alienato'] = '&Egrave; obbligatorio scegliere il campo ALIENATO.';
            }
            else if ($this->Alienato != "Y" && $this->Alienato != "N")
            {
                $this->errors['Alienato'] = 'Hai inserito un valore per il campo ALIENATO non corretto.';
            }
            
            //Visibie
            if(empty($this->Visibile))
            {
                $this->errors['Visibile'] = '&Egrave; obbligatorio scegliere il campo VISIBILE.';
            }
            else if ($this->Visibile != "Y" && $this->Visibie != "N")
            {
                $this->errors['Visibile'] = 'Hai inserito un valore per il campo VISIBILE non corretto.';
            }
            
            //Controllo se sono presenti errori
            if(sizeof($this->errors) > 0)
            {
                return $this->errors;
            }               
        }
        
        public static function GetIdCataloguing($objPDO,$sigla_inv,$num_inv)
        {
            $Id_catalog = array();
            $strQuery = 'SELECT id_catalog FROM catalogazioni WHERE csigla_inv = :sigla_inv && snum_inv = :num_inv';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':sigla_inv',$sigla_inv,PDO::PARAM_STR);
            $objStatement->bindParam(':num_inv',$num_inv,PDO::PARAM_STR);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row == 1)
            {
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    foreach($arRow as $key => $value)
                    {
                        $Id_catalog[$key] = $value;
                    }
                }
                return $Id_catalog['id_catalog'];
            }
            else
            {
                return 0;
            }
        }
        
        public static function GetIdCataloguingFromISBN($objPDO,$isbn)
        {
            $Id_catalog = array();
            $strQuery = 'SELECT id_catalog FROM catalogazioni WHERE sisbn = :isbn';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':isbn',$isbn,PDO::PARAM_STR);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            if($num_row == 1)
            {
                while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
                {
                    foreach($arRow as $key => $value)
                    {
                        $Id_catalog[$key] = $value;
                    }
                }
                return $Id_catalog['id_catalog'];
            }
            else
            {
                return 0;
            }
        }
        
        public static function ControlExistingCatalog($objPDO,$sigla_inv,$num_inv)
        {
            $strQuery = 'SELECT id_catalog FROM catalogazioni WHERE csigla_inv = :sigla_inv && snum_inv = :num_inv';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':sigla_inv',$sigla_inv,PDO::PARAM_STR);
            $objStatement->bindParam(':num_inv',$num_inv,PDO::PARAM_STR);
            $objStatement->execute();
            $num_row = $objStatement->rowCount();
            return $num_row;
        }
        
        public static function AddAutore($objPDO,$autore)
        {
            $strQuery = 'INSERT IGNORE INTO autori (id_autore, autore) VALUES (NULL, :autore)';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':autore',$autore,PDO::PARAM_STR);
            $objStatement->execute();
        }
        
        public static function AddCollana($objPDO,$collana)
        {
            $strQuery = 'INSERT IGNORE INTO collane (id_collana, collana) VALUES (NULL, :collana)';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':collana',$collana,PDO::PARAM_STR);
            $objStatement->execute();
        }
        
        public static function AddEditore($objPDO,$editore)
        {
            $strQuery = 'INSERT IGNORE INTO editori (id_editore, editore) VALUES (NULL, :editore)';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':editore',$editore,PDO::PARAM_STR);
            $objStatement->execute();
        }
        
        public static function AddFormato($objPDO,$formato)
        {
            $strQuery = 'INSERT IGNORE INTO formati (id_formato, formato) VALUES (NULL, :formato)';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':formato',$formato,PDO::PARAM_STR);
            $objStatement->execute();
        }
        
        public static function AddGenere($objPDO,$genere)
        {
            $strQuery = 'INSERT IGNORE INTO generi (id_genere, genere) VALUES (NULL, :genere)';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':genere',$genere,PDO::PARAM_STR);
            $objStatement->execute();
        }
        
        public static function AddNazione($objPDO,$nazione)
        {
            $strQuery = 'INSERT IGNORE INTO nazioni (id_nazione, nazione) VALUES (NULL, :nazione)';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':nazione',$nazione,PDO::PARAM_STR);
            $objStatement->execute();
        }
        
        public static function AddScaffale($objPDO,$scaffale)
        {
            $strQuery = 'INSERT IGNORE INTO scaffali (id_scaffale, scaffale) VALUES (NULL, :scaffale)';
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':scaffale',$scaffale,PDO::PARAM_STR);
            $objStatement->execute();
        }
        
        public static function SaveImageCatalog($objPDO,$catalog_id,$image)
        {
            $strQuery = "UPDATE catalogazioni SET simage = :image WHERE id_catalog = :catalog_id";
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':catalog_id',$catalog_id,PDO::PARAM_INT);
            $objStatement->bindParam(':image',$image,PDO::PARAM_STR);
            return $objStatement->execute();
        }
    }
?>

