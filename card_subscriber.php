<?php
    $page = "";
    include('./include-php/head.php');
    //Controllo se c'è un ID ISCRITTO altrimenti rimando alla pagina index
    if(isset($_GET['id_iscritto']) && !empty($_GET['id_iscritto']) && preg_match('|^[0-9]+$|', $_GET['id_iscritto']))
    {
        $Id_iscritto = trim($_GET['id_iscritto']);
    }
    else
    {
        redirect('./index.php');
        exit();
    }
    include('./include-php/intro.php');
    //Dichiaro ed inizializzo le variabili temporanee
    $Anno_max = (date('Y')+1);
    $Anno_p = (isset($_GET['anno_p']) && !empty($_GET['anno_p'])) ? trim($_GET['anno_p']) : '';
    //INSTANZIO l'OGGETTO ISCRITTO
    $objSubscriber = new Subscriber($objPDO,$Id_iscritto);
    //Controllo se l'iscritto è socio
    $Socio = Utility::ControlSocio($objPDO, $Id_iscritto);
    //Controllo se l'iscritto ha un tutore ed in caso la risposta sia affermativa INSTANZIO l'OGGETTO TUTORE
    if($objSubscriber->getTutore() == "Y")
    {
        $Id_tutore = LegalGuardian::GetIdLegalGuardian($objPDO, $Id_iscritto);
        $objLegalGuardian = new LegalGuardian($objPDO, $Id_tutore);
    }
    //Creo la stringa titolo anno a seconda del valore della variabile Anno_p
    !empty($Anno_p) ? $Tit_anno = " nell'anno ".$Anno_p : $Tit_anno = " da quando &egrave; iscritto";
    //OTTENGO i PRESTITI dell'ISCRITTO TRAMITE l'ID ISCRITTO e l'ANNO
    $Prestiti_iscritto = Utility::GetPrestitiIscritto($objPDO, $Id_iscritto, $Anno_p);
    //OTTENGO il NUMERO TOTALE DEI PRESTITI a seconda dell'ID ISCRITTO e dell'ANNO VOLUTO
    $number_loan = count($Prestiti_iscritto);
    //OTTENGO LE SOSPENSIONI dell'ISCRITTO
    $Sospensioni_iscritto = Utility::GetSospensioniIscritto($objPDO, $Id_iscritto);
    //OTTENGO il NUMERO DELLE SOSPENSIONI dell'ISCRITTO
    $number_sospensions = count($Sospensioni_iscritto);
    //OTTENGO GLI ANNI DI QUANDO è stato SOCIO l'ISCRITTO
    $Anni_socio_iscritto = Utility::GetAnniSocioIscritto($objPDO, $Id_iscritto);
    //OTTENGO il NUMERO DI VOLTE IN CUI l'ISCRITTO è stato SOCIO
    $number_anni_socio_iscritto = count($Anni_socio_iscritto);
?>
        <title>Scheda Iscritto</title>
    </head>
    <body>
<?php
        include_once("./include-php/menu.php");
        echo "\n";
