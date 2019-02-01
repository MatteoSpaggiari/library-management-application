$(document).ready(function(){
    //Variabili
    var data_odierna = new Date();
    var anno_attuale = data_odierna.getFullYear();
    //Focus su username
    $("#num_tes").focus();
    $('#data_isc').datepicker({
        altField: '#data_isc',
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
        dateFormat: 'yy-mm-dd',
        minDate: new Date(1980,0,1),
        yearRange: "1980:"+anno_attuale,
        defaultDate: data_odierna,
        showOn: "button"
    });
    //Creazione autocomplete
    //Funzione per visualizzare il messaggio che si tratta di un nuovo elemento
    function no_risposta(data,no_ris) {
        if(data == 0) {
            no_ris.show();
            no_ris.html("Nessuno");
        } else {
            no_ris.hide();
        }
    }
    var data;
    var url = "./include-php/content_global.php?tipo=";
    $("#nome").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#nome_no_ris").eq(0);
        no_ris.css("margin-left","568px");
        $(this).autocomplete({
            source: url+"nome&valore="+valore,
            autoFocus: true,
            delay: 500,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);	
            }
        });
        if(valore === '') {
            no_ris.hide();			
        }
    });
    $("#cognome").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#cognome_no_ris").eq(0);
        $(this).autocomplete({
            source: url+"cognome&valore="+valore,
            autoFocus: true,
            delay: 500,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);	
            }
        });
        if(valore === '') {
            no_ris.hide();			
        }
    });
    $("#professione").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#professione_no_ris").eq(0);
        $(this).autocomplete({
            source: url+"professione&valore="+valore,
            autoFocus: true,
            delay: 500,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);	
            }
        });
        if(valore === '') {
            no_ris.hide();			
        }
    });
    $("#localita").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#localita_no_ris").eq(0);
        $(this).autocomplete({
            source: url+"localita&valore="+valore,
            autoFocus: true,
            delay: 500,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();			
        }
    });
    $("#provincia").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#provincia_no_ris").eq(0);
        $(this).autocomplete({
            source: url+"provincia&valore="+valore,
            autoFocus: true,
            delay: 500,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();			
        }
    });
    $("#cap").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#cap_no_ris").eq(0);
        $(this).autocomplete({
            source: url+"cap&valore="+valore,
            autoFocus: true,
            delay: 500,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
    });
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzZWFyY2hfc3Vic2NyaWJlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgLy9WYXJpYWJpbGlcclxuICAgIHZhciBkYXRhX29kaWVybmEgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdmFyIGFubm9fYXR0dWFsZSA9IGRhdGFfb2RpZXJuYS5nZXRGdWxsWWVhcigpO1xyXG4gICAgLy9Gb2N1cyBzdSB1c2VybmFtZVxyXG4gICAgJChcIiNudW1fdGVzXCIpLmZvY3VzKCk7XHJcbiAgICAkKCcjZGF0YV9pc2MnKS5kYXRlcGlja2VyKHtcclxuICAgICAgICBhbHRGaWVsZDogJyNkYXRhX2lzYycsXHJcbiAgICAgICAgYWx0Rm9ybWF0OiBcInl5LW1tLWRkXCIsXHJcbiAgICAgICAgY2xvc2VUZXh0IDogJ1gnLFxyXG4gICAgICAgIGN1cnJlbnRUZXh0IDogJ05vdycsXHJcbiAgICAgICAgc2VsZWN0T3RoZXJNb250aHMgOiB0cnVlLFxyXG4gICAgICAgIHNob3dPdGhlck1vbnRocyA6IHRydWUsXHJcbiAgICAgICAgc2hvd1dlZWsgOiB0cnVlLFxyXG4gICAgICAgIHdlZWtIZWFkZXIgOiAnV2VlaycsXHJcbiAgICAgICAgYXBwZW5kVGV4dDogJyhhYWFhLW1tLWdnKScsXHJcbiAgICAgICAgYnV0dG9uSW1hZ2U6ICcuL2ltYWdlcy9jYWxlbmRhcmlvLnBuZycsXHJcbiAgICAgICAgYnV0dG9uSW1hZ2VPbmx5OiB0cnVlLFxyXG4gICAgICAgIGNoYW5nZVllYXI6IHRydWUsXHJcbiAgICAgICAgY2hhbmdlTW9udGg6IHRydWUsXHJcbiAgICAgICAgZGF0ZUZvcm1hdDogJ3l5LW1tLWRkJyxcclxuICAgICAgICBtaW5EYXRlOiBuZXcgRGF0ZSgxOTgwLDAsMSksXHJcbiAgICAgICAgeWVhclJhbmdlOiBcIjE5ODA6XCIrYW5ub19hdHR1YWxlLFxyXG4gICAgICAgIGRlZmF1bHREYXRlOiBkYXRhX29kaWVybmEsXHJcbiAgICAgICAgc2hvd09uOiBcImJ1dHRvblwiXHJcbiAgICB9KTtcclxuICAgIC8vQ3JlYXppb25lIGF1dG9jb21wbGV0ZVxyXG4gICAgLy9GdW56aW9uZSBwZXIgdmlzdWFsaXp6YXJlIGlsIG1lc3NhZ2dpbyBjaGUgc2kgdHJhdHRhIGRpIHVuIG51b3ZvIGVsZW1lbnRvXHJcbiAgICBmdW5jdGlvbiBub19yaXNwb3N0YShkYXRhLG5vX3Jpcykge1xyXG4gICAgICAgIGlmKGRhdGEgPT0gMCkge1xyXG4gICAgICAgICAgICBub19yaXMuc2hvdygpO1xyXG4gICAgICAgICAgICBub19yaXMuaHRtbChcIk5lc3N1bm9cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbm9fcmlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB2YXIgZGF0YTtcclxuICAgIHZhciB1cmwgPSBcIi4vaW5jbHVkZS1waHAvY29udGVudF9nbG9iYWwucGhwP3RpcG89XCI7XHJcbiAgICAkKFwiI25vbWVcIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNub21lX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICBub19yaXMuY3NzKFwibWFyZ2luLWxlZnRcIixcIjU2OHB4XCIpO1xyXG4gICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgc291cmNlOiB1cmwrXCJub21lJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDUwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodmFsb3JlID09PSAnJykge1xyXG4gICAgICAgICAgICBub19yaXMuaGlkZSgpO1x0XHRcdFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChcIiNjb2dub21lXCIpLm9uKFwia2V5dXAgY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHZhbG9yZSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgdmFyIG5vX3JpcyA9ICQoXCIjY29nbm9tZV9ub19yaXNcIikuZXEoMCk7XHJcbiAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHVybCtcImNvZ25vbWUmdmFsb3JlPVwiK3ZhbG9yZSxcclxuICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWxheTogNTAwLFxyXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgICAgICAgbm9fcmlzcG9zdGEodWkuY29udGVudCxub19yaXMpO1x0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih2YWxvcmUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHRcdFx0XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKFwiI3Byb2Zlc3Npb25lXCIpLm9uKFwia2V5dXAgY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHZhbG9yZSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgdmFyIG5vX3JpcyA9ICQoXCIjcHJvZmVzc2lvbmVfbm9fcmlzXCIpLmVxKDApO1xyXG4gICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgc291cmNlOiB1cmwrXCJwcm9mZXNzaW9uZSZ2YWxvcmU9XCIrdmFsb3JlLFxyXG4gICAgICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgICAgICAgIGRlbGF5OiA1MDAsXHJcbiAgICAgICAgICAgIG1pbkxlbmd0aDogMixcclxuICAgICAgICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHJcbiAgICAgICAgICAgICAgICBub19yaXNwb3N0YSh1aS5jb250ZW50LG5vX3Jpcyk7XHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHZhbG9yZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgbm9fcmlzLmhpZGUoKTtcdFx0XHRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoXCIjbG9jYWxpdGFcIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNsb2NhbGl0YV9ub19yaXNcIikuZXEoMCk7XHJcbiAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHVybCtcImxvY2FsaXRhJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDUwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHZhbG9yZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgbm9fcmlzLmhpZGUoKTtcdFx0XHRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoXCIjcHJvdmluY2lhXCIpLm9uKFwia2V5dXAgY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHZhbG9yZSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgdmFyIG5vX3JpcyA9ICQoXCIjcHJvdmluY2lhX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICAkKHRoaXMpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIHNvdXJjZTogdXJsK1wicHJvdmluY2lhJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDUwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHZhbG9yZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgbm9fcmlzLmhpZGUoKTtcdFx0XHRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoXCIjY2FwXCIpLm9uKFwia2V5dXAgY2hhbmdlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHZhbG9yZSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAgICAgdmFyIG5vX3JpcyA9ICQoXCIjY2FwX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICAkKHRoaXMpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIHNvdXJjZTogdXJsK1wiY2FwJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDUwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pOyJdLCJmaWxlIjoic2VhcmNoX3N1YnNjcmliZXIuanMifQ==
