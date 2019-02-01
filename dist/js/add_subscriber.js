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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhZGRfc3Vic2NyaWJlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogRm9jdXMgZSBCdXR0b24gKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cclxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgIC8vVmFyaWFiaWxpXHJcbiAgICB2YXIgZGF0YV9pc2MgPSAkKFwiI2RhdGFfaXNjXCIpO1xyXG4gICAgdmFyIGZvcm0gPSAkKFwiLnV0ZW50ZVwiKTtcclxuICAgIHZhciB0dXRvcmUgPSAkKFwiI3R1dG9yZVwiKTtcclxuICAgIHZhciBjYW1waV90dXRvcmUgPSAkKFwibGkjdHV0b3JlIGlucHV0XCIpO1xyXG4gICAgdmFyIGRvY19pc2NyaXR0byA9ICQoXCIjdGlwb19kb2N1bWVudG9cIik7XHJcbiAgICB2YXIgZG9jX3R1dG9yZSA9ICQoXCIjdGlwb19kb2N1bWVudG9fdFwiKTtcclxuICAgIHZhciB2YWxfdHV0b3JlO1xyXG4gICAgdmFyIGRhdGFfb2RpZXJuYSA9IG5ldyBEYXRlKCk7XHJcbiAgICB2YXIgYW5ub19hdHR1YWxlID0gZGF0YV9vZGllcm5hLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAvL1NldHRhZ2dpbyBvcHppb25pIGZpbmVzdHJlIGRpIGF2dmlzb1xyXG4gICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgYXV0b09wZW46IHRydWUsXHJcbiAgICAgICAgY2xvc2VUZXh0OiBcIkNoaXVkaVwiLFxyXG4gICAgICAgIHNob3c6IDUwMCxcclxuICAgICAgICBoaWRlOiA1MDAsXHJcbiAgICAgICAgdGl0bGU6IFwiQXZ2aXNvXCIsXHJcbiAgICAgICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgICAgICBidXR0b25zOiB7XHJcbiAgICAgICAgICAgIE9rOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9Gb2N1cyBzdSB1c2VybmFtZVxyXG4gICAgZGF0YV9pc2MuZm9jdXMoKTtcclxuICAgIGRhdGFfaXNjLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICBhbHRGaWVsZDogJyNkYXRhX2lzYycsXHJcbiAgICAgICAgICAgIGFsdEZvcm1hdDogXCJ5eS1tbS1kZFwiLFxyXG4gICAgICAgICAgICBjbG9zZVRleHQgOiAnWCcsXHJcbiAgICAgICAgICAgIGN1cnJlbnRUZXh0IDogJ05vdycsXHJcbiAgICAgICAgICAgIHNlbGVjdE90aGVyTW9udGhzIDogdHJ1ZSxcclxuICAgICAgICAgICAgc2hvd090aGVyTW9udGhzIDogdHJ1ZSxcclxuICAgICAgICAgICAgc2hvd1dlZWsgOiB0cnVlLFxyXG4gICAgICAgICAgICB3ZWVrSGVhZGVyIDogJ1dlZWsnLFxyXG4gICAgICAgICAgICBhcHBlbmRUZXh0OiAnKGFhYWEtbW0tZ2cpJyxcclxuICAgICAgICAgICAgYnV0dG9uSW1hZ2U6ICcuL2ltYWdlcy9jYWxlbmRhcmlvLnBuZycsXHJcbiAgICAgICAgICAgIGJ1dHRvbkltYWdlT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgY2hhbmdlWWVhcjogdHJ1ZSxcclxuICAgICAgICAgICAgY2hhbmdlTW9udGg6IHRydWUsXHJcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICd5eS1tbS1kZCcsXHJcbiAgICAgICAgICAgIG1pbkRhdGU6IG5ldyBEYXRlKDE5ODAsMCwxKSxcclxuICAgICAgICAgICAgeWVhclJhbmdlOiBcIjE5ODA6XCIrYW5ub19hdHR1YWxlLFxyXG4gICAgICAgICAgICBkZWZhdWx0RGF0ZTogZGF0YV9vZGllcm5hLFxyXG4gICAgICAgICAgICBzaG93T246IFwiYm90aFwiXHJcbiAgICB9KTtcclxuICAgICQoJyNkYXRhX25hcycpLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgICAgICBhbHRGaWVsZDogJyNkYXRhX25hcycsXHJcbiAgICAgICAgICAgIGFsdEZvcm1hdDogXCJ5eS1tbS1kZFwiLFxyXG4gICAgICAgICAgICBjbG9zZVRleHQgOiAnWCcsXHJcbiAgICAgICAgICAgIGN1cnJlbnRUZXh0IDogJ05vdycsXHJcbiAgICAgICAgICAgIHNlbGVjdE90aGVyTW9udGhzIDogdHJ1ZSxcclxuICAgICAgICAgICAgc2hvd090aGVyTW9udGhzIDogdHJ1ZSxcclxuICAgICAgICAgICAgc2hvd1dlZWsgOiB0cnVlLFxyXG4gICAgICAgICAgICB3ZWVrSGVhZGVyIDogJ1dlZWsnLFxyXG4gICAgICAgICAgICBhcHBlbmRUZXh0OiAnKGFhYWEtbW0tZ2cpJyxcclxuICAgICAgICAgICAgYnV0dG9uSW1hZ2U6ICcuL2ltYWdlcy9jYWxlbmRhcmlvLnBuZycsXHJcbiAgICAgICAgICAgIGJ1dHRvbkltYWdlT25seTogdHJ1ZSxcclxuICAgICAgICAgICAgY2hhbmdlWWVhcjogdHJ1ZSxcclxuICAgICAgICAgICAgY2hhbmdlTW9udGg6IHRydWUsXHJcbiAgICAgICAgICAgIGRhdGVGb3JtYXQ6ICd5eS1tbS1kZCcsXHJcbiAgICAgICAgICAgIG1pbkRhdGU6IG5ldyBEYXRlKDE4OTAsMCwxKSxcclxuICAgICAgICAgICAgeWVhclJhbmdlOiBcIjE4OTA6XCIrYW5ub19hdHR1YWxlLFxyXG4gICAgICAgICAgICBkZWZhdWx0RGF0ZTogbmV3IERhdGUoMTk1NSwwLDEpLFxyXG4gICAgICAgICAgICBzaG93T246IFwiYm90aFwiXHJcbiAgICB9KTtcdFxyXG4gICAgLy9DcmVhemlvbmUgYXV0b2NvbXBsZXRlXHJcbiAgICAvL0Z1bnppb25lIHBlciB2aXN1YWxpenphcmUgaWwgbWVzc2FnZ2lvIGNoZSBzaSB0cmF0dGEgZGkgdW4gbnVvdm8gZWxlbWVudG9cclxuICAgIGZ1bmN0aW9uIG5vX3Jpc3Bvc3RhKGRhdGEsbm9fcmlzKSB7XHJcbiAgICAgICAgICAgIGlmKGRhdGFbMF0udmFsdWUgPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vX3Jpcy5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbm9fcmlzLmh0bWwoXCJOdW92b1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBub19yaXMuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgdXJsID0gXCIuL2luY2x1ZGUtcGhwL2NvbnRlbnRfZ2xvYmFsLnBocD90aXBvPVwiO1xyXG4gICAgdmFyIGRhdGE7XHJcbiAgICAkKFwiI25vbWVcIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNub21lX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICBub19yaXMuY3NzKFwibWFyZ2luLWxlZnRcIixcIjU2OHB4XCIpO1xyXG4gICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgc291cmNlOiB1cmwrXCJub21lJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDUwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodmFsb3JlID09PSAnJykge1xyXG4gICAgICAgICAgICBub19yaXMuaGlkZSgpO1x0XHRcdFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChcIiNjb2dub21lXCIpLm9uKFwia2V5dXAgY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHZhbG9yZSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgdmFyIG5vX3JpcyA9ICQoXCIjY29nbm9tZV9ub19yaXNcIikuZXEoMCk7XHJcbiAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHVybCtcImNvZ25vbWUmdmFsb3JlPVwiK3ZhbG9yZSxcclxuICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWxheTogNTAwLFxyXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgICAgICAgbm9fcmlzcG9zdGEodWkuY29udGVudCxub19yaXMpO1x0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih2YWxvcmUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHRcdFx0XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKFwiI3Byb2Zlc3Npb25lXCIpLm9uKFwia2V5dXAgY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNwcm9mZXNzaW9uZV9ub19yaXNcIikuZXEoMCk7XHJcbiAgICAgICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHVybCtcInByb2Zlc3Npb25lJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5OiA1MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9fcmlzcG9zdGEodWkuY29udGVudCxub19yaXMpO1x0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYodmFsb3JlID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHRcdFx0XHJcbiAgICAgICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChcIiNpbmRpcml6em8sICNpbmRpcml6em9fdFwiKS5vbihcImtleXVwIGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgdmFyIG5vX3JpcyA9ICQoXCIjaW5kaXJpenpvX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogdXJsK1wiaW5kaXJpenpvJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5OiA1MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9fcmlzcG9zdGEodWkuY29udGVudCxub19yaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKHZhbG9yZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICBub19yaXMuaGlkZSgpO1x0XHRcdFxyXG4gICAgICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoXCIjbG9jYWxpdGEsICNsb2NhbGl0YV90XCIpLm9uKFwia2V5dXAgY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNsb2NhbGl0YV9ub19yaXNcIikuZXEoMCk7XHJcbiAgICAgICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHVybCtcImxvY2FsaXRhJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5OiA1MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9fcmlzcG9zdGEodWkuY29udGVudCxub19yaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKHZhbG9yZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICBub19yaXMuaGlkZSgpO1x0XHRcdFxyXG4gICAgICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoXCIjbG9jYWxpdGFcIikub24oXCJibHVyXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogdXJsK1wibG9jYWxpdGFfYyZ2YWxvcmU9XCIrdmFsb3JlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHRcdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkYXRhLnNwbGl0KCcjJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjcHJvdmluY2lhXCIpLnZhbCh2YWxbMF0udHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNjYXBcIikudmFsKHZhbFsxXS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjdGVsX2Nhc2EnKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHRcdFxyXG4gICAgfSk7XHJcbiAgICAkKFwiI2xvY2FsaXRhX3RcIikub24oXCJibHVyXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVybDogdXJsK1wibG9jYWxpdGFfYyZ2YWxvcmU9XCIrdmFsb3JlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHRcdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkYXRhLnNwbGl0KCcjJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjcHJvdmluY2lhX3RcIikudmFsKHZhbFswXS50cmltKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2NhcF90XCIpLnZhbCh2YWxbMV0udHJpbSgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3RlbF9jYXNhX3QnKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHRcdFxyXG4gICAgfSk7XHJcbiAgICAkKFwiI3Byb3ZpbmNpYSwgI3Byb3ZpbmNpYV90XCIpLm9uKFwia2V5dXAgY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHZhciB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNwcm92aW5jaWFfbm9fcmlzXCIpLmVxKDApO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiB1cmwrXCJwcm92aW5jaWEmdmFsb3JlPVwiK3ZhbG9yZSxcclxuICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsYXk6IDUwMCxcclxuICAgICAgICAgICAgICAgICAgICBtaW5MZW5ndGg6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub19yaXNwb3N0YSh1aS5jb250ZW50LG5vX3Jpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYodmFsb3JlID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChcIiNjYXAsICNjYXBfdFwiKS5vbihcImtleXVwIGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICAgICAgdmFyIG5vX3JpcyA9ICQoXCIjY2FwX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogdXJsK1wiY2FwJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5OiA1MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9fcmlzcG9zdGEodWkuY29udGVudCxub19yaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKHZhbG9yZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgICAgICBub19yaXMuaGlkZSgpO1x0XHRcdFxyXG4gICAgICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vQXBybyBpIGNhbXBpIGRhIGNvbXBpbGFyZSBkZWwgdHV0b3JlXHJcbiAgICB2YXIgY2FtcG9fdHV0b3JlID0gJChcImlucHV0W25hbWU9J3R1dG9yZSddXCIpO1x0XHJcbiAgICAvL0Fwcm8gbGEgbWFzY2hlcmEgdHV0b3JlIHNlIGlsIGNhbXBvIMOoIGNvbnRyYXNzZWduYXRvIGRhIFlcclxuICAgIGlmKGNhbXBvX3R1dG9yZS5maWx0ZXIoXCI6Y2hlY2tlZFwiKS52YWwoKSA9PT0gXCJZXCIpIHtcclxuICAgICAgICAgICAgdHV0b3JlLnNob3coKTtcclxuICAgIH1cclxuICAgIGNhbXBvX3R1dG9yZS5vbihcImNoYW5nZVwiLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBpZigkKHRoaXMpLnZhbCgpID09PSBcIllcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbF90dXRvcmUgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHR1dG9yZS5zbGlkZURvd24oNjAwKTtcclxuICAgICAgICAgICAgICAgICAgICAkLmVhY2goY2FtcGlfdHV0b3JlLGZ1bmN0aW9uKGksdil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKCQodGhpcykudmFsKCkgPT09IFwiTlwiKXtcclxuICAgICAgICAgICAgICAgICAgICB2YWxfdHV0b3JlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB0dXRvcmUuc2xpZGVVcCg2MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICQuZWFjaChjYW1waV90dXRvcmUsZnVuY3Rpb24oaSx2KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvL0luc2VyaW1lbnRvIGltbWFnaW5lIGVycm9yZSBlIGRpdiBjb250ZW5lbnRlIGxhIHNwaWVnYXppb25lIGRlbGwnZXJyb3JlIHBlciBjaWFzY3VuIGNhbXBvIGRlbCBmb3JtXHJcbiAgICBmb3JtLm9uKFwic3VibWl0XCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgdmFyIGludmlvID0gMTtcclxuICAgICAgICAgICAgdmFyIHN0cmluZ2E7XHJcbiAgICAgICAgICAgIHZhciBkaXZfaW5mbztcclxuICAgICAgICAgICAgdmFyIGltZztcclxuICAgICAgICAgICAgdmFyIGVycm9yX3QgPSBcIiZFZ3JhdmU7IG9iYmxpZ2F0b3JpbyBjb21waWxhcmUgcXVlc3RvIGNhbXBvLlwiO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3JfciA9IFwiJkVncmF2ZTsgb2JibGlnYXRvcmlvIHNjZWdsaWVyZSBxdWVzdG8gY2FtcG8uXCI7XHRcdFxyXG4gICAgICAgICAgICB2YXIgY2FtcGkgPSAkKFwiOmlucHV0XCIpO1xyXG4gICAgICAgICAgICB2YXIgY29ydG8gPSBcIjIwXCI7XHJcbiAgICAgICAgICAgIHZhciBsdW5nbyA9IFwiLTE5NFwiO1xyXG4gICAgICAgICAgICB2YXIgZGF0YV9jYWwgPSBcIi04NlwiO1xyXG4gICAgICAgICAgICB2YXIgZG9jID0gXCIwXCI7XHJcbiAgICAgICAgICAgIHZhciByYWRpb19zID0gXCItMTZcIjtcclxuICAgICAgICAgICAgdmFyIHJhZGlvX2EgPSBcIjYwXCI7XHJcbiAgICAgICAgICAgIHZhciBjb3J0b190ID0gXCItNDBcIjtcclxuICAgICAgICAgICAgdmFyIGx1bmdvX3QgPSBcIi0yNTZcIjtcclxuICAgICAgICAgICAgdmFyIHJhZGlvX3QgPSBcIi03NFwiO1xyXG4gICAgICAgICAgICB2YXIgZG9jX3QgPSBcIi02MFwiO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBpbmZvX2RpdihyaWYsZGltLGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW52aW8gPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZyA9IHJpZi5wYXJlbnQoKS5maW5kKFwiaW1nLmVycm9yaVwiKTtcclxuICAgICAgICAgICAgICAgICAgICByaWYuY3NzKFwiYm9yZGVyXCIsXCIxcHggc29saWQgcmVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zaG93KCk7XHRcdFx0XHRcclxuICAgICAgICAgICAgICAgICAgICBpbWcub24oXCJtb3VzZW92ZXJcIixmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWYucGFyZW50KCkuZmluZChcImRpdi5pbmZvXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ2EgPSBcIjxkaXYgY2xhc3M9J2luZm8nIHN0eWxlPSdyaWdodDpcIitkaW0rXCJweDsnPlwiK2Vycm9yK1wiPC9kaXY+XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXZfaW5mbyA9ICQoc3RyaW5nYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXZfaW5mby5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXZfaW5mby5mYWRlSW4oNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJpZi5wYXJlbnQoKS5hcHBlbmQoZGl2X2luZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5vbihcIm1vdXNlb3V0XCIsZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5pbmZvXCIpLmhpZGUoNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpdl9pbmZvLmhpZGUoNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiB0dXRvcmUocmlmLGRpbSxlcnJvcmUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZih2YWxfdHV0b3JlID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdihyaWYsZGltLGVycm9yZSk7XHRcdFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYW1waS5maWx0ZXIoXCI6dGV4dFwiKS5lYWNoKGZ1bmN0aW9uKGksdil7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiaW1nLmVycm9yaVwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoXCJib3JkZXJcIixcIjFweCBzb2xpZCAjMDAwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQodGhpcykudmFsKCkgPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCgkKHRoaXMpLmF0dHIoXCJuYW1lXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRhdGFfaXNjXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxkYXRhX2NhbCxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYXRhX25hc1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksZGF0YV9jYWwsZXJyb3JfdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibnVtX2NpdlwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksY29ydG8sZXJyb3JfdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicHJvdmluY2lhXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjYXBcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGNvcnRvLGVycm9yX3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRlbF9jYXNhXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGVsX2NlbGxcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbWFpbFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm51bV9kb2N1bWVudG9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkb2NfaXNjcml0dG8udmFsKCkgIT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibm9tZV90XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKCQodGhpcyksbHVuZ29fdCxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2dub21lX3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoJCh0aGlzKSxsdW5nb190LGVycm9yX3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImluZGlyaXp6b190XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKCQodGhpcyksbHVuZ29fdCxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJudW1fY2l2X3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoJCh0aGlzKSxjb3J0b190LGVycm9yX3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxvY2FsaXRhX3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoJCh0aGlzKSxsdW5nb190LGVycm9yX3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInByb3ZpbmNpYV90XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKCQodGhpcyksY29ydG9fdCxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjYXBfdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR1dG9yZSgkKHRoaXMpLGNvcnRvX3QsZXJyb3JfdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGVsX2Nhc2FfdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRlbF9jZWxsX3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbWFpbF90XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibnVtX2RvY3VtZW50b190XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKCQodGhpcyksY29ydG9fdCxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxsdW5nbyxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKCQodGhpcykudmFsKCkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCgkKHRoaXMpLmF0dHIoXCJuYW1lXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9EYXRhIElzY3JpemlvbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRhdGFfaXNjXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05XXs0fS1bMC05XXsyfS1bMC05XXsyfSRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxkYXRhX2NhbCxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGVzc2VyZSBzY3JpdHRvIGluIHF1ZXN0YSBmb3JtYSAmcXVvdDtBbm5vJm1pbnVzO01lc2UmbWludXM7R2lvcm5vJnF1b3Q7LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL05vbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5vbWVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXCdhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxsdW5nbyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvZ25vbWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvZ25vbWVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXCdhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxsdW5nbyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0RhdGEgTmFzY2l0YVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGF0YV9uYXNcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTldezR9LVswLTldezJ9LVswLTldezJ9JFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGRhdGFfY2FsLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgZXNzZXJlIHNjcml0dG8gaW4gcXVlc3RhIGZvcm1hICZxdW90O0Fubm8mbWludXM7TWVzZSZtaW51cztHaW9ybm8mcXVvdDsuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUHJvZmVzc2lvbmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInByb2Zlc3Npb25lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bXFwtXFwuXFwnLzAtOWEtekEtWlxceEUwXFx4RThcXHhFOVxceEY5XFx4RjJcXHhFQ1xceDI3IF0rXCIpLnRlc3QoJCh0aGlzKS52YWwoKSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksbHVuZ28sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JbmRpcml6em9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImluZGlyaXp6b1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeW1xcLVxcLlxcJy8wLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxsdW5nbyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGVzc2VyZSBzY3JpdHRvIGluIHF1ZXN0YSBmb3JtYSAmcXVvdDsxKVZpYSBvIFBpYXp6YSAyKU5vbWUgZGVsbGEgdmlhIG8gcGlhenphJnF1b3Q7LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL051bWVybyBDaXZpY29cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm51bV9jaXZcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTlhLXpBLVovIF0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGNvcnRvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgZXNzZXJlIHNjcml0dG8gaW4gcXVlc3RhIGZvcm1hICZxdW90OzEpTnVtZXJvIGNpdmljbyAyKS8gMylTY2FsYSBvIEludGVybm8mcXVvdDsuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTG9jYWxpdMOgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsb2NhbGl0YVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeW1xcLlxcJywwLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxsdW5nbyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1Byb3ZpbmNpYVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicHJvdmluY2lhXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bQS1aYS16XXsyfSRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGNvbnRlbmVyZSBzb2xvIGR1ZSBsZXR0ZXJlLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NBUFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2FwXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05XXs1fSRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGNvbnRlbmVyZSA1IG51bWVyaS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UZWwuIENhc2FcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRlbF9jYXNhXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05XXs1LDEyfSRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGNvbnRlbmVyZSBzb2xvIG51bWVyaS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9UZWwuIENlbGxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRlbF9jZWxsXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05XXs4LDEwfSRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGNvbnRlbmVyZSBzb2xvIG51bWVyaS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9FbWFpbFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW1haWxcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlthLXowLTlcXC5fJS1dK0B7MSwxfVthLXowLTlcXC5fJS1dK1tcXC5dezEsMX1bYS16XXsyLDZ9JFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGx1bmdvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTnVtZXJvIERvY3VtZW50b1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibnVtX2RvY3VtZW50b1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeWzAtOWEtekEtWiBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL05vbWUgdHV0b3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJub21lX3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXCdhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKCQodGhpcyksbHVuZ29fdCxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0NvZ25vbWUgdHV0b3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2dub21lX3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXCdhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKCQodGhpcyksbHVuZ29fdCxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0luZGlyaXp6byB0dXRvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImluZGlyaXp6b190XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bXFwtXFwuXFwnLzAtOWEtekEtWlxceEUwXFx4RThcXHhFOVxceEY5XFx4RjJcXHhFQ1xceDI3IF0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoJCh0aGlzKSxsdW5nb190LFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgZXNzZXJlIHNjcml0dG8gaW4gcXVlc3RhIGZvcm1hICZxdW90OzEpVmlhIG8gUGlhenphIDIpTm9tZSBkZWxsYSB2aWEgbyBwaWF6emEmcXVvdDsuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vTnVtZXJvIENpdmljbyB0dXRvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm51bV9jaXZfdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeWzAtOWEtekEtWi8gXSskXCIpLnRlc3QoJCh0aGlzKS52YWwoKSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR1dG9yZSgkKHRoaXMpLGNvcnRvX3QsXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBlc3NlcmUgc2NyaXR0byBpbiBxdWVzdGEgZm9ybWEgJnF1b3Q7MSlOdW1lcm8gY2l2aWNvIDIpLyAzKVNjYWxhIG8gSW50ZXJubyZxdW90Oy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9Mb2NhbGl0w6AgdHV0b3JlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsb2NhbGl0YV90XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bXFwuXFwnLDAtOWEtekEtWlxceEUwXFx4RThcXHhFOVxceEY5XFx4RjJcXHhFQ1xceDI3IF0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoJCh0aGlzKSxsdW5nb190LFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUHJvdmluY2lhIHR1dG9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwicHJvdmluY2lhX3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltBLVphLXpdezJ9JFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoJCh0aGlzKSxjb3J0b190LFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgY29udGVuZXJlIHNvbG8gZHVlIGxldHRlcmUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vQ0FQIHR1dG9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY2FwX3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTldezV9JFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoJCh0aGlzKSxjb3J0b190LFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgY29udGVuZXJlIDUgbnVtZXJpLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RlbC4gQ2FzYSB0dXRvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRlbF9jYXNhX3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTldezUsMTJ9JFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoJCh0aGlzKSxjb3J0b190LFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgY29udGVuZXJlIHNvbG8gbnVtZXJpLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1RlbC4gQ2VsbCB0dXRvcmVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRlbF9jZWxsX3RcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTldezgsMTB9JFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoJCh0aGlzKSxjb3J0b190LFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgY29udGVuZXJlIHNvbG8gbnVtZXJpLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL0VtYWlsIHR1dG9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW1haWxfdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeW2EtejAtOVxcLl8lLV0rQHsxLDF9W2EtejAtOVxcLl8lLV0rW1xcLl17MSwxfVthLXpdezIsNn0kXCIpLnRlc3QoJCh0aGlzKS52YWwoKSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR1dG9yZSgkKHRoaXMpLGx1bmdvX3QsXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9OdW1lcm8gRG9jdW1lbnRvIHR1dG9yZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibnVtX2RvY3VtZW50b190XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05YS16QS1aIF0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoJCh0aGlzKSxjb3J0b190LFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2FtcGkuZmlsdGVyKFwiOnJhZGlvXCIpLmVhY2goZnVuY3Rpb24oaSx2KXtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJpbWcuZXJyb3JpXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmKGNhbXBpLmZpbHRlcihcImlucHV0W25hbWU9J3Nlc3NvJ106Y2hlY2tlZFwiKS52YWwoKSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdihjYW1waS5maWx0ZXIoXCJpbnB1dFtuYW1lPSdzZXNzbyddXCIpLHJhZGlvX3MsZXJyb3Jfcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY2FtcGkuZmlsdGVyKFwiaW5wdXRbbmFtZT0nc2Vzc29fdCddOmNoZWNrZWRcIikudmFsKCkgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHV0b3JlKGNhbXBpLmZpbHRlcihcImlucHV0W25hbWU9J3Nlc3NvX3QnXVwiKSxyYWRpb190LGVycm9yX3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKGNhbXBpLmZpbHRlcihcImlucHV0W25hbWU9J2ludGVybmV0J106Y2hlY2tlZFwiKS52YWwoKSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdihjYW1waS5maWx0ZXIoXCJpbnB1dFtuYW1lPSdpbnRlcm5ldCddXCIpLHJhZGlvX2EsZXJyb3Jfcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY2FtcGkuZmlsdGVyKFwiaW5wdXRbbmFtZT0ncHJpdmFjeSddOmNoZWNrZWRcIikudmFsKCkgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoY2FtcGkuZmlsdGVyKFwiaW5wdXRbbmFtZT0ncHJpdmFjeSddXCIpLHJhZGlvX2EsZXJyb3Jfcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoY2FtcGkuZmlsdGVyKFwiaW5wdXRbbmFtZT0ndHV0b3JlJ106Y2hlY2tlZFwiKS52YWwoKSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdihjYW1waS5maWx0ZXIoXCJpbnB1dFtuYW1lPSd0dXRvcmUnXVwiKSxyYWRpb19hLGVycm9yX3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vU2VsZWN0IERvY3VtZW50byB0dXRvcmVcclxuICAgICAgICAgICAgaWYodmFsX3R1dG9yZSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vU2UgTsKwRG9jdW1lbnRvIMOoIGRpdmVyc28gZGFsbCdpbnNpZW1lIHZ1b3RvIGRldm8gYXZ2aXNhcmUgY2hlIHRpcG8gZG9jdW1lbnRvIMOoIGRhIHNjZWdsaWVyZVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCQoXCIjbnVtX2RvY3VtZW50b190XCIpLnZhbCgpICE9PSBcIlwiICYmIGRvY190dXRvcmUudmFsKCkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKGRvY190dXRvcmUsZG9jX3QsXCJBdmVuZG8gY29tcGlsYXRvIGlsIGNhbXBvIE4mZGVnOyBET0NVTUVOVE8gJmVncmF2ZTsgb2JibGlnYXRvcmlvIHNjZWdsaWVyZSBhbmNoZSBxdWVzdG8gY2FtcG8gKFRJUE8gREkgRE9DVU1FTlRPKS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGRvY190dXRvcmUudmFsKCkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKGRvY190dXRvcmUsZG9jX3QsZXJyb3Jfcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY190dXRvcmUucGFyZW50KCkuZmluZChcImltZy5lcnJvcmlcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jX3R1dG9yZS5jc3MoXCJib3JkZXJcIixcIjFweCBzb2xpZCAjMDAwXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL1NlIE7CsERvY3VtZW50byDDqCBkaXZlcnNvIGRhbGwnaW5zaWVtZSB2dW90byBkZXZvIGF2dmlzYXJlIGNoZSB0aXBvIGRvY3VtZW50byDDqCBkYSBzY2VnbGllcmVcclxuICAgICAgICAgICAgaWYoJChcIiNudW1fZG9jdW1lbnRvXCIpLnZhbCgpICE9PSBcIlwiICYmIGRvY19pc2NyaXR0by52YWwoKSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoZG9jX2lzY3JpdHRvLGRvYyxcIkF2ZW5kbyBjb21waWxhdG8gaWwgY2FtcG8gTiZkZWc7IERPQ1VNRU5UTyAmZWdyYXZlOyBvYmJsaWdhdG9yaW8gc2NlZ2xpZXJlIGFuY2hlIHF1ZXN0byBjYW1wbyAoVElQTyBESSBET0NVTUVOVE8pLlwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2NfaXNjcml0dG8ucGFyZW50KCkuZmluZChcImltZy5lcnJvcmlcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY19pc2NyaXR0by5jc3MoXCJib3JkZXJcIixcIjFweCBzb2xpZCAjMDAwXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vQmxvY2NvIGwnaW52aW8gZGVpIGRhdGkgZGVsIGZvcm0gc2UgYyfDqCBxdWFsY2hlIGVycm9yZVxyXG4gICAgICAgICAgICBpZihpbnZpbyA9PT0gMCl7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2Vycm9yaVwiKS5kaWFsb2cob3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2Vycm9yaVwiKS5kaWFsb2coXCJvcGVuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGZvcm0ub24oJ2tleWRvd24nLGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgaWYoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vQXBlcnR1cmEgZmluZXN0cmEgbWVzc2FnZ2kgZGkgZXJyb3JlXHJcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImVycm9yc1wiKSAhPT0gLTEpIHtcclxuICAgICAgICAkKFwiI2Vycm9yc1wiKS5kaWFsb2cob3B0aW9ucyk7XHJcbiAgICAgICAgJChcIiNlcnJvcnNcIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgIH1cclxufSk7Il0sImZpbGUiOiJhZGRfc3Vic2NyaWJlci5qcyJ9
