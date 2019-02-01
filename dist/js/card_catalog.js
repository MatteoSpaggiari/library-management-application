// ****************************** Focus e Button ***************************//
$(document).ready(function(){
    var link = $(".opzioni a");
    link.button();
    $("#scheda_global").tabs();
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
    //Apertura finestra di errore
    if(location.search.indexOf("success") != -1) {
        $("#successo").dialog(options,{title: "Successo"});
        $("#successo").dialog("open");
    }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjYXJkX2NhdGFsb2cuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIEZvY3VzIGUgQnV0dG9uICoqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICB2YXIgbGluayA9ICQoXCIub3B6aW9uaSBhXCIpO1xyXG4gICAgbGluay5idXR0b24oKTtcclxuICAgICQoXCIjc2NoZWRhX2dsb2JhbFwiKS50YWJzKCk7XHJcbiAgICAvL1NldHRhZ2dpbyBvcHppb25pIGZpbmVzdHJlIGRpIGF2dmlzb1xyXG4gICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgYXV0b09wZW46IHRydWUsXHJcbiAgICAgICAgY2xvc2VUZXh0OiBcIkNoaXVkaVwiLFxyXG4gICAgICAgIHNob3c6IDUwMCxcclxuICAgICAgICBoaWRlOiA1MDAsXHJcbiAgICAgICAgdGl0bGU6IFwiQXZ2aXNvXCIsXHJcbiAgICAgICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgICAgICBidXR0b25zOiB7XHJcbiAgICAgICAgICAgIE9rOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9BcGVydHVyYSBmaW5lc3RyYSBkaSBlcnJvcmVcclxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwic3VjY2Vzc1wiKSAhPSAtMSkge1xyXG4gICAgICAgICQoXCIjc3VjY2Vzc29cIikuZGlhbG9nKG9wdGlvbnMse3RpdGxlOiBcIlN1Y2Nlc3NvXCJ9KTtcclxuICAgICAgICAkKFwiI3N1Y2Nlc3NvXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbiAgICB9XHJcbn0pOyJdLCJmaWxlIjoiY2FyZF9jYXRhbG9nLmpzIn0=