?>
    <div id="corpo" class="corpo">
        <div id="scheda_global" class="scheda_global tabs" role="main">
            <ul>
                <li>
                    <a href="#scheda_ute">Scheda</a>
                </li>
                <li>
                    <a href="#prestiti">Prestiti</a>
                </li>
                <li>
                    <a href="#sospensioni">Sospensioni</a>
                </li>
                <li>
                    <a href="#socio">Socio</a>
                </li>
            </ul>
            <div id="scheda_ute">
                <h3>Scheda Iscritto</h3>
                <?php ($objSubscriber->getSospeso() == "Y" ? print('<p class="sospeso">(UTENTE SOSPESO)</p>') : ""); ?>
                <div class="center container-button add-image"><button id="add-image-subscriber" class="card" data-id-subscriber="<?php echo $objSubscriber->getID(); ?>"><img class="img_subscriber" alt="Immagine Iscritto" title="Aggiungi/Modifica Immagine Iscritto" src="<?php echo $objSubscriber->getImage(); ?>" /></button></div>
                <ul class="scheda">
                    <li>
                        <em>Numero Tessera: </em>
                        <?php echo Utility::NoInfo($objSubscriber->getNum_tessera()); ?>
                    </li>
                    <li>
                        <em>Data Iscrizione: </em>
                        <?php echo Utility::NoInfo(Utility::DateTimeTransform($objSubscriber->getData_iscrizione())); ?>
                    </li>
                    <li>
                        <em>Nome: </em>
                        <?php echo Utility::NoInfo($objSubscriber->getNome()); ?>
                    </li>
                    <li>
                        <em>Cognome: </em>
                        <?php echo Utility::NoInfo($objSubscriber->getCognome()); ?>
                    </li>
                    <li>
                        <em>Sesso: </em>
                        <?php echo Utility::NoInfo(Utility::modVoce($objSubscriber->getSesso())); ?>
                    </li>
                    <li>
                        <em>Data di Nascita: </em>
                        <?php echo Utility::NoInfo(Utility::DateTimeTransform($objSubscriber->getData_nascita())); ?>
                    </li>
                    <li>
                        <em>Professione: </em>
                        <?php echo Utility::NoInfo($objSubscriber->getProfessione()); ?>
                    </li>
                    <li>
                        <em>Indirizzo: </em>
                        <?php echo Utility::NoInfo($objSubscriber->getIndirizzo()); ?>
                    </li>
                    <li>
                        <em>N&deg; Civico: </em>
                        <?php echo Utility::NoInfo($objSubscriber->getNum_civico()); ?>
                    </li>
                    <li>
                        <em>Localit&agrave;: </em>
                        <?php echo Utility::NoInfo($objSubscriber->getLocalita()); ?>
                    </li>
                    <li>
                        <em>Provincia: </em>
                        <?php echo Utility::NoInfo($objSubscriber->getProvincia()); ?>
                    </li>
                    <li>
                        <em>C.A.P.: </em>
                        <?php echo Utility::NoInfo($objSubscriber->getCap()); ?>
                    </li>
                    <li>
                        <em>Telefono Casa: </em>
                        <?php echo Utility::NoInfo($objSubscriber->getTel_casa()); ?>
                    </li>
                    <li>
                        <em>Telefono Cellulare: </em>
                        <?php echo Utility::NoInfo($objSubscriber->getTel_cell()); ?>
                    </li>
                    <li>
                        <em>E&minus;Mail: </em>
                        <?php echo Utility::NoInfo($objSubscriber->getEmail()); ?>
                    </li>
                    <li id="sospeso">
                        <em>Sospeso: </em>
                        <?php echo Utility::NoInfo(Utility::modVoce($objSubscriber->getSospeso())); ?>
                    </li>
                    <li>
                        <em>Internet: </em>
                        <?php echo Utility::NoInfo(Utility::modVoce($objSubscriber->getInternet())); ?>
                    </li>
                    <li id="privacy">
                        <em>Privacy: </em>
                        <?php echo Utility::NoInfo(Utility::modVoce($objSubscriber->getPrivacy())); ?>
                    </li>
                    <li>
                        <em>Socio Papillon: </em>
                        <?php echo Utility::NoInfo(Utility::modVoce($Socio)); ?>
                    </li>
                    <li>
                        <em>Tipo Documento: </em>
                        <?php echo Utility::Documento($objSubscriber->getTipo_documento()); ?>
                    </li>
                    <li>
                        <em>n&deg; Documento: </em>
                        <?php echo Utility::NoInfo($objSubscriber->getNum_documento()); ?>
                    </li>
                    <li>
                        <em>Note: </em>
                        <?php echo Utility::NoInfo($objSubscriber->getNote()); ?>
                    </li>
                    <li>
                        <em>Tutore: </em>
