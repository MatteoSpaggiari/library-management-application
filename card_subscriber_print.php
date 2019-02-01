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
    //INSTANZIO l'OGGETTO ISCRITTO
    $objSubscriber = new Subscriber($objPDO,$Id_iscritto);
    //VERIFICO SE l'ISCRITTO HA UN TUTORE ed in caso AFFERMATIVO INSTANZIO l'OGGETTO TUTORE
    if($objSubscriber->getTutore() == "Y") {
        $Id_legal_guardian = LegalGuardian::GetIdLegalGuardian($objPDO, $Id_iscritto);
        $objLegalGuardian = new LegalGuardian($objPDO,$Id_legal_guardian);
    }
    //CONTROLLO SE l'ISCRITTO è SOCIO e INIZIALIZZO  una VARIABILE TEMPORANEA
    $Control_socio = Utility::ControlSocio($objPDO, $Id_iscritto);
    if($Control_socio > 0) {
        $Socio = 'Y';
    } else {
        $Socio = 'N';
    }
?>	
		<link rel="stylesheet" type="text/css" media="print" href="./css/print_table.css" />
		<script language="JavaScript" type="text/javascript" src="./js/card_subscriber_print.js"></script>
		<title>Scheda Utente</title>
	</head>
        <body class="scheda_utente_stampa">
<?php
	include_once("./include-php/menu.php");
?>
            <div class="box">
                <div id="box_sinistra" class="box_sinistra">
                    <p>Iscrizione a Internet: <?php echo strtoupper(Utility::modVoce($objSubscriber->getInternet())); ?></p>
			<div class="isc_int">
                            <h3>Informativa sulla tutela dei dati personali ai sensi degli art. 12 e 13 del Regolamento (UE) 2016/679 del Parlamento Europeo e del Consiglio del 27 aprile 2016</h3>
                            <p>In merito al trattamento dei Suoi dati personali si comunica quanto segue:</p>
                            <ol>
                                <li>
                                    <strong>Titolare del trattamento:</strong> Rappresentante legale pro-tempore dell’Associazione - Via Lombardia 16 46100 Mantova.
                                </li>
                                <li>
                                    <strong>Finalità del trattamento:</strong> I dati personali forniti sono trattati con modalità informatiche e sono necessari all'erogazione dei servizi di prestito librario e per l’invio delle comunicazioni. Il mancato conferimento dei dati e la mancata autorizzazione al loro trattamento non consentono l'erogazione dei servizi suddetti. I dati saranno trattati esclusivamente dal personale dell’Associazione espressamente nominato come responsabile del trattamento e non saranno comunicati a terzi né diffusi, se non nei casi specificamente previsti dal diritto nazionale o dell'Unione europea.
                                </li>
                                <li>
                                    <strong>Periodo di conservazione dei dati:</strong> I dati vengono conservati fino a quando non si ricorrerà al diritto di cancellazione degli stessi di cui al punto successivo.
                                </li>
                                <li>
                                    <strong>Accesso, rettifica o cancellazione dei dati – Reclamo:</strong> Ai sensi dell’articolo 13, comma 2, lettera b) del Regolamento 2016/679, Lei ha il diritto di chiedere al titolare del trattamento l’accesso, la rettifica o la cancellazione dei suoi dati. Ai sensi dell’articolo 13, comma 2, lettera d) del Regolamento 2016/679, ricorrendone i presupposti, Lei ha il diritto di proporre reclamo al Garante, quale autorità di controllo, secondo le procedure previste.
                                </li>
                            </ol>
                            <p>
                                ACESSO A INTERNET: Il sottoscritto dichiara di aver preso visione e accettare le seguenti condizioni:
                            </p>
                            <ul>
                                <li>
                                    Non danneggiare o rimuovere le configurazioni software e hardware dei PC della Biblioteca;
                                </li>
                                <li>
                                    Osservare le disposizioni vigenti relative al copyright, alla frode, alla privacy e ad ogni altra disposizione di legge;
                                </li>
                                <li>
                                    Utilizzare esclusivamente -per scaricare file- dispositivi privi di virus;
                                </li>
                                <li>
                                    Utilizzare la posta elettronica ed assumerne la piena responsabilità per il contenuto dei messaggi immessi;
                                </li>
                                <li>
                                    Riconoscere che la Biblioteca non è responsabile per il contenuto, la qualità, la validità di qualsiasi informazione reperita in Rete;
                                </li>
                                <li>
                                    Essere consapevole che gli Operatori dell’Associazione che gestiscono la Biblioteca si riservano di effettuare, nei tempi e nei modi che riterranno opportuni, controlli relativi ai siti visitati dagli utenti;
                                </li>
                                <li>
                                    Assumere in generale ogni responsabilità derivante dall’uso del servizio internet offerto dalla Biblioteca.
                                </li>
                            </ul>
                            <p>
                                Per accettazione: ..............................................
                            </p>
			</div>
                    </div>
                    <div id="box_destra" class="box_destra">
                        <div class="info-biblioteca">
                            <div>
                                <img alt="logo" title="Logo" src="./images/logo.png" />
                            </div>
                            <ul>
                                <li>Associazione culturale di volontari operante presso la Biblioteca di quartiere Lunetta&minus;Frassino:</li>
                                <li>Viale Veneto 31/A Mantova &minus; 46100 MANTOVA;</li>
                                <li>Tel: 0376/370712; Fax: 0376-370712</li>
                                <li>Sito Internet: www.papillon&minus;centrolettura.it;</li>
                                <li>Email: info@papillon-centrolettura.it;</li>
                                <li>Codice Fiscale: 93029490203</li>
                            </ul>
                        </div>
                        <div id="scheda_ute" class="scheda_ute">
                            <h3>MODULO DI ISCRIZIONE</h3>
                            <ul>
                                <li>
                                    <em>Numero Tessera: </em>
                                    <?php echo Utility::NoInfo($objSubscriber->getNum_tessera()); ?>
                                    &nbsp;
                                    <em>Data Iscrizione: </em>
                                    <?php echo Utility::NoInfo(Utility::DateTimeTransform($objSubscriber->getData_iscrizione(), "date")); ?>
                                </li>
                                <li>
                                        <em>Nome: </em>
                                        <?php echo Utility::NoInfo($objSubscriber->getNome()); ?>
                                        &nbsp;
                                        <em>Cognome: </em>
                                        <?php echo Utility::NoInfo($objSubscriber->getCognome()); ?>
                                </li>
                                <li>
                                    <em>Sesso: </em>
                                    <?php echo Utility::NoInfo(Utility::modVoce($objSubscriber->getSesso())); ?>
                                    &nbsp;
                                    <em>Data di Nascita: </em>
                                    <?php echo Utility::NoInfo(Utility::DateTimeTransform($objSubscriber->getData_nascita())); ?>
                                </li>
                                <li>
                                    <em>Professione: </em>
                                    <?php echo Utility::NoInfo($objSubscriber->getProfessione()); ?>
                                </li>
                                <li>
                                    <em>Indirizzo: </em>
                                    <?php echo trim(Utility::NoInfo($objSubscriber->getIndirizzo()))." ".($objSubscriber->getNum_civico())."\n"; ?>
                                </li>
                                <li>
                                    <em>Localit&agrave;: </em>
                                    <?php echo Utility::NoInfo($objSubscriber->getLocalita()); ?>
                                </li>
                                <li>
                                    <em>Provincia: </em>
                                    <?php echo Utility::NoInfo($objSubscriber->getProvincia()); ?>
                                    &nbsp;
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
                                    &nbsp;
                                    <em>Internet: </em>
                                    <?php echo Utility::NoInfo(Utility::modVoce($objSubscriber->getInternet())); ?>
                                </li>
                                <li id="privacy">
                                    <em>Privacy: </em>
                                    <?php echo Utility::NoInfo(Utility::modVoce($objSubscriber->getPrivacy())); ?>
                                    &nbsp;
                                    <em>Socio Papillon: </em>
                                    <?php echo Utility::NoInfo(Utility::modVoce($Socio)); ?>
                                </li>
                                <li>
                                    <em>Documento: </em>
                                    <?php echo Utility::Documento($objSubscriber->getTipo_documento()); ?>
                                    &nbsp;
                                    <em>n&deg;: </em>
                                    <?php echo Utility::NoInfo($objSubscriber->getNum_documento()); ?>
                                </li>
                            </ul>
                            <p style="text-align: right !important;">
                                    In fede ......................................................
                            </p>
                            <p>
                                <strong style="color: black;">Per il minore firma il tutore:</strong>
                            </p>
                            <ul>
<?php
	if($objSubscriber->getTutore() == "N") {
?>
                                <li>Documento ....................................... n&deg; ................................................</li>
                                <li>Cognome: ............................................. Nome: .....................................</li>
                                <li>Via: ...................................................................... n&deg; ........</li>
                                <li>Localit&agrave;: .......................................................... Prov: ........</li>
                                <li>Tel: .................................................... Cell: ...........................................</li>
                                <li>E&minus;mail: ..................................................................................................</li>
<?php
	} else {
		echo "\t\t\t"."<li class=\"blu\">\n\t\t\t\t<strong>Documento: </strong>".Utility::Documento($objLegalGuardian->getTipo_documento())."&nbsp;&nbsp;&nbsp;<strong>n&deg;: </strong>".Utility::NoInfo($objLegalGuardian->getNum_documento())."\t\t\t</li>
			<li class=\"blu\"><strong>Cognome: </strong>".Utility::NoInfo($objLegalGuardian->getCognome())."&nbsp;&nbsp;<strong>Nome: </strong>".Utility::NoInfo($objLegalGuardian->getNome())."&nbsp;&nbsp;<strong>Sesso: </strong>".Utility::NoInfo(Utility::modVoce($objLegalGuardian->getSesso()))."</li>
			<li class=\"blu\"><strong>Via: </strong>".trim(Utility::NoInfo($objLegalGuardian->getIndirizzo()))." </strong>".Utility::NoInfo($objLegalGuardian->getNum_civico())."</li>
			<li class=\"blu\"><strong>Localit&agrave;: </strong>".Utility::NoInfo($objLegalGuardian->getLocalita())."&nbsp;&nbsp;&nbsp;<strong>Prov: </strong>".Utility::NoInfo($objLegalGuardian->getProvincia())."&nbsp;&nbsp;&nbsp;<strong>C.A.P.: </strong>".Utility::NoInfo($objLegalGuardian->getCap())."</li>
			<li class=\"blu\"><strong>Tel: </strong>".Utility::NoInfo($objLegalGuardian->getTel_casa())."&nbsp;&nbsp;&nbsp;<strong>Cell: </strong>".Utility::NoInfo($objLegalGuardian->getTel_cell())."</li>
			<li class=\"blu\"><strong>E&minus;mail: </strong>".Utility::NoInfo($objLegalGuardian->getEmail())."</li>";
	}
?>
                            </ul>
                            <p style="text-align: right !important;">
                                    Il tutore .....................................................
                            </p>
                            <div class="container-button">
                                <button id="stampa" type="button">Stampa</button>
                                <a class="button" title="Torna alla Scheda Utente" href="./card_subscriber.php?id_iscritto=<?php echo $_GET['id_iscritto'] ?>&p=1&tr=">Torna</a>
                            </div>
                        </div>
                    </div>
<?php
	include('./include-php/end_gestione.php');
?>