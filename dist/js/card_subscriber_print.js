// ****************************** Focus e Button ***************************//
$(document).ready(function(){
    //Accordion per il Menù
    $("#accordion").hide();
    $("#stampa").on("click",function(e){
        print();
    });
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
    if(location.search.indexOf("successo") != -1) {
        $("#successo").dialog(options);
        $("#successo").dialog("open");
    }
});
	
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjYXJkX3N1YnNjcmliZXJfcHJpbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIEZvY3VzIGUgQnV0dG9uICoqKioqKioqKioqKioqKioqKioqKioqKioqKi8vXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAvL0FjY29yZGlvbiBwZXIgaWwgTWVuw7lcclxuICAgICQoXCIjYWNjb3JkaW9uXCIpLmhpZGUoKTtcclxuICAgICQoXCIjc3RhbXBhXCIpLm9uKFwiY2xpY2tcIixmdW5jdGlvbihlKXtcclxuICAgICAgICBwcmludCgpO1xyXG4gICAgfSk7XHJcbiAgICAvL1NldHRhZ2dpbyBvcHppb25pIGZpbmVzdHJlIGRpIGF2dmlzb1xyXG4gICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgbW9kYWw6IHRydWUsXHJcbiAgICAgICAgYXV0b09wZW46IHRydWUsXHJcbiAgICAgICAgY2xvc2VUZXh0OiBcIkNoaXVkaVwiLFxyXG4gICAgICAgIHNob3c6IDUwMCxcclxuICAgICAgICBoaWRlOiA1MDAsXHJcbiAgICAgICAgdGl0bGU6IFwiQXZ2aXNvXCIsXHJcbiAgICAgICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgICAgICBidXR0b25zOiB7XHJcbiAgICAgICAgICAgIE9rOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgLy9BcGVydHVyYSBmaW5lc3RyYSBkaSBhdnZpc29cclxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwic3VjY2Vzc29cIikgIT0gLTEpIHtcclxuICAgICAgICAkKFwiI3N1Y2Nlc3NvXCIpLmRpYWxvZyhvcHRpb25zKTtcclxuICAgICAgICAkKFwiI3N1Y2Nlc3NvXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbiAgICB9XHJcbn0pO1xyXG5cdCJdLCJmaWxlIjoiY2FyZF9zdWJzY3JpYmVyX3ByaW50LmpzIn0=
