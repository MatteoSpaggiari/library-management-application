//  Dichiarazione variabili
const username = document.getElementById("username");
const password = document.getElementById("password");

//  Inserisco negli input già i valori per accedere come amministratore
username.value = "amministratore@amministratore.it";
password.value = "amministratore";


//  Finestra di avviso
const header = "Benvenuto";
const avviso = `<p>Questa &egrave; una <em>versione di prova</em> del <strong>PROGRAMMA GESTIONE BIBLIOTECA</strong>.</p>
                <p>Il <em>PROGRAMMA</em> prevede due livelli di accesso.</p>
                <p>Per accedere come <strong>AMMINISTRATORE</strong> &egrave; necessario inserire nel campo <em>Nome Utente</em> la parola &quot;
                <mark>amministratore@amministratore.it</mark>&quot; e nel campo <em>Password</em> la parola <mark>amministratore</mark>, 
                mentre per accedere come <strong>OPERATORE</strong> &egrave; necessario inserire nel campo <em>Nome Utente</em> 
                la parola &quot;<mark>operatore@operatore.it</mark>&quot; e nel campo <em>Password</em> la parola <mark>operatore</mark>.</p>
                <p><strong>Se si intende accedere come AMMINISTRATORE i campi sono già precompilati per tale accesso, per cui basta premere sul pulsante ACCEDI.</p>`;
const dialog = new Dialog(header,avviso);

//  Controllo errori FORM
const form = document.getElementById("form-access");
let errors = [];
let send = 0;


function error(elem,descError) {
    send = 0;
    elem.style.border = "1px solid #F00";
    errors.push(descError);
};

