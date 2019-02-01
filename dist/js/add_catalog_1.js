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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhZGRfY2F0YWxvZ18xLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgZm9ybSA9ICQoXCIuY2F0YWxvZ2F6aW9uZVwiKTtcclxuICAgIC8vRm9jdXNcclxuICAgICQoXCJpbnB1dFtuYW1lPSdpc2JuJ11cIikuZXEoMCkuZm9jdXMoKTtcclxuICAgIC8vU2V0dGFnZ2lvIG9wemlvbmkgZmluZXN0cmUgZGkgYXZ2aXNvXHJcbiAgICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICBhdXRvT3BlbjogdHJ1ZSxcclxuICAgICAgICBjbG9zZVRleHQ6IFwiQ2hpdWRpXCIsXHJcbiAgICAgICAgc2hvdzogNTAwLFxyXG4gICAgICAgIGhpZGU6IDUwMCxcclxuICAgICAgICB0aXRsZTogXCJBdnZpc29cIixcclxuICAgICAgICByZXNpemFibGU6IGZhbHNlLFxyXG4gICAgICAgIGJ1dHRvbnM6IHtcclxuICAgICAgICAgICAgT2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICAvL0NyZWF6aW9uZSBib3ggZGlhbG9nXHJcbiAgICAkKFwiI25vX3Byb3ByaWV0YVwiKS5kaWFsb2coe1xyXG4gICAgICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgICAgIGF1dG9PcGVuOiBmYWxzZSxcclxuICAgICAgICBjbG9zZVRleHQ6IFwiQ2hpdWRpXCIsXHJcbiAgICAgICAgc2hvdzogNTAwLFxyXG4gICAgICAgIGhpZGU6IDUwMCxcclxuICAgICAgICB0aXRsZTogXCJBdnZpc29cIixcclxuICAgICAgICByZXNpemFibGU6IGZhbHNlLFxyXG4gICAgICAgIGJ1dHRvbnM6IHtcclxuICAgICAgICAgICAgT2s6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5kaWFsb2coXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy9DcmVhemlvbmUgcHJlc2VudGF6aW9uZSBtZW7DuVxyXG4gICAgdmFyIGRhdGFfb2RpZXJuYSA9IG5ldyBEYXRlKCk7XHJcbiAgICB2YXIgYW5ub19hdHR1YWxlID0gZGF0YV9vZGllcm5hLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAvL0NyZWF6aW9uZSBjYWxlbmRhcmlvXHJcbiAgICAkKCcjZGF0YV9jJykuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgYWx0RmllbGQ6ICcjZGF0YV9jJyxcclxuICAgICAgICBhbHRGb3JtYXQ6IFwieXktbW0tZGRcIixcclxuICAgICAgICBjbG9zZVRleHQgOiAnWCcsXHJcbiAgICAgICAgY3VycmVudFRleHQgOiAnTm93JyxcclxuICAgICAgICBzZWxlY3RPdGhlck1vbnRocyA6IHRydWUsXHJcbiAgICAgICAgc2hvd090aGVyTW9udGhzIDogdHJ1ZSxcclxuICAgICAgICBzaG93V2VlayA6IHRydWUsXHJcbiAgICAgICAgd2Vla0hlYWRlciA6ICdXZWVrJyxcclxuICAgICAgICBhcHBlbmRUZXh0OiAnKGFhYWEtbW0tZ2cpJyxcclxuICAgICAgICBidXR0b25JbWFnZTogJy4vaW1hZ2VzL2NhbGVuZGFyaW8ucG5nJyxcclxuICAgICAgICBidXR0b25JbWFnZU9ubHk6IHRydWUsXHJcbiAgICAgICAgY2hhbmdlWWVhcjogdHJ1ZSxcclxuICAgICAgICBjaGFuZ2VNb250aDogdHJ1ZSxcclxuICAgICAgICBkYXRlRm9ybWF0OiAneXkvbW0vZGQnLFxyXG4gICAgICAgIG1pbkRhdGU6IG5ldyBEYXRlKDE5ODAsMCwxKSxcclxuICAgICAgICB5ZWFyUmFuZ2U6IFwiMTk4MDpcIithbm5vX2F0dHVhbGUsXHJcbiAgICAgICAgZGVmYXVsdERhdGU6IGRhdGFfb2RpZXJuYSxcclxuICAgICAgICBzaG93T246IFwiYm90aFwiXHJcbiAgICB9KTtcclxuICAgIC8vQXBlcnR1cmEgZmluZXN0cmEgbWVzc2FnZ2kgZGkgYXZ2aXNvIG8gZXJyb3JpXHJcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImVycm9yZVwiKSAhPT0gLTEpIHtcclxuICAgICAgICAkKFwiI2F2dmlzaVwiKS5kaWFsb2cob3B0aW9ucyk7XHJcbiAgICAgICAgJChcIiNhdnZpc2lcIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgIH1cclxuICAgIC8vQXBlcnR1cmEgZmluZXN0cmEgbWVzc2FnZ2kgZGkgZXJyb3JlXHJcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImVycm9yc1wiKSAhPT0gLTEpIHtcclxuICAgICAgICAkKFwiI2Vycm9yc1wiKS5kaWFsb2cob3B0aW9ucyk7XHJcbiAgICAgICAgJChcIiNlcnJvcnNcIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgIH1cclxuICAgIC8vU2Ugc2kgY2xpY2NhIHN1IG51bWVybyBpbnZlbnRhcmlvIG1hIG5vbiDDqCBzdGF0YSBzY2VsdGEgbGEgcHJvcHJpZXTDoCBlc2NlIHVuIGJveCBkaWFsb2cgXHRcdFx0XHJcbiAgICAkKFwiI251bV9pbnZcIikub24oXCJmb2N1cyBhY3RpdmVcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgY2hlY2sgPSAkKFwiaW5wdXRbbmFtZT0ncHJvcHJpZXRhJ106Y2hlY2tlZFwiKS52YWwoKTtcclxuICAgICAgICBpZihjaGVjayA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgJChcImlucHV0W25hbWU9J3Byb3ByaWV0YSddXCIpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICQoXCIjbm9fcHJvcHJpZXRhXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvL0NvbXBvcnRhbWVudG8gbGluZ3VhIG9yaWdpbmFsZSBlIHRlc3RvIGEgZnJvbnRlXHJcbiAgICB2YXIgdGl0b2xvX29fcCA9ICQoXCIjdGl0b2xvX29cIik7XHJcbiAgICB2YXIgdHJhZHV0X3AgPSAkKFwiI3RyYWR1dFwiKTtcclxuICAgIHZhciB0ZXN0b19mX3AgPSAkKFwiI3Rlc3RvX2ZcIik7XHJcbiAgICB2YXIgbGluZ3VhX3AgPSAkKFwiI2xpbmd1YV9mXCIpO1xyXG4gICAgZnVuY3Rpb24gbmFzY29uZGkoKSB7XHJcbiAgICAgICAgdGl0b2xvX29fcC5oaWRlKCk7XHJcbiAgICAgICAgdHJhZHV0X3AuaGlkZSgpO1xyXG4gICAgICAgIGxpbmd1YV9wLmhpZGUoKTtcclxuICAgIH1cclxuICAgIHZhciBsaW5ndWFfb19jID0gJChcImlucHV0W25hbWU9XFxcImxpbmd1YV9vXFxcIl06Y2hlY2tlZFwiKTtcclxuICAgIGlmKGxpbmd1YV9vX2MudmFsKCkgPT0gdW5kZWZpbmVkIHx8IGxpbmd1YV9vX2MudmFsKCkgPT09IFwiWVwiKSB7XHJcbiAgICAgICAgbmFzY29uZGkoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGl0b2xvX29fcC5zaG93KCk7XHJcbiAgICAgICAgdGl0b2xvX29fcC5maW5kKFwiaW5wdXRcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIHRyYWR1dF9wLnNob3coKTtcclxuICAgICAgICB0cmFkdXRfcC5maW5kKFwiaW5wdXRcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgfVxyXG4gICAgdmFyIGxpbmd1YV9vID0gJChcImlucHV0W25hbWU9XFxcImxpbmd1YV9vXFxcIl1cIik7XHJcbiAgICBsaW5ndWFfby5vbihcImNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIGlmKCQodGhpcykudmFsKCkgPT0gXCJOXCIpIHtcclxuICAgICAgICAgICAgdGl0b2xvX29fcC5maW5kKFwiaW5wdXRcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICB0cmFkdXRfcC5maW5kKFwiaW5wdXRcIikucmVtb3ZlQXR0cihcImRpc2FibGVkXCIpO1xyXG4gICAgICAgICAgICB0aXRvbG9fb19wLnNob3coKTtcclxuICAgICAgICAgICAgdHJhZHV0X3Auc2hvdygpO1xyXG4gICAgICAgIH0gZWxzZSBpZigkKHRoaXMpLnZhbCgpID09IFwiWVwiKSB7XHJcbiAgICAgICAgICAgIG5hc2NvbmRpKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2YXIgdGVzdG9fZl9pX2MgPSB0ZXN0b19mX3AuZmluZChcImlucHV0W25hbWU9J3Rlc3RvX2YnXTpjaGVja2VkXCIpO1xyXG4gICAgaWYodGVzdG9fZl9pX2MudmFsKCkgPT0gdW5kZWZpbmVkIHx8IHRlc3RvX2ZfaV9jLnZhbCgpID09PSBcIk5cIikge1xyXG4gICAgICAgIGxpbmd1YV9wLmhpZGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbGluZ3VhX3Auc2hvdygpO1xyXG4gICAgICAgIGxpbmd1YV9wLmZpbmQoXCJpbnB1dFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICB9XHJcbiAgICB2YXIgdGVzdG9fZl9pID0gdGVzdG9fZl9wLmZpbmQoXCJpbnB1dFtuYW1lPSd0ZXN0b19mJ11cIik7XHJcbiAgICB0ZXN0b19mX2kub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICBpZigkKHRoaXMpLnZhbCgpID09PSBcIllcIikge1xyXG4gICAgICAgICAgICBsaW5ndWFfcC5zaG93KCk7XHJcbiAgICAgICAgICAgIGxpbmd1YV9wLmZpbmQoXCJpbnB1dFwiKS5yZW1vdmVBdHRyKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGluZ3VhX3AuaGlkZSgpO1x0XHRcclxuICAgICAgICB9XHJcbiAgICB9KTtcdFx0XHRcclxuICAgIC8vSW5zZXJpbWVudG8gbnVtZXJvIGRpIGludmVudGFyaW8gZGlyZXR0YW1lbnRlIGRhbCBkYXRhYmFzZSBuZWwgY2FzbyBzaSBzY2VsZ2EgY29tZSBwcm9wcmlldMOgIFBhcGlsbG9uIG8gRmlsby1GZXN0aXZhbFxyXG4gICAgaWYoJChcIltuYW1lPVxcXCJwcm9wcmlldGFcXFwiXVwiKS5vbihcImNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciBkYXRhO1xyXG4gICAgICAgIHZhciBjaGVjayA9ICQoXCJpbnB1dDpyYWRpb1tuYW1lPXByb3ByaWV0YV06Y2hlY2tlZFwiKTtcclxuICAgICAgICB2YXIgbnVtX2ludiA9ICQoXCIjbnVtX2ludlwiKS5lcSgwKTtcclxuICAgICAgICB2YXIgdXJsID0gXCIuL2luY2x1ZGUtcGhwL2NvbnRlbnRfZ2xvYmFsLnBocD90aXBvPXByb3ByaWV0YSZ2YWxvcmU9XCIrY2hlY2suZXEoMCkudmFsKCk7XHJcbiAgICAgICAgaWYoY2hlY2suZXEoMCkudmFsKCkgPT0gXCJQXCIgXiBjaGVjay5lcSgwKS52YWwoKSA9PSBcIkZcIikge1x0XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGNoZWNrLmVxKDApLnZhbCgpID09IFwiUFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bV9pbnYudmFsKFwiMFwiKyhldmFsKGRhdGEpKzEpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoY2hlY2suZXEoMCkudmFsKCkgPT0gXCJGXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSA8IDEwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bV9pbnYudmFsKFwiMDBcIisoZXZhbChkYXRhKSsxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1faW52LnZhbChcIjBcIisoZXZhbChkYXRhKSsxKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIltuYW1lPVxcXCJkZXdleVxcXCJdXCIpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZihjaGVjay5lcSgwKS52YWwoKSA9PSBcIkNcIikge1xyXG4gICAgICAgICAgICAgICAgbnVtX2ludi52YWwoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBudW1faW52LmZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSkpO1xyXG4gICAgLy9DcmVhemlvbmUgYXV0b2NvbXBsZXRlXHJcbiAgICAvL0Z1bnppb25lIHBlciB2aXN1YWxpenphcmUgaWwgbWVzc2FnZ2lvIGNoZSBzaSB0cmF0dGEgZGkgdW4gbnVvdm8gZWxlbWVudG9cclxuICAgIGZ1bmN0aW9uIG5vX3Jpc3Bvc3RhKGRhdGEsbm9fcmlzKSB7XHJcbiAgICAgICAgaWYoZGF0YVswXS52YWx1ZSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5zaG93KCk7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5odG1sKFwiTmVzc3Vub1wiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBub19yaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHZhciB1cmwgPSBcIi4vaW5jbHVkZS1waHAvY29udGVudF9nbG9iYWwucGhwP3RpcG89XCI7XHJcbiAgICAkKFwiI2Rld2V5XCIpLm9uKFwia2V5dXAgY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHZhbG9yZSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgdmFyIG5vX3JpcyA9ICQoXCIjZGV3ZXlfbm9fcmlzXCIpLmVxKDApO1xyXG4gICAgICAgIG5vX3Jpcy5jc3MoXCJtYXJnaW4tbGVmdFwiLFwiMzU2cHhcIik7XHJcbiAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHVybCtcImRld2V5JnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodmFsb3JlID09PSAnJykge1xyXG4gICAgICAgICAgICBub19yaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChcIiNhdXRvcmVcIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNhdXRvcmVfbm9fcmlzXCIpLmVxKDApO1xyXG4gICAgICAgIG5vX3Jpcy5jc3MoXCJtYXJnaW4tbGVmdFwiLFwiNTY3cHhcIik7XHJcbiAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHVybCtcImF1dG9yZSZ2YWxvcmU9XCIrdmFsb3JlLFxyXG4gICAgICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgICAgICAgIGRlbGF5OiAzMDAsXHJcbiAgICAgICAgICAgIG1pbkxlbmd0aDogMixcclxuICAgICAgICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHJcbiAgICAgICAgICAgICAgICBub19yaXNwb3N0YSh1aS5jb250ZW50LG5vX3Jpcyk7XHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHZhbG9yZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgbm9fcmlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoXCIjZ2VuZXJlXCIpLm9uKFwia2V5dXAgY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHZhbG9yZSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgdmFyIG5vX3JpcyA9ICQoXCIjZ2VuZXJlX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICBub19yaXMuY3NzKFwibWFyZ2luLWxlZnRcIixcIjU2N3B4XCIpO1xyXG4gICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgc291cmNlOiB1cmwrXCJnZW5lcmUmdmFsb3JlPVwiK3ZhbG9yZSxcclxuICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWxheTogMzAwLFxyXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgICAgICAgbm9fcmlzcG9zdGEodWkuY29udGVudCxub19yaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodmFsb3JlID09PSAnJykge1xyXG4gICAgICAgICAgICBub19yaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChcIiNlZGl0b3JlXCIpLm9uKFwia2V5dXAgY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHZhbG9yZSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgdmFyIG5vX3JpcyA9ICQoXCIjZWRpdG9yZV9ub19yaXNcIikuZXEoMCk7XHJcbiAgICAgICAgbm9fcmlzLmNzcyhcIm1hcmdpbi1sZWZ0XCIsXCI1NjdweFwiKTtcclxuICAgICAgICAkKHRoaXMpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIHNvdXJjZTogdXJsK1wiZWRpdG9yZSZ2YWxvcmU9XCIrdmFsb3JlLFxyXG4gICAgICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgICAgICAgIGRlbGF5OiAzMDAsXHJcbiAgICAgICAgICAgIG1pbkxlbmd0aDogMixcclxuICAgICAgICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHJcbiAgICAgICAgICAgICAgICBub19yaXNwb3N0YSh1aS5jb250ZW50LG5vX3Jpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih2YWxvcmUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKFwiI2NvbGxhbmFcIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNjb2xsYW5hX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICBub19yaXMuY3NzKFwibWFyZ2luLWxlZnRcIixcIjU2N3B4XCIpO1xyXG4gICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgc291cmNlOiB1cmwrXCJjb2xsYW5hJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHZhbG9yZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgbm9fcmlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoXCIjc2NhZmZhbGVcIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNzY2FmZmFsZV9ub19yaXNcIikuZXEoMCk7XHJcbiAgICAgICAgbm9fcmlzLmNzcyhcIm1hcmdpbi1sZWZ0XCIsXCIzMzZweFwiKTtcclxuICAgICAgICAkKHRoaXMpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIHNvdXJjZTogdXJsK1wic2NhZmZhbGUmdmFsb3JlPVwiK3ZhbG9yZSxcclxuICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWxheTogMzAwLFxyXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDEsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgICAgICAgbm9fcmlzcG9zdGEodWkuY29udGVudCxub19yaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodmFsb3JlID09PSAnJykge1xyXG4gICAgICAgICAgICBub19yaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChcIiNmb3JtYXRvXCIpLm9uKFwia2V5dXAgY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHZhbG9yZSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgdmFyIG5vX3JpcyA9ICQoXCIjZm9ybWF0b19ub19yaXNcIikuZXEoMCk7XHJcbiAgICAgICAgbm9fcmlzLmNzcyhcIm1hcmdpbi1sZWZ0XCIsXCIzMzZweFwiKTtcclxuICAgICAgICAkKHRoaXMpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIHNvdXJjZTogdXJsK1wiZm9ybWF0byZ2YWxvcmU9XCIrdmFsb3JlLFxyXG4gICAgICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgICAgICAgIGRlbGF5OiAzMDAsXHJcbiAgICAgICAgICAgIG1pbkxlbmd0aDogMixcclxuICAgICAgICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHJcbiAgICAgICAgICAgICAgICBub19yaXNwb3N0YSh1aS5jb250ZW50LG5vX3Jpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih2YWxvcmUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKFwiI25hemlvbmVcIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNuYXppb25lX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICBub19yaXMuY3NzKFwibWFyZ2luLWxlZnRcIixcIjU2N3B4XCIpO1xyXG4gICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgc291cmNlOiB1cmwrXCJuYXppb25lJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHZhbG9yZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgbm9fcmlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICBcclxuICAgIC8vSW5zZXJpbWVudG8gaW1tYWdpbmUgZXJyb3JlIGUgZGl2IGNvbnRlbmVudGUgbGEgc3BpZWdhemlvbmUgZGVsbCdlcnJvcmUgcGVyIGNpYXNjdW4gY2FtcG8gZGVsIGZvcm1cclxuICAgIGZvcm0ub24oXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBpbnZpbyA9IDE7XHJcbiAgICAgICAgdmFyIHN0cmluZ2E7XHJcbiAgICAgICAgdmFyIGRpdl9pbmZvO1xyXG4gICAgICAgIHZhciBpbWc7XHJcbiAgICAgICAgdmFyIGVycm9yX3QgPSBcIiZFZ3JhdmU7IG9iYmxpZ2F0b3JpbyBjb21waWxhcmUgcXVlc3RvIGNhbXBvLlwiO1xyXG4gICAgICAgIHZhciBlcnJvcl9yID0gXCImRWdyYXZlOyBvYmJsaWdhdG9yaW8gc2NlZ2xpZXJlIHF1ZXN0byBjYW1wby5cIjtcdFx0XHJcbiAgICAgICAgdmFyIGNhbXBpID0gJChcIjppbnB1dFwiKTtcclxuICAgICAgICB2YXIgY29ydG8gPSBcIi0xNHB4XCI7XHJcbiAgICAgICAgdmFyIG1lZGlvID0gXCItMTA2cHhcIjtcclxuICAgICAgICB2YXIgbHVuZ28gPSBcIi0yMjZweFwiO1xyXG4gICAgICAgIHZhciBkYXRhX2NfbGFyZyA9IFwiLTExNnB4XCI7XHJcbiAgICAgICAgdmFyIGNvc3RvID0gXCItMjZweFwiO1xyXG4gICAgICAgIGZ1bmN0aW9uIGluZm9fZGl2KHJpZixkaW0sZXJyb3IpIHtcclxuICAgICAgICAgICAgaW52aW8gPSAwO1xyXG4gICAgICAgICAgICBpbWcgPSByaWYucGFyZW50KCkuZmluZChcImltZy5lcnJvcmlcIik7XHJcbiAgICAgICAgICAgIHJpZi5jc3MoXCJib3JkZXJcIixcIjFweCBzb2xpZCByZWRcIik7XHJcbiAgICAgICAgICAgIGltZy5zaG93KCk7XHRcdFx0XHRcclxuICAgICAgICAgICAgaW1nLm9uKFwibW91c2VvdmVyXCIsZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICAgICAgICAgcmlmLnBhcmVudCgpLmZpbmQoXCJkaXYuaW5mb1wiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBzdHJpbmdhID0gXCI8ZGl2IGNsYXNzPSdpbmZvJyBzdHlsZT0ncmlnaHQ6XCIrZGltK1wiOyc+XCIrZXJyb3IrXCI8L2Rpdj5cIjtcclxuICAgICAgICAgICAgICAgIGRpdl9pbmZvID0gJChzdHJpbmdhKTtcclxuICAgICAgICAgICAgICAgIGRpdl9pbmZvLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGRpdl9pbmZvLmZhZGVJbig1MDApO1xyXG4gICAgICAgICAgICAgICAgcmlmLnBhcmVudCgpLmFwcGVuZChkaXZfaW5mbyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBpbWcub24oXCJtb3VzZW91dFwiLGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmluZm9cIikuaGlkZSg0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdl9pbmZvLmhpZGUoNDAwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhbXBpLmZpbHRlcihcIjp0ZXh0XCIpLmVhY2goZnVuY3Rpb24oaSx2KXtcclxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiaW1nLmVycm9yaVwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKFwiYm9yZGVyXCIsXCIxcHggc29saWQgIzAwMFwiKTtcclxuICAgICAgICAgICAgaWYoJCh0aGlzKS52YWwoKSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoKCQodGhpcykuYXR0cihcIm5hbWVcIikpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJudW1faW52XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksY29ydG8sZXJyb3JfdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRld2V5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksY29ydG8sZXJyb3JfdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVkaXRvcmVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxtZWRpbyxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZWRpemlvbmVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxtZWRpbyxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGFuYVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzY2FmZmFsZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGNvcnRvLGVycm9yX3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJmb3JtYXRvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksY29ydG8sZXJyb3JfdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5vdGVfZm9ybWF0b1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwYWdpbmVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGF0YV9jXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksZGF0YV9jX2xhcmcsZXJyb3JfdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvc3RvXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksY29zdG8sZXJyb3JfdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlzYm5cIjpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicHJvdmVuaWVuemFcIjpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGl0b2xvX29cIjpcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidHJhZHV0dG9yZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsaW5ndWFcIjpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibmF6aW9uZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLG1lZGlvLGVycm9yX3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1x0XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxsdW5nbyxlcnJvcl90KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmKCQodGhpcykudmFsKCkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCgkKHRoaXMpLmF0dHIoXCJuYW1lXCIpKXtcclxuICAgICAgICAgICAgICAgICAgICAvL0lTQk5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaXNiblwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTldezEwLDEzfSRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGNvbnRlbmVyZSBzb2xvIG51bWVyaS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL051bWVybyBpbnZlbnRhcmlvXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm51bV9pbnZcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05KCldKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGNvbnRlbmVyZSBzb2xvIG51bWVyaS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL0NvZGljZSBEZXdleVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkZXdleVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlcXC4gXSskXCIpLnRlc3QoJCh0aGlzKS52YWwoKSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksY29ydG8sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgcHUmb2dyYXZlOyBjb250ZW5lcmUgbnVtZXJpLCBsZXR0ZXJlIGUgY29tZSBjYXJhdHRlcmkgc3BlY2lhbGksIHNvbG8gaWwgJnF1b3Q7LiZxdW90Oy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL1RpdG9sb1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0aXRvbG9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bIVxcLVxcLlxcJlxcJ1xcLzAtOWEtekEtWlxceEUwXFx4RThcXHhFOVxceEY5XFx4RjJcXHhFQ1xceDI3LCBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxsdW5nbyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQXV0b3JlXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImF1dG9yZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXC5cXCZcXCdcXFwiMC05YS16QS1aXFx4RTBcXHhFOFxceEU5XFx4RjlcXHhGMlxceEVDXFx4MjcsKCkgXSskXCIpLnRlc3QoJCh0aGlzKS52YWwoKSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksbHVuZ28sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL0dlbmVyZVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJnZW5lcmVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bXFwtXFwuXFwmXFwnMC05YS16QS1aXFx4RTBcXHhFOFxceEU5XFx4RjlcXHhGMlxceEVDXFx4MjcsOyAoKV0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGx1bmdvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9FZGl0b3JlXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVkaXRvcmVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bXFwtXFwuXFwmXFwnMC05YS16QS1aXFx4RTBcXHhFOFxceEU5XFx4RjlcXHhGMlxceEVDXFx4MjcsOyBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxtZWRpbyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vRWRpemlvbmVcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZWRpemlvbmVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bQS1aYS16IF0rW0EtWmEtel0rWyBdezF9Wy1dezF9WyBdezF9WzAtOV17NH0kXCIpLnRlc3QoJCh0aGlzKS52YWwoKSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksbWVkaW8sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBlc3NlcmUgc2NyaXR0byBpbiBxdWVzdGEgZm9ybWEgJnF1b3Q7Q2l0dCZhZ3JhdmU7ICZtaW51czsgYW5ubyZxdW90Oy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL0NvbGxhbmFcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29sbGFuYVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXC5cXCZcXCcwLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyw7ICFdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxtZWRpbyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vU2NhZmZhbGVcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2NhZmZhbGVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05QS1aYS16IF0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLGNvcnRvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Gb3JtYXRvXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZvcm1hdG9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05QS1aYS16LCBcXCtdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGVzc2VyZSBzY3JpdHRvIGluIHF1ZXN0YSBmb3JtYSAmcXVvdDtOdW1lcm8gKHVzYXJlIGxhIHZpcmdvbGEgc2UgZGVjaW1hbGUpIHggTnVtZXJvICh1c2FyZSBsYSB2aXJnb2xhIHNlIGRlY2ltYWxlKSZxdW90Oy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL05vdGUgRnJvbWF0b1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJub3RlX2Zvcm1hdG9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bXFwrXFwtXFwuXFwmXFwnMC05YS16QS1aXFx4RTBcXHhFOFxceEU5XFx4RjlcXHhGMlxceEVDXFx4MjcsOyBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxsdW5nbyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vUGFnaW5lXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInBhZ2luZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTldKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxjb3J0byxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGNvbnRlbmVyZSBzb2xvIG51bWVyaS5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL0RhdGEgQ2F0YWxvZ2F6aW9uZVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYXRhX2NcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05XXs0fS1bMC05XXsyfS1bMC05XXsyfSRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxkYXRhX2NfbGFyZyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGVzc2VyZSBzY3JpdHRvIGluIHF1ZXN0YSBmb3JtYSAmcXVvdDtBbm5vJm1pbnVzO01lc2UmbWludXM7R2lvcm5vJnF1b3Q7LlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vQ29zdG9cclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29zdG9cIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05XFwuXSskXCIpLnRlc3QoJCh0aGlzKS52YWwoKSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksY29zdG8sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBjb250ZW5lcmUgc29sbyBudW1lcmkuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9Qcm92ZW5pZW56YVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwcm92ZW5pZW56YVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXC5cXCZcXCcwLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxsdW5nbyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vVGl0b2xvIE9yaWdpbmFsZVxyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0aXRvbG9fb1wiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXC5cXCZcXCdcXC8wLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNywgXSskXCIpLnRlc3QoJCh0aGlzKS52YWwoKSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksbHVuZ28sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAvL1RyYWR1dHRvcmVcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidHJhZHV0dG9yZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXC5cXCZcXCcwLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5mb19kaXYoJCh0aGlzKSxsdW5nbyxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vTGluZ3VhXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxpbmd1YVwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlthLXpBLVosIF0rJFwiKS50ZXN0KCQodGhpcykudmFsKCkpID09PSBmYWxzZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmZvX2RpdigkKHRoaXMpLG1lZGlvLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgY29udGVuZXJlIHNvbG8gbGV0dGVyZSBlIGNvbWUgY2FyYXR0ZXJlIHNwZWNpYWxlIGxhICZxdW90OywmcXVvdDsuXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9OYXppb25lXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5hemlvbmVcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bQS1aYS16XFwuICgpXSskXCIpLnRlc3QoJCh0aGlzKS52YWwoKSkgPT09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm9fZGl2KCQodGhpcyksbWVkaW8sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBjb250ZW5lcmUgc29sbyBsZXR0ZXJlIGUgY29tZSBjYXJhdHRlcmkgc3BlY2lhbGkgbGUgcGFyZW50ZXNpIHRvbmRlLlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2FtcGkuZmlsdGVyKFwiOnJhZGlvXCIpLmVhY2goZnVuY3Rpb24oaSx2KXtcclxuICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiaW1nLmVycm9yaVwiKS5oaWRlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYoY2FtcGkuZmlsdGVyKFwiaW5wdXRbbmFtZT0ncHJvcHJpZXRhJ106Y2hlY2tlZFwiKS52YWwoKSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaW5mb19kaXYoY2FtcGkuZmlsdGVyKFwiaW5wdXRbbmFtZT0ncHJvcHJpZXRhJ11cIiksXCItMTM0cHhcIixlcnJvcl9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoY2FtcGkuZmlsdGVyKFwiaW5wdXRbbmFtZT0nbm92aXRhJ106Y2hlY2tlZFwiKS52YWwoKSA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgaW5mb19kaXYoY2FtcGkuZmlsdGVyKFwiaW5wdXRbbmFtZT0nbm92aXRhJ11cIiksXCIyOHB4XCIsZXJyb3Jfcik7XHJcbiAgICAgICAgfVx0XHRcclxuICAgICAgICBpZihjYW1waS5maWx0ZXIoXCJpbnB1dFtuYW1lPSdsaW5ndWFfbyddOmNoZWNrZWRcIikudmFsKCkgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGluZm9fZGl2KGNhbXBpLmZpbHRlcihcImlucHV0W25hbWU9J2xpbmd1YV9vJ11cIiksXCIyOHB4XCIsZXJyb3Jfcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNhbXBpLmZpbHRlcihcImlucHV0W25hbWU9J3Rlc3RvX2YnXTpjaGVja2VkXCIpLnZhbCgpID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpbmZvX2RpdihjYW1waS5maWx0ZXIoXCJpbnB1dFtuYW1lPSd0ZXN0b19mJ11cIiksXCIyOHB4XCIsZXJyb3Jfcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGludmlvID09PSAwKXtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAkKFwiI2Vycm9yaVwiKS5kaWFsb2cob3B0aW9ucyk7XHJcbiAgICAgICAgICAgICQoXCIjZXJyb3JpXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBmb3JtLm9uKCdrZXlkb3duJyxmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgaWYoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7Il0sImZpbGUiOiJhZGRfY2F0YWxvZ18xLmpzIn0=