<?php 
    echo Utility::NoInfo(Utility::modVoce($objSubscriber->getTutore())); 
    if($objSubscriber->getTutore() == "Y") {
?>
                        &nbsp;<button id="vedi_dati_tutore" class="button vedi_dati_tutore">Vedi Dati Tutore</button>
                        <div id="container_tutore" class="container_tutore">
                            <h4 id="tit_tutore" class="tit_tutore">DATI TUTORE</h4>
                            <ul id="dati_tutore" class="dati_tutore">
                                <li>
                                    <em>Nome: </em>
                                    <?php echo Utility::NoInfo($objLegalGuardian->getNome()); ?>
                                </li>
                                <li>
                                    <em>Cognome: </em>
                                    <?php echo Utility::NoInfo($objLegalGuardian->getCognome()); ?>
                                </li>
                                <li>
                                    <em>Sesso: </em>
                                    <?php echo Utility::NoInfo(Utility::modVoce($objLegalGuardian->getSesso())); ?>
                                </li>
                                <li>
                                    <em>Indirizzo: </em>
                                    <?php echo Utility::NoInfo($objLegalGuardian->getIndirizzo()); ?>
                                </li>
                                <li>
                                    <em>N&deg; Civico: </em>
                                    <?php echo Utility::NoInfo($objLegalGuardian->getNum_civico()); ?>
                                </li>
                                <li>
                                    <em>Localit&agrave;: </em>
                                    <?php echo Utility::NoInfo($objLegalGuardian->getLocalita()); ?>
                                </li>
                                <li>
                                    <em>Provincia: </em>
                                    <?php echo Utility::NoInfo($objLegalGuardian->getProvincia()); ?>
                                </li>
                                <li>
                                    <em>C.A.P.: </em>
                                    <?php echo Utility::NoInfo($objLegalGuardian->getCap()); ?>
                                </li>
                                <li>
                                    <em>Telefono Casa: </em>
                                    <?php echo Utility::NoInfo($objLegalGuardian->getTel_casa()); ?>
                                </li>
                                <li>
                                    <em>Telefono Cellulare: </em>
                                    <?php echo Utility::NoInfo($objLegalGuardian->getTel_cell()); ?>
                                </li>
                                <li>
                                    <em>E&minus;Mail: </em>
                                    <?php echo Utility::NoInfo($objLegalGuardian->getEmail()); ?>
                                </li>
                                <li>
                                    <em>Tipo Documento: </em>
                                    <?php echo Utility::Documento($objLegalGuardian->getTipo_documento()); ?>
                                </li>
                                <li>
                                    <em>n&deg; Documento: </em>
                                    <?php echo Utility::NoInfo($objLegalGuardian->getNum_documento()); ?>
                                </li>
                            </ul>
                        </div>	
<?php
    }
?>
                    </li>
                    <li class="avviso">
                        <mark>n.b.: in caso di modifiche apportate alla &quot;Scheda Utente&quot;, l'operatore STAMPA la nuova Scheda da posizionare in ufficio per l'Amministratore</mark>
                    </li>
                </ul>
                <div class="container-button">
<?php
    if($objSubscriber->getSospeso() == "N") {
?>					
                    <a id="a_pres_ute" title="Nuovo Prestito" href="./add_loan.php?num_tes=<?php echo $objSubscriber->getNum_tessera(); ?>">Nuovo Prestito</a>
<?php
    }
?>
                    <a id="a_mod_ute" title="Modifica" href="./edit_subscriber.php?id_iscritto=<?php echo $Id_iscritto; ?>">Modifica</a>
<?php
    if($objUser->getAccess_level() == 3 && $objSubscriber->getSospeso() == "N") {
?>
                    <a id="a_sosp_ute" class="sospendi" title="Sospendi" href="./trans_global.php?submit=sospendi&id_iscritto=<?php echo $Id_iscritto; ?>">Sospendi</a>
<?php
    } else if($objUser->getAccess_level() == 3 && $objSubscriber->getSospeso() == "Y") {
?>
                    <a id="a_riam_ute" title="Riammetti" href="./trans_global.php?submit=riammetti&id_iscritto=<?php echo $Id_iscritto;; ?>">Riammetti</a>
<?php
    }
?>
                    <a id="a_sta_ute" title="Stampa Scheda" href="./card_subscriber_print.php?id_iscritto=<?php echo $Id_iscritto;; ?>">Stampa Scheda</a>
                </div>
            </div>
            <div id="prestiti">
                <h3>Prestiti Utente<?php !empty($Anno_p) ? print(" (ANNO ".$Anno_p.")") : '' ?></h3>
