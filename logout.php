<?php
    require_once './include-php/class.HTTPSession.phpm';
    require './include-php/class.Utility.php';
    require './include-php/class.PDOFactory.php';
    require './include-php/class.DataBoundObject.php';
    require './include-php/class.User.php';
    require './include-php/redirect.php';
    require './include-php/constants.php';
    $objPDO = PDOFactory::GetPDO(NAME_DSN, USERNAME, PASSWORD, array());
    $objSession = new HTTPSession($objPDO);
    $objSession->Impress();
    Utility::SaveLastLogin($objPDO, $objSession->GetUserID());
    $objSession->LogOut();
    redirect("./access.php");
?>

