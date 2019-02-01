<!DOCTYPE html>
<html lang="it">
    <head>
        <!-- HTML5 -->
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>Accesso</title>
        <link rel="stylesheet" type="text/css" href="./css/global.css">
    </head>
    <body>
        <header role="banner">
            <img id="logo_sx" class="logo" alt="Logo Matteo Spaggiari" title="Logo Matteo Spaggiari" src="./images/logoMSweb.png" />
            <hgroup>
                <h1 title="Programma Gestione Biblioteca">Programma Gestione Biblioteca</h1>
                <h2 class="utente_accesso">Nessun Utente Connesso</h2>
            </hgroup>
            <img id="logo_dx" class="logo" alt="Logo Matteo Spaggiari" title="Logo Matteo Spaggiari" src="./images/logoMSweb.png" />
        </header>
        <main class="access">
            <div id="no_logged">
                <form id="form-access" class="form form-access" name="form-access" action="./trans_access.php" method="post" enctype="application/x-www-form-urlencoded" target="_self">
                    <fieldset>    
                        <h2>Inserisci i tuoi dati per accedere</h2>
                        <ul>
                            <li>
                                <label for="username">Nome Utente:</label>
                                <input id="username" type="text" name="username" autocomplete="off" maxlength="100" value="<?php (!empty($FieldsValue['fl_Username']) ? print($FieldsValue['fl_Username']) : '')  ?>" placeholder="Nome utente"  autofocus="autofocus" />
                            </li>
                            <li>
                                <label for="password">Password:</label>
                                <input id="password" type="password" name="password" value="<?php (!empty($FieldsValue['fl_Password']) ? print($FieldsValue['fl_Password']) : '')  ?>" autocomplete="off" maxlength="30" placeholder="Password"  />
                            </li>
                            <li class="container-button">
                                <input id="send-reset" type="reset" name="send-reset" value="Reset" />
                                <input id="send-login" type="submit" name="send-login" value="Accedi" />
                            </li>
                        </ul>
                    </fieldset>
                </form>
            </div>
        </main>
        <script type="text/javascript" src="./js/utility.js"></script>
        <script type="text/javascript" src="./js/access.js"></script>
    </body>
</html>