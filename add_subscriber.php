<?php
    $page = "ADD SUB";
    include('./include-php/head.php');
    include('./include-php/intro.php');
    
    //Dichiaro ed inizializzo la variabile contenente il numero tessera più alto non ancora utilizzato
    $Max_num_tessera = Subscriber::GetNumTesseraMax($objPDO);
    //Funzione per il controllo (Lato Server con PHP) campi di inserimento e visualizzazione (nel caso di Javascript non funzionante) degli errori
    function errorsControl($objSession) {
        $Errors = array();
        $Errors = $objSession->getErrorAddSubscriber();
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
        $FieldsValue = $objSession->getFieldsValueAddSubscriber();
    }
?>
        <title>Inserimento Nuovo Utente</title>
    </head>
    <body>
<?php
    include_once("./include-php/menu.php");
    echo "\n";
    errorsControl($objSession);
?>
        <div id="errore" class="dialog"><?php isset($_GET['errore']) ? print(replace(urldecode($_GET['errore']))) : ""; ?></div>	
        <div id="corpo" class="corpo" role="main">
            <form id="add_subscriber" class="utente form" name="add_subscriber" method="post" action="./trans_global.php" enctype="application/x-www-form-urlencoded" target="_self" autocomplete="off">
                <fieldset>
                    <h2>Inserimento Nuovo Utente</h2>
                    <ul>
                        <li><label>Numero Tessera: </label><span class="numero_tessera"><em><?php echo ($Max_num_tessera); ?></em></span></li>
                        <li><label for="data_isc">Data Iscrizione: </label><input id="data_isc" class="focus corto" type="date" name="data_isc" autofocus="autofocus" autocomplete="off" value="<?php isset($FieldsValue['sas_DATA_ISCRIZIONE']) ? print($FieldsValue['sas_DATA_ISCRIZIONE']) : '' ?>" placeholder="es. 2013-01-01" /></li>
                        <li><label for="nome">Nome: </label><input id="nome" class="focus capitalize lungo" type="text" name="nome" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['sas_NOME']) ? print(htmlspecialchars($FieldsValue['sas_NOME'])) : '' ?>" placeholder="es. Antonella" /></li>
                        <li><label for="cognome">Cognome: </label><input id="cognome" class="focus capitalize lungo" type="text" name="cognome" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['sas_COGNOME']) ? print(htmlspecialchars($FieldsValue['sas_COGNOME'])) : '' ?>" placeholder="es. Rossi" /></li>
                        <li class="li-container-radio">
                            <label>Sesso: </label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input id="male" class="radio rientro" type="radio" name="sesso" value="M" <?php (isset($FieldsValue['sas_SESSO']) && $FieldsValue['sas_SESSO'] == "M") ? print('checked="checked"') : "" ?> />
                                    <label for="male">Maschio</label>
                                </li>
                                <li tabindex="0">
                                    <input id="female" class="radio" type="radio" name="sesso" value="F" <?php (isset($FieldsValue['sas_SESSO']) && $FieldsValue['sas_SESSO'] == "F") ? print('checked="checked"') : "" ?> />
                                    <label for="female">Femmina</label>
                                </li>
                            </ul>
                            
                        </li>					
                        <li><label for="data_nas">Data Nascita: </label><input id="data_nas" class="focus corto" type="date" name="data_nas" autocomplete="off" value="<?php isset($FieldsValue['sas_DATA_NASCITA']) ? print(htmlspecialchars($FieldsValue['sas_DATA_NASCITA'])) : '' ?>" placeholder="es. 1990-01-01" /></li>
                        <li><label for="professione">Professione: </label><input id="professione" class="focus lungo" type="text" name="professione" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['sas_PROFESSIONE']) ? print(htmlspecialchars($FieldsValue['sas_PROFESSIONE'])) : '' ?>" placeholder="es. Studente" /></li>
                        <li><label for="indirizzo">Indirizzo: </label><input id="indirizzo" class="focus capitalize lungo" type="text" name="indirizzo" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['sas_INDIRIZZO']) ? print(htmlspecialchars($FieldsValue['sas_INDIRIZZO'])) : '' ?>" placeholder="es. Via Juvara" /></li>
                        <li><label for="num_civ">N&deg; Civico: </label><input id="num_civ" class="focus maiuscolo corto" type="text" name="num_civ" size="8" maxlength="10" autocomplete="off" value="<?php isset($FieldsValue['sas_NUMERO_CIVICO']) ? print(htmlspecialchars($FieldsValue['sas_NUMERO_CIVICO'])) : '' ?>" placeholder="es. 38" /></li>
                        <li><label for="localita">Localit&agrave;: </label><input id="localita" class="focus maiuscolo lungo" type="text" name="localita" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['sas_LOCALITA']) ? print(htmlspecialchars($FieldsValue['sas_LOCALITA'])) : '' ?>" placeholder="es. LUNETTA" /></li>
                        <li><label for="provincia">Provincia: </label><input id="provincia" class="focus maiuscolo corto" type="text" name="provincia" size="4" maxlength="2" autocomplete="off" value="<?php isset($FieldsValue['sas_PROVINCIA']) ? print(htmlspecialchars($FieldsValue['sas_PROVINCIA'])) : '' ?>" placeholder="es. MN" /></li>
                        <li><label for="cap">C.A.P.: </label><input id="cap" class="focus corto" type="text" name="cap" size="15" maxlength="5" autocomplete="off" value="<?php isset($FieldsValue['sas_CAP']) ? print(htmlspecialchars($FieldsValue['sas_CAP'])) : '' ?>" placeholder="es. 46100" /></li>
                        <li><label for="tel_casa">Tel. Casa: </label><input id="tel_casa" class="focus corto" type="tel" name="tel_casa" size="15" maxlength="15" autocomplete="off" value="<?php isset($FieldsValue['sas_TELEFONO_CASA']) ? print(htmlspecialchars($FieldsValue['sas_TELEFONO_CASA'])) : '' ?>" placeholder="es. 0376370000" /></li>
                        <li><label for="tel_cell">Tel. Cell.: </label><input id="tel_cell" class="focus corto" type="tel" name="tel_cell" size="15" maxlength="15" autocomplete="off" value="<?php isset($FieldsValue['sas_TELEFONO_CELLULARE']) ? print(htmlspecialchars($FieldsValue['sas_TELEFONO_CELLULARE'])) : '' ?>" placeholder="es. 3332244668" /></li>
                        <li><label for="email">E&minus;mail: </label><input id="email" class="focus lungo" type="email" name="email" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['sas_EMAIL']) ? print(htmlspecialchars($FieldsValue['sas_EMAIL'])) : '' ?>" placeholder="es. biblioteca@biblioteca.it" /></li>	
                        <li class="li-container-radio">
                            <label>Internet: </label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input id="yes" class="radio rientro" type="radio" name="internet" value="Y" <?php (isset($FieldsValue['sas_INTERNET']) && $FieldsValue['sas_INTERNET'] == "Y") ? print('checked="checked"') : "" ?> />
                                    <label for="yes">Si</label>
                                </li>
                                <li tabindex="0">
                                    <input id="no" class="radio" type="radio" name="internet" value="N" <?php (isset($FieldsValue['sas_INTERNET']) && $FieldsValue['sas_INTERNET'] == "N") ? print('checked="checked"') : "" ?> />
                                    <label for="no">No</label>
                                </li>
                            </ul>
                            
                        </li>
                        <li class="li-container-radio">
                            <label>Privacy: </label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input id="pyes" class="radio rientro" type="radio" name="privacy" value="Y" <?php (isset($FieldsValue['sas_PRIVACY']) && $FieldsValue['sas_PRIVACY'] == "Y") ? print('checked="checked"') : "" ?> />
                                    <label for="pyes">Si</label>
                                </li>
                                <li tabindex="0">
                                    <input id="pno" class="radio" type="radio" name="privacy" value="N" <?php (isset($FieldsValue['sas_PRIVACY']) && $FieldsValue['sas_PRIVACY'] == "N") ? print('checked="checked"') : "" ?> />
                                    <label for="pno">No</label>
                                </li>
                            </ul>
                            
                        </li>
                        <li>
                            <label for="tipo_documento">Tipo Documento: </label>
                            <select id="tipo_documento" name="tipo_documento">
                                <option value="0" selected="selected">Nessun Documento&nbsp;</option>
                                <option value="1" <?php (((isset($FieldsValue['sas_TIPO_DOCUMENTO']) && $FieldsValue['sas_TIPO_DOCUMENTO'] == 1) ? print('selected="selected"') : '')) ?>>Carta d'Identit&agrave;&nbsp;</option>
                                <option value="2" <?php (((isset($FieldsValue['sas_TIPO_DOCUMENTO']) && $FieldsValue['sas_TIPO_DOCUMENTO'] == 2) ? print('selected="selected"') : '')) ?>>Patente&nbsp;</option>
                                <option value="3" <?php (((isset($FieldsValue['sas_TIPO_DOCUMENTO']) && $FieldsValue['sas_TIPO_DOCUMENTO'] == 3) ? print('selected="selected"') : '')) ?>>Passaporto&nbsp;</option>							
                                <option value="4" <?php (((isset($FieldsValue['sas_TIPO_DOCUMENTO']) && $FieldsValue['sas_TIPO_DOCUMENTO'] == 4) ? print('selected="selected"') : '')) ?>>Tessera Sanitaria&nbsp;</option>							
                            </select>
                            
                        </li>				
                        <li><label for="num_documento">N&deg; Documento: </label><input id="num_documento" class="focus maiuscolo corto" type="text" name="num_documento" size="15" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sas_NUMERO_DOCUMENTO']) ? print(htmlspecialchars($FieldsValue['sas_NUMERO_DOCUMENTO'])) : '' ?>" placeholder="es. AJ 7247773" /></li>
                        <li class="area"><label for="note">Note: </label><textarea id="note" class="focus" cols="38" rows="4" name="note"><?php isset($FieldsValue['sas_NOTE']) ? print(htmlspecialchars($FieldsValue['sas_NOTE'])) : '' ?></textarea></li>					
                        <li class="li-container-radio">
                            <label>Tutore: </label>
                            <ul id="ul-tutore-radio" class="container-radio">
                                <li tabindex="0">
                                    <input id="tyes" class="radio rientro" type="radio" name="tutore" value="Y" <?php (isset($FieldsValue['sas_TUTORE']) && $FieldsValue['sas_TUTORE'] == "Y") ? print('checked="checked"') : "" ?> />
                                    <label for="tyes">Si</label>
                                </li>
                                <li tabindex="0">
                                    <input id="tno" class="radio" type="radio" name="tutore" value="N" <?php (isset($FieldsValue['sas_TUTORE']) && $FieldsValue['sas_TUTORE'] == "N") ? print('checked="checked"') : "" ?> />
                                    <label for="tno">No</label>
                                </li>
                            </ul>
                            
                        </li>
                        <li id="tutore" class="tutore">
                            <h3>DATI DEL TUTORE</h3>
                            <ul>
                                <li><label for="nome_t">Nome: </label><input id="nome_t" class="focus capitalize lungo" type="text" name="nome_t" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['sas_NOME_T']) ? print(htmlspecialchars($FieldsValue['sas_NOME_T'])) : '' ?>" placeholder="es. Antonella" /></li>
                                <li><label for="cognome_t">Cognome: </label><input id="cognome_t" class="focus capitalize lungo" type="text" name="cognome_t" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['sas_COGNOME_T']) ? print(htmlspecialchars($FieldsValue['sas_COGNOME_T'])) : '' ?>" placeholder="es. Rossi" /></li>
                                <li class="li-container-radio">
                                    <label>Sesso: </label>
                                    <ul class="container-radio">
                                        <li tabindex="0">
                                            <input id="tmale"class="radio rientro" type="radio" name="sesso_t" value="M" <?php (isset($FieldsValue['sas_SESSO_T']) && $FieldsValue['sas_SESSO_T'] == "M") ? print('checked="checked"') : "" ?> />
                                            <label for="tmale">Maschio</label>
                                        </li>
                                        <li tabindex="0">
                                            <input id="tfemale" class="radio" type="radio" name="sesso_t" value="F" <?php (isset($FieldsValue['sas_SESSO_T']) && $FieldsValue['sas_SESSO_T'] == "F") ? print('checked="checked"') : "" ?> />
                                            <label for="tfemale">Femmina</label>
                                        </li>
                                    </ul>
                                    
                                </li>					
                                <li><label for="indirizzo_t">Indirizzo: </label><input id="indirizzo_t" class="focus capitalize lungo" type="text" name="indirizzo_t" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['sas_INDIRIZZO_T']) ? print(htmlspecialchars($FieldsValue['sas_INDIRIZZO_T'])) : '' ?>" placeholder="es. Via Juvara" /></li>
                                <li><label for="num_civ_t">N&deg; Civico: </label><input id="num_civ_t" class="focus maiuscolo corto" type="text" name="num_civ_t" size="8" maxlength="10" autocomplete="off" value="<?php isset($FieldsValue['sas_NUMERO_CIVICO_T']) ? print(htmlspecialchars($FieldsValue['sas_NUMERO_CIVICO_T'])) : '' ?>" placeholder="es. 38" /></li>
                                <li><label for="localita_t">Localit&agrave;: </label><input id="localita_t" class="focus maiuscolo lungo" type="text" name="localita_t" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['sas_LOCALITA_T']) ? print(htmlspecialchars($FieldsValue['sas_LOCALITA_T'])) : '' ?>" placeholder="es. LUNETTA" /></li>
                                <li><label for="provincia_t">Provincia: </label><input id="provincia_t" class="focus maiuscolo corto" type="text" name="provincia_t" size="4" maxlength="2" autocomplete="off" value="<?php isset($FieldsValue['sas_PROVINCIA_T']) ? print(htmlspecialchars($FieldsValue['sas_PROVINCIA_T'])) : '' ?>" placeholder="es. MN" /></li>
                                <li><label for="cap_t">C.A.P.: </label><input id="cap_t" class="focus corto" type="text" name="cap_t" size="15" maxlength="5" autocomplete="off" value="<?php isset($FieldsValue['sas_CAP_T']) ? print(htmlspecialchars($FieldsValue['sas_CAP_T'])) : '' ?>" placeholder="es. 46100" /></li>
                                <li><label for="tel_casa_t">Tel. Casa: </label><input id="tel_casa_t" class="focus corto" type="tel" name="tel_casa_t" size="15" maxlength="15" autocomplete="off" value="<?php isset($FieldsValue['sas_TELEFONO_CASA_T']) ? print(htmlspecialchars($FieldsValue['sas_TELEFONO_CASA_T'])) : '' ?>" placeholder="es. 0376370000" /></li>
                                <li><label for="tel_cell_t">Tel. Cell.: </label><input id="tel_cell_t" class="focus corto" type="tel" name="tel_cell_t" size="15" maxlength="15" autocomplete="off" value="<?php isset($FieldsValue['sas_TELEFONO_CELLULARE_T']) ? print(htmlspecialchars($FieldsValue['sas_TELEFONO_CELLULARE_T'])) : '' ?>" placeholder="es. 3332244668" /></li>
                                <li><label for="email_t">E&minus;mail: </label><input id="email_t" class="focus lungo" type="email" name="email_t" size="50" maxlength="100" autocomplete="off" value="<?php isset($FieldsValue['sas_EMAIL_T']) ? print(htmlspecialchars($FieldsValue['sas_EMAIL_T'])) : '' ?>" placeholder="es. biblioteca@biblioteca.it" /></li>	
                                <li>
                                    <label for="tipo_documento_t">Tipo Documento: </label>
                                    <select id="tipo_documento_t" name="tipo_documento_t">
                                            <option value="0" selected="selected">Nessun Documento&nbsp;</option>
                                            <option value="1" <?php (((isset($FieldsValue['sas_TIPO_DOCUMENTO_T']) && $FieldsValue['sas_TIPO_DOCUMENTO_T'] == 1) ? print('selected="selected"') : '')) ?>>Carta d'Identit&agrave;&nbsp;</option>
                                            <option value="2" <?php (((isset($FieldsValue['sas_TIPO_DOCUMENTO_T']) && $FieldsValue['sas_TIPO_DOCUMENTO_T'] == 2) ? print('selected="selected"') : '')) ?>>Patente&nbsp;</option>
                                            <option value="3" <?php (((isset($FieldsValue['sas_TIPO_DOCUMENTO_T']) && $FieldsValue['sas_TIPO_DOCUMENTO_T'] == 3) ? print('selected="selected"') : '')) ?>>Passaporto&nbsp;</option>							
                                            <option value="4" <?php (((isset($FieldsValue['sas_TIPO_DOCUMENTO_T']) && $FieldsValue['sas_TIPO_DOCUMENTO_T'] == 4) ? print('selected="selected"') : '')) ?>>Tessera Sanitaria&nbsp;</option>							
                                    </select>
                                    
                                </li>				
                                <li><label for="num_documento_t">N&deg; Documento: </label><input id="num_documento_t" class="focus maiuscolo corto" type="text" name="num_documento_t" size="15" maxlength="50" autocomplete="off" value="<?php isset($FieldsValue['sas_NUMERO_DOCUMENTO_T']) ? print(htmlspecialchars($FieldsValue['sas_NUMERO_DOCUMENTO_T'])) : '' ?>" placeholder="es. AJ 7247773" /></li>
                            </ul>
                        </li>
                        <li class="avviso"><mark>n.b.: Compilato il Modulo, ricordarsi di stampare la Scheda e firmata dall'utente fotocopiare sul retro il Documento di Identit&agrave;</mark></li>
                        <li class="container-button">
                            <input id="reset" type="reset" name="reset" value="Reset" />
                            <input type="hidden" name="num_tes" value="<?php echo $Max_num_tessera; ?>"  />
                            <input type="hidden" name="submit" value="add_subscriber"  />
                            <input id="invia" type="submit" name="invia" value="Invia" />
                         </li>
                    </ul>
                </fieldset>
            </form>
        </div>
<?php
    include('./include-php/end_gestione.php');
?>