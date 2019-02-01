// ****************************** Focus e Button ***************************//
$(function(){
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
    //Apertura finestra messaggi di avviso
    if(location.search.indexOf("errore") !== -1) {
        $("#avvisi").dialog(options);
        $("#avvisi").dialog(options,{title: "Errore"});
        $("#avvisi").dialog("open");
    } else if(location.search.indexOf("successo") !== -1) {
        $("#avvisi").dialog(options);
        $("#avvisi").dialog(options,{title: "Successo"});
        $("#avvisi").dialog("open");
    }
});