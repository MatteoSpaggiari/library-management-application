<?php
    class User extends DataBoundObject {
        protected $Username;
        protected $Password;
        protected $Access_level;
        protected $Name;
        protected $Surname;
        protected $Sex;
        protected $Image_profile;
        protected $Last_login;
        protected $Is_user;
        protected $Is_block;
        

        protected function DefineTableName() {
            return("users");
        }
        
        protected function DefineNameID() {
            return("user_id");
        }
        
        protected function DefineRelationMap() {
            return (array(
                "user_id" => "ID",
                "susername" => "Username",
                "cpassword" => "Password",
                "naccess_level" => "Access_level",
                "sname" => "Name",
                "ssurname" => "Surname",
                "esex" => "Sex",
                "simage_profile" => "Image_profile",
                "dlast_login" => "Last_login",
                "eis_user" => "Is_user",
                "eis_block" => "Is_block"
            ));
        }
        
        public function validate() {
            //Username
            if(empty($this->Username))
            {
                $this->errors['Username'] = '&Egrave; obbligatorio inserire la Email.';
            }
            else
            {
                if(strlen($this->Username) > 100)
                {
                    $this->errors['Username'] = 'Hai inserito una E&minus;MAIL troppo lunga (max 150 caratteri).';
                }
                else if(!preg_match('|^[a-z0-9\._%-]+@{1,1}[a-z0-9\._%-]+[\.]{1,1}[a-z]{2,6}$|', $this->Username))
                {
                    $this->errors['Username'] = 'Hai inserito una E&minus;MAIL non corretta.';
                }
            }
            
            //Password
            if(empty($this->Password))
            {
                $this->errors['Password'] = '&Egrave; obbligatorio inserire la Password.';
            }

            //Access Level
            if(!empty($this->Access_level))
            {
                if(!preg_match('|^[0-9]$|', $this->Access_level))
                {
                    $this->errors['Access_level'] = 'Hai inserito un Livello Di Accesso non valido.';
                }
            }
            
            //Image Profile
            if(!empty($this->Image_profile))
            {
                if(strlen($this->Image_profile) > 255)
                {
                    $this->errors['Image_profile'] = 'Hai dato un nome troppo lungo al File Immagine (max 255 caratteri).';
                }
            }
            
            //Is User
            if(!empty($this->Is_user))
            {
                if($this->Is_user != "Y" && $this->Is_user != "N")
                {
                    $this->errors['Is_user'] = 'Valore non corretto per Utente Confermato.';
                }
            }
            
            //Is Block
            if(!empty($this->Is_block))
            {
                if($this->Is_block != "Y" && $this->Is_block != "N")
                {
                    $this->errors['Is_block'] = 'Valore non corretto per Utente Bloccato.';
                }
            }
            
            //Last Login
            if(!empty($this->Last_login))
            {
                if(!preg_match('|^[0-9]{4}-[0-9]{2}-[0-9]{2}[ ]{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$|', $this->Last_login))
                {
                    $this->errors['Last_login'] = 'Valore non corretto per Data e Tempo Ultima Connessione.';
                }
            }
            
            //Name
            if(!empty($this->Name))
            {
                $this->Name = ucwords($this->Name);
                if(strlen($this->Name) > 150)
                {
                    $this->errors['Name'] = 'Hai inserito un Nome troppo lungo (max 150 caratteri).';
                }
                else if(!preg_match('|^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $this->Name))
                {
                    $this->errors['Name'] = 'Hai inserito un Nome non corretto.';                
                }
            }
            
            //Surname
            if(!empty($this->Surname))
            {
                $this->Surname = ucwords($this->Surname);
		if(strlen($this->Surname) > 150)
                {
                    $this->errors['Surname'] = 'Hai inserito un Cognome troppo lungo (max 150 caratteri).';
                }
                else if(!preg_match('|^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$|', $this->Surname))
                {
                    $this->errors['Surname'] = 'Hai inserito un Cognome non corretto.';                
                }
            }
            
            //Sex
            if(!empty($this->Sex))
            {
                if($this->Sex != "M" && $this->Sex != "F")
                {
                    $this->errors['Sex'] = 'Valore non corretto per Sesso.';
                }
            }
         
            //Controllo se sono presenti errori
            if(sizeof($this->errors) > 0)
            {
                return $this->errors;
            }               
        }
        
        public static function GetProfileUser($objPDO,$user_id,$old_password) {
            $ProfileUser = array();
            $strQuery = "SELECT * FROM users WHERE user_id = :user_id && cpassword = PASSWORD(:old_password)";
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':user_id',$user_id,PDO::PARAM_INT);
            $objStatement->bindParam(':old_password',$old_password,PDO::PARAM_STR);
            $objStatement->execute();
            while($arRow = $objStatement->fetch(PDO::FETCH_ASSOC))
            {
                foreach($arRow as $key => $value)
                {
                    $ProfileUser[$key] = $value;
                }
            }
            return $ProfileUser;
        }
        
        public static function changePasswordUser($objPDO,$user_id,$newpassword)
        {
            $strQuery = "UPDATE users SET cpassword = PASSWORD(:new_password) WHERE user_id = :user_id";
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':user_id',$user_id,PDO::PARAM_INT);
            $objStatement->bindParam(':new_password',$newpassword,PDO::PARAM_STR);
            return $objStatement->execute();
        }
        
        public static function SaveImageUser($objPDO,$user_id,$image)
        {
            $strQuery = "UPDATE users SET simage_profile = :image WHERE user_id = :user_id";
            $objStatement = $objPDO->prepare($strQuery);
            $objStatement->bindParam(':user_id',$user_id,PDO::PARAM_INT);
            $objStatement->bindParam(':image',$image,PDO::PARAM_STR);
            return $objStatement->execute();
        }
        
        public static function validateLogin($strUsername, $strPassword)
        {
            $Errors = array();
            //Username
            if(empty($strUsername))
            {
                $Errors['Username'] = '&Egrave; obbligatorio inserire la Email.';
            }
            else
            {
                if(strlen($strUsername) > 100)
                {
                    $Errors['Username'] = 'Hai inserito una E&minus;MAIL troppo lunga (max 150 caratteri).';
                }
                else if(!preg_match('|^[a-z0-9\._%-]+@{1,1}[a-z0-9\._%-]+[\.]{1,1}[a-z]{2,6}$|', $strUsername))
                {
                    $Errors['Username'] = 'Hai inserito una E&minus;MAIL non corretta.';
                }
            }
            //Password
            if(empty($strPassword))
            {
                $Errors['Password'] = '&Egrave; obbligatorio inserire la Password.';
            }
            return $Errors;
        }
    }
?>

