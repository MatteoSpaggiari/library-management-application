    //Dichiarazione Variabili
    const hiddenErrorsServer = document.getElementById("hidden-errors");
    if(hiddenErrorsServer != null) {
        hiddenErrorsServer.addEventListener("click", function(event){
            this.parentElement.style.display = "none";
        });
    }
    
    /*
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
    
    */
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhZGRfY2F0YWxvZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgICAgLy9EaWNoaWFyYXppb25lIFZhcmlhYmlsaVxyXG4gICAgY29uc3QgaGlkZGVuRXJyb3JzU2VydmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWRkZW4tZXJyb3JzXCIpO1xyXG4gICAgaWYoaGlkZGVuRXJyb3JzU2VydmVyICE9IG51bGwpIHtcclxuICAgICAgICBoaWRkZW5FcnJvcnNTZXJ2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgdGhpcy5wYXJlbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLypcclxuICAgIHZhciBmb3JtID0gJChcIi5jYXRhbG9nYXppb25lXCIpO1xyXG4gICAgLy9Gb2N1c1xyXG4gICAgJChcImlucHV0W25hbWU9J2lzYm4nXVwiKS5lcSgwKS5mb2N1cygpO1xyXG4gICAgLy9TZXR0YWdnaW8gb3B6aW9uaSBmaW5lc3RyZSBkaSBhdnZpc29cclxuICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgICAgIGF1dG9PcGVuOiB0cnVlLFxyXG4gICAgICAgIGNsb3NlVGV4dDogXCJDaGl1ZGlcIixcclxuICAgICAgICBzaG93OiA1MDAsXHJcbiAgICAgICAgaGlkZTogNTAwLFxyXG4gICAgICAgIHRpdGxlOiBcIkF2dmlzb1wiLFxyXG4gICAgICAgIHJlc2l6YWJsZTogZmFsc2UsXHJcbiAgICAgICAgYnV0dG9uczoge1xyXG4gICAgICAgICAgICBPazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vQ3JlYXppb25lIGJveCBkaWFsb2dcclxuICAgICQoXCIjbm9fcHJvcHJpZXRhXCIpLmRpYWxvZyh7XHJcbiAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgYXV0b09wZW46IGZhbHNlLFxyXG4gICAgICAgIGNsb3NlVGV4dDogXCJDaGl1ZGlcIixcclxuICAgICAgICBzaG93OiA1MDAsXHJcbiAgICAgICAgaGlkZTogNTAwLFxyXG4gICAgICAgIHRpdGxlOiBcIkF2dmlzb1wiLFxyXG4gICAgICAgIHJlc2l6YWJsZTogZmFsc2UsXHJcbiAgICAgICAgYnV0dG9uczoge1xyXG4gICAgICAgICAgICBPazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvL0NyZWF6aW9uZSBwcmVzZW50YXppb25lIG1lbsO5XHJcbiAgICB2YXIgZGF0YV9vZGllcm5hID0gbmV3IERhdGUoKTtcclxuICAgIHZhciBhbm5vX2F0dHVhbGUgPSBkYXRhX29kaWVybmEuZ2V0RnVsbFllYXIoKTtcclxuICAgIC8vQ3JlYXppb25lIGNhbGVuZGFyaW9cclxuICAgICQoJyNkYXRhX2MnKS5kYXRlcGlja2VyKHtcclxuICAgICAgICBhbHRGaWVsZDogJyNkYXRhX2MnLFxyXG4gICAgICAgIGFsdEZvcm1hdDogXCJ5eS1tbS1kZFwiLFxyXG4gICAgICAgIGNsb3NlVGV4dCA6ICdYJyxcclxuICAgICAgICBjdXJyZW50VGV4dCA6ICdOb3cnLFxyXG4gICAgICAgIHNlbGVjdE90aGVyTW9udGhzIDogdHJ1ZSxcclxuICAgICAgICBzaG93T3RoZXJNb250aHMgOiB0cnVlLFxyXG4gICAgICAgIHNob3dXZWVrIDogdHJ1ZSxcclxuICAgICAgICB3ZWVrSGVhZGVyIDogJ1dlZWsnLFxyXG4gICAgICAgIGFwcGVuZFRleHQ6ICcoYWFhYS1tbS1nZyknLFxyXG4gICAgICAgIGJ1dHRvbkltYWdlOiAnLi9pbWFnZXMvY2FsZW5kYXJpby5wbmcnLFxyXG4gICAgICAgIGJ1dHRvbkltYWdlT25seTogdHJ1ZSxcclxuICAgICAgICBjaGFuZ2VZZWFyOiB0cnVlLFxyXG4gICAgICAgIGNoYW5nZU1vbnRoOiB0cnVlLFxyXG4gICAgICAgIGRhdGVGb3JtYXQ6ICd5eS9tbS9kZCcsXHJcbiAgICAgICAgbWluRGF0ZTogbmV3IERhdGUoMTk4MCwwLDEpLFxyXG4gICAgICAgIHllYXJSYW5nZTogXCIxOTgwOlwiK2Fubm9fYXR0dWFsZSxcclxuICAgICAgICBkZWZhdWx0RGF0ZTogZGF0YV9vZGllcm5hLFxyXG4gICAgICAgIHNob3dPbjogXCJib3RoXCJcclxuICAgIH0pO1xyXG4gICAgLy9BcGVydHVyYSBmaW5lc3RyYSBtZXNzYWdnaSBkaSBhdnZpc28gbyBlcnJvcmlcclxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwiZXJyb3JlXCIpICE9PSAtMSkge1xyXG4gICAgICAgICQoXCIjYXZ2aXNpXCIpLmRpYWxvZyhvcHRpb25zKTtcclxuICAgICAgICAkKFwiI2F2dmlzaVwiKS5kaWFsb2coXCJvcGVuXCIpO1xyXG4gICAgfVxyXG4gICAgLy9BcGVydHVyYSBmaW5lc3RyYSBtZXNzYWdnaSBkaSBlcnJvcmVcclxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwiZXJyb3JzXCIpICE9PSAtMSkge1xyXG4gICAgICAgICQoXCIjZXJyb3JzXCIpLmRpYWxvZyhvcHRpb25zKTtcclxuICAgICAgICAkKFwiI2Vycm9yc1wiKS5kaWFsb2coXCJvcGVuXCIpO1xyXG4gICAgfVxyXG4gICAgLy9TZSBzaSBjbGljY2Egc3UgbnVtZXJvIGludmVudGFyaW8gbWEgbm9uIMOoIHN0YXRhIHNjZWx0YSBsYSBwcm9wcmlldMOgIGVzY2UgdW4gYm94IGRpYWxvZyBcdFx0XHRcclxuICAgICQoXCIjbnVtX2ludlwiKS5vbihcImZvY3VzIGFjdGl2ZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciBjaGVjayA9ICQoXCJpbnB1dFtuYW1lPSdwcm9wcmlldGEnXTpjaGVja2VkXCIpLnZhbCgpO1xyXG4gICAgICAgIGlmKGNoZWNrID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAkKFwiaW5wdXRbbmFtZT0ncHJvcHJpZXRhJ11cIikuZm9jdXMoKTtcclxuICAgICAgICAgICAgJChcIiNub19wcm9wcmlldGFcIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vQ29tcG9ydGFtZW50byBsaW5ndWEgb3JpZ2luYWxlIGUgdGVzdG8gYSBmcm9udGVcclxuICAgIHZhciB0aXRvbG9fb19wID0gJChcIiN0aXRvbG9fb1wiKTtcclxuICAgIHZhciB0cmFkdXRfcCA9ICQoXCIjdHJhZHV0XCIpO1xyXG4gICAgdmFyIHRlc3RvX2ZfcCA9ICQoXCIjdGVzdG9fZlwiKTtcclxuICAgIHZhciBsaW5ndWFfcCA9ICQoXCIjbGluZ3VhX2ZcIik7XHJcbiAgICBmdW5jdGlvbiBuYXNjb25kaSgpIHtcclxuICAgICAgICB0aXRvbG9fb19wLmhpZGUoKTtcclxuICAgICAgICB0cmFkdXRfcC5oaWRlKCk7XHJcbiAgICAgICAgbGluZ3VhX3AuaGlkZSgpO1xyXG4gICAgfVxyXG4gICAgdmFyIGxpbmd1YV9vX2MgPSAkKFwiaW5wdXRbbmFtZT1cXFwibGluZ3VhX29cXFwiXTpjaGVja2VkXCIpO1xyXG4gICAgaWYobGluZ3VhX29fYy52YWwoKSA9PSB1bmRlZmluZWQgfHwgbGluZ3VhX29fYy52YWwoKSA9PT0gXCJZXCIpIHtcclxuICAgICAgICBuYXNjb25kaSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB0aXRvbG9fb19wLnNob3coKTtcclxuICAgICAgICB0aXRvbG9fb19wLmZpbmQoXCJpbnB1dFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgdHJhZHV0X3Auc2hvdygpO1xyXG4gICAgICAgIHRyYWR1dF9wLmZpbmQoXCJpbnB1dFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICB9XHJcbiAgICB2YXIgbGluZ3VhX28gPSAkKFwiaW5wdXRbbmFtZT1cXFwibGluZ3VhX29cXFwiXVwiKTtcclxuICAgIGxpbmd1YV9vLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgaWYoJCh0aGlzKS52YWwoKSA9PSBcIk5cIikge1xyXG4gICAgICAgICAgICB0aXRvbG9fb19wLmZpbmQoXCJpbnB1dFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIHRyYWR1dF9wLmZpbmQoXCJpbnB1dFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgICAgIHRpdG9sb19vX3Auc2hvdygpO1xyXG4gICAgICAgICAgICB0cmFkdXRfcC5zaG93KCk7XHJcbiAgICAgICAgfSBlbHNlIGlmKCQodGhpcykudmFsKCkgPT0gXCJZXCIpIHtcclxuICAgICAgICAgICAgbmFzY29uZGkoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHZhciB0ZXN0b19mX2lfYyA9IHRlc3RvX2ZfcC5maW5kKFwiaW5wdXRbbmFtZT0ndGVzdG9fZiddOmNoZWNrZWRcIik7XHJcbiAgICBpZih0ZXN0b19mX2lfYy52YWwoKSA9PSB1bmRlZmluZWQgfHwgdGVzdG9fZl9pX2MudmFsKCkgPT09IFwiTlwiKSB7XHJcbiAgICAgICAgbGluZ3VhX3AuaGlkZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBsaW5ndWFfcC5zaG93KCk7XHJcbiAgICAgICAgbGluZ3VhX3AuZmluZChcImlucHV0XCIpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcclxuICAgIH1cclxuICAgIHZhciB0ZXN0b19mX2kgPSB0ZXN0b19mX3AuZmluZChcImlucHV0W25hbWU9J3Rlc3RvX2YnXVwiKTtcclxuICAgIHRlc3RvX2ZfaS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGlmKCQodGhpcykudmFsKCkgPT09IFwiWVwiKSB7XHJcbiAgICAgICAgICAgIGxpbmd1YV9wLnNob3coKTtcclxuICAgICAgICAgICAgbGluZ3VhX3AuZmluZChcImlucHV0XCIpLnJlbW92ZUF0dHIoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsaW5ndWFfcC5oaWRlKCk7XHRcdFxyXG4gICAgICAgIH1cclxuICAgIH0pO1x0XHRcdFxyXG4gICAgLy9JbnNlcmltZW50byBudW1lcm8gZGkgaW52ZW50YXJpbyBkaXJldHRhbWVudGUgZGFsIGRhdGFiYXNlIG5lbCBjYXNvIHNpIHNjZWxnYSBjb21lIHByb3ByaWV0w6AgUGFwaWxsb24gbyBGaWxvLUZlc3RpdmFsXHJcbiAgICBpZigkKFwiW25hbWU9XFxcInByb3ByaWV0YVxcXCJdXCIpLm9uKFwiY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIGRhdGE7XHJcbiAgICAgICAgdmFyIGNoZWNrID0gJChcImlucHV0OnJhZGlvW25hbWU9cHJvcHJpZXRhXTpjaGVja2VkXCIpO1xyXG4gICAgICAgIHZhciBudW1faW52ID0gJChcIiNudW1faW52XCIpLmVxKDApO1xyXG4gICAgICAgIHZhciB1cmwgPSBcIi4vaW5jbHVkZS1waHAvY29udGVudF9nbG9iYWwucGhwP3RpcG89cHJvcHJpZXRhJnZhbG9yZT1cIitjaGVjay5lcSgwKS52YWwoKTtcclxuICAgICAgICBpZihjaGVjay5lcSgwKS52YWwoKSA9PSBcIlBcIiBeIGNoZWNrLmVxKDApLnZhbCgpID09IFwiRlwiKSB7XHRcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoY2hlY2suZXEoMCkudmFsKCkgPT0gXCJQXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbnVtX2ludi52YWwoXCIwXCIrKGV2YWwoZGF0YSkrMSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihjaGVjay5lcSgwKS52YWwoKSA9PSBcIkZcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkYXRhIDwgMTAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtX2ludi52YWwoXCIwMFwiKyhldmFsKGRhdGEpKzEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bV9pbnYudmFsKFwiMFwiKyhldmFsKGRhdGEpKzEpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkKFwiW25hbWU9XFxcImRld2V5XFxcIl1cIikuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmKGNoZWNrLmVxKDApLnZhbCgpID09IFwiQ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBudW1faW52LnZhbChcIlwiKTtcclxuICAgICAgICAgICAgICAgIG51bV9pbnYuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICAvL0NyZWF6aW9uZSBhdXRvY29tcGxldGVcclxuICAgIC8vRnVuemlvbmUgcGVyIHZpc3VhbGl6emFyZSBpbCBtZXNzYWdnaW8gY2hlIHNpIHRyYXR0YSBkaSB1biBudW92byBlbGVtZW50b1xyXG4gICAgZnVuY3Rpb24gbm9fcmlzcG9zdGEoZGF0YSxub19yaXMpIHtcclxuICAgICAgICBpZihkYXRhWzBdLnZhbHVlID09IFwiXCIpIHtcclxuICAgICAgICAgICAgbm9fcmlzLnNob3coKTtcclxuICAgICAgICAgICAgbm9fcmlzLmh0bWwoXCJOZXNzdW5vXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIHVybCA9IFwiLi9pbmNsdWRlLXBocC9jb250ZW50X2dsb2JhbC5waHA/dGlwbz1cIjtcclxuICAgICQoXCIjZGV3ZXlcIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNkZXdleV9ub19yaXNcIikuZXEoMCk7XHJcbiAgICAgICAgbm9fcmlzLmNzcyhcIm1hcmdpbi1sZWZ0XCIsXCIzNTZweFwiKTtcclxuICAgICAgICAkKHRoaXMpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIHNvdXJjZTogdXJsK1wiZGV3ZXkmdmFsb3JlPVwiK3ZhbG9yZSxcclxuICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWxheTogMzAwLFxyXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgICAgICAgbm9fcmlzcG9zdGEodWkuY29udGVudCxub19yaXMpO1x0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih2YWxvcmUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKFwiI2F1dG9yZVwiKS5vbihcImtleXVwIGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgIHZhciBub19yaXMgPSAkKFwiI2F1dG9yZV9ub19yaXNcIikuZXEoMCk7XHJcbiAgICAgICAgbm9fcmlzLmNzcyhcIm1hcmdpbi1sZWZ0XCIsXCI1NjdweFwiKTtcclxuICAgICAgICAkKHRoaXMpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIHNvdXJjZTogdXJsK1wiYXV0b3JlJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodmFsb3JlID09PSAnJykge1xyXG4gICAgICAgICAgICBub19yaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChcIiNnZW5lcmVcIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNnZW5lcmVfbm9fcmlzXCIpLmVxKDApO1xyXG4gICAgICAgIG5vX3Jpcy5jc3MoXCJtYXJnaW4tbGVmdFwiLFwiNTY3cHhcIik7XHJcbiAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHVybCtcImdlbmVyZSZ2YWxvcmU9XCIrdmFsb3JlLFxyXG4gICAgICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgICAgICAgIGRlbGF5OiAzMDAsXHJcbiAgICAgICAgICAgIG1pbkxlbmd0aDogMixcclxuICAgICAgICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHJcbiAgICAgICAgICAgICAgICBub19yaXNwb3N0YSh1aS5jb250ZW50LG5vX3Jpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih2YWxvcmUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKFwiI2VkaXRvcmVcIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNlZGl0b3JlX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICBub19yaXMuY3NzKFwibWFyZ2luLWxlZnRcIixcIjU2N3B4XCIpO1xyXG4gICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgc291cmNlOiB1cmwrXCJlZGl0b3JlJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHZhbG9yZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgbm9fcmlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoXCIjY29sbGFuYVwiKS5vbihcImtleXVwIGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgIHZhciBub19yaXMgPSAkKFwiI2NvbGxhbmFfbm9fcmlzXCIpLmVxKDApO1xyXG4gICAgICAgIG5vX3Jpcy5jc3MoXCJtYXJnaW4tbGVmdFwiLFwiNTY3cHhcIik7XHJcbiAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHVybCtcImNvbGxhbmEmdmFsb3JlPVwiK3ZhbG9yZSxcclxuICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWxheTogMzAwLFxyXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgICAgICAgbm9fcmlzcG9zdGEodWkuY29udGVudCxub19yaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodmFsb3JlID09PSAnJykge1xyXG4gICAgICAgICAgICBub19yaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChcIiNzY2FmZmFsZVwiKS5vbihcImtleXVwIGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgIHZhciBub19yaXMgPSAkKFwiI3NjYWZmYWxlX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICBub19yaXMuY3NzKFwibWFyZ2luLWxlZnRcIixcIjMzNnB4XCIpO1xyXG4gICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgc291cmNlOiB1cmwrXCJzY2FmZmFsZSZ2YWxvcmU9XCIrdmFsb3JlLFxyXG4gICAgICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgICAgICAgIGRlbGF5OiAzMDAsXHJcbiAgICAgICAgICAgIG1pbkxlbmd0aDogMSxcclxuICAgICAgICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHJcbiAgICAgICAgICAgICAgICBub19yaXNwb3N0YSh1aS5jb250ZW50LG5vX3Jpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih2YWxvcmUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKFwiI2Zvcm1hdG9cIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNmb3JtYXRvX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICBub19yaXMuY3NzKFwibWFyZ2luLWxlZnRcIixcIjMzNnB4XCIpO1xyXG4gICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgc291cmNlOiB1cmwrXCJmb3JtYXRvJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHZhbG9yZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgbm9fcmlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoXCIjbmF6aW9uZVwiKS5vbihcImtleXVwIGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgIHZhciBub19yaXMgPSAkKFwiI25hemlvbmVfbm9fcmlzXCIpLmVxKDApO1xyXG4gICAgICAgIG5vX3Jpcy5jc3MoXCJtYXJnaW4tbGVmdFwiLFwiNTY3cHhcIik7XHJcbiAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHVybCtcIm5hemlvbmUmdmFsb3JlPVwiK3ZhbG9yZSxcclxuICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWxheTogMzAwLFxyXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgICAgICAgbm9fcmlzcG9zdGEodWkuY29udGVudCxub19yaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodmFsb3JlID09PSAnJykge1xyXG4gICAgICAgICAgICBub19yaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gIFxyXG4gICAgLy9JbnNlcmltZW50byBpbW1hZ2luZSBlcnJvcmUgZSBkaXYgY29udGVuZW50ZSBsYSBzcGllZ2F6aW9uZSBkZWxsJ2Vycm9yZSBwZXIgY2lhc2N1biBjYW1wbyBkZWwgZm9ybVxyXG4gICAgZm9ybS5vbihcInN1Ym1pdFwiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGludmlvID0gMTtcclxuICAgICAgICB2YXIgc3RyaW5nYTtcclxuICAgICAgICB2YXIgZGl2X2luZm87XHJcbiAgICAgICAgdmFyIGltZztcclxuICAgICAgICB2YXIgZXJyb3JfdCA9IFwiJkVncmF2ZTsgb2JibGlnYXRvcmlvIGNvbXBpbGFyZSBxdWVzdG8gY2FtcG8uXCI7XHJcbiAgICAgICAgdmFyIGVycm9yX3IgPSBcIiZFZ3JhdmU7IG9iYmxpZ2F0b3JpbyBzY2VnbGllcmUgcXVlc3RvIGNhbXBvLlwiO1x0XHRcclxuICAgICAgICB2YXIgY2FtcGkgPSAkKFwiOmlucHV0XCIpO1xyXG4gICAgICAgIHZhciBjb3J0byA9IFwiLTE0cHhcIjtcclxuICAgICAgICB2YXIgbWVkaW8gPSBcIi0xMDZweFwiO1xyXG4gICAgICAgIHZhciBsdW5nbyA9IFwiLTIyNnB4XCI7XHJcbiAgICAgICAgdmFyIGRhdGFfY19sYXJnID0gXCItMTE2cHhcIjtcclxuICAgICAgICB2YXIgY29zdG8gPSBcIi0yNnB4XCI7XHJcbiAgICAgICAgZnVuY3Rpb24gaW5mb19kaXYocmlmLGRpbSxlcnJvcikge1xyXG4gICAgICAgICAgICBpbnZpbyA9IDA7XHJcbiAgICAgICAgICAgIGltZyA9IHJpZi5wYXJlbnQoKS5maW5kKFwiaW1nLmVycm9yaVwiKTtcclxuICAgICAgICAgICAgcmlmLmNzcyhcImJvcmRlclwiLFwiMXB4IHNvbGlkIHJlZFwiKTtcclxuICAgICAgICAgICAgaW1nLnNob3coKTtcdFx0XHRcdFxyXG4gICAgICAgICAgICBpbWcub24oXCJtb3VzZW92ZXJcIixmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICByaWYucGFyZW50KCkuZmluZChcImRpdi5pbmZvXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIHN0cmluZ2EgPSBcIjxkaXYgY2xhc3M9J2luZm8nIHN0eWxlPSdyaWdodDpcIitkaW0rXCI7Jz5cIitlcnJvcitcIjwvZGl2PlwiO1xyXG4gICAgICAgICAgICAgICAgZGl2X2luZm8gPSAkKHN0cmluZ2EpO1xyXG4gICAgICAgICAgICAgICAgZGl2X2luZm8uaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgZGl2X2luZm8uZmFkZUluKDUwMCk7XHJcbiAgICAgICAgICAgICAgICByaWYucGFyZW50KCkuYXBwZW5kKGRpdl9pbmZvKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGltZy5vbihcIm1vdXNlb3V0XCIsZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuaW5mb1wiKS5oaWRlKDQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGl2X2luZm8uaGlkZSg0MDApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FtcGkuZmlsdGVyKFwiOnRleHRcIikuZWFjaChmdW5jdGlvbihpLHYpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJpbWcuZXJyb3JpXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoXCJib3JkZXJcIixcIjFweCBzb2xpZCAjMDAwXCIpO1xyXG4gICAgICAgICAgICBpZigkKHRoaXMpLnZhbCgpID09PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2goJCh0aGlzKS5hdHRyKFwibmFtZVwiKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm51bV9pbnZcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGV3ZXlcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZWRpdG9yZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLG1lZGlvLGVycm9yX3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlZGl6aW9uZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLG1lZGlvLGVycm9yX3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsYW5hXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNjYWZmYWxlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksY29ydG8sZXJyb3JfdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZvcm1hdG9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibm90ZV9mb3JtYXRvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInBhZ2luZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGNvcnRvLGVycm9yX3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYXRhX2NcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxkYXRhX2NfbGFyZyxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29zdG9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3N0byxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaXNiblwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwcm92ZW5pZW56YVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0aXRvbG9fb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFkdXR0b3JlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxpbmd1YVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJuYXppb25lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksbWVkaW8sZXJyb3JfdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHRcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGx1bmdvLGVycm9yX3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYoJCh0aGlzKS52YWwoKSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoKCQodGhpcykuYXR0cihcIm5hbWVcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vSVNCTlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpc2JuXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeWzAtOV17MTAsMTN9JFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGNvcnRvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgY29udGVuZXJlIHNvbG8gbnVtZXJpLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vTnVtZXJvIGludmVudGFyaW9cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibnVtX2ludlwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTkoKV0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGNvcnRvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgY29udGVuZXJlIHNvbG8gbnVtZXJpLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29kaWNlIERld2V5XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRld2V5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeW2EtekEtWjAtOVxcLiBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBwdSZvZ3JhdmU7IGNvbnRlbmVyZSBudW1lcmksIGxldHRlcmUgZSBjb21lIGNhcmF0dGVyaSBzcGVjaWFsaSwgc29sbyBpbCAmcXVvdDsuJnF1b3Q7LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGl0b2xvXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRpdG9sb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlshXFwtXFwuXFwmXFwnXFwvMC05YS16QS1aXFx4RTBcXHhFOFxceEU5XFx4RjlcXHhGMlxceEVDXFx4MjcsIF0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGx1bmdvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9BdXRvcmVcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXV0b3JlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeW1xcLVxcLlxcJlxcJ1xcXCIwLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNywoKSBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxsdW5nbyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vR2VuZXJlXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImdlbmVyZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXC5cXCZcXCcwLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyw7ICgpXSskXCIpLnRlc3QoJCh0aGlzKS52YWwoKSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksbHVuZ28sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL0VkaXRvcmVcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZWRpdG9yZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXC5cXCZcXCcwLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyw7IF0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLG1lZGlvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9FZGl6aW9uZVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlZGl6aW9uZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltBLVphLXogXStbQS1aYS16XStbIF17MX1bLV17MX1bIF17MX1bMC05XXs0fSRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxtZWRpbyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGVzc2VyZSBzY3JpdHRvIGluIHF1ZXN0YSBmb3JtYSAmcXVvdDtDaXR0JmFncmF2ZTsgJm1pbnVzOyBhbm5vJnF1b3Q7LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29sbGFuYVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsYW5hXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeW1xcLVxcLlxcJlxcJzAtOWEtekEtWlxceEUwXFx4RThcXHhFOVxceEY5XFx4RjJcXHhFQ1xceDI3LDsgIV0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLG1lZGlvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9TY2FmZmFsZVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzY2FmZmFsZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTlBLVphLXogXSskXCIpLnRlc3QoJCh0aGlzKS52YWwoKSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksY29ydG8sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL0Zvcm1hdG9cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZm9ybWF0b1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTlBLVphLXosIFxcK10rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGNvcnRvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgZXNzZXJlIHNjcml0dG8gaW4gcXVlc3RhIGZvcm1hICZxdW90O051bWVybyAodXNhcmUgbGEgdmlyZ29sYSBzZSBkZWNpbWFsZSkgeCBOdW1lcm8gKHVzYXJlIGxhIHZpcmdvbGEgc2UgZGVjaW1hbGUpJnF1b3Q7LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vTm90ZSBGcm9tYXRvXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5vdGVfZm9ybWF0b1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXCtcXC1cXC5cXCZcXCcwLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyw7IF0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGx1bmdvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9QYWdpbmVcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicGFnaW5lXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeWzAtOV0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGNvcnRvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgY29udGVuZXJlIHNvbG8gbnVtZXJpLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vRGF0YSBDYXRhbG9nYXppb25lXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRhdGFfY1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTldezR9LVswLTldezJ9LVswLTldezJ9JFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGRhdGFfY19sYXJnLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgZXNzZXJlIHNjcml0dG8gaW4gcXVlc3RhIGZvcm1hICZxdW90O0Fubm8mbWludXM7TWVzZSZtaW51cztHaW9ybm8mcXVvdDsuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Db3N0b1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb3N0b1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTlcXC5dKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3N0byxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGNvbnRlbmVyZSBzb2xvIG51bWVyaS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL1Byb3ZlbmllbnphXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInByb3ZlbmllbnphXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeW1xcLVxcLlxcJlxcJzAtOWEtekEtWlxceEUwXFx4RThcXHhFOVxceEY5XFx4RjJcXHhFQ1xceDI3IF0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGx1bmdvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9UaXRvbG8gT3JpZ2luYWxlXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRpdG9sb19vXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeW1xcLVxcLlxcJlxcJ1xcLzAtOWEtekEtWlxceEUwXFx4RThcXHhFOVxceEY5XFx4RjJcXHhFQ1xceDI3LCBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxsdW5nbyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVHJhZHV0dG9yZVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFkdXR0b3JlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeW1xcLVxcLlxcJlxcJzAtOWEtekEtWlxceEUwXFx4RThcXHhFOVxceEY5XFx4RjJcXHhFQ1xceDI3IF0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGx1bmdvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9MaW5ndWFcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibGluZ3VhXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeW2EtekEtWiwgXSskXCIpLnRlc3QoJCh0aGlzKS52YWwoKSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksbWVkaW8sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBjb250ZW5lcmUgc29sbyBsZXR0ZXJlIGUgY29tZSBjYXJhdHRlcmUgc3BlY2lhbGUgbGEgJnF1b3Q7LCZxdW90Oy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL05hemlvbmVcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibmF6aW9uZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltBLVphLXpcXC4gKCldKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxtZWRpbyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGNvbnRlbmVyZSBzb2xvIGxldHRlcmUgZSBjb21lIGNhcmF0dGVyaSBzcGVjaWFsaSBsZSBwYXJlbnRlc2kgdG9uZGUuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBjYW1waS5maWx0ZXIoXCI6cmFkaW9cIikuZWFjaChmdW5jdGlvbihpLHYpe1xyXG4gICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJpbWcuZXJyb3JpXCIpLmhpZGUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihjYW1waS5maWx0ZXIoXCJpbnB1dFtuYW1lPSdwcm9wcmlldGEnXTpjaGVja2VkXCIpLnZhbCgpID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpbmZvX2RpdihjYW1waS5maWx0ZXIoXCJpbnB1dFtuYW1lPSdwcm9wcmlldGEnXVwiKSxcIi0xMzRweFwiLGVycm9yX3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihjYW1waS5maWx0ZXIoXCJpbnB1dFtuYW1lPSdub3ZpdGEnXTpjaGVja2VkXCIpLnZhbCgpID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpbmZvX2RpdihjYW1waS5maWx0ZXIoXCJpbnB1dFtuYW1lPSdub3ZpdGEnXVwiKSxcIjI4cHhcIixlcnJvcl9yKTtcclxuICAgICAgICB9XHRcdFxyXG4gICAgICAgIGlmKGNhbXBpLmZpbHRlcihcImlucHV0W25hbWU9J2xpbmd1YV9vJ106Y2hlY2tlZFwiKS52YWwoKSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaW5mb19kaXYoY2FtcGkuZmlsdGVyKFwiaW5wdXRbbmFtZT0nbGluZ3VhX28nXVwiKSxcIjI4cHhcIixlcnJvcl9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY2FtcGkuZmlsdGVyKFwiaW5wdXRbbmFtZT0ndGVzdG9fZiddOmNoZWNrZWRcIikudmFsKCkgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGluZm9fZGl2KGNhbXBpLmZpbHRlcihcImlucHV0W25hbWU9J3Rlc3RvX2YnXVwiKSxcIjI4cHhcIixlcnJvcl9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW52aW8gPT09IDApe1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICQoXCIjZXJyb3JpXCIpLmRpYWxvZyhvcHRpb25zKTtcclxuICAgICAgICAgICAgJChcIiNlcnJvcmlcIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGZvcm0ub24oJ2tleWRvd24nLGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBpZihldmVudC5rZXlDb2RlID09PSAxMykge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAqLyJdLCJmaWxlIjoiYWRkX2NhdGFsb2cuanMifQ==