<?php
    if($number_loan > 0 || !empty($Anno_p))
    {
?>
                <div id="anno_pres">
                    <form class="form form-prestito" name="form_prestito" action="./card_subscriber.php" method="get">
                        <fieldset>
                            <h3>
                                Scegli anno prestiti
                            </h3>
                            <ul>
                                <li>
                                    <label for="anno_prestiti" required>Anno:</label>
                                    <select id="anno_prestiti" class="focus" name="anno_p">
                                        <option value="">Tutti</option>
                                        <?php
                                            for($i = $Anno_max; $i >= 1980; $i--) {
                                                if(!empty($Anno_p) && $i == $Anno_p) {
                                                    echo '<option value="'.$Anno_p.'" selected="selected">'.$Anno_p.'</option>';
                                                } else {
                                                    echo '<option value="'.$i.'">'.$i.'</option>';
                                                }
                                            }
                                            echo "\n";
                                        ?>
                                    </select>
                                </li>
                                <li class="container-button">
                                    <input id="reset" type="reset" name="reset" value="Reset" />
                                    <input type="hidden" name="id_iscritto" value="<?php echo $Id_iscritto; ?>" />
                                    <input type="hidden" name="p" value="1" />
                                    <input type="hidden" name="tr" value="" />
                                    <input id="invia_prestito" type="submit" name="invia" value="Invia" />
                                </li>
                            </ul>
                        </fieldset>
                    </form>
                </div>              
<?php
    }
    if($number_loan > 0)
    {
?>
                <table id="table-prestiti" class="tabs prestito table-prestiti">
<?php
        if($number_loan > 1) {		
?>		
                    <caption class="ris">L'utente ha effettuato "<?php echo $number_loan; ?>" PRESTITI<?php echo $Tit_anno; ?></caption>
<?php	
        } else {	
?>		
                    <caption class="ris">L'utente ha effettuato un solo PRESTITO<?php echo $Tit_anno; ?></caption>
<?php		
        }		
?>		
                    <tr>
<?php
        if($objUser->getAccess_level() == 3) {
?>
                        <th width="15%">Autore</th>
                        <th width="17%">Titolo</th>		
                        <th width="14%">Genere</th>
                        <th width="12%">Prestito</th>
                        <th width="12%">Restituzione</th>
                        <th width="5%">Resa</th>
                        <th width="8%">Rinnova</th>
                        <th width="10%">Restituisce</th>
                        <th width="7%">Elimina</th>
<?php
        } else {
?>
                        <th width="17%">Autore</th>
                        <th width="17%">Titolo</th>		
                        <th width="15%">Genere</th>
                        <th width="13%">Prestito</th>
                        <th width="13%">Restituzione</th>
                        <th width="5%">Resa</th>
                        <th width="9%">Rinnova</th>
                        <th width="11%">Restituisce</th>
<?php
        }
?>
                    </tr>
<?php
        //CREO LE INFORMAZIONI DA INSERIRE NELLA TABELLA DEI PRESTITI
        // Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
        $odd = true;
        for($i = 0;$i < $number_loan;$i++)
        {
            echo ($odd == true) ? "\t\t\t\t\t".'<tr class="odd_row">'."\n" : "\t\t\t\t\t".'<tr class="even_row">'."\n";
            $odd = !$odd;
            $resa = Utility::modVoce($Prestiti_iscritto[$i]['eresa']);
            $Ini_codice = substr($Prestiti_iscritto[$i]['scodice'],0,1);
            echo "\t\t\t\t\t\t".'<td><strong><a class="catalog" href="./card_catalog.php?id_catalog='.$Prestiti_iscritto[$i]['id_catalog'].'">'.$Prestiti_iscritto[$i]['sautore'].'</a></strong></td>';
            echo '<td><em><a class="catalog" href="./card_catalog.php?id_catalog='.$Prestiti_iscritto[$i]['id_catalog'].'">'.$Prestiti_iscritto[$i]['stitolo'].'</a></em></td>';						
            echo '<td><em><a class="catalog" href="./card_catalog.php?id_catalog='.$Prestiti_iscritto[$i]['id_catalog'].'">'.$Prestiti_iscritto[$i]['sgenere'].'</a></em></td>';
            echo '<td><a class="catalog center" href="./card_catalog.php?id_catalog='.$Prestiti_iscritto[$i]['id_catalog'].'">'.$Prestiti_iscritto[$i]['data_pres'].'</a></td>';
            echo '<td><a class="catalog center" href="./card_catalog.php?id_catalog='.$Prestiti_iscritto[$i]['id_catalog'].'">'.$Prestiti_iscritto[$i]['data_res'].'</a></td>';	
            echo '<td style="text-align: center;"><a class="catalog" href="./card_catalog.php?id_catalog='.$Prestiti_iscritto[$i]['id_catalog'].'">'.$resa.'</a></td>';
            echo '<td style="text-align: center;"><a '.($resa == "Si" ? "style='display: none;'" : "").' class="catalog" href="./trans_global.php?submit=rinnova&id_catalog='.$Prestiti_iscritto[$i]['id_catalog'].'&id_iscritto='.$objSubscriber->getID().'&id_prestito='.$Prestiti_iscritto[$i]['id_prestito'].'">Rinnova</a></td>';
            echo '<td style="text-align: center;"><a '.($resa == "Si" ? "style='display: none;'" : "").' class="catalog" href="./trans_global.php?submit=restituisce&id_catalog='.$Prestiti_iscritto[$i]['id_catalog'].'&id_iscritto='.$objSubscriber->getID().'&id_prestito='.$Prestiti_iscritto[$i]['id_prestito'].'">Restituisce</a></td>'
            .($objUser->getAccess_level() == 3 ? '<td style="text-align: center;"><a class="catalog elimina" href="./trans_global.php?submit=elimina_prestito&id_catalog='.$Prestiti_iscritto[$i]['id_catalog'].'&id_iscritto='.$objSubscriber->getID().'&id_prestito='.$Prestiti_iscritto[$i]['id_prestito'].'">Elimina</a></td>' : "")."\n\t\t\t\t\t".'</tr>'."\n";	
        }		
        echo "\n\t\t\t\t".'</table>';
    }
    else
    {
        if(empty($Anno_p))
        {
            echo "\n\t\t\t\t".'<h4>Nessun prestito per questo utente</h4>'."\n";
        }
        else
        {
            echo "\n\t\t\t\t".'<h4>Nessun prestito nell\'anno '.$Anno_p.' per questo utente</h4>'."\n";
        }
    }
