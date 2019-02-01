<?php
    $page = "ADD LOAN";
    include('./include-php/head.php');
    include('./include-php/intro.php');

    //Dichiarazione ed inizializzazione variabili temporanee
    function variablesInitialization($objPDO) {
        isset($_GET['avvisi']) ? $Avvisi = $_GET['avvisi'] : '';
        isset($_GET['errori']) ? $Errori = $_GET['errori'] : '';
        isset($_GET['successo']) ? $Successo = $_GET['successo'] : '';
        if(isset($_GET['sigla_inv']) && !empty($_GET['sigla_inv']) && isset($_GET['num_inv']) && !empty($_GET['num_inv']))
        {
            $Sigla_inv = trim($_GET['sigla_inv']);
            $Num_inv = trim($_GET['num_inv']);
            $ok_catalog = 1;	
            $Id_catalog = Cataloguing::GetIdCataloguing($objPDO, $Sigla_inv, $Num_inv);
        }
        if(isset($_GET['num_tes']) && !empty($_GET['num_tes']))
        {
            $ok_utente = 1;
            $Num_tes = trim($_GET['num_tes']);
            $Id_iscritto = Subscriber::GetIdSubscriber($objPDO, $Num_tes);
        }
        if(isset($_GET['data_pres'])) {
            $Date_pres = trim($_GET['data_pres']);
        } else {
            $Date_pres = date("Y-m-d");
        }
    }

    //Funzione per il controllo (Lato Server con PHP) campi di inserimento e visualizzazione (nel caso di Javascript non funzionante) degli errori
    function errorsControl($objSession) {
        $Errors = array();
        $Errors = $objSession->getErrorLoan();
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
        $FieldsValue = $objSession->getFieldsValueLoan();
    }
?>
        <title>Inserimento Nuovo Prestito</title>
    </head>
    <body id="target">
<?php
    include_once("./include-php/menu.php");
    echo "\n";
    variablesInitialization($objPDO);
    errorsControl($objSession);
