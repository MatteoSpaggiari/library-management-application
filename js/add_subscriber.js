// ****************************** Focus e Button ***************************//
$(document).ready(function(){
    //Variabili
    var data_isc = $("#data_isc");
    var form = $(".utente");
    var tutore = $("#tutore");
    var campi_tutore = $("li#tutore input");
    var doc_iscritto = $("#tipo_documento");
    var doc_tutore = $("#tipo_documento_t");
    var val_tutore;
    var data_odierna = new Date();
    var anno_attuale = data_odierna.getFullYear();
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
    //Focus su username
    data_isc.focus();
    data_isc.datepicker({
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
            showOn: "both"
    });
    $('#data_nas').datepicker({
            altField: '#data_nas',
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
            minDate: new Date(1890,0,1),
            yearRange: "1890:"+anno_attuale,
            defaultDate: new Date(1955,0,1),
            showOn: "both"
    });	
    //Creazione autocomplete
    //Funzione per visualizzare il messaggio che si tratta di un nuovo elemento
    function no_risposta(data,no_ris) {
            if(data[0].value == "") {
                    no_ris.show();
                    no_ris.html("Nuovo");
            } else {
                    no_ris.hide();
            }
    }
    var url = "./include-php/content_global.php?tipo=";
    var data;
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
    $("#indirizzo, #indirizzo_t").on("keyup change", function(event) {
            var valore = $(this).val();
            var no_ris = $("#indirizzo_no_ris").eq(0);
            $(this).autocomplete({
                    source: url+"indirizzo&valore="+valore,
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
    $("#localita, #localita_t").on("keyup change", function(event) {
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
    $("#localita").on("blur", function(event) {
            var valore = $(this).val();
            $.ajax({
                    url: url+"localita_c&valore="+valore,
                    dataType: 'text',
                    data: data,
                    success: function(data) {		
                            if(data != 0) {
                                    var val = data.split('#');
                                    $("#provincia").val(val[0].trim());
                                    $("#cap").val(val[1].trim());
                                    $('#tel_casa').focus();
                            }
                    }
            });		
    });
    $("#localita_t").on("blur", function(event) {
            var valore = $(this).val();
            $.ajax({
                    url: url+"localita_c&valore="+valore,
                    dataType: 'text',
                    data: data,
                    success: function(data) {		
                            if(data != 0) {
                                    var val = data.split('#');
                                    $("#provincia_t").val(val[0].trim());
                                    $("#cap_t").val(val[1].trim());
                                    $('#tel_casa_t').focus();
                            }
                    }
            });		
    });
    $("#provincia, #provincia_t").on("keyup change", function(event) {
            var valore = $(this).val();
            var no_ris = $("#provincia_no_ris").eq(0);
            $(this).autocomplete({
                    source: url+"provincia&valore="+valore,
                    autoFocus: true,
                    delay: 500,
                    minLength: 1,
                    response: function( event, ui ) {
                            no_risposta(ui.content,no_ris);
                    }
            });
            if(valore === '') {
                    no_ris.hide();
            }
    });
    $("#cap, #cap_t").on("keyup change", function(event) {
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
            if(valore === '') {
                    no_ris.hide();			
            }
    });
    //Apro i campi da compilare del tutore
    var campo_tutore = $("input[name='tutore']");	
    //Apro la maschera tutore se il campo è contrassegnato da Y
    if(campo_tutore.filter(":checked").val() === "Y") {
            tutore.show();
    }
    campo_tutore.on("change",function(e){
            if($(this).val() === "Y") {
                    val_tutore = 1;
                    tutore.slideDown(600);
                    $.each(campi_tutore,function(i,v){
                            $(this).removeAttr("disabled");
                    });
            } else if($(this).val() === "N"){
                    val_tutore = 0;
                    tutore.slideUp(600);
                    $.each(campi_tutore,function(i,v){
                            $(this).attr("disabled","disabled");
                    });
            }
    });
    //Inserimento immagine errore e div contenente la spiegazione dell'errore per ciascun campo del form
    form.on("submit", function(e) {
            var invio = 1;
            var stringa;
            var div_info;
            var img;
            var error_t = "&Egrave; obbligatorio compilare questo campo.";
            var error_r = "&Egrave; obbligatorio scegliere questo campo.";		
            var campi = $(":input");
            var corto = "20";
            var lungo = "-194";
            var data_cal = "-86";
            var doc = "0";
            var radio_s = "-16";
            var radio_a = "60";
            var corto_t = "-40";
            var lungo_t = "-256";
            var radio_t = "-74";
            var doc_t = "-60";
            function info_div(rif,dim,error) {
                    invio = 0;
                    img = rif.parent().find("img.errori");
                    rif.css("border","1px solid red");
                    img.show();				
                    img.on("mouseover",function(event){
                            rif.parent().find("div.info").hide();
                            stringa = "<div class='info' style='right:"+dim+"px;'>"+error+"</div>";
                            div_info = $(stringa);
                            div_info.hide();
                            div_info.fadeIn(500);
                            rif.parent().append(div_info);
                    });
                    img.on("mouseout",function(event){
                            $(".info").hide(400);
                            div_info.hide(400);
                    });
            }
            function tutore(rif,dim,errore) {
                    if(val_tutore === 1) {
                            info_div(rif,dim,errore);		
                    }
            }
            campi.filter(":text").each(function(i,v){
                    $(this).parent().find("img.errori").hide();
                    $(this).css("border","1px solid #000");
                    if($(this).val() === "") {
                            switch($(this).attr("name")){
                                    case "data_isc":
                                            info_div($(this),data_cal,error_t);
                                    break;
                                    case "data_nas":
                                            info_div($(this),data_cal,error_t);
                                    break;
                                    case "num_civ":
                                            info_div($(this),corto,error_t);
                                    break;
                                    case "provincia":
                                            info_div($(this),corto,error_t);
                                    break;
                                    case "cap":
                                            info_div($(this),corto,error_t);
                                    break;
                                    case "tel_casa":
                                    break;
                                    case "tel_cell":
                                    break;
                                    case "email":
                                    break;
                                    case "num_documento":
                                            if(doc_iscritto.val() != 0) {
                                                    info_div($(this),corto,error_t);
                                            }
                                    break;
                                    case "nome_t":
                                            tutore($(this),lungo_t,error_t);
                                    break;
                                    case "cognome_t":
                                            tutore($(this),lungo_t,error_t);
                                    break;
                                    case "indirizzo_t":
                                            tutore($(this),lungo_t,error_t);
                                    break;
                                    case "num_civ_t":
                                            tutore($(this),corto_t,error_t);
                                    break;
                                    case "localita_t":
                                            tutore($(this),lungo_t,error_t);
                                    break;
                                    case "provincia_t":
                                            tutore($(this),corto_t,error_t);
                                    break;
                                    case "cap_t":
                                            tutore($(this),corto_t,error_t);
                                    break;
                                    case "tel_casa_t":
                                    break;
                                    case "tel_cell_t":
                                    break;
                                    case "email_t":
                                    break;
                                    case "num_documento_t":
                                            tutore($(this),corto_t,error_t);
                                    break;
                                    default:
                                            info_div($(this),lungo,error_t);
                                    break;
                            }
                    } else if($(this).val() !== "") {
                            switch($(this).attr("name")){
                                    //Data Iscrizione
                                    case "data_isc":
                                            if(new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$").test($(this).val()) === false){
                                                    info_div($(this),data_cal,"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;Anno&minus;Mese&minus;Giorno&quot;.");
                                            }
                                    break;
                                    //Nome
                                    case "nome":
                                            if(new RegExp("^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test($(this).val()) === false){
                                                    info_div($(this),lungo,"Hai inserito un valore non corretto.");
                                            }
                                    break;
                                    //Cognome
                                    case "cognome":
                                            if(new RegExp("^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test($(this).val()) === false){
                                                    info_div($(this),lungo,"Hai inserito un valore non corretto.");
                                            }
                                    break;
                                    //Data Nascita
                                    case "data_nas":
                                            if(new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$").test($(this).val()) === false){
                                                    info_div($(this),data_cal,"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;Anno&minus;Mese&minus;Giorno&quot;.");
                                            }
                                    break;
                                    //Professione
                                    case "professione":
                                            if(new RegExp("^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+").test($(this).val()) === false){
                                                    info_div($(this),lungo,"Hai inserito un valore non corretto.");
                                            }
                                    break;
                                    //Indirizzo
                                    case "indirizzo":
                                            if(new RegExp("^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test($(this).val()) === false){
                                                    info_div($(this),lungo,"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;1)Via o Piazza 2)Nome della via o piazza&quot;.");
                                            }
                                    break;
                                    //Numero Civico
                                    case "num_civ":
                                            if(new RegExp("^[0-9a-zA-Z/ ]+$").test($(this).val()) === false){
                                                    info_div($(this),corto,"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;1)Numero civico 2)/ 3)Scala o Interno&quot;.");
                                            }
                                    break;
                                    //Località
                                    case "localita":
                                            if(new RegExp("^[\.\',0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test($(this).val()) === false){
                                                    info_div($(this),lungo,"Hai inserito un valore non corretto.");
                                            }
                                    break;
                                    //Provincia
                                    case "provincia":
                                            if(new RegExp("^[A-Za-z]{2}$").test($(this).val()) === false){
                                                    info_div($(this),corto,"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo due lettere.");
                                            }
                                    break;
                                    //CAP
                                    case "cap":
                                            if(new RegExp("^[0-9]{5}$").test($(this).val()) === false){
                                                    info_div($(this),corto,"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere 5 numeri.");
                                            }
                                    break;
                                    //Tel. Casa
                                    case "tel_casa":
                                            if(new RegExp("^[0-9]{5,12}$").test($(this).val()) === false){
                                                    info_div($(this),corto,"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                                            }
                                    break;
                                    //Tel. Cell
                                    case "tel_cell":
                                            if(new RegExp("^[0-9]{8,10}$").test($(this).val()) === false){
                                                    info_div($(this),corto,"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                                            }
                                    break;
                                    //Email
                                    case "email":
                                            if(new RegExp("^[a-z0-9\._%-]+@{1,1}[a-z0-9\._%-]+[\.]{1,1}[a-z]{2,6}$").test($(this).val()) === false){
                                                    info_div($(this),lungo,"Hai inserito un valore non corretto.");
                                            }
                                    break;
                                    //Numero Documento
                                    case "num_documento":
                                            if(new RegExp("^[0-9a-zA-Z ]+$").test($(this).val()) === false){
                                                    info_div($(this),corto,"Hai inserito un valore non corretto.");
                                            }
                                    break;
                                    //Nome tutore
                                    case "nome_t":
                                            if(new RegExp("^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test($(this).val()) === false){
                                                    tutore($(this),lungo_t,"Hai inserito un valore non corretto.");
                                            }
                                    break;
                                    //Cognome tutore
                                    case "cognome_t":
                                            if(new RegExp("^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test($(this).val()) === false){
                                                    tutore($(this),lungo_t,"Hai inserito un valore non corretto.");
                                            }
                                    break;
                                    //Indirizzo tutore
                                    case "indirizzo_t":
                                            if(new RegExp("^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test($(this).val()) === false){
                                                    tutore($(this),lungo_t,"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;1)Via o Piazza 2)Nome della via o piazza&quot;.");
                                            }
                                    break;
                                    //Numero Civico tutore
                                    case "num_civ_t":
                                            if(new RegExp("^[0-9a-zA-Z/ ]+$").test($(this).val()) === false){
                                                    tutore($(this),corto_t,"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;1)Numero civico 2)/ 3)Scala o Interno&quot;.");
                                            }
                                    break;
                                    //Località tutore
                                    case "localita_t":
                                            if(new RegExp("^[\.\',0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test($(this).val()) === false){
                                                    tutore($(this),lungo_t,"Hai inserito un valore non corretto.");
                                            }
                                    break;
                                    //Provincia tutore
                                    case "provincia_t":
                                            if(new RegExp("^[A-Za-z]{2}$").test($(this).val()) === false){
                                                    tutore($(this),corto_t,"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo due lettere.");
                                            }
                                    break;
                                    //CAP tutore
                                    case "cap_t":
                                            if(new RegExp("^[0-9]{5}$").test($(this).val()) === false){
                                                    tutore($(this),corto_t,"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere 5 numeri.");
                                            }
                                    break;
                                    //Tel. Casa tutore
                                    case "tel_casa_t":
                                            if(new RegExp("^[0-9]{5,12}$").test($(this).val()) === false){
                                                    tutore($(this),corto_t,"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                                            }
                                    break;
                                    //Tel. Cell tutore
                                    case "tel_cell_t":
                                            if(new RegExp("^[0-9]{8,10}$").test($(this).val()) === false){
                                                    tutore($(this),corto_t,"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                                            }
                                    break;
                                    //Email tutore
                                    case "email_t":
                                            if(new RegExp("^[a-z0-9\._%-]+@{1,1}[a-z0-9\._%-]+[\.]{1,1}[a-z]{2,6}$").test($(this).val()) === false){
                                                    tutore($(this),lungo_t,"Hai inserito un valore non corretto.");
                                            }
                                    break;
                                    //Numero Documento tutore
                                    case "num_documento_t":
                                            if(new RegExp("^[0-9a-zA-Z ]+$").test($(this).val()) === false){
                                                    tutore($(this),corto_t,"Hai inserito un valore non corretto.");
                                            }
                                    break;
                            }
                    }
            });
            campi.filter(":radio").each(function(i,v){
                    $(this).parent().find("img.errori").hide();
            });
            if(campi.filter("input[name='sesso']:checked").val() == undefined) {
                    info_div(campi.filter("input[name='sesso']"),radio_s,error_r);
            }
            if(campi.filter("input[name='sesso_t']:checked").val() == undefined) {
                    tutore(campi.filter("input[name='sesso_t']"),radio_t,error_r);
            }
            if(campi.filter("input[name='internet']:checked").val() == undefined) {
                    info_div(campi.filter("input[name='internet']"),radio_a,error_r);
            }
            if(campi.filter("input[name='privacy']:checked").val() == undefined) {
                    info_div(campi.filter("input[name='privacy']"),radio_a,error_r);
            }
            if(campi.filter("input[name='tutore']:checked").val() == undefined) {
                    info_div(campi.filter("input[name='tutore']"),radio_a,error_r);
            }
            //Select Documento tutore
            if(val_tutore === 1) {
                    //Se N°Documento è diverso dall'insieme vuoto devo avvisare che tipo documento è da scegliere
                    if($("#num_documento_t").val() !== "" && doc_tutore.val() == 0) {
                            tutore(doc_tutore,doc_t,"Avendo compilato il campo N&deg; DOCUMENTO &egrave; obbligatorio scegliere anche questo campo (TIPO DI DOCUMENTO).");
                    } else if(doc_tutore.val() == 0) {
                            tutore(doc_tutore,doc_t,error_r);
                    } else {
                            doc_tutore.parent().find("img.errori").hide();
                            doc_tutore.css("border","1px solid #000");
                    }
            }
            //Se N°Documento è diverso dall'insieme vuoto devo avvisare che tipo documento è da scegliere
            if($("#num_documento").val() !== "" && doc_iscritto.val() == 0) {
                    info_div(doc_iscritto,doc,"Avendo compilato il campo N&deg; DOCUMENTO &egrave; obbligatorio scegliere anche questo campo (TIPO DI DOCUMENTO).");
            } else {
                    doc_iscritto.parent().find("img.errori").hide();
                    doc_iscritto.css("border","1px solid #000");
            }
            //Blocco l'invio dei dati del form se c'è qualche errore
            if(invio === 0){
                e.preventDefault();
                $("#errori").dialog(options);
                $("#errori").dialog("open");
            }
    });
    form.on('keydown',function(event){
            if(event.keyCode === 13) {
                    event.preventDefault();
            }
    });
    //Apertura finestra messaggi di errore
    if(location.search.indexOf("errors") !== -1) {
        $("#errors").dialog(options);
        $("#errors").dialog("open");
    }
});