?>
            </div>
            <div id="sospensioni">
                <h3>Sospensioni</h3>
<?php		
    if($number_sospensions > 0) {	
?>		
                <table id="ris" class="tabs">
                    <tr>
                        <th width="10%">N&deg;</th>
                        <th width="20%">Data Sospensione</th>		
                        <th width="20%">Data Riammissione</th>
                        <th width="50%">Motivazione</th>
                    </tr>
<?php
        //CREO LE INFORMAZIONI DA INSERIRE NELLA TABELLA DELLE SOSPENSIONI
        // Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
        $odd = true;
        for($i = 0;$i < $number_sospensions;$i++)
        {
            echo ($odd == true) ? "\t\t\t\t\t".'<tr class="odd_row">'."\n" : "\t\t\t\t\t".'<tr class="even_row">'."\n";
            $odd = !$odd;
            echo "\t\t\t\t\t\t".'<td class="center"><strong>'.($i+1).'</strong></td>';
            echo '<td class="center"><em>'.$Sospensioni_iscritto[$i]['data_sosp'].'</em></td>';						
            echo '<td class="center"><em>'.$Sospensioni_iscritto[$i]['data_riammis'].'</em></td>';						
            echo '<td class="center"><em>'.($Sospensioni_iscritto[$i]['smotivazione'] != null ? "<span id=\"".$Sospensioni_iscritto[$i]['id_sospeso']."\" class=\"motivazione\" tabindex=\"0\">".$Sospensioni_iscritto[$i]['smotivazione']."</span>" : "<span id=\"".$Sospensioni_iscritto[$i]['id_sospeso']."\" class=\"motivazione\" tabindex=\"0\">Motiva</span>").'</em></td>'."\n\t\t\t\t\t".'<tr>'."\n";	
        }		
        echo "\n\t\t\t\t".'</table>';
    } else {
        echo "\n\t\t\t\t".'<h4>Nessuna sospensione per questo utente</h4>';					
    }
    echo "\n";					
?>
                <div id="motiv_sosp">
                    <form id="form_motivazione" class="form form_mot" name="form_motivazione" action="#" method="get">
                        <fieldset>
                            <h3>
                                Inserisci la motivazione della sospensione:
                            </h3>
                            <ul>
                                <li>
                                    <label for="motivazione" required>Motivazione:</label>
                                    <input id="motivazione" class="focus" type="text" name="motivazione" size="40" maxlength="150" />
                                </li>
                                <li class="container-button">
                                    <input id="reset" type="reset" name="reset" value="Reset" />
                                    <input id="id_sospeso" type="hidden" name="id_sospeso" value="<?php isset($id_sospeso) ? $id_sospeso : ""; ?>"  />
                                    <input type="hidden" name="tipo" value="motivazione"  />
                                    <input id="invia_mot" type="submit" name="invia" value="Invia" />
                                </li>
                            </ul>
                        </fieldset>
                    </form>
                </div>                                        
            </div>
            <div id="socio">
                <h3>Socio</h3>
