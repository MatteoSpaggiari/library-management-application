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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhZGRfbG9hbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogRm9jdXMgZSBCdXR0b24gKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cclxuJChmdW5jdGlvbigpe1xyXG4gICAgLy9BcnJheSBwZXIgdHJhZHV6aW9uZSBzaWdsZVxyXG4gICAgdmFyIHRyYWR1emlvbmVfc2lnbGUgPSB7XHJcbiAgICAgICAgXCJZXCIgOiBcIlNpXCIsXHJcbiAgICAgICAgXCJOXCIgOiBcIk5vXCIsXHJcbiAgICAgICAgXCJQXCIgOiBcIlBhcGlsbG9uXCIsXHJcbiAgICAgICAgXCJDXCIgOiBcIkNvbXVuZVwiLFxyXG4gICAgICAgIFwiRlwiIDogXCJGaWxvZmVzdGl2YWxcIixcclxuICAgICAgICBcIk1cIiA6IFwiTWFzY2hpb1wiLFxyXG4gICAgICAgIFwiRlwiIDogXCJGZW1taW5hXCJcclxuICAgIH07XHJcbiAgICAvL1NldHRhZ2dpbyBvcHppb25pIGZpbmVzdHJlIGRpIGF2dmlzb1xyXG4gICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgYXV0b09wZW46IHRydWUsXHJcbiAgICAgICAgY2xvc2VUZXh0OiBcIkNoaXVkaVwiLFxyXG4gICAgICAgIHNob3c6IDUwMCxcclxuICAgICAgICBoaWRlOiA1MDAsXHJcbiAgICAgICAgdGl0bGU6IFwiQXZ2aXNvXCIsXHJcbiAgICAgICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgICAgICBidXR0b25zOiB7XHJcbiAgICAgICAgICAgIE9rOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdmFyIGRhdGFfb2RpZXJuYSA9IG5ldyBEYXRlKCk7XHJcbiAgICB2YXIgYW5ub19hdHR1YWxlID0gZGF0YV9vZGllcm5hLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAvL0RhdGFwaWNrZXIgZGF0YSBwcmVzdGl0b1xyXG4gICAgJCgnaW5wdXRbbmFtZT1cImRhdGFfcHJlc19wXCJdJykuZGF0ZXBpY2tlcih7XHJcbiAgICAgICAgYWx0RmllbGQ6ICdpbnB1dFtuYW1lPVwiZGF0YV9wcmVzX3BcIl0nLFxyXG4gICAgICAgIGFsdEZvcm1hdDogXCJ5eS1tbS1kZFwiLFxyXG4gICAgICAgIGNsb3NlVGV4dCA6ICdYJyxcclxuICAgICAgICBzaG93T24gOiAnYnV0dG9uJyxcclxuICAgICAgICBjdXJyZW50VGV4dCA6ICdOb3cnLFxyXG4gICAgICAgIHNlbGVjdE90aGVyTW9udGhzIDogdHJ1ZSxcclxuICAgICAgICBzaG93T3RoZXJNb250aHMgOiB0cnVlLFxyXG4gICAgICAgIHNob3dXZWVrIDogdHJ1ZSxcclxuICAgICAgICB3ZWVrSGVhZGVyIDogJ1dlZWsnLFxyXG4gICAgICAgIGFwcGVuZFRleHQ6ICcoYWFhYS1tbS1nZyknLFxyXG4gICAgICAgIGJ1dHRvbkltYWdlOiAnLi9pbWFnZXMvY2FsZW5kYXJpby5wbmcnLFxyXG4gICAgICAgIGJ1dHRvbkltYWdlT25seTogdHJ1ZSxcclxuICAgICAgICBjaGFuZ2VZZWFyOiB0cnVlLFxyXG4gICAgICAgIGNoYW5nZU1vbnRoOiB0cnVlLFxyXG4gICAgICAgIGRhdGVGb3JtYXQ6ICd5eS1tbS1kZCcsXHJcbiAgICAgICAgbWluRGF0ZTogbmV3IERhdGUoMTk4MCwwLDEpLFxyXG4gICAgICAgIHllYXJSYW5nZTogXCIxOTgwOlwiK2Fubm9fYXR0dWFsZSxcclxuICAgICAgICBkZWZhdWx0RGF0ZTogZGF0YV9vZGllcm5hLFxyXG4gICAgICAgIHNob3dPbjogXCJib3RoXCJcclxuICAgIH0pO1xyXG4gICAgLy8gSW5pemlhbGl6emF6aW9uZSB2YXJpYWJpbGlcclxuICAgIHZhciB1cmwgPSBcIi4vaW5jbHVkZS1waHAvY29udGVudF9nbG9iYWwucGhwP3RpcG89XCI7XHJcbiAgICB2YXIgbGlzdGFfY2F0X2EgPSBuZXcgQXJyYXkoKTtcclxuICAgIHZhciBsaXN0YV91dGVfYSA9IG5ldyBBcnJheSgpO1xyXG4gICAgdmFyIGlzYm4gPSAkKFwiI2lzYm5fcFwiKTtcclxuICAgIHZhciBudW1faW52ID0gJChcIiNudW1faW52X3BcIik7XHJcbiAgICB2YXIgbnVtX3RlcyA9ICQoXCIjbnVtX3Rlc19wXCIpO1xyXG4gICAgdmFyIGRhdGE7XHJcbiAgICB2YXIgc2NoZWRhX2MgPSAkKFwiI2NhdGFsb2dhemlvbmVcIikuZXEoMCk7XHJcbiAgICB2YXIgc2NoZWRhX3UgPSAkKFwiI3V0ZW50ZVwiKS5lcSgwKTtcclxuICAgIHZhciByaXNfdSA9ICQoXCIjbnVtX3Rlc19zXCIpO1xyXG4gICAgdmFyIHJpc19jID0gJChcIiNudW1faW52X3NcIik7XHJcbiAgICB2YXIgcmlzX2NpID0gJChcIiNpc2JuX3NcIik7XHJcbiAgICAvL1ZhZG8gYSBwcmVuZGVyZSBsYSBzdHJ1dHR1cmEgZSBsZSBldGljaGV0dGUgZGVpIGR1ZSBkaXYgKGNhdGFsb2dhemlvbmUgZWQgdXRlbnRlKSBjaGUgYW5kcmFubm8gYSBjb250ZW5lcmUgaSBkYXRpIGNhcmljYXRpIHRyYW1pdGUgY2hpYW1hdGUgYWpheFxyXG4gICAgdmFyIGxpc3RhX2NhdCA9IHNjaGVkYV9jLmZpbmQoXCJ1bCBsaVwiKTtcclxuICAgICQuZWFjaChsaXN0YV9jYXQsIGZ1bmN0aW9uKGluZGV4LGV2ZW50KSB7XHJcbiAgICAgICAgbGlzdGFfY2F0X2FbaW5kZXhdID0gJCh0aGlzKS5odG1sKCk7XHJcbiAgICB9KTtcclxuICAgIHZhciBsaXN0YV91dGUgPSBzY2hlZGFfdS5maW5kKFwidWwgbGlcIik7XHJcbiAgICAkLmVhY2gobGlzdGFfdXRlLCBmdW5jdGlvbihpbmRleCxldmVudCkge1xyXG4gICAgICAgIGxpc3RhX3V0ZV9hW2luZGV4XSA9ICQodGhpcykuaHRtbCgpO1xyXG4gICAgfSk7XHJcbiAgICAvL0FwZXJ0dXJhIGZpbmVzdHJhIHBlciBzcGllZ2FyZSBjaGUgcHJpbWEgZGkgc2NlZ2xpZXJlIGlsIG51bWVybyBkaSBpbnZlbnRhcmlvIHNpIGRldmUgc2NlZ2xpZXJlIGxhIHByb3ByaWV0w6BcdFxyXG4gICAgJChcIiNub19wcm9wcmlldGFcIikuZGlhbG9nKHtcclxuICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICBhdXRvT3BlbjogZmFsc2UsXHJcbiAgICAgICAgY2xvc2VUZXh0OiBcIkNoaXVkaVwiLFxyXG4gICAgICAgIHNob3c6IDUwMCxcclxuICAgICAgICBoaWRlOiA1MDAsXHJcbiAgICAgICAgdGl0bGU6IFwiQXZ2aXNvXCIsXHJcbiAgICAgICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgICAgICBidXR0b25zOiB7XHJcbiAgICAgICAgICAgIE9rOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIG51bV9pbnYub24oXCJmb2N1cyBhY3RpdmVcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgY2hlY2sgPSAkKFwiaW5wdXQ6cmFkaW9bbmFtZT1wcm9wcmlldGFfcF06Y2hlY2tlZFwiKS52YWwoKTtcclxuICAgICAgICBpZihjaGVjayA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgJChcImlucHV0W25hbWU9J3Byb3ByaWV0YV9wJ11cIikuZm9jdXMoKTtcclxuICAgICAgICAgICAgJChcIiNub19wcm9wcmlldGFcIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIFZhZG8gYSBwcmVuZGVyZSBpIGRhdGkgZGkgU2lnbGFfaW52IGUgTnVtX2ludiBzYXBlbmRvIGwnSVNCTlxyXG4gICAgdmFyIHVybCA9IFwiLi9pbmNsdWRlLXBocC9jb250ZW50X2dsb2JhbC5waHA/dGlwbz1cIjtcclxuICAgICQoaXNibikub24oXCJrZXl1cCBibHVyXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHZhbG9yZSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgaWYodmFsb3JlICE9IFwiXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiB1cmwrXCJpc2JuJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcdFx0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkYXRhLnNwbGl0KCcjJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZhbFswXS50cmltKCkgPT0gXCJQXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCJpbnB1dFt2YWx1ZT0nUCddXCIpLmF0dHIoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHZhbFswXS50cmltKCkgPT0gXCJDXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCJpbnB1dFt2YWx1ZT0nQyddXCIpLmF0dHIoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHZhbFswXS50cmltKCkgPT0gXCJGXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCJpbnB1dFt2YWx1ZT0nRiddXCIpLmF0dHIoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI251bV9pbnZfcFwiKS52YWwodmFsWzFdLnRyaW0oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjaGVkYV9jYXRhbG9nYXppb25lKCQoXCIjbnVtX2ludl9wXCIpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChudW1fdGVzKS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvL0Z1bnppb25lIHBlciBjYXJpY2FyZSBpIGRhdGkgdXRlbnRlIHRyYW1pdGUgYWpheFxyXG4gICAgZnVuY3Rpb24gc2NoZWRhX3V0ZW50ZShvZ2dldHRvKSB7XHJcbiAgICAgICAgdmFyIHRlc3RvX3ZhbHVlID0gb2dnZXR0by52YWwoKTtcclxuICAgICAgICB2YXIgdXJsX2ZpbmUgPSB1cmwrXCJudW1fdGVzX3AmdmFsb3JlX251bV90ZXNzZXJhPVwiK2VuY29kZVVSSUNvbXBvbmVudCh0ZXN0b192YWx1ZSk7XHJcbiAgICAgICAgdmFyIGFfc2NoZWRhX3UgPSAkKFwiYSNzY2hlZGFfdVwiKS5lcSgwKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IHVybF9maW5lLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ3RleHQnLFxyXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhICE9IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmlzX3UuaHRtbChcIk5hc2NvbmRpIFNjaGVkYSBVdGVudGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFfdiA9IGRhdGEuc3BsaXQoXCIjXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFfc2NoZWRhX3UuYXR0cignaHJlZicsJy4vY2FyZF9zdWJzY3JpYmVyLnBocD9pZF9pc2NyaXR0bz0nK2RhdGFfdlswXSsnJnA9MSZ0cj0nKTtcclxuICAgICAgICAgICAgICAgICAgICBhX3NjaGVkYV91LmNzcyhcInZpc2liaWxpdHlcIixcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG51bV9lbGVtID0gZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGxpc3RhX3V0ZSwgZnVuY3Rpb24oaW5kZXgsZXZlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChpbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxNTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTY6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE3OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaHRtbChsaXN0YV91dGVfYVtpbmRleF0rXCIgPGVtPlwiK3RyYWR1emlvbmVfc2lnbGVbZGF0YV92W2luZGV4KzFdXStcIjwvZW0+XCIpO1x0XHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhX3ZldCA9IGRhdGFfdltpbmRleCsxXS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFfdmV0X2MgPSBkYXRhX3ZldFswXS5zcGxpdChcIi1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFfYyA9IGRhdGFfdmV0X2NbMl0rXCItXCIrZGF0YV92ZXRfY1sxXStcIi1cIitkYXRhX3ZldF9jWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaHRtbChsaXN0YV91dGVfYVtpbmRleF0rXCIgPGVtPlwiK2RhdGFfYytcIjwvZW0+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFfdmV0ID0gZGF0YV92W2luZGV4KzFdLnNwbGl0KFwiLVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YV9jID0gZGF0YV92ZXRbMl0rXCItXCIrZGF0YV92ZXRbMV0rXCItXCIrZGF0YV92ZXRbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5odG1sKGxpc3RhX3V0ZV9hW2luZGV4XStcIiA8ZW0+XCIrZGF0YV9jK1wiPC9lbT5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTg6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKGRhdGFfdltpbmRleCsxXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICcwJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGlwb19kb2MgPSAnLSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICcxJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGlwb19kb2MgPSBcIkNhcnRhIGQnSWRlbnRpdCZhZ3JhdmU7XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICcyJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGlwb19kb2MgPSAnQ2FydGEgZGVpIFNlcnZpemknO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnMyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpcG9fZG9jID0gJ1Bhc3NhcG9ydG8nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnNCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRpcG9fZG9jID0gJ1Rlc3NlcmEgU2FuaXRhcmlhJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGlwb19kb2MgPSAnLSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cdFx0XHRcdFx0XHRcdFx0XHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwobGlzdGFfdXRlX2FbaW5kZXhdK1wiIDxlbT5cIit0aXBvX2RvYytcIjwvZW0+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykuaHRtbChsaXN0YV91dGVfYVtpbmRleF0rXCIgPGVtPlwiK2RhdGFfdltpbmRleCsxXStcIjwvZW0+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBzY2hlZGFfdS5mYWRlSW4oNTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmlzX3UuaHRtbChcIk5lc3N1biBVdGVudGVcIik7XHRcdFx0XHRcdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2hlZGFfdS5mYWRlT3V0KDUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFfc2NoZWRhX3UuY3NzKFwidmlzaWJpbGl0eVwiLFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHRcdFxyXG4gICAgfVxyXG4gICAgLy9GdW56aW9uZSBwZXIgY2FyaWNhcmUgaSBkYXRpIHV0ZW50ZSB0cmFtaXRlIGFqYXhcclxuICAgIGZ1bmN0aW9uIHNjaGVkYV9jYXRhbG9nYXppb25lKG9nZ2V0dG8pIHtcclxuICAgICAgICB2YXIgdGVzdG9fdmFsdWUgPSBvZ2dldHRvLnZhbCgpO1xyXG4gICAgICAgIHZhciBjaGVjayA9ICQoXCJpbnB1dDpyYWRpb1tuYW1lPXByb3ByaWV0YV9wXTpjaGVja2VkXCIpLnZhbCgpO1xyXG4gICAgICAgIHZhciB1cmxfZmluZSA9IHVybCtcIm51bV9pbnZfcCZ2YWxvcmVfaW52PVwiK2VuY29kZVVSSUNvbXBvbmVudCh0ZXN0b192YWx1ZSkrXCImdmFsb3JlX3NpZ2xhPVwiK2NoZWNrO1xyXG4gICAgICAgIHZhciBhX3NjaGVkYV9jID0gJChcImEjc2NoZWRhX2NcIikuZXEoMCk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiB1cmxfZmluZSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICd0ZXh0JyxcclxuICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmlzX2MuaHRtbChcIk5hc2NvbmRpIFNjaGVkYSBDYXRhbG9nYXppb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhX3YgPSBkYXRhLnNwbGl0KFwiI1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBhX3NjaGVkYV9jLmF0dHIoJ2hyZWYnLCcuL2NhcmRfY2F0YWxvZy5waHA/aWRfY2F0YWxvZz0nK2RhdGFfdlswXSsnJnA9MSZ0cj0nKTtcclxuICAgICAgICAgICAgICAgICAgICBhX3NjaGVkYV9jLmNzcyhcInZpc2liaWxpdHlcIixcInZpc2libGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG51bV9lbGVtID0gZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGxpc3RhX2NhdCwgZnVuY3Rpb24oaW5kZXgsZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2goaW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTU6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE4OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAyMTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwobGlzdGFfY2F0X2FbaW5kZXhdK1wiIDxlbT5cIit0cmFkdXppb25lX3NpZ2xlW2RhdGFfdltpbmRleCsxXV0rXCI8L2VtPlwiKTtcdFx0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTE6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5odG1sKGxpc3RhX2NhdF9hW2luZGV4XStcIiA8ZW0+XCIrZGF0YV92W2luZGV4KzFdK1wiIFtjbV08L2VtPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxNDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YV92ZXQgPSBkYXRhX3ZbaW5kZXgrMV0uc3BsaXQoXCItXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhX2MgPSBkYXRhX3ZldFsyXStcIi1cIitkYXRhX3ZldFsxXStcIi1cIitkYXRhX3ZldFswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwobGlzdGFfY2F0X2FbaW5kZXhdK1wiIDxlbT5cIitkYXRhX2MrXCI8L2VtPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxNjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwobGlzdGFfY2F0X2FbaW5kZXhdK1wiIDxlbT5cIitkYXRhX3ZbaW5kZXgrMV0rXCIgJmV1cm87PC9lbT5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5odG1sKGxpc3RhX2NhdF9hW2luZGV4XStcIiA8ZW0+XCIrZGF0YV92W2luZGV4KzFdK1wiPC9lbT5cIik7XHRcdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBzY2hlZGFfYy5mYWRlSW4oNTAwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmlzX2MuaHRtbChcIk5lc3N1bmEgQ2F0YWxvZ2F6aW9uZVwiKTtcdFx0XHRcdFx0XHJcbiAgICAgICAgICAgICAgICAgICAgc2NoZWRhX2MuZmFkZU91dCg1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGFfc2NoZWRhX2MuY3NzKFwidmlzaWJpbGl0eVwiLFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHRcclxuICAgIH1cclxuICAgIGlmKG51bV9pbnYudmFsKCkgIT0gXCJcIilcclxuICAgIHtcclxuICAgICAgICBzY2hlZGFfY2F0YWxvZ2F6aW9uZShudW1faW52KTtcclxuICAgIH1cclxuICAgIGlmKG51bV90ZXMudmFsKCkgIT0gXCJcIilcclxuICAgIHtcclxuICAgICAgICBzY2hlZGFfdXRlbnRlKG51bV90ZXMpO1xyXG4gICAgfVxyXG4gICAgLy9DcmVhemlvbmUgc2NoZWRhIGNhdGFsb2dhemlvbmVcclxuICAgIG51bV9pbnYub24oXCJrZXl1cCBjaGFuZ2VcIixmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgICAgICBzY2hlZGFfY2F0YWxvZ2F6aW9uZSgkKHRoaXMpKTtcclxuICAgIH0pO1xyXG4gICAgLy9DcmVhemlvbmUgc2NoZWRhIHV0ZW50ZVxyXG4gICAgbnVtX3Rlcy5vbihcImtleXVwIGNoYW5nZVwiLGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgICAgIHNjaGVkYV91dGVudGUoJCh0aGlzKSk7XHJcbiAgICB9KTtcclxuICAgIC8vQ2hpdXN1cmEgZSByaWFwZXJ0dXJhIHNjaGVkYSB1dGVudGUgZSBjYXRhbG9nYXppb25lXHJcbiAgICAkKFwiI2Nsb3NlLWNhdGFsb2dcIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByaXNfYy5odG1sKFwiVmVkaSBTY2hlZGEgQ2F0YWxvZ2F6aW9uZVwiKTtcclxuICAgICAgICAgICAgc2NoZWRhX2MuZmFkZU91dCg1MDApO1xyXG4gICAgfSk7XHJcbiAgICAkKFwiI2Nsb3NlLXN1YnNjcmliZXJcIikub24oXCJjbGlja1wiLGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByaXNfdS5odG1sKFwiVmVkaSBTY2hlZGEgVXRlbnRlXCIpO1xyXG4gICAgICAgICAgICBzY2hlZGFfdS5mYWRlT3V0KDUwMCk7XHJcbiAgICB9KTtcclxuICAgIHJpc19jLm9uKFwiY2xpY2tcIixmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYoJCh0aGlzKS5odG1sKCkgPT0gXCJOYXNjb25kaSBTY2hlZGEgQ2F0YWxvZ2F6aW9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBzY2hlZGFfYy5mYWRlT3V0KDUwMCk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwoXCJWZWRpIFNjaGVkYSBDYXRhbG9nYXppb25lXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZigkKHRoaXMpLmh0bWwoKSA9PSBcIlZlZGkgU2NoZWRhIENhdGFsb2dhemlvbmVcIikge1xyXG4gICAgICAgICAgICAgICAgc2NoZWRhX2MuZmFkZUluKDUwMCk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwoXCJOYXNjb25kaSBTY2hlZGEgQ2F0YWxvZ2F6aW9uZVwiKTtcclxuICAgICAgICB9IGVsc2UgaWYoJCh0aGlzKS5odG1sKCkgPT0gXCJOZXNzdW5hIENhdGFsb2dhemlvbmVcIikge1xyXG4gICAgICAgICAgICAgICAgc2NoZWRhX2MuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmlzX3Uub24oXCJjbGlja1wiLGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmKCQodGhpcykuaHRtbCgpID09IFwiTmFzY29uZGkgU2NoZWRhIFV0ZW50ZVwiKSB7XHJcbiAgICAgICAgICAgICAgICBzY2hlZGFfdS5mYWRlT3V0KDUwMCk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmh0bWwoXCJWZWRpIFNjaGVkYSBVdGVudGVcIik7XHJcbiAgICAgICAgfSBlbHNlIGlmKCQodGhpcykuaHRtbCgpID09IFwiVmVkaSBTY2hlZGEgVXRlbnRlXCIpIHtcclxuICAgICAgICAgICAgICAgIHNjaGVkYV91LmZhZGVJbig1MDApO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5odG1sKFwiTmFzY29uZGkgU2NoZWRhIFV0ZW50ZVwiKTtcclxuICAgICAgICB9IGVsc2UgaWYoJCh0aGlzKS5odG1sKCkgPT0gXCJOZXNzdW4gVXRlbnRlXCIpIHtcclxuICAgICAgICAgICAgICAgIHNjaGVkYV91LmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vQXBlcnR1cmEgZmluZXN0cmEgbWVzc2FnZ2kgZGkgYXZ2aXNvIG8gZXJyb3JpXHJcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImF2dmlzaVwiKSAhPT0gLTEpIHtcclxuICAgICAgICAkKFwiI2F2dmlzaVwiKS5kaWFsb2cob3B0aW9ucyk7XHJcbiAgICAgICAgJChcIiNhdnZpc2lcIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgIH1cclxuICAgIC8vQXBlcnR1cmEgZmluZXN0cmEgbWVzc2FnZ2kgZGkgYXZ2aXNvXHJcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImVycm9yc1wiKSAhPT0gLTEpIHtcclxuICAgICAgICAkKFwiI2Vycm9yc1wiKS5kaWFsb2cob3B0aW9ucyk7XHJcbiAgICAgICAgJChcIiNlcnJvcnNcIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgIH1cclxuICAgIC8vQXBlcnR1cmEgZmluZXN0cmEgbWVzc2FnZ2kgZGkgYXZ2aXNvXHJcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImxvYW49c3VjY2Vzc1wiKSAhPT0gLTEpIHtcclxuICAgICAgICAkKFwiI3N1Y2Nlc3NvXCIpLmh0bWwoXCI8cD5JbCBQUkVTVElUTyAmZWdyYXZlOyBhdnZlbnV0byBjb3JyZXR0YW1lbnRlLjwvcD5cIilcclxuICAgICAgICAkKFwiI3N1Y2Nlc3NvXCIpLmRpYWxvZyhvcHRpb25zKTtcclxuICAgICAgICAkKFwiI3N1Y2Nlc3NvXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbiAgICB9XHJcbiAgICAvL0FwZXJ0dXJlIGZpbmVzdHJlIG1lc3NhZ2dpIGRpIGF2dmlzb1xyXG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJsb2FuPWxlbnRcIikgIT09IC0xKSB7XHJcbiAgICAgICAgJChcIiNhdnZpc2lcIikuaHRtbChcIjxwPlF1ZXN0YSBDQVRBTE9HQVpJT05FICZlZ3JhdmU7IGdpJmFncmF2ZTsgaW4gcHJlc3RpdG8uPC9wPlwiKVxyXG4gICAgICAgICQoXCIjYXZ2aXNpXCIpLmRpYWxvZyhvcHRpb25zKTtcclxuICAgICAgICAkKFwiI2F2dmlzaVwiKS5kaWFsb2coXCJvcGVuXCIpO1xyXG4gICAgfVxyXG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJzdWJzY3JpYmVyPXN1c3BlbmRlZFwiKSAhPT0gLTEpIHtcclxuICAgICAgICAkKFwiI2F2dmlzaVwiKS5odG1sKFwiPHA+TCdJU0NSSVRUTyAmZWdyYXZlOyBTT1NQRVNPIHBlciBjdWkgbm9uIHB1Jm9ncmF2ZTsgcmljaGllZGVyZSBwcmVzdGl0aS48L3A+XCIpXHJcbiAgICAgICAgJChcIiNhdnZpc2lcIikuZGlhbG9nKG9wdGlvbnMpO1xyXG4gICAgICAgICQoXCIjYXZ2aXNpXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbiAgICB9XHJcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImxvYW49bGltaXRcIikgIT09IC0xKSB7XHJcbiAgICAgICAgJChcIiNhdnZpc2lcIikuaHRtbChcIjxwPkwnSVNDUklUVE8gaGEgZ2kmYWdyYXZlOyByaWNoaWVzdG8gVFJFIHByZXN0aXRpIHBlciBjdWkgbm9uIHB1Jm9ncmF2ZTsgcmljaGllZGVybmUgYWx0cmkuPC9wPlwiKVxyXG4gICAgICAgICQoXCIjYXZ2aXNpXCIpLmRpYWxvZyhvcHRpb25zKTtcclxuICAgICAgICAkKFwiI2F2dmlzaVwiKS5kaWFsb2coXCJvcGVuXCIpO1xyXG4gICAgfVxyXG4gICAgLy9BcGVydHVyYSBzY2hlZGEgdXRlbnRlIGUvbyBjYXRhbG9nYXppb25lIG5lbCBjYXNvIHNpYW5vIGdpw6AgcHJlc2VudGkgbmVsbCdVUkxcclxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwic2lnbGFfaW52XCIpICE9PSAtMSAmJiBsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcIm51bV9pbnZcIikgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHNjaGVkYV9jYXRhbG9nYXppb25lKG51bV9pbnYpO1xyXG4gICAgfVx0XHJcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcIm51bV90ZXNcIikgIT09IC0xKSB7XHJcbiAgICAgICAgICAgIHNjaGVkYV91dGVudGUobnVtX3Rlcyk7XHJcbiAgICB9XHJcbiAgICAvL1JlbmRvIHNwb3N0YWJpbGUgbGUgc2NoZWRlIGNhdGFsb2dhemlvbmUgZSB1dGVudGVcdFxyXG4gICAgc2NoZWRhX2MuZHJhZ2dhYmxlKHtcclxuICAgICAgICAgICAgaGFuZGxlOiBcImgzXCIsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNyxcclxuICAgICAgICAgICAgekluZGV4OiAyMFxyXG4gICAgfSk7XHJcbiAgICBzY2hlZGFfYy5kcm9wcGFibGUoKTtcclxuICAgIHNjaGVkYV9jLmNzcyhcInBvc2l0aW9uXCIsXCJhYnNvbHV0ZVwiKTtcclxuICAgIHZhciBsYXJnX3MgPSAkKFwiI2NhdGFsb2dhemlvbmVcIikud2lkdGgoKTtcclxuICAgIHNjaGVkYV91LmNzcyhcImxlZnRcIixsYXJnX3MpO1xyXG4gICAgc2NoZWRhX3UuZHJhZ2dhYmxlKHtcclxuICAgICAgICAgICAgaGFuZGxlOiBcImgzXCIsXHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAuNyxcclxuICAgICAgICAgICAgekluZGV4OiAyMCxcclxuICAgICAgICAgICAgZHJhZzogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3V0ZW50ZVwiKS5jc3MoXCJsZWZ0XCIsXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgc2NoZWRhX3UuZHJvcHBhYmxlKCk7XHJcbiAgICBzY2hlZGFfdS5jc3MoXCJwb3NpdGlvblwiLFwiYWJzb2x1dGVcIik7XHJcbiAgICAvL0FwZXJ0dXJhIGZpbmVzdHJhIGRpIGVycm9yZVxyXG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJlcnJvcmlcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgJChcIiNlcnJvcmlcIikuZGlhbG9nKG9wdGlvbnMse3RpdGxlOiBcIkVycm9yZVwifSk7XHJcbiAgICAgICAgICAgICQoXCIjZXJyb3JpXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbiAgICB9XHJcbiAgICAkKFwiI251b3ZvX3ByZXN0aXRvXCIpLm9uKCdrZXlkb3duJyxmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgaWYoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgXHJcbn0pOyJdLCJmaWxlIjoiYWRkX2xvYW4uanMifQ==
