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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJlbGVuY28uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIENyZWF6aW9uZSBFbGVtZW50aSAqKioqKioqKioqKioqKioqKioqKioqKioqKiovL1xuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhlYWRlclwiKTtcbmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJuYXZcIik7XG5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9vdGVyXCIpO1xuZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNlY3Rpb25cIik7XG5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYXJ0aWNsZVwiKTtcbmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhc2lkZVwiKTtcbmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmaWd1cmVcIik7XG5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmlnY2FwdGlvblwiKTtcbmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoZ3JvdXBcIik7XG5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGltZVwiKTtcbmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwcm9ncmVzc1wiKTtcbmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtZXRlclwiKTtcbmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJtYXJrXCIpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgIC8vRm9jdXMgc3UgdXNlcm5hbWVcbiAgICAkKFwiW25hbWU9XFxcImF1dG9yZVxcXCJdXCIpLmZvY3VzKCk7XG4gICAgLy9CdXR0b25cbiAgICAkKFwiI2ludmlhXCIpXG4gICAgLmJpbmQoXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgJCh0aGlzKS5hdHRyKFwic3JjXCIsXCIuL2ltYWdlcy9pbnZpYV9hLnBuZ1wiKTtcbiAgICB9KVxuICAgIC5iaW5kKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgJCh0aGlzKS5hdHRyKFwic3JjXCIsXCIuL2ltYWdlcy9pbnZpYV9pLnBuZ1wiKTtcbiAgICB9KTtcbiAgICAkKFwiI3Jlc2V0XCIpXG4gICAgLmJpbmQoXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgJCh0aGlzKS5jc3MoXCJiYWNrZ3JvdW5kSW1hZ2VcIixcInVybCguL2ltYWdlcy9yZXNldF9hLnBuZylcIik7XG4gICAgfSlcbiAgICAuYmluZChcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICQodGhpcykuY3NzKFwiYmFja2dyb3VuZEltYWdlXCIsXCJ1cmwoLi9pbWFnZXMvcmVzZXRfaS5wbmcpXCIpO1xuICAgIH0pO1xuICAgIC8vQXV0b2NvbXBsZXRhbWVudG8gY2FtcGkgYXV0b3JlIGUgdGl0b2xvXG4gICAgdmFyIHVybCA9IFwiLi9pbmNsdWRlX3BocC9jb250ZW50X2VsZW5jby5waHA/dGlwbz1cIjtcbiAgICB2YXIgZGF0YTtcbiAgICB2YXIgYXV0b3JlID0gJChcIiNhdXRvcmVcIik7XG4gICAgdmFyIHRpdG9sbyA9ICQoXCIjdGl0b2xvXCIpO1xuICAgIGF1dG9yZS5vbihcImtleXVwIGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICBpZih0aXRvbG8udmFsKCkgIT09IFwiXCIpIHtcbiAgICAgICAgICAgIHZhciB2YWwyID0gdGl0b2xvLnZhbCgpO1xuICAgICAgICAgICAgdmFyIHVybF9maW5hbGUgPSB1cmwrXCJhdXRvcmUmdmFsb3JlPVwiK3ZhbG9yZStcIiZ2YWxvcmUyPVwiK3ZhbDJcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB1cmxfZmluYWxlID0gdXJsK1wiYXV0b3JlJnZhbG9yZT1cIit2YWxvcmVcdFx0XHRcbiAgICAgICAgfVxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNhdXRvcmVfbm9fcmlzXCIpLmVxKDApO1xuICAgICAgICBub19yaXMuY3NzKFwibWFyZ2luLWxlZnRcIixcIjU2N3B4XCIpO1xuICAgICAgICAkKHRoaXMpLmF1dG9jb21wbGV0ZSh7XG4gICAgICAgICAgICBzb3VyY2U6IHVybF9maW5hbGUsXG4gICAgICAgICAgICBhdXRvRm9jdXM6IHRydWUsXG4gICAgICAgICAgICBkZWxheTogMjAwLFxuICAgICAgICAgICAgbWluTGVuZ3RoOiAxLFxuICAgICAgICAgICAgc2VsZWN0OiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xuICAgICAgICAgICAgICAgIHRpdG9sby5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICB0aXRvbG8ub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgaWYoYXV0b3JlLnZhbCgpICE9PSBcIlwiKSB7XG4gICAgICAgICAgICB2YXIgdmFsMiA9IGF1dG9yZS52YWwoKTtcbiAgICAgICAgICAgIHZhciB1cmxfZmluYWxlID0gdXJsK1widGl0b2xvJnZhbG9yZT1cIit2YWxvcmUrXCImdmFsb3JlMj1cIit2YWwyXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdXJsX2ZpbmFsZSA9IHVybCtcInRpdG9sbyZ2YWxvcmU9XCIrdmFsb3JlXHRcdFx0XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5vX3JpcyA9ICQoXCIjdGl0b2xvX25vX3Jpc1wiKS5lcSgwKTtcbiAgICAgICAgbm9fcmlzLmNzcyhcIm1hcmdpbi1sZWZ0XCIsXCI1NjdweFwiKTtcbiAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoe1xuICAgICAgICAgICAgc291cmNlOiB1cmxfZmluYWxlLFxuICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxuICAgICAgICAgICAgZGVsYXk6IDIwMCxcbiAgICAgICAgICAgIG1pbkxlbmd0aDogMSxcbiAgICAgICAgICAgIHNlbGVjdDogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcbiAgICAgICAgICAgICAgICBhdXRvcmUuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgJChcImRpdi5wb3NfYnV0ICpcIikuYnV0dG9uKCk7XG59KTsiXSwiZmlsZSI6ImVsZW5jby5qcyJ9
