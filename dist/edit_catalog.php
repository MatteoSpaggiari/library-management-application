<?php
    $page = "";
    include('./include-php/head.php');
    echo "\n";
    if(isset($_GET['id_catalog']) && !empty($_GET['id_catalog']) && preg_match('|^[0-9]+$|', $_GET['id_catalog']))
    {
        $Id_catalog = trim($_GET['id_catalog']);
        $objCatalog = new Cataloguing($objPDO,$Id_catalog);
    }
    else
    {
        redirect('./index.php');
        exit();
    }
    include('./include-php/intro.php');
?>
        <style type="text/css">
            form#nuova_catalog fieldset div.data {
                left: 196px;
            }
        </style>
        <title>Modifica Catalogazione</title>
    </head>
    <body>
<?php
    include_once("./include-php/menu.php");
    ((isset($_GET['successo']) && $_GET['successo'] != '') ? print('<div id="error">'.$_GET['successo'].'</div>') : '');

    //Se ci sono errori nell'inserimento
    $Errors = array();
    $Errors = $objSession->getErrorEditCatalog();
    if(sizeof($Errors) > 0)
    {
        echo '<div id="errors"><ul>';
        foreach($Errors as $key => $value)
        {
            echo '<li>'.$Errors[$key].'</li>';
        }
        echo '</ul></div>';
    };
    $FieldsValue = array();
    $FieldsValue = $objSession->getFieldsValueEditCatalog();
    echo "\n";
