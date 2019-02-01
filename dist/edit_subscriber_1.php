<?php
    $page = "";
    include('./include-php/head.php');
    if(isset($_GET['id_iscritto']) && !empty($_GET['id_iscritto']) && preg_match('|^[0-9]+$|', $_GET['id_iscritto']))
    {
        $Id_iscritto = trim($_GET['id_iscritto']);
        $objSubscriber = new Subscriber($objPDO,$Id_iscritto);
        //Controllo se l'iscritto ha un tutore
        if($objSubscriber->getTutore() == "Y")
        {
            $Id_tutore = LegalGuardian::GetIdLegalGuardian($objPDO, $Id_iscritto);
            $objLegalGuardian = new LegalGuardian($objPDO, $Id_tutore);
        }
        else
        {
            $objLegalGuardian = new LegalGuardian($objPDO);        
        }
    }
    else
    {
        redirect('./index.php');
        exit();
    }
    include('./include-php/intro.php');
?>
        <title>Modifica Utente</title>
    </head>
    <body>
<?php
    include_once("./include-php/menu.php");
    echo "\n";
    //Se ci sono errori nell'inserimento
    $Errors = array();
    $Errors = $objSession->getErrorEditSubscriber();
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
    $FieldsValue = $objSession->getFieldsValueEditSubscriber();
    echo "\n";
