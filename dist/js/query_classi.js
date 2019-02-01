$(document).ready(function(){
    var form = $("#iscritti_per_classe");
    var input = $(":input");
    var classi = input.filter(":text");
    classi.eq(0).val("0");
    classi.eq(0).attr("disabled","disabled");
    classi.eq(1).focus();
    classi.eq(1).on("blur",function(e){
        if($(this).val() != "") {
            if(new RegExp("^[0-9]+$").test($(this).val()) === false){
                $(this).val("");
                alert("E' possibile inserire solo numeri interi positivi.");
            } else {		
                var valore = parseInt($(this).val())+1;
                classi.eq(2).val(valore);
                classi.eq(2).attr("disabled","disabled");
                classi.eq(3).focus();
            }
        }
    });
    classi.each(function(i,v){
        classi.eq(i+2).on("focus",function(e){
            if(classi.eq(i+1).val() == "") {
                classi.eq(i+1).focus();
                exit();
            }
        });
        classi.eq(i+3).on("blur",function(e){
            if($(this).val() != "") {
                if(new RegExp("^[0-9]+$").test($(this).val()) === false){
                    $(this).val("");
                    alert("E' possibile inserire solo numeri.");
                    exit();
                } else if(parseInt($(this).val()) < parseInt(classi.eq(i+2).val())) {
                    $(this).val("");
                    alert("Hai inserito un valore inferiore rispetto alla casella precedente.");
                    exit();
                } else {			
                    if((typeof parseInt($(this).val()) == "number")) {
                        var valore = parseInt($(this).val())+1;
                        classi.eq(i+4).val(valore);
                        classi.eq(i+4).attr("disabled","disabled");
                        classi.eq(i+5).focus();
                        i = i + 2;
                    }
                }
            }
        });
    });
    form.on("submit",function(e){
        classi.each(function(i,v){
            if($(this).attr('disabled') == "disabled") {
                $(this).removeAttr('disabled');
            }
        });
    });
    //Se c'è il form tolgo il bottone stampa
    if(form.get(0) != undefined) {
        $('#stampa').hide();
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJxdWVyeV9jbGFzc2kuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcbiAgICB2YXIgZm9ybSA9ICQoXCIjaXNjcml0dGlfcGVyX2NsYXNzZVwiKTtcbiAgICB2YXIgaW5wdXQgPSAkKFwiOmlucHV0XCIpO1xuICAgIHZhciBjbGFzc2kgPSBpbnB1dC5maWx0ZXIoXCI6dGV4dFwiKTtcbiAgICBjbGFzc2kuZXEoMCkudmFsKFwiMFwiKTtcbiAgICBjbGFzc2kuZXEoMCkuYXR0cihcImRpc2FibGVkXCIsXCJkaXNhYmxlZFwiKTtcbiAgICBjbGFzc2kuZXEoMSkuZm9jdXMoKTtcbiAgICBjbGFzc2kuZXEoMSkub24oXCJibHVyXCIsZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKCQodGhpcykudmFsKCkgIT0gXCJcIikge1xuICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05XSskXCIpLnRlc3QoJCh0aGlzKS52YWwoKSkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbChcIlwiKTtcbiAgICAgICAgICAgICAgICBhbGVydChcIkUnIHBvc3NpYmlsZSBpbnNlcmlyZSBzb2xvIG51bWVyaSBpbnRlcmkgcG9zaXRpdmkuXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcdFx0XG4gICAgICAgICAgICAgICAgdmFyIHZhbG9yZSA9IHBhcnNlSW50KCQodGhpcykudmFsKCkpKzE7XG4gICAgICAgICAgICAgICAgY2xhc3NpLmVxKDIpLnZhbCh2YWxvcmUpO1xuICAgICAgICAgICAgICAgIGNsYXNzaS5lcSgyKS5hdHRyKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgICAgIGNsYXNzaS5lcSgzKS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgY2xhc3NpLmVhY2goZnVuY3Rpb24oaSx2KXtcbiAgICAgICAgY2xhc3NpLmVxKGkrMikub24oXCJmb2N1c1wiLGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoY2xhc3NpLmVxKGkrMSkudmFsKCkgPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGNsYXNzaS5lcShpKzEpLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgZXhpdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY2xhc3NpLmVxKGkrMykub24oXCJibHVyXCIsZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICBpZigkKHRoaXMpLnZhbCgpICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTldKyRcIikudGVzdCgkKHRoaXMpLnZhbCgpKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnZhbChcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJFJyBwb3NzaWJpbGUgaW5zZXJpcmUgc29sbyBudW1lcmkuXCIpO1xuICAgICAgICAgICAgICAgICAgICBleGl0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHBhcnNlSW50KCQodGhpcykudmFsKCkpIDwgcGFyc2VJbnQoY2xhc3NpLmVxKGkrMikudmFsKCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykudmFsKFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgaW5mZXJpb3JlIHJpc3BldHRvIGFsbGEgY2FzZWxsYSBwcmVjZWRlbnRlLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgZXhpdCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHRcdFx0XG4gICAgICAgICAgICAgICAgICAgIGlmKCh0eXBlb2YgcGFyc2VJbnQoJCh0aGlzKS52YWwoKSkgPT0gXCJudW1iZXJcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWxvcmUgPSBwYXJzZUludCgkKHRoaXMpLnZhbCgpKSsxO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NpLmVxKGkrNCkudmFsKHZhbG9yZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc2kuZXEoaSs0KS5hdHRyKFwiZGlzYWJsZWRcIixcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NpLmVxKGkrNSkuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBpICsgMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgZm9ybS5vbihcInN1Ym1pdFwiLGZ1bmN0aW9uKGUpe1xuICAgICAgICBjbGFzc2kuZWFjaChmdW5jdGlvbihpLHYpe1xuICAgICAgICAgICAgaWYoJCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcpID09IFwiZGlzYWJsZWRcIikge1xuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgLy9TZSBjJ8OoIGlsIGZvcm0gdG9sZ28gaWwgYm90dG9uZSBzdGFtcGFcbiAgICBpZihmb3JtLmdldCgwKSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgJCgnI3N0YW1wYScpLmhpZGUoKTtcbiAgICB9O1xufSk7Il0sImZpbGUiOiJxdWVyeV9jbGFzc2kuanMifQ==