<?php
    if($number_anni_socio_iscritto > 0) {
        echo "\n";
?>
                <table id="ris" class="tabs">
                    <tr>
                        <th width="20%">N&deg; Socio</th>
                        <?php ($objUser->getAccess_level() == 3) ? print('<th width="50%">Anno</th><th width="30%">Opzione</th>') : print('<th width="80%">Anno</th>'); ?>
                    </tr>
<?php
        // CREO la INFORMAZIONI DA INSERIRE NELLA TABELLA SOCIO
        // Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
        $odd = true;
        for($i = 0;$i < $number_anni_socio_iscritto;$i++)
        {
            echo ($odd == true) ? "\t\t\t\t\t".'<tr class="odd_row">'."\n" : "\t\t\t\t\t".'<tr class="even_row">'."\n";
            $odd = !$odd;
            echo "\t\t\t\t\t\t".'<td><strong>'.($i+1).'</strong></td>';
            echo '<td class="center"><em>'.$Anni_socio_iscritto[$i].'</em></td>'."\n\t\t\t\t\t";
            ($objUser->getAccess_level() == 3) ? print('<td class="center"><a class="socio" alt="Elimina" title="Elimina socio per questo anno" href="./trans_global.php?submit=eli_socio&id_iscritto='.$Id_iscritto.'&anno_socio='.$Anni_socio_iscritto[$i].'" >Elimina</a></td></tr>') : print('<tr>'."\n");
        }		
        echo "\n\t\t\t\t".'</table>';
    } else {
        echo "\n\t\t\t\t".'<h4>Mai stato socio</h4>'."\n";					
    }
?>
                <div class="center"><button id="button_socio" class="button" alt="Socio" title="Socio">Socio</button></div>
                <div id="ins_socio" class="ins_socio">
                    <form id="form_socio" class="form socio" name="form_socio" action="#" method="get" >
                        <fieldset>
                            <h3>
                                Inserimento Socio
                            </h3>
                            <ul>
                                <li>
                                    <label for="anno_socio" required>Anno:</label>
                                    <select id="anno_socio" class="focus" name="anno_socio">
                                        <?php
                                            for($i = $Anno_max; $i >= 1980; $i--) {
                                                if($i == $Anno_max-1) {
                                                    echo '<option value="'.$i.'" selected="selected">'.$i.'</option>';
                                                } else {
                                                    echo '<option value="'.$i.'">'.$i.'</option>';
                                                }
                                            }
                                            echo "\n";
                                        ?>
                                    </select>
                                </li>
                                <li class="container-button">
                                    <input id="reset" type="reset" name="reset" value="Reset" />
                                    <input id="cod_iscritto" type="hidden" name="id_iscritto" value="<?php echo $Id_iscritto; ?>"  />
                                    <input type="hidden" name="tipo" value="socio"  />
                                    <input id="invia_socio" type="submit" name="invia" value="Invia" />
                                </li>
                            </ul>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
        <!--
            <div id="yes_sospeso" class="dialog">L'uetnte &egrave; sospeso per cui &egrave; vietato effettuare prestiti.</div>
            <div id="no_privacy" class="dialog">L'utente non ha la privacy per cui &egrave; necessario fargli compilare i relativi documenti.</div>
            <div id="no_prestito" class="dialog"><?php isset($_GET['errori']) ? print(Utility::Replace(urldecode($_GET['errori']))) : ""; ?></div>
            <div id="successo" class="dialog"><?php isset($_GET['success']) ? print(Utility::Replace(urldecode($_GET['success']))) : ""; ?></div>
            <div id="info_socio" class="dialog"><?php isset($_GET['info_socio']) ? print(Utility::Replace(urldecode($_GET['info_socio']))) : ""; ?></div>
            <div id="avvisi" class="dialog"><?php isset($_GET['errore']) ? print(Utility::Replace(urldecode($_GET['errore']))) : ''; ?></div>
            <div id="errore" class="dialog"><?php isset($_GET['errore_sosp']) ? print(Utility::Replace(urldecode($_GET['errore_sosp']))) : ''; ?></div>
        -->
<?php				
    # Chiusura della connessione
    include('./include-php/end_gestione.php');
?>