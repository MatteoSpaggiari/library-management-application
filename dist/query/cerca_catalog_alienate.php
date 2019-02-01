<?php
    include('../include_php/redirect.php');
    session_start();
    if(isset($_SESSION['access_level_s']) && $_SESSION['access_level_s'] > 1 && isset($_SESSION['logged']) && $_SESSION['logged'] == 1 && isset($_SESSION['user_id_s']) && isset($_SESSION['is_block_s']) && $_SESSION['is_block_s'] == "N") {
        include('./intro.php');
        unset($_SESSION['proprieta_a_s']);
        unset($_SESSION['anno_a_s']);
?>
        <style type="text/css">
            form#nuova_catalog fieldset label {
                width: 190px;
            }
        </style>
        <title>Cerca Catalogazioni Alienate</title>
        <link rel="stylesheet" type="text/css" media="print" href="../css/print_table.css" />
    </head>
    <body>
<?php
    include_once("./header.php");
?>
    <main class="query">
        <div id="corpo" class="corpo">
<?php
    include_once("./menu-query.php");
?>
            <div class="query">
            <form id="nuova_catalog" class="cerca" style="margin-top: 4em;" name="nuova_catalog" method="get" action="./visual_catalog_alienate.php" enctype="application/x-www-form-urlencoded" target="_self">
                <fieldset>
                    <legend>Cerca Catalogazioni Alienate</legend>
                    <ul>
                        <li>
                            <label>Propriet&agrave;: </label>
                            <input class="radio rientro" type="radio" name="proprieta_a" value="P" autofocus />Papillon
                            &nbsp;
                            <input class="radio" type="radio" name="proprieta_a" value="C" />Biblioteca
                            &nbsp;
                            <input class="radio" type="radio" name="proprieta_a" value="F" />Filo&minus;festival
                        </li>
                        <li>
                            <label>Anno Alienazione: </label>
                            <select id="anno_a" name="anno_a">
                                <option value="">Nessuno</option>
<?php
    echo "\n";
    $anno_attuale = date("Y");
    $anno_partenza = "2000";
    for($i = $anno_attuale;$i >= $anno_partenza;$i--) {
        echo '\t\t\t\t\t<option value="'.$i.'">'.$i.'</option>';
    }
    echo "\n";
?>
                            </select>
                        </li>
                    </ul>
                    <div class="pos_but">
                        <input type="reset" name="reset" value="Reset" />
                        <input id="invia" type="submit" name="submit" value="Invia" />
                    </div>
                </fieldset>
            </form>
            </div>
            <div id="no_proprieta" class="dialog">Prima di inserire il numero di inventario devi scegliere la propriet&agrave;.</div>
<?php
    include('../include_php/end_gestione.php');
} else {
    redirect('../access.php');
}
?>