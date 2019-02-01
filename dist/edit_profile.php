<?php
    $page = "";
    include('./include-php/head.php');
    include('./include-php/intro.php');
?>
        <title>Modifica Profilo Operatore</title>
    </head>
    <body>
<?php
    include_once("./include-php/menu.php");
    echo "\n";
    //Se ci sono errori nell'inserimento
    $Errors = array();
    $Errors = $objSession->getErrorEditProfile();
    if(sizeof($Errors) > 0)
    {
        echo '<div id="errors"><ul>';
        foreach($Errors as $key => $value)
        {
            echo '<li>'.$Errors[$key].'</li>';
        }
        echo '</ul></div>';
    };
    $FieldsValue = array();
    $FieldsValue = $objSession->getFieldsValueEditProfile();
    echo "\n";
?>
        <div id="errore" class="dialog"><?php isset($_GET['errore']) ? print(replace(urldecode($_GET['errore']))) : ""; ?></div>
        <div id="corpo" class="corpo" role="main">
            <form id="edit_profile" class="utente form" name="edit_profile" method="post" action="./trans_global.php" enctype="application/x-www-form-urlencoded" target="_self">
                <fieldset>
                    <h2>Modifica Profilo Operatore</h2>
                    <div class="center container-button add-image"><button id="add-image-user"><img alt="Immagine Operatore" title="Aggiungi/Modifica Immagine Operatore" src="<?php echo $objUser->getImage_profile(); ?>" /></button></div>
                    <ul>
                        <li><label>Nome: </label><input id="nome" class="focus capitalize lungo" type="text" name="nome" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['sep_NOME']) ? print(htmlspecialchars($FieldsValue['sep_NOME'])) : (!empty($objUser->getName()) ? print($objUser->getName()) : '') ?>" placeholder="es. Antonella" /></li>
                        <li><label>Cognome: </label><input id="cognome" class="focus capitalize lungo" type="text" name="cognome" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['sep_COGNOME']) ? print(htmlspecialchars($FieldsValue['sep_COGNOME'])) : (!empty($objUser->getSurname()) ? print($objUser->getSurname()) : '') ?>" placeholder="es. Rossi" /></li>				
                        <li><label>Username (email): </label><input id="username" class="focus lungo" type="text" name="username" size="50" maxlength="70" autocomplete="off" value="<?php isset($FieldsValue['USERNAME']) ? print(htmlspecialchars($FieldsValue['sep_USERNAME'])) : (!empty($objUser->getUsername()) ? print($objUser->getUsername()) : '') ?>" placeholder="es. email@email.it" /></li>
                        <li><label>Vecchia Password: </label><input id="oldpassword" class="focus lungo" type="password" name="oldpassword" size="50" maxlength="100" autocomplete="off" value="" placeholder="In bianco per mantenere la password..." /></li>
                        <li><label>Nuova Password: </label><input id="newpassword" class="focus lungo" type="password" name="newpassword" size="50" maxlength="100" autocomplete="off" value="" placeholder="In bianco per mantenere la password..." /></li>
                        <li class="container-button">
                            <input id="reset" type="reset" name="reset" value="Reset" />
                            <input type="hidden" name="submit" value="edit_profile"  />
                            <input id="invia" type="submit" name="invia" value="Invia" />
                        </li>
                    </ul>
                </fieldset>
            </form>
<?php
    include('./include-php/end_gestione.php');
?>