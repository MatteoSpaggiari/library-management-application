// ****************************** Creazione Elementi ***************************//
document.createElement("header");
document.createElement("nav");
document.createElement("footer");
document.createElement("section");
document.createElement("article");
document.createElement("aside");
document.createElement("figure");
document.createElement("figcaption");
document.createElement("hgroup");
document.createElement("time");
document.createElement("progress");
document.createElement("meter");
document.createElement("mark");

$(document).ready(function(){
    //Focus su username
    $("[name=\"autore\"]").focus();
    //Button
    $("#invia")
    .bind("mouseover", function(event) {
        $(this).attr("src","./images/invia_a.png");
    })
    .bind("mouseout", function(event) {
        $(this).attr("src","./images/invia_i.png");
    });
    $("#reset")
    .bind("mouseover", function(event) {
        $(this).css("backgroundImage","url(./images/reset_a.png)");
    })
    .bind("mouseout", function(event) {
        $(this).css("backgroundImage","url(./images/reset_i.png)");
    });
    //Autocompletamento campi autore e titolo
    var url = "./include_php/content_elenco.php?tipo=";
    var data;
    var autore = $("#autore");
    var titolo = $("#titolo");
    autore.on("keyup change", function(event) {
        valore = $(this).val();
        if(titolo.val() !== "") {
            var val2 = titolo.val();
            var url_finale = url+"autore&valore="+valore+"&valore2="+val2
        } else {
            var url_finale = url+"autore&valore="+valore			
        }
        var no_ris = $("#autore_no_ris").eq(0);
        no_ris.css("margin-left","567px");
        $(this).autocomplete({
            source: url_finale,
            autoFocus: true,
            delay: 200,
            minLength: 1,
            select: function( event, ui ) {
                titolo.focus();
            }
        });
    });
    titolo.on("keyup change", function(event) {
        valore = $(this).val();
        if(autore.val() !== "") {
            var val2 = autore.val();
            var url_finale = url+"titolo&valore="+valore+"&valore2="+val2
        } else {
            var url_finale = url+"titolo&valore="+valore			
        }
        var no_ris = $("#titolo_no_ris").eq(0);
        no_ris.css("margin-left","567px");
        $(this).autocomplete({
            source: url_finale,
            autoFocus: true,
            delay: 200,
            minLength: 1,
            select: function( event, ui ) {
                autore.focus();
            }
        });
    });
    $("div.pos_but *").button();
});