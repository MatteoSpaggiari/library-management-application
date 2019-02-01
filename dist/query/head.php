<?php
    header('Content-Type: text/html; charset=Latin-1'); 
    require '../include-php/class.HTTPSession.phpm';
    require '../include-php/class.PDOFactory.php';
    require '../include-php/class.DataBoundObject.php';
    require '../include-php/class.User.php';
    require '../include-php/class.Subscriber.php';
    require '../include-php/class.LegalGuardian.php';
    require '../include-php/class.Cataloguing.php';
    require '../include-php/class.Loan.php';
    require '../include-php/class.Utility.php';
    require '../include-php/redirect.php';
    require '../include-php/constants.php';
    $Errors = array();
    $objPDO = PDOFactory::GetPDO(NAME_DSN, USERNAME, PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $objSession = new HTTPSession($objPDO);
    $objSession->Impress();
    if(!($objSession->IsLoggedIn()))
    {
        redirect('../access.php');
    }
    else
    {
        #Recupero i dati dell'utente
        $objUser = $objSession->GetUserObject();            
    }
?>
