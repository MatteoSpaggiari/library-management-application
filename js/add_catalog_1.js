$(document).ready(function(){
    var form = $(".catalogazione");
    //Focus
    $("input[name='isbn']").eq(0).focus();
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
    //Creazione box dialog
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
    //Creazione presentazione menù
    var data_odierna = new Date();
    var anno_attuale = data_odierna.getFullYear();
    //Creazione calendario
    $('#data_c').datepicker({
        altField: '#data_c',
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
        dateFormat: 'yy/mm/dd',
        minDate: new Date(1980,0,1),
        yearRange: "1980:"+anno_attuale,
        defaultDate: data_odierna,
        showOn: "both"
    });
    //Apertura finestra messaggi di avviso o errori
    if(location.search.indexOf("errore") !== -1) {
        $("#avvisi").dialog(options);
        $("#avvisi").dialog("open");
    }
    //Apertura finestra messaggi di errore
    if(location.search.indexOf("errors") !== -1) {
        $("#errors").dialog(options);
        $("#errors").dialog("open");
    }
    //Se si clicca su numero inventario ma non è stata scelta la proprietà esce un box dialog 			
    $("#num_inv").on("focus active", function(event) {
        var check = $("input[name='proprieta']:checked").val();
        if(check == undefined) {
            $("input[name='proprieta']").focus();
            $("#no_proprieta").dialog("open");
        }
    });
    //Comportamento lingua originale e testo a fronte
    var titolo_o_p = $("#titolo_o");
    var tradut_p = $("#tradut");
    var testo_f_p = $("#testo_f");
    var lingua_p = $("#lingua_f");
    function nascondi() {
        titolo_o_p.hide();
        tradut_p.hide();
        lingua_p.hide();
    }
    var lingua_o_c = $("input[name=\"lingua_o\"]:checked");
    if(lingua_o_c.val() == undefined || lingua_o_c.val() === "Y") {
        nascondi();
    } else {
        titolo_o_p.show();
        titolo_o_p.find("input").removeAttr("disabled");
        tradut_p.show();
        tradut_p.find("input").removeAttr("disabled");
    }
    var lingua_o = $("input[name=\"lingua_o\"]");
    lingua_o.on("change", function(event) {
        if($(this).val() == "N") {
            titolo_o_p.find("input").removeAttr("disabled");
            tradut_p.find("input").removeAttr("disabled");
            titolo_o_p.show();
            tradut_p.show();
        } else if($(this).val() == "Y") {
            nascondi();
        }
    });
    var testo_f_i_c = testo_f_p.find("input[name='testo_f']:checked");
    if(testo_f_i_c.val() == undefined || testo_f_i_c.val() === "N") {
        lingua_p.hide();
    } else {
        lingua_p.show();
        lingua_p.find("input").removeAttr("disabled");
    }
    var testo_f_i = testo_f_p.find("input[name='testo_f']");
    testo_f_i.on("change", function(event) {
        if($(this).val() === "Y") {
            lingua_p.show();
            lingua_p.find("input").removeAttr("disabled");
        } else {
            lingua_p.hide();		
        }
    });			
    //Inserimento numero di inventario direttamente dal database nel caso si scelga come proprietà Papillon o Filo-Festival
    if($("[name=\"proprieta\"]").on("change", function(event) {
        var data;
        var check = $("input:radio[name=proprieta]:checked");
        var num_inv = $("#num_inv").eq(0);
        var url = "./include-php/content_global.php?tipo=proprieta&valore="+check.eq(0).val();
        if(check.eq(0).val() == "P" ^ check.eq(0).val() == "F") {	
            $.ajax({
                url: url,
                dataType: 'text',
                data: data,
                success: function(data) {
                    if(check.eq(0).val() == "P") {
                        num_inv.val("0"+(eval(data)+1));
                    } else if(check.eq(0).val() == "F") {
                        if(data < 1000) {
                            num_inv.val("00"+(eval(data)+1));
                        } else {
                            num_inv.val("0"+(eval(data)+1));
                        }
                    }
                    $("[name=\"dewey\"]").focus();
                }
            });
        } else if(check.eq(0).val() == "C") {
                num_inv.val("");
                num_inv.focus();
        }
    }));
    //Creazione autocomplete
    //Funzione per visualizzare il messaggio che si tratta di un nuovo elemento
    function no_risposta(data,no_ris) {
        if(data[0].value == "") {
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
  
    //Inserimento immagine errore e div contenente la spiegazione dell'errore per ciascun campo del form
    form.on("submit", function(e) {
        var invio = 1;
        var stringa;
        var div_info;
        var img;
        var error_t = "&Egrave; obbligatorio compilare questo campo.";
        var error_r = "&Egrave; obbligatorio scegliere questo campo.";		
        var campi = $(":input");
        var corto = "-14px";
        var medio = "-106px";
        var lungo = "-226px";
        var data_c_larg = "-116px";
        var costo = "-26px";
        function info_div(rif,dim,error) {
            invio = 0;
            img = rif.parent().find("img.errori");
            rif.css("border","1px solid red");
            img.show();				
            img.on("mouseover",function(event){
                rif.parent().find("div.info").hide();
                stringa = "<div class='info' style='right:"+dim+";'>"+error+"</div>";
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
        campi.filter(":text").each(function(i,v){
            $(this).parent().find("img.errori").hide();
            $(this).css("border","1px solid #000");
            if($(this).val() === "") {
                switch($(this).attr("name")){
                    case "num_inv":
                        info_div($(this),corto,error_t);
                    break;
                    case "dewey":
                        info_div($(this),corto,error_t);
                    break;
                    case "editore":
                        info_div($(this),medio,error_t);
                    break;
                    case "edizione":
                        info_div($(this),medio,error_t);
                    break;
                    case "collana":
                    break;
                    case "scaffale":
                        info_div($(this),corto,error_t);
                    break;
                    case "formato":
                        info_div($(this),corto,error_t);
                    break;
                    case "note_formato":
                    break;
                    case "pagine":
                        info_div($(this),corto,error_t);
                    break;
                    case "data_c":
                        info_div($(this),data_c_larg,error_t);
                    break;
                    case "costo":
                        info_div($(this),costo,error_t);
                    break;
                    case "isbn":
                    case "provenienza":
                    case "titolo_o":
                    case "traduttore":
                    case "lingua":
                    break;
                    case "nazione":
                        info_div($(this),medio,error_t);
                    break;	
                    default:
                        info_div($(this),lungo,error_t);
                    break;
                }
            } else if($(this).val() !== "") {
                switch($(this).attr("name")){
                    //ISBN
                    case "isbn":
                        if(new RegExp("^[0-9]{10,13}$").test($(this).val()) === false){
                            info_div($(this),corto,"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                        }
                    break;
                    //Numero inventario
                    case "num_inv":
                        if(new RegExp("^[0-9()]+$").test($(this).val()) === false){
                            info_div($(this),corto,"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                        }
                    break;
                    //Codice Dewey
                    case "dewey":
                        if(new RegExp("^[a-zA-Z0-9\. ]+$").test($(this).val()) === false){
                            info_div($(this),corto,"Hai inserito un valore non corretto.<br />Il valore da inserire pu&ograve; contenere numeri, lettere e come caratteri speciali, solo il &quot;.&quot;.");
                        }
                    break;
                    //Titolo
                    case "titolo":
                        if(new RegExp("^[!\-\.\&\'\/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27, ]+$").test($(this).val()) === false){
                            info_div($(this),lungo,"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Autore
                    case "autore":
                        if(new RegExp("^[\-\.\&\'\"0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,() ]+$").test($(this).val()) === false){
                            info_div($(this),lungo,"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Genere
                    case "genere":
                        if(new RegExp("^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ()]+$").test($(this).val()) === false){
                            info_div($(this),lungo,"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Editore
                    case "editore":
                        if(new RegExp("^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$").test($(this).val()) === false){
                            info_div($(this),medio,"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Edizione
                    case "edizione":
                        if(new RegExp("^[A-Za-z ]+[A-Za-z]+[ ]{1}[-]{1}[ ]{1}[0-9]{4}$").test($(this).val()) === false){
                            info_div($(this),medio,"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;Citt&agrave; &minus; anno&quot;.");
                        }
                    break;
                    //Collana
                    case "collana":
                        if(new RegExp("^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; !]+$").test($(this).val()) === false){
                            info_div($(this),medio,"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Scaffale
                    case "scaffale":
                        if(new RegExp("^[0-9A-Za-z ]+$").test($(this).val()) === false){
                            info_div($(this),corto,"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Formato
                    case "formato":
                        if(new RegExp("^[0-9A-Za-z, \+]+$").test($(this).val()) === false){
                            info_div($(this),corto,"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;Numero (usare la virgola se decimale) x Numero (usare la virgola se decimale)&quot;.");
                        }
                    break;
                    //Note Fromato
                    case "note_formato":
                        if(new RegExp("^[\+\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$").test($(this).val()) === false){
                            info_div($(this),lungo,"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Pagine
                    case "pagine":
                        if(new RegExp("^[0-9]+$").test($(this).val()) === false){
                            info_div($(this),corto,"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                        }
                    break;
                    //Data Catalogazione
                    case "data_c":
                        if(new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$").test($(this).val()) === false){
                            info_div($(this),data_c_larg,"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;Anno&minus;Mese&minus;Giorno&quot;.");
                        }
                    break;
                    //Costo
                    case "costo":
                        if(new RegExp("^[0-9\.]+$").test($(this).val()) === false){
                            info_div($(this),costo,"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                        }
                    break;
                    //Provenienza
                    case "provenienza":
                        if(new RegExp("^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test($(this).val()) === false){
                            info_div($(this),lungo,"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Titolo Originale
                    case "titolo_o":
                        if(new RegExp("^[\-\.\&\'\/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27, ]+$").test($(this).val()) === false){
                            info_div($(this),lungo,"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Traduttore
                    case "traduttore":
                        if(new RegExp("^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test($(this).val()) === false){
                            info_div($(this),lungo,"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Lingua
                    case "lingua":
                        if(new RegExp("^[a-zA-Z, ]+$").test($(this).val()) === false){
                            info_div($(this),medio,"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo lettere e come carattere speciale la &quot;,&quot;.");
                        }
                    break;
                    //Nazione
                    case "nazione":
                        if(new RegExp("^[A-Za-z\. ()]+$").test($(this).val()) === false){
                            info_div($(this),medio,"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo lettere e come caratteri speciali le parentesi tonde.");
                        }
                    break;
                }
            }
        });
        campi.filter(":radio").each(function(i,v){
            $(this).parent().find("img.errori").hide();
        });
        if(campi.filter("input[name='proprieta']:checked").val() == undefined) {
            info_div(campi.filter("input[name='proprieta']"),"-134px",error_r);
        }
        if(campi.filter("input[name='novita']:checked").val() == undefined) {
            info_div(campi.filter("input[name='novita']"),"28px",error_r);
        }		
        if(campi.filter("input[name='lingua_o']:checked").val() == undefined) {
            info_div(campi.filter("input[name='lingua_o']"),"28px",error_r);
        }
        if(campi.filter("input[name='testo_f']:checked").val() == undefined) {
            info_div(campi.filter("input[name='testo_f']"),"28px",error_r);
        }
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
});