?>
        <div id="errore" class="dialog"><?php isset($_GET['errore']) ? print(replace(urldecode($_GET['errore']))) : ""; ?></div>
        <div id="corpo" class="corpo" role="main">
            <form id="edit_catalog" class="form catalogazione" name="edit_catalog" method="post" action="./trans_global.php" enctype="application/x-www-form-urlencoded" target="_self">
                <fieldset>
                    <h2>Modifica Catalogazione</h2>
                    <div class="center container-button add-image"><button id="add-image-catalog"><img alt="Immagine Catalogazione" title="Aggiungi Immagine Catalogazione" src="<?php echo $objCatalog->getImage(); ?>" /></button></div>
                    <ul>
                        <li><label>ISBN: </label><input id="isbn" class="focus corto" type="text" name="isbn" size="15" maxlength="13" autocomplete="off" value="<?php isset($FieldsValue['sec_ISBN']) ? print(htmlspecialchars($FieldsValue['sec_ISBN'])) : (!empty($objCatalog->getIsbn()) ? print($objCatalog->getIsbn()) : '') ?>" placeholder="es. 9788850330119" autofocus="autofocus" /></li>
                        <li class="li-container-radio">
                            <label>Propriet&agrave;: </label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input id="papillon" class="radio" type="radio" name="proprieta" value="P" <?php (isset($FieldsValue['sec_PROPRIETA']) && $FieldsValue['sec_PROPRIETA'] == "P") ? print('checked="checked"') : ((!empty($objCatalog->getSigla_inv()) && $objCatalog->getSigla_inv() == "P") ? print('checked="checked"') : "") ?> />
                                    <label for="papillon">Papillon</label>
                                </li>
                                <li tabindex="0">
                                    <input id="comune" class="radio" type="radio" name="proprieta" value="C" <?php (isset($FieldsValue['sec_PROPRIETA']) && $FieldsValue['sec_PROPRIETA'] == "C") ? print('checked="checked"') : ((!empty($objCatalog->getSigla_inv()) && $objCatalog->getSigla_inv() == "C") ? print('checked="checked"') : "") ?> />
                                    <label for="comune">comune</label>
                                </li>
                                <li tabindex="0">
                                    <input id="festival" class="radio" type="radio" name="proprieta" value="F" <?php (isset($FieldsValue['sec_PROPRIETA']) && $FieldsValue['sec_PROPRIETA'] == "F") ? print('checked="checked"') : ((!empty($objCatalog->getSigla_inv()) && $objCatalog->getSigla_inv() == "F") ? print('checked="checked"') : "") ?> />
                                    <label for="festival">festival</label>
                                </li>
                            </ul>
                        </li>
                        <li><label>Numero Inventario: </label><input id="num_inv" class="focus corto" type="text" name="num_inv" size="15" maxlength="15" autocomplete="off" value="<?php isset($FieldsValue['sec_NUMERO_INVENTARIO']) ? print(htmlspecialchars($FieldsValue['sec_NUMERO_INVENTARIO'])) : (!empty($objCatalog->getNum_inv()) ? print($objCatalog->getNum_inv()) : '') ?>" placeholder="es. 00345" /></li>
                        <li><label>Codice Dewey: </label><input id="dewey" class="focus maiuscolo corto" type="text" name="dewey" size="15" maxlength="22" autocomplete="off" value="<?php isset($FieldsValue['sec_CODICE_DEWEY']) ? print(htmlspecialchars($FieldsValue['sec_CODICE_DEWEY'])) : (!empty($objCatalog->getCodice()) ? print($objCatalog->getCodice()) : '') ?>" placeholder="es. 808.387 MOO" /></li>
                        <li><label>Titolo: </label><input id="titolo" class="focus lungo" type="text" name="titolo" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['sec_TITOLO']) ? print(htmlspecialchars($FieldsValue['sec_TITOLO'])) : (!empty($objCatalog->getTitolo()) ? print($objCatalog->getTitolo()) : '') ?>" placeholder="es. Paradiso perduto" /></li>
                        <li><label>Autore: </label><input id="autore" class="focus capitalize lungo" type="text" name="autore" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['sec_AUTORE']) ? print(htmlspecialchars($FieldsValue['sec_AUTORE'])) : (!empty($objCatalog->getAutore()) ? print($objCatalog->getAutore()) : '') ?>" placeholder="es. Pirandello Luigi" /></li>
                        <li><label>Genere: </label><input id="genere" class="focus lungo" type="text" name="genere" size="50" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sec_GENERE']) ? print(htmlspecialchars($FieldsValue['sec_GENERE'])) : (!empty($objCatalog->getGenere()) ? print($objCatalog->getGenere()) : '') ?>" placeholder="es. Gialli &minus; Thriller" /></li>
                        <li><label>Editore: </label><input id="editore" class="focus medio" type="text" name="editore" size="50" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sec_EDITORE']) ? print(htmlspecialchars($FieldsValue['sec_EDITORE'])) : (!empty($objCatalog->getEditore()) ? print($objCatalog->getEditore()) : '') ?>" placeholder="es. Rizzoli" /></li>
                        <li><label>Edizione: </label><input class="focus capitalize medio" type="text" name="edizione" size="50" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sec_EDIZIONE']) ? print(htmlspecialchars($FieldsValue['sec_EDIZIONE'])) : (!empty($objCatalog->getEdizione()) ? print($objCatalog->getEdizione()) : '') ?>" placeholder="es. Torino &minus; 1965" /></li>
                        <li><label>Collana: </label><input id="collana" class="focus medio" type="text" name="collana" size="50" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sec_COLLANA']) ? print(htmlspecialchars($FieldsValue['sec_COLLANA'])) : (!empty($objCatalog->getCollana()) ? print($objCatalog->getCollana()) : '') ?>" placeholder="es. Superbur" /></li>
                        <li><label>Scaffale: </label><input id="scaffale" class="focus maiuscolo corto" type="text" name="scaffale" size="12" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sec_SCAFFALE']) ? print(htmlspecialchars($FieldsValue['sec_SCAFFALE'])) : (!empty($objCatalog->getScaffale()) ? print($objCatalog->getScaffale()) : '') ?>" placeholder="es. 01 B" /></li>
                        <li><label>Formato: </label><input id="formato" class="focus corto" type="text" name="formato" size="12" maxlength="30" autocomplete="off" value="<?php isset($FieldsValue['sec_FORMATO']) ? print(htmlspecialchars($FieldsValue['sec_FORMATO'])) :  (!empty($objCatalog->getFormato()) ? print($objCatalog->getFormato()) : '') ?>" placeholder="es. 17,5 x 10,5" />&nbsp;cm</li>
                        <li><label>Note Formato: </label><input id="note_formato" class="focus lungo" type="text" name="note_formato" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['sec_NOTE_FORMATO']) ? print(htmlspecialchars($FieldsValue['sec_NOTE_FORMATO'])) : (!empty($objCatalog->getNote_formato()) ? print($objCatalog->getNote_formato()) : '') ?>" /></li>
                        <li><label>Pagine: </label><input id="pagine" class="focus corto" type="number" min="1" max="10000" name="pagine" size="12" maxlength="5" autocomplete="off" value="<?php isset($FieldsValue['sec_PAGINE']) ? print(htmlspecialchars($FieldsValue['sec_PAGINE'])) : (!empty($objCatalog->getPagine()) ? print($objCatalog->getPagine()) : '') ?>" placeholder="es. 202" /></li>
                        <li><label>Data Catalogazione: </label><input id="data_c" class="focus corto" type="date" name="data_c" size="12" maxlength="10" autocomplete="off" value="<?php isset($FieldsValue['sec_DATA_CATALOGAZIONE']) ? print(htmlspecialchars($FieldsValue['sec_DATA_CATALOGAZIONE'])) : (!empty($objCatalog->getDate_catalog()) ? print($objCatalog->getDate_catalog()) : '') ?>" placeholder="es. 2013-01-01" /></li>
                        <li class="li-container-radio">
                            <label>Novit&agrave;: </label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input class="radio" type="radio" name="novita" value="Y" <?php (isset($FieldsValue['sec_NOVITA']) && $FieldsValue['sec_NOVITA'] == "Y") ? print('checked="checked"') : ((!empty($objCatalog->getNovita()) && $objCatalog->getNovita() == "Y") ? print('checked="checked"') : "") ?> />&nbsp;Si
                                </li>
                                <li>
                                    <input class="radio" type="radio" name="novita" value="N" <?php (isset($FieldsValue['sec_NOVITA']) && $FieldsValue['sec_NOVITA'] == "N") ? print('checked="checked"') : ((!empty($objCatalog->getNovita()) && $objCatalog->getNovita() == "N") ? print('checked="checked"') : "") ?> />&nbsp;No
                                </li>
                            </ul>
                        </li>
                        <li><label>Costo: </label><input class="focus corto" type="number" name="costo" min="0" max="1000" step="0.01" size="10" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['sec_COSTO']) ? print(htmlspecialchars($FieldsValue['sec_COSTO'])) : (!empty($objCatalog->getCosto()) ? print($objCatalog->getCosto()) : '') ?>" placeholder="es. 12" />&nbsp;&euro;&nbsp;</li>
                        <li><label>Provenienza: </label><input id="provenienza" class="focus lungo" type="text" name="provenienza" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['sec_PROVENIENZA']) ? print(htmlspecialchars($FieldsValue['sec_PROVENIENZA'])) :(!empty($objCatalog->getProvenienza()) ? print($objCatalog->getProvenienza()) : '') ?>" placeholder="es. dono" /></li>
                        <li class="li-container-radio">
                            <label>Lingua Originale: </label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input id="linguayes" class="radio" type="radio" name="lingua_o" value="Y" <?php (isset($FieldsValue['sec_LINGUA_ORIGINALE']) && $FieldsValue['sec_LINGUA_ORIGINALE'] == "Y") ? print('checked="checked"') : ((!empty($objCatalog->getLingua_orig()) && $objCatalog->getLingua_orig() == "Y") ? print('checked="checked"') : "") ?> />&nbsp;Si
                                </li>
                                <li tabindex="0">
                                    <input id="linguano" class="radio" type="radio" name="lingua_o" value="N" <?php (isset($FieldsValue['sec_LINGUA_ORIGINALE']) && $FieldsValue['sec_LINGUA_ORIGINALE'] == "N") ? print('checked="checked"') : ((!empty($objCatalog->getLingua_orig()) && $objCatalog->getLingua_orig() == "N") ? print('checked="checked"') : "") ?> />&nbsp;No
                                </li>
                            </ul>
                        </li>
                        <li id="titolo_o"><label>Titolo Originale: </label><input class="focus lungo" type="text" name="titolo_o" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['sec_TITOLO_ORIGINALE']) ? print(htmlspecialchars($FieldsValue['sec_TITOLO_ORIGINALE'])) : (!empty($objCatalog->getTitolo_orig()) ? print($objCatalog->getTitolo_orig()) : '') ?>" placeholder="es. Angels flight" /></li>
                        <li id="tradut"><label>Traduttore: </label><input class="focus capitalize lungo" type="text" name="traduttore" size="50" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sec_TRADUTTORE']) ? print(htmlspecialchars($FieldsValue['sec_TRADUTTORE'])) : (!empty($objCatalog->getTraduttore()) ? print($objCatalog->getTraduttore()) : '') ?>" placeholder="es. Gianni Montanari" /></li>
                        <li id="testo_f" class="li-container-radio">
                            <label>Testo a Fronte: </label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input id="testofyes" class="radio" type="radio" name="testo_f" value="Y" <?php (isset($FieldsValue['sec_TESTO_FRONTE']) && $FieldsValue['sec_TESTO_FRONTE'] == "Y") ? print('checked="checked"') : ((!empty($objCatalog->getTesto_fronte()) && $objCatalog->getTesto_fronte() == "Y") ? print('checked="checked"') : "") ?> />&nbsp;Si
                                </li>
                                <li tabindex="0">
                                    <input id="testofno" class="radio" type="radio" name="testo_f" value="N" <?php (isset($FieldsValue['sec_TESTO_FRONTE']) && $FieldsValue['sec_TESTO_FRONTE'] == "N") ? print('checked="checked"') : ((!empty($objCatalog->getTesto_fronte()) && $objCatalog->getTesto_fronte() == "N") ? print('checked="checked"') : "") ?> />&nbsp;No
                                </li>
                            </ul>
                        </li>
                        <li id="lingua_f"><label>Lingua: </label><input class="focus medio" type="text" name="lingua" size="50" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sec_LINGUA']) ? print(htmlspecialchars($FieldsValue['sec_LINGUA'])) : (!empty($objCatalog->getLingua()) ? print($objCatalog->getLingua()) : '') ?>" placeholder="es. arabo" /></li>
                        <li><label>Nazione: </label><input id="nazione" class="focus capitalize medio" type="text" name="nazione" size="30" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sec_NAZIONE']) ? print(htmlspecialchars($FieldsValue['sec_NAZIONE'])) : (!empty($objCatalog->getNazione()) ? print($objCatalog->getNazione()) : '') ?>" placeholder="es. Italia" /></li>
                        <li class="area"><label>Note: </label><textarea class="focus" cols="38" rows="4" name="note"><?php isset($FieldsValue['sec_NOTE']) ? print(htmlspecialchars($FieldsValue['sec_NOTE'])) : (!empty($objCatalog->getNote()) ? print($objCatalog->getNote()) : '') ?></textarea></li>
    <?php
            if($objUser->getAccess_level() == 3) {
    ?>
                        <li class="li-container-radio">
                            <label>Alienato: </label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input class="radio" type="radio" name="alienato" value="Y" <?php (isset($FieldsValue['sec_ALIENATO']) && $FieldsValue['sec_ALIENATO'] == "Y") ? print('checked="checked"') : ((!empty($objCatalog->getAlienato()) && $objCatalog->getAlienato() == "Y") ? print('checked="checked"') : "") ?> />&nbsp;Si
                                </li>
                                <li tabindex="0">
                                    <input class="radio" type="radio" name="alienato" value="N" <?php (isset($FieldsValue['sec_ALIENATO']) && $FieldsValue['sec_ALIENATO'] == "N") ? print('checked="checked"') : ((!empty($objCatalog->getAlienato()) && $objCatalog->getAlienato() == "N") ? print('checked="checked"') : "") ?> />&nbsp;No
                                </li>
                            </ul>
                        </li>
                        <li class="li-container-radio">
                            <label>Visibile: </label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input class="radio" type="radio" name="visibile" value="Y"  <?php (isset($FieldsValue['sec_VISIBILE']) && $FieldsValue['sec_VISIBILE'] == "Y") ? print('checked="checked"') : ((!empty($objCatalog->getVisibile()) && $objCatalog->getVisibile() == "Y") ? print('checked="checked"') : "") ?> />&nbsp;Si
                                </li>
                                <li>
                                    <input class="radio" type="radio" name="visibile" value="N" <?php (isset($FieldsValue['sec_VISIBILE']) && $FieldsValue['sec_VISIBILE'] == "N") ? print('checked="checked"') : ((!empty($objCatalog->getVisibile()) && $objCatalog->getVisibile() == "N") ? print('checked="checked"') : "") ?> />&nbsp;No
                                </li>
                            </ul>
                        </li>
                        <li class="container-button">
                            <input id="reset" type="reset" name="reset" value="Reset" />
                            <input id="id_catalogazione" type="hidden" name="id_catalogazione" value="<?php print($Id_catalog) ?>"  />
                            <input type="hidden" name="submit" value="edit_catalog"  />
                            <input id="invia" type="submit" name="invia" value="Invia" />
                        </li>
                    </ul>
<?php
	}
?>
                </fieldset>
            </form>
<?php
    include('./include-php/end_gestione.php');
?>