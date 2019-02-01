<?php
    $page = "";
    include('./include-php/head.php');
    //Controllo se c'è un ID Catalogo altrimenti rimando alla pagina index
    if(isset($_GET['id_catalog']) && !empty($_GET['id_catalog']) && preg_match('|^[0-9]+$|', $_GET['id_catalog']))
    {
        $Id_catalog = trim($_GET['id_catalog']);
    }
    else
    {
        redirect('./index.php');
        exit();
    }
    include('./include-php/intro.php');
    //Creo l'oggetto CATALOGO a partire dall'ID passatomi in GET ( QUERY URL)
    $objCatalog = new Cataloguing($objPDO,$Id_catalog);
    //Creo l'oggetto PRESTITI a partire dall'ID CATALOGO passatomi in GET ( QUERY URL)
    $Prestiti_catalog = Utility::GetPrestitiCataloguing($objPDO, $Id_catalog);
    //Numero totale prestiti per questa catalogazione
    $number_loan = count($Prestiti_catalog);
?>
        <title>Scheda Catalogazione</title>
    </head>
    <body>
<?php
        include_once("./include-php/menu.php");
?>
    <div id="corpo" class="corpo">
        <div id="scheda_global" class="scheda_global tabs" role="main">
            <ul>
                <li>
                    <a href="#scheda_cat">Scheda</a>
                </li>
                <li>
                    <a href="#prestiti">Prestiti</a>
                </li>
            </ul>
            <div id="scheda_cat">
                <h3>Scheda Catalogazione</h3>
                <div class="center container-button add-image"><button id="add-image-catalog" class="card" data-id-catalog="<?php echo $objCatalog->getID(); ?>"><img class="img_catalog" alt="Immagine Catalogazione" title="Aggiungi/Modifica Immagine Catalogazione" src="<?php echo $objCatalog->getImage(); ?>" /></button></div>
                <ul class="scheda">
                    <li>
                        <em>ISBN: </em>
                        <?php echo Utility::NoInfo($objCatalog->getIsbn()); ?>
                    </li>
                    <li>
                        <em>Propriet&agrave;: </em>
                        <?php echo Utility::NoInfo(Utility::Proprieta($objCatalog->getSigla_inv())); ?>
                    </li>
                    <li>
                        <em>Numero Inventario: </em>
                        <?php echo Utility::NoInfo($objCatalog->getNum_inv()); ?>
                    </li>
                    <li>
                        <em>Codice Dewey: </em>
                        <?php echo Utility::NoInfo($objCatalog->getCodice()); ?>
                    </li>
                    <li>
                        <em>Titolo: </em>
                        <?php echo Utility::NoInfo($objCatalog->getTitolo()); ?>
                    </li>
                    <li>
                        <em>Autore: </em>
                        <?php echo Utility::NoInfo($objCatalog->getAutore()); ?>
                    </li>
                    <li>
                        <em>Genere: </em>
                        <?php echo Utility::NoInfo($objCatalog->getGenere()); ?>
                    </li>
                    <li>
                        <em>Editore: </em>
                        <?php echo Utility::NoInfo($objCatalog->getEditore()); ?>
                    </li>
                    <li>
                        <em>Edizione: </em>
                        <?php echo Utility::NoInfo($objCatalog->getEdizione()); ?>
                    </li>
                    <li>
                        <em>Collana: </em>
                        <?php echo Utility::NoInfo($objCatalog->getCollana()); ?>
                    </li>
                    <li>
                        <em>Scaffale: </em>
                        <?php $objCatalog->getNovita() == "N" ? print(Utility::NoInfo($objCatalog->getScaffale())) : print("Novit&agrave;"); ?>
                    </li>
                    <li>
                        <em>Formato: </em>
                        <?php echo Utility::NoInfo($objCatalog->getFormato())." [cm]"; ?>
                    </li>
                    <li>
                        <em>Note Formato: </em>
                        <?php echo Utility::NoInfo($objCatalog->getNote_formato()); ?>
                    </li>
                    <li>
                        <em>N&deg; Pagine: </em>
                        <?php echo Utility::NoInfo($objCatalog->getPagine()); ?>
                    </li>
                    <li>
                        <em>Data Catalogazione: </em>
                        <?php echo Utility::NoInfo(Utility::DateTimeTransform($objCatalog->getDate_catalog())); ?>
                    </li>
                    <li>
                        <em>Novit&agrave;: </em>
                        <?php echo Utility::NoInfo(Utility::modVoce($objCatalog->getNovita())); ?>
                    </li>
                    <li>
                        <em>Costo: </em>
                        <?php echo Utility::NoInfo($objCatalog->getCosto())." &euro;"; ?>
                    </li>
                    <li>
                        <em>Provenienza: </em>
                        <?php echo Utility::NoInfo($objCatalog->getProvenienza()); ?>
                    </li>
                    <li>
                        <em>Lingua Originale: </em>
                        <?php echo Utility::NoInfo(Utility::modVoce($objCatalog->getLingua_orig())); ?>
                    </li>
                    <li>
                        <em>Titolo Originale: </em>
                        <?php echo Utility::NoInfo($objCatalog->getTitolo_orig()); ?>
                    </li>
                    <li>
                        <em>Traduttore: </em>
                        <?php echo Utility::NoInfo($objCatalog->getTraduttore()); ?>
                    </li>
                    <li>
                        <em>Testo a Fronte: </em>
                        <?php echo Utility::NoInfo(Utility::modVoce($objCatalog->getTesto_fronte())); ?>
                    </li>
                    <li>
                        <em>Lingua: </em>
                        <?php echo Utility::NoInfo($objCatalog->getLingua()); ?>
                    </li>
                    <li>
                        <em>Nazione: </em>
                        <?php echo Utility::NoInfo($objCatalog->getNazione()); ?>
                    </li>				
                    <li>
                        <em>Note: </em>
                        <?php echo Utility::NoInfo($objCatalog->getNote()); ?>
                    </li>
                    <li>
                        <em>Alienato: </em>
                        <?php echo Utility::NoInfo(Utility::modVoce($objCatalog->getAlienato())); ?>
                    </li>
                    <li>
                        <em>Visibile: </em>
                        <?php echo Utility::NoInfo(Utility::modVoce($objCatalog->getVisibile())); ?>
                    </li>
                </ul>
                <div class="container-button">
                    <a id="a_pres_cat" alt="Nuovo Prestito" title="Nuovo Prestito" href="./add_loan.php?sigla_inv=<?php echo $objCatalog->getSigla_inv(); ?>&num_inv=<?php echo $objCatalog->getNum_inv(); ?>">Nuovo Prestito</a>
