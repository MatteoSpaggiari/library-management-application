        <nav id="menu-query" class="menu-query">
            <span id="hidden-menu-query" class="hidden-menu-query" title="Nascondi/Mostra Menu"></span>
            <h2>Altre Operazioni</h2>
            <ul>
                <li><a title="Sollecito Restituzioni" href="./sol_restituzioni.php"><span>Sollecito Restituzioni</span></a></li>
                <li><a title="Utente Adulto con numero maggiore di prestiti" href="./utenti_pres.php?tipo=adulti"><span>Classifica Prestiti Adulti</span></a></li>
                <li><a title="Utente Giovane con numero maggiore di prestiti" href="./utenti_pres.php?tipo=giovani"><span>Classifica Prestiti Giovani</span></a></li>
    <?php
        if($objUser->getAccess_level() == 3) {
    ?>
                <li>
                    <a id="subcriber_classes" class="subcriber_classes" title="Iscritti per Classe" href="#"><span>Iscritti per Classe</span></a>
                    <ul id="ul_subcriber_classes" class="ul_subcriber_classes">
                        <li>
                            <form id="p_p_c" class="p_p_c form" name="p_p_c" method="get" action="./iscritti_per_classe.php" enctype="application/x-www-form-urlencoded">
                                <fieldset>
                                    <ul>
                                        <li>
                                            <label for="num_classi">N&deg; Classi:&nbsp;</label>
                                            <select id="num_classi" name="num_classi">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                             </select> 
                                        </li>
                                        <li class="container-button">
                                           <input type="hidden" name="action" value="crea_classi" />
                                           <input type="submit" name="submit" value="Invia" />
                                        </li>
                                    </ul>
                                 </fieldset>       
                            </form>
                        </li>
                    </ul>
                </li>
                <li>
                    <a title="Classificazione Codice Dewey" href="./class_cod_dewey.php"><span>Classificazione Dewey</span></a>
                </li>
                <li>
                    <a title="Storico Soci" href="./storico_soci.php"><span>Storico Soci</span></a>
                </li>
                <li>
                    <a title="Soci Attuali" href="./soci_attuali.php"><span>Soci Attuali</span></a>
                </li>
                <li>
                    <a title="Catalogazioni Novit&agrave;" href="./catalog_novita.php"><span>Catalogazioni Novit&agrave;</span></a>
                </li>
                <li>
                    <a title="Catalogazioni Alienate" href="./catalog_alienate.php"><span>Catalogazioni Alienate</span></a>
                </li>
                <li>
                    <a title="Catalogazioni Statistiche" href="./catalog_statistiche.php"><span>Catalogazioni Statistiche</span></a>
                </li>
                <li>
                    <a title="Utenti Corneliani" href="./corneliani.php"><span>Utenti Corneliani</span></a>
                </li>
                <li>
                    <a title="Utenti Corneliani" href="./corneliani_2.php"><span>Utenti Corneliani tanti</span></a>
                </li>
                <li>
                    <a title="Tabella Catalogazioni" href="./csv.php?param=catalogazioni"><span>Tabella Catalogazioni</span></a>
                </li>
                <li>
                    <a title="Tabella Iscritti" href="./csv.php?param=iscritti"><span>Tabella Iscritti</span></a>
                </li>
    <?php
        }
    ?>
            </ul>
        </nav>