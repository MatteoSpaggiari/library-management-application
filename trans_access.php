<?php
    header('Content-Type: text/html; charset=Latin-1'); 
    require_once './include-php/class.HTTPSession.phpm';
    require './include-php/class.PDOFactory.php';
    require './include-php/class.DataBoundObject.php';
    require './include-php/class.User.php';
    require './include-php/class.Utility.php';
    require_once './include-php/redirect.php';
    require './include-php/constants.php';
    $Errors = array();
    $objPDO = PDOFactory::GetPDO(NAME_DSN, USERNAME, PASSWORD, array());
    $objSession = new HTTPSession($objPDO);
    $objSession->Impress();
    $SessionIdentifier = $objSession->GetSessionIdentifier();
    if(isset($SessionIdentifier) && isset($_POST['send-login']))
    {
        if($SessionIdentifier != "")
        {
            $username = (isset($_POST['username']) ? trim($_POST['username']) : '');
            $password = (isset($_POST['password']) ? trim($_POST['password']) : '');
            #Elimino gli eventuali Errori Salvati in un precedente invio dei dati
            $objSession->deleteErrorsLogin();
            #Elimino gli eventuali Campi Salvati in un precedente invio dei dati
            $objSession->deleteFieldsValueLogin();
            #Salvo in Variabili diSessione i Valori inserite dall'utente
            $objSession->fl_Username = $username;
            $objSession->fl_Password = $password;
            $Errors = $objSession->validateLogin($username,$password);
            if(sizeof($Errors) > 0)
            {
                foreach ($Errors as $key => $value)
                {
                    $key_m = 'el_'.$key;
                    $objSession->$key_m = $Errors[$key];
                }
                redirect('./access.php');
            }
            else
            {
                $objSession->deleteFieldsValueLogin();
                if($objSession->Login($username,$password))
                {
                    
                    redirect('./index.php');
                }
                else
                {
                    redirect('./info_page.php?type=error_login');
                }
            }
        }
    }
    else
    {
        redirect('./access.php');
    }
?>

