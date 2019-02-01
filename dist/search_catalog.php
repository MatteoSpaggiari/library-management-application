<?php
    $page = "SEARCH CAT";
    include('./include-php/head.php');
    include('./include-php/intro.php');
?>
        <title>Cerca Catalogazione</title>
    </head>
    <body>
<?php
        include_once("./include-php/menu.php");
        ((isset($_GET['errori']) && $_GET['errori'] != '') ? print("\n\t\t".'<div id="error">'.$_GET['errori'].'</div>') : '');
        echo "\n";
?>
            <div id="corpo" class="corpo" role="main">
                <form id="search_catalog" class="form cerca" name="search_catalog" method="get" action="./list_catalog.php" enctype="application/x-www-form-urlencoded" target="_self">
                    <fieldset>
                        <h2>Cerca Catalogazione</h2>
                        <ul>
                            <li><label>ISBN: </label><input id="isbn" class="focus corto" type="text" name="isbn" size="15" maxlength="13" autocomplete="off" value="" placeholder="es. 9788850330119" autofocus="autofocus" /></li>
                            <li class="li-container-radio">
                                <label>Propriet&agrave;: </label>
                                <ul class="container-radio">
                                    <li tabindex="0">
                                        <input id="papillon" class="radio rientro" type="radio" name="proprieta" value="P" autofocus />
                                        <label for="papillon">Papillon</label>
                                    </li>
                                    <li tabindex="0">
                                        <input id="biblioteca" class="radio" type="radio" name="proprieta" value="C" />
                                        <label for="biblioteca">Biblioteca</label>
                                    </li>
                                    <li tabindex="0">
                                        <input id="festival" class="radio" type="radio" name="proprieta" value="F" />
                                        <label for="festival">Filo-Festival</label>
                                    </li>
                                </ul>
                            </li>
                            <li><label for="num_inv">Numero Inventario: </label><input id="num_inv" class="focus corto" type="text" name="num_inv" size="15" maxlength="15" autocomplete="off" placeholder="es. 00345" value="" /></li>
                            <li><label for="dewey">Codice Dewey: </label><input id="dewey" class="focus maiuscolo corto" type="text" name="dewey" size="15" maxlength="22" autocomplete="off" placeholder="es. 808.387 MOO" value="" /></li>
                            <li><label for="titolo">Titolo: </label><input id="titolo" class="focus lungo" type="text" name="titolo" size="50" maxlength="100" autocomplete="off" placeholder="es. Paradiso perduto" value="" /></li>
                            <li><label for="autore">Autore: </label><input id="autore" class="focus capitalize lungo" type="text" name="autore" size="50" maxlength="100" autocomplete="off" placeholder="es. Pirandello Luigi" value="" /></li>
                            <li><label for="genere">Genere: </label><input id="genere" class="focus lungo" type="text" name="genere" size="50" maxlength="50" autocomplete="off" placeholder="es. Gialli - Thriller" value="" /></li>
                            <li><label for="collana">Collana: </label><input id="collana" class="focus lungo" type="text" name="collana" size="50" maxlength="50" autocomplete="off" placeholder="es. Superbur" value="" /></li>
                            <li><label for="scaffale">Scaffale: </label><input id="scaffale" class="focus maiuscolo corto" type="text" name="scaffale" size="12" maxlength="50" autocomplete="off" placeholder="es. 01 B" value="" /></li>
                            <li><label for="data_c">Data Catalogazione: </label><input id="data_c" class="focus corto" type="text" name="data_c" autocomplete="off" placeholder="es. 2013-01-01" value="" />(aaaa-mm-gg)</li>
<?php
                        if($objUser->getAccess_level() == 3) {
?>
                            <li><label for="data_a">Data Alienazione: </label><input id="data_a" class="focus corto" type="text" name="data_a" autocomplete="off" value="" placeholder="es. 2013-01-01" />(aaaa-mm-gg)</li>
<?php
                        }
?>
                            <li class="li-container-radio">
                                <label>Campo per l'ordinamento:</label>
                                <ul class="container-radio">
                                    <li tabindex="0">
                                        <input id="rtitolo" class="radio rientro" type="radio" name="o" value="stitolo" checked="checked" />
                                        <label for="rtitolo">Titolo</label>
                                    </li>
                                    <li tabindex="0">
                                        <input id="rautore" class="radio" type="radio" name="o" value="sautore" />
                                        <label for="rautore">Autore</label>
                                    </li>
                                    <li tabindex="0">
                                        <input id="rgenere" class="radio" type="radio" name="o" value="sgenere" />
                                        <label for="rgenere">Genere</label>
                                    </li>
                                </ul>
                            </li>
                            <li class="li-container-radio">
                                <label>Tipo di ordinamento</label>
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
                            <input type="hidden" name="submit" value="list_catalog"  />
                            <input type="hidden" name="tipo" value="catalog" />
                            <input type="hidden" name="prima" value="si" />
                            <input type="hidden" name="p" value="1" />
                            <input id="invia" type="submit" name="invia" value="Invia" />
                        </li>
                        </ul>
                    </fieldset>
                </form>
            </div>
<?php
    include('./include-php/end_gestione.php');
?>