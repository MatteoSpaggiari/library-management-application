<?php
    header('Content-Type: text/html; charset=Latin-1'); 
    require './class.HTTPSession.phpm';
    require './class.PDOFactory.php';
    require './class.DataBoundObject.php';
    require './class.User.php';
    require './class.Subscriber.php';
    require './class.Cataloguing.php';
    require './redirect.php';
    require './constants.php';
    require './class.Utility.php';
    $Errors = array();
    $objPDO = PDOFactory::GetPDO(NAME_DSN, USERNAME, PASSWORD, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
    $objSession = new HTTPSession($objPDO);
    $objSession->Impress();
    if(!($objSession->IsLoggedIn()))
    {
        redirect('./access.php');
    }
    else
    {
        #Recupero i dati dell'utente
        $objUser = $objSession->GetUserObject();            
    }
    if(isset($_GET['term'])) {
        $value_j = $_GET['term'];		
    }
    if(isset($_GET['valore'])) {
        $value = trim($_GET['valore']);
    }
    if(isset($_GET['valore_inv'])) {
        $value_inv = trim($_GET['valore_inv']);
    }
    if(isset($_GET['valore_sigla'])) {
        $value_sigla = trim($_GET['valore_sigla']);
    }
    if(isset($_GET['valore_num_tessera'])) {
        $value_num_tessera = trim($_GET['valore_num_tessera']);
    }
    if(isset($_GET['id_sospeso'])) {
        $value_id_sospeso = trim($_GET['id_sospeso']);
    }
    if(isset($_GET['motivazione'])) {
        $value_motivazione = trim($_GET['motivazione']);
    }
    switch($_REQUEST['tipo']) {
        case 'isbn':
            $siglianuminv = Utility::GetProprietaNumInvSelect($objPDO, $value);
            echo $siglianuminv;
        break;
        case 'proprieta':
            $proprieta = Utility::GetNumInvMax($objPDO, $value);
            echo $proprieta;
        break;
        case "dewey":
            $dewey = Utility::GetCodDeweySelect($objPDO, $value);
            echo $dewey;
        break;		
        case "titolo":
            $titolo = Utility::GetTitoloSelect($objPDO, $value);
            echo $titolo;
        break;
        case "autore":
            $autore = Utility::GetAutoreSelect($objPDO, $value);
            echo $autore;
        break;
        case "genere":
            $genere = Utility::GetGenereSelect($objPDO, $value);
            echo $genere;
        break;
        case "editore":
            $editore = Utility::GetEditoreSelect($objPDO, $value);
            echo $editore;
        break;
        case "collana":
            $collana = Utility::GetCollanaSelect($objPDO, $value);
            echo $collana;
        break;
        case "scaffale":
            $scaffale = Utility::GetScaffaleSelect($objPDO, $value);
            echo $scaffale;
        break;
        case "formato":
            $formato = Utility::GetFormatoSelect($objPDO, $value);
            echo $formato;
        break;
        case "nazione":
            $nazione = Utility::GetNazioneSelect($objPDO, $value);
            echo $nazione;
        break;
        case "professione":
            $professione = Utility::GetProfessioneSelect($objPDO, $value);
            echo $professione;
        break;
        case "indirizzo":
            $indirizzo = Utility::GetIndirizzoSelect($objPDO, $value);
            echo $indirizzo;
        break;
        case "localita":
            $localita = Utility::GetLocalitaSelect($objPDO, $value);
            echo $localita;
        break;
        case "localita_c":
            $localita_c = Utility::GetProvinciaCapSelect($objPDO, $value);
            echo $localita_c;
        break;
        case "provincia":
            $provincia = Utility::GetProvinciaSelect($objPDO, $value);
            echo $provincia;
        break;
        case "cap":
            $cap = Utility::GetCapSelect($objPDO, $value);
            echo $cap;
        break;
        case "num_inv_p":
            $Scheda_catalog = Utility::GetSchedaCataloguing($objPDO, $value_sigla, $value_inv);
            echo $Scheda_catalog;
        break;
        case "num_tes_p":
            $Scheda_iscritto = Utility::GetSchedaSubscriber($objPDO, $value_num_tessera);
            echo $Scheda_iscritto;
        break;
        case "nome":
            $nome = Utility::GetNomeSelect($objPDO, $value);
            echo $nome;
        break;
        case "cognome":
            $cognome = Utility::GetCognomeSelect($objPDO, $value);
            echo $cognome;
        break;
        case "motivazione":
            $Motivazione = Utility::AddMotivazione($objPDO, $value_motivazione, $value_id_sospeso);
            if($Motivazione == 1) {
                echo "1";
            } else {
                echo "0";			
            }
        break;
    }
?>