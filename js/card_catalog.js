// ****************************** Focus e Button ***************************//
$(document).ready(function(){
    var link = $(".opzioni a");
    link.button();
    $("#scheda_global").tabs();
    //Settaggio opzioni finestre di avviso
    var options = {
        modal: true,
        autoOpen: true,
        closeText: "Chiudi",
        show: 500,
        hide: 500,
        title: "Avviso",
        resizable: false,
        buttons: {
            Ok: function() {
                $(this).dialog("close");
            }
        }
    };
    //Apertura finestra di errore
    if(location.search.indexOf("success") != -1) {
        $("#successo").dialog(options,{title: "Successo"});
        $("#successo").dialog("open");
    }
});