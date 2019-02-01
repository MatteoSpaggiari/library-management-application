$(document).ready(function(){
    $("#no_proprieta").dialog({
        modal: true,
        autoOpen: false,
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
    });
    //Creazione calendario
    var data_odierna = new Date();
    var anno_attuale = data_odierna.getFullYear();
    $('#data_c').datepicker({
        altField: '#data_c',
        altFormat: "yy-mm-dd",
        closeText : 'X',
        showOn : 'button',
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
    });
    var data;
    var check;
    $("#num_inv").on("focus active", function(event) {
        check = $("input[name='proprieta']:checked").val();
        if(check == undefined) {
            $("input[name='proprieta']").focus();
            $("#no_proprieta").dialog("open");
        }
    });
    $("input[name='proprieta']").on("change", function(event){
        $("#num_inv").focus();		
    })
	
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
    var url = "./include-php/content_global.php?tipo=";
    $("#dewey").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#dewey_no_ris").eq(0);
        no_ris.css("margin-left","356px");
        $(this).autocomplete({
            source: url+"dewey&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);	
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#titolo").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#titolo_no_ris").eq(0);
        no_ris.css("margin-left","567px");
        $(this).autocomplete({
            source: url+"titolo&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);	
            }
        });	
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#autore").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#autore_no_ris").eq(0);
        no_ris.css("margin-left","567px");
        $(this).autocomplete({
            source: url+"autore&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);	
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#genere").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#genere_no_ris").eq(0);
        no_ris.css("margin-left","567px");
        $(this).autocomplete({
            source: url+"genere&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#editore").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#editore_no_ris").eq(0);
        no_ris.css("margin-left","567px");
        $(this).autocomplete({
            source: url+"editore&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#collana").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#collana_no_ris").eq(0);
        no_ris.css("margin-left","567px");
        $(this).autocomplete({
            source: url+"collana&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#scaffale").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#scaffale_no_ris").eq(0);
        no_ris.css("margin-left","336px");
        $(this).autocomplete({
            source: url+"scaffale&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 1,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#formato").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#formato_no_ris").eq(0);
        no_ris.css("margin-left","336px");
        $(this).autocomplete({
            source: url+"formato&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#nazione").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#nazione_no_ris").eq(0);
        no_ris.css("margin-left","567px");
        $(this).autocomplete({
            source: url+"nazione&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
});
