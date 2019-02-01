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
	
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjYXJkX3N1YnNjcmliZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIEZvY3VzIGUgQnV0dG9uICoqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAvL0NyZWF6aW9uaSBib3R0b25pXHJcbiAgICB2YXIgbGluayA9ICQoXCIub3B6aW9uaSBhXCIpO1xyXG4gICAgbGluay5idXR0b24oKTtcclxuICAgIC8vQ3JlYXppb25lIHRhYnNcclxuICAgIHZhciBzY2hlZGFfZ2xvYmFsID0gJChcIiNzY2hlZGFfZ2xvYmFsXCIpO1xyXG4gICAgc2NoZWRhX2dsb2JhbC50YWJzKCk7XHJcbiAgICAvL0FwZXJ0dXJhIGZpbmVzdHJhIG1lc3NhZ2dpIGRpIGF2dmlzb1xyXG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJhbm5vX3A9XCIpICE9PSAtMSkge1xyXG4gICAgICAgIHNjaGVkYV9nbG9iYWwudGFicyhcIm9wdGlvblwiLFwiYWN0aXZlXCIsMSk7XHJcbiAgICB9XHJcbiAgICAvL0FwZXJ0dXJhIGZpbmVzdHJhIG1lc3NhZ2dpIGRpIGF2dmlzb1xyXG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJpbmZvX3NvY2lvPVwiKSAhPT0gLTEpIHtcclxuICAgICAgICBzY2hlZGFfZ2xvYmFsLnRhYnMoXCJvcHRpb25cIixcImFjdGl2ZVwiLDMpO1xyXG4gICAgfVxyXG4gICAgLy9BcGVydHVyYSBmaW5lc3RyYSBtZXNzYWdnaSBkaSBhdnZpc29cclxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwic29jaW89MVwiKSAhPT0gLTEpIHtcclxuICAgICAgICBzY2hlZGFfZ2xvYmFsLnRhYnMoXCJvcHRpb25cIixcImFjdGl2ZVwiLDMpO1xyXG4gICAgfVxyXG4gICAgdmFyIGlkX3Nvc3Blc287XHJcbi8vICAgIHNjaGVkYV9nbG9iYWwudGFicyggXCJvcHRpb25cIiwgXCJoaWRlXCIsIHsgZWZmZWN0OiBcImZhZGVPdXRcIiwgZHVyYXRpb246IDUwMCB9IClcclxuLy8gICAgc2NoZWRhX2dsb2JhbC50YWJzKCBcIm9wdGlvblwiLCBcInNob3dcIiwgeyBlZmZlY3Q6IFwiZmFkZUluXCIsIGR1cmF0aW9uOiA1MDAgfSApXHJcbiAgICAvL1NldHRhZ2dpbyBvcHppb25pIGZpbmVzdHJlIGRpIGF2dmlzb1xyXG4gICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgYXV0b09wZW46IHRydWUsXHJcbiAgICAgICAgY2xvc2VUZXh0OiBcIkNoaXVkaVwiLFxyXG4gICAgICAgIHNob3c6IDUwMCxcclxuICAgICAgICBoaWRlOiA1MDAsXHJcbiAgICAgICAgdGl0bGU6IFwiQXZ2aXNvXCIsXHJcbiAgICAgICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgICAgICBidXR0b25zOiB7XHJcbiAgICAgICAgICAgIE9rOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vQXBlcnR1cmEgZmluZXN0cmEgZGkgYXZ2aXNvXHJcbiAgICB2YXIgc29zcCA9ICQoXCIjc29zcGVzb1wiKS5lcSgwKTtcclxuICAgIHNvc3AgPSBzb3NwLnRleHQoKS5zcGxpdChcIjpcIik7XHJcbiAgICBpZihzb3NwWzFdLnNlYXJjaChcIllcIikgIT09IC0xKSB7XHJcbiAgICAgICAgJChcIiN5ZXNfc29zcGVzb1wiKS5kaWFsb2cob3B0aW9ucyk7XHJcbiAgICAgICAgJChcIiN5ZXNfc29zcGVzb1wiKS5kaWFsb2coXCJvcGVuXCIpO1xyXG4gICAgfVx0XHJcbiAgICB2YXIgcHJpdiA9ICQoXCIjcHJpdmFjeVwiKS5lcSgwKTtcclxuICAgIHByaXYgPSBwcml2LnRleHQoKS5zcGxpdChcIjpcIik7XHJcbiAgICBpZihwcml2WzFdLnNlYXJjaChcIk5cIikgIT09IC0xKSB7XHJcbiAgICAgICAgJChcIiNub19wcml2YWN5XCIpLmRpYWxvZyhvcHRpb25zKTtcclxuICAgICAgICAkKFwiI25vX3ByaXZhY3lcIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgIH1cclxuICAgIC8vQXBlcnR1cmEgZmluZXN0cmEgbWVzc2FnZ2kgZGkgYXZ2aXNvIG8gZXJyb3JpXHJcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImVycm9yZVwiKSAhPT0gLTEpIHtcclxuICAgICAgICAkKFwiI2F2dmlzaVwiKS5kaWFsb2cob3B0aW9ucyk7XHJcbiAgICAgICAgJChcIiNhdnZpc2lcIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgIH1cclxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwiZXJyb3JpXCIpICE9IC0xKSB7XHJcbiAgICAgICAgJChcIiNub19wcmVzdGl0b1wiKS5kaWFsb2cob3B0aW9ucyk7XHJcbiAgICAgICAgJChcIiNub19wcmVzdGl0b1wiKS5kaWFsb2coXCJvcGVuXCIpO1xyXG4gICAgfVx0XHJcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcInN1Y2Nlc3NcIikgIT0gLTEpIHtcclxuICAgICAgICAkKFwiI3N1Y2Nlc3NvXCIpLmRpYWxvZyhvcHRpb25zKTtcclxuICAgICAgICAkKFwiI3N1Y2Nlc3NvXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbiAgICB9XHJcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImluZm9fc29jaW9cIikgIT0gLTEpIHtcclxuICAgICAgICAkKFwiI2luZm9fc29jaW9cIikuZGlhbG9nKG9wdGlvbnMpO1xyXG4gICAgICAgICQoXCIjaW5mb19zb2Npb1wiKS5kaWFsb2coXCJvcGVuXCIpO1xyXG4gICAgfVxyXG4gICAgLy9BcGVydHVyYSBmb3JtIHBlciBpbnNlcmltZW50byBtb3RpdmF6aW9uZSBzb3NwZW5zaW9uZVx0XHJcbiAgICB2YXIgZGl2X21vdGl2X3Nvc3AgPSAkKFwiI21vdGl2X3Nvc3BcIik7XHJcbiAgICAkKFwiLm1vdGl2YXppb25lXCIpLmVxKDApLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAkKFwiZGl2LnBvc19idXQgaW5wdXRcIikuYnV0dG9uKCk7XHJcbiAgICAgICAgZGl2X21vdGl2X3Nvc3Auc2hvdyg0MDApO1xyXG4gICAgICAgICQoXCIjbW90aXZhemlvbmVcIikuZm9jdXMoKTtcclxuICAgICAgICBpZF9zb3NwZXNvID0gJCh0aGlzKS5hdHRyKFwiaWRcIik7XHJcbiAgICB9KS5vbihcIm1vdXNlb3ZlclwiLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICQodGhpcykuY3NzKFwiY29sb3JcIixcIiNmMDBcIik7XHJcbiAgICB9KS5vbihcIm1vdXNlb3V0XCIsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAkKHRoaXMpLmNzcyhcImNvbG9yXCIsXCIjYjAwXCIpOyAgICAgICAgICBcclxuICAgIH0pO1x0XHJcbiAgICAvL0NoaWFtYXRhIEFKQVggcGVyIGluc2VyaW1lbnRvIG1vdGl2YXppb25lIHNvc3BlbnNpb25lIG5lbCBkYXRhYmFzZVxyXG4gICAgdmFyIGRhdGE7XHJcbiAgICAkKFwiI2ludmlhX21vdFwiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIG1vdCA9ICQoXCIjbW90aXZhemlvbmVcIikudmFsKCk7XHJcbiAgICAgICAgdmFyIHVybCA9IFwiLi9pbmNsdWRlLXBocC9jb250ZW50X2dsb2JhbC5waHA/dGlwbz1tb3RpdmF6aW9uZSZtb3RpdmF6aW9uZT1cIitlbmNvZGVVUklDb21wb25lbnQobW90KStcIiZpZF9zb3NwZXNvPVwiK2lkX3Nvc3Blc287XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGRpdl9tb3Rpdl9zb3NwLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSAnLi9jYXJkX3N1YnNjcmliZXIucGhwP2lkX2lzY3JpdHRvPScraXNjcml0dG8rJyZwPTEmdHI9JnN1Y2Nlc3M9JytlbmNvZGVVUklDb21wb25lbnQoXCJNT1RJVkFaSU9ORSBTT1NQRU5TSU9ORSBJTlNFUklUQSBDT1JSRVRUQU1FTlRFXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIC8vTmFzY29uZG8gaWwgZm9ybSBtb3RpdmF6aW9uZSBzb3NwZW5zaW9uZVxyXG4gICAgc2NoZWRhX2dsb2JhbC5maW5kKFwiYVwiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtcclxuICAgICAgICBkaXZfbW90aXZfc29zcC5oaWRlKCk7XHJcbiAgICB9KTtcclxuICAgIC8vTWVzc2FnZ2lvIGRpIEF2dmlzbyBuZWwgY2FzbyBkaSBFbGltaW5hemlvbmUgUHJlc3RpdG9cclxuICAgICQoXCIuZWxpbWluYVwiKS5lYWNoKGZ1bmN0aW9uKGksdil7XHJcbiAgICAgICAgJCh0aGlzKS5vbignY2xpY2snLGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICAgICAgICAgIHZhciBwcmVzdGl0byA9IGNvbmZpcm0oJ1NlaSBzaWN1cm8gZGkgdm9sZXIgRUxJTUlOQVJFIFFVRVNUTyBQUkVTVElUTz8nKTtcclxuICAgICAgICAgICAgICAgIGlmKHByZXN0aXRvID09PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoJ2hyZWYnLCcjJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHRcclxuICAgIH0pO1xyXG4gICAgLy9TZSBjbGljayBzdSBidXR0b24gdmVkaSBkYXRpIHR1dG9yZSBhcHJvIGlsIGJveCBwZXIgdmlzdWFsaXp6YXJlIGkgZGF0aSBhbHRyaW1lbnRpIGxvIGNoaXVkb1xyXG4gICAgdmFyIGJ1dHRvbl90dXRvcmUgPSAkKFwiI3Zfbl90dXRvcmVcIik7XHJcbiAgICB2YXIgZGl2X3R1dG9yZSA9ICQoXCIjZGl2X3R1dG9yZVwiKTtcclxuICAgIGJ1dHRvbl90dXRvcmUub24oXCJjbGlja1wiLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGlmKGJ1dHRvbl90dXRvcmUudGV4dCgpID09PSBcIlZlZGkgRGF0aSBUdXRvcmVcIikge1xyXG4gICAgICAgICAgICBkaXZfdHV0b3JlLnNsaWRlRG93big2MDApO1xyXG4gICAgICAgICAgICBidXR0b25fdHV0b3JlLmh0bWwoXCI8c3BhbiBjbGFzcz1cXFwidWktYnV0dG9uLXRleHRcXFwiPk5hc2NvbmRpIERhdGkgVHV0b3JlPC9zcGFuPlwiKTtcclxuICAgICAgICAgICAgYnV0dG9uX3R1dG9yZS5ibHVyKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmKGJ1dHRvbl90dXRvcmUudGV4dCgpID09PSBcIk5hc2NvbmRpIERhdGkgVHV0b3JlXCIpIHtcclxuICAgICAgICAgICAgZGl2X3R1dG9yZS5zbGlkZVVwKDYwMCk7XHJcbiAgICAgICAgICAgIGJ1dHRvbl90dXRvcmUuaHRtbChcIjxzcGFuIGNsYXNzPVxcXCJ1aS1idXR0b24tdGV4dFxcXCI+VmVkaSBEYXRpIFR1dG9yZTwvc3Bhbj5cIik7XHRcdFxyXG4gICAgICAgICAgICBidXR0b25fdHV0b3JlLmJsdXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vSW5zZXJpbWVudG8gc29jaW9cclxuICAgIHZhciBidXR0b25fc29jaW8gPSAkKFwiI2J1dHRvbl9zb2Npb1wiKTtcclxuICAgIHZhciBkaXZfc29jaW8gPSAkKFwiI2luc19zb2Npb1wiKTtcclxuICAgIHZhciBpc2NyaXR0byA9ICQoXCIjY29kX2lzY3JpdHRvXCIpLnZhbCgpO1xyXG4gICAgYnV0dG9uX3NvY2lvLm9uKFwiY2xpY2tcIixmdW5jdGlvbihlKXtcclxuICAgICAgICBkaXZfc29jaW8uc2hvdyg0MDApO1xyXG4gICAgICAgICQoXCIjYW5ub19zb2Npb1wiKS5mb2N1cygpO1xyXG4gICAgfSk7XHJcbiAgICAvL0NoaWFtYXRhIEFKQVggcGVyIGluc2VyaW1lbnRvIG1vdGl2YXppb25lIHNvc3BlbnNpb25lIG5lbCBkYXRhYmFzZVxyXG4gICAgJChcIiNpbnZpYV9zb2Npb1wiKS5vbihcImNsaWNrXCIsZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIGFubm8gPSAkKFwiI2Fubm9fc29jaW9cIikudmFsKCk7XHJcbiAgICAgICAgdmFyIHVybCA9IFwiLi90cmFuc19nbG9iYWwucGhwP3N1Ym1pdD1zb2NpbyZhbm5vX3NvY2lvPVwiK2Fubm8rXCImaWRfaXNjcml0dG89XCIraXNjcml0dG87XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiB1cmwsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAndGV4dCcsXHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGRpdl9zb2Npby5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gJy4vY2FyZF9zdWJzY3JpYmVyLnBocD9pZF9pc2NyaXR0bz0nK2lzY3JpdHRvKycmcD0xJnRyPSZpbmZvX3NvY2lvPScrZGF0YVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7XHJcblx0Il0sImZpbGUiOiJjYXJkX3N1YnNjcmliZXIuanMifQ==
