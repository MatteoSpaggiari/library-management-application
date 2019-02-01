$(document).ready(function(){
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
    //Creazione calendario
    var data_odierna = new Date();
    var anno_attuale = data_odierna.getFullYear();
    $('#data_c').datepicker({
        altField: '#data_c',
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
    });
    var data;
    var check;
    $("#num_inv").on("focus active", function(event) {
        check = $("input[name='proprieta']:checked").val();
        if(check == undefined) {
            $("input[name='proprieta']").focus();
            $("#no_proprieta").dialog("open");
        }
    });
    $("input[name='proprieta']").on("change", function(event){
        $("#num_inv").focus();		
    })
	
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
    var url = "./include-php/content_global.php?tipo=";
    $("#dewey").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#dewey_no_ris").eq(0);
        no_ris.css("margin-left","356px");
        $(this).autocomplete({
            source: url+"dewey&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);	
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#titolo").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#titolo_no_ris").eq(0);
        no_ris.css("margin-left","567px");
        $(this).autocomplete({
            source: url+"titolo&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);	
            }
        });	
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#autore").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#autore_no_ris").eq(0);
        no_ris.css("margin-left","567px");
        $(this).autocomplete({
            source: url+"autore&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);	
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#genere").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#genere_no_ris").eq(0);
        no_ris.css("margin-left","567px");
        $(this).autocomplete({
            source: url+"genere&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#editore").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#editore_no_ris").eq(0);
        no_ris.css("margin-left","567px");
        $(this).autocomplete({
            source: url+"editore&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#collana").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#collana_no_ris").eq(0);
        no_ris.css("margin-left","567px");
        $(this).autocomplete({
            source: url+"collana&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#scaffale").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#scaffale_no_ris").eq(0);
        no_ris.css("margin-left","336px");
        $(this).autocomplete({
            source: url+"scaffale&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 1,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#formato").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#formato_no_ris").eq(0);
        no_ris.css("margin-left","336px");
        $(this).autocomplete({
            source: url+"formato&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
    $("#nazione").on("keyup change", function(event) {
        var valore = $(this).val();
        var no_ris = $("#nazione_no_ris").eq(0);
        no_ris.css("margin-left","567px");
        $(this).autocomplete({
            source: url+"nazione&valore="+valore,
            autoFocus: true,
            delay: 300,
            minLength: 2,
            response: function( event, ui ) {
                no_risposta(ui.content,no_ris);
            }
        });
        if(valore === '') {
            no_ris.hide();
        }
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzZWFyY2hfY2F0YWxvZy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgJChcIiNub19wcm9wcmlldGFcIikuZGlhbG9nKHtcclxuICAgICAgICBtb2RhbDogdHJ1ZSxcclxuICAgICAgICBhdXRvT3BlbjogZmFsc2UsXHJcbiAgICAgICAgY2xvc2VUZXh0OiBcIkNoaXVkaVwiLFxyXG4gICAgICAgIHNob3c6IDUwMCxcclxuICAgICAgICBoaWRlOiA1MDAsXHJcbiAgICAgICAgdGl0bGU6IFwiQXZ2aXNvXCIsXHJcbiAgICAgICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgICAgICBidXR0b25zOiB7XHJcbiAgICAgICAgICAgIE9rOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZGlhbG9nKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vQ3JlYXppb25lIGNhbGVuZGFyaW9cclxuICAgIHZhciBkYXRhX29kaWVybmEgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdmFyIGFubm9fYXR0dWFsZSA9IGRhdGFfb2RpZXJuYS5nZXRGdWxsWWVhcigpO1xyXG4gICAgJCgnI2RhdGFfYycpLmRhdGVwaWNrZXIoe1xyXG4gICAgICAgIGFsdEZpZWxkOiAnI2RhdGFfYycsXHJcbiAgICAgICAgYWx0Rm9ybWF0OiBcInl5LW1tLWRkXCIsXHJcbiAgICAgICAgY2xvc2VUZXh0IDogJ1gnLFxyXG4gICAgICAgIHNob3dPbiA6ICdidXR0b24nLFxyXG4gICAgICAgIGN1cnJlbnRUZXh0IDogJ05vdycsXHJcbiAgICAgICAgc2VsZWN0T3RoZXJNb250aHMgOiB0cnVlLFxyXG4gICAgICAgIHNob3dPdGhlck1vbnRocyA6IHRydWUsXHJcbiAgICAgICAgc2hvd1dlZWsgOiB0cnVlLFxyXG4gICAgICAgIHdlZWtIZWFkZXIgOiAnV2VlaycsXHJcbiAgICAgICAgYXBwZW5kVGV4dDogJyhhYWFhLW1tLWdnKScsXHJcbiAgICAgICAgYnV0dG9uSW1hZ2U6ICcuL2ltYWdlcy9jYWxlbmRhcmlvLnBuZycsXHJcbiAgICAgICAgYnV0dG9uSW1hZ2VPbmx5OiB0cnVlLFxyXG4gICAgICAgIGNoYW5nZVllYXI6IHRydWUsXHJcbiAgICAgICAgY2hhbmdlTW9udGg6IHRydWUsXHJcbiAgICAgICAgZGF0ZUZvcm1hdDogJ3l5LW1tLWRkJyxcclxuICAgICAgICBtaW5EYXRlOiBuZXcgRGF0ZSgxOTgwLDAsMSksXHJcbiAgICAgICAgeWVhclJhbmdlOiBcIjE5ODA6XCIrYW5ub19hdHR1YWxlLFxyXG4gICAgICAgIGRlZmF1bHREYXRlOiBkYXRhX29kaWVybmEsXHJcbiAgICB9KTtcclxuICAgIHZhciBkYXRhO1xyXG4gICAgdmFyIGNoZWNrO1xyXG4gICAgJChcIiNudW1faW52XCIpLm9uKFwiZm9jdXMgYWN0aXZlXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgICAgY2hlY2sgPSAkKFwiaW5wdXRbbmFtZT0ncHJvcHJpZXRhJ106Y2hlY2tlZFwiKS52YWwoKTtcclxuICAgICAgICBpZihjaGVjayA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgJChcImlucHV0W25hbWU9J3Byb3ByaWV0YSddXCIpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgICQoXCIjbm9fcHJvcHJpZXRhXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKFwiaW5wdXRbbmFtZT0ncHJvcHJpZXRhJ11cIikub24oXCJjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgICQoXCIjbnVtX2ludlwiKS5mb2N1cygpO1x0XHRcclxuICAgIH0pXHJcblx0XHJcbiAgICAvL0NyZWF6aW9uZSBhdXRvY29tcGxldGVcclxuICAgIC8vRnVuemlvbmUgcGVyIHZpc3VhbGl6emFyZSBpbCBtZXNzYWdnaW8gY2hlIHNpIHRyYXR0YSBkaSB1biBudW92byBlbGVtZW50b1xyXG4gICAgZnVuY3Rpb24gbm9fcmlzcG9zdGEoZGF0YSxub19yaXMpIHtcclxuICAgICAgICBpZihkYXRhID09IDApIHtcclxuICAgICAgICAgICAgbm9fcmlzLnNob3coKTtcclxuICAgICAgICAgICAgbm9fcmlzLmh0bWwoXCJOZXNzdW5vXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIHVybCA9IFwiLi9pbmNsdWRlLXBocC9jb250ZW50X2dsb2JhbC5waHA/dGlwbz1cIjtcclxuICAgICQoXCIjZGV3ZXlcIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNkZXdleV9ub19yaXNcIikuZXEoMCk7XHJcbiAgICAgICAgbm9fcmlzLmNzcyhcIm1hcmdpbi1sZWZ0XCIsXCIzNTZweFwiKTtcclxuICAgICAgICAkKHRoaXMpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIHNvdXJjZTogdXJsK1wiZGV3ZXkmdmFsb3JlPVwiK3ZhbG9yZSxcclxuICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWxheTogMzAwLFxyXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgICAgICAgbm9fcmlzcG9zdGEodWkuY29udGVudCxub19yaXMpO1x0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih2YWxvcmUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKFwiI3RpdG9sb1wiKS5vbihcImtleXVwIGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgIHZhciBub19yaXMgPSAkKFwiI3RpdG9sb19ub19yaXNcIikuZXEoMCk7XHJcbiAgICAgICAgbm9fcmlzLmNzcyhcIm1hcmdpbi1sZWZ0XCIsXCI1NjdweFwiKTtcclxuICAgICAgICAkKHRoaXMpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIHNvdXJjZTogdXJsK1widGl0b2xvJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHRcclxuICAgICAgICBpZih2YWxvcmUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKFwiI2F1dG9yZVwiKS5vbihcImtleXVwIGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgIHZhciBub19yaXMgPSAkKFwiI2F1dG9yZV9ub19yaXNcIikuZXEoMCk7XHJcbiAgICAgICAgbm9fcmlzLmNzcyhcIm1hcmdpbi1sZWZ0XCIsXCI1NjdweFwiKTtcclxuICAgICAgICAkKHRoaXMpLmF1dG9jb21wbGV0ZSh7XHJcbiAgICAgICAgICAgIHNvdXJjZTogdXJsK1wiYXV0b3JlJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodmFsb3JlID09PSAnJykge1xyXG4gICAgICAgICAgICBub19yaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChcIiNnZW5lcmVcIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNnZW5lcmVfbm9fcmlzXCIpLmVxKDApO1xyXG4gICAgICAgIG5vX3Jpcy5jc3MoXCJtYXJnaW4tbGVmdFwiLFwiNTY3cHhcIik7XHJcbiAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHVybCtcImdlbmVyZSZ2YWxvcmU9XCIrdmFsb3JlLFxyXG4gICAgICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgICAgICAgIGRlbGF5OiAzMDAsXHJcbiAgICAgICAgICAgIG1pbkxlbmd0aDogMixcclxuICAgICAgICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHJcbiAgICAgICAgICAgICAgICBub19yaXNwb3N0YSh1aS5jb250ZW50LG5vX3Jpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih2YWxvcmUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKFwiI2VkaXRvcmVcIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNlZGl0b3JlX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICBub19yaXMuY3NzKFwibWFyZ2luLWxlZnRcIixcIjU2N3B4XCIpO1xyXG4gICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgc291cmNlOiB1cmwrXCJlZGl0b3JlJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHZhbG9yZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgbm9fcmlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoXCIjY29sbGFuYVwiKS5vbihcImtleXVwIGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgIHZhciBub19yaXMgPSAkKFwiI2NvbGxhbmFfbm9fcmlzXCIpLmVxKDApO1xyXG4gICAgICAgIG5vX3Jpcy5jc3MoXCJtYXJnaW4tbGVmdFwiLFwiNTY3cHhcIik7XHJcbiAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHVybCtcImNvbGxhbmEmdmFsb3JlPVwiK3ZhbG9yZSxcclxuICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWxheTogMzAwLFxyXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgICAgICAgbm9fcmlzcG9zdGEodWkuY29udGVudCxub19yaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodmFsb3JlID09PSAnJykge1xyXG4gICAgICAgICAgICBub19yaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChcIiNzY2FmZmFsZVwiKS5vbihcImtleXVwIGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgIHZhciBub19yaXMgPSAkKFwiI3NjYWZmYWxlX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICBub19yaXMuY3NzKFwibWFyZ2luLWxlZnRcIixcIjMzNnB4XCIpO1xyXG4gICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgc291cmNlOiB1cmwrXCJzY2FmZmFsZSZ2YWxvcmU9XCIrdmFsb3JlLFxyXG4gICAgICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgICAgICAgIGRlbGF5OiAzMDAsXHJcbiAgICAgICAgICAgIG1pbkxlbmd0aDogMSxcclxuICAgICAgICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKCBldmVudCwgdWkgKSB7XHJcbiAgICAgICAgICAgICAgICBub19yaXNwb3N0YSh1aS5jb250ZW50LG5vX3Jpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZih2YWxvcmUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIG5vX3Jpcy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAkKFwiI2Zvcm1hdG9cIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICB2YXIgdmFsb3JlID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICB2YXIgbm9fcmlzID0gJChcIiNmb3JtYXRvX25vX3Jpc1wiKS5lcSgwKTtcclxuICAgICAgICBub19yaXMuY3NzKFwibWFyZ2luLWxlZnRcIixcIjMzNnB4XCIpO1xyXG4gICAgICAgICQodGhpcykuYXV0b2NvbXBsZXRlKHtcclxuICAgICAgICAgICAgc291cmNlOiB1cmwrXCJmb3JtYXRvJnZhbG9yZT1cIit2YWxvcmUsXHJcbiAgICAgICAgICAgIGF1dG9Gb2N1czogdHJ1ZSxcclxuICAgICAgICAgICAgZGVsYXk6IDMwMCxcclxuICAgICAgICAgICAgbWluTGVuZ3RoOiAyLFxyXG4gICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24oIGV2ZW50LCB1aSApIHtcclxuICAgICAgICAgICAgICAgIG5vX3Jpc3Bvc3RhKHVpLmNvbnRlbnQsbm9fcmlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHZhbG9yZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgbm9fcmlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICQoXCIjbmF6aW9uZVwiKS5vbihcImtleXVwIGNoYW5nZVwiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAgIHZhciB2YWxvcmUgPSAkKHRoaXMpLnZhbCgpO1xyXG4gICAgICAgIHZhciBub19yaXMgPSAkKFwiI25hemlvbmVfbm9fcmlzXCIpLmVxKDApO1xyXG4gICAgICAgIG5vX3Jpcy5jc3MoXCJtYXJnaW4tbGVmdFwiLFwiNTY3cHhcIik7XHJcbiAgICAgICAgJCh0aGlzKS5hdXRvY29tcGxldGUoe1xyXG4gICAgICAgICAgICBzb3VyY2U6IHVybCtcIm5hemlvbmUmdmFsb3JlPVwiK3ZhbG9yZSxcclxuICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICAgICAgICBkZWxheTogMzAwLFxyXG4gICAgICAgICAgICBtaW5MZW5ndGg6IDIsXHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbiggZXZlbnQsIHVpICkge1xyXG4gICAgICAgICAgICAgICAgbm9fcmlzcG9zdGEodWkuY29udGVudCxub19yaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYodmFsb3JlID09PSAnJykge1xyXG4gICAgICAgICAgICBub19yaXMuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuIl0sImZpbGUiOiJzZWFyY2hfY2F0YWxvZy5qcyJ9
