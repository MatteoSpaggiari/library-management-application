        </main>
        <?php
            if(!empty(strstr($_SERVER['PHP_SELF'],"query"))) {
        ?>
        <script type="text/javascript" src="../js/utility.js"></script>
        <script type="text/javascript" src="../js/gestione.js"></script>
        <?php
            } else {
        ?>
        <script type="text/javascript" src="./js/utility.js"></script>
        <script type="text/javascript" src="./js/gestione.js"></script>
        <?php
            }
        ?>
    </body>
</html>