<?php
    if($objUser->getAccess_level() == 3) {
?>
                    <a id="a_mod_cat" alt="Modifica" title="Modifica" href="./edit_catalog.php?id_catalog=<?php echo $Id_catalog; ?>">Modifica</a>
                    <a id="a_sch_cat" alt="Crea Scheda" title="Crea Scheda" href="./create_card_catalog.php?id_catalog=<?php echo $Id_catalog; ?>&tipo=fronte">Crea Scheda</a>
<?php
    }
?>
                </div>
            </div>
            <div id="prestiti">
                <h3>Prestiti Catalogazione</h3>
<?php	
    if($number_loan > 0) {
        if($number_loan > 1) {		
?>		
                <h4 class="ris">Sono stati trovati "<?php echo $number_loan; ?>" RISULTATI</h4>
<?php	
        } else {	
?>		
                <h4 class="ris">&Egrave; stato trovato un solo RISULTATO</h4>
<?php		
        }		
?>		
                <table id="table-prestiti-catalog" class="tabs table-prestiti-catalog">
                    <tr>
                        <th width="10%">N&deg; Tessera</th>
                        <th width="22%">Nome</th>		
                        <th width="22%">Cognome</th>
                        <th width="18%">Data Prestito</th>
                        <th width="18%">Data Restituzione</th>
                        <th width="10%">Resa</th>
                    </tr>
<?php
        //CREO LA TABELLA PRESTITI DELLA CATALOGAZIONE
        // Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
        $odd = true;
        for($i = 0;$i < $number_loan;$i++)
        {
            echo ($odd == true) ? "\t\t\t\t\t".'<tr class="odd_row">'."\n" : "\t\t\t\t\t".'<tr class="even_row">'."\n";
            $odd = !$odd;
            ($Prestiti_catalog[$i]['eresa'] == "N" ? $resa = "No" : $resa = "Si");
            echo "\t\t\t\t\t\t".'<td><strong><a class="catalog center" href="./card_subscriber.php?id_iscritto='.$Prestiti_catalog[$i]['id_iscritto'].'">'.$Prestiti_catalog[$i]['nnum_tessera'].'</a></strong></td>';
            echo '<td><em><a class="catalog" href="./card_subscriber.php?id_iscritto='.$Prestiti_catalog[$i]['id_iscritto'].'">'.$Prestiti_catalog[$i]['snome'].'</a></em></td>';						
            echo '<td><em><a class="catalog" href="./card_subscriber.php?id_iscritto='.$Prestiti_catalog[$i]['id_iscritto'].'">'.$Prestiti_catalog[$i]['scognome'].'</a></em></td>';
            echo '<td><a class="catalog center" href="./card_subscriber.php?id_iscritto='.$Prestiti_catalog[$i]['id_iscritto'].'">'.$Prestiti_catalog[$i]['data_pres'].'</a></td>';
            echo '<td><a class="catalog center" href="./card_subscriber.php?id_iscritto='.$Prestiti_catalog[$i]['id_iscritto'].'">'.$Prestiti_catalog[$i]['data_res'].'</a></td>';	
            echo '<td><a class="catalog center" href="./card_subscriber.php?id_iscritto='.$Prestiti_catalog[$i]['id_iscritto'].'">'.$Prestiti_catalog[$i]['eresa'].'</a></td>'."\n\t\t\t\t\t".'<tr>'."\n";	
        }
        echo "\n\t\t\t\t".'</table>';
    } else {
        echo "\n\t\t\t\t".'<h4>Nessun prestito per questa catalogazione.</h4>';					
    }					
?>			
            </div>
        </div>
        <div id="successo" class="dialog"><?php isset($_GET['success']) ? print(Utility::Replace(urldecode($_GET['success']))) : ""; ?></div>
<?php				
    include('./include-php/end_gestione.php');
?>