<?php
    include('./head.php');
    include('./intro.php');
?>
        <script type="text/javascript">
            $(document).ready(function(){
               if(location.search.indexOf("?tipo=") !== -1) {
                   $("#stampa").hide();
               };
            });
        </script>
        <link rel="stylesheet" type="text/css" media="print" href="../css/print_table.css" />
        <title>Classifica prestiti</title>
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
<?php
    $Type = $_GET['tipo'];
    if(isset($_GET['anno_c']) && trim(!empty($_GET['anno_c'])))
    {
        $Anno = $_GET['anno_c'];
        $Classifica_iscritti = Utility::GetClassificaIscritti($objPDO, $Anno, $Type);
        $Num_row_tot = count($Classifica_iscritti); 
        $Num_tot_pres = Utility::GetClassificaNumeroTotalePrestiti($objPDO, $Anno, $Type);
        $Num_pres_maschi = Utility::GetClassificaNumeroPrestitiMaschi($objPDO, $Anno, $Type);
        $Num_pres_femmine = Utility::GetClassificaNumeroPrestitiFemmine($objPDO, $Anno, $Type);

        if($Num_row_tot > 0) {
?>
            <table id="table-classifica" class="table-classifica">
                <caption>
                    Classifica Prestiti <?php echo (trim($_GET['tipo'])." &minus; anno ".trim($_GET['anno_c'])); ?>
                    
                    <br />
<?php
            if($Num_row_tot > 1) {
?>
                    <span class="ris"><span class="slinea"><?php echo $Num_row_tot; ?></span> utenti (<?php echo '<span class="slinea">'.$Num_pres_maschi.'</span> maschi e <span class="slinea">'.$Num_pres_femmine.'</span> femmine'; ?>) hanno effettuato un totale di <span class="slinea"><?php echo $Num_tot_pres; ?></span> prestiti</span>
<?php
            } else {	
?>
                    <span class="ris">Solo un utente ha effettuato un totale di <span class="slinea"><?php echo $Num_tot_pres; ?></span> prestiti</span>
<?php		
            }		
?>
                </caption>
                <tr>
                    <th width="12%">N&deg; Prestiti</th>
                    <th width="12%">N&deg; Tessera</th>		
                    <th width="19%">Nome</th>
                    <th width="19%">Cognome</th>
                    <th width="7%">Sesso</th>
                    <th width="15%">Data di nascita</th>
                    <th width="16%">Telefono</th>
                </tr>
<?php		
            // Serve a visualizzare meglio le righe (Con colori diversi se pari o dispari)
            $odd = true;
            for($i=0;$i<$Num_row_tot;$i++)
            {
                echo ($odd == true) ? "\n\t\t\t\t".'<tr class="odd_row">' : "\n\t\t\t\t".'<tr class="even_row">';
                $odd = !$odd;
                echo "\n\t\t\t\t\t".'<td class="center"><strong><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Classifica_iscritti[$i]['id_iscritto'].'&anno_p='.$Anno.'">'.$Classifica_iscritti[$i]['num_pres'].'</a></strong></td>';
                echo '<td class="center"><strong><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Classifica_iscritti[$i]['id_iscritto'].'">'.$Classifica_iscritti[$i]['nnum_tessera'].'</a></strong></td>';						
                echo '<td><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Classifica_iscritti[$i]['id_iscritto'].'">'.$Classifica_iscritti[$i]['snome'].'</a></em></td>';
                echo '<td><em><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Classifica_iscritti[$i]['id_iscritto'].'">'.$Classifica_iscritti[$i]['scognome'].'</a></em></td>';
                echo '<td class="center"><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Classifica_iscritti[$i]['id_iscritto'].'">'.$Classifica_iscritti[$i]['esesso'].'</a></td>';
                echo '<td class="center"><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Classifica_iscritti[$i]['id_iscritto'].'">'.$Classifica_iscritti[$i]['ddate_nascita'].'</a></td>';
                echo '<td class="center"><a title="Vai a Scheda Utente" class="catalog" href="../card_subscriber.php?id_iscritto='.$Classifica_iscritti[$i]['id_iscritto'].'">'.$Classifica_iscritti[$i]['stel_casa'].'</a><br /><a class="catalog" href="../card_subscriber.php?id_iscritto='.$Classifica_iscritti[$i]['id_iscritto'].'">'.$Classifica_iscritti[$i]['stel_cell'].'</a></td>'."\n\t\t\t\t".'<tr>';	
            }		
            echo "\n\t\t\t".'</table>'."\n";
        } else {
            echo "\n\t\t\t".'<h2>Nessuna classifica</h2>'."\n";					
        }		
    } else {
        $anno_attuale = date('Y');
?>
                
            <form id="classifica" class="form classifica" name="classifica" method="get" action="./utenti_pres.php" enctype="application/x-www-form-urlencoded" target="_self">
                <fieldset>
                    <h2 class="tit_altre_oper">Classifica Prestiti <?php echo trim($_GET['tipo']) ?></h2>
                    <h3>Scegli un anno per il calcolo della classifica</h3>
                    <ul>
                        <li>
                            <label>Anno: </label>
                            <select name="anno_c">
<?php
        for($i = 1980; $i <= $anno_attuale; $i++){
            echo "\n\t\t\t\t\t\t\t\t<option value=".$i.">".$i."</option>";
        }
            echo "\n";
?>
                            </select>
                        </li>
                    </ul>
                    <ul>
                        <li class="container-button">
                            <input id="reset"  type="reset" name="reset" value="Reset" />
                            <input type="hidden" name="tipo" value="<?php print(trim($_GET['tipo'])); ?>"  />
                            <input id="invia" type="submit" name="invia" value="Invia" />
                        </li>
                    </ul>
                </fieldset>
            </form>
<?php
    }
    echo '</div>';
    include('../include-php/end_gestione.php');
?>