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