form.addEventListener("submit", function(event){
    send = 1;
    errors = errors.slice(0,0);
    const fields = this.querySelectorAll("input");
    
    fields.forEach(function(v,i,a){
        a[i].style.border = "1px solid #005798";
        if(a[i].value == "") {
            switch(a[i].name){
                case "username":
                    error(a[i],"&Egrave; obbligatorio inserire il <strong>Nome Utente</strong>.<br />");
                break;
                case "password":
                    error(a[i],"&Egrave; obbligatorio inserire la <strong>Password</strong>.<br />");
                break;
            }
        } else {
            switch(a[i].name){
                case "username":
                    if(new RegExp("^[a-z0-9\._%-]+@{1,1}[a-z0-9\._%-]+[\.]{1,1}[a-z]{2,6}$").test(a[i].value) === false){
                        error(a[i],"Hai inserito un <strong>Nome Utente</strong> non corretto.<br />");
                    }
                break;
                break;
                case "password":
                break;
            }
        }
    });
    
    if(send === 0){
        event.preventDefault();
        //Apro finestra (Dialog) con errori
        const header = "Errori";
        const avviso = errors.join("");
        const dialog = new Dialog(header,avviso);
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhY2Nlc3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gIERpY2hpYXJhemlvbmUgdmFyaWFiaWxpXG5jb25zdCB1c2VybmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXNlcm5hbWVcIik7XG5jb25zdCBwYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFzc3dvcmRcIik7XG5cbi8vICBJbnNlcmlzY28gbmVnbGkgaW5wdXQgZ2nDoCBpIHZhbG9yaSBwZXIgYWNjZWRlcmUgY29tZSBhbW1pbmlzdHJhdG9yZVxudXNlcm5hbWUudmFsdWUgPSBcImFtbWluaXN0cmF0b3JlQGFtbWluaXN0cmF0b3JlLml0XCI7XG5wYXNzd29yZC52YWx1ZSA9IFwiYW1taW5pc3RyYXRvcmVcIjtcblxuXG4vLyAgRmluZXN0cmEgZGkgYXZ2aXNvXG5jb25zdCBoZWFkZXIgPSBcIkJlbnZlbnV0b1wiO1xuY29uc3QgYXZ2aXNvID0gYDxwPlF1ZXN0YSAmZWdyYXZlOyB1bmEgPGVtPnZlcnNpb25lIGRpIHByb3ZhPC9lbT4gZGVsIDxzdHJvbmc+UFJPR1JBTU1BIEdFU1RJT05FIEJJQkxJT1RFQ0E8L3N0cm9uZz4uPC9wPlxuICAgICAgICAgICAgICAgIDxwPklsIDxlbT5QUk9HUkFNTUE8L2VtPiBwcmV2ZWRlIGR1ZSBsaXZlbGxpIGRpIGFjY2Vzc28uPC9wPlxuICAgICAgICAgICAgICAgIDxwPlBlciBhY2NlZGVyZSBjb21lIDxzdHJvbmc+QU1NSU5JU1RSQVRPUkU8L3N0cm9uZz4gJmVncmF2ZTsgbmVjZXNzYXJpbyBpbnNlcmlyZSBuZWwgY2FtcG8gPGVtPk5vbWUgVXRlbnRlPC9lbT4gbGEgcGFyb2xhICZxdW90O1xuICAgICAgICAgICAgICAgIDxtYXJrPmFtbWluaXN0cmF0b3JlQGFtbWluaXN0cmF0b3JlLml0PC9tYXJrPiZxdW90OyBlIG5lbCBjYW1wbyA8ZW0+UGFzc3dvcmQ8L2VtPiBsYSBwYXJvbGEgPG1hcms+YW1taW5pc3RyYXRvcmU8L21hcms+LCBcbiAgICAgICAgICAgICAgICBtZW50cmUgcGVyIGFjY2VkZXJlIGNvbWUgPHN0cm9uZz5PUEVSQVRPUkU8L3N0cm9uZz4gJmVncmF2ZTsgbmVjZXNzYXJpbyBpbnNlcmlyZSBuZWwgY2FtcG8gPGVtPk5vbWUgVXRlbnRlPC9lbT4gXG4gICAgICAgICAgICAgICAgbGEgcGFyb2xhICZxdW90OzxtYXJrPm9wZXJhdG9yZUBvcGVyYXRvcmUuaXQ8L21hcms+JnF1b3Q7IGUgbmVsIGNhbXBvIDxlbT5QYXNzd29yZDwvZW0+IGxhIHBhcm9sYSA8bWFyaz5vcGVyYXRvcmU8L21hcms+LjwvcD5cbiAgICAgICAgICAgICAgICA8cD48c3Ryb25nPlNlIHNpIGludGVuZGUgYWNjZWRlcmUgY29tZSBBTU1JTklTVFJBVE9SRSBpIGNhbXBpIHNvbm8gZ2nDoCBwcmVjb21waWxhdGkgcGVyIHRhbGUgYWNjZXNzbywgcGVyIGN1aSBiYXN0YSBwcmVtZXJlIHN1bCBwdWxzYW50ZSBBQ0NFREkuPC9wPmA7XG5jb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixhdnZpc28pO1xuXG4vLyAgQ29udHJvbGxvIGVycm9yaSBGT1JNXG5jb25zdCBmb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtLWFjY2Vzc1wiKTtcbmxldCBlcnJvcnMgPSBbXTtcbmxldCBzZW5kID0gMDtcblxuXG5mdW5jdGlvbiBlcnJvcihlbGVtLGRlc2NFcnJvcikge1xuICAgIHNlbmQgPSAwO1xuICAgIGVsZW0uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgI0YwMFwiO1xuICAgIGVycm9ycy5wdXNoKGRlc2NFcnJvcik7XG59O1xuXG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgIHNlbmQgPSAxO1xuICAgIGVycm9ycyA9IGVycm9ycy5zbGljZSgwLDApO1xuICAgIGNvbnN0IGZpZWxkcyA9IHRoaXMucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpO1xuICAgIFxuICAgIGZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKXtcbiAgICAgICAgYVtpXS5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCAjMDA1Nzk4XCI7XG4gICAgICAgIGlmKGFbaV0udmFsdWUgPT0gXCJcIikge1xuICAgICAgICAgICAgc3dpdGNoKGFbaV0ubmFtZSl7XG4gICAgICAgICAgICAgICAgY2FzZSBcInVzZXJuYW1lXCI6XG4gICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCImRWdyYXZlOyBvYmJsaWdhdG9yaW8gaW5zZXJpcmUgaWwgPHN0cm9uZz5Ob21lIFV0ZW50ZTwvc3Ryb25nPi48YnIgLz5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBhc3N3b3JkXCI6XG4gICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCImRWdyYXZlOyBvYmJsaWdhdG9yaW8gaW5zZXJpcmUgbGEgPHN0cm9uZz5QYXNzd29yZDwvc3Ryb25nPi48YnIgLz5cIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2l0Y2goYVtpXS5uYW1lKXtcbiAgICAgICAgICAgICAgICBjYXNlIFwidXNlcm5hbWVcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bYS16MC05XFwuXyUtXStAezEsMX1bYS16MC05XFwuXyUtXStbXFwuXXsxLDF9W2Etel17Miw2fSRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxcIkhhaSBpbnNlcml0byB1biA8c3Ryb25nPk5vbWUgVXRlbnRlPC9zdHJvbmc+IG5vbiBjb3JyZXR0by48YnIgLz5cIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGFzc3dvcmRcIjpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGlmKHNlbmQgPT09IDApe1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvL0Fwcm8gZmluZXN0cmEgKERpYWxvZykgY29uIGVycm9yaVxuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkVycm9yaVwiO1xuICAgICAgICBjb25zdCBhdnZpc28gPSBlcnJvcnMuam9pbihcIlwiKTtcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsYXZ2aXNvKTtcbiAgICB9XG59KTtcbiJdLCJmaWxlIjoiYWNjZXNzLmpzIn0=
