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
