// ****************************** Focus e Button ***************************//
$(function(){
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
    //Apertura finestra messaggi di avviso
    if(location.search.indexOf("errore") !== -1) {
        $("#avvisi").dialog(options);
        $("#avvisi").dialog(options,{title: "Errore"});
        $("#avvisi").dialog("open");
    } else if(location.search.indexOf("successo") !== -1) {
        $("#avvisi").dialog(options);
        $("#avvisi").dialog(options,{title: "Successo"});
        $("#avvisi").dialog("open");
    }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjYXRhbG9nX25vdl9hbGllbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogRm9jdXMgZSBCdXR0b24gKioqKioqKioqKioqKioqKioqKioqKioqKioqLy9cclxuJChmdW5jdGlvbigpe1xyXG4gICAgLy9TZXR0YWdnaW8gb3B6aW9uaSBmaW5lc3RyZSBkaSBhdnZpc29cclxuICAgIHZhciBvcHRpb25zID0ge1xyXG4gICAgICAgIG1vZGFsOiB0cnVlLFxyXG4gICAgICAgIGF1dG9PcGVuOiB0cnVlLFxyXG4gICAgICAgIGNsb3NlVGV4dDogXCJDaGl1ZGlcIixcclxuICAgICAgICBzaG93OiA1MDAsXHJcbiAgICAgICAgaGlkZTogNTAwLFxyXG4gICAgICAgIHRpdGxlOiBcIkF2dmlzb1wiLFxyXG4gICAgICAgIHJlc2l6YWJsZTogZmFsc2UsXHJcbiAgICAgICAgYnV0dG9uczoge1xyXG4gICAgICAgICAgICBPazogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmRpYWxvZyhcImNsb3NlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIC8vQXBlcnR1cmEgZmluZXN0cmEgbWVzc2FnZ2kgZGkgYXZ2aXNvXHJcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImVycm9yZVwiKSAhPT0gLTEpIHtcclxuICAgICAgICAkKFwiI2F2dmlzaVwiKS5kaWFsb2cob3B0aW9ucyk7XHJcbiAgICAgICAgJChcIiNhdnZpc2lcIikuZGlhbG9nKG9wdGlvbnMse3RpdGxlOiBcIkVycm9yZVwifSk7XHJcbiAgICAgICAgJChcIiNhdnZpc2lcIikuZGlhbG9nKFwib3BlblwiKTtcclxuICAgIH0gZWxzZSBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcInN1Y2Nlc3NvXCIpICE9PSAtMSkge1xyXG4gICAgICAgICQoXCIjYXZ2aXNpXCIpLmRpYWxvZyhvcHRpb25zKTtcclxuICAgICAgICAkKFwiI2F2dmlzaVwiKS5kaWFsb2cob3B0aW9ucyx7dGl0bGU6IFwiU3VjY2Vzc29cIn0pO1xyXG4gICAgICAgICQoXCIjYXZ2aXNpXCIpLmRpYWxvZyhcIm9wZW5cIik7XHJcbiAgICB9XHJcbn0pOyJdLCJmaWxlIjoiY2F0YWxvZ19ub3ZfYWxpZW4uanMifQ==