?>
        <div id="errore" class="dialog"><?php isset($_GET['errore']) ? print(replace(urldecode($_GET['errore']))) : ""; ?></div>
        <div id="corpo" class="corpo" role="main">
            <form id="edit_subscriber" class="utente form" name="edit_subscriber" method="post" action="./trans_global.php" enctype="application/x-www-form-urlencoded" target="_self">
                <fieldset>
                    <h2>Modifica Utente</h2>
                    <div class="center container-button add-image"><button id="add-image-subscriber"><img alt="Immagine Utente" title="Aggiungi/Modifica Immagine Utente" src="<?php echo $objSubscriber->getImage(); ?>" /></button></div>
                    <ul>
                        <li><label>Numero Tessera: </label><em><?php (!empty($objSubscriber->getNum_tessera()) ? print($objSubscriber->getNum_tessera()) : '') ?></em></li>
                        <li><label>Data Iscrizione: </label><input id="data_isc" class="focus corto" type="text" name="data_isc" size="15" maxlength="10" autofocus="autofocus" autocomplete="off" value="<?php isset($FieldsValue['ses_DATA_ISCRIZIONE']) ? print(Utility::DateTimeTransform($FieldsValue['ses_DATA_ISCRIZIONE'],"date","EN")) : (!empty($objSubscriber->getData_iscrizione()) ? print(Utility::DateTimeTransform($objSubscriber->getData_iscrizione(),"date","EN")) : '') ?>" placeholder="es. 2013-01-01" /></li>
                        <li><label>Nome: </label><input id="nome" class="focus capitalize lungo" type="text" name="nome" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['ses_NOME']) ? print(htmlspecialchars($FieldsValue['ses_NOME'])) : (!empty($objSubscriber->getNome()) ? print($objSubscriber->getNome()) : '') ?>" placeholder="es. Antonella" /></li>
                        <li><label>Cognome: </label><input id="cognome" class="focus capitalize lungo" type="text" name="cognome" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['ses_COGNOME']) ? print(htmlspecialchars($FieldsValue['ses_COGNOME'])) : (!empty($objSubscriber->getCognome()) ? print($objSubscriber->getCognome()) : '') ?>" placeholder="es. Rossi" /></li>
                        <li class="li-container-radio">
                            <label>Sesso: </label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input class="radio rientro" type="radio" name="sesso" value="M" <?php (isset($FieldsValue['ses_SESSO']) && $FieldsValue['ses_SESSO'] == "M") ? print('checked="checked"') : ((!empty($objSubscriber->getSesso()) && $objSubscriber->getSesso() == "M") ? print('checked="checked"') : "") ?> />&nbsp;Maschio
                                </li>
                                <li>
                                    <input class="radio" type="radio" name="sesso" value="F" <?php (isset($FieldsValue['ses_SESSO']) && $FieldsValue['ses_SESSO'] == "F") ? print('checked="checked"') : ((!empty($objSubscriber->getSesso()) && $objSubscriber->getSesso() == "F") ? print('checked="checked"') : "") ?> />&nbsp;Femmina
                                </li>
                            </ul>
                        </li>					
                        <li><label>Data Nascita: </label><input id="data_nas" class="focus corto" type="text" name="data_nas" size="15" maxlength="10" autocomplete="off" value="<?php isset($FieldsValue['ses_DATA_NASCITA']) ? print(htmlspecialchars($FieldsValue['ses_DATA_NASCITA'])) : (!empty($objSubscriber->getData_nascita()) ? print($objSubscriber->getData_nascita()) : '') ?>" placeholder="es. 1990-01-01" /></li>
                        <li><label>Professione: </label><input id="professione" class="focus lungo" type="text" name="professione" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['ses_PROFESSIONE']) ? print(htmlspecialchars($FieldsValue['ses_PROFESSIONE'])) : (!empty($objSubscriber->getProfessione()) ? print($objSubscriber->getProfessione()) : '') ?>" placeholder="es. Studente" /></li>
                        <li><label>Indirizzo: </label><input id="indirizzo" class="focus capitalize lungo" type="text" name="indirizzo" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['ses_INDIRIZZO']) ? print(htmlspecialchars($FieldsValue['ses_INDIRIZZO'])) : (!empty($objSubscriber->getIndirizzo()) ? print($objSubscriber->getIndirizzo()) : '') ?>" placeholder="es. Via Juvara" /></li>
                        <li><label>N&deg; Civico: </label><input id="num_civ" class="focus maiuscolo corto" type="text" name="num_civ" size="8" maxlength="10" autocomplete="off" value="<?php isset($FieldsValue['ses_NUMERO_CIVICO']) ? print(htmlspecialchars($FieldsValue['ses_NUMERO_CIVICO'])) : (!empty($objSubscriber->getNum_civico()) ? print($objSubscriber->getNum_civico()) : '') ?>" placeholder="es. 38" /></li>
                        <li><label>Localit&agrave;: </label><input id="localita" class="focus maiuscolo lungo" type="text" name="localita" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['ses_LOCALITA']) ? print(htmlspecialchars($FieldsValue['ses_LOCALITA'])) : (!empty($objSubscriber->getLocalita()) ? print($objSubscriber->getLocalita()) : '') ?>" placeholder="es. LUNETTA" /></li>
                        <li><label>Provincia: </label><input id="provincia" class="focus maiuscolo corto" type="text" name="provincia" size="2" maxlength="2" autocomplete="off" value="<?php isset($FieldsValue['ses_PROVINCIA']) ? print(htmlspecialchars($FieldsValue['ses_PROVINCIA'])) : (!empty($objSubscriber->getProvincia()) ? print($objSubscriber->getProvincia()) : '') ?>" placeholder="es. MN" /></li>
                        <li><label>C.A.P.: </label><input id="cap" class="focus corto" type="text" name="cap" size="15" maxlength="5"  autocomplete="off" value="<?php isset($FieldsValue['ses_CAP']) ? print(htmlspecialchars($FieldsValue['ses_CAP'])) : (!empty($objSubscriber->getCap()) ? print($objSubscriber->getCap()) : '') ?>" placeholder="es. 46100" /><p id="cap_no_ris" class="no_risult"></p></li>
                        <li><label>Tel. Casa: </label><input id="tel_casa" class="focus corto" type="text" name="tel_casa" size="15" maxlength="15" autocomplete="off" value="<?php isset($FieldsValue['ses_TELEFONO_CASA']) ? print(htmlspecialchars($FieldsValue['ses_TELEFONO_CASA'])) : (!empty($objSubscriber->getTel_casa()) ? print($objSubscriber->getTel_casa()) : '') ?>" placeholder="es. 0376370000" /></li>
                        <li><label>Tel. Cell.: </label><input id="tel_cell" class="focus corto" type="text" name="tel_cell" size="15" maxlength="15" autocomplete="off" value="<?php isset($FieldsValue['ses_TELEFONO_CELLULARE']) ? print(htmlspecialchars($FieldsValue['ses_TELEFONO_CELLULARE'])) : (!empty($objSubscriber->getTel_cell()) ? print($objSubscriber->getTel_cell()) : '') ?>" placeholder="es. 3332244668" /></li>
                        <li><label>E&minus;mail: </label><input id="email" class="focus lungo" type="text" name="email" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['ses_EMAIL']) ? print(htmlspecialchars($FieldsValue['ses_EMAIL'])) : (!empty($objSubscriber->getEmail()) ? print($objSubscriber->getEmail()) : '') ?>" placeholder="es. biblioteca@biblioteca.it" /></li>		
                        <li class="li-container-radio">
                            <label>Internet: </label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input class="radio rientro" type="radio" name="internet" value="Y" <?php (isset($FieldsValue['ses_INTERNET']) && $FieldsValue['ses_INTERNET'] == "Y") ? print('checked="checked"') : ((!empty($objSubscriber->getInternet()) && $objSubscriber->getInternet() == "Y") ? print('checked="checked"') : "") ?> />&nbsp;Si
                                </li>
                                <li>
                                    <input class="radio" type="radio" name="internet" value="N" <?php (isset($FieldsValue['ses_INTERNET']) && $FieldsValue['ses_INTERNET'] == "N") ? print('checked="checked"') : ((!empty($objSubscriber->getInternet()) && $objSubscriber->getInternet() == "N") ? print('checked="checked"') : "") ?> />&nbsp;No
                                </li>
                            </ul>
                        </li>
                        <li class="li-container-radio">
                            <label>Privacy: </label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input class="radio rientro" type="radio" name="privacy" value="Y" <?php (isset($FieldsValue['ses_PRIVACY']) && $FieldsValue['ses_PRIVACY'] == "Y") ? print('checked="checked"') : ((!empty($objSubscriber->getPrivacy()) && $objSubscriber->getPrivacy() == "Y") ? print('checked="checked"') : "") ?> />&nbsp;Si
                                </li>
                                <li>
                                    <input class="radio" type="radio" name="privacy" value="N" <?php (isset($FieldsValue['ses_PRIVACY']) && $FieldsValue['ses_PRIVACY'] == "N") ? print('checked="checked"') : ((!empty($objSubscriber->getPrivacy()) && $objSubscriber->getPrivacy() == "N") ? print('checked="checked"') : "") ?> />&nbsp;No
                                </li>
                            </ul>
                        </li>
                        <li>
                            <label>Tipo Documento: </label>
                            <select id="tipo_documento" name="tipo_documento">
                                <option value="0">Nessun Documento&nbsp;</option>
                                <option value="1" <?php (isset($FieldsValue['ses_TIPO_DOCUMENTO']) && $FieldsValue['ses_TIPO_DOCUMENTO'] == 1) ? print('selected="selected"') : ((!empty($objSubscriber->getTipo_documento()) && $objSubscriber->getTipo_documento() == 1) ? print('selected="selected"') : "") ?>>Carta d'Identit&agrave;&nbsp;</option>
                                <option value="2" <?php (isset($FieldsValue['ses_TIPO_DOCUMENTO']) && $FieldsValue['ses_TIPO_DOCUMENTO'] == 2) ? print('selected="selected"') : ((!empty($objSubscriber->getTipo_documento()) && $objSubscriber->getTipo_documento() == 2) ? print('selected="selected"') : "") ?>>Patente&nbsp;</option>
                                <option value="3" <?php (isset($FieldsValue['ses_TIPO_DOCUMENTO']) && $FieldsValue['ses_TIPO_DOCUMENTO'] == 3) ? print('selected="selected"') : ((!empty($objSubscriber->getTipo_documento()) && $objSubscriber->getTipo_documento() == 3) ? print('selected="selected"') : "") ?>>Passaporto&nbsp;</option>							
                                <option value="4" <?php (isset($FieldsValue['ses_TIPO_DOCUMENTO']) && $FieldsValue['ses_TIPO_DOCUMENTO'] == 4) ? print('selected="selected"') : ((!empty($objSubscriber->getTipo_documento()) && $objSubscriber->getTipo_documento() == 4) ? print('selected="selected"') : "") ?>>Tessera Sanitaria&nbsp;</option>							
                            </select>
                            
                        </li>
                        <li><label>N&deg; Documento: </label><input id="num_documento" class="focus maiuscolo corto" type="text" name="num_documento" size="15" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['ses_NUMERO_DOCUMENTO']) ? print(htmlspecialchars($FieldsValue['ses_NUMERO_DOCUMENTO'])) : (!empty($objSubscriber->getNum_documento()) ? print($objSubscriber->getNum_documento()) : '') ?>" placeholder="es. AJ 7247773" /></li>
                        <li class="area"><label>Note: </label><textarea id="note" class="focus" cols="38" rows="4" name="note"><?php isset($FieldsValue['ses_NOTE']) ? print(htmlspecialchars($FieldsValue['ses_NOTE'])) : (!empty($objSubscriber->getNote()) ? print($objSubscriber->getNote()) : '') ?></textarea></li>
                        <li class="li-container-radio">
                            <label>Tutore: </label>
                            <ul id="ul-tutore-radio" class="container-radio">
                                <li tabindex="0">
                                    <input class="radio rientro" type="radio" name="tutore" value="Y" <?php (isset($FieldsValue['ses_TUTORE']) && $FieldsValue['ses_TUTORE'] == "Y") ? print('checked="checked"') : ((!empty($objSubscriber->getTutore()) && $objSubscriber->getTutore() == "Y") ? print('checked="checked"') : ""); ?> />&nbsp;Si
                                </li>
                                <li>
                                    <input class="radio" type="radio" name="tutore" value="N" <?php (isset($FieldsValue['ses_TUTORE']) && $FieldsValue['ses_TUTORE'] == "N") ? print('checked="checked"') : ((!empty($objSubscriber->getTutore()) && $objSubscriber->getTutore() == "N") ? print('checked="checked"') : ""); ?> />&nbsp;No
                                </li>
                            </ul>
                        </li>
                        <li id="tutore" class="tutore">
                            <h3>DATI DEL TUTORE</h3>
                            <ul>
                                <li><label>Nome: </label><input id="nome_t" class="focus capitalize lungo" type="text" name="nome_t" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['ses_NOME_T']) ? print(htmlspecialchars($FieldsValue['ses_NOME_T'])) :  (!empty($objLegalGuardian->getNome()) ? print($objLegalGuardian->getNome()) : '') ?>" placeholder="es. Antonella" /></li>
                                <li><label>Cognome: </label><input id="cognome_t" class="focus capitalize lungo" type="text" name="cognome_t" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['ses_COGNOME_T']) ? print(htmlspecialchars($FieldsValue['ses_COGNOME_T'])) : (!empty($objLegalGuardian->getCognome()) ? print($objLegalGuardian->getCognome()) : '') ?>" placeholder="es. Rossi" /></li>
                                <li class="li-container-radio">
                                    <label>Sesso: </label>
                                    <ul class="container-radio">
                                        <li tabindex="0">
                                            <input class="radio rientro" type="radio" name="sesso_t" value="M" <?php (isset($FieldsValue['ses_SESSO_T']) && $FieldsValue['ses_SESSO_T'] == "M") ? print('checked="checked"') : ((!empty($objLegalGuardian->getSesso()) && $objLegalGuardian->getSesso() == "M") ? print('checked="checked"') : "") ?> />&nbsp;Maschio
                                        </li>
                                        <li>
                                            <input class="radio" type="radio" name="sesso_t" value="F" <?php (isset($FieldsValue['ses_SESSO_T']) && $FieldsValue['ses_SESSO_T'] == "F") ? print('checked="checked"') : ((!empty($objLegalGuardian->getSesso()) && $objLegalGuardian->getSesso() == "F") ? print('checked="checked"') : "") ?> />&nbsp;Femmina
                                        </li>
                                    </ul>
                                </li>					
                                <li><label>Indirizzo: </label><input id="indirizzo_t" class="focus capitalize lungo" type="text" name="indirizzo_t" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['ses_INDIRIZZO_T']) ? print(htmlspecialchars($FieldsValue['ses_INDIRIZZO_T'])) : (!empty($objLegalGuardian->getIndirizzo()) ? print($objLegalGuardian->getIndirizzo()) : "") ?>" placeholder="es. Via Juvara" /></li>
                                <li><label>N&deg; Civico: </label><input id="num_civ_t" class="focus maiuscolo corto" type="text" name="num_civ_t" size="8" maxlength="10"  autocomplete="off" value="<?php isset($FieldsValue['ses_NUMERO_CIVICO_T']) ? print(htmlspecialchars($FieldsValue['ses_NUMERO_CIVICO_T'])) : (!empty($objLegalGuardian->getNum_civico()) ? print($objLegalGuardian->getNum_civico()) : '') ?>" placeholder="es. 38" /></li>
                                <li><label>Localit&agrave;: </label><input id="localita_t" class="focus maiuscolo lungo" type="text" name="localita_t" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['ses_LOCALITA_T']) ? print(htmlspecialchars($FieldsValue['ses_LOCALITA_T'])) : (!empty($objLegalGuardian->getLocalita()) ? print($objLegalGuardian->getLocalita()) : '') ?>" placeholder="es. LUNETTA" /></li>
                                <li><label>Provincia: </label><input id="provincia_t" class="focus maiuscolo corto" type="text" name="provincia_t" size="4" maxlength="2" autocomplete="off" value="<?php isset($FieldsValue['ses_PROVINCIA_T']) ? print(htmlspecialchars($FieldsValue['ses_PROVINCIA_T'])) : (!empty($objLegalGuardian->getProvincia()) ? print($objLegalGuardian->getProvincia()) : '') ?>" placeholder="es. MN" /></li>
                                <li><label>C.A.P.: </label><input id="cap_t" class="focus corto" type="text" name="cap_t" size="15" maxlength="5" autocomplete="off" value="<?php isset($FieldsValue['ses_CAP_T']) ? print(htmlspecialchars($FieldsValue['ses_CAP_T'])) : (!empty($objLegalGuardian->getCap()) ? print($objLegalGuardian->getCap()) : '') ?>" placeholder="es. 46100" /><p id="cap_no_ris" class="no_risult"></p></li>
                                <li><label>Tel. Casa: </label><input id="tel_casa_t" class="focus corto" type="text" name="tel_casa_t" size="15" maxlength="15" autocomplete="off" value="<?php isset($FieldsValue['ses_TELEFONO_CASA_T']) ? print(htmlspecialchars($FieldsValue['ses_TELEFONO_CASA_T'])) : (!empty($objLegalGuardian->getTel_casa()) ? print($objLegalGuardian->getTel_casa()) : '') ?>" placeholder="es. 0376370000" /></li>
                                <li><label>Tel. Cell.: </label><input id="tel_cell_t" class="focus corto" type="text" name="tel_cell_t" size="15" maxlength="15" autocomplete="off" value="<?php isset($FieldsValue['ses_TELEFONO_CELLULARE_T']) ? print(htmlspecialchars($FieldsValue['ses_TELEFONO_CELLULARE_T'])) : (!empty($objLegalGuardian->getTel_cell()) ? print($objLegalGuardian->getTel_cell()) : '') ?>" placeholder="es. 3332244668" /></li>
                                <li><label>E&minus;mail: </label><input id="email_t" class="focus lungo" type="text" name="email_t" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['ses_EMAIL_T']) ? print(htmlspecialchars($FieldsValue['ses_EMAIL_T'])) : (!empty($objLegalGuardian->getEmail()) ? print($objLegalGuardian->getEmail()) : '') ?>" placeholder="es. biblioteca@biblioteca.it" /></li>	
                                <li>
                                    <label>Tipo Documento: </label>
                                    <select id="tipo_documento_t" name="tipo_documento_t">
                                        <option value="0" selected="selected">Nessun Documento&nbsp;</option>
                                        <option value="1" <?php (isset($FieldsValue['ses_TIPO_DOCUMENTO_T']) && $FieldsValue['ses_TIPO_DOCUMENTO_T'] == 1) ? print('selected="selected"') : ((!empty($objLegalGuardian->getTipo_documento()) && $objLegalGuardian->getTipo_documento() == 1) ? print('selected="selected"') : "") ?>>Carta d'Identit&agrave;&nbsp;</option>
                                        <option value="2" <?php (isset($FieldsValue['ses_TIPO_DOCUMENTO_T']) && $FieldsValue['ses_TIPO_DOCUMENTO_T'] == 2) ? print('selected="selected"') : ((!empty($objLegalGuardian->getTipo_documento()) && $objLegalGuardian->getTipo_documento() == 2) ? print('selected="selected"') : "") ?>>Patente&nbsp;</option>
                                        <option value="3" <?php (isset($FieldsValue['ses_TIPO_DOCUMENTO_T']) && $FieldsValue['ses_TIPO_DOCUMENTO_T'] == 3) ? print('selected="selected"') : ((!empty($objLegalGuardian->getTipo_documento()) && $objLegalGuardian->getTipo_documento() == 3) ? print('selected="selected"') : "") ?>>Passaporto&nbsp;</option>							
                                        <option value="4" <?php (isset($FieldsValue['ses_TIPO_DOCUMENTO_T']) && $FieldsValue['ses_TIPO_DOCUMENTO_T'] == 4) ? print('selected="selected"') : ((!empty($objLegalGuardian->getTipo_documento()) && $objLegalGuardian->getTipo_documento() == 4) ? print('selected="selected"') : "") ?>>Tessera Sanitaria&nbsp;</option>							
                                    </select>
                                    
                                </li>				
                                <li><label>N&deg; Documento: </label><input id="num_documento_t" class="focus maiuscolo corto" type="text" name="num_documento_t" size="15" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['ses_NUMERO_DOCUMENTO_T']) ? print(htmlspecialchars($FieldsValue['ses_NUMERO_DOCUMENTO_T'])) : (!empty($objLegalGuardian->getNum_documento()) ? print($objLegalGuardian->getNum_documento()) : '') ?>" placeholder="es. AJ 7247773" /></li>
                            </ul>
                        </li>
<?php
	if($objUser->getAccess_level() == 3) {
?>
                        <li class="li-container-radio">
                            <label>Deceduto: </label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input class="radio rientro" type="radio" name="deceduto" value="Y" <?php ((!empty($objSubscriber->getDeceduto()) && $objSubscriber->getDeceduto() == "Y") ? print('checked="checked"') : ((isset($_SESSION['deceduto_u']) && $_SESSION['deceduto_u'] == "Y") ? print('checked="checked"') : "")) ?> />&nbsp;Si
                                </li>
                                <li>
                                    <input class="radio" type="radio" name="deceduto" value="N" <?php ((!empty($objSubscriber->getDeceduto()) && $objSubscriber->getDeceduto() == "N") ? print('checked="checked"') : ((isset($_SESSION['deceduto_u']) && $_SESSION['deceduto_u'] == "N") ? print('checked="checked"') : "")) ?> />&nbsp;No
                                </li>
                            </ul>
                        </li>
<?php
	}
?>
                        <li class="container-button">
                            <input id="reset" type="reset" name="reset" value="Reset" />
                            <input id="id_iscritto" type="hidden" name="id_iscritto" value="<?php print($Id_iscritto) ?>"  />
                            <input type="hidden" name="num_tes" value="<?php print($objSubscriber->getNum_tessera()) ?>"  />
                            <input type="hidden" name="submit" value="edit_subscriber"  />
                            <input id="invia" type="submit" name="invia" value="Invia" />
                        </li>
                    </ul>
                </fieldset>
            </form>
<?php
    include('./include-php/end_gestione.php');
?>