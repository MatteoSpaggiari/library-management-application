$(document).ready(function(){
    //Variabili
    var data_odierna = new Date();
    var anno_attuale = data_odierna.getFullYear();
    //Focus su username
    $("#num_tes").focus();
    $('#data_isc').datepicker({
        altField: '#data_isc',
        altFormat: "yy-mm-dd",
        closeText : 'X',
        currentText : 'Now',
        selectOtherMonths : true,
        showOtherMonths : true,
        showWeek : true,
        weekHeader : 'Week',
        appendText: '(aaaa-mm-gg)',
        buttonImage: './images/calendario.png',
        buttonImageOnly: true,
        changeYear: true,
        changeMonth: true,
        dateFormat: 'yy-mm-dd',
        minDate: new Date(1980,0,1),
        yearRange: "1980:"+anno_attuale,
        defaultDate: data_odierna,
        showOn: "button"
    });
    //Creazione autocomplete
    //Funzione per visualizzare il messaggio che si tratta di un nuovo elemento
    function no_risposta(data,no_ris) {
        if(data == 0) {
            no_ris.show();
            no_ris.html("Nessuno");
        } else {
            no_ris.hide();
        }
    }
    var data;
    var url = "./include-php/content_global.php?tipo=";
    $("#nome").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#nome_no_ris").eq(0);
        no_ris.css("margin-left","568px");
        $(this).autocomplete({
            source: url+"nome&valore="+valore,
            autoFocus: true,
            delay: 500,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);	
            }
        });
        if(valore === '') {
            no_ris.hide();			
        }
    });
    $("#cognome").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#cognome_no_ris").eq(0);
        $(this).autocomplete({
            source: url+"cognome&valore="+valore,
            autoFocus: true,
            delay: 500,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);	
            }
        });
        if(valore === '') {
            no_ris.hide();			
        }
    });
    $("#professione").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#professione_no_ris").eq(0);
        $(this).autocomplete({
            source: url+"professione&valore="+valore,
            autoFocus: true,
            delay: 500,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);	
            }
        });
        if(valore === '') {
            no_ris.hide();			
        }
    });
    $("#localita").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#localita_no_ris").eq(0);
        $(this).autocomplete({
            source: url+"localita&valore="+valore,
            autoFocus: true,
            delay: 500,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();			
        }
    });
    $("#provincia").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#provincia_no_ris").eq(0);
        $(this).autocomplete({
            source: url+"provincia&valore="+valore,
            autoFocus: true,
            delay: 500,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();			
        }
    });
    $("#cap").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#cap_no_ris").eq(0);
        $(this).autocomplete({
            source: url+"cap&valore="+valore,
            autoFocus: true,
            delay: 500,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
    });
});