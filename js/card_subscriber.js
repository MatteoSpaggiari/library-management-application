// ****************************** Focus e Button ***************************//
$(document).ready(function(){
    //Creazioni bottoni
    var link = $(".opzioni a");
    link.button();
    //Creazione tabs
    var scheda_global = $("#scheda_global");
    scheda_global.tabs();
    //Apertura finestra messaggi di avviso
    if(location.search.indexOf("anno_p=") !== -1) {
        scheda_global.tabs("option","active",1);
    }
    //Apertura finestra messaggi di avviso
    if(location.search.indexOf("info_socio=") !== -1) {
        scheda_global.tabs("option","active",3);
    }
    //Apertura finestra messaggi di avviso
    if(location.search.indexOf("socio=1") !== -1) {
        scheda_global.tabs("option","active",3);
    }
    var id_sospeso;
//    scheda_global.tabs( "option", "hide", { effect: "fadeOut", duration: 500 } )
//    scheda_global.tabs( "option", "show", { effect: "fadeIn", duration: 500 } )
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
    var sosp = $("#sospeso").eq(0);
    sosp = sosp.text().split(":");
    if(sosp[1].search("Y") !== -1) {
        $("#yes_sospeso").dialog(options);
        $("#yes_sospeso").dialog("open");
    }	
    var priv = $("#privacy").eq(0);
    priv = priv.text().split(":");
    if(priv[1].search("N") !== -1) {
        $("#no_privacy").dialog(options);
        $("#no_privacy").dialog("open");
    }
    //Apertura finestra messaggi di avviso o errori
    if(location.search.indexOf("errore") !== -1) {
        $("#avvisi").dialog(options);
        $("#avvisi").dialog("open");
    }
    if(location.search.indexOf("errori") != -1) {
        $("#no_prestito").dialog(options);
        $("#no_prestito").dialog("open");
    }	
    if(location.search.indexOf("success") != -1) {
        $("#successo").dialog(options);
        $("#successo").dialog("open");
    }
    if(location.search.indexOf("info_socio") != -1) {
        $("#info_socio").dialog(options);
        $("#info_socio").dialog("open");
    }
    //Apertura form per inserimento motivazione sospensione	
    var div_motiv_sosp = $("#motiv_sosp");
    $(".motivazione").eq(0).on("click", function(event) {
        $("div.pos_but input").button();
        div_motiv_sosp.show(400);
        $("#motivazione").focus();
        id_sospeso = $(this).attr("id");
    }).on("mouseover",function(e){
        $(this).css("color","#f00");
    }).on("mouseout",function(e){
          $(this).css("color","#b00");          
    });	
    //Chiamata AJAX per inserimento motivazione sospensione nel database
    var data;
    $("#invia_mot").on("click",function(event){
        event.preventDefault();
        var mot = $("#motivazione").val();
        var url = "./include-php/content_global.php?tipo=motivazione&motivazione="+encodeURIComponent(mot)+"&id_sospeso="+id_sospeso;
        $.ajax({
            url: url,
            dataType: 'text',
            data: data,
            success: function(data) {
                div_motiv_sosp.hide();
                location.href = './card_subscriber.php?id_iscritto='+iscritto+'&p=1&tr=&success='+encodeURIComponent("MOTIVAZIONE SOSPENSIONE INSERITA CORRETTAMENTE");
            }
        });
    });
    //Nascondo il form motivazione sospensione
    scheda_global.find("a").on("click",function(){
        div_motiv_sosp.hide();
    });
    //Messaggio di Avviso nel caso di Eliminazione Prestito
    $(".elimina").each(function(i,v){
        $(this).on('click',function(event){
                var prestito = confirm('Sei sicuro di voler ELIMINARE QUESTO PRESTITO?');
                if(prestito === false) {
                        event.preventDefault();
                        $(this).attr('href','#');
                }
        });	
    });
    //Se click su button vedi dati tutore apro il box per visualizzare i dati altrimenti lo chiudo
    var button_tutore = $("#v_n_tutore");
    var div_tutore = $("#div_tutore");
    button_tutore.on("click",function(e){
        if(button_tutore.text() === "Vedi Dati Tutore") {
            div_tutore.slideDown(600);
            button_tutore.html("<span class=\"ui-button-text\">Nascondi Dati Tutore</span>");
            button_tutore.blur();
        } else if(button_tutore.text() === "Nascondi Dati Tutore") {
            div_tutore.slideUp(600);
            button_tutore.html("<span class=\"ui-button-text\">Vedi Dati Tutore</span>");		
            button_tutore.blur();
        }
    });
    //Inserimento socio
    var button_socio = $("#button_socio");
    var div_socio = $("#ins_socio");
    var iscritto = $("#cod_iscritto").val();
    button_socio.on("click",function(e){
        div_socio.show(400);
        $("#anno_socio").focus();
    });
    //Chiamata AJAX per inserimento motivazione sospensione nel database
    $("#invia_socio").on("click",function(event){
        event.preventDefault();
        var anno = $("#anno_socio").val();
        var url = "./trans_global.php?submit=socio&anno_socio="+anno+"&id_iscritto="+iscritto;
        $.ajax({
            url: url,
            dataType: 'text',
            data: data,
            success: function(data) {
                div_socio.hide();
                location.href = './card_subscriber.php?id_iscritto='+iscritto+'&p=1&tr=&info_socio='+data
            }
        });
    });
});
	