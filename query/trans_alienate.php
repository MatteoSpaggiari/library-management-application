<?php
    include('./head.php');
    $Num_cambiamenti = count($_POST['alienato_cat']);
    if($Num_cambiamenti > 0) {
        $Id_user = $objUser->getID();
        $Results = array();
        for($i = 0;$i < $Num_cambiamenti;$i++) {
            $Results[$i] = Utility::UpdateAlienazione($objPDO, $_POST['alienato_cat'][$i], $Id_user);
            if(!empty(array_search("0", $Results)))
            {
                $error = "Si &egrave; verificato un errore nel database, riprovate ad eseguire l'ultima modifica.";
                redirect('./catalog_alienate.php?errore='.urlencode($error));
            }
            else
            {
                $successo = "Modifiche apportate correttamente.";
                $catalog = implode(',',$_POST['alienato_cat']);
                redirect('./catalog_alienate.php?successo='.urlencode($successo).'&catalogs='.$catalog);
            }
        }
    }
    else
    {
        redirect('./catalog_alienate.php');
    }
?>

