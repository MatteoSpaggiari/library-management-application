// ****************************** Focus e Button ***************************//
$(document).ready(function(){
    //Accordion per il Menù
    $("#accordion").hide();
    $("#stampa").on("click",function(e){
        print();
    });
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
    //Apertura finestra di avviso
    if(location.search.indexOf("successo") != -1) {
        $("#successo").dialog(options);
        $("#successo").dialog("open");
    }
});
	