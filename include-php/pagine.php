<?php
    $numero_elementi_per_pagina = Search::NUMBER_USER_FOR_PAGE;
    if(isset($_GET['num_inv']))
    {
        $page_url = "list_catalog";
    }
    else if(isset($_GET['num_tes']))
    {
        $page_url = "list_subscriber";        
    }
    echo "\n\t\t\t".'<p id="pagine" class="pagine">Numero Pagina:'."\n\t\t\t\t";
    if ($_GET['p'] >=1 && $_GET['p'] <=10) {	
        for($pa = 1; $pa <= min(11,$num_pagine); $pa++) {				
            if($pa == $_GET['p']) {									
                echo '<a class="numpag corrente">'.$pa.'</a>';							
            } else if($pa == 11) {									
                echo '<a class="numpag" href="./'.$page_url.'.php?p='.$pa.'&o='.$Parametri_ricerca['ordinamento'].'&a='.$Parametri_ricerca['tipo_ordinamento'].'&nt='.$number_results.'&ni=2'.$Stringa_param_ricerca.'">&#8594;</a>';						
            } else {						
                echo '<a class="numpag" href="./'.$page_url.'.php?p='.$pa.'&o='.$Parametri_ricerca['ordinamento'].'&a='.$Parametri_ricerca['tipo_ordinamento'].'&nt='.$number_results.'&ni=1'.$Stringa_param_ricerca.'">'.$pa.'</a>';							
            }
        }
        echo "\n\t\t\t".'</p>'."\n";
    } else if($_GET['ni'] >= 2 && ($_GET['ni'] < $num_indice)) {						
        for($pa = (10 * ($_GET['ni'] - 1)); $pa <= ((10 * $_GET['ni']) + 1); $pa++) {										
            if($pa == $_GET['p']) {											
                echo '<a class="numpag corrente">'.$pa.'</a>';									
            } else if($pa == (10 * ($_GET['ni'] - 1)) && ($_GET['p'] > (10 * ($_GET['ni'] - 1)) && ($_GET['p']) <= (10 * $_GET['ni']))){											
                echo '<a class="numpag" href="./'.$page_url.'.php?p='.$pa.'&o='.$Parametri_ricerca['ordinamento'].'&a='.$Parametri_ricerca['tipo_ordinamento'].'&nt='.$number_results.'&ni='.($_GET['ni'] - 1).''.$Stringa_param_ricerca.'">&#8592;</a>';												
            } else if($pa == ((10 * $_GET['ni']) + 1) && ($_GET['p'] > (10 * ($_GET['ni'] - 1)) && ($_GET['p']) <= (10 * $_GET['ni']))){											
                echo '<a class="numpag" href="./'.$page_url.'.php?p='.$pa.'&o='.$Parametri_ricerca['ordinamento'].'&a='.$Parametri_ricerca['tipo_ordinamento'].'&nt='.$number_results.'&ni='.($_GET['ni'] + 1).''.$Stringa_param_ricerca.'">&#8594;</a>';											
            } else {									 
                echo '<a class="numpag" href="./'.$page_url.'.php?p='.$pa.'&o='.$Parametri_ricerca['ordinamento'].'&a='.$Parametri_ricerca['tipo_ordinamento'].'&nt='.$number_results.'&ni='.$_GET['ni'].''.$Stringa_param_ricerca.'">'.$pa.'</a>';
            }
        }					
        echo "\n\t\t\t".'</p>'."\n";
    } else if($_GET['ni'] == $num_indice) {						
        for($pa = (10 * ($_GET['ni'] - 1)); $pa <= min($num_pagine,((10 * $_GET['ni']) + 1)); $pa++) {										
            if($pa == $_GET['p']) {												
                echo '<a class="numpag corrente">'.$pa.'</a>';									
            } else if($pa == (10 * ($_GET['ni'] - 1)) && ($_GET['p'] > (10 * ($_GET['ni'] - 1)) && ($_GET['p']) <= (10 * $_GET['ni']))){												
                echo '<a class="numpag" href="./'.$page_url.'.php?p='.$pa.'&o='.$Parametri_ricerca['ordinamento'].'&a='.$Parametri_ricerca['tipo_ordinamento'].'&nt='.$number_results.'&ni='.($_GET['ni'] - 1).''.$Stringa_param_ricerca.'">&#8592;</a>';												
            } else {										 
                echo '<a class="numpag" href="./'.$page_url.'.php?p='.$pa.'&o='.$Parametri_ricerca['ordinamento'].'&a='.$Parametri_ricerca['tipo_ordinamento'].'&nt='.$number_results.'&ni='.$_GET['ni'].''.$Stringa_param_ricerca.'">'.$pa.'</a>';								
            }
        }											
        echo "\n\t\t\t".'</p>'."\n";
    }
?>

