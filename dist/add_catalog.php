<?php
    $page = "ADD CAT";
    include('./include-php/head.php');
    include('./include-php/intro.php');
    
    //Funzione per il controllo (Lato Server con PHP) campi di inserimento e visualizzazione (nel caso di Javascript non funzionante) degli errori
    function errorsControl($objSession,$Errors,$FieldsValue) {
        $Errors = $objSession->getErrorAddCatalog();
        if(sizeof($Errors) > 0)
        {
            echo '<div id="errors"><ul>';
            foreach($Errors as $key => $value)
            {
                echo '<li>'.$Errors[$key].'</li>';
            }
            echo '</ul><span id="hidden-errors" class="hidden-errors">X</span></div>';
        }
        echo "\n";
    }
    
    //Prelevo da database i valori dei campi senza errori digitati dall'utente
    $FieldsValue = array();
    $FieldsValue = $objSession->getFieldsValueAddCatalog();
?>
        <style type="text/css">
            form#nuova_catalog fieldset div.data {
                left: 196px;
            }
        </style>
        <title>Inserimento Nuova Catalogazione</title>
    </head>
    <body>
<?php
    errorsControl($objSession,$Errors,$FieldsValue);
    include_once("./include-php/menu.php");
?>
            <div id="corpo" class="corpo" role="main">
                <form id="add_catalog" class="form catalogazione" name="add_catalog" method="post" action="./trans_global.php" enctype="application/x-www-form-urlencoded" target="_self">
                    <fieldset>
                        <h2>Inserimento Nuova Catalogazione</h2>
                        <ul>
                            <li><label for="isbn">ISBN: </label><input id="isbn" class="focus corto" type="text" name="isbn" size="15" maxlength="13" autocomplete="off" value="<?php isset($FieldsValue['sac_ISBN']) ? print(htmlspecialchars($FieldsValue['sac_ISBN'])) : '' ?>" placeholder="es. 9788850330119" autofocus="autofocus" /></li>
                            <li class="li-container-radio">
                                <label>Propriet&agrave;: </label>
                                <ul class="container-radio">
                                    <li tabindex="0">
                                        <input id="papillon" class="radio rientro" type="radio" name="proprieta" value="P" <?php (isset($FieldsValue['sac_PROPRIETA']) && $FieldsValue['sac_PROPRIETA'] == "P") ? print('checked="checked"') : "" ?> />
                                        <label for="papillon">Papillon</label>
                                    </li>
                                    <li tabindex="0">
                                        <input id="comune" class="radio" type="radio" name="proprieta" value="C" <?php (isset($FieldsValue['sac_PROPRIETA']) && $FieldsValue['sac_PROPRIETA'] == "C") ? print('checked="checked"') : "" ?> />
                                        <label for="comune">Comune</label>
                                    </li>
                                    <li tabindex="0">
                                        <input id="festival" class="radio" type="radio" name="proprieta" value="F" <?php (isset($FieldsValue['sac_PROPRIETA']) && $FieldsValue['sac_PROPRIETA'] == "F") ? print('checked="checked"') : "" ?> />
                                        <label for="festival">Filo-Festival</label>
                                    </li>
                                </ul>
                                
                            </li>
                            <li><label for="num_inv">Numero Inventario: </label><input id="num_inv" class="focus corto" type="text" name="num_inv" size="15" maxlength="15" autocomplete="off" value="<?php isset($FieldsValue['sac_NUMERO_INVENTARIO']) ? print(htmlspecialchars($FieldsValue['sac_NUMERO_INVENTARIO'])) : '' ?>" placeholder="es. 00345" /></li>
                            <li><label for="dewey">Codice Dewey: </label><input id="dewey" class="focus maiuscolo corto" type="text" name="dewey" size="15" maxlength="22" autocomplete="off" value="<?php isset($FieldsValue['sac_CODICE_DEWEY']) ? print(htmlspecialchars($FieldsValue['sac_CODICE_DEWEY'])) : '' ?>" placeholder="es. 808.387 MOO" /></li>
                            <li><label for="titolo">Titolo: </label><input id="titolo" class="focus lungo" type="text" name="titolo" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['sac_TITOLO']) ? print(htmlspecialchars($FieldsValue['sac_TITOLO'])) : '' ?>" placeholder="es. Paradiso perduto" /></li>
                            <li><label for="autore">Autore: </label><input id="autore" class="focus capitalize lungo" type="text" name="autore" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['sac_AUTORE']) ? print(htmlspecialchars($FieldsValue['sac_AUTORE'])) : '' ?>" placeholder="es. Pirandello Luigi" /></li>
                            <li><label for="genere">Genere: </label><input id="genere" class="focus lungo" type="text" name="genere" size="50" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sac_GENERE']) ? print(htmlspecialchars($FieldsValue['sac_GENERE'])) : '' ?>" placeholder="es. Gialli &minus; Thriller" /></li>
                            <li><label for="editore">Editore: </label><input id="editore" class="focus medio" type="text" name="editore" size="50" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sac_EDITORE']) ? print(htmlspecialchars($FieldsValue['sac_EDITORE'])) : '' ?>" placeholder="es. Rizzoli" /></li>
                            <li><label for="edizione">Edizione: </label><input class="focus capitalize medio" type="text" name="edizione" size="50" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sac_EDIZIONE']) ? print(htmlspecialchars($FieldsValue['sac_EDIZIONE'])) : '' ?>" placeholder="es. Torino &minus; 1965" /></li>
                            <li><label for="collana">Collana: </label><input id="collana" class="focus medio" type="text" name="collana" size="50" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sac_COLLANA']) ? print(htmlspecialchars($FieldsValue['sac_COLLANA'])) : '' ?>" placeholder="es. Superbur" /></li>
                            <li><label for="scaffale">Scaffale: </label><input id="scaffale" class="focus maiuscolo corto" type="text" name="scaffale" size="12" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sac_SCAFFALE']) ? print(htmlspecialchars($FieldsValue['sac_SCAFFALE'])) : '' ?>" placeholder="es. 01 B" /></li>
                            <li><label for="formato">Formato: </label><input id="formato" class="focus corto" type="text" name="formato" size="12" maxlength="30" autocomplete="off" value="<?php isset($FieldsValue['sac_FORMATO']) ? print(htmlspecialchars($FieldsValue['sac_FORMATO'])) : '' ?>" placeholder="es. 17,5 x 10,5" /></li>
                            <li><label for="note_formato">Note Formato: </label><input id="note_formato" class="focus lungo" type="text" name="note_formato" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['sac_NOTE_FORMATO']) ? print(htmlspecialchars($FieldsValue['sac_NOTE_FORMATO'])) : '' ?>" /></li>
                            <li><label for="pagine">Pagine: </label><input id="pagine" class="focus corto" type="number" name="pagine" min="1" max="10000" autocomplete="off" value="<?php isset($FieldsValue['sac_PAGINE']) ? print(htmlspecialchars($FieldsValue['sac_PAGINE'])) : '' ?>" placeholder="es. 202" /></li>
                            <li><label for="data_c">Data Catalogazione: </label><input id="data_c" class="focus corto" type="date" name="data_c" autocomplete="off" value="<?php isset($FieldsValue['sac_DATA_CATALOGAZIONE']) ? print(htmlspecialchars($FieldsValue['sac_DATA_CATALOGAZIONE'])) : '' ?>" placeholder="es. 2013-01-01" /></li>
                            <li class="li-container-radio">
                                <label>Novit&agrave;: </label>
                                <ul class="container-radio">
                                    <li tabindex="0">
                                        <input id="yes" class="radio rientro" type="radio" name="novita" value="Y" <?php (isset($FieldsValue['sac_NOVITA']) && $FieldsValue['sac_NOVITA'] == "Y") ? print('checked="checked"') : "" ?> />
                                        <label for="yes">Si</label>
                                    </li>
                                    <li tabindex="0">
                                        <input id="no" class="radio" type="radio" name="novita" value="N" <?php (isset($FieldsValue['sac_NOVITA']) && $FieldsValue['sac_NOVITA'] == "N") ? print('checked="checked"') : "" ?> />
                                        <label for="no">No</label>
                                    </li>
                                </ul>
                                
                            </li>
                            <li><label for="costo">Costo: </label><input class="focus corto" type="number" name="costo" min="0" max="1000" step="0.01" autocomplete="off" value="<?php isset($FieldsValue['sac_COSTO']) ? print(htmlspecialchars($FieldsValue['sac_COSTO'])) : '' ?>" placeholder="es. 12" />&nbsp;&euro;&nbsp;</li>
                            <li><label for="provenienza">Provenienza: </label><input id="provenienza" class="focus lungo" type="text" name="provenienza" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['sac_PROVENIENZA']) ? print(htmlspecialchars($FieldsValue['sac_PROVENIENZA'])) : '' ?>" placeholder="es. dono" /></li>
                            <li class="li-container-radio">
                                <label>Lingua Originale: </label>
                                <ul class="container-radio">
                                    <li tabindex="0">
                                        <input id="linguayes" class="radio rientro" type="radio" name="lingua_o" value="Y" <?php (isset($FieldsValue['sac_LINGUA_ORIGINALE']) && $FieldsValue['sac_LINGUA_ORIGINALE'] == "Y") ? print('checked="checked"') : "" ?> />
                                        <label for="linguayes">Si</label>
                                    </li>
                                    <li tabindex="0">
                                        <input id="linguano" class="radio" type="radio" name="lingua_o" value="N" <?php (isset($FieldsValue['sac_LINGUA_ORIGINALE']) && $FieldsValue['sac_LINGUA_ORIGINALE'] == "N") ? print('checked="checked"') : "" ?> />
                                        <label for="linguano">No</label>
                                    </li>
                                 </ul>
                                
                            </li>
                            <li id="titolo_o"><label for="titolo_o">Titolo Originale: </label><input class="focus lungo" type="text" name="titolo_o" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['sac_TITOLO_ORIGINALE']) ? print(htmlspecialchars($FieldsValue['sac_TITOLO_ORIGINALE'])) : '' ?>" placeholder="es. Angels flight" /></li>
                            <li id="tradut"><label for="traduttore">Traduttore: </label><input class="focus capitalize lungo" type="text" name="traduttore" size="50" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sac_TRADUTTORE']) ? print(htmlspecialchars($FieldsValue['sac_TRADUTTORE'])) : '' ?>" placeholder="es. Gianni Montanari" /></li>
                            <li class="li-container-radio" id="testo_f">
                                <label>Testo a Fronte: </label>
                                <ul class="container-radio">
                                    <li tabindex="0">
                                        <input id="testofyes" class="radio rientro" type="radio" name="testo_f" value="Y" <?php (isset($FieldsValue['sac_TESTO_FRONTE']) && $FieldsValue['sac_TESTO_FRONTE'] == "Y") ? print('checked="checked"') : "" ?> />
                                        <label for="testofyes">Si</label>
                                    </li>
                                    <li tabindex="0">
                                        <input id="testofno" class="radio" type="radio" name="testo_f" value="N" <?php (isset($FieldsValue['sac_TESTO_FRONTE']) && $FieldsValue['sac_TESTO_FRONTE'] == "N") ? print('checked="checked"') : "" ?> />
                                        <label for="testofno">No</label>
                                    </li>
                                </ul>
                                
                            </li>
                            <li id="lingua_f"><label for="lingua">Lingua: </label><input class="focus medio" type="text" name="lingua" size="50" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sac_LINGUA']) ? print(htmlspecialchars($FieldsValue['sac_LINGUA'])) : '' ?>" placeholder="es. arabo" /></li>
                            <li><label for="nazione">Nazione: </label><input id="nazione" class="focus capitalize medio" type="text" name="nazione" size="30" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sac_NAZIONE']) ? print(htmlspecialchars($FieldsValue['sac_NAZIONE'])) : '' ?>" placeholder="es. Italia" /></li>
                            <li class="area"><label for="note">Note: </label><textarea id="note" class="focus" cols="38" rows="4" name="note"><?php isset($FieldsValue['sac_NOTE']) ? print(htmlspecialchars($FieldsValue['sac_NOTE'])) : '' ?></textarea></li>
                            <li class="container-button">
                                <input id="reset" type="reset" name="reset" value="Reset" />
                                <input type="hidden" name="submit" value="add_catalog"  />
                                <input id="invia" type="submit" name="invia" value="Invia" />
                            </li>
                        </ul>
                    </fieldset>
                </form>
            </div>
<?php
    include('./include-php/end_gestione.php');
?>