?>
            <div id="errore" class="dialog"><?php isset($_GET['errore']) ? print(replace(urldecode($_GET['errore']))) : ""; ?></div>	
            <div id="corpo" class="corpo" role="main">
                <form id="add_loan" class="form" name="add_loan" method="post" action="./trans_global.php" enctype="application/x-www-form-urlencoded" target="_self">
                    <fieldset>
                        <h2>Inserimento Nuovo Prestito</h2>
                        <ul>
                            <li><label>ISBN: </label><input id="isbn_p" class="focus corto" type="text" name="isbn_p" size="15" maxlength="13" autocomplete="off" value="<?php isset($Isbn) ? print($Isbn) : ((isset($FieldsValue['sl_ISBN'])) ? print($FieldsValue['sl_ISBN']) : "") ?>" placeholder="es. 9788850330119" autofocus="autofocus" tabindex="1" />&nbsp;</li>
                            <li class="li-container-radio">
                                <label>Propriet&agrave;: </label>
                                <ul class="container-radio">
                                    <li tabindex="0">
                                        <input id="papillon" class="radio rientro" type="radio" name="proprieta_p" value="P" <?php (isset($Sigla_inv) && $Sigla_inv == "P") ? print('checked="checked"') : ((isset($FieldsValue['sl_SIGLA_INVENTARIO']) && $FieldsValue['sl_SIGLA_INVENTARIO'] == "P") ? print('checked="checked"') : "") ?> tabindex="2" />
                                        <label for="papillon">Papillon</label>
                                    </li>
                                    <li tabindex="0">
                                        <input id="comune" class="radio" type="radio" name="proprieta_p" value="C" <?php (isset($Sigla_inv) && $Sigla_inv == "C") ? print('checked="checked"') : ((isset($FieldsValue['sl_SIGLA_INVENTARIO']) && $FieldsValue['sl_SIGLA_INVENTARIO'] == "C") ? print('checked="checked"') : "") ?> tabindex="3" />
                                        <label for="comune">Centro Lettura</label>
                                    </li>
                                    <li tabindex="0">
                                        <input id="festival" class="radio" type="radio" name="proprieta_p" value="F" <?php (isset($Sigla_inv) && $Sigla_inv == "F") ? print('checked="checked"') : ((isset($FieldsValue['sl_SIGLA_INVENTARIO']) && $FieldsValue['sl_SIGLA_INVENTARIO'] == "F") ? print('checked="checked"') : "") ?> tabindex="4" />
                                        <label for="festival">Filo&minus;festival</label>
                                    </li>
                                </ul>
                            </li>
                            <li><label for="num_inv_p">Numero Inventario: </label><input id="num_inv_p" class="focus corto" type="text" name="num_inv_p" size="15" maxlength="15" autocomplete="off" value="<?php isset($Num_inv) ? print($Num_inv) : ((isset($FieldsValue['sl_NUMERO_INVENTARIO'])) ? print($FieldsValue['sl_NUMERO_INVENTARIO']) : "") ?>" placeholder="es. 00350" tabindex="5" />&nbsp;<a class="schede" id="num_inv_s" href="#"></a></li>
                            <li><label for="num_tes_p">Numero Tessera: </label><input id="num_tes_p" class="focus corto" type="text" name="num_tes_p" size="15" maxlength="8" autocomplete="off" value="<?php isset($Num_tes) ? print($Num_tes) : ((isset($FieldsValue['sl_NUMERO_TESSERA'])) ? print($FieldsValue['sl_NUMERO_TESSERA']) : "") ?>" placeholder="es. 1930" tabindex="6" />&nbsp;<a class="schede" id="num_tes_s" href="#"></a></li>
                            <li><label for="data_pres_p">Data Prestito: </label><input id="data_pres_p" class="focus corto" type="date" name="data_pres_p" autocomplete="off" value="<?php isset($Date_pres) ? print($Date_pres) : ((isset($FieldsValue['sl_DATA_PRESTITO'])) ? print($FieldsValue['sl_DATA_PRESTITO']) : ""); ?>" placeholder="es. 2013-01-01" tabindex="7" /></li>
                            <li class="container-button">
                                <input type="hidden" name="submit" value="add_loan" />
                                <input id="reset" type="reset" name="reset" value="Reset" />					
                                <input id="invia_form" type="submit" name="invia_form" value="Invia" />
                                <a id="scheda_c" class="prestito scheda_c" alt='Scheda Catalogazione' title='Scheda Catalogazione' href=''>Scheda Catalogazione</a>
                                <a id="scheda_s" class="prestito scheda_s" alt='Scheda Utente' title='Scheda Utente' href=''>Scheda Utente</a>
                            </li>
                        </ul>
                    </fieldset>
                </form>
            </div>
        </main>
        <div id="cataloguing" class="scheda_pagina_prestiti" draggable="true">				
            <span id="move-cataloguing" class="move" title="Sposta Scheda Catalogazioni">&nesear;</span>
            <span id="close-catalog" class="close">X</span>
            <h3>
                Scheda Catalogazione
            </h3>
            <ul>
                <li>
                    ISBN:
                </li>
                <li>
                    Propriet&agrave;:
                </li>
                <li>
                    Numero Inventario:
                </li>
                <li>
                    Codice Dewey:
                </li>
                <li>
                    Titolo:
                </li>
                <li>
                    Autore:
                </li>
                <li>
                    Genere:
                </li>
                <li>
                    Editore:
                </li>
                <li>
                    Edizione:
                </li>
                <li>
                    Collana:
                </li>
                <li>
                    Scaffale:
                </li>
                <li>
                    Formato:
                </li>
                <li>
                    Note Formato:
                </li>
                <li>
                    Pagine:
                </li>
                <li>
                    Data Catalogazione:
                </li>
                <li>
                    Novit&agrave;:
                </li>
                <li>
                    Costo:
                </li>
                <li>
                    Provenienza:
                </li>
                <li>
                    Lingua Originale:
                </li>
                <li>
                    Titolo Originale:
                </li>
                <li>
                    Traduttore:
                </li>
                <li>
                    Testo a Fronte:
                </li>
                <li>
                    Lingua:
                </li>
                <li>
                    Nazione:
                </li>					
                <li>
                    Note:
                </li>
            </ul>
        </div>
        <div id="subscriber" class="scheda_pagina_prestiti" draggable="true">
            <span id="move-subscriber" class="move" title="Sposta Scheda Utente">&nesear;</span>
            <span id="close-subscriber" class="close" title="Chiudi Scheda Utente">X</span>
            <h3>
                Scheda Utente
            </h3>
            <ul>
                <li>
                    Numero Tessera:
                </li>
                <li>
                    Data Iscrizione:
                </li>
                <li>
                    Nome:
                </li>
                <li>
                    Cognome:
                </li>
                <li>
                    Sesso:
                </li>
                <li>
                    Data Nascita:
                </li>
                <li>
                    Professione:
                </li>
                <li>
                    Indirizzo:
                </li>
                <li>
                    N&deg; Civico:
                </li>
                <li>
                    Localit&agrave;:
                </li>
                <li>
                    C.A.P.:
                </li>
                <li>
                    Provincia:
                </li>					
                <li>
                    Tel. Casa:
                </li>
                <li>
                    Tel. Cell:
                </li>
                <li>
                    Email:
                </li>
                <li>
                    Sospeso:
                </li>
                <li>
                    Internet:
                </li>
                <li>
                    Privacy:
                </li>
                <li>
                    Tipo Documento:
                </li>
                <li>
                    N&deg; Documento:
                </li>
                <li>
                    Note:
                </li>
            </ul>
        </div>
        <?php
            if(!empty(strstr($_SERVER['PHP_SELF'],"query"))) {
        ?>
        <script type="text/javascript" src="../js/utility.js"></script>
        <script type="text/javascript" src="../js/gestione.js"></script>
        <?php
            } else {
        ?>
        <script type="text/javascript" src="./js/utility.js"></script>
        <script type="text/javascript" src="./js/gestione.js"></script>
        <?php
            }
        ?>
    </body>
</html>
