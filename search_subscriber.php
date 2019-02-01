<?php
    $page = "SEARCH SUB";
    include('./include-php/head.php');
    include('./include-php/intro.php');
?>
        <title>Cerca Iscritto</title>
    </head>
    <body>
<?php
        include_once("./include-php/menu.php");
        ((isset($_GET['errori']) && $_GET['errori'] != '') ? print("\n\t\t".'<div id="error">'.$_GET['errori'].'</div>') : '');
        echo "\n";
?>
        <div id="corpo" class="corpo" role="main">
            <form id="search_subscriber" class="cerca form" name="search_subscriber" method="get" action="./list_subscriber.php" enctype="application/x-www-form-urlencoded" target="_self">
                <fieldset>
                    <h2>Cerca Utente</h2>
                    <ul>
                        <li><label>Numero Tessera: </label><input id="num_tes" class="focus corto" type="text" name="num_tes" size="15" maxlength="10" autocomplete="off" value="" autofocus="autofocus" placeholder="es. 1930" /></li>
                        <li><label>Data Iscrizione: </label><input id="data_isc" class="focus corto" type="text" name="data_isc" autocomplete="off" value="" placeholder="es. 2013-01-01" />(aaaa-mm-gg)</li>
                        <li><label>Nome: </label><input id="nome" class="focus capitalize lungo" type="text" name="nome" size="50" maxlength="70" autocomplete="off" value="" placeholder="es. Antonella" /></li>
                        <li><label>Cognome: </label><input id="cognome" class="focus capitalize lungo" type="text" name="cognome" size="50" maxlength="70" autocomplete="off" value="" placeholder="es. Rossi" /></li>			
                        <li><label>Professione: </label><input id="professione" class="focus lungo" type="text" name="professione" size="50" maxlength="70" autocomplete="off" value="" placeholder="es. Impiegata" /></li>
                        <li class="li-container-radio">
                            <label>Campo per l'ordinamento:</label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input id="tessera" class="radio rientro" type="radio" name="o" value="nnum_tessera" checked="checked" />
                                    <label for="tessera">Tessera</label>
                                </li>
                                <li tabindex="0">
                                    <input id="name" class="radio" type="radio" name="o" value="snome" />
                                    <label for="name">Nome</label>
                                </li>
                                <li tabindex="0">
                                    <input id="surname" class="radio" type="radio" name="o" value="scognome" />
                                    <label for="surname">Cognome</label>
                                </li>
                            </ul>
                        </li>
                        <li class="li-container-radio">
                            <label>Tipo di ordinamento:</label>
                            <ul class="container-radio">
                                <li tabindex="0">
                                    <input id="ascendente" class="radio rientro" type="radio" name="a" value="ASC" checked="checked" />
                                    <label for="ascendente">Ascendente</label>
                                </li>
                                <li tabindex="0">
                                    <input id="discendente" class="radio" type="radio" name="a" value="DESC" />
                                    <label for="discendente">Discendente</label>
                                </li>
                            </ul>
                        </li>
                    <li class="container-button">
                        <input id="reset" type="reset" name="reset" value="Reset" />
                        <input type="hidden" name="tipo" value="utenti" />
                        <input type="hidden" name="prima" value="si" />
                        <input type="hidden" name="p" value="1" />
                        <input id="invia" type="submit" name="image_i" value="Invia" />
                    </li>
                    </ul>
                </fieldset>
            </form>
        </div>
<?php
    include('./include-php/end_gestione.php');
?>