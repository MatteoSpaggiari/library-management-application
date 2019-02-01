<?php
if((isset($_GET['tipo']) && $_GET['tipo'] == "catalog") || (isset($_SESSION['tipo_s']) && $_SESSION['tipo_s'] == "catalog")) {
    # Preaparazione della Query
    $query = 'SELECT id_catalog, sigla_inv, num_inv, titolo, autore, genere, editore, scaffale 
            FROM catalogazioni
            WHERE alienato = "N" '.($_SESSION['access_level_s'] == 3 ? '' : ('&& visibile = "Y"')).'
                    '.(isset($pro) ? ('&& sigla_inv = "'.$pro.'"') : '').' '.(isset($inv) ? (' && num_inv = "'.$inv.'"') : '').' '.(isset($dew) ? ('&& codice LIKE "%'.$dew.'%"') : '').' '.(isset($tit) ? (' && titolo = "'.$tit.'"') : '').' 
                    '.(isset($aut) ? ('&& autore = "'.$aut.'"') : '').' '.(isset($gen) ? (' && genere = "'.$gen.'"') : '').' '.(isset($col) ? ('&& collana = "'.$col.'"') : '').' '.(isset($sca) ? (' && scaffale = "'.$sca.'"') : '').' '.(isset($d_c) ? (' && data_catalog LIKE "%'.$d_c.'%"') : '').' 
            GROUP BY id_catalog
            ORDER BY '.$_SESSION['t_ord'].' '.$_SESSION['m_ord'].', id_catalog LIMIT '.$i.',10;';
} else if((isset($_GET['tipo']) && $_GET['tipo'] == "utenti") || (isset($_SESSION['tipo_s']) && $_SESSION['tipo_s'] == "utenti")) {
    # Preaparazione della Query
    $query = 'SELECT id_iscritto, num_tessera, data_nascita, nome, cognome, professione, indirizzo, localita
            FROM iscritti
            WHERE (sospeso = "Y" || sospeso = "N")
                    '.(isset($tes) ? ('&& num_tessera = "'.$tes.'"') : '').' '.(isset($d_i) ? (' && data_iscrizione LIKE "%'.$d_i.'%"') : '').' '.(isset($nom) ? ('&& nome = "'.$nom.'"') : '').' '.(isset($cog) ? (' && cognome = "'.$cog.'"') : '').' 
                    '.(isset($pro) ? ('&& professione = "'.$pro.'"') : '').'
            GROUP BY id_iscritto
            ORDER BY '.$_SESSION['t_ord'].' '.$_SESSION['m_ord'].', id_iscritto LIMIT '.$i.',10;';	
}
?>