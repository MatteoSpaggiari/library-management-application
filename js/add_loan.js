// ****************************** Focus e Button ***************************//
$(function(){
    //Array per traduzione sigle
    var traduzione_sigle = {
        "Y" : "Si",
        "N" : "No",
        "P" : "Papillon",
        "C" : "Comune",
        "F" : "Filofestival",
        "M" : "Maschio",
        "F" : "Femmina"
    };
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
    var data_odierna = new Date();
    var anno_attuale = data_odierna.getFullYear();
    //Datapicker data prestito
    $('input[name="data_pres_p"]').datepicker({
        altField: 'input[name="data_pres_p"]',
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
        showOn: "both"
    });
    // Inizializzazione variabili
    var url = "./include-php/content_global.php?tipo=";
    var lista_cat_a = new Array();
    var lista_ute_a = new Array();
    var isbn = $("#isbn_p");
    var num_inv = $("#num_inv_p");
    var num_tes = $("#num_tes_p");
    var data;
    var scheda_c = $("#catalogazione").eq(0);
    var scheda_u = $("#utente").eq(0);
    var ris_u = $("#num_tes_s");
    var ris_c = $("#num_inv_s");
    var ris_ci = $("#isbn_s");
    //Vado a prendere la struttura e le etichette dei due div (catalogazione ed utente) che andranno a contenere i dati caricati tramite chiamate ajax
    var lista_cat = scheda_c.find("ul li");
    $.each(lista_cat, function(index,event) {
        lista_cat_a[index] = $(this).html();
    });
    var lista_ute = scheda_u.find("ul li");
    $.each(lista_ute, function(index,event) {
        lista_ute_a[index] = $(this).html();
    });
    //Apertura finestra per spiegare che prima di scegliere il numero di inventario si deve scegliere la proprietà	
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
    num_inv.on("focus active", function(event) {
        var check = $("input:radio[name=proprieta_p]:checked").val();
        if(check == undefined) {
            $("input[name='proprieta_p']").focus();
            $("#no_proprieta").dialog("open");
        }
    });
    // Vado a prendere i dati di Sigla_inv e Num_inv sapendo l'ISBN
    var url = "./include-php/content_global.php?tipo=";
    $(isbn).on("keyup blur", function(event) {
        var valore = $(this).val();
        if(valore != "")
        {
            $.ajax({
                url: url+"isbn&valore="+valore,
                dataType: 'text',
                data: data,
                success: function(data) {		
                    if(data != 0) {
                        var val = data.split('#');
                        if(val[0].trim() == "P")
                        {
                            $("input[value='P']").attr('checked', true);
                        }
                        else if(val[0].trim() == "C")
                        {
                            $("input[value='C']").attr('checked', true);
                        }
                        else if(val[0].trim() == "F")
                        {
                            $("input[value='F']").attr('checked', true);
                        }
                        $("#num_inv_p").val(val[1].trim());
                        scheda_catalogazione($("#num_inv_p"));
                        $(num_tes).focus();
                    }
                }
            });
        }
    });
    //Funzione per caricare i dati utente tramite ajax
    function scheda_utente(oggetto) {
        var testo_value = oggetto.val();
        var url_fine = url+"num_tes_p&valore_num_tessera="+encodeURIComponent(testo_value);
        var a_scheda_u = $("a#scheda_u").eq(0);
        $.ajax({
            url: url_fine,
            dataType: 'text',
            data: data,
            success: function(data) {
                if(data != 0)
                {
                    ris_u.html("Nascondi Scheda Utente");
                    var data_v = data.split("#");
                    a_scheda_u.attr('href','./card_subscriber.php?id_iscritto='+data_v[0]+'&p=1&tr=');
                    a_scheda_u.css("visibility","visible");
                    var num_elem = data.length;
                    $.each(lista_ute, function(index,event)
                    {
                        $(this).html("");
                        switch(index)
                        {
                            case 4:
                            case 15:
                            case 16:
                            case 17:
                                $(this).html(lista_ute_a[index]+" <em>"+traduzione_sigle[data_v[index+1]]+"</em>");		
                            break;
                            case 1:
                                var data_vet = data_v[index+1].split(" ");
                                var data_vet_c = data_vet[0].split("-");
                                var data_c = data_vet_c[2]+"-"+data_vet_c[1]+"-"+data_vet_c[0];
                                $(this).html(lista_ute_a[index]+" <em>"+data_c+"</em>");
                            break;
                            case 5:
                                var data_vet = data_v[index+1].split("-");
                                var data_c = data_vet[2]+"-"+data_vet[1]+"-"+data_vet[0];
                                $(this).html(lista_ute_a[index]+" <em>"+data_c+"</em>");
                            break;
                            case 18:
                                switch(data_v[index+1]) {
                                    case '0':
                                            var tipo_doc = '-';
                                    break;
                                    case '1':
                                            var tipo_doc = "Carta d'Identit&agrave;";
                                    break;
                                    case '2':
                                            var tipo_doc = 'Carta dei Servizi';
                                    break;
                                    case '3':
                                            var tipo_doc = 'Passaporto';
                                    break;
                                    case '4':
                                            var tipo_doc = 'Tessera Sanitaria';
                                    break;
                                    default:
                                        var tipo_doc = '-';
                                    break;
                                }									
                                $(this).html(lista_ute_a[index]+" <em>"+tipo_doc+"</em>");
                            break;
                            default:
                                $(this).html(lista_ute_a[index]+" <em>"+data_v[index+1]+"</em>");
                            break;
                        }
                    });
                    scheda_u.fadeIn(500);
                }
                else
                {
                        ris_u.html("Nessun Utente");					
                        scheda_u.fadeOut(500);
                        a_scheda_u.css("visibility","hidden");
                }
            }
        });		
    }
    //Funzione per caricare i dati utente tramite ajax
    function scheda_catalogazione(oggetto) {
        var testo_value = oggetto.val();
        var check = $("input:radio[name=proprieta_p]:checked").val();
        var url_fine = url+"num_inv_p&valore_inv="+encodeURIComponent(testo_value)+"&valore_sigla="+check;
        var a_scheda_c = $("a#scheda_c").eq(0);
        $.ajax({
            url: url_fine,
            dataType: 'text',
            data: data,
            success: function(data) {
                if(data != 0) {
                    ris_c.html("Nascondi Scheda Catalogazione");
                    var data_v = data.split("#");
                    a_scheda_c.attr('href','./card_catalog.php?id_catalog='+data_v[0]+'&p=1&tr=');
                    a_scheda_c.css("visibility","visible");
                    var num_elem = data.length;
                    $.each(lista_cat, function(index,event) {
                        $(this).html("");
                        switch(index) {
                            case 1:
                            case 15:
                            case 18:
                            case 21:
                                $(this).html(lista_cat_a[index]+" <em>"+traduzione_sigle[data_v[index+1]]+"</em>");		
                            break;
                            case 11:
                                $(this).html(lista_cat_a[index]+" <em>"+data_v[index+1]+" [cm]</em>");
                            break;
                            case 14:
                                var data_vet = data_v[index+1].split("-");
                                var data_c = data_vet[2]+"-"+data_vet[1]+"-"+data_vet[0];
                                $(this).html(lista_cat_a[index]+" <em>"+data_c+"</em>");
                            break;
                            case 16:
                                $(this).html(lista_cat_a[index]+" <em>"+data_v[index+1]+" &euro;</em>");
                            break;
                            default:
                                $(this).html(lista_cat_a[index]+" <em>"+data_v[index+1]+"</em>");		
                            break;
                        }
                    });
                    scheda_c.fadeIn(500);
                } else {
                    ris_c.html("Nessuna Catalogazione");					
                    scheda_c.fadeOut(500);
                    a_scheda_c.css("visibility","hidden");
                }
            }
        });	
    }
    if(num_inv.val() != "")
    {
        scheda_catalogazione(num_inv);
    }
    if(num_tes.val() != "")
    {
        scheda_utente(num_tes);
    }
    //Creazione scheda catalogazione
    num_inv.on("keyup change",function(event) {
            scheda_catalogazione($(this));
    });
    //Creazione scheda utente
    num_tes.on("keyup change",function(event) {
            scheda_utente($(this));
    });
    //Chiusura e riapertura scheda utente e catalogazione
    $("#close-catalog").on("click",function() {
            ris_c.html("Vedi Scheda Catalogazione");
            scheda_c.fadeOut(500);
    });
    $("#close-subscriber").on("click",function() {
            ris_u.html("Vedi Scheda Utente");
            scheda_u.fadeOut(500);
    });
    ris_c.on("click",function(e) {
        if($(this).html() == "Nascondi Scheda Catalogazione") {
                scheda_c.fadeOut(500);
                $(this).html("Vedi Scheda Catalogazione");
        } else if($(this).html() == "Vedi Scheda Catalogazione") {
                scheda_c.fadeIn(500);
                $(this).html("Nascondi Scheda Catalogazione");
        } else if($(this).html() == "Nessuna Catalogazione") {
                scheda_c.hide();
        }
    });
    ris_u.on("click",function() {
        if($(this).html() == "Nascondi Scheda Utente") {
                scheda_u.fadeOut(500);
                $(this).html("Vedi Scheda Utente");
        } else if($(this).html() == "Vedi Scheda Utente") {
                scheda_u.fadeIn(500);
                $(this).html("Nascondi Scheda Utente");
        } else if($(this).html() == "Nessun Utente") {
                scheda_u.hide();
        }
    });
    //Apertura finestra messaggi di avviso o errori
    if(location.search.indexOf("avvisi") !== -1) {
        $("#avvisi").dialog(options);
        $("#avvisi").dialog("open");
    }
    //Apertura finestra messaggi di avviso
    if(location.search.indexOf("errors") !== -1) {
        $("#errors").dialog(options);
        $("#errors").dialog("open");
    }
    //Apertura finestra messaggi di avviso
    if(location.search.indexOf("loan=success") !== -1) {
        $("#successo").html("<p>Il PRESTITO &egrave; avvenuto correttamente.</p>")
        $("#successo").dialog(options);
        $("#successo").dialog("open");
    }
    //Aperture finestre messaggi di avviso
    if(location.search.indexOf("loan=lent") !== -1) {
        $("#avvisi").html("<p>Questa CATALOGAZIONE &egrave; gi&agrave; in prestito.</p>")
        $("#avvisi").dialog(options);
        $("#avvisi").dialog("open");
    }
    if(location.search.indexOf("subscriber=suspended") !== -1) {
        $("#avvisi").html("<p>L'ISCRITTO &egrave; SOSPESO per cui non pu&ograve; richiedere prestiti.</p>")
        $("#avvisi").dialog(options);
        $("#avvisi").dialog("open");
    }
    if(location.search.indexOf("loan=limit") !== -1) {
        $("#avvisi").html("<p>L'ISCRITTO ha gi&agrave; richiesto TRE prestiti per cui non pu&ograve; richiederne altri.</p>")
        $("#avvisi").dialog(options);
        $("#avvisi").dialog("open");
    }
    //Apertura scheda utente e/o catalogazione nel caso siano già presenti nell'URL
    if(location.search.indexOf("sigla_inv") !== -1 && location.search.indexOf("num_inv") !== -1) {
            scheda_catalogazione(num_inv);
    }	
    if(location.search.indexOf("num_tes") !== -1) {
            scheda_utente(num_tes);
    }
    //Rendo spostabile le schede catalogazione e utente	
    scheda_c.draggable({
            handle: "h3",
            opacity: 0.7,
            zIndex: 20
    });
    scheda_c.droppable();
    scheda_c.css("position","absolute");
    var larg_s = $("#catalogazione").width();
    scheda_u.css("left",larg_s);
    scheda_u.draggable({
            handle: "h3",
            opacity: 0.7,
            zIndex: 20,
            drag: function( event, ui ) {
                    $("#utente").css("left","");
            }
    });
    scheda_u.droppable();
    scheda_u.css("position","absolute");
    //Apertura finestra di errore
    if(location.search.indexOf("errori") != -1) {
            $("#errori").dialog(options,{title: "Errore"});
            $("#errori").dialog("open");
    }
    $("#nuovo_prestito").on('keydown',function(event){
        if(event.keyCode === 13) {
            event.preventDefault();
        }
    });
    
    
});