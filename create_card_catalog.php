<?php
    $page = "";
    include('./include-php/head.php');
    //CONTROLLO se mi viene passato (QUERY URL) un ID ACTALOGAZIONE altrimenti rimando alla pagina index
    if(isset($_GET['id_catalog']) && !empty($_GET['id_catalog']) && preg_match('|^[0-9]+$|', $_GET['id_catalog']))
    {
        $Id_catalog = trim($_GET['id_catalog']);
    }
    else
    {
        redirect('./index.php');
        exit();
    }
    //CONTROLLO se mi viene passato (QUERY URL)  il TIPO, OVVERO LA FACCIATA DELLA SCHEDA (se fronte o retro) ed IMPOSTO LA VARIABILE TEMPORANEA altrimenti rimando alla pagina index
    if(isset($_GET['tipo']))
    {
        $Tipo = trim($_GET['tipo']);
    }
    else
    {
        redirect('./index.php');
        exit();            
    }
    
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
    <head>
        <!-- HTML5 -->
        <meta charset="ISO-8859-1" />
        <!-- Versioni precedenti di HTML5 -->
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />		
        <script type="text/javascript" src="./js/jquery-1.9.1.min.js"></script>
        <script type="text/javascript" src="./js/jquery-ui-1.10.3.custom.min.js"></script>
        <link rel="stylesheet" type="text/css"  href="./css/start/jquery-ui.min.css" />
        <link rel="icon" type="image/x-icon"  href="./images/favicon.ico" />
        <link type="text/css" rel="stylesheet" href="./css/create_card.css" />
        <link type="text/css" rel="stylesheet" media="print" href="./css/print_card.css" />
        <script type="text/javascript">
            $(document).ready(function(){
               $('.button').button(); 
            });
        </script>
        <title>Stampa Scheda Catalogazione</title>
    </head>
    <body style="background: #fff none;">
<?php
    if($Tipo == "fronte") {
        $objCatalog = new Cataloguing($objPDO,$Id_catalog);
        //Se il TITOLO è troppo lungo lo diminuisco
        if(strlen($objCatalog->getTitolo()) > 45)
        {
            $Titolo = substr($objCatalog->getTitolo(), 0, 45);
            $Titolo = $Titolo."...";
        }
        else
        {
            $Titolo = $objCatalog->getTitolo();
        }
        if(strlen($objCatalog->getAutore()) > 28)
        {
            $Autore = substr($objCatalog->getAutore(), 0, 28);
            $Autore = $Autore."...";
        }
        else
        {
            $Autore = $objCatalog->getAutore();
        }
        echo "\n";
?>
        <div id="stampa_scheda_catalog" role="main">
            <table class="info_cat_m">
                <tr>
                    <td class="margine" colspan="3"></td>
                </tr>
                <tr>
                    <td class="novita prima" colspan="3">
                        <?php ($objCatalog->getNovita() == 'Y' ? print('non rinnovabile'."\n") : print('rinnovabile'."\n")); ?>
                    </td>
                </tr>
                <tr>
                    <td class="autore prima">
                        <?php echo Utility::NoInfo($Autore) ?>
                    </td>
                    <td class="prop_dewey prima">
                        <?php echo Utility::NoInfo('<span class="proprieta">'.$objCatalog->getSigla_inv().'</span> '.$objCatalog->getNum_inv().' &minus; '.$objCatalog->getCodice()); ?>
                    </td>
                    <td class="scaffale prima">
                         <?php echo Utility::NoInfo($objCatalog->getScaffale()); ?>
                   </td>
                </tr>
            </table>
            <table class="aut_edi">
                <tr>
                    <td class="titolo">
                         <?php echo Utility::NoInfo($Titolo); ?>
                    </td>
                    <td class="edizione">
                         <?php echo Utility::NoInfo($objCatalog->getEdizione()); ?>                       
                    </td>
                </tr>
            </table>
            <table class="info_prestito prima">
                <tr>
                    <th class="ute">
                        Utente
                    </th>
                    <th class="d_p">
                        Data prestito
                    </th>
                    <th class="d_r">
                        Data restituzione
                    </th>
                    <th class="fir">
                        Firma utente
                    </th>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
            </table>
            <table class="info_cat">
                <tr>
                    <td class="novita" colspan="3">
                        <?php ($objCatalog->getNovita() == 'Y' ? print('non rinnovabile'."\n") : print('rinnovabile'."\n")); ?>
                    </td>
                </tr>
                <tr>
                    <td class="autore">
                        <?php echo Utility::NoInfo($objCatalog->getAutore()) ?>
                    </td>
                    <td class="prop_dewey">
                        <?php echo Utility::NoInfo('<span class="proprieta">'.$objCatalog->getSigla_inv().'</span> '.$objCatalog->getNum_inv().' &minus; '.$objCatalog->getCodice()); ?>
                    </td>
                    <td class="scaffale">
                         <?php echo Utility::NoInfo($objCatalog->getScaffale()); ?>
                   </td>
                </tr>
            </table>
            <table class="aut_edi">
                <tr>
                    <td class="titolo">
                         <?php echo Utility::NoInfo($Titolo); ?>
                    </td>
                    <td class="edizione">
                         <?php echo Utility::NoInfo($objCatalog->getEdizione()); ?>                       
                    </td>
                </tr>
            </table>
            <table class="info_prestito">
                <tr>
                    <th class="ute">
                        Utente
                    </th>
                    <th class="d_p">
                        Data prestito
                    </th>
                    <th class="d_r">
                        Data restituzione
                    </th>
                    <th class="fir">
                        Firma utente
                    </th>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
            </table>
            <button id="stampa" class="button" onclick="print();">Stampa</button>
            <a id="retro" class="button" alt="Retro" title="Retro" href="./create_card_catalog.php?id_catalog=<?php echo $Id_catalog; ?>&tipo=retro">Retro</a>
            <a id="torna" class="button" alt="Torna" title="Torna" href="./card_catalog.php?id_catalog=<?php echo $Id_catalog; ?>">Torna</a>
<?php
    } else if($Tipo == "retro") {
?>

        <div id="stampa_scheda_catalog" class="retro" role="main">
            <table class="retro prima">
                <tr>
                    <th class="ute">
                        Utente
                    </th>
                    <th class="d_p">
                        Data prestito
                    </th>
                    <th class="d_r">
                        Data restituzione
                    </th>
                    <th class="fir">
                        Firma utente
                    </th>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
            </table>
            <table class="retro">
                <tr>
                    <th class="ute">
                        Utente
                    </th>
                    <th class="d_p">
                        Data prestito
                    </th>
                    <th class="d_r">
                        Data restituzione
                    </th>
                    <th class="fir">
                        Firma utente
                    </th>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                </tr>
            </table>
            <button id="stampa" class="button retro" onclick="print();">Stampa</button>
            <a id="fronte" class="button retro" alt="Fronte" title="Fronte" href="./create_card_catalog.php?id_catalog=<?php echo $Id_catalog; ?>&tipo=fronte">Fronte</a>
            <a id="torna" class="button retro" alt="Torna" title="Torna" href="./card_catalog.php?id_catalog=<?php echo $Id_catalog; ?>">Torna</a>
<?php
    }
    include('./include-php/end_gestione.php');
?>