//Blocco i pulsanti avanti ed indietro
const formEditCataloguingI = document.getElementById("edit_catalog");
const formEditSubscriberI = document.getElementById("edit_subscriber");
const formAddLoanI = document.getElementById("add_loan");
if(formEditCataloguingI != null || formEditSubscriberI != null || formAddLoanI != null) {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(location.reload(true));
    };
}
    
// Servono per tutte le pagine
let window_width = window.innerWidth;
let nav = document.getElementById('main-menu');
let nav_menu_query = document.getElementById('menu-query');
let hidden_desc_items = document.getElementById('hidden-desc-items');
let hidden_menu_query = document.getElementById('hidden-menu-query');
// Servono per pagina Add Catalog
const num_inventario = document.getElementById("num_inv");
const dewey = document.getElementById("dewey");
const titoloOriginale = document.getElementById("titolo_o");
const tradut = document.getElementById("tradut");
const linguaFronte = document.getElementById("lingua_f");

if(window_width >= 1000) {
    if(nav != null) {
        nav.classList.add("expanded");
    }
}
if(window_width >= 800) {
    if(nav_menu_query != null) {
        nav_menu_query.classList.add("expanded");
        nav_menu_query.querySelector("ul").classList.add("expanded");
    }
}
if(nav != null) {
    animationMainMenu();
    window.addEventListener('resize', function(event) {
        let window_width = window.innerWidth;
        if(window_width >= 1000) {
            nav.classList.add("expanded");
        } else {
            nav.classList.remove("expanded");
        }
    });
    
    // Cambio icone se eventi mouseover e mouseout
    const itemMenu = document.querySelectorAll(".voci > li > a");
    itemMenu.forEach(function(v,i,a){
        a[i].addEventListener("mouseover", function(e) {
            switch(i) {
                case 0:
                    this.firstChild.src = "./images/icone/icona-aggiungi-catalogazione-hover.png";
                break;
                case 1:
                    this.firstChild.src = "./images/icone/icona-cerca-catalogazione-hover.png";
                break;
                case 2:
                    this.firstChild.src = "./images/icone/icona-aggiungi-utente-hover.png";
                break;
                case 3:
                    this.firstChild.src = "./images/icone/icona-cerca-utente-hover.png";
                break;
                case 4:
                    this.firstChild.src = "./images/icone/icona-aggiungi-prestito-hover.png";
                break;
            }
        });
        if(!a[i].classList.contains("current")) {
            a[i].addEventListener("mouseout", function(e) {
                switch(i) {
                    case 0:
                        this.firstChild.src = "./images/icone/icona-aggiungi-catalogazione.png";
                    break;
                    case 1:
                        this.firstChild.src = "./images/icone/icona-cerca-catalogazione.png";
                    break;
                    case 2:
                        this.firstChild.src = "./images/icone/icona-aggiungi-utente.png";
                    break;
                    case 3:
                        this.firstChild.src = "./images/icone/icona-cerca-utente.png";
                    break;
                    case 4:
                        this.firstChild.src = "./images/icone/icona-aggiungi-prestito.png";
                    break;
                }
            });
        };
    });
}

if(nav_menu_query != null) {
    animationMenuQuery();
    window.addEventListener('resize', function(event) {
        let window_width = window.innerWidth;
        if(window_width >= 800) {
            nav_menu_query.classList.add("expanded");
            nav_menu_query.querySelector("ul").classList.add("expanded");
        } else {
            nav_menu_query.classList.remove("expanded");
            nav_menu_query.querySelector("ul").classList.remove("expanded");
        }
    });
}

//Stampa su pressione del bottone
let stampa = document.getElementById('stampa');
if(stampa != null) {
    stampa.addEventListener("click", function() {
        window.print();
    });
}

//Creazione menu tendina altre operazioni
let altre_operazioni = document.getElementById("altre-operazioni");
let sub_menu = document.getElementById("sub-menu");
if(altre_operazioni != null) {
    altre_operazioni.addEventListener("click", function(event) {
        event.preventDefault();
        this.parentElement.classList.toggle("opened");
        this.classList.toggle("opened");
        sub_menu.classList.toggle("expanded");
        if(this.classList.contains('opened')) {
            this.firstChild.src = "./images/icone/icona-altre-operazioni-open-hover.png";
        } else {
            this.firstChild.src = "./images/icone/icona-altre-operazioni.png";
        }
    });
    altre_operazioni.addEventListener("mouseover", function(event) {
        if(this.classList.contains('opened')) {
            this.firstChild.src = "./images/icone/icona-altre-operazioni-open-hover.png";
        } else {
            this.firstChild.src = "./images/icone/icona-altre-operazioni-hover.png";
        }
    });
    altre_operazioni.addEventListener("mouseout", function(event) {
        if(this.classList.contains('opened')) {
        } else {
            this.firstChild.src = "./images/icone/icona-altre-operazioni.png";
        }
    });
}

//Nascondere voci menu ma non icone    
function animationMainMenu() {
    hidden_desc_items.addEventListener('click', function(event) {
        nav.classList.toggle("expanded");
    });
};

function animationMenuQuery() {
    hidden_menu_query.addEventListener('click', function(event) {
        nav_menu_query.classList.toggle("expanded");
        nav_menu_query.querySelector("ul").classList.toggle("expanded");
    });
};


//Colorazioni pulsanti radio
let ul_radio = document.getElementsByClassName("container-radio");
if(ul_radio != null) {
    const formAddCatalog = document.getElementById("add_catalog");
    const num_inv_p = document.getElementById("num_inv_p");
    for(let i = 0; i < ul_radio.length; i++) {
        ul_radio[i].addEventListener("click", function(event) {
            let input_radio = this.querySelectorAll(".radio");
            let li_radio = this.children;
            for(let j = 0; j< li_radio.length; j++) {
                li_radio[j].addEventListener("click", function(event) {
                    for(let z = 0; z < li_radio.length; z++) {
                        input_radio[z].checked = false;
                        input_radio[z].parentNode.setAttribute("style", "background-color: #dedede");
                    }
                    this.firstElementChild.checked = true;
                    this.setAttribute("style", "background-color: #96e979");
                    
                    //Inserimento numero di inventario direttamente dal database nel caso si scelga come proprietà Papillon o Filo-Festival
                    let url = "./include-php/content_global.php?tipo=proprieta&valore=";
                    
                    switch(this.firstElementChild.id) {
                        case "papillon":
                            if(formAddCatalog != null) {
                                if(num_inventario != null) {
                                    url = url+"P";
                                    fetch(url).then(function(response){
                                        return response.text();
                                    }).then(function(num_inv) {
                                        num_inventario.value = num_inv.trim();
                                        dewey.focus();
                                    }).catch(function(error){
                                        console.log(error);
                                    });
                                }
                            } else {
                                if(num_inv_p != null) {
                                    num_inv_p.value = "";
                                    num_inv_p.focus();
                                } else {
                                    num_inventario.value = "";
                                    num_inventario.focus();
                                }
                            }
                        break;
                        case "festival":
                            if(formAddCatalog != null) {
                                if(num_inventario != null) {
                                    url = url+"F";
                                    fetch(url).then(function(response){
                                        return response.text();
                                    }).then(function(num_inv) {
                                        num_inventario.value = num_inv.trim();
                                        dewey.focus();
                                    }).catch(function(error){
                                        console.log(error);
                                    });
                                }
                            } else {
                                if(num_inv_p != null) {
                                    num_inv_p.value = "";
                                    num_inv_p.focus();
                                } else {
                                    num_inventario.value = "";
                                    num_inventario.focus();
                                }
                            }
                        break;
                        case "comune":
                            if(num_inv_p != null) {
                                num_inv_p.value = "";
                                num_inv_p.focus();
                            } else {
                                num_inventario.value = "";
                                num_inventario.focus();
                            }
                        break;
                        case "testofyes":
                            // Visualizzo se c'è testo a fronte
                            linguaFronte.style.display = "list-item";
                            linguaFronte.children[1].focus();
                        break;
                        case "testofno":
                            // Nascondo se c'è testo a fronte
                            linguaFronte.style.display = "none";
                        break;
                        case "linguayes":
                            // Visualizzo i campi se c'è lingua originale
                            titoloOriginale.style.display = "list-item";
                            titoloOriginale.children[1].focus();
                            tradut.style.display = "list-item";
                        break;
                        case "linguano":
                            // Nascondo i campi se non c'è lingua originale
                            titoloOriginale.style.display = "none";
                            tradut.style.display = "none";
                        break;
                    }                    
                });
            }
        }, true);
    }
}

//Bottone excel storico soci
if(window.location.pathname.indexOf('storico_soci.php') != -1) {
    var ul_button = document.getElementById("container-button");
    var li_button = document.createElement("li");
    li_button.innerHTML= '<a class="button_excel" alt="Excel" title="Excel" href="./csv.php?param=soci">Excel</a>';
    ul_button.append(li_button);
    ul_button.setAttribute("style","width: 14rem");
}

//Aprire parte di compilazione del tutore
const tutore_container = document.getElementById("tutore");
const tutore_radio = document.querySelectorAll('#ul-tutore-radio input[type="radio"]');
const li_tutore_radio = document.querySelectorAll('#ul-tutore-radio li');
for(let i = 0; i < li_tutore_radio.length; i++) {
    li_tutore_radio[i].addEventListener("click", function(event) {
        if(tutore_radio[i].value == "Y") {
            tutore_container.classList.add("expanded");
        } else {
            tutore_container.classList.remove("expanded");
        }
    });
}

const button_socio = document.getElementById("button_socio");
const formSocio = document.getElementById("form_socio");
if(button_socio != null) {
    const inputAnno = document.getElementById("anno_socio");
    button_socio.addEventListener("click", function(event) {
        formSocio.parentElement.classList.toggle("expanded");
        inputAnno.focus();
        formSocio.addEventListener("submit", function(e) {
            
            e.preventDefault();
            const anno = document.getElementById("anno_socio").value;
            const id_iscritto = location.search.substr((location.search.indexOf("id_iscritto=")+12),1);
            let url = "./trans_global.php?submit=socio&anno_socio="+anno+"&id_iscritto="+id_iscritto;

            fetch(url).then(function(response) {
                if(response.ok) {
                    return response.text();
                } else {
                    const error = "Errore dal Server";
                    return error;
                }
            }).then(function(data) {
                if(data.trim() == 1) {
                    const id_iscritto = location.search.substr((location.search.indexOf("id_iscritto=")+12),1);
                    location.href = location.pathname+"?id_iscritto="+id_iscritto+"&success_socio=yes";
                } else if(data.trim() == 0) {
                    const id_iscritto = location.search.substr((location.search.indexOf("id_iscritto=")+12),1);
                    location.href = location.pathname+"?id_iscritto="+id_iscritto+"&error_socio=yes";
                } else {
                    const id_iscritto = location.search.substr((location.search.indexOf("id_iscritto=")+12),1);
                    location.href = location.pathname+"?id_iscritto="+id_iscritto+"&gia_socio=yes&anno="+data.trim();
                }
            }).catch(function() {
                const error = "Errore di rete";
                console.log(error);
            });

        });
    });
}

// Nascondere Finestra Visualizzazione Errori dal Servere //
//Dichiarazione Variabili
const hiddenErrorsServer = document.getElementById("hidden-errors");
if(hiddenErrorsServer != null) {
    hiddenErrorsServer.addEventListener("click", function(event){
        this.parentElement.classList.add("hidden");
    });
}

//Controllo se ci sono dei radio button checked e li coloro di verde (#96e979)
const radioChecked = document.querySelectorAll('[type="radio"]');
radioChecked.forEach(function(v,i,a) {
    console.log(a[i].checked);
    if(a[i].checked == true) {
        a[i].parentElement.style.backgroundColor = "#96e979";
    }
});

// ****************************  Aggiungi/Modifica Immagine Catalogazione/Utente/Operatore ********************************** //
const add_image_catalog = document.getElementById("add-image-catalog");
if(add_image_catalog != null) {
    add_image_catalog.addEventListener("click", function(e){
        e.preventDefault();
        //  Finestra di avviso
        const header = "Aggiungi Immagine";
        const form_image = `<form id="add_image_catalog" class="form add-image" name="add_image_catalog" method="post" action="./trans_global.php" enctype="multipart/form-data" target="_self">
                            <fieldset>
                                <ul>
                                    <li class="container-button">
                                        <p>Aggiungi immagine: <input id="file" type="file" name="filename" /></p>
                                        <input class="reset" type="reset" name="reset" value="Reset">
                                        <input id="submit" type="hidden" name="submit" value="add_image_catalog">
                                        <input id="invia-immagine" class="invia" type="submit" name="invia" value="Invia">
                                    </li>
                                </ul>
                            </fieldset>
                        </form>`;
        const dialog = new Dialog(header,form_image);
        
        const add_image_catalog = document.getElementById("add_image_catalog");
        add_image_catalog.addEventListener('submit', function(event) {
            event.preventDefault();
            const file = document.getElementById("file");
            const submit = document.getElementById("submit");
            let id_catalog_value;
            const id_catalog = document.getElementById("id_catalogazione");
            if(id_catalog == null) {
                const add_image_catalog_button = document.getElementById("add-image-catalog");
                id_catalog_value = add_image_catalog_button.getAttribute("data-id-catalog");
                console.log(id_catalog_value);
            } else {
                id_catalog_value = id_catalog.value;
            }
            console.log(file);
            console.log(file.files[0]);
            if(file != "") {
                const body_content = new FormData();
                
                body_content.append("filename",file.files[0]);
                body_content.append("submit",submit.value);
                body_content.append("id_catalog",id_catalog_value);
                fetch('http://localhost/Programma_Gestione_Biblioteca_2018/dist/trans_global.php',
                {
                    method: "POST",
                    "Accept-Charset": "utf-8",
                    "Content-Type": "multipart/form-data",
                    body: body_content
                }).then(function(response) {
                    if(response.ok) {
                        return response.text();
                    } else {
                        const error = "Immagine non salvata";
                        return error;
                    }
                }).then(function(data) {
                    console.log(data);
                    if(location.href.split("&").length > 1) {
                        let url = location.href.split("&")[0];
                        url += "&success_addimagecatalog=yes";
                        location.href = url;
                    } else if(location.search.indexOf("?") !== -1 && location.href.split("&").length == 1) {
                        let url = location.href+"&success_addimagecatalog=yes";
                        location.href = url; 
                    } else {
                        let url = location.href+"?success_addimagecatalog=yes";
                        location.href = url;
                    }
                    return data;
                }).catch(function() {
                    const error = "Errore di rete";
                    console.log(error);
                });
            }
        });
    });
}

const add_image_subscriber = document.getElementById("add-image-subscriber");
if(add_image_subscriber != null) {
    add_image_subscriber.addEventListener("click", function(e){
        e.preventDefault();
        //  Finestra di avviso
        const header = "Aggiungi Immagine";
        const form_image = `<form id="add_image_subscriber" class="form add-image" name="add_image_subscriber" method="post" action="./trans_global.php" enctype="multipart/form-data" target="_self">
                            <fieldset>
                                <ul>
                                    <li class="container-button">
                                        <p>Aggiungi immagine: <input id="file" type="file" name="filename" /></p>
                                        <input class="reset" type="reset" name="reset" value="Reset">
                                        <input id="submit" type="hidden" name="submit" value="add_image_subscriber">
                                        <input id="invia-immagine" class="invia" type="submit" name="invia" value="Invia">
                                    </li>
                                </ul>
                            </fieldset>
                        </form>`;
        const dialog = new Dialog(header,form_image);
        
        const add_image_subscriber = document.getElementById("add_image_subscriber");
        add_image_subscriber.addEventListener('submit', function(event) {
            event.preventDefault();
            const file = document.getElementById("file");
            const submit = document.getElementById("submit");
            let id_subscriber_value;
            const id_subscriber = document.getElementById("id_iscritto");
            if(id_subscriber == null) {
                const add_image_subscriber_button = document.getElementById("add-image-subscriber");
                id_subscriber_value = add_image_subscriber_button.getAttribute("data-id-subscriber");
                console.log(id_subscriber_value);
            } else {
                id_subscriber_value = id_subscriber.value;
            }
            console.log(file);
            console.log(file.files[0]);
            if(file != "") {
                const body_content = new FormData();
                
                body_content.append("filename",file.files[0]);
                body_content.append("submit",submit.value);
                body_content.append("id_subscriber",id_subscriber_value);
                fetch('http://localhost/Programma_Gestione_Biblioteca_2018/dist/trans_global.php',
                {
                    method: "POST",
                    "Accept-Charset": "utf-8",
                    "Content-Type": "multipart/form-data",
                    body: body_content
                }).then(function(response) {
                    if(response.ok) {
                        return response.text();
                    } else {
                        const error = "Immagine non salvata";
                        return error;
                    }
                }).then(function(data) {
                    console.log(data);
                    if(location.href.split("&").length > 1) {
                        let url = location.href.split("&")[0];
                        url += "&success_addimagesubscriber=yes";
                        location.href = url;
                    } else if(location.search.indexOf("?") !== -1 && location.href.split("&").length == 1) {
                        let url = location.href+"&success_addimagecatalog=yes";
                        location.href = url; 
                    } else {
                        let url = location.href+"?success_addimagesubscriber=yes";
                        location.href = url; 
                    }
                    return data;
                }).catch(function() {
                    const error = "Errore di rete";
                    console.log(error);
                });
            }
        });
    });
}

const add_image_user = document.getElementById("add-image-user");
if(add_image_user != null) {
    add_image_user.addEventListener("click", function(e){
        e.preventDefault();
        //  Finestra di avviso
        const header = "Aggiungi Immagine";
        const form_image = `<form id="add_image_user" class="form add-image" name="add_image_user" method="post" action="./trans_global.php" enctype="multipart/form-data" target="_self">
                            <fieldset>
                                <ul>
                                    <li class="container-button">
                                        <p>Aggiungi immagine: <input id="file" type="file" name="filename" /></p>
                                        <input class="reset" type="reset" name="reset" value="Reset">
                                        <input id="submit" type="hidden" name="submit" value="add_image_user">
                                        <input id="invia-immagine" class="invia" type="submit" name="invia" value="Invia">
                                    </li>
                                </ul>
                            </fieldset>
                        </form>`;
        const dialog = new Dialog(header,form_image);
        
        const add_image_user = document.getElementById("add_image_user");
        add_image_user.addEventListener('submit', function(event) {
            event.preventDefault();
            const file = document.getElementById("file");
            const submit = document.getElementById("submit");

            if(file != "") {
                const body_content = new FormData();
                
                body_content.append("filename",file.files[0]);
                body_content.append("submit",submit.value);
                fetch('http://localhost/Programma_Gestione_Biblioteca_2018/dist/trans_global.php',
                {
                    method: "POST",
                    "Accept-Charset": "utf-8",
                    "Content-Type": "multipart/form-data",
                    body: body_content
                }).then(function(response) {
                    if(response.ok) {
                        return response.text();
                    } else {
                        const error = "Immagine non salvata";
                        return error;
                    }
                }).then(function(data) {
                    console.log(data);
                    if(location.href.split("&").length > 1) {
                        let url = location.href.split("&")[0];
                        url += "&success_addimageoperator=yes";
                        location.href = url;
                    } else {
                        let url = location.href+"?success_addimageoperator=yes";
                        location.href = url; 
                    }
                    return data;
                }).catch(function() {
                    const error = "Errore di rete";
                    console.log(error);
                });
            }
        });
    });
}

// ****************************  Pagina Aggiungi/Modifica Catalogazione ********************************** //
//Dichiarazione Variabili
//  Controllo errori FORM
const formAddCatalog = document.getElementById("add_catalog");
const formEditCatalog = document.getElementById("edit_catalog");

if(formAddCatalog != null ^ formEditCatalog != null) {
        
    // Nascondo alcuni campi
    titoloOriginale.style.display = "none";
    tradut.style.display = "none";
    linguaFronte.style.display = "none";
    
    // Avviso l'utente che prima di compilare il campo numero inventario deve scegliere la proprieta
    num_inventario.addEventListener("focus", function(event){
       const radioProprieta = document.querySelectorAll('[name="proprieta"]');
       let checked = 0;
       for(let i = 0;i < radioProprieta.length;i++) {
           if(radioProprieta[i].checked == true) {
               checked++;
           }
       }
       if(checked == 0) {
            //  Finestra di avviso
            const header = "Avviso";
            const avviso = "<p>PRIMA DI COMPILARE QUESTO CAMPO E' NECESSARIO SCEGLIERE IL CAMPO <strong>PROPRIETA'</strong></p>";
            const dialog = new Dialog(header,avviso,document.getElementById("isbn"));
       }
    });
    
    
    // Autocompletamento campi con richiesta dal server
    let url = "./include-php/content_global.php?tipo=";
    const dewey = document.getElementById("dewey");
    const autore = document.getElementById("autore");
    const genere = document.getElementById("genere");
    const editore = document.getElementById("editore");
    const collana = document.getElementById("collana");
    const scaffale = document.getElementById("scaffale");
    const formato = document.getElementById("formato");
    const nazione = document.getElementById("nazione");
    
    const auto_dewey = new Autocomplete(dewey,(url+"dewey&valore="));
    const auto_autore = new Autocomplete(autore,(url+"autore&valore="));
    const auto_genere = new Autocomplete(genere,(url+"genere&valore="));
    const auto_editore = new Autocomplete(editore,(url+"editore&valore="));
    const auto_collana = new Autocomplete(collana,(url+"collana&valore="));
    const auto_scaffale = new Autocomplete(scaffale,(url+"scaffale&valore="));
    const auto_formato = new Autocomplete(formato,(url+"formato&valore="));
    const auto_nazione = new Autocomplete(nazione,(url+"nazione&valore="));
    
    let send = 0;
    let form;
    if(formAddCatalog != null) {
        form = formAddCatalog;
    } else if(formEditCatalog != null) {
        form = formEditCatalog;
    }
    
    function error(elem,descError) {
        send = 0;
        if(elem.classList.contains("container-radio")) {
        } else {
            elem.style.border = "1px solid #F00";
        }
        //Elimino le precedenti Box Dialog        
        if(elem.parentElement.lastElementChild.classList.contains("img-error")) {
            elem.parentElement.lastElementChild.remove();
        }
        
        const imageError = document.createElement("div");
        imageError.classList.add("img-error");
        const boxError = document.createElement("div");
        boxError.classList.add("box-error");
        boxError.innerHTML = descError+"<br />";
        imageError.appendChild(boxError);
        elem.parentElement.appendChild(imageError);
        
        imageError.addEventListener("mouseover", function(event){
            boxError.classList.add("opened");
        });
        
        imageError.addEventListener("mouseout", function(event){
            boxError.classList.remove("opened");
        });
    };

    form.addEventListener("submit", function(event){
        send = 1;
        const fields = this.querySelectorAll("input");
        const error_t = "&Egrave; obbligatorio compilare questo campo.";
        const error_r = "&Egrave; obbligatorio scegliere questo campo.";

        fields.forEach(function(v,i,a){
            // Ad ogni controllo rimetto il bordo standard e tolgo l'icona dell'errore
            a[i].style.border = "1px solid #005798";
            if(a[i].parentElement.lastElementChild.classList.contains("img-error")) {
                a[i].parentElement.lastElementChild.remove();
            }
            
            if(a[i].value == "") {
                switch(a[i].name){
                    case "num_inv":
                        error(a[i],error_t);
                    break;
                    case "dewey":
                        error(a[i],error_t);
                    break;
                    case "editore":
                        error(a[i],error_t);
                    break;
                    case "edizione":
                        error(a[i],error_t);
                    break;
                    case "collana":
                    break;
                    case "scaffale":
                        error(a[i],error_t);
                    break;
                    case "formato":
                        error(a[i],error_t);
                    break;
                    case "note_formato":
                    break;
                    case "pagine":
                        error(a[i],error_t);
                    break;
                    case "data_c":
                        error(a[i],error_t);
                    break;
                    case "costo":
                        error(a[i],error_t);
                    break;
                    case "isbn":
                    case "provenienza":
                    case "titolo_o":
                    case "traduttore":
                    case "lingua":
                    break;
                    case "nazione":
                        error(a[i],error_t);
                    break;	
                    default:
                        error(a[i],error_t);
                    break;
                }
            } else {
                switch(a[i].name){
                    case "isbn":
                        if(new RegExp("^[0-9]{10,13}$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                        }
                    break;
                    //Numero inventario
                    case "num_inv":
                        if(new RegExp("^[0-9()]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                        }
                    break;
                    //Codice Dewey
                    case "dewey":
                        if(new RegExp("^[a-zA-Z0-9\. ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire pu&ograve; contenere numeri, lettere e come caratteri speciali, solo il &quot;.&quot;.");
                        }
                    break;
                    //Titolo
                    case "titolo":
                        if(new RegExp("^[!\-\.\&\'\/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27, ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Autore
                    case "autore":
                        if(new RegExp("^[\-\.\&\'\"0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,() ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Genere
                    case "genere":
                        if(new RegExp("^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ()]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Editore
                    case "editore":
                        if(new RegExp("^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Edizione
                    case "edizione":
                        if(new RegExp("^[A-Za-z ]+[A-Za-z]+[ ]{1}[-]{1}[ ]{1}[0-9]{4}$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;Citt&agrave; &minus; anno&quot;.");
                        }
                    break;
                    //Collana
                    case "collana":
                        if(new RegExp("^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; !]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Scaffale
                    case "scaffale":
                        if(new RegExp("^[0-9A-Za-z ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Formato
                    case "formato":
                        if(new RegExp("^[0-9A-Za-z, \+]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;Numero (usare la virgola se decimale) x Numero (usare la virgola se decimale)&quot;.");
                        }
                    break;
                    //Note Fromato
                    case "note_formato":
                        if(new RegExp("^[\+\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27,; ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Pagine
                    case "pagine":
                        if(new RegExp("^[0-9]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                        }
                    break;
                    //Data Catalogazione
                    case "data_c":
                        if(new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;Anno&minus;Mese&minus;Giorno&quot;.");
                        }
                    break;
                    //Costo
                    case "costo":
                        if(new RegExp("^[0-9\.]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                        }
                    break;
                    //Provenienza
                    case "provenienza":
                        if(new RegExp("^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Titolo Originale
                    case "titolo_o":
                        if(new RegExp("^[\-\.\&\'\/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27, ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Traduttore
                    case "traduttore":
                        if(new RegExp("^[\-\.\&\'0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Lingua
                    case "lingua":
                        if(new RegExp("^[a-zA-Z, ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo lettere e come carattere speciale la &quot;,&quot;.");
                        }
                    break;
                    //Nazione
                    case "nazione":
                        if(new RegExp("^[A-Za-z\. ()]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo lettere e come caratteri speciali le parentesi tonde.");
                        }
                    break;
                }
            }
            
            if(a[i].type == "radio") {
                switch(a[i].name) {
                    case "proprieta":
                        if(a[i].checked == false && a[i+1].checked == false && a[i+2].checked == false) {
                            if(a[i+2].parentElement.parentElement.classList.contains("container-radio")) {
                                error(a[i+2].parentElement.parentElement,error_r);
                            }
                        } else {
                            if(a[i+2].parentElement.parentElement.parentElement.lastElementChild.classList.contains("img-error")) {
                                a[i+2].parentElement.parentElement.parentElement.lastElementChild.remove();
                            }
                        }
                    break;
                    case "novita":
                    case "lingua_o":
                    case "testo_f":
                        if(a[i].checked == false && a[i+1].checked == false) {
                            if(a[i+1].parentElement.parentElement.classList.contains("container-radio")) {
                                error(a[i+1].parentElement.parentElement,error_r);
                            }
                        } else {
                            if(a[i+1].parentElement.parentElement.parentElement.lastElementChild.classList.contains("img-error")) {
                                a[i+1].parentElement.parentElement.parentElement.lastElementChild.remove();
                            }
                        }
                    break;
                }
            }
        });
        
        if(send === 0){
            event.preventDefault();
            //  Finestra di avviso
            const header = "Avviso";
            const avviso = '<p>CI SONO DEGLI <strong>ERRORI</strong>, CORREGGERLI E PREMERE NUOVAMENTE SUL PULSANTE "INVIA", GRAZIE.</p>';
            const dialog = new Dialog(header,avviso);
        };
    });
    
    //Apertura finestre di dialogo per errori ed avvisi    
    if(location.search.indexOf("error_exist") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">QUESTA CATALOGAZIONE ESISTE GI&Agrave;</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("error_add") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">LA CATALOGAZIONE NON &Egrave; STATA AGGIUNTA...RIPROVA</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("error_update") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">LA CATALOGAZIONE NON &Egrave; STATA MODIFICATA...RIPROVA</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("success_addimagecatalog") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">IMMAGINE MODIFICATA CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
};

// ****************************  Pagina Cerca Catalogazione ********************************** //
const formSearchCatalog = document.getElementById("search_catalog");
if(formSearchCatalog != null) {
    // Avviso l'utente che prima di compilare il campo numero inventario deve scegliere la proprieta
    num_inventario.addEventListener("focus", function(event){
       const radioProprieta = document.querySelectorAll('[name="proprieta"]');
       let checked = 0;
       for(let i = 0;i < radioProprieta.length;i++) {
           if(radioProprieta[i].checked == true) {
               checked++;
           }
       }
       if(checked == 0) {
            //  Finestra di avviso
            const header = "Avviso";
            const avviso = "<p>PRIMA DI COMPILARE QUESTO CAMPO E' NECESSARIO SCEGLIERE IL CAMPO <strong>PROPRIETA'</strong></p>";
            const dialog = new Dialog(header,avviso,document.getElementById("isbn"));
       }
    });
    
    
    // Autocompletamento campi con richiesta dal server
    let url = "./include-php/content_global.php?tipo=";
    const dewey = document.getElementById("dewey");
    const titolo = document.getElementById("titolo");
    const autore = document.getElementById("autore");
    const genere = document.getElementById("genere");
    const collana = document.getElementById("collana");
    const scaffale = document.getElementById("scaffale");
    
    const auto_dewey = new Autocomplete(dewey,(url+"dewey&valore="));
    const auto_titolo = new Autocomplete(titolo,(url+"titolo&valore="));
    const auto_autore = new Autocomplete(autore,(url+"autore&valore="));
    const auto_genere = new Autocomplete(genere,(url+"genere&valore="));
    const auto_collana = new Autocomplete(collana,(url+"collana&valore="));
    const auto_scaffale = new Autocomplete(scaffale,(url+"scaffale&valore="));
};

// ****************************  Pagina Aggiungi/Modifica Utente ********************************** //
//Dichiarazione Variabili
//  Controllo errori FORM
const formAddSubscriber = document.getElementById("add_subscriber");
const formEditSubscriber = document.getElementById("edit_subscriber");

if(formAddSubscriber != null ^ formEditSubscriber != null) {
    
    // Autocompletamento campi con richiesta dal server
    let url = "./include-php/content_global.php?tipo=";
    const nome = document.getElementById("nome");
    const cognome = document.getElementById("cognome");
    const professione = document.getElementById("professione");
    const nome_t = document.getElementById("nome_t");
    const cognome_t = document.getElementById("cognome_t");
    const indirizzo = document.getElementById("indirizzo");
    const indirizzo_t = document.getElementById("indirizzo_t");
    const localita = document.getElementById("localita");
    const localita_t = document.getElementById("localita_t");
    const provincia = document.getElementById("provincia");
    const provincia_t = document.getElementById("provincia_t");
    const cap = document.getElementById("cap");
    const cap_t = document.getElementById("cap_t");
    const tel_casa = document.getElementById("tel_casa");
    const tel_casa_t = document.getElementById("tel_casa_t");
    
    const auto_nome = new Autocomplete(nome,(url+"nome&valore="));
    const auto_cognome = new Autocomplete(cognome,(url+"cognome&valore="));
    const auto_nome_t = new Autocomplete(nome_t,(url+"nome&valore="));
    const auto_cognome_t = new Autocomplete(cognome_t,(url+"cognome&valore="));
    const auto_professione = new Autocomplete(professione,(url+"professione&valore="));
    const auto_indirizzo = new Autocomplete(indirizzo,(url+"indirizzo&valore="));
    const auto_indirizzo_t = new Autocomplete(indirizzo_t,(url+"indirizzo_t&valore="));
    const auto_localita = new Autocomplete(localita,(url+"localita&valore="));
    const auto_localita_t = new Autocomplete(localita_t,(url+"localita_t&valore="));
    const auto_provincia = new Autocomplete(provincia,(url+"provincia&valore="));
    const auto_provincia_t = new Autocomplete(provincia_t,(url+"provincia_t&valore="));
    const auto_cap = new Autocomplete(cap,(url+"cap&valore="));
    const auto_cap_t = new Autocomplete(cap_t,(url+"cap_t&valore="));
    
    localita.addEventListener("blur", function(e){
        
        const valueLocalita = localita.value;
        urlOk = url+"localita_c&valore="+valueLocalita;
        console.log(urlOk);

        fetch(urlOk).then(function(response){
            return response.text();
        }).then(function(localita) {
            console.log("localita "+localita);
            if(localita.trim() != "") {
                const valori = localita.split("#");
                valori[0] = valori[0].trim();
                valori[1] = valori[1].trim();
                if(valori[0] != "") {
                    provincia.value = valori[0];
                }
                if(valori[1] != "") {
                    cap.value = valori[1];
                }
                tel_casa.focus();
            }
        }).catch(function(error){
            console.log(error);
        });
    });
    
    let send = 0;
    let form;
    if(formAddSubscriber != null) {
        form = formAddSubscriber;
    } else if(formEditSubscriber != null) {
        form = formEditSubscriber;
    }
    
    function error(elem,descError) {
        send = 0;
        if(elem.classList.contains("container-radio")) {
        } else {
            elem.style.border = "1px solid #F00";
        }
        //Elimino le precedenti Box Dialog        
        if(elem.parentElement.lastElementChild.classList.contains("img-error")) {
            elem.parentElement.lastElementChild.remove();
        } else if(elem.parentElement.lastElementChild.previousElementSibling != null) {
            if(elem.parentElement.lastElementChild.previousElementSibling.classList.contains("img-error")) {
                elem.parentElement.lastElementChild.previousElementSibling.remove();
            }
        }
        
        const imageError = document.createElement("div");
        imageError.classList.add("img-error");
        const boxError = document.createElement("div");
        boxError.classList.add("box-error");
        boxError.innerHTML = descError+"<br />";
        imageError.appendChild(boxError);
        elem.parentElement.appendChild(imageError);
        
        imageError.addEventListener("mouseover", function(event){
            boxError.classList.add("opened");
        });
        
        imageError.addEventListener("mouseout", function(event){
            boxError.classList.remove("opened");
        });
    };

    form.addEventListener("submit", function(event){
        send = 1;
        const fields = this.querySelectorAll("input");
        const error_t = "&Egrave; obbligatorio compilare questo campo.";
        const error_r = "&Egrave; obbligatorio scegliere questo campo.";
        const tipoDocumento = document.getElementById("tipo_documento");
        let tutoreVal;
        
        const tutoreElem = document.querySelectorAll('[name="tutore"]');
        for(let i = 0;i < tutoreElem.length;i++) {
            if(tutoreElem[i].checked == true) {
                tutoreVal = tutoreElem[i].value;
            }
        }
        
        console.log(tutoreVal);
        function tutore(ele, error) {
            if(tutoreVal == "Y") {
                error(ele, error);
            }
        }

        tipoDocumento.style.border = "1px solid #005798";
        if(tipoDocumento.parentElement.lastElementChild.classList.contains("img-error")) {
            tipoDocumento.parentElement.lastElementChild.remove();
        };

        fields.forEach(function(v,i,a) {
             // Ad ogni controllo rimetto il bordo standard e tolgo l'icona dell'errore
            a[i].style.border = "1px solid #005798";
            if(a[i].parentElement.lastElementChild.classList.contains("img-error")) {
                a[i].parentElement.lastElementChild.remove();
            } else if(a[i].parentElement.lastElementChild.previousElementSibling != null) {
                if(a[i].parentElement.lastElementChild.previousElementSibling.classList.contains("img-error")) {
                    a[i].parentElement.lastElementChild.previousElementSibling.remove();
                }
            }
            
            if(a[i].value == "") {
                switch(a[i].name) {
                    case "data_isc":
                        error(a[i],error_t);
                    break;
                    case "data_nas":
                        error(a[i],error_t);
                    break;
                    case "num_civ":
                        error(a[i],error_t);
                    break;
                    case "provincia":
                        error(a[i],error_t);
                    break;
                    case "cap":
                        error(a[i],error_t);
                    break;
                    case "tel_casa":
                    break;
                    case "tel_cell":
                    break;
                    case "email":
                    break;
                    case "num_documento":
                        if(tipoDocumento.value > 0) {
                            error(a[i],"Avendo scelto un tipo di documento è obbligatorio compilare questo campo.");
                        };
                    break;
                    case "nome_t":
                        tutore(a[i],error_t);
                    break;
                    case "cognome_t":
                        tutore(a[i],error_t);
                    break;
                    case "indirizzo_t":
                        tutore(a[i],error_t);
                    break;
                    case "num_civ_t":
                        tutore(a[i],error_t);
                    break;
                    case "localita_t":
                        tutore(a[i],error_t);
                    break;
                    case "provincia_t":
                        tutore(a[i],error_t);
                    break;
                    case "cap_t":
                        tutore(a[i],error_t);
                    break;
                    case "tel_casa_t":
                    break;
                    case "tel_cell_t":
                    break;
                    case "email_t":
                    break;
                    case "num_documento_t":
                        tutore(a[i],error_t);
                    break;
                    default:
                        error(a[i],error_t);
                    break;
                }
            } else if(a[i].value !== "") {
                switch(a[i].name){
                    //Data Iscrizione
                    case "data_isc":
                        if(new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;Anno&minus;Mese&minus;Giorno&quot;.");
                        }
                    break;
                    //Nome
                    case "nome":
                        if(new RegExp("^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Cognome
                    case "cognome":
                        if(new RegExp("^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Data Nascita
                    case "data_nas":
                        if(new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;Anno&minus;Mese&minus;Giorno&quot;.");
                        }
                    break;
                    //Professione
                    case "professione":
                        if(new RegExp("^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Indirizzo
                    case "indirizzo":
                        if(new RegExp("^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;1)Via o Piazza 2)Nome della via o piazza&quot;.");
                        }
                    break;
                    //Numero Civico
                    case "num_civ":
                        if(new RegExp("^[0-9a-zA-Z/ ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;1)Numero civico 2)/ 3)Scala o Interno&quot;.");
                        }
                    break;
                    //Località
                    case "localita":
                        if(new RegExp("^[\.\',0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Provincia
                    case "provincia":
                        if(new RegExp("^[A-Za-z]{2}$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo due lettere.");
                        }
                    break;
                    //CAP
                    case "cap":
                        if(new RegExp("^[0-9]{5}$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere 5 numeri.");
                        }
                    break;
                    //Tel. Casa
                    case "tel_casa":
                        if(new RegExp("^[0-9]{5,12}$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                        }
                    break;
                    //Tel. Cell
                    case "tel_cell":
                        if(new RegExp("^[0-9]{8,10}$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                        }
                    break;
                    //Email
                    case "email":
                        if(new RegExp("^[a-z0-9\._%-]+@{1,1}[a-z0-9\._%-]+[\.]{1,1}[a-z]{2,6}$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Numero Documento
                    case "num_documento":
                        if(new RegExp("^[0-9a-zA-Z ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        } else {
                            if(tipoDocumento.value == 0) {
                                error(tipoDocumento,"Avendo compilato il campo Numero Documento è obbligatorio scegliere un valore per questo campo.");
                            };
                        };
                    break;
                    //Nome tutore
                    case "nome_t":
                        if(new RegExp("^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test(a[i].value) === false){
                            tutore(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Cognome tutore
                    case "cognome_t":
                        if(new RegExp("^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test(a[i].value) === false){
                            tutore(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Indirizzo tutore
                    case "indirizzo_t":
                        if(new RegExp("^[\-\.\'/0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test(a[i].value) === false){
                            tutore(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;1)Via o Piazza 2)Nome della via o piazza&quot;.");
                        }
                    break;
                    //Numero Civico tutore
                    case "num_civ_t":
                        if(new RegExp("^[0-9a-zA-Z/ ]+$").test(a[i].value) === false){
                            tutore(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;1)Numero civico 2)/ 3)Scala o Interno&quot;.");
                        }
                    break;
                    //Località tutore
                    case "localita_t":
                        if(new RegExp("^[\.\',0-9a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test(a[i].value) === false){
                            tutore(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Provincia tutore
                    case "provincia_t":
                        if(new RegExp("^[A-Za-z]{2}$").test(a[i].value) === false){
                            tutore(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo due lettere.");
                        }
                    break;
                    //CAP tutore
                    case "cap_t":
                        if(new RegExp("^[0-9]{5}$").test(a[i].value) === false){
                            tutore(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere 5 numeri.");
                        }
                    break;
                    //Tel. Casa tutore
                    case "tel_casa_t":
                        if(new RegExp("^[0-9]{5,12}$").test(a[i].value) === false){
                            tutore(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                        }
                    break;
                    //Tel. Cell tutore
                    case "tel_cell_t":
                        if(new RegExp("^[0-9]{8,10}$").test(a[i].value) === false){
                            tutore(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve contenere solo numeri.");
                        }
                    break;
                    //Email tutore
                    case "email_t":
                        if(new RegExp("^[a-z0-9\._%-]+@{1,1}[a-z0-9\._%-]+[\.]{1,1}[a-z]{2,6}$").test(a[i].value) === false){
                            tutore(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Numero Documento tutore
                    case "num_documento_t":
                        if(new RegExp("^[0-9a-zA-Z ]+$").test(a[i].value) === false){
                            tutore(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                };
            };
            
            if(a[i].type == "radio") {
                switch(a[i].name) {
                    case "sesso":
                    case "internet":
                    case "privacy":
                    case "tutore":
                        if(a[i].checked == false && a[i+1].checked == false) {
                            if(a[i+1].parentElement.parentElement.classList.contains("container-radio")) {
                                error(a[i+1].parentElement.parentElement,error_r);
                            }
                        } else {
                            if(a[i+1].parentElement.parentElement.parentElement.lastElementChild.classList.contains("img-error")) {
                                a[i+1].parentElement.parentElement.parentElement.lastElementChild.remove();
                            }
                        }
                    break;
                    case "sesso_t":
                        if(a[i].checked == false && a[i+1].checked == false) {
                            if(a[i+1].parentElement.parentElement.classList.contains("container-radio")) {
                                tutore(a[i+1].parentElement.parentElement,error_r);
                            }
                        } else {
                            if(a[i+1].parentElement.parentElement.parentElement.lastElementChild.classList.contains("img-error")) {
                                a[i+1].parentElement.parentElement.parentElement.lastElementChild.remove();
                            }
                        }
                    break;
                };
            };
            
        });
        
        if(send === 0){
            event.preventDefault();
            //  Finestra di avviso
            const header = "Avviso";
            const avviso = '<p>CI SONO DEGLI <strong>ERRORI</strong>, CORREGGERLI E PREMERE NUOVAMENTE SUL PULSANTE "INVIA", GRAZIE.</p>';
            const dialog = new Dialog(header,avviso);
        };
    });
    
    //Apertura finestre di dialogo per errori ed avvisi    
    if(location.search.indexOf("errore_add_t") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">IL TUTORE DELL\'ISCRITTO NON &Egrave; STATO AGGIUNTO...RIPROVA</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("errore_add") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">L\'ISCRITTO NON &Egrave; STATO AGGIUNTO...RIPROVA</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("error_update_t") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">IL TUTORE DELL\'ISCRITTO NON &Egrave; STATO MODIFICATO...RIPROVA</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("error_update") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">L\'ISCRITTO NON &Egrave; STATO MODIFICATO...RIPROVA</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("success_addimagesubscriber") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">IMMAGINE MODIFICATA CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
};

// ****************************  Pagina Aggiungi/Modifica Utente ********************************** //
//Dichiarazione Variabili
//  Controllo errori FORM
const formEditOperator = document.getElementById("edit_profile");

if(formEditOperator != null) {
    
    document.getElementById("oldpassword").value = "";
    document.getElementById("newpassword").value = "";
    
    // Autocompletamento campi con richiesta dal server
    let url = "./include-php/content_global.php?tipo=";
    const nome = document.getElementById("nome");
    const cognome = document.getElementById("cognome");
    
    const auto_nome = new Autocomplete(nome,(url+"nome&valore="));
    const auto_cognome = new Autocomplete(cognome,(url+"cognome&valore="));
    
    let send = 0;
    const form = formEditOperator;
    
    function error(elem,descError) {
        send = 0;
        if(elem.classList.contains("container-radio")) {
        } else {
            elem.style.border = "1px solid #F00";
        }
        //Elimino le precedenti Box Dialog        
        if(elem.parentElement.lastElementChild.classList.contains("img-error")) {
            elem.parentElement.lastElementChild.remove();
        } else if(elem.parentElement.lastElementChild.previousElementSibling != null) {
            if(elem.parentElement.lastElementChild.previousElementSibling.classList.contains("img-error")) {
                elem.parentElement.lastElementChild.previousElementSibling.remove();
            }
        }
        
        const imageError = document.createElement("div");
        imageError.classList.add("img-error");
        const boxError = document.createElement("div");
        boxError.classList.add("box-error");
        boxError.innerHTML = descError+"<br />";
        imageError.appendChild(boxError);
        elem.parentElement.appendChild(imageError);
        
        imageError.addEventListener("mouseover", function(event){
            boxError.classList.add("opened");
        });
        
        imageError.addEventListener("mouseout", function(event){
            boxError.classList.remove("opened");
        });
    };

    form.addEventListener("submit", function(event){
        send = 1;
        const fields = this.querySelectorAll("input");
        const error_t = "&Egrave; obbligatorio compilare questo campo.";
        const error_r = "&Egrave; obbligatorio scegliere questo campo.";

        fields.forEach(function(v,i,a) {
             // Ad ogni controllo rimetto il bordo standard e tolgo l'icona dell'errore
            a[i].style.border = "1px solid #005798";
            if(a[i].parentElement.lastElementChild.classList.contains("img-error")) {
                a[i].parentElement.lastElementChild.remove();
            } else if(a[i].parentElement.lastElementChild.previousElementSibling != null) {
                if(a[i].parentElement.lastElementChild.previousElementSibling.classList.contains("img-error")) {
                    a[i].parentElement.lastElementChild.previousElementSibling.remove();
                }
            }
            
            if(a[i].value == "") {
                switch(a[i].name) {
                    case "oldpassword":
                    case "newpassword":
                    break;
                    default:
                        error(a[i],error_t);
                    break;
                }
            } else if(a[i].value !== "") {
                switch(a[i].name){
                    //Nome
                    case "nome":
                        if(new RegExp("^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Cognome
                    case "cognome":
                        if(new RegExp("^[\-\'a-zA-Z\xE0\xE8\xE9\xF9\xF2\xEC\x27 ]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Email
                    case "email":
                        if(new RegExp("^[a-z0-9\._%-]+@{1,1}[a-z0-9\._%-]+[\.]{1,1}[a-z]{2,6}$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.");
                        }
                    break;
                    //Old password
                    case "oldpassword":
                        const newpassword = document.getElementById("newpassword");
                        if(newpassword.value == "") {
                            error(a[i],"Se hai compilato QUESTO CAMPO devi compilare anche il campo NUOVA PASSWORD.");
                        }
                    break;
                    //New password
                    case "newpassword":
                        const oldpassword = document.getElementById("oldpassword");
                        if(oldpassword.value == "") {
                            error(a[i],"Se hai compilato QUESTO CAMPO devi compilare anche il campo VECCHIA PASSWORD.");
                        }
                    break;
                };
            };
        });
        
        if(send === 0){
            event.preventDefault();
            //  Finestra di avviso
            const header = "Avviso";
            const avviso = '<p>CI SONO DEGLI <strong>ERRORI</strong>, CORREGGERLI E PREMERE NUOVAMENTE SUL PULSANTE "INVIA", GRAZIE.</p>';
            const dialog = new Dialog(header,avviso);
        };
    });
    
    //Apertura finestre di dialogo per errori ed avvisi    
    if(location.search.indexOf("success_update_u") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">IL PROFILO &Egrave; STATO MODIFICATO CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("error_update_u") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">IL PROFILO NON &Egrave; STATO MODIFICATO...RIPROVA</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("error_username") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">LA TUA USERNAME E LA TUA PASSWORD NON COINCIDONO (PROBABILMENTE NON HAI INSERITO LA TUA VECCHIA PASSWORD CORRETTAMENTE)</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("success_addimageoperator") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">IMMAGINE MODIFICATA CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
};

// ****************************  Pagina Cerca uTENTE ********************************** //
const formSearchSubscriber = document.getElementById("search_subscriber");
if(formSearchSubscriber != null) {

    // Autocompletamento campi con richiesta dal server
    let url = "./include-php/content_global.php?tipo=";
    const nome = document.getElementById("nome");
    const cognome = document.getElementById("cognome");
    const professione = document.getElementById("professione");
    
    const auto_nome = new Autocomplete(nome,(url+"nome&valore="));
    const auto_cognome = new Autocomplete(cognome,(url+"cognome&valore="));
    const auto_professione = new Autocomplete(professione,(url+"professione&valore="));
};

const schedaGlobal = document.getElementById("scheda_global");
if(schedaGlobal != null) {
    //Creo le tabs
    if(location.search.indexOf("anno_p") !== -1 || location.search.indexOf("restitution") !== -1 || location.search.indexOf("new") !== -1 || location.search.indexOf("remove_loan") !== -1) {
        const tabs = new Tabs(schedaGlobal,2);
    } else if(location.search.indexOf("motivation") !== -1) {
        const tabs = new Tabs(schedaGlobal,3);
    } else if(location.search.indexOf("socio") !== -1) {
        const tabs = new Tabs(schedaGlobal,4);
    } else {
        const tabs = new Tabs(schedaGlobal);
    }
    
    //Apertura finestre di dialogo per errori ed avvisi
    if(location.search.indexOf("success_add_c") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">CATALOGAZIONE AGGIUNTA CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("success_update_c") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">CATALOGAZIONE MODIFICATA CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("success_addimagecatalog") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">IMMAGINE MODIFICATA CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("success_addimagesubscriber") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">IMMAGINE MODIFICATA CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("success_add_i") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">ISCRITTO AGGIUNTO CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("success_update_i") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">ISCRITTO MODIFICATO CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("success_suspended") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">SOSPENSIONE ISCRITTO AVVENUTA CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("error_update_suspended") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">AGGIORNAMENTO SOSPENSIONE NON AVVENUTO...RIPROVA</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("error_suspended") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">AGGIUNTA SOSPENSIONE NON AVVENUTA...RIPROVA</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("success_readmission") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">RIAMMISSIONE ISCRITTO AVVENUTA CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("error_update_readmission") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">AGGIORNAMENTO RIAMMISSIONE NON AVVENUTA...RIPROVA</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("error_readmission") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">RIAMMISSIONE NON AVVENUTA...RIPROVA</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("info_socio") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">ELIMINAZIONE SOCIO PER L\'ANNO INDICATO AVVENUTA CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("error_renewed") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">L\'UTENTE &Egrave; SOSPESO PER CUI NON &Egrave; POSSIBILE RINNOVARE IL PRESTITO</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("error_news") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">QUESTO PRESTITO NON PU&Ograve; ESSERE RINNOVATO PERCH&Egrave; SI TRATTA DI UNA NOVIT&Agrave;</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("error_renewal") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">QUESTO PRESTITO NON PU&Ograve; PI&Ugrave; ESSERE RINNOVATO</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("success_renewal") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">IL RINNOVO DI QUESTO PRESTITO &Egrave; AVVENUTO CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("error_renewal_no") !== -1) {
        const header = "Errore";
        const errore = '<p class="center">QUESTO PRESTITO NON PU&Ograve; PI&Ugrave; ESSERE RINNOVATO</p>';
        const dialog = new Dialog(header,errore);
    }
    if(location.search.indexOf("success_restitution") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">INSERIMENTO RESTITUZIONE AVVENUTO CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("success_remove_loan") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">ELIMINAZIONE PRESTITO AVVENUTA CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("success_motivation") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">MOTIVAZIONE AGGIORNATA CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("error_motivation") !== -1) {
        const header = "Errore";
        const error = '<p class="center">ERRORE NELL\'AGGIORNAMENTO DELLA MOTIVAZIONE...RIPROVA</p>';
        const dialog = new Dialog(header,error);
    }
    if(location.search.indexOf("success_socio") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">L\'UTENTE &Egrave; STATO INSERITO NEI SOCI</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("error_socio") !== -1) {
        const header = "Errore";
        const error = '<p class="center">ERRORE: L\'UTENTE NON &Egrave; INSERITO NEI SOCI...RIPROVA</p>';
        const dialog = new Dialog(header,error);
    }
    if(location.search.indexOf("gia_socio") !== -1) {
        const anno = location.search.substr((location.search.indexOf("gia_socio")+19),4);
        const header = "Avviso";
        const avviso = '<p class="center">L\'UTENTE &Egrave; GI&Agrave; SOCIO PER L\'ANNO '+anno+'</p>';
        const dialog = new Dialog(header,avviso);
    }
}

// Se c'è il pulsante Vedi Dati Tutore attivo l'animazione
const buttonDatiTutore = document.getElementById("vedi_dati_tutore");
if(buttonDatiTutore != null) {
    const containerTutore = document.getElementById("container_tutore");
    buttonDatiTutore.addEventListener("click", function(e) {
        containerTutore.classList.toggle("opened");
    });
}


// ****************************  Pagina Aggiungi/Modifica Catalogazione ********************************** //
//Dichiarazione Variabili
//  Controllo errori FORM
const formAddLoan = document.getElementById("add_loan");

if(formAddLoan != null) {
    
    // Variabili
    let url = "./include-php/content_global.php?tipo=";
    const isbn_p = document.getElementById("isbn_p");
    const num_tes_p = document.getElementById("num_tes_p");
    const num_inventario_p = document.getElementById("num_inv_p");
    const data_pres = document.getElementById("data_pres_p");
    const list_cat_a = new Array();
    const list_sub_a = new Array();
    const card_c = document.getElementById("cataloguing");
    const card_s = document.getElementById("subscriber");
    const button_c = document.getElementById("scheda_c");
    const button_s = document.getElementById("scheda_s");
    const ris_s = document.getElementById("num_tes_s");
    const ris_c = document.getElementById("num_inv_s");
    const ris_ci = document.getElementById("isbn_s");
    const closeSubscriber = document.getElementById("close-subscriber");
    const closeCatalog = document.getElementById("close-catalog");
    const itemsCardCatalog = document.querySelectorAll("#cataloguing li");
    const itemsCardSubscriber = document.querySelectorAll("#subscriber li");
    const radioProperties = document.querySelectorAll(".container-radio .radio");
    
    button_c.style.visibility = "hidden";
    button_s.style.visibility = "hidden";
    
    //Inserisco la data odierna
    let data_odierna = new Date();
    const mese = (data_odierna.getMonth()+1);
    const giorno = data_odierna.getDate();
    data_odierna = data_odierna.getFullYear()+"-"+(String(mese).length == 1 ? "0"+mese : mese)+"-"+(String(giorno).length == 1 ? "0"+giorno : giorno);
    console.log(data_odierna);
    console.log(data_pres);
    data_pres.value = data_odierna;
    
    // Avviso l'utente che prima di compilare il campo numero inventario deve scegliere la proprieta
    num_inventario_p.addEventListener("focus", function(event){
       const radioProprieta = document.querySelectorAll('[name="proprieta_p"]');
       let checked = 0;
       for(let i = 0;i < radioProprieta.length;i++) {
           if(radioProprieta[i].checked == true) {
               checked++;
           }
       }
       if(checked == 0) {
            //  Finestra di avviso
            const header = "Avviso";
            const avviso = "<p>PRIMA DI COMPILARE QUESTO CAMPO E' NECESSARIO SCEGLIERE IL CAMPO <strong>PROPRIETA'</strong></p>";
            const dialog = new Dialog(header,avviso,document.getElementById("isbn_p"),true);
       }
    });
    
    //Array per traduzione sigle
    const traduzione_sigle_cataloguing = {
        "Y" : "Si",
        "N" : "No",
        "P" : "Papillon",
        "C" : "Comune",
        "F" : "Filofestival"
    };
    
    const traduzione_sigle_subscriber = {
        "Y" : "Si",
        "N" : "No",
        "M" : "Maschio",
        "F" : "Femmina"
    };
        
    //Vado a prendere la struttura e le etichette dei due div (catalogazione ed utente) che andranno a contenere i dati caricati tramite chiamate ajax
    itemsCardCatalog.forEach(function(v,i,a){
        list_cat_a[i] = a[i].innerHTML.trim();
    });
    itemsCardSubscriber.forEach(function(v,i,a){
        list_sub_a[i] = a[i].innerHTML.trim();
    });
    
    //Funzione per caricare i dati catalogazione tramite ajax
    function cardCataloguing(proprieta,num_inv) {
        let url_fine = url+"num_inv_p&valore_inv="+encodeURIComponent(num_inv)+"&valore_sigla="+proprieta;
        console.log(url_fine);
        fetch(url_fine).then(function(response) {
            return response.text();
        }).then(function(data) {
            console.log(data);
            if(data != 0) {
                ris_c.innerHTML = "Nascondi Scheda Catalogazione";
                const data_v = data.split("#");
                button_c.setAttribute('href','./card_catalog.php?id_catalog='+data_v[0]+'&p=1&tr=');
                button_c.style.visibility = "visible";
                console.log(data_v);
                console.log(itemsCardCatalog);
                console.log(list_cat_a);
                data_v.splice(5,1);
                itemsCardCatalog.forEach(function(v,i,a) {
                    a[i].innerHTML = "";
                    switch(i) {
                        case 1:
                        case 15:
                        case 18:
                        case 21:
                            a[i].innerHTML = list_cat_a[i]+" <em>"+traduzione_sigle_cataloguing[data_v[i+1]]+"</em>";		
                        break;
                        case 11:
                            a[i].innerHTML = list_cat_a[i]+" <em>"+data_v[i+1]+" [cm]</em>";
                        break;
                        case 14:
                            const data_vet = data_v[i+1].split("-");
                            const data_c = data_vet[2]+"-"+data_vet[1]+"-"+data_vet[0];
                            a[i].innerHTML = list_cat_a[i]+" <em>"+data_c+"</em>";
                        break;
                        case 16:
                            a[i].innerHTML = list_cat_a[i]+" <em>"+data_v[i+1]+" &euro;</em>";
                        break;
                        default:
                            a[i].innerHTML = list_cat_a[i]+" <em>"+data_v[i+1]+"</em>";		
                        break;
                    }
                });
                card_c.style.display = "block";
            } else {
                ris_c.innerHTML = "Nessuna Catalogazione";					
                card_c.style.display = "none";
                button_c.style.visibility = "hidden";
            };
        }).catch(function(error) {
            console.log("Errore caricamento dati");
        });
    };
    
    //Funzione per caricare i dati utente tramite ajax
    function cardSubscriber(num_tes) {
        let url_fine = url+"num_tes_p&valore_num_tessera="+encodeURIComponent(num_tes);
        fetch(url_fine).then(function(response) {
            return response.text();
        }).then(function(data) {
            if(data != 0) {
                ris_s.innerHTML = "Nascondi Scheda Utente";
                const data_v = data.split("#");
                button_s.setAttribute('href','./card_subscriber.php?id_iscritto='+data_v[0]+'&p=1&tr=');
                button_s.style.visibility = "visible";
                console.log(data_v);
                console.log(list_sub_a);
                data_v.splice(3,1);
                itemsCardSubscriber.forEach(function(v,i,a) {
                    card_s.style.display = "block";
                    a[i].innerHTML = "";
                    switch(i) {
                        case 4:
                        case 15:
                        case 16:
                        case 17:
                            a[i].innerHTML = list_sub_a[i]+" <em>"+traduzione_sigle_subscriber[data_v[i+1]]+"</em>";		
                        break;
                        case 1:
                        case 5:
                            const data_vet = data_v[i+1].split(" ");
                            const data_vet_c = data_vet[0].split("-");
                            const data_c = data_vet_c[2]+"-"+data_vet_c[1]+"-"+data_vet_c[0];
                            a[i].innerHTML = list_sub_a[i]+" <em>"+data_c+"</em>";
                        break;
                        case 18:
                            let tipo_doc;
                            switch(data_v[i+1]) {
                                case '0':
                                    tipo_doc = '-';
                                break;
                                case '1':
                                    tipo_doc = "Carta d'Identit&agrave;";
                                break;
                                case '2':
                                    tipo_doc = 'Carta dei Servizi';
                                break;
                                case '3':
                                    tipo_doc = 'Passaporto';
                                break;
                                case '4':
                                    tipo_doc = 'Tessera Sanitaria';
                                break;
                                default:
                                    tipo_doc = '-';
                                break;
                            }							
                            a[i].innerHTML = list_sub_a[i]+" <em>"+tipo_doc+"</em>";
                        break;
                        default:
                            a[i].innerHTML = list_sub_a[i]+" <em>"+data_v[i+1]+"</em>";
                        break; 
                    }
                });
                card_s.style.display = "block";
            }
            else
            {
                ris_s.innerHTML = "Nessun Utente";					
                card_s.style.display = "none";
                button_s.style.visibility = "hidden";
            }
        }).catch(function(error) {
            console.log("Errore caricamento dati");
        });
    }
    
    isbn_p.addEventListener("keyup", function(e) {
        let val = this.value;
        console.log(val);
        if(val != "") {
            let url_isbn = url+"isbn&valore="+val;
            fetch(url_isbn).then(function(response) {
                return response.text();
            }).then(function(data) {
                if(data != 0) {
                    const values = data.split('#');
                    if(values[0].trim() == "P")
                    {
                        radioProperties[0].checked = true;
                        radioProperties[0].parentElement.style.backgroundColor = "#96e979";
                    }
                    else if(values[0].trim() == "C")
                    {
                        radioProperties[1].checked = true;
                        radioProperties[1].parentElement.style.backgroundColor = "#96e979";
                    }
                    else if(values[0].trim() == "F")
                    {
                        radioProperties[2].checked = true;
                        radioProperties[2].parentElement.style.backgroundColor = "#96e979";
                    }
                    num_inventario_p.value = values[1].trim();
                    cardCataloguing(values[0].trim(), values[1].trim());
                    num_tes_p.focus();
                } else {
                    num_inventario_p.value = "";
                    radioProperties.forEach(function(v,i,a) {
                        a[i].checked = false;
                        a[i].parentElement.style.backgroundColor = "#e7e7e7";
                    });
                    cardCataloguing("", "");
                }
            }).catch(function(error) {
                console.log("Errore caricamento dati");
            });
        };
    });
    
    num_inventario_p.addEventListener("keyup", function(e) {
        let num_inv = this.value;
        let proprieta;
        const papillon = document.getElementById("papillon");
        const comune = document.getElementById("comune");
        const filo = document.getElementById("festival");
        console.log(num_inv);
        if(papillon.checked == true) {
            proprieta = papillon.value;
        } else if(comune.checked == true) {
            proprieta = comune.value;
        } else if(filo.checked == true) {
            proprieta = filo.value;
        }
        console.log(proprieta);
        cardCataloguing(proprieta, num_inv);
    });
    
    num_tes_p.addEventListener("keyup", function(e) {
        let val = this.value;
        console.log(val);
        if(val != "") {
            cardSubscriber(val);
        };
    });
    
    //Chiudo le schede se sono aperte e le apro se sono chiuse
    closeSubscriber.addEventListener("click", function(e){
        if(card_s.style.display == "block") {
            card_s.style.display = "none";
            ris_s.innerHTML = "Vedi Scheda Utente";
        }
    });
    
    closeCatalog.addEventListener("click", function(e){
        if(card_c.style.display == "block") {
            card_c.style.display = "none";
            ris_c.innerHTML = "Vedi Scheda Catalogazione";
        }
    });
    
    ris_s.addEventListener("click", function(e){
        if(card_s.style.display == "none") {
            card_s.style.display = "block";
            e.target.innerHTML = "Nascondi Scheda Utente";
        } else {
            card_s.style.display = "none";
            e.target.innerHTML = "Vedi Scheda Utente";
        }
    });
    
    ris_c.addEventListener("click", function(e){
        if(card_c.style.display == "none") {
            card_c.style.display = "block";
            e.target.innerHTML = "Nascondi Scheda Catalogazione";
        } else {
            card_c.style.display = "none";
            e.target.innerHTML = "Vedi Scheda Catalogazione";
        }
    });
    
    //Apertura finestre di dialogo per errori ed avvisi
    if(location.search.indexOf("errors=yes") !== -1) {
        const errors = document.getElementById('errors').innerHTML;
        console.log("Elenco errori:"+errors);
        const header = "Errori";
        const avviso = errors;
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("loan=lent") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">QUESTA CATALOGAZIONE &Egrave; GI&Agrave; IN PRESTITO</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("subscriber=suspended") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">L\'ISCRITTO &Egrave; SOSPESO PER CUI NON &Egrave; POSSIBILE DARE CATALOGAZIONI IN PRESTITO</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("loan=limit") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">L\'ISCRITTO HA GI&Agrave; RICHIESTO TRE PRESTITI PER CUI NON PU&Ograve; RICHIEDERNE ALTRI</p>';
        const dialog = new Dialog(header,avviso);
    }
    if(location.search.indexOf("loan=success") !== -1) {
        const header = "Avviso";
        const avviso = '<p class="center">IL PRESTITO &Egrave; AVVENUTO CORRETTAMENTE</p>';
        const dialog = new Dialog(header,avviso);
    }
    
    
    
    //Apertura scheda utente e/o catalogazione nel caso siano già presenti nell'URL
    if(location.search.indexOf("sigla_inv") !== -1 && location.search.indexOf("num_inv") !== -1) {
        const query = location.search.split("&");
        const proprieta = query[0].split("=")[1];
        const num_inv = query[1].split("=")[1];
        const radioProprieta = document.querySelectorAll('[name="proprieta_p"]');
        for(let i = 0;i < radioProprieta.length;i++) {
            if(radioProprieta[i].value == proprieta) {
                radioProprieta[i].checked = true;
                radioProprieta[i].parentElement.style.backgroundColor = "#96e979";
            }
        }
        num_inventario_p.value = num_inv;
        console.log("Proprietà:"+proprieta+"NumInv:"+num_inv);
        cardCataloguing(proprieta,num_inv);
        document.getElementById("num_tes_p").focus();
    }	
    if(location.search.indexOf("num_tes") !== -1) {
        const query = location.search.split("&");
        console.log(query[0]);
        const num_tes = query[0].split("=")[1];
        console.log(num_tes);
        num_tes_p.value = num_tes;
        cardSubscriber(num_tes);
    }
    
    function error(elem,descError) {
        send = 0;
        if(elem.classList.contains("container-radio")) {
        } else {
            elem.style.border = "1px solid #F00";
        }
        //Elimino le precedenti Box Dialog        
        if(elem.parentElement.lastElementChild.classList.contains("img-error")) {
            elem.parentElement.lastElementChild.remove();
        }
        
        const imageError = document.createElement("div");
        imageError.classList.add("img-error");
        const boxError = document.createElement("div");
        boxError.classList.add("box-error");
        boxError.innerHTML = descError+"<br />";
        imageError.appendChild(boxError);
        elem.parentElement.appendChild(imageError);
        
        imageError.addEventListener("mouseover", function(event){
            boxError.classList.add("opened");
        });
        
        imageError.addEventListener("mouseout", function(event){
            boxError.classList.remove("opened");
        });
    };
    
    //Controllo se ci sono errori nel form
    formAddLoan.addEventListener("submit", function(event){
        send = 1;
        const fields = this.querySelectorAll("input");
        const error_t = "&Egrave; obbligatorio compilare questo campo.";
        const error_r = "&Egrave; obbligatorio scegliere questo campo.";

        fields.forEach(function(v,i,a) {
             // Ad ogni controllo rimetto il bordo standard e tolgo l'icona dell'errore
            a[i].style.border = "1px solid #005798";
            if(a[i].parentElement.lastElementChild.classList.contains("img-error")) {
                a[i].parentElement.lastElementChild.remove();
            };
            
            if(a[i].value == "") {
                switch(a[i].name) {
                    case "isbn_p":
                        const num_inv = document.getElementById("num_inv_p");
                        if(num_inv.value == "") {
                            error(a[i],error_t);
                        }
                    break;
                    case "num_inv_p":
                        const isbn = document.getElementById("isbn_p");
                        if(isbn.value == "") {
                            error(a[i],error_t);
                        }
                    break;
                    case "num_tes_p":
                        error(a[i],error_t);
                    break;
                    case "data_pres_p":
                        error(a[i],error_t);
                    break;
                    default:
                        error(a[i],error_t);
                    break;
                }
            } else if(a[i].value !== "") {
                switch(a[i].name){
                    //Data Prestito
                    case "data_pres_p":
                        if(new RegExp("^[0-9]{4}-[0-9]{2}-[0-9]{2}$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto.<br />Il valore da inserire deve essere scritto in questa forma &quot;Anno&minus;Mese&minus;Giorno&quot;.");
                        }
                    break;
                    //Numero tessera
                    case "num_tes_p":
                        if(new RegExp("^[0-9]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto. Il valore deve essere un numero.");
                        }
                    break;
                    //Numero inventario
                    case "num_inv_p":
                        if(new RegExp("^[0-9\(\)]+$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto. Il valore deve essere un numero.");
                        }
                    break;
                    //ISBN
                    case "isbn_p":
                        if(new RegExp("^[0-9]{10,13}$").test(a[i].value) === false){
                            error(a[i],"Hai inserito un valore non corretto. Il valore deve essere un numero.");
                        }
                    break;
                };
            };
            
            if(a[i].type == "radio") {
                switch(a[i].name) {
                    case "proprieta_p":
                        if(a[i].checked == false && a[i+1].checked == false && a[i+2].checked == false) {
                            const isbn = document.getElementById("isbn_p");
                            if(isbn.value == "") {
                                if(a[i+2].parentElement.parentElement.classList.contains("container-radio")) {
                                    error(a[i+2].parentElement.parentElement,error_r);
                                }
                            }
                        } else {
                            if(a[i+2].parentElement.parentElement.parentElement.lastElementChild.classList.contains("img-error")) {
                                a[i+2].parentElement.parentElement.parentElement.lastElementChild.remove();
                            }
                        }
                    break;
                };
            };
            
        });
        
        if(send === 0){
            event.preventDefault();
            //  Finestra di avviso
            const header = "Avviso";
            const avviso = '<p>CI SONO DEGLI <strong>ERRORI</strong>, CORREGGERLI E PREMERE NUOVAMENTE SUL PULSANTE "INVIA", GRAZIE.</p>';
            const dialog = new Dialog(header,avviso);
        };
    });
};

// ****************************  Pagina Iscritti per classe ********************************** //
//Dichiarazione Variabili
//  Controllo errori FORM
const registeredByClass = document.getElementById("registered_by_class");

if(registeredByClass != null) {
    
    const printButton = document.getElementById("stampa");
    const form = registeredByClass;
    printButton.style.display = "none";
    
    
    
    const inputText = document.querySelectorAll('[type="text"]');
    
    form.addEventListener("submit", function(e){
        inputText.forEach(function(v,i,a) {
            if(a[i].getAttribute('disabled') == "disabled") {
                a[i].removeAttribute('disabled');
            }
        });
    });
    
    inputText[0].value = "0";
    inputText[0].setAttribute("disabled", "disabled");
    inputText[1].focus();
    inputText[1].addEventListener("blur", function(e){
        if(this.value != "") {
            if(new RegExp("^[0-9]+$").test(this.value) === false){
                this.value = "";
                //  Finestra di avviso
                const header = "Avviso";
                const avviso = "<p>&Egrave; possibile inserire solo numeri interi positivi.</p>";
                const dialog = new Dialog(header,avviso);
                this.focus();
            } else {		
                const valore = parseInt(this.value)+1;
                inputText[2].value = valore;
                inputText[2].setAttribute("disabled", "disabled");
                inputText[3].focus();
            }
        };
    });
    inputText.forEach(function(v,i,a) {
        a[i+2].addEventListener("focus",function(e){
            if(a[i+1].value == "") {
                a[i+1].focus();
            }
        });
        a[i+3].addEventListener("blur",function(e){
            if(this.value != "") {
                if(new RegExp("^[0-9]+$").test(this.value) === false){
                    this.value = "";
                    //  Finestra di avviso
                    const header = "Avviso";
                    const avviso = "<p>&Egrave; possibile inserire solo numeri interi positivi.</p>";
                    const dialog = new Dialog(header,avviso);
                    exit();
                } else if(parseInt(this.value) < parseInt(a[i+2].value)) {
                    this.value = "";
                    //  Finestra di avviso
                    const header = "Avviso";
                    const avviso = "<p>Hai inserito un valore inferiore rispetto alla casella precedente.</p>";
                    const dialog = new Dialog(header,avviso);
                    exit();
                } else {			
                    if((typeof parseInt(this.value) == "number")) {
                        const valore = parseInt(this.value)+1;
                        a[i+4].value = valore;
                        a[i+4].setAttribute("disabled","disabled");
                        a[i+5].focus();
                        i = i + 2;
                    };
                };
            };
        });
    });
};

// ****************************  Pagina Catalogazioni Novità ********************************** //
//Dichiarazione Variabili
//  Controllo errori FORM
const newsCatalog = document.getElementById("form-novita");

if(newsCatalog != null) {
    newsCatalog.addEventListener("submit", function(e){
        const itemsNews = document.querySelectorAll('[type="checkbox"]');
        let numChecked = 0;
        itemsNews.forEach(function(v,i,a) {
            if(a[i].checked == true) {
                numChecked++;
            };
        });
        if(numChecked == 0) {
            e.preventDefault();
        };
    });
};

// ****************************  Pagina Catalogazioni Alienate ********************************** //
//Dichiarazione Variabili
//  Controllo errori FORM
const alienCatalog = document.getElementById("form-alienate");

if(alienCatalog != null) {
    alienCatalog.addEventListener("submit", function(e){
        const itemsAlien = document.querySelectorAll('[type="checkbox"]');
        let numChecked = 0;
        itemsAlien.forEach(function(v,i,a) {
            if(a[i].checked == true) {
                numChecked++;
            };
        });
        if(numChecked == 0) {
            e.preventDefault();
        };
    });
};

// ****************************** Pagina Aggiunta Prestito *********************** //
//Rendo drag and drop le schede Catalogazione e Utente
const cardSubscriber = document.getElementById("subscriber");
const cardCataloguing = document.getElementById("cataloguing");
const moveCardCataloguing = document.getElementById("move-cataloguing");
const moveCardSubscriber = document.getElementById("move-subscriber");
if(cardCataloguing != null && cardSubscriber != null) {
    cardSubscriber.addEventListener("dragstart", function(e) {
        e.dataTransfer.setData("text", e.target.id);
        e.dataTransfer.dropEffect = "move";
    });
    
    cardCataloguing.addEventListener("dragstart", function(e) {
        e.dataTransfer.setData("text", e.target.id);
        e.dataTransfer.dropEffect = "move";
    });
    
    const target = document.getElementById("target");
    target.addEventListener("dragover",function(e) {
        e.preventDefault();
    });
    target.addEventListener("dragenter",function(e) {
        e.preventDefault();
    });
    target.addEventListener("drop",function(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData("text");
        if(data == "subscriber") {
            console.log(e.offsetX+" "+e.pageX);
            console.log(e.offsetY+" "+e.pageY);
            console.log(e.relatedTarget);
            cardSubscriber.style.left = e.pageX+"px";
            cardSubscriber.style.top = e.pageY+"px";
        } else if(data == "cataloguing"){
            cardCataloguing.style.left = e.clientX+"px";
            cardCataloguing.style.top = e.clientY+"px";
        }
        document.body.appendChild(document.getElementById(data));
    });
}

// ****************************** Inserimento motivazione sospensione *********************** //
const motivazioni = document.getElementsByClassName("motivazione");
const formMotivazione = document.getElementById("form_motivazione");
if(formMotivazione !== null) {
    formMotivazione.parentElement.style.display = "none";
}
if(motivazioni !== null && motivazioni.length > 0) {
    let number_motivation = motivazioni.length;
    for(let i = 0;i < motivazioni.length;i++) {
        motivazioni[i].addEventListener("click", function(e) {
            
            const formMotivazione = document.getElementById("form_motivazione");
            formMotivazione.parentElement.style.display = "block";
            document.getElementById("motivazione").focus();
            formMotivazione.addEventListener("submit", function(e) {
                
                e.preventDefault();
                const id_sospeso = motivazioni[i].id;
                console.log(id_sospeso);
                const motivation = document.getElementById("motivazione").value;
                console.log(motivation);
                const url = "./include-php/content_global.php?tipo=motivazione&motivazione="+encodeURIComponent(motivation)+"&id_sospeso="+id_sospeso;
                
                fetch(url).then(function(response) {
                    if(response.ok) {
                        return response.text();
                    } else {
                        const error = "Errore dal Server";
                        return error;
                    }
                }).then(function(data) {
                    if(data.trim() == 1) {
                        const id_iscritto = location.search.substr((location.search.indexOf("id_iscritto=")+12),1);
                        location.href = location.pathname+"?id_iscritto="+id_iscritto+"&success_motivation=yes";
                    } else {
                        const id_iscritto = location.search.substr((location.search.indexOf("id_iscritto=")+12),1);
                        location.href = location.pathname+"?id_iscritto="+id_iscritto+"&error_motivation=yes";
                    }
                }).catch(function() {
                    const error = "Errore di rete";
                    console.log(error);
                });
                
            });
        });
    };
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJnZXN0aW9uZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL0Jsb2NjbyBpIHB1bHNhbnRpIGF2YW50aSBlZCBpbmRpZXRyb1xuY29uc3QgZm9ybUVkaXRDYXRhbG9ndWluZ0kgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRfY2F0YWxvZ1wiKTtcbmNvbnN0IGZvcm1FZGl0U3Vic2NyaWJlckkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRfc3Vic2NyaWJlclwiKTtcbmNvbnN0IGZvcm1BZGRMb2FuSSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2xvYW5cIik7XG5pZihmb3JtRWRpdENhdGFsb2d1aW5nSSAhPSBudWxsIHx8IGZvcm1FZGl0U3Vic2NyaWJlckkgIT0gbnVsbCB8fCBmb3JtQWRkTG9hbkkgIT0gbnVsbCkge1xuICAgIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIGxvY2F0aW9uLmhyZWYpO1xuICAgIHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBoaXN0b3J5LmdvKGxvY2F0aW9uLnJlbG9hZCh0cnVlKSk7XG4gICAgfTtcbn1cbiAgICBcbi8vIFNlcnZvbm8gcGVyIHR1dHRlIGxlIHBhZ2luZVxubGV0IHdpbmRvd193aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xubGV0IG5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYWluLW1lbnUnKTtcbmxldCBuYXZfbWVudV9xdWVyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51LXF1ZXJ5Jyk7XG5sZXQgaGlkZGVuX2Rlc2NfaXRlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGlkZGVuLWRlc2MtaXRlbXMnKTtcbmxldCBoaWRkZW5fbWVudV9xdWVyeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoaWRkZW4tbWVudS1xdWVyeScpO1xuLy8gU2Vydm9ubyBwZXIgcGFnaW5hIEFkZCBDYXRhbG9nXG5jb25zdCBudW1faW52ZW50YXJpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibnVtX2ludlwiKTtcbmNvbnN0IGRld2V5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZXdleVwiKTtcbmNvbnN0IHRpdG9sb09yaWdpbmFsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0b2xvX29cIik7XG5jb25zdCB0cmFkdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRyYWR1dFwiKTtcbmNvbnN0IGxpbmd1YUZyb250ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGluZ3VhX2ZcIik7XG5cbmlmKHdpbmRvd193aWR0aCA+PSAxMDAwKSB7XG4gICAgaWYobmF2ICE9IG51bGwpIHtcbiAgICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoXCJleHBhbmRlZFwiKTtcbiAgICB9XG59XG5pZih3aW5kb3dfd2lkdGggPj0gODAwKSB7XG4gICAgaWYobmF2X21lbnVfcXVlcnkgIT0gbnVsbCkge1xuICAgICAgICBuYXZfbWVudV9xdWVyeS5jbGFzc0xpc3QuYWRkKFwiZXhwYW5kZWRcIik7XG4gICAgICAgIG5hdl9tZW51X3F1ZXJ5LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKS5jbGFzc0xpc3QuYWRkKFwiZXhwYW5kZWRcIik7XG4gICAgfVxufVxuaWYobmF2ICE9IG51bGwpIHtcbiAgICBhbmltYXRpb25NYWluTWVudSgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBsZXQgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGlmKHdpbmRvd193aWR0aCA+PSAxMDAwKSB7XG4gICAgICAgICAgICBuYXYuY2xhc3NMaXN0LmFkZChcImV4cGFuZGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoXCJleHBhbmRlZFwiKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIC8vIENhbWJpbyBpY29uZSBzZSBldmVudGkgbW91c2VvdmVyIGUgbW91c2VvdXRcbiAgICBjb25zdCBpdGVtTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudm9jaSA+IGxpID4gYVwiKTtcbiAgICBpdGVtTWVudS5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKXtcbiAgICAgICAgYVtpXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHN3aXRjaChpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hpbGQuc3JjID0gXCIuL2ltYWdlcy9pY29uZS9pY29uYS1hZ2dpdW5naS1jYXRhbG9nYXppb25lLWhvdmVyLnBuZ1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdENoaWxkLnNyYyA9IFwiLi9pbWFnZXMvaWNvbmUvaWNvbmEtY2VyY2EtY2F0YWxvZ2F6aW9uZS1ob3Zlci5wbmdcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGlsZC5zcmMgPSBcIi4vaW1hZ2VzL2ljb25lL2ljb25hLWFnZ2l1bmdpLXV0ZW50ZS1ob3Zlci5wbmdcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGlsZC5zcmMgPSBcIi4vaW1hZ2VzL2ljb25lL2ljb25hLWNlcmNhLXV0ZW50ZS1ob3Zlci5wbmdcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGlsZC5zcmMgPSBcIi4vaW1hZ2VzL2ljb25lL2ljb25hLWFnZ2l1bmdpLXByZXN0aXRvLWhvdmVyLnBuZ1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYoIWFbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiY3VycmVudFwiKSkge1xuICAgICAgICAgICAgYVtpXS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaChpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGlsZC5zcmMgPSBcIi4vaW1hZ2VzL2ljb25lL2ljb25hLWFnZ2l1bmdpLWNhdGFsb2dhemlvbmUucG5nXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hpbGQuc3JjID0gXCIuL2ltYWdlcy9pY29uZS9pY29uYS1jZXJjYS1jYXRhbG9nYXppb25lLnBuZ1wiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdENoaWxkLnNyYyA9IFwiLi9pbWFnZXMvaWNvbmUvaWNvbmEtYWdnaXVuZ2ktdXRlbnRlLnBuZ1wiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdENoaWxkLnNyYyA9IFwiLi9pbWFnZXMvaWNvbmUvaWNvbmEtY2VyY2EtdXRlbnRlLnBuZ1wiO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdENoaWxkLnNyYyA9IFwiLi9pbWFnZXMvaWNvbmUvaWNvbmEtYWdnaXVuZ2ktcHJlc3RpdG8ucG5nXCI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5pZihuYXZfbWVudV9xdWVyeSAhPSBudWxsKSB7XG4gICAgYW5pbWF0aW9uTWVudVF1ZXJ5KCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGxldCB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgaWYod2luZG93X3dpZHRoID49IDgwMCkge1xuICAgICAgICAgICAgbmF2X21lbnVfcXVlcnkuY2xhc3NMaXN0LmFkZChcImV4cGFuZGVkXCIpO1xuICAgICAgICAgICAgbmF2X21lbnVfcXVlcnkucXVlcnlTZWxlY3RvcihcInVsXCIpLmNsYXNzTGlzdC5hZGQoXCJleHBhbmRlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hdl9tZW51X3F1ZXJ5LmNsYXNzTGlzdC5yZW1vdmUoXCJleHBhbmRlZFwiKTtcbiAgICAgICAgICAgIG5hdl9tZW51X3F1ZXJ5LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiZXhwYW5kZWRcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy9TdGFtcGEgc3UgcHJlc3Npb25lIGRlbCBib3R0b25lXG5sZXQgc3RhbXBhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YW1wYScpO1xuaWYoc3RhbXBhICE9IG51bGwpIHtcbiAgICBzdGFtcGEuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cucHJpbnQoKTtcbiAgICB9KTtcbn1cblxuLy9DcmVhemlvbmUgbWVudSB0ZW5kaW5hIGFsdHJlIG9wZXJhemlvbmlcbmxldCBhbHRyZV9vcGVyYXppb25pID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhbHRyZS1vcGVyYXppb25pXCIpO1xubGV0IHN1Yl9tZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWItbWVudVwiKTtcbmlmKGFsdHJlX29wZXJhemlvbmkgIT0gbnVsbCkge1xuICAgIGFsdHJlX29wZXJhemlvbmkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKFwib3BlbmVkXCIpO1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC50b2dnbGUoXCJvcGVuZWRcIik7XG4gICAgICAgIHN1Yl9tZW51LmNsYXNzTGlzdC50b2dnbGUoXCJleHBhbmRlZFwiKTtcbiAgICAgICAgaWYodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW5lZCcpKSB7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Q2hpbGQuc3JjID0gXCIuL2ltYWdlcy9pY29uZS9pY29uYS1hbHRyZS1vcGVyYXppb25pLW9wZW4taG92ZXIucG5nXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpcnN0Q2hpbGQuc3JjID0gXCIuL2ltYWdlcy9pY29uZS9pY29uYS1hbHRyZS1vcGVyYXppb25pLnBuZ1wiO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgYWx0cmVfb3BlcmF6aW9uaS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuZWQnKSkge1xuICAgICAgICAgICAgdGhpcy5maXJzdENoaWxkLnNyYyA9IFwiLi9pbWFnZXMvaWNvbmUvaWNvbmEtYWx0cmUtb3BlcmF6aW9uaS1vcGVuLWhvdmVyLnBuZ1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maXJzdENoaWxkLnNyYyA9IFwiLi9pbWFnZXMvaWNvbmUvaWNvbmEtYWx0cmUtb3BlcmF6aW9uaS1ob3Zlci5wbmdcIjtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGFsdHJlX29wZXJhemlvbmkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuZWQnKSkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maXJzdENoaWxkLnNyYyA9IFwiLi9pbWFnZXMvaWNvbmUvaWNvbmEtYWx0cmUtb3BlcmF6aW9uaS5wbmdcIjtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vL05hc2NvbmRlcmUgdm9jaSBtZW51IG1hIG5vbiBpY29uZSAgICBcbmZ1bmN0aW9uIGFuaW1hdGlvbk1haW5NZW51KCkge1xuICAgIGhpZGRlbl9kZXNjX2l0ZW1zLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgbmF2LmNsYXNzTGlzdC50b2dnbGUoXCJleHBhbmRlZFwiKTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIGFuaW1hdGlvbk1lbnVRdWVyeSgpIHtcbiAgICBoaWRkZW5fbWVudV9xdWVyeS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIG5hdl9tZW51X3F1ZXJ5LmNsYXNzTGlzdC50b2dnbGUoXCJleHBhbmRlZFwiKTtcbiAgICAgICAgbmF2X21lbnVfcXVlcnkucXVlcnlTZWxlY3RvcihcInVsXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJleHBhbmRlZFwiKTtcbiAgICB9KTtcbn07XG5cblxuLy9Db2xvcmF6aW9uaSBwdWxzYW50aSByYWRpb1xubGV0IHVsX3JhZGlvID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbnRhaW5lci1yYWRpb1wiKTtcbmlmKHVsX3JhZGlvICE9IG51bGwpIHtcbiAgICBjb25zdCBmb3JtQWRkQ2F0YWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX2NhdGFsb2dcIik7XG4gICAgY29uc3QgbnVtX2ludl9wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJudW1faW52X3BcIik7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHVsX3JhZGlvLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHVsX3JhZGlvW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgbGV0IGlucHV0X3JhZGlvID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKFwiLnJhZGlvXCIpO1xuICAgICAgICAgICAgbGV0IGxpX3JhZGlvID0gdGhpcy5jaGlsZHJlbjtcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7IGo8IGxpX3JhZGlvLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGlfcmFkaW9bal0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgeiA9IDA7IHogPCBsaV9yYWRpby5sZW5ndGg7IHorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRfcmFkaW9bel0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRfcmFkaW9bel0ucGFyZW50Tm9kZS5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImJhY2tncm91bmQtY29sb3I6ICNkZWRlZGVcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdEVsZW1lbnRDaGlsZC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBcImJhY2tncm91bmQtY29sb3I6ICM5NmU5NzlcIik7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvL0luc2VyaW1lbnRvIG51bWVybyBkaSBpbnZlbnRhcmlvIGRpcmV0dGFtZW50ZSBkYWwgZGF0YWJhc2UgbmVsIGNhc28gc2kgc2NlbGdhIGNvbWUgcHJvcHJpZXTDoCBQYXBpbGxvbiBvIEZpbG8tRmVzdGl2YWxcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVybCA9IFwiLi9pbmNsdWRlLXBocC9jb250ZW50X2dsb2JhbC5waHA/dGlwbz1wcm9wcmlldGEmdmFsb3JlPVwiO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoKHRoaXMuZmlyc3RFbGVtZW50Q2hpbGQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwYXBpbGxvblwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZvcm1BZGRDYXRhbG9nICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobnVtX2ludmVudGFyaW8gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gdXJsK1wiUFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2godXJsKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihudW1faW52KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtX2ludmVudGFyaW8udmFsdWUgPSBudW1faW52LnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXdleS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobnVtX2ludl9wICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bV9pbnZfcC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1faW52X3AuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bV9pbnZlbnRhcmlvLnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bV9pbnZlbnRhcmlvLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJmZXN0aXZhbFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZvcm1BZGRDYXRhbG9nICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobnVtX2ludmVudGFyaW8gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsID0gdXJsK1wiRlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2godXJsKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihudW1faW52KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVtX2ludmVudGFyaW8udmFsdWUgPSBudW1faW52LnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXdleS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobnVtX2ludl9wICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bV9pbnZfcC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1faW52X3AuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bV9pbnZlbnRhcmlvLnZhbHVlID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bV9pbnZlbnRhcmlvLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb211bmVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihudW1faW52X3AgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1faW52X3AudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1faW52X3AuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1faW52ZW50YXJpby52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bV9pbnZlbnRhcmlvLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGVzdG9meWVzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVmlzdWFsaXp6byBzZSBjJ8OoIHRlc3RvIGEgZnJvbnRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZ3VhRnJvbnRlLnN0eWxlLmRpc3BsYXkgPSBcImxpc3QtaXRlbVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmd1YUZyb250ZS5jaGlsZHJlblsxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGVzdG9mbm9cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOYXNjb25kbyBzZSBjJ8OoIHRlc3RvIGEgZnJvbnRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZ3VhRnJvbnRlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxpbmd1YXllc1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFZpc3VhbGl6em8gaSBjYW1waSBzZSBjJ8OoIGxpbmd1YSBvcmlnaW5hbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRvbG9PcmlnaW5hbGUuc3R5bGUuZGlzcGxheSA9IFwibGlzdC1pdGVtXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0b2xvT3JpZ2luYWxlLmNoaWxkcmVuWzFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhZHV0LnN0eWxlLmRpc3BsYXkgPSBcImxpc3QtaXRlbVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibGluZ3Vhbm9cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOYXNjb25kbyBpIGNhbXBpIHNlIG5vbiBjJ8OoIGxpbmd1YSBvcmlnaW5hbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRvbG9PcmlnaW5hbGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWR1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuICAgIH1cbn1cblxuLy9Cb3R0b25lIGV4Y2VsIHN0b3JpY28gc29jaVxuaWYod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ3N0b3JpY29fc29jaS5waHAnKSAhPSAtMSkge1xuICAgIHZhciB1bF9idXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lci1idXR0b25cIik7XG4gICAgdmFyIGxpX2J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICBsaV9idXR0b24uaW5uZXJIVE1MPSAnPGEgY2xhc3M9XCJidXR0b25fZXhjZWxcIiBhbHQ9XCJFeGNlbFwiIHRpdGxlPVwiRXhjZWxcIiBocmVmPVwiLi9jc3YucGhwP3BhcmFtPXNvY2lcIj5FeGNlbDwvYT4nO1xuICAgIHVsX2J1dHRvbi5hcHBlbmQobGlfYnV0dG9uKTtcbiAgICB1bF9idXR0b24uc2V0QXR0cmlidXRlKFwic3R5bGVcIixcIndpZHRoOiAxNHJlbVwiKTtcbn1cblxuLy9BcHJpcmUgcGFydGUgZGkgY29tcGlsYXppb25lIGRlbCB0dXRvcmVcbmNvbnN0IHR1dG9yZV9jb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR1dG9yZVwiKTtcbmNvbnN0IHR1dG9yZV9yYWRpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyN1bC10dXRvcmUtcmFkaW8gaW5wdXRbdHlwZT1cInJhZGlvXCJdJyk7XG5jb25zdCBsaV90dXRvcmVfcmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjdWwtdHV0b3JlLXJhZGlvIGxpJyk7XG5mb3IobGV0IGkgPSAwOyBpIDwgbGlfdHV0b3JlX3JhZGlvLmxlbmd0aDsgaSsrKSB7XG4gICAgbGlfdHV0b3JlX3JhZGlvW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZih0dXRvcmVfcmFkaW9baV0udmFsdWUgPT0gXCJZXCIpIHtcbiAgICAgICAgICAgIHR1dG9yZV9jb250YWluZXIuY2xhc3NMaXN0LmFkZChcImV4cGFuZGVkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHV0b3JlX2NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiZXhwYW5kZWRcIik7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuY29uc3QgYnV0dG9uX3NvY2lvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0b25fc29jaW9cIik7XG5jb25zdCBmb3JtU29jaW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1fc29jaW9cIik7XG5pZihidXR0b25fc29jaW8gIT0gbnVsbCkge1xuICAgIGNvbnN0IGlucHV0QW5ubyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5ub19zb2Npb1wiKTtcbiAgICBidXR0b25fc29jaW8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGZvcm1Tb2Npby5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJleHBhbmRlZFwiKTtcbiAgICAgICAgaW5wdXRBbm5vLmZvY3VzKCk7XG4gICAgICAgIGZvcm1Tb2Npby5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY29uc3QgYW5ubyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYW5ub19zb2Npb1wiKS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGlkX2lzY3JpdHRvID0gbG9jYXRpb24uc2VhcmNoLnN1YnN0cigobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJpZF9pc2NyaXR0bz1cIikrMTIpLDEpO1xuICAgICAgICAgICAgbGV0IHVybCA9IFwiLi90cmFuc19nbG9iYWwucGhwP3N1Ym1pdD1zb2NpbyZhbm5vX3NvY2lvPVwiK2Fubm8rXCImaWRfaXNjcml0dG89XCIraWRfaXNjcml0dG87XG5cbiAgICAgICAgICAgIGZldGNoKHVybCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBcIkVycm9yZSBkYWwgU2VydmVyXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZihkYXRhLnRyaW0oKSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkX2lzY3JpdHRvID0gbG9jYXRpb24uc2VhcmNoLnN1YnN0cigobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJpZF9pc2NyaXR0bz1cIikrMTIpLDEpO1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gbG9jYXRpb24ucGF0aG5hbWUrXCI/aWRfaXNjcml0dG89XCIraWRfaXNjcml0dG8rXCImc3VjY2Vzc19zb2Npbz15ZXNcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZGF0YS50cmltKCkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZF9pc2NyaXR0byA9IGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwiaWRfaXNjcml0dG89XCIpKzEyKSwxKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGxvY2F0aW9uLnBhdGhuYW1lK1wiP2lkX2lzY3JpdHRvPVwiK2lkX2lzY3JpdHRvK1wiJmVycm9yX3NvY2lvPXllc1wiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkX2lzY3JpdHRvID0gbG9jYXRpb24uc2VhcmNoLnN1YnN0cigobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJpZF9pc2NyaXR0bz1cIikrMTIpLDEpO1xuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gbG9jYXRpb24ucGF0aG5hbWUrXCI/aWRfaXNjcml0dG89XCIraWRfaXNjcml0dG8rXCImZ2lhX3NvY2lvPXllcyZhbm5vPVwiK2RhdGEudHJpbSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gXCJFcnJvcmUgZGkgcmV0ZVwiO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG4vLyBOYXNjb25kZXJlIEZpbmVzdHJhIFZpc3VhbGl6emF6aW9uZSBFcnJvcmkgZGFsIFNlcnZlcmUgLy9cbi8vRGljaGlhcmF6aW9uZSBWYXJpYWJpbGlcbmNvbnN0IGhpZGRlbkVycm9yc1NlcnZlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlkZGVuLWVycm9yc1wiKTtcbmlmKGhpZGRlbkVycm9yc1NlcnZlciAhPSBudWxsKSB7XG4gICAgaGlkZGVuRXJyb3JzU2VydmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIH0pO1xufVxuXG4vL0NvbnRyb2xsbyBzZSBjaSBzb25vIGRlaSByYWRpbyBidXR0b24gY2hlY2tlZCBlIGxpIGNvbG9ybyBkaSB2ZXJkZSAoIzk2ZTk3OSlcbmNvbnN0IHJhZGlvQ2hlY2tlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwicmFkaW9cIl0nKTtcbnJhZGlvQ2hlY2tlZC5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKSB7XG4gICAgY29uc29sZS5sb2coYVtpXS5jaGVja2VkKTtcbiAgICBpZihhW2ldLmNoZWNrZWQgPT0gdHJ1ZSkge1xuICAgICAgICBhW2ldLnBhcmVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOTZlOTc5XCI7XG4gICAgfVxufSk7XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogIEFnZ2l1bmdpL01vZGlmaWNhIEltbWFnaW5lIENhdGFsb2dhemlvbmUvVXRlbnRlL09wZXJhdG9yZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIC8vXG5jb25zdCBhZGRfaW1hZ2VfY2F0YWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLWltYWdlLWNhdGFsb2dcIik7XG5pZihhZGRfaW1hZ2VfY2F0YWxvZyAhPSBudWxsKSB7XG4gICAgYWRkX2ltYWdlX2NhdGFsb2cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vICBGaW5lc3RyYSBkaSBhdnZpc29cbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCJBZ2dpdW5naSBJbW1hZ2luZVwiO1xuICAgICAgICBjb25zdCBmb3JtX2ltYWdlID0gYDxmb3JtIGlkPVwiYWRkX2ltYWdlX2NhdGFsb2dcIiBjbGFzcz1cImZvcm0gYWRkLWltYWdlXCIgbmFtZT1cImFkZF9pbWFnZV9jYXRhbG9nXCIgbWV0aG9kPVwicG9zdFwiIGFjdGlvbj1cIi4vdHJhbnNfZ2xvYmFsLnBocFwiIGVuY3R5cGU9XCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIgdGFyZ2V0PVwiX3NlbGZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImNvbnRhaW5lci1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5BZ2dpdW5naSBpbW1hZ2luZTogPGlucHV0IGlkPVwiZmlsZVwiIHR5cGU9XCJmaWxlXCIgbmFtZT1cImZpbGVuYW1lXCIgLz48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwicmVzZXRcIiB0eXBlPVwicmVzZXRcIiBuYW1lPVwicmVzZXRcIiB2YWx1ZT1cIlJlc2V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwic3VibWl0XCIgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJzdWJtaXRcIiB2YWx1ZT1cImFkZF9pbWFnZV9jYXRhbG9nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiaW52aWEtaW1tYWdpbmVcIiBjbGFzcz1cImludmlhXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJpbnZpYVwiIHZhbHVlPVwiSW52aWFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5gO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixmb3JtX2ltYWdlKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGFkZF9pbWFnZV9jYXRhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfaW1hZ2VfY2F0YWxvZ1wiKTtcbiAgICAgICAgYWRkX2ltYWdlX2NhdGFsb2cuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBmaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWxlXCIpO1xuICAgICAgICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRcIik7XG4gICAgICAgICAgICBsZXQgaWRfY2F0YWxvZ192YWx1ZTtcbiAgICAgICAgICAgIGNvbnN0IGlkX2NhdGFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlkX2NhdGFsb2dhemlvbmVcIik7XG4gICAgICAgICAgICBpZihpZF9jYXRhbG9nID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRfaW1hZ2VfY2F0YWxvZ19idXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1pbWFnZS1jYXRhbG9nXCIpO1xuICAgICAgICAgICAgICAgIGlkX2NhdGFsb2dfdmFsdWUgPSBhZGRfaW1hZ2VfY2F0YWxvZ19idXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1pZC1jYXRhbG9nXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlkX2NhdGFsb2dfdmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZF9jYXRhbG9nX3ZhbHVlID0gaWRfY2F0YWxvZy52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZS5maWxlc1swXSk7XG4gICAgICAgICAgICBpZihmaWxlICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBib2R5X2NvbnRlbnQgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBib2R5X2NvbnRlbnQuYXBwZW5kKFwiZmlsZW5hbWVcIixmaWxlLmZpbGVzWzBdKTtcbiAgICAgICAgICAgICAgICBib2R5X2NvbnRlbnQuYXBwZW5kKFwic3VibWl0XCIsc3VibWl0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBib2R5X2NvbnRlbnQuYXBwZW5kKFwiaWRfY2F0YWxvZ1wiLGlkX2NhdGFsb2dfdmFsdWUpO1xuICAgICAgICAgICAgICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0L1Byb2dyYW1tYV9HZXN0aW9uZV9CaWJsaW90ZWNhXzIwMTgvZGlzdC90cmFuc19nbG9iYWwucGhwJyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQWNjZXB0LUNoYXJzZXRcIjogXCJ1dGYtOFwiLFxuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keTogYm9keV9jb250ZW50XG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gXCJJbW1hZ2luZSBub24gc2FsdmF0YVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBpZihsb2NhdGlvbi5ocmVmLnNwbGl0KFwiJlwiKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gbG9jYXRpb24uaHJlZi5zcGxpdChcIiZcIilbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgKz0gXCImc3VjY2Vzc19hZGRpbWFnZWNhdGFsb2c9eWVzXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCI/XCIpICE9PSAtMSAmJiBsb2NhdGlvbi5ocmVmLnNwbGl0KFwiJlwiKS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVybCA9IGxvY2F0aW9uLmhyZWYrXCImc3VjY2Vzc19hZGRpbWFnZWNhdGFsb2c9eWVzXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gdXJsOyBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSBsb2NhdGlvbi5ocmVmK1wiP3N1Y2Nlc3NfYWRkaW1hZ2VjYXRhbG9nPXllc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBcIkVycm9yZSBkaSByZXRlXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmNvbnN0IGFkZF9pbWFnZV9zdWJzY3JpYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtaW1hZ2Utc3Vic2NyaWJlclwiKTtcbmlmKGFkZF9pbWFnZV9zdWJzY3JpYmVyICE9IG51bGwpIHtcbiAgICBhZGRfaW1hZ2Vfc3Vic2NyaWJlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gIEZpbmVzdHJhIGRpIGF2dmlzb1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkFnZ2l1bmdpIEltbWFnaW5lXCI7XG4gICAgICAgIGNvbnN0IGZvcm1faW1hZ2UgPSBgPGZvcm0gaWQ9XCJhZGRfaW1hZ2Vfc3Vic2NyaWJlclwiIGNsYXNzPVwiZm9ybSBhZGQtaW1hZ2VcIiBuYW1lPVwiYWRkX2ltYWdlX3N1YnNjcmliZXJcIiBtZXRob2Q9XCJwb3N0XCIgYWN0aW9uPVwiLi90cmFuc19nbG9iYWwucGhwXCIgZW5jdHlwZT1cIm11bHRpcGFydC9mb3JtLWRhdGFcIiB0YXJnZXQ9XCJfc2VsZlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPVwiY29udGFpbmVyLWJ1dHRvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkFnZ2l1bmdpIGltbWFnaW5lOiA8aW5wdXQgaWQ9XCJmaWxlXCIgdHlwZT1cImZpbGVcIiBuYW1lPVwiZmlsZW5hbWVcIiAvPjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJyZXNldFwiIHR5cGU9XCJyZXNldFwiIG5hbWU9XCJyZXNldFwiIHZhbHVlPVwiUmVzZXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJzdWJtaXRcIiB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cInN1Ym1pdFwiIHZhbHVlPVwiYWRkX2ltYWdlX3N1YnNjcmliZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJpbnZpYS1pbW1hZ2luZVwiIGNsYXNzPVwiaW52aWFcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImludmlhXCIgdmFsdWU9XCJJbnZpYVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9mb3JtPmA7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGZvcm1faW1hZ2UpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYWRkX2ltYWdlX3N1YnNjcmliZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9pbWFnZV9zdWJzY3JpYmVyXCIpO1xuICAgICAgICBhZGRfaW1hZ2Vfc3Vic2NyaWJlci5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbGVcIik7XG4gICAgICAgICAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdFwiKTtcbiAgICAgICAgICAgIGxldCBpZF9zdWJzY3JpYmVyX3ZhbHVlO1xuICAgICAgICAgICAgY29uc3QgaWRfc3Vic2NyaWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaWRfaXNjcml0dG9cIik7XG4gICAgICAgICAgICBpZihpZF9zdWJzY3JpYmVyID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhZGRfaW1hZ2Vfc3Vic2NyaWJlcl9idXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1pbWFnZS1zdWJzY3JpYmVyXCIpO1xuICAgICAgICAgICAgICAgIGlkX3N1YnNjcmliZXJfdmFsdWUgPSBhZGRfaW1hZ2Vfc3Vic2NyaWJlcl9idXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1pZC1zdWJzY3JpYmVyXCIpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlkX3N1YnNjcmliZXJfdmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZF9zdWJzY3JpYmVyX3ZhbHVlID0gaWRfc3Vic2NyaWJlci52YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpbGUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZmlsZS5maWxlc1swXSk7XG4gICAgICAgICAgICBpZihmaWxlICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBib2R5X2NvbnRlbnQgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBib2R5X2NvbnRlbnQuYXBwZW5kKFwiZmlsZW5hbWVcIixmaWxlLmZpbGVzWzBdKTtcbiAgICAgICAgICAgICAgICBib2R5X2NvbnRlbnQuYXBwZW5kKFwic3VibWl0XCIsc3VibWl0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBib2R5X2NvbnRlbnQuYXBwZW5kKFwiaWRfc3Vic2NyaWJlclwiLGlkX3N1YnNjcmliZXJfdmFsdWUpO1xuICAgICAgICAgICAgICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0L1Byb2dyYW1tYV9HZXN0aW9uZV9CaWJsaW90ZWNhXzIwMTgvZGlzdC90cmFuc19nbG9iYWwucGhwJyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQWNjZXB0LUNoYXJzZXRcIjogXCJ1dGYtOFwiLFxuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keTogYm9keV9jb250ZW50XG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gXCJJbW1hZ2luZSBub24gc2FsdmF0YVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBpZihsb2NhdGlvbi5ocmVmLnNwbGl0KFwiJlwiKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gbG9jYXRpb24uaHJlZi5zcGxpdChcIiZcIilbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgKz0gXCImc3VjY2Vzc19hZGRpbWFnZXN1YnNjcmliZXI9eWVzXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCI/XCIpICE9PSAtMSAmJiBsb2NhdGlvbi5ocmVmLnNwbGl0KFwiJlwiKS5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHVybCA9IGxvY2F0aW9uLmhyZWYrXCImc3VjY2Vzc19hZGRpbWFnZWNhdGFsb2c9eWVzXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gdXJsOyBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSBsb2NhdGlvbi5ocmVmK1wiP3N1Y2Nlc3NfYWRkaW1hZ2VzdWJzY3JpYmVyPXllc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IHVybDsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gXCJFcnJvcmUgZGkgcmV0ZVwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuXG5jb25zdCBhZGRfaW1hZ2VfdXNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLWltYWdlLXVzZXJcIik7XG5pZihhZGRfaW1hZ2VfdXNlciAhPSBudWxsKSB7XG4gICAgYWRkX2ltYWdlX3VzZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIC8vICBGaW5lc3RyYSBkaSBhdnZpc29cbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCJBZ2dpdW5naSBJbW1hZ2luZVwiO1xuICAgICAgICBjb25zdCBmb3JtX2ltYWdlID0gYDxmb3JtIGlkPVwiYWRkX2ltYWdlX3VzZXJcIiBjbGFzcz1cImZvcm0gYWRkLWltYWdlXCIgbmFtZT1cImFkZF9pbWFnZV91c2VyXCIgbWV0aG9kPVwicG9zdFwiIGFjdGlvbj1cIi4vdHJhbnNfZ2xvYmFsLnBocFwiIGVuY3R5cGU9XCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIgdGFyZ2V0PVwiX3NlbGZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZmllbGRzZXQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cImNvbnRhaW5lci1idXR0b25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5BZ2dpdW5naSBpbW1hZ2luZTogPGlucHV0IGlkPVwiZmlsZVwiIHR5cGU9XCJmaWxlXCIgbmFtZT1cImZpbGVuYW1lXCIgLz48L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwicmVzZXRcIiB0eXBlPVwicmVzZXRcIiBuYW1lPVwicmVzZXRcIiB2YWx1ZT1cIlJlc2V0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwic3VibWl0XCIgdHlwZT1cImhpZGRlblwiIG5hbWU9XCJzdWJtaXRcIiB2YWx1ZT1cImFkZF9pbWFnZV91c2VyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGlkPVwiaW52aWEtaW1tYWdpbmVcIiBjbGFzcz1cImludmlhXCIgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJpbnZpYVwiIHZhbHVlPVwiSW52aWFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9maWVsZHNldD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZm9ybT5gO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixmb3JtX2ltYWdlKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGFkZF9pbWFnZV91c2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfaW1hZ2VfdXNlclwiKTtcbiAgICAgICAgYWRkX2ltYWdlX3VzZXIuYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBmaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWxlXCIpO1xuICAgICAgICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRcIik7XG5cbiAgICAgICAgICAgIGlmKGZpbGUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJvZHlfY29udGVudCA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGJvZHlfY29udGVudC5hcHBlbmQoXCJmaWxlbmFtZVwiLGZpbGUuZmlsZXNbMF0pO1xuICAgICAgICAgICAgICAgIGJvZHlfY29udGVudC5hcHBlbmQoXCJzdWJtaXRcIixzdWJtaXQudmFsdWUpO1xuICAgICAgICAgICAgICAgIGZldGNoKCdodHRwOi8vbG9jYWxob3N0L1Byb2dyYW1tYV9HZXN0aW9uZV9CaWJsaW90ZWNhXzIwMTgvZGlzdC90cmFuc19nbG9iYWwucGhwJyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQWNjZXB0LUNoYXJzZXRcIjogXCJ1dGYtOFwiLFxuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcIm11bHRpcGFydC9mb3JtLWRhdGFcIixcbiAgICAgICAgICAgICAgICAgICAgYm9keTogYm9keV9jb250ZW50XG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5vaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gXCJJbW1hZ2luZSBub24gc2FsdmF0YVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBpZihsb2NhdGlvbi5ocmVmLnNwbGl0KFwiJlwiKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgdXJsID0gbG9jYXRpb24uaHJlZi5zcGxpdChcIiZcIilbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICB1cmwgKz0gXCImc3VjY2Vzc19hZGRpbWFnZW9wZXJhdG9yPXllc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IHVybDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1cmwgPSBsb2NhdGlvbi5ocmVmK1wiP3N1Y2Nlc3NfYWRkaW1hZ2VvcGVyYXRvcj15ZXNcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSB1cmw7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IFwiRXJyb3JlIGRpIHJldGVcIjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgUGFnaW5hIEFnZ2l1bmdpL01vZGlmaWNhIENhdGFsb2dhemlvbmUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAvL1xuLy9EaWNoaWFyYXppb25lIFZhcmlhYmlsaVxuLy8gIENvbnRyb2xsbyBlcnJvcmkgRk9STVxuY29uc3QgZm9ybUFkZENhdGFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9jYXRhbG9nXCIpO1xuY29uc3QgZm9ybUVkaXRDYXRhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlZGl0X2NhdGFsb2dcIik7XG5cbmlmKGZvcm1BZGRDYXRhbG9nICE9IG51bGwgXiBmb3JtRWRpdENhdGFsb2cgIT0gbnVsbCkge1xuICAgICAgICBcbiAgICAvLyBOYXNjb25kbyBhbGN1bmkgY2FtcGlcbiAgICB0aXRvbG9PcmlnaW5hbGUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIHRyYWR1dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgbGluZ3VhRnJvbnRlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBcbiAgICAvLyBBdnZpc28gbCd1dGVudGUgY2hlIHByaW1hIGRpIGNvbXBpbGFyZSBpbCBjYW1wbyBudW1lcm8gaW52ZW50YXJpbyBkZXZlIHNjZWdsaWVyZSBsYSBwcm9wcmlldGFcbiAgICBudW1faW52ZW50YXJpby5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgIGNvbnN0IHJhZGlvUHJvcHJpZXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW25hbWU9XCJwcm9wcmlldGFcIl0nKTtcbiAgICAgICBsZXQgY2hlY2tlZCA9IDA7XG4gICAgICAgZm9yKGxldCBpID0gMDtpIDwgcmFkaW9Qcm9wcmlldGEubGVuZ3RoO2krKykge1xuICAgICAgICAgICBpZihyYWRpb1Byb3ByaWV0YVtpXS5jaGVja2VkID09IHRydWUpIHtcbiAgICAgICAgICAgICAgIGNoZWNrZWQrKztcbiAgICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgICBpZihjaGVja2VkID09IDApIHtcbiAgICAgICAgICAgIC8vICBGaW5lc3RyYSBkaSBhdnZpc29cbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgICAgICBjb25zdCBhdnZpc28gPSBcIjxwPlBSSU1BIERJIENPTVBJTEFSRSBRVUVTVE8gQ0FNUE8gRScgTkVDRVNTQVJJTyBTQ0VHTElFUkUgSUwgQ0FNUE8gPHN0cm9uZz5QUk9QUklFVEEnPC9zdHJvbmc+PC9wPlwiO1xuICAgICAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsYXZ2aXNvLGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXNiblwiKSk7XG4gICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIFxuICAgIC8vIEF1dG9jb21wbGV0YW1lbnRvIGNhbXBpIGNvbiByaWNoaWVzdGEgZGFsIHNlcnZlclxuICAgIGxldCB1cmwgPSBcIi4vaW5jbHVkZS1waHAvY29udGVudF9nbG9iYWwucGhwP3RpcG89XCI7XG4gICAgY29uc3QgZGV3ZXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRld2V5XCIpO1xuICAgIGNvbnN0IGF1dG9yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXV0b3JlXCIpO1xuICAgIGNvbnN0IGdlbmVyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2VuZXJlXCIpO1xuICAgIGNvbnN0IGVkaXRvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRvcmVcIik7XG4gICAgY29uc3QgY29sbGFuYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29sbGFuYVwiKTtcbiAgICBjb25zdCBzY2FmZmFsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NhZmZhbGVcIik7XG4gICAgY29uc3QgZm9ybWF0byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybWF0b1wiKTtcbiAgICBjb25zdCBuYXppb25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXppb25lXCIpO1xuICAgIFxuICAgIGNvbnN0IGF1dG9fZGV3ZXkgPSBuZXcgQXV0b2NvbXBsZXRlKGRld2V5LCh1cmwrXCJkZXdleSZ2YWxvcmU9XCIpKTtcbiAgICBjb25zdCBhdXRvX2F1dG9yZSA9IG5ldyBBdXRvY29tcGxldGUoYXV0b3JlLCh1cmwrXCJhdXRvcmUmdmFsb3JlPVwiKSk7XG4gICAgY29uc3QgYXV0b19nZW5lcmUgPSBuZXcgQXV0b2NvbXBsZXRlKGdlbmVyZSwodXJsK1wiZ2VuZXJlJnZhbG9yZT1cIikpO1xuICAgIGNvbnN0IGF1dG9fZWRpdG9yZSA9IG5ldyBBdXRvY29tcGxldGUoZWRpdG9yZSwodXJsK1wiZWRpdG9yZSZ2YWxvcmU9XCIpKTtcbiAgICBjb25zdCBhdXRvX2NvbGxhbmEgPSBuZXcgQXV0b2NvbXBsZXRlKGNvbGxhbmEsKHVybCtcImNvbGxhbmEmdmFsb3JlPVwiKSk7XG4gICAgY29uc3QgYXV0b19zY2FmZmFsZSA9IG5ldyBBdXRvY29tcGxldGUoc2NhZmZhbGUsKHVybCtcInNjYWZmYWxlJnZhbG9yZT1cIikpO1xuICAgIGNvbnN0IGF1dG9fZm9ybWF0byA9IG5ldyBBdXRvY29tcGxldGUoZm9ybWF0bywodXJsK1wiZm9ybWF0byZ2YWxvcmU9XCIpKTtcbiAgICBjb25zdCBhdXRvX25hemlvbmUgPSBuZXcgQXV0b2NvbXBsZXRlKG5hemlvbmUsKHVybCtcIm5hemlvbmUmdmFsb3JlPVwiKSk7XG4gICAgXG4gICAgbGV0IHNlbmQgPSAwO1xuICAgIGxldCBmb3JtO1xuICAgIGlmKGZvcm1BZGRDYXRhbG9nICE9IG51bGwpIHtcbiAgICAgICAgZm9ybSA9IGZvcm1BZGRDYXRhbG9nO1xuICAgIH0gZWxzZSBpZihmb3JtRWRpdENhdGFsb2cgIT0gbnVsbCkge1xuICAgICAgICBmb3JtID0gZm9ybUVkaXRDYXRhbG9nO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBlcnJvcihlbGVtLGRlc2NFcnJvcikge1xuICAgICAgICBzZW5kID0gMDtcbiAgICAgICAgaWYoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJjb250YWluZXItcmFkaW9cIikpIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgI0YwMFwiO1xuICAgICAgICB9XG4gICAgICAgIC8vRWxpbWlubyBsZSBwcmVjZWRlbnRpIEJveCBEaWFsb2cgICAgICAgIFxuICAgICAgICBpZihlbGVtLnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbWctZXJyb3JcIikpIHtcbiAgICAgICAgICAgIGVsZW0ucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbWFnZUVycm9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VFcnJvci5jbGFzc0xpc3QuYWRkKFwiaW1nLWVycm9yXCIpO1xuICAgICAgICBjb25zdCBib3hFcnJvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGJveEVycm9yLmNsYXNzTGlzdC5hZGQoXCJib3gtZXJyb3JcIik7XG4gICAgICAgIGJveEVycm9yLmlubmVySFRNTCA9IGRlc2NFcnJvcitcIjxiciAvPlwiO1xuICAgICAgICBpbWFnZUVycm9yLmFwcGVuZENoaWxkKGJveEVycm9yKTtcbiAgICAgICAgZWxlbS5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRXJyb3IpO1xuICAgICAgICBcbiAgICAgICAgaW1hZ2VFcnJvci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGJveEVycm9yLmNsYXNzTGlzdC5hZGQoXCJvcGVuZWRcIik7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaW1hZ2VFcnJvci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgYm94RXJyb3IuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5lZFwiKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIHNlbmQgPSAxO1xuICAgICAgICBjb25zdCBmaWVsZHMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcbiAgICAgICAgY29uc3QgZXJyb3JfdCA9IFwiJkVncmF2ZTsgb2JibGlnYXRvcmlvIGNvbXBpbGFyZSBxdWVzdG8gY2FtcG8uXCI7XG4gICAgICAgIGNvbnN0IGVycm9yX3IgPSBcIiZFZ3JhdmU7IG9iYmxpZ2F0b3JpbyBzY2VnbGllcmUgcXVlc3RvIGNhbXBvLlwiO1xuXG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKXtcbiAgICAgICAgICAgIC8vIEFkIG9nbmkgY29udHJvbGxvIHJpbWV0dG8gaWwgYm9yZG8gc3RhbmRhcmQgZSB0b2xnbyBsJ2ljb25hIGRlbGwnZXJyb3JlXG4gICAgICAgICAgICBhW2ldLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkICMwMDU3OThcIjtcbiAgICAgICAgICAgIGlmKGFbaV0ucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5jb250YWlucyhcImltZy1lcnJvclwiKSkge1xuICAgICAgICAgICAgICAgIGFbaV0ucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihhW2ldLnZhbHVlID09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2goYVtpXS5uYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm51bV9pbnZcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sZXJyb3JfdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGV3ZXlcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sZXJyb3JfdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZWRpdG9yZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxlcnJvcl90KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlZGl6aW9uZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxlcnJvcl90KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsYW5hXCI6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2NhZmZhbGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sZXJyb3JfdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZm9ybWF0b1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxlcnJvcl90KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJub3RlX2Zvcm1hdG9cIjpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwYWdpbmVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sZXJyb3JfdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGF0YV9jXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLGVycm9yX3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvc3RvXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLGVycm9yX3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlzYm5cIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInByb3ZlbmllbnphXCI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0aXRvbG9fb1wiOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidHJhZHV0dG9yZVwiOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibGluZ3VhXCI6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibmF6aW9uZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxlcnJvcl90KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHRcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sZXJyb3JfdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoKGFbaV0ubmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpc2JuXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTldezEwLDEzfSRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBjb250ZW5lcmUgc29sbyBudW1lcmkuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9OdW1lcm8gaW52ZW50YXJpb1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibnVtX2ludlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05KCldKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBjb250ZW5lcmUgc29sbyBudW1lcmkuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9Db2RpY2UgRGV3ZXlcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRld2V5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlthLXpBLVowLTlcXC4gXSskXCIpLnRlc3QoYVtpXS52YWx1ZSkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIHB1Jm9ncmF2ZTsgY29udGVuZXJlIG51bWVyaSwgbGV0dGVyZSBlIGNvbWUgY2FyYXR0ZXJpIHNwZWNpYWxpLCBzb2xvIGlsICZxdW90Oy4mcXVvdDsuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9UaXRvbG9cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRpdG9sb1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bIVxcLVxcLlxcJlxcJ1xcLzAtOWEtekEtWlxceEUwXFx4RThcXHhFOVxceEY5XFx4RjJcXHhFQ1xceDI3LCBdKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL0F1dG9yZVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYXV0b3JlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXC5cXCZcXCdcXFwiMC05YS16QS1aXFx4RTBcXHhFOFxceEU5XFx4RjlcXHhGMlxceEVDXFx4MjcsKCkgXSskXCIpLnRlc3QoYVtpXS52YWx1ZSkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9HZW5lcmVcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImdlbmVyZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bXFwtXFwuXFwmXFwnMC05YS16QS1aXFx4RTBcXHhFOFxceEU5XFx4RjlcXHhGMlxceEVDXFx4MjcsOyAoKV0rJFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vRWRpdG9yZVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZWRpdG9yZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bXFwtXFwuXFwmXFwnMC05YS16QS1aXFx4RTBcXHhFOFxceEU5XFx4RjlcXHhGMlxceEVDXFx4MjcsOyBdKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL0VkaXppb25lXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlZGl6aW9uZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bQS1aYS16IF0rW0EtWmEtel0rWyBdezF9Wy1dezF9WyBdezF9WzAtOV17NH0kXCIpLnRlc3QoYVtpXS52YWx1ZSkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgZXNzZXJlIHNjcml0dG8gaW4gcXVlc3RhIGZvcm1hICZxdW90O0NpdHQmYWdyYXZlOyAmbWludXM7IGFubm8mcXVvdDsuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9Db2xsYW5hXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2xsYW5hXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXC5cXCZcXCcwLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyw7ICFdKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL1NjYWZmYWxlXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzY2FmZmFsZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05QS1aYS16IF0rJFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vRm9ybWF0b1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZm9ybWF0b1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05QS1aYS16LCBcXCtdKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBlc3NlcmUgc2NyaXR0byBpbiBxdWVzdGEgZm9ybWEgJnF1b3Q7TnVtZXJvICh1c2FyZSBsYSB2aXJnb2xhIHNlIGRlY2ltYWxlKSB4IE51bWVybyAodXNhcmUgbGEgdmlyZ29sYSBzZSBkZWNpbWFsZSkmcXVvdDsuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9Ob3RlIEZyb21hdG9cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5vdGVfZm9ybWF0b1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bXFwrXFwtXFwuXFwmXFwnMC05YS16QS1aXFx4RTBcXHhFOFxceEU5XFx4RjlcXHhGMlxceEVDXFx4MjcsOyBdKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL1BhZ2luZVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicGFnaW5lXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTldKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBjb250ZW5lcmUgc29sbyBudW1lcmkuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9EYXRhIENhdGFsb2dhemlvbmVcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRhdGFfY1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05XXs0fS1bMC05XXsyfS1bMC05XXsyfSRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBlc3NlcmUgc2NyaXR0byBpbiBxdWVzdGEgZm9ybWEgJnF1b3Q7QW5ubyZtaW51cztNZXNlJm1pbnVzO0dpb3JubyZxdW90Oy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL0Nvc3RvXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb3N0b1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05XFwuXSskXCIpLnRlc3QoYVtpXS52YWx1ZSkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgY29udGVuZXJlIHNvbG8gbnVtZXJpLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vUHJvdmVuaWVuemFcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInByb3ZlbmllbnphXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXC5cXCZcXCcwLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL1RpdG9sbyBPcmlnaW5hbGVcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRpdG9sb19vXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXC5cXCZcXCdcXC8wLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNywgXSskXCIpLnRlc3QoYVtpXS52YWx1ZSkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9UcmFkdXR0b3JlXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0cmFkdXR0b3JlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXC5cXCZcXCcwLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL0xpbmd1YVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibGluZ3VhXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlthLXpBLVosIF0rJFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGNvbnRlbmVyZSBzb2xvIGxldHRlcmUgZSBjb21lIGNhcmF0dGVyZSBzcGVjaWFsZSBsYSAmcXVvdDssJnF1b3Q7LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vTmF6aW9uZVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibmF6aW9uZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bQS1aYS16XFwuICgpXSskXCIpLnRlc3QoYVtpXS52YWx1ZSkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgY29udGVuZXJlIHNvbG8gbGV0dGVyZSBlIGNvbWUgY2FyYXR0ZXJpIHNwZWNpYWxpIGxlIHBhcmVudGVzaSB0b25kZS5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoYVtpXS50eXBlID09IFwicmFkaW9cIikge1xuICAgICAgICAgICAgICAgIHN3aXRjaChhW2ldLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInByb3ByaWV0YVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYVtpXS5jaGVja2VkID09IGZhbHNlICYmIGFbaSsxXS5jaGVja2VkID09IGZhbHNlICYmIGFbaSsyXS5jaGVja2VkID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYVtpKzJdLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb250YWluZXItcmFkaW9cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpKzJdLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCxlcnJvcl9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFbaSsyXS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5jb250YWlucyhcImltZy1lcnJvclwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhW2krMl0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibm92aXRhXCI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsaW5ndWFfb1wiOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGVzdG9fZlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYVtpXS5jaGVja2VkID09IGZhbHNlICYmIGFbaSsxXS5jaGVja2VkID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYVtpKzFdLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjb250YWluZXItcmFkaW9cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpKzFdLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCxlcnJvcl9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFbaSsxXS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5jb250YWlucyhcImltZy1lcnJvclwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhW2krMV0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZihzZW5kID09PSAwKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAvLyAgRmluZXN0cmEgZGkgYXZ2aXNvXG4gICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkF2dmlzb1wiO1xuICAgICAgICAgICAgY29uc3QgYXZ2aXNvID0gJzxwPkNJIFNPTk8gREVHTEkgPHN0cm9uZz5FUlJPUkk8L3N0cm9uZz4sIENPUlJFR0dFUkxJIEUgUFJFTUVSRSBOVU9WQU1FTlRFIFNVTCBQVUxTQU5URSBcIklOVklBXCIsIEdSQVpJRS48L3A+JztcbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGF2dmlzbyk7XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgXG4gICAgLy9BcGVydHVyYSBmaW5lc3RyZSBkaSBkaWFsb2dvIHBlciBlcnJvcmkgZWQgYXZ2aXNpICAgIFxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwiZXJyb3JfZXhpc3RcIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiRXJyb3JlXCI7XG4gICAgICAgIGNvbnN0IGVycm9yZSA9ICc8cCBjbGFzcz1cImNlbnRlclwiPlFVRVNUQSBDQVRBTE9HQVpJT05FIEVTSVNURSBHSSZBZ3JhdmU7PC9wPic7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGVycm9yZSk7XG4gICAgfVxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwiZXJyb3JfYWRkXCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkVycm9yZVwiO1xuICAgICAgICBjb25zdCBlcnJvcmUgPSAnPHAgY2xhc3M9XCJjZW50ZXJcIj5MQSBDQVRBTE9HQVpJT05FIE5PTiAmRWdyYXZlOyBTVEFUQSBBR0dJVU5UQS4uLlJJUFJPVkE8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsZXJyb3JlKTtcbiAgICB9XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJlcnJvcl91cGRhdGVcIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiRXJyb3JlXCI7XG4gICAgICAgIGNvbnN0IGVycm9yZSA9ICc8cCBjbGFzcz1cImNlbnRlclwiPkxBIENBVEFMT0dBWklPTkUgTk9OICZFZ3JhdmU7IFNUQVRBIE1PRElGSUNBVEEuLi5SSVBST1ZBPC9wPic7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGVycm9yZSk7XG4gICAgfVxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwic3VjY2Vzc19hZGRpbWFnZWNhdGFsb2dcIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgIGNvbnN0IGF2dmlzbyA9ICc8cCBjbGFzcz1cImNlbnRlclwiPklNTUFHSU5FIE1PRElGSUNBVEEgQ09SUkVUVEFNRU5URTwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixhdnZpc28pO1xuICAgIH1cbn07XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogIFBhZ2luYSBDZXJjYSBDYXRhbG9nYXppb25lICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogLy9cbmNvbnN0IGZvcm1TZWFyY2hDYXRhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hfY2F0YWxvZ1wiKTtcbmlmKGZvcm1TZWFyY2hDYXRhbG9nICE9IG51bGwpIHtcbiAgICAvLyBBdnZpc28gbCd1dGVudGUgY2hlIHByaW1hIGRpIGNvbXBpbGFyZSBpbCBjYW1wbyBudW1lcm8gaW52ZW50YXJpbyBkZXZlIHNjZWdsaWVyZSBsYSBwcm9wcmlldGFcbiAgICBudW1faW52ZW50YXJpby5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgIGNvbnN0IHJhZGlvUHJvcHJpZXRhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW25hbWU9XCJwcm9wcmlldGFcIl0nKTtcbiAgICAgICBsZXQgY2hlY2tlZCA9IDA7XG4gICAgICAgZm9yKGxldCBpID0gMDtpIDwgcmFkaW9Qcm9wcmlldGEubGVuZ3RoO2krKykge1xuICAgICAgICAgICBpZihyYWRpb1Byb3ByaWV0YVtpXS5jaGVja2VkID09IHRydWUpIHtcbiAgICAgICAgICAgICAgIGNoZWNrZWQrKztcbiAgICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgICBpZihjaGVja2VkID09IDApIHtcbiAgICAgICAgICAgIC8vICBGaW5lc3RyYSBkaSBhdnZpc29cbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgICAgICBjb25zdCBhdnZpc28gPSBcIjxwPlBSSU1BIERJIENPTVBJTEFSRSBRVUVTVE8gQ0FNUE8gRScgTkVDRVNTQVJJTyBTQ0VHTElFUkUgSUwgQ0FNUE8gPHN0cm9uZz5QUk9QUklFVEEnPC9zdHJvbmc+PC9wPlwiO1xuICAgICAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsYXZ2aXNvLGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXNiblwiKSk7XG4gICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIFxuICAgIC8vIEF1dG9jb21wbGV0YW1lbnRvIGNhbXBpIGNvbiByaWNoaWVzdGEgZGFsIHNlcnZlclxuICAgIGxldCB1cmwgPSBcIi4vaW5jbHVkZS1waHAvY29udGVudF9nbG9iYWwucGhwP3RpcG89XCI7XG4gICAgY29uc3QgZGV3ZXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRld2V5XCIpO1xuICAgIGNvbnN0IHRpdG9sbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGl0b2xvXCIpO1xuICAgIGNvbnN0IGF1dG9yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXV0b3JlXCIpO1xuICAgIGNvbnN0IGdlbmVyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2VuZXJlXCIpO1xuICAgIGNvbnN0IGNvbGxhbmEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbGxhbmFcIik7XG4gICAgY29uc3Qgc2NhZmZhbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjYWZmYWxlXCIpO1xuICAgIFxuICAgIGNvbnN0IGF1dG9fZGV3ZXkgPSBuZXcgQXV0b2NvbXBsZXRlKGRld2V5LCh1cmwrXCJkZXdleSZ2YWxvcmU9XCIpKTtcbiAgICBjb25zdCBhdXRvX3RpdG9sbyA9IG5ldyBBdXRvY29tcGxldGUodGl0b2xvLCh1cmwrXCJ0aXRvbG8mdmFsb3JlPVwiKSk7XG4gICAgY29uc3QgYXV0b19hdXRvcmUgPSBuZXcgQXV0b2NvbXBsZXRlKGF1dG9yZSwodXJsK1wiYXV0b3JlJnZhbG9yZT1cIikpO1xuICAgIGNvbnN0IGF1dG9fZ2VuZXJlID0gbmV3IEF1dG9jb21wbGV0ZShnZW5lcmUsKHVybCtcImdlbmVyZSZ2YWxvcmU9XCIpKTtcbiAgICBjb25zdCBhdXRvX2NvbGxhbmEgPSBuZXcgQXV0b2NvbXBsZXRlKGNvbGxhbmEsKHVybCtcImNvbGxhbmEmdmFsb3JlPVwiKSk7XG4gICAgY29uc3QgYXV0b19zY2FmZmFsZSA9IG5ldyBBdXRvY29tcGxldGUoc2NhZmZhbGUsKHVybCtcInNjYWZmYWxlJnZhbG9yZT1cIikpO1xufTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgUGFnaW5hIEFnZ2l1bmdpL01vZGlmaWNhIFV0ZW50ZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIC8vXG4vL0RpY2hpYXJhemlvbmUgVmFyaWFiaWxpXG4vLyAgQ29udHJvbGxvIGVycm9yaSBGT1JNXG5jb25zdCBmb3JtQWRkU3Vic2NyaWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX3N1YnNjcmliZXJcIik7XG5jb25zdCBmb3JtRWRpdFN1YnNjcmliZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRfc3Vic2NyaWJlclwiKTtcblxuaWYoZm9ybUFkZFN1YnNjcmliZXIgIT0gbnVsbCBeIGZvcm1FZGl0U3Vic2NyaWJlciAhPSBudWxsKSB7XG4gICAgXG4gICAgLy8gQXV0b2NvbXBsZXRhbWVudG8gY2FtcGkgY29uIHJpY2hpZXN0YSBkYWwgc2VydmVyXG4gICAgbGV0IHVybCA9IFwiLi9pbmNsdWRlLXBocC9jb250ZW50X2dsb2JhbC5waHA/dGlwbz1cIjtcbiAgICBjb25zdCBub21lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub21lXCIpO1xuICAgIGNvbnN0IGNvZ25vbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvZ25vbWVcIik7XG4gICAgY29uc3QgcHJvZmVzc2lvbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2Zlc3Npb25lXCIpO1xuICAgIGNvbnN0IG5vbWVfdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm9tZV90XCIpO1xuICAgIGNvbnN0IGNvZ25vbWVfdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29nbm9tZV90XCIpO1xuICAgIGNvbnN0IGluZGlyaXp6byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5kaXJpenpvXCIpO1xuICAgIGNvbnN0IGluZGlyaXp6b190ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRpcml6em9fdFwiKTtcbiAgICBjb25zdCBsb2NhbGl0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYWxpdGFcIik7XG4gICAgY29uc3QgbG9jYWxpdGFfdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9jYWxpdGFfdFwiKTtcbiAgICBjb25zdCBwcm92aW5jaWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb3ZpbmNpYVwiKTtcbiAgICBjb25zdCBwcm92aW5jaWFfdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvdmluY2lhX3RcIik7XG4gICAgY29uc3QgY2FwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXBcIik7XG4gICAgY29uc3QgY2FwX3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhcF90XCIpO1xuICAgIGNvbnN0IHRlbF9jYXNhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZWxfY2FzYVwiKTtcbiAgICBjb25zdCB0ZWxfY2FzYV90ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0ZWxfY2FzYV90XCIpO1xuICAgIFxuICAgIGNvbnN0IGF1dG9fbm9tZSA9IG5ldyBBdXRvY29tcGxldGUobm9tZSwodXJsK1wibm9tZSZ2YWxvcmU9XCIpKTtcbiAgICBjb25zdCBhdXRvX2NvZ25vbWUgPSBuZXcgQXV0b2NvbXBsZXRlKGNvZ25vbWUsKHVybCtcImNvZ25vbWUmdmFsb3JlPVwiKSk7XG4gICAgY29uc3QgYXV0b19ub21lX3QgPSBuZXcgQXV0b2NvbXBsZXRlKG5vbWVfdCwodXJsK1wibm9tZSZ2YWxvcmU9XCIpKTtcbiAgICBjb25zdCBhdXRvX2NvZ25vbWVfdCA9IG5ldyBBdXRvY29tcGxldGUoY29nbm9tZV90LCh1cmwrXCJjb2dub21lJnZhbG9yZT1cIikpO1xuICAgIGNvbnN0IGF1dG9fcHJvZmVzc2lvbmUgPSBuZXcgQXV0b2NvbXBsZXRlKHByb2Zlc3Npb25lLCh1cmwrXCJwcm9mZXNzaW9uZSZ2YWxvcmU9XCIpKTtcbiAgICBjb25zdCBhdXRvX2luZGlyaXp6byA9IG5ldyBBdXRvY29tcGxldGUoaW5kaXJpenpvLCh1cmwrXCJpbmRpcml6em8mdmFsb3JlPVwiKSk7XG4gICAgY29uc3QgYXV0b19pbmRpcml6em9fdCA9IG5ldyBBdXRvY29tcGxldGUoaW5kaXJpenpvX3QsKHVybCtcImluZGlyaXp6b190JnZhbG9yZT1cIikpO1xuICAgIGNvbnN0IGF1dG9fbG9jYWxpdGEgPSBuZXcgQXV0b2NvbXBsZXRlKGxvY2FsaXRhLCh1cmwrXCJsb2NhbGl0YSZ2YWxvcmU9XCIpKTtcbiAgICBjb25zdCBhdXRvX2xvY2FsaXRhX3QgPSBuZXcgQXV0b2NvbXBsZXRlKGxvY2FsaXRhX3QsKHVybCtcImxvY2FsaXRhX3QmdmFsb3JlPVwiKSk7XG4gICAgY29uc3QgYXV0b19wcm92aW5jaWEgPSBuZXcgQXV0b2NvbXBsZXRlKHByb3ZpbmNpYSwodXJsK1wicHJvdmluY2lhJnZhbG9yZT1cIikpO1xuICAgIGNvbnN0IGF1dG9fcHJvdmluY2lhX3QgPSBuZXcgQXV0b2NvbXBsZXRlKHByb3ZpbmNpYV90LCh1cmwrXCJwcm92aW5jaWFfdCZ2YWxvcmU9XCIpKTtcbiAgICBjb25zdCBhdXRvX2NhcCA9IG5ldyBBdXRvY29tcGxldGUoY2FwLCh1cmwrXCJjYXAmdmFsb3JlPVwiKSk7XG4gICAgY29uc3QgYXV0b19jYXBfdCA9IG5ldyBBdXRvY29tcGxldGUoY2FwX3QsKHVybCtcImNhcF90JnZhbG9yZT1cIikpO1xuICAgIFxuICAgIGxvY2FsaXRhLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdmFsdWVMb2NhbGl0YSA9IGxvY2FsaXRhLnZhbHVlO1xuICAgICAgICB1cmxPayA9IHVybCtcImxvY2FsaXRhX2MmdmFsb3JlPVwiK3ZhbHVlTG9jYWxpdGE7XG4gICAgICAgIGNvbnNvbGUubG9nKHVybE9rKTtcblxuICAgICAgICBmZXRjaCh1cmxPaykudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGxvY2FsaXRhKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImxvY2FsaXRhIFwiK2xvY2FsaXRhKTtcbiAgICAgICAgICAgIGlmKGxvY2FsaXRhLnRyaW0oKSAhPSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsb3JpID0gbG9jYWxpdGEuc3BsaXQoXCIjXCIpO1xuICAgICAgICAgICAgICAgIHZhbG9yaVswXSA9IHZhbG9yaVswXS50cmltKCk7XG4gICAgICAgICAgICAgICAgdmFsb3JpWzFdID0gdmFsb3JpWzFdLnRyaW0oKTtcbiAgICAgICAgICAgICAgICBpZih2YWxvcmlbMF0gIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICBwcm92aW5jaWEudmFsdWUgPSB2YWxvcmlbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKHZhbG9yaVsxXSAhPSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhcC52YWx1ZSA9IHZhbG9yaVsxXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGVsX2Nhc2EuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICBcbiAgICBsZXQgc2VuZCA9IDA7XG4gICAgbGV0IGZvcm07XG4gICAgaWYoZm9ybUFkZFN1YnNjcmliZXIgIT0gbnVsbCkge1xuICAgICAgICBmb3JtID0gZm9ybUFkZFN1YnNjcmliZXI7XG4gICAgfSBlbHNlIGlmKGZvcm1FZGl0U3Vic2NyaWJlciAhPSBudWxsKSB7XG4gICAgICAgIGZvcm0gPSBmb3JtRWRpdFN1YnNjcmliZXI7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGVycm9yKGVsZW0sZGVzY0Vycm9yKSB7XG4gICAgICAgIHNlbmQgPSAwO1xuICAgICAgICBpZihlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcImNvbnRhaW5lci1yYWRpb1wiKSkge1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbS5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCAjRjAwXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy9FbGltaW5vIGxlIHByZWNlZGVudGkgQm94IERpYWxvZyAgICAgICAgXG4gICAgICAgIGlmKGVsZW0ucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5jb250YWlucyhcImltZy1lcnJvclwiKSkge1xuICAgICAgICAgICAgZWxlbS5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQucmVtb3ZlKCk7XG4gICAgICAgIH0gZWxzZSBpZihlbGVtLnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmKGVsZW0ucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW1nLWVycm9yXCIpKSB7XG4gICAgICAgICAgICAgICAgZWxlbS5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZy5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3QgaW1hZ2VFcnJvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGltYWdlRXJyb3IuY2xhc3NMaXN0LmFkZChcImltZy1lcnJvclwiKTtcbiAgICAgICAgY29uc3QgYm94RXJyb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBib3hFcnJvci5jbGFzc0xpc3QuYWRkKFwiYm94LWVycm9yXCIpO1xuICAgICAgICBib3hFcnJvci5pbm5lckhUTUwgPSBkZXNjRXJyb3IrXCI8YnIgLz5cIjtcbiAgICAgICAgaW1hZ2VFcnJvci5hcHBlbmRDaGlsZChib3hFcnJvcik7XG4gICAgICAgIGVsZW0ucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChpbWFnZUVycm9yKTtcbiAgICAgICAgXG4gICAgICAgIGltYWdlRXJyb3IuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgICAgICBib3hFcnJvci5jbGFzc0xpc3QuYWRkKFwib3BlbmVkXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGltYWdlRXJyb3IuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGJveEVycm9yLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuZWRcIik7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICBzZW5kID0gMTtcbiAgICAgICAgY29uc3QgZmllbGRzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XG4gICAgICAgIGNvbnN0IGVycm9yX3QgPSBcIiZFZ3JhdmU7IG9iYmxpZ2F0b3JpbyBjb21waWxhcmUgcXVlc3RvIGNhbXBvLlwiO1xuICAgICAgICBjb25zdCBlcnJvcl9yID0gXCImRWdyYXZlOyBvYmJsaWdhdG9yaW8gc2NlZ2xpZXJlIHF1ZXN0byBjYW1wby5cIjtcbiAgICAgICAgY29uc3QgdGlwb0RvY3VtZW50byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGlwb19kb2N1bWVudG9cIik7XG4gICAgICAgIGxldCB0dXRvcmVWYWw7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0dXRvcmVFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW25hbWU9XCJ0dXRvcmVcIl0nKTtcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgdHV0b3JlRWxlbS5sZW5ndGg7aSsrKSB7XG4gICAgICAgICAgICBpZih0dXRvcmVFbGVtW2ldLmNoZWNrZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHR1dG9yZVZhbCA9IHR1dG9yZUVsZW1baV0udmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnNvbGUubG9nKHR1dG9yZVZhbCk7XG4gICAgICAgIGZ1bmN0aW9uIHR1dG9yZShlbGUsIGVycm9yKSB7XG4gICAgICAgICAgICBpZih0dXRvcmVWYWwgPT0gXCJZXCIpIHtcbiAgICAgICAgICAgICAgICBlcnJvcihlbGUsIGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRpcG9Eb2N1bWVudG8uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgIzAwNTc5OFwiO1xuICAgICAgICBpZih0aXBvRG9jdW1lbnRvLnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbWctZXJyb3JcIikpIHtcbiAgICAgICAgICAgIHRpcG9Eb2N1bWVudG8ucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLnJlbW92ZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKSB7XG4gICAgICAgICAgICAgLy8gQWQgb2duaSBjb250cm9sbG8gcmltZXR0byBpbCBib3JkbyBzdGFuZGFyZCBlIHRvbGdvIGwnaWNvbmEgZGVsbCdlcnJvcmVcbiAgICAgICAgICAgIGFbaV0uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgIzAwNTc5OFwiO1xuICAgICAgICAgICAgaWYoYVtpXS5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW1nLWVycm9yXCIpKSB7XG4gICAgICAgICAgICAgICAgYVtpXS5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoYVtpXS5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYoYVtpXS5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoXCJpbWctZXJyb3JcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgYVtpXS5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGFbaV0udmFsdWUgPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIHN3aXRjaChhW2ldLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRhdGFfaXNjXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLGVycm9yX3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRhdGFfbmFzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLGVycm9yX3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm51bV9jaXZcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sZXJyb3JfdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicHJvdmluY2lhXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLGVycm9yX3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNhcFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxlcnJvcl90KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZWxfY2FzYVwiOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRlbF9jZWxsXCI6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW1haWxcIjpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJudW1fZG9jdW1lbnRvXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aXBvRG9jdW1lbnRvLnZhbHVlID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJBdmVuZG8gc2NlbHRvIHVuIHRpcG8gZGkgZG9jdW1lbnRvIMOoIG9iYmxpZ2F0b3JpbyBjb21waWxhcmUgcXVlc3RvIGNhbXBvLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibm9tZV90XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoYVtpXSxlcnJvcl90KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2dub21lX3RcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1dG9yZShhW2ldLGVycm9yX3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImluZGlyaXp6b190XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoYVtpXSxlcnJvcl90KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJudW1fY2l2X3RcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1dG9yZShhW2ldLGVycm9yX3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImxvY2FsaXRhX3RcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHR1dG9yZShhW2ldLGVycm9yX3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInByb3ZpbmNpYV90XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoYVtpXSxlcnJvcl90KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjYXBfdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKGFbaV0sZXJyb3JfdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidGVsX2Nhc2FfdFwiOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRlbF9jZWxsX3RcIjpcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbWFpbF90XCI6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibnVtX2RvY3VtZW50b190XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoYVtpXSxlcnJvcl90KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLGVycm9yX3QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYoYVtpXS52YWx1ZSAhPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIHN3aXRjaChhW2ldLm5hbWUpe1xuICAgICAgICAgICAgICAgICAgICAvL0RhdGEgSXNjcml6aW9uZVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGF0YV9pc2NcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeWzAtOV17NH0tWzAtOV17Mn0tWzAtOV17Mn0kXCIpLnRlc3QoYVtpXS52YWx1ZSkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgZXNzZXJlIHNjcml0dG8gaW4gcXVlc3RhIGZvcm1hICZxdW90O0Fubm8mbWludXM7TWVzZSZtaW51cztHaW9ybm8mcXVvdDsuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9Ob21lXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJub21lXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXCdhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL0NvZ25vbWVcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNvZ25vbWVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeW1xcLVxcJ2EtekEtWlxceEUwXFx4RThcXHhFOVxceEY5XFx4RjJcXHhFQ1xceDI3IF0rJFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vRGF0YSBOYXNjaXRhXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYXRhX25hc1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05XXs0fS1bMC05XXsyfS1bMC05XXsyfSRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBlc3NlcmUgc2NyaXR0byBpbiBxdWVzdGEgZm9ybWEgJnF1b3Q7QW5ubyZtaW51cztNZXNlJm1pbnVzO0dpb3JubyZxdW90Oy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL1Byb2Zlc3Npb25lXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwcm9mZXNzaW9uZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bXFwtXFwuXFwnLzAtOWEtekEtWlxceEUwXFx4RThcXHhFOVxceEY5XFx4RjJcXHhFQ1xceDI3IF0rXCIpLnRlc3QoYVtpXS52YWx1ZSkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9JbmRpcml6em9cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImluZGlyaXp6b1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bXFwtXFwuXFwnLzAtOWEtekEtWlxceEUwXFx4RThcXHhFOVxceEY5XFx4RjJcXHhFQ1xceDI3IF0rJFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGVzc2VyZSBzY3JpdHRvIGluIHF1ZXN0YSBmb3JtYSAmcXVvdDsxKVZpYSBvIFBpYXp6YSAyKU5vbWUgZGVsbGEgdmlhIG8gcGlhenphJnF1b3Q7LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vTnVtZXJvIENpdmljb1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibnVtX2NpdlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05YS16QS1aLyBdKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBlc3NlcmUgc2NyaXR0byBpbiBxdWVzdGEgZm9ybWEgJnF1b3Q7MSlOdW1lcm8gY2l2aWNvIDIpLyAzKVNjYWxhIG8gSW50ZXJubyZxdW90Oy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL0xvY2FsaXTDoFxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibG9jYWxpdGFcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeW1xcLlxcJywwLTlhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL1Byb3ZpbmNpYVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwicHJvdmluY2lhXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltBLVphLXpdezJ9JFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGNvbnRlbmVyZSBzb2xvIGR1ZSBsZXR0ZXJlLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vQ0FQXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjYXBcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeWzAtOV17NX0kXCIpLnRlc3QoYVtpXS52YWx1ZSkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uPGJyIC8+SWwgdmFsb3JlIGRhIGluc2VyaXJlIGRldmUgY29udGVuZXJlIDUgbnVtZXJpLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vVGVsLiBDYXNhXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZWxfY2FzYVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05XXs1LDEyfSRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBjb250ZW5lcmUgc29sbyBudW1lcmkuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9UZWwuIENlbGxcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInRlbF9jZWxsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTldezgsMTB9JFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGNvbnRlbmVyZSBzb2xvIG51bWVyaS5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL0VtYWlsXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbWFpbFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bYS16MC05XFwuXyUtXStAezEsMX1bYS16MC05XFwuXyUtXStbXFwuXXsxLDF9W2Etel17Miw2fSRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL051bWVybyBEb2N1bWVudG9cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm51bV9kb2N1bWVudG9cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeWzAtOWEtekEtWiBdKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRpcG9Eb2N1bWVudG8udmFsdWUgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcih0aXBvRG9jdW1lbnRvLFwiQXZlbmRvIGNvbXBpbGF0byBpbCBjYW1wbyBOdW1lcm8gRG9jdW1lbnRvIMOoIG9iYmxpZ2F0b3JpbyBzY2VnbGllcmUgdW4gdmFsb3JlIHBlciBxdWVzdG8gY2FtcG8uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9Ob21lIHR1dG9yZVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibm9tZV90XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXCdhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR1dG9yZShhW2ldLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9Db2dub21lIHR1dG9yZVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiY29nbm9tZV90XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXCdhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR1dG9yZShhW2ldLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9JbmRpcml6em8gdHV0b3JlXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpbmRpcml6em9fdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bXFwtXFwuXFwnLzAtOWEtekEtWlxceEUwXFx4RThcXHhFOVxceEY5XFx4RjJcXHhFQ1xceDI3IF0rJFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBlc3NlcmUgc2NyaXR0byBpbiBxdWVzdGEgZm9ybWEgJnF1b3Q7MSlWaWEgbyBQaWF6emEgMilOb21lIGRlbGxhIHZpYSBvIHBpYXp6YSZxdW90Oy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL051bWVybyBDaXZpY28gdHV0b3JlXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJudW1fY2l2X3RcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeWzAtOWEtekEtWi8gXSskXCIpLnRlc3QoYVtpXS52YWx1ZSkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoYVtpXSxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLjxiciAvPklsIHZhbG9yZSBkYSBpbnNlcmlyZSBkZXZlIGVzc2VyZSBzY3JpdHRvIGluIHF1ZXN0YSBmb3JtYSAmcXVvdDsxKU51bWVybyBjaXZpY28gMikvIDMpU2NhbGEgbyBJbnRlcm5vJnF1b3Q7LlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vTG9jYWxpdMOgIHR1dG9yZVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibG9jYWxpdGFfdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bXFwuXFwnLDAtOWEtekEtWlxceEUwXFx4RThcXHhFOVxceEY5XFx4RjJcXHhFQ1xceDI3IF0rJFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL1Byb3ZpbmNpYSB0dXRvcmVcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInByb3ZpbmNpYV90XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltBLVphLXpdezJ9JFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBjb250ZW5lcmUgc29sbyBkdWUgbGV0dGVyZS5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL0NBUCB0dXRvcmVcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNhcF90XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTldezV9JFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBjb250ZW5lcmUgNSBudW1lcmkuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9UZWwuIENhc2EgdHV0b3JlXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZWxfY2FzYV90XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTldezUsMTJ9JFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBjb250ZW5lcmUgc29sbyBudW1lcmkuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9UZWwuIENlbGwgdHV0b3JlXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0ZWxfY2VsbF90XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXlswLTldezgsMTB9JFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBjb250ZW5lcmUgc29sbyBudW1lcmkuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9FbWFpbCB0dXRvcmVcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVtYWlsX3RcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeW2EtejAtOVxcLl8lLV0rQHsxLDF9W2EtejAtOVxcLl8lLV0rW1xcLl17MSwxfVthLXpdezIsNn0kXCIpLnRlc3QoYVtpXS52YWx1ZSkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0dXRvcmUoYVtpXSxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vTnVtZXJvIERvY3VtZW50byB0dXRvcmVcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm51bV9kb2N1bWVudG9fdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05YS16QS1aIF0rJFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHV0b3JlKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihhW2ldLnR5cGUgPT0gXCJyYWRpb1wiKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoKGFbaV0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2Vzc29cIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImludGVybmV0XCI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwcml2YWN5XCI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ0dXRvcmVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFbaV0uY2hlY2tlZCA9PSBmYWxzZSAmJiBhW2krMV0uY2hlY2tlZCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFbaSsxXS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29udGFpbmVyLXJhZGlvXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaSsxXS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQsZXJyb3Jfcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhW2krMV0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbWctZXJyb3JcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYVtpKzFdLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNlc3NvX3RcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFbaV0uY2hlY2tlZCA9PSBmYWxzZSAmJiBhW2krMV0uY2hlY2tlZCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGFbaSsxXS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29udGFpbmVyLXJhZGlvXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR1dG9yZShhW2krMV0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LGVycm9yX3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYVtpKzFdLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW1nLWVycm9yXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFbaSsxXS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZihzZW5kID09PSAwKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAvLyAgRmluZXN0cmEgZGkgYXZ2aXNvXG4gICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkF2dmlzb1wiO1xuICAgICAgICAgICAgY29uc3QgYXZ2aXNvID0gJzxwPkNJIFNPTk8gREVHTEkgPHN0cm9uZz5FUlJPUkk8L3N0cm9uZz4sIENPUlJFR0dFUkxJIEUgUFJFTUVSRSBOVU9WQU1FTlRFIFNVTCBQVUxTQU5URSBcIklOVklBXCIsIEdSQVpJRS48L3A+JztcbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGF2dmlzbyk7XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgXG4gICAgLy9BcGVydHVyYSBmaW5lc3RyZSBkaSBkaWFsb2dvIHBlciBlcnJvcmkgZWQgYXZ2aXNpICAgIFxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwiZXJyb3JlX2FkZF90XCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkVycm9yZVwiO1xuICAgICAgICBjb25zdCBlcnJvcmUgPSAnPHAgY2xhc3M9XCJjZW50ZXJcIj5JTCBUVVRPUkUgREVMTFxcJ0lTQ1JJVFRPIE5PTiAmRWdyYXZlOyBTVEFUTyBBR0dJVU5UTy4uLlJJUFJPVkE8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsZXJyb3JlKTtcbiAgICB9XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJlcnJvcmVfYWRkXCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkVycm9yZVwiO1xuICAgICAgICBjb25zdCBlcnJvcmUgPSAnPHAgY2xhc3M9XCJjZW50ZXJcIj5MXFwnSVNDUklUVE8gTk9OICZFZ3JhdmU7IFNUQVRPIEFHR0lVTlRPLi4uUklQUk9WQTwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixlcnJvcmUpO1xuICAgIH1cbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImVycm9yX3VwZGF0ZV90XCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkVycm9yZVwiO1xuICAgICAgICBjb25zdCBlcnJvcmUgPSAnPHAgY2xhc3M9XCJjZW50ZXJcIj5JTCBUVVRPUkUgREVMTFxcJ0lTQ1JJVFRPIE5PTiAmRWdyYXZlOyBTVEFUTyBNT0RJRklDQVRPLi4uUklQUk9WQTwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixlcnJvcmUpO1xuICAgIH1cbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImVycm9yX3VwZGF0ZVwiKSAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCJFcnJvcmVcIjtcbiAgICAgICAgY29uc3QgZXJyb3JlID0gJzxwIGNsYXNzPVwiY2VudGVyXCI+TFxcJ0lTQ1JJVFRPIE5PTiAmRWdyYXZlOyBTVEFUTyBNT0RJRklDQVRPLi4uUklQUk9WQTwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixlcnJvcmUpO1xuICAgIH1cbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcInN1Y2Nlc3NfYWRkaW1hZ2VzdWJzY3JpYmVyXCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkF2dmlzb1wiO1xuICAgICAgICBjb25zdCBhdnZpc28gPSAnPHAgY2xhc3M9XCJjZW50ZXJcIj5JTU1BR0lORSBNT0RJRklDQVRBIENPUlJFVFRBTUVOVEU8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsYXZ2aXNvKTtcbiAgICB9XG59O1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBQYWdpbmEgQWdnaXVuZ2kvTW9kaWZpY2EgVXRlbnRlICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogLy9cbi8vRGljaGlhcmF6aW9uZSBWYXJpYWJpbGlcbi8vICBDb250cm9sbG8gZXJyb3JpIEZPUk1cbmNvbnN0IGZvcm1FZGl0T3BlcmF0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVkaXRfcHJvZmlsZVwiKTtcblxuaWYoZm9ybUVkaXRPcGVyYXRvciAhPSBudWxsKSB7XG4gICAgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvbGRwYXNzd29yZFwiKS52YWx1ZSA9IFwiXCI7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXdwYXNzd29yZFwiKS52YWx1ZSA9IFwiXCI7XG4gICAgXG4gICAgLy8gQXV0b2NvbXBsZXRhbWVudG8gY2FtcGkgY29uIHJpY2hpZXN0YSBkYWwgc2VydmVyXG4gICAgbGV0IHVybCA9IFwiLi9pbmNsdWRlLXBocC9jb250ZW50X2dsb2JhbC5waHA/dGlwbz1cIjtcbiAgICBjb25zdCBub21lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub21lXCIpO1xuICAgIGNvbnN0IGNvZ25vbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvZ25vbWVcIik7XG4gICAgXG4gICAgY29uc3QgYXV0b19ub21lID0gbmV3IEF1dG9jb21wbGV0ZShub21lLCh1cmwrXCJub21lJnZhbG9yZT1cIikpO1xuICAgIGNvbnN0IGF1dG9fY29nbm9tZSA9IG5ldyBBdXRvY29tcGxldGUoY29nbm9tZSwodXJsK1wiY29nbm9tZSZ2YWxvcmU9XCIpKTtcbiAgICBcbiAgICBsZXQgc2VuZCA9IDA7XG4gICAgY29uc3QgZm9ybSA9IGZvcm1FZGl0T3BlcmF0b3I7XG4gICAgXG4gICAgZnVuY3Rpb24gZXJyb3IoZWxlbSxkZXNjRXJyb3IpIHtcbiAgICAgICAgc2VuZCA9IDA7XG4gICAgICAgIGlmKGVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiY29udGFpbmVyLXJhZGlvXCIpKSB7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkICNGMDBcIjtcbiAgICAgICAgfVxuICAgICAgICAvL0VsaW1pbm8gbGUgcHJlY2VkZW50aSBCb3ggRGlhbG9nICAgICAgICBcbiAgICAgICAgaWYoZWxlbS5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW1nLWVycm9yXCIpKSB7XG4gICAgICAgICAgICBlbGVtLnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgfSBlbHNlIGlmKGVsZW0ucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYoZWxlbS5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoXCJpbWctZXJyb3JcIikpIHtcbiAgICAgICAgICAgICAgICBlbGVtLnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbWFnZUVycm9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VFcnJvci5jbGFzc0xpc3QuYWRkKFwiaW1nLWVycm9yXCIpO1xuICAgICAgICBjb25zdCBib3hFcnJvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGJveEVycm9yLmNsYXNzTGlzdC5hZGQoXCJib3gtZXJyb3JcIik7XG4gICAgICAgIGJveEVycm9yLmlubmVySFRNTCA9IGRlc2NFcnJvcitcIjxiciAvPlwiO1xuICAgICAgICBpbWFnZUVycm9yLmFwcGVuZENoaWxkKGJveEVycm9yKTtcbiAgICAgICAgZWxlbS5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRXJyb3IpO1xuICAgICAgICBcbiAgICAgICAgaW1hZ2VFcnJvci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGJveEVycm9yLmNsYXNzTGlzdC5hZGQoXCJvcGVuZWRcIik7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaW1hZ2VFcnJvci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgYm94RXJyb3IuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5lZFwiKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIHNlbmQgPSAxO1xuICAgICAgICBjb25zdCBmaWVsZHMgPSB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcbiAgICAgICAgY29uc3QgZXJyb3JfdCA9IFwiJkVncmF2ZTsgb2JibGlnYXRvcmlvIGNvbXBpbGFyZSBxdWVzdG8gY2FtcG8uXCI7XG4gICAgICAgIGNvbnN0IGVycm9yX3IgPSBcIiZFZ3JhdmU7IG9iYmxpZ2F0b3JpbyBzY2VnbGllcmUgcXVlc3RvIGNhbXBvLlwiO1xuXG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKSB7XG4gICAgICAgICAgICAgLy8gQWQgb2duaSBjb250cm9sbG8gcmltZXR0byBpbCBib3JkbyBzdGFuZGFyZCBlIHRvbGdvIGwnaWNvbmEgZGVsbCdlcnJvcmVcbiAgICAgICAgICAgIGFbaV0uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgIzAwNTc5OFwiO1xuICAgICAgICAgICAgaWYoYVtpXS5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW1nLWVycm9yXCIpKSB7XG4gICAgICAgICAgICAgICAgYVtpXS5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoYVtpXS5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYoYVtpXS5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZy5jbGFzc0xpc3QuY29udGFpbnMoXCJpbWctZXJyb3JcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgYVtpXS5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGFbaV0udmFsdWUgPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIHN3aXRjaChhW2ldLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm9sZHBhc3N3b3JkXCI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJuZXdwYXNzd29yZFwiOlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sZXJyb3JfdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZihhW2ldLnZhbHVlICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoKGFbaV0ubmFtZSl7XG4gICAgICAgICAgICAgICAgICAgIC8vTm9tZVxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwibm9tZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bXFwtXFwnYS16QS1aXFx4RTBcXHhFOFxceEU5XFx4RjlcXHhGMlxceEVDXFx4MjcgXSskXCIpLnRlc3QoYVtpXS52YWx1ZSkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9Db2dub21lXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjb2dub21lXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihuZXcgUmVnRXhwKFwiXltcXC1cXCdhLXpBLVpcXHhFMFxceEU4XFx4RTlcXHhGOVxceEYyXFx4RUNcXHgyNyBdKyRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL0VtYWlsXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbWFpbFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bYS16MC05XFwuXyUtXStAezEsMX1bYS16MC05XFwuXyUtXStbXFwuXXsxLDF9W2Etel17Miw2fSRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL09sZCBwYXNzd29yZFxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwib2xkcGFzc3dvcmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld3Bhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuZXdwYXNzd29yZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ld3Bhc3N3b3JkLnZhbHVlID09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLFwiU2UgaGFpIGNvbXBpbGF0byBRVUVTVE8gQ0FNUE8gZGV2aSBjb21waWxhcmUgYW5jaGUgaWwgY2FtcG8gTlVPVkEgUEFTU1dPUkQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9OZXcgcGFzc3dvcmRcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5ld3Bhc3N3b3JkXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRwYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib2xkcGFzc3dvcmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihvbGRwYXNzd29yZC52YWx1ZSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxcIlNlIGhhaSBjb21waWxhdG8gUVVFU1RPIENBTVBPIGRldmkgY29tcGlsYXJlIGFuY2hlIGlsIGNhbXBvIFZFQ0NISUEgUEFTU1dPUkQuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZihzZW5kID09PSAwKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAvLyAgRmluZXN0cmEgZGkgYXZ2aXNvXG4gICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkF2dmlzb1wiO1xuICAgICAgICAgICAgY29uc3QgYXZ2aXNvID0gJzxwPkNJIFNPTk8gREVHTEkgPHN0cm9uZz5FUlJPUkk8L3N0cm9uZz4sIENPUlJFR0dFUkxJIEUgUFJFTUVSRSBOVU9WQU1FTlRFIFNVTCBQVUxTQU5URSBcIklOVklBXCIsIEdSQVpJRS48L3A+JztcbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGF2dmlzbyk7XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgXG4gICAgLy9BcGVydHVyYSBmaW5lc3RyZSBkaSBkaWFsb2dvIHBlciBlcnJvcmkgZWQgYXZ2aXNpICAgIFxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwic3VjY2Vzc191cGRhdGVfdVwiKSAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCJBdnZpc29cIjtcbiAgICAgICAgY29uc3QgYXZ2aXNvID0gJzxwIGNsYXNzPVwiY2VudGVyXCI+SUwgUFJPRklMTyAmRWdyYXZlOyBTVEFUTyBNT0RJRklDQVRPIENPUlJFVFRBTUVOVEU8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsYXZ2aXNvKTtcbiAgICB9XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJlcnJvcl91cGRhdGVfdVwiKSAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCJFcnJvcmVcIjtcbiAgICAgICAgY29uc3QgZXJyb3JlID0gJzxwIGNsYXNzPVwiY2VudGVyXCI+SUwgUFJPRklMTyBOT04gJkVncmF2ZTsgU1RBVE8gTU9ESUZJQ0FUTy4uLlJJUFJPVkE8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsZXJyb3JlKTtcbiAgICB9XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJlcnJvcl91c2VybmFtZVwiKSAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCJFcnJvcmVcIjtcbiAgICAgICAgY29uc3QgZXJyb3JlID0gJzxwIGNsYXNzPVwiY2VudGVyXCI+TEEgVFVBIFVTRVJOQU1FIEUgTEEgVFVBIFBBU1NXT1JEIE5PTiBDT0lOQ0lET05PIChQUk9CQUJJTE1FTlRFIE5PTiBIQUkgSU5TRVJJVE8gTEEgVFVBIFZFQ0NISUEgUEFTU1dPUkQgQ09SUkVUVEFNRU5URSk8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsZXJyb3JlKTtcbiAgICB9XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJzdWNjZXNzX2FkZGltYWdlb3BlcmF0b3JcIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgIGNvbnN0IGF2dmlzbyA9ICc8cCBjbGFzcz1cImNlbnRlclwiPklNTUFHSU5FIE1PRElGSUNBVEEgQ09SUkVUVEFNRU5URTwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixhdnZpc28pO1xuICAgIH1cbn07XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKiogIFBhZ2luYSBDZXJjYSB1VEVOVEUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAvL1xuY29uc3QgZm9ybVNlYXJjaFN1YnNjcmliZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaF9zdWJzY3JpYmVyXCIpO1xuaWYoZm9ybVNlYXJjaFN1YnNjcmliZXIgIT0gbnVsbCkge1xuXG4gICAgLy8gQXV0b2NvbXBsZXRhbWVudG8gY2FtcGkgY29uIHJpY2hpZXN0YSBkYWwgc2VydmVyXG4gICAgbGV0IHVybCA9IFwiLi9pbmNsdWRlLXBocC9jb250ZW50X2dsb2JhbC5waHA/dGlwbz1cIjtcbiAgICBjb25zdCBub21lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub21lXCIpO1xuICAgIGNvbnN0IGNvZ25vbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvZ25vbWVcIik7XG4gICAgY29uc3QgcHJvZmVzc2lvbmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2Zlc3Npb25lXCIpO1xuICAgIFxuICAgIGNvbnN0IGF1dG9fbm9tZSA9IG5ldyBBdXRvY29tcGxldGUobm9tZSwodXJsK1wibm9tZSZ2YWxvcmU9XCIpKTtcbiAgICBjb25zdCBhdXRvX2NvZ25vbWUgPSBuZXcgQXV0b2NvbXBsZXRlKGNvZ25vbWUsKHVybCtcImNvZ25vbWUmdmFsb3JlPVwiKSk7XG4gICAgY29uc3QgYXV0b19wcm9mZXNzaW9uZSA9IG5ldyBBdXRvY29tcGxldGUocHJvZmVzc2lvbmUsKHVybCtcInByb2Zlc3Npb25lJnZhbG9yZT1cIikpO1xufTtcblxuY29uc3Qgc2NoZWRhR2xvYmFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY2hlZGFfZ2xvYmFsXCIpO1xuaWYoc2NoZWRhR2xvYmFsICE9IG51bGwpIHtcbiAgICAvL0NyZW8gbGUgdGFic1xuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwiYW5ub19wXCIpICE9PSAtMSB8fCBsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcInJlc3RpdHV0aW9uXCIpICE9PSAtMSB8fCBsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcIm5ld1wiKSAhPT0gLTEgfHwgbG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJyZW1vdmVfbG9hblwiKSAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgdGFicyA9IG5ldyBUYWJzKHNjaGVkYUdsb2JhbCwyKTtcbiAgICB9IGVsc2UgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJtb3RpdmF0aW9uXCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCB0YWJzID0gbmV3IFRhYnMoc2NoZWRhR2xvYmFsLDMpO1xuICAgIH0gZWxzZSBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcInNvY2lvXCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCB0YWJzID0gbmV3IFRhYnMoc2NoZWRhR2xvYmFsLDQpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRhYnMgPSBuZXcgVGFicyhzY2hlZGFHbG9iYWwpO1xuICAgIH1cbiAgICBcbiAgICAvL0FwZXJ0dXJhIGZpbmVzdHJlIGRpIGRpYWxvZ28gcGVyIGVycm9yaSBlZCBhdnZpc2lcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcInN1Y2Nlc3NfYWRkX2NcIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgIGNvbnN0IGF2dmlzbyA9ICc8cCBjbGFzcz1cImNlbnRlclwiPkNBVEFMT0dBWklPTkUgQUdHSVVOVEEgQ09SUkVUVEFNRU5URTwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixhdnZpc28pO1xuICAgIH1cbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcInN1Y2Nlc3NfdXBkYXRlX2NcIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgIGNvbnN0IGF2dmlzbyA9ICc8cCBjbGFzcz1cImNlbnRlclwiPkNBVEFMT0dBWklPTkUgTU9ESUZJQ0FUQSBDT1JSRVRUQU1FTlRFPC9wPic7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGF2dmlzbyk7XG4gICAgfVxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwic3VjY2Vzc19hZGRpbWFnZWNhdGFsb2dcIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgIGNvbnN0IGF2dmlzbyA9ICc8cCBjbGFzcz1cImNlbnRlclwiPklNTUFHSU5FIE1PRElGSUNBVEEgQ09SUkVUVEFNRU5URTwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixhdnZpc28pO1xuICAgIH1cbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcInN1Y2Nlc3NfYWRkaW1hZ2VzdWJzY3JpYmVyXCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkF2dmlzb1wiO1xuICAgICAgICBjb25zdCBhdnZpc28gPSAnPHAgY2xhc3M9XCJjZW50ZXJcIj5JTU1BR0lORSBNT0RJRklDQVRBIENPUlJFVFRBTUVOVEU8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsYXZ2aXNvKTtcbiAgICB9XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJzdWNjZXNzX2FkZF9pXCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkF2dmlzb1wiO1xuICAgICAgICBjb25zdCBhdnZpc28gPSAnPHAgY2xhc3M9XCJjZW50ZXJcIj5JU0NSSVRUTyBBR0dJVU5UTyBDT1JSRVRUQU1FTlRFPC9wPic7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGF2dmlzbyk7XG4gICAgfVxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwic3VjY2Vzc191cGRhdGVfaVwiKSAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCJBdnZpc29cIjtcbiAgICAgICAgY29uc3QgYXZ2aXNvID0gJzxwIGNsYXNzPVwiY2VudGVyXCI+SVNDUklUVE8gTU9ESUZJQ0FUTyBDT1JSRVRUQU1FTlRFPC9wPic7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGF2dmlzbyk7XG4gICAgfVxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwic3VjY2Vzc19zdXNwZW5kZWRcIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgIGNvbnN0IGF2dmlzbyA9ICc8cCBjbGFzcz1cImNlbnRlclwiPlNPU1BFTlNJT05FIElTQ1JJVFRPIEFWVkVOVVRBIENPUlJFVFRBTUVOVEU8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsYXZ2aXNvKTtcbiAgICB9XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJlcnJvcl91cGRhdGVfc3VzcGVuZGVkXCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkVycm9yZVwiO1xuICAgICAgICBjb25zdCBlcnJvcmUgPSAnPHAgY2xhc3M9XCJjZW50ZXJcIj5BR0dJT1JOQU1FTlRPIFNPU1BFTlNJT05FIE5PTiBBVlZFTlVUTy4uLlJJUFJPVkE8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsZXJyb3JlKTtcbiAgICB9XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJlcnJvcl9zdXNwZW5kZWRcIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiRXJyb3JlXCI7XG4gICAgICAgIGNvbnN0IGVycm9yZSA9ICc8cCBjbGFzcz1cImNlbnRlclwiPkFHR0lVTlRBIFNPU1BFTlNJT05FIE5PTiBBVlZFTlVUQS4uLlJJUFJPVkE8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsZXJyb3JlKTtcbiAgICB9XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJzdWNjZXNzX3JlYWRtaXNzaW9uXCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkF2dmlzb1wiO1xuICAgICAgICBjb25zdCBhdnZpc28gPSAnPHAgY2xhc3M9XCJjZW50ZXJcIj5SSUFNTUlTU0lPTkUgSVNDUklUVE8gQVZWRU5VVEEgQ09SUkVUVEFNRU5URTwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixhdnZpc28pO1xuICAgIH1cbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImVycm9yX3VwZGF0ZV9yZWFkbWlzc2lvblwiKSAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCJFcnJvcmVcIjtcbiAgICAgICAgY29uc3QgZXJyb3JlID0gJzxwIGNsYXNzPVwiY2VudGVyXCI+QUdHSU9STkFNRU5UTyBSSUFNTUlTU0lPTkUgTk9OIEFWVkVOVVRBLi4uUklQUk9WQTwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixlcnJvcmUpO1xuICAgIH1cbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImVycm9yX3JlYWRtaXNzaW9uXCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkVycm9yZVwiO1xuICAgICAgICBjb25zdCBlcnJvcmUgPSAnPHAgY2xhc3M9XCJjZW50ZXJcIj5SSUFNTUlTU0lPTkUgTk9OIEFWVkVOVVRBLi4uUklQUk9WQTwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixlcnJvcmUpO1xuICAgIH1cbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImluZm9fc29jaW9cIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgIGNvbnN0IGF2dmlzbyA9ICc8cCBjbGFzcz1cImNlbnRlclwiPkVMSU1JTkFaSU9ORSBTT0NJTyBQRVIgTFxcJ0FOTk8gSU5ESUNBVE8gQVZWRU5VVEEgQ09SUkVUVEFNRU5URTwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixhdnZpc28pO1xuICAgIH1cbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImVycm9yX3JlbmV3ZWRcIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiRXJyb3JlXCI7XG4gICAgICAgIGNvbnN0IGVycm9yZSA9ICc8cCBjbGFzcz1cImNlbnRlclwiPkxcXCdVVEVOVEUgJkVncmF2ZTsgU09TUEVTTyBQRVIgQ1VJIE5PTiAmRWdyYXZlOyBQT1NTSUJJTEUgUklOTk9WQVJFIElMIFBSRVNUSVRPPC9wPic7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGVycm9yZSk7XG4gICAgfVxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwiZXJyb3JfbmV3c1wiKSAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCJFcnJvcmVcIjtcbiAgICAgICAgY29uc3QgZXJyb3JlID0gJzxwIGNsYXNzPVwiY2VudGVyXCI+UVVFU1RPIFBSRVNUSVRPIE5PTiBQVSZPZ3JhdmU7IEVTU0VSRSBSSU5OT1ZBVE8gUEVSQ0gmRWdyYXZlOyBTSSBUUkFUVEEgREkgVU5BIE5PVklUJkFncmF2ZTs8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsZXJyb3JlKTtcbiAgICB9XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJlcnJvcl9yZW5ld2FsXCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkVycm9yZVwiO1xuICAgICAgICBjb25zdCBlcnJvcmUgPSAnPHAgY2xhc3M9XCJjZW50ZXJcIj5RVUVTVE8gUFJFU1RJVE8gTk9OIFBVJk9ncmF2ZTsgUEkmVWdyYXZlOyBFU1NFUkUgUklOTk9WQVRPPC9wPic7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGVycm9yZSk7XG4gICAgfVxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwic3VjY2Vzc19yZW5ld2FsXCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkF2dmlzb1wiO1xuICAgICAgICBjb25zdCBhdnZpc28gPSAnPHAgY2xhc3M9XCJjZW50ZXJcIj5JTCBSSU5OT1ZPIERJIFFVRVNUTyBQUkVTVElUTyAmRWdyYXZlOyBBVlZFTlVUTyBDT1JSRVRUQU1FTlRFPC9wPic7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGF2dmlzbyk7XG4gICAgfVxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwiZXJyb3JfcmVuZXdhbF9ub1wiKSAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCJFcnJvcmVcIjtcbiAgICAgICAgY29uc3QgZXJyb3JlID0gJzxwIGNsYXNzPVwiY2VudGVyXCI+UVVFU1RPIFBSRVNUSVRPIE5PTiBQVSZPZ3JhdmU7IFBJJlVncmF2ZTsgRVNTRVJFIFJJTk5PVkFUTzwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixlcnJvcmUpO1xuICAgIH1cbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcInN1Y2Nlc3NfcmVzdGl0dXRpb25cIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgIGNvbnN0IGF2dmlzbyA9ICc8cCBjbGFzcz1cImNlbnRlclwiPklOU0VSSU1FTlRPIFJFU1RJVFVaSU9ORSBBVlZFTlVUTyBDT1JSRVRUQU1FTlRFPC9wPic7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGF2dmlzbyk7XG4gICAgfVxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwic3VjY2Vzc19yZW1vdmVfbG9hblwiKSAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCJBdnZpc29cIjtcbiAgICAgICAgY29uc3QgYXZ2aXNvID0gJzxwIGNsYXNzPVwiY2VudGVyXCI+RUxJTUlOQVpJT05FIFBSRVNUSVRPIEFWVkVOVVRBIENPUlJFVFRBTUVOVEU8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsYXZ2aXNvKTtcbiAgICB9XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJzdWNjZXNzX21vdGl2YXRpb25cIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgIGNvbnN0IGF2dmlzbyA9ICc8cCBjbGFzcz1cImNlbnRlclwiPk1PVElWQVpJT05FIEFHR0lPUk5BVEEgQ09SUkVUVEFNRU5URTwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixhdnZpc28pO1xuICAgIH1cbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImVycm9yX21vdGl2YXRpb25cIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiRXJyb3JlXCI7XG4gICAgICAgIGNvbnN0IGVycm9yID0gJzxwIGNsYXNzPVwiY2VudGVyXCI+RVJST1JFIE5FTExcXCdBR0dJT1JOQU1FTlRPIERFTExBIE1PVElWQVpJT05FLi4uUklQUk9WQTwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixlcnJvcik7XG4gICAgfVxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwic3VjY2Vzc19zb2Npb1wiKSAhPT0gLTEpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyID0gXCJBdnZpc29cIjtcbiAgICAgICAgY29uc3QgYXZ2aXNvID0gJzxwIGNsYXNzPVwiY2VudGVyXCI+TFxcJ1VURU5URSAmRWdyYXZlOyBTVEFUTyBJTlNFUklUTyBORUkgU09DSTwvcD4nO1xuICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixhdnZpc28pO1xuICAgIH1cbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImVycm9yX3NvY2lvXCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkVycm9yZVwiO1xuICAgICAgICBjb25zdCBlcnJvciA9ICc8cCBjbGFzcz1cImNlbnRlclwiPkVSUk9SRTogTFxcJ1VURU5URSBOT04gJkVncmF2ZTsgSU5TRVJJVE8gTkVJIFNPQ0kuLi5SSVBST1ZBPC9wPic7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGVycm9yKTtcbiAgICB9XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJnaWFfc29jaW9cIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGFubm8gPSBsb2NhdGlvbi5zZWFyY2guc3Vic3RyKChsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImdpYV9zb2Npb1wiKSsxOSksNCk7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgIGNvbnN0IGF2dmlzbyA9ICc8cCBjbGFzcz1cImNlbnRlclwiPkxcXCdVVEVOVEUgJkVncmF2ZTsgR0kmQWdyYXZlOyBTT0NJTyBQRVIgTFxcJ0FOTk8gJythbm5vKyc8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsYXZ2aXNvKTtcbiAgICB9XG59XG5cbi8vIFNlIGMnw6ggaWwgcHVsc2FudGUgVmVkaSBEYXRpIFR1dG9yZSBhdHRpdm8gbCdhbmltYXppb25lXG5jb25zdCBidXR0b25EYXRpVHV0b3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2ZWRpX2RhdGlfdHV0b3JlXCIpO1xuaWYoYnV0dG9uRGF0aVR1dG9yZSAhPSBudWxsKSB7XG4gICAgY29uc3QgY29udGFpbmVyVHV0b3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJfdHV0b3JlXCIpO1xuICAgIGJ1dHRvbkRhdGlUdXRvcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgY29udGFpbmVyVHV0b3JlLmNsYXNzTGlzdC50b2dnbGUoXCJvcGVuZWRcIik7XG4gICAgfSk7XG59XG5cblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAgUGFnaW5hIEFnZ2l1bmdpL01vZGlmaWNhIENhdGFsb2dhemlvbmUgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAvL1xuLy9EaWNoaWFyYXppb25lIFZhcmlhYmlsaVxuLy8gIENvbnRyb2xsbyBlcnJvcmkgRk9STVxuY29uc3QgZm9ybUFkZExvYW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF9sb2FuXCIpO1xuXG5pZihmb3JtQWRkTG9hbiAhPSBudWxsKSB7XG4gICAgXG4gICAgLy8gVmFyaWFiaWxpXG4gICAgbGV0IHVybCA9IFwiLi9pbmNsdWRlLXBocC9jb250ZW50X2dsb2JhbC5waHA/dGlwbz1cIjtcbiAgICBjb25zdCBpc2JuX3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlzYm5fcFwiKTtcbiAgICBjb25zdCBudW1fdGVzX3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm51bV90ZXNfcFwiKTtcbiAgICBjb25zdCBudW1faW52ZW50YXJpb19wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJudW1faW52X3BcIik7XG4gICAgY29uc3QgZGF0YV9wcmVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRhX3ByZXNfcFwiKTtcbiAgICBjb25zdCBsaXN0X2NhdF9hID0gbmV3IEFycmF5KCk7XG4gICAgY29uc3QgbGlzdF9zdWJfYSA9IG5ldyBBcnJheSgpO1xuICAgIGNvbnN0IGNhcmRfYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2F0YWxvZ3VpbmdcIik7XG4gICAgY29uc3QgY2FyZF9zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJzY3JpYmVyXCIpO1xuICAgIGNvbnN0IGJ1dHRvbl9jID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY2hlZGFfY1wiKTtcbiAgICBjb25zdCBidXR0b25fcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2NoZWRhX3NcIik7XG4gICAgY29uc3QgcmlzX3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm51bV90ZXNfc1wiKTtcbiAgICBjb25zdCByaXNfYyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibnVtX2ludl9zXCIpO1xuICAgIGNvbnN0IHJpc19jaSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXNibl9zXCIpO1xuICAgIGNvbnN0IGNsb3NlU3Vic2NyaWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2Utc3Vic2NyaWJlclwiKTtcbiAgICBjb25zdCBjbG9zZUNhdGFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlLWNhdGFsb2dcIik7XG4gICAgY29uc3QgaXRlbXNDYXJkQ2F0YWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjY2F0YWxvZ3VpbmcgbGlcIik7XG4gICAgY29uc3QgaXRlbXNDYXJkU3Vic2NyaWJlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjc3Vic2NyaWJlciBsaVwiKTtcbiAgICBjb25zdCByYWRpb1Byb3BlcnRpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbnRhaW5lci1yYWRpbyAucmFkaW9cIik7XG4gICAgXG4gICAgYnV0dG9uX2Muc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgYnV0dG9uX3Muc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgXG4gICAgLy9JbnNlcmlzY28gbGEgZGF0YSBvZGllcm5hXG4gICAgbGV0IGRhdGFfb2RpZXJuYSA9IG5ldyBEYXRlKCk7XG4gICAgY29uc3QgbWVzZSA9IChkYXRhX29kaWVybmEuZ2V0TW9udGgoKSsxKTtcbiAgICBjb25zdCBnaW9ybm8gPSBkYXRhX29kaWVybmEuZ2V0RGF0ZSgpO1xuICAgIGRhdGFfb2RpZXJuYSA9IGRhdGFfb2RpZXJuYS5nZXRGdWxsWWVhcigpK1wiLVwiKyhTdHJpbmcobWVzZSkubGVuZ3RoID09IDEgPyBcIjBcIittZXNlIDogbWVzZSkrXCItXCIrKFN0cmluZyhnaW9ybm8pLmxlbmd0aCA9PSAxID8gXCIwXCIrZ2lvcm5vIDogZ2lvcm5vKTtcbiAgICBjb25zb2xlLmxvZyhkYXRhX29kaWVybmEpO1xuICAgIGNvbnNvbGUubG9nKGRhdGFfcHJlcyk7XG4gICAgZGF0YV9wcmVzLnZhbHVlID0gZGF0YV9vZGllcm5hO1xuICAgIFxuICAgIC8vIEF2dmlzbyBsJ3V0ZW50ZSBjaGUgcHJpbWEgZGkgY29tcGlsYXJlIGlsIGNhbXBvIG51bWVybyBpbnZlbnRhcmlvIGRldmUgc2NlZ2xpZXJlIGxhIHByb3ByaWV0YVxuICAgIG51bV9pbnZlbnRhcmlvX3AuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICBjb25zdCByYWRpb1Byb3ByaWV0YSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuYW1lPVwicHJvcHJpZXRhX3BcIl0nKTtcbiAgICAgICBsZXQgY2hlY2tlZCA9IDA7XG4gICAgICAgZm9yKGxldCBpID0gMDtpIDwgcmFkaW9Qcm9wcmlldGEubGVuZ3RoO2krKykge1xuICAgICAgICAgICBpZihyYWRpb1Byb3ByaWV0YVtpXS5jaGVja2VkID09IHRydWUpIHtcbiAgICAgICAgICAgICAgIGNoZWNrZWQrKztcbiAgICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgICBpZihjaGVja2VkID09IDApIHtcbiAgICAgICAgICAgIC8vICBGaW5lc3RyYSBkaSBhdnZpc29cbiAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgICAgICBjb25zdCBhdnZpc28gPSBcIjxwPlBSSU1BIERJIENPTVBJTEFSRSBRVUVTVE8gQ0FNUE8gRScgTkVDRVNTQVJJTyBTQ0VHTElFUkUgSUwgQ0FNUE8gPHN0cm9uZz5QUk9QUklFVEEnPC9zdHJvbmc+PC9wPlwiO1xuICAgICAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsYXZ2aXNvLGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXNibl9wXCIpLHRydWUpO1xuICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL0FycmF5IHBlciB0cmFkdXppb25lIHNpZ2xlXG4gICAgY29uc3QgdHJhZHV6aW9uZV9zaWdsZV9jYXRhbG9ndWluZyA9IHtcbiAgICAgICAgXCJZXCIgOiBcIlNpXCIsXG4gICAgICAgIFwiTlwiIDogXCJOb1wiLFxuICAgICAgICBcIlBcIiA6IFwiUGFwaWxsb25cIixcbiAgICAgICAgXCJDXCIgOiBcIkNvbXVuZVwiLFxuICAgICAgICBcIkZcIiA6IFwiRmlsb2Zlc3RpdmFsXCJcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IHRyYWR1emlvbmVfc2lnbGVfc3Vic2NyaWJlciA9IHtcbiAgICAgICAgXCJZXCIgOiBcIlNpXCIsXG4gICAgICAgIFwiTlwiIDogXCJOb1wiLFxuICAgICAgICBcIk1cIiA6IFwiTWFzY2hpb1wiLFxuICAgICAgICBcIkZcIiA6IFwiRmVtbWluYVwiXG4gICAgfTtcbiAgICAgICAgXG4gICAgLy9WYWRvIGEgcHJlbmRlcmUgbGEgc3RydXR0dXJhIGUgbGUgZXRpY2hldHRlIGRlaSBkdWUgZGl2IChjYXRhbG9nYXppb25lIGVkIHV0ZW50ZSkgY2hlIGFuZHJhbm5vIGEgY29udGVuZXJlIGkgZGF0aSBjYXJpY2F0aSB0cmFtaXRlIGNoaWFtYXRlIGFqYXhcbiAgICBpdGVtc0NhcmRDYXRhbG9nLmZvckVhY2goZnVuY3Rpb24odixpLGEpe1xuICAgICAgICBsaXN0X2NhdF9hW2ldID0gYVtpXS5pbm5lckhUTUwudHJpbSgpO1xuICAgIH0pO1xuICAgIGl0ZW1zQ2FyZFN1YnNjcmliZXIuZm9yRWFjaChmdW5jdGlvbih2LGksYSl7XG4gICAgICAgIGxpc3Rfc3ViX2FbaV0gPSBhW2ldLmlubmVySFRNTC50cmltKCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy9GdW56aW9uZSBwZXIgY2FyaWNhcmUgaSBkYXRpIGNhdGFsb2dhemlvbmUgdHJhbWl0ZSBhamF4XG4gICAgZnVuY3Rpb24gY2FyZENhdGFsb2d1aW5nKHByb3ByaWV0YSxudW1faW52KSB7XG4gICAgICAgIGxldCB1cmxfZmluZSA9IHVybCtcIm51bV9pbnZfcCZ2YWxvcmVfaW52PVwiK2VuY29kZVVSSUNvbXBvbmVudChudW1faW52KStcIiZ2YWxvcmVfc2lnbGE9XCIrcHJvcHJpZXRhO1xuICAgICAgICBjb25zb2xlLmxvZyh1cmxfZmluZSk7XG4gICAgICAgIGZldGNoKHVybF9maW5lKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgaWYoZGF0YSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgcmlzX2MuaW5uZXJIVE1MID0gXCJOYXNjb25kaSBTY2hlZGEgQ2F0YWxvZ2F6aW9uZVwiO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFfdiA9IGRhdGEuc3BsaXQoXCIjXCIpO1xuICAgICAgICAgICAgICAgIGJ1dHRvbl9jLnNldEF0dHJpYnV0ZSgnaHJlZicsJy4vY2FyZF9jYXRhbG9nLnBocD9pZF9jYXRhbG9nPScrZGF0YV92WzBdKycmcD0xJnRyPScpO1xuICAgICAgICAgICAgICAgIGJ1dHRvbl9jLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhX3YpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGl0ZW1zQ2FyZENhdGFsb2cpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpc3RfY2F0X2EpO1xuICAgICAgICAgICAgICAgIGRhdGFfdi5zcGxpY2UoNSwxKTtcbiAgICAgICAgICAgICAgICBpdGVtc0NhcmRDYXRhbG9nLmZvckVhY2goZnVuY3Rpb24odixpLGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYVtpXS5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2goaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTg6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDIxOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFbaV0uaW5uZXJIVE1MID0gbGlzdF9jYXRfYVtpXStcIiA8ZW0+XCIrdHJhZHV6aW9uZV9zaWdsZV9jYXRhbG9ndWluZ1tkYXRhX3ZbaSsxXV0rXCI8L2VtPlwiO1x0XHRcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhW2ldLmlubmVySFRNTCA9IGxpc3RfY2F0X2FbaV0rXCIgPGVtPlwiK2RhdGFfdltpKzFdK1wiIFtjbV08L2VtPlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFfdmV0ID0gZGF0YV92W2krMV0uc3BsaXQoXCItXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFfYyA9IGRhdGFfdmV0WzJdK1wiLVwiK2RhdGFfdmV0WzFdK1wiLVwiK2RhdGFfdmV0WzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFbaV0uaW5uZXJIVE1MID0gbGlzdF9jYXRfYVtpXStcIiA8ZW0+XCIrZGF0YV9jK1wiPC9lbT5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhW2ldLmlubmVySFRNTCA9IGxpc3RfY2F0X2FbaV0rXCIgPGVtPlwiK2RhdGFfdltpKzFdK1wiICZldXJvOzwvZW0+XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYVtpXS5pbm5lckhUTUwgPSBsaXN0X2NhdF9hW2ldK1wiIDxlbT5cIitkYXRhX3ZbaSsxXStcIjwvZW0+XCI7XHRcdFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjYXJkX2Muc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmlzX2MuaW5uZXJIVE1MID0gXCJOZXNzdW5hIENhdGFsb2dhemlvbmVcIjtcdFx0XHRcdFx0XG4gICAgICAgICAgICAgICAgY2FyZF9jLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBidXR0b25fYy5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yZSBjYXJpY2FtZW50byBkYXRpXCIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFxuICAgIC8vRnVuemlvbmUgcGVyIGNhcmljYXJlIGkgZGF0aSB1dGVudGUgdHJhbWl0ZSBhamF4XG4gICAgZnVuY3Rpb24gY2FyZFN1YnNjcmliZXIobnVtX3Rlcykge1xuICAgICAgICBsZXQgdXJsX2ZpbmUgPSB1cmwrXCJudW1fdGVzX3AmdmFsb3JlX251bV90ZXNzZXJhPVwiK2VuY29kZVVSSUNvbXBvbmVudChudW1fdGVzKTtcbiAgICAgICAgZmV0Y2godXJsX2ZpbmUpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYoZGF0YSAhPSAwKSB7XG4gICAgICAgICAgICAgICAgcmlzX3MuaW5uZXJIVE1MID0gXCJOYXNjb25kaSBTY2hlZGEgVXRlbnRlXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YV92ID0gZGF0YS5zcGxpdChcIiNcIik7XG4gICAgICAgICAgICAgICAgYnV0dG9uX3Muc2V0QXR0cmlidXRlKCdocmVmJywnLi9jYXJkX3N1YnNjcmliZXIucGhwP2lkX2lzY3JpdHRvPScrZGF0YV92WzBdKycmcD0xJnRyPScpO1xuICAgICAgICAgICAgICAgIGJ1dHRvbl9zLnN0eWxlLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhX3YpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpc3Rfc3ViX2EpO1xuICAgICAgICAgICAgICAgIGRhdGFfdi5zcGxpY2UoMywxKTtcbiAgICAgICAgICAgICAgICBpdGVtc0NhcmRTdWJzY3JpYmVyLmZvckVhY2goZnVuY3Rpb24odixpLGEpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FyZF9zLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIGFbaV0uaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoKGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTU6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE2OlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhW2ldLmlubmVySFRNTCA9IGxpc3Rfc3ViX2FbaV0rXCIgPGVtPlwiK3RyYWR1emlvbmVfc2lnbGVfc3Vic2NyaWJlcltkYXRhX3ZbaSsxXV0rXCI8L2VtPlwiO1x0XHRcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFfdmV0ID0gZGF0YV92W2krMV0uc3BsaXQoXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFfdmV0X2MgPSBkYXRhX3ZldFswXS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YV9jID0gZGF0YV92ZXRfY1syXStcIi1cIitkYXRhX3ZldF9jWzFdK1wiLVwiK2RhdGFfdmV0X2NbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYVtpXS5pbm5lckhUTUwgPSBsaXN0X3N1Yl9hW2ldK1wiIDxlbT5cIitkYXRhX2MrXCI8L2VtPlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDE4OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0aXBvX2RvYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2goZGF0YV92W2krMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnMCc6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXBvX2RvYyA9ICctJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJzEnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlwb19kb2MgPSBcIkNhcnRhIGQnSWRlbnRpdCZhZ3JhdmU7XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICcyJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpcG9fZG9jID0gJ0NhcnRhIGRlaSBTZXJ2aXppJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJzMnOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGlwb19kb2MgPSAnUGFzc2Fwb3J0byc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICc0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpcG9fZG9jID0gJ1Rlc3NlcmEgU2FuaXRhcmlhJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXBvX2RvYyA9ICctJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVx0XHRcdFx0XHRcdFx0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYVtpXS5pbm5lckhUTUwgPSBsaXN0X3N1Yl9hW2ldK1wiIDxlbT5cIit0aXBvX2RvYytcIjwvZW0+XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYVtpXS5pbm5lckhUTUwgPSBsaXN0X3N1Yl9hW2ldK1wiIDxlbT5cIitkYXRhX3ZbaSsxXStcIjwvZW0+XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhazsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjYXJkX3Muc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByaXNfcy5pbm5lckhUTUwgPSBcIk5lc3N1biBVdGVudGVcIjtcdFx0XHRcdFx0XG4gICAgICAgICAgICAgICAgY2FyZF9zLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICBidXR0b25fcy5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JlIGNhcmljYW1lbnRvIGRhdGlcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBpc2JuX3AuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgbGV0IHZhbCA9IHRoaXMudmFsdWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHZhbCk7XG4gICAgICAgIGlmKHZhbCAhPSBcIlwiKSB7XG4gICAgICAgICAgICBsZXQgdXJsX2lzYm4gPSB1cmwrXCJpc2JuJnZhbG9yZT1cIit2YWw7XG4gICAgICAgICAgICBmZXRjaCh1cmxfaXNibikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZihkYXRhICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gZGF0YS5zcGxpdCgnIycpO1xuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZXNbMF0udHJpbSgpID09IFwiUFwiKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICByYWRpb1Byb3BlcnRpZXNbMF0uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByYWRpb1Byb3BlcnRpZXNbMF0ucGFyZW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM5NmU5NzlcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHZhbHVlc1swXS50cmltKCkgPT0gXCJDXCIpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlvUHJvcGVydGllc1sxXS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhZGlvUHJvcGVydGllc1sxXS5wYXJlbnRFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiIzk2ZTk3OVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYodmFsdWVzWzBdLnRyaW0oKSA9PSBcIkZcIilcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmFkaW9Qcm9wZXJ0aWVzWzJdLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmFkaW9Qcm9wZXJ0aWVzWzJdLnBhcmVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOTZlOTc5XCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbnVtX2ludmVudGFyaW9fcC52YWx1ZSA9IHZhbHVlc1sxXS50cmltKCk7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRDYXRhbG9ndWluZyh2YWx1ZXNbMF0udHJpbSgpLCB2YWx1ZXNbMV0udHJpbSgpKTtcbiAgICAgICAgICAgICAgICAgICAgbnVtX3Rlc19wLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbnVtX2ludmVudGFyaW9fcC52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHJhZGlvUHJvcGVydGllcy5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhW2ldLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFbaV0ucGFyZW50RWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNlN2U3ZTdcIjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNhcmRDYXRhbG9ndWluZyhcIlwiLCBcIlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JlIGNhcmljYW1lbnRvIGRhdGlcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICBcbiAgICBudW1faW52ZW50YXJpb19wLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGxldCBudW1faW52ID0gdGhpcy52YWx1ZTtcbiAgICAgICAgbGV0IHByb3ByaWV0YTtcbiAgICAgICAgY29uc3QgcGFwaWxsb24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhcGlsbG9uXCIpO1xuICAgICAgICBjb25zdCBjb211bmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbXVuZVwiKTtcbiAgICAgICAgY29uc3QgZmlsbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmVzdGl2YWxcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKG51bV9pbnYpO1xuICAgICAgICBpZihwYXBpbGxvbi5jaGVja2VkID09IHRydWUpIHtcbiAgICAgICAgICAgIHByb3ByaWV0YSA9IHBhcGlsbG9uLnZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYoY29tdW5lLmNoZWNrZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgcHJvcHJpZXRhID0gY29tdW5lLnZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYoZmlsby5jaGVja2VkID09IHRydWUpIHtcbiAgICAgICAgICAgIHByb3ByaWV0YSA9IGZpbG8udmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cocHJvcHJpZXRhKTtcbiAgICAgICAgY2FyZENhdGFsb2d1aW5nKHByb3ByaWV0YSwgbnVtX2ludik7XG4gICAgfSk7XG4gICAgXG4gICAgbnVtX3Rlc19wLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGxldCB2YWwgPSB0aGlzLnZhbHVlO1xuICAgICAgICBjb25zb2xlLmxvZyh2YWwpO1xuICAgICAgICBpZih2YWwgIT0gXCJcIikge1xuICAgICAgICAgICAgY2FyZFN1YnNjcmliZXIodmFsKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICBcbiAgICAvL0NoaXVkbyBsZSBzY2hlZGUgc2Ugc29ubyBhcGVydGUgZSBsZSBhcHJvIHNlIHNvbm8gY2hpdXNlXG4gICAgY2xvc2VTdWJzY3JpYmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYoY2FyZF9zLnN0eWxlLmRpc3BsYXkgPT0gXCJibG9ja1wiKSB7XG4gICAgICAgICAgICBjYXJkX3Muc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgcmlzX3MuaW5uZXJIVE1MID0gXCJWZWRpIFNjaGVkYSBVdGVudGVcIjtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGNsb3NlQ2F0YWxvZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKGNhcmRfYy5zdHlsZS5kaXNwbGF5ID09IFwiYmxvY2tcIikge1xuICAgICAgICAgICAgY2FyZF9jLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHJpc19jLmlubmVySFRNTCA9IFwiVmVkaSBTY2hlZGEgQ2F0YWxvZ2F6aW9uZVwiO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgcmlzX3MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZihjYXJkX3Muc3R5bGUuZGlzcGxheSA9PSBcIm5vbmVcIikge1xuICAgICAgICAgICAgY2FyZF9zLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBlLnRhcmdldC5pbm5lckhUTUwgPSBcIk5hc2NvbmRpIFNjaGVkYSBVdGVudGVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhcmRfcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBlLnRhcmdldC5pbm5lckhUTUwgPSBcIlZlZGkgU2NoZWRhIFV0ZW50ZVwiO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgcmlzX2MuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZihjYXJkX2Muc3R5bGUuZGlzcGxheSA9PSBcIm5vbmVcIikge1xuICAgICAgICAgICAgY2FyZF9jLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBlLnRhcmdldC5pbm5lckhUTUwgPSBcIk5hc2NvbmRpIFNjaGVkYSBDYXRhbG9nYXppb25lXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYXJkX2Muc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgZS50YXJnZXQuaW5uZXJIVE1MID0gXCJWZWRpIFNjaGVkYSBDYXRhbG9nYXppb25lXCI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICAvL0FwZXJ0dXJhIGZpbmVzdHJlIGRpIGRpYWxvZ28gcGVyIGVycm9yaSBlZCBhdnZpc2lcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcImVycm9ycz15ZXNcIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGVycm9ycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvcnMnKS5pbm5lckhUTUw7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRWxlbmNvIGVycm9yaTpcIitlcnJvcnMpO1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkVycm9yaVwiO1xuICAgICAgICBjb25zdCBhdnZpc28gPSBlcnJvcnM7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGF2dmlzbyk7XG4gICAgfVxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwibG9hbj1sZW50XCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkF2dmlzb1wiO1xuICAgICAgICBjb25zdCBhdnZpc28gPSAnPHAgY2xhc3M9XCJjZW50ZXJcIj5RVUVTVEEgQ0FUQUxPR0FaSU9ORSAmRWdyYXZlOyBHSSZBZ3JhdmU7IElOIFBSRVNUSVRPPC9wPic7XG4gICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGF2dmlzbyk7XG4gICAgfVxuICAgIGlmKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwic3Vic2NyaWJlcj1zdXNwZW5kZWRcIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgIGNvbnN0IGF2dmlzbyA9ICc8cCBjbGFzcz1cImNlbnRlclwiPkxcXCdJU0NSSVRUTyAmRWdyYXZlOyBTT1NQRVNPIFBFUiBDVUkgTk9OICZFZ3JhdmU7IFBPU1NJQklMRSBEQVJFIENBVEFMT0dBWklPTkkgSU4gUFJFU1RJVE88L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsYXZ2aXNvKTtcbiAgICB9XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJsb2FuPWxpbWl0XCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkF2dmlzb1wiO1xuICAgICAgICBjb25zdCBhdnZpc28gPSAnPHAgY2xhc3M9XCJjZW50ZXJcIj5MXFwnSVNDUklUVE8gSEEgR0kmQWdyYXZlOyBSSUNISUVTVE8gVFJFIFBSRVNUSVRJIFBFUiBDVUkgTk9OIFBVJk9ncmF2ZTsgUklDSElFREVSTkUgQUxUUkk8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsYXZ2aXNvKTtcbiAgICB9XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJsb2FuPXN1Y2Nlc3NcIikgIT09IC0xKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgIGNvbnN0IGF2dmlzbyA9ICc8cCBjbGFzcz1cImNlbnRlclwiPklMIFBSRVNUSVRPICZFZ3JhdmU7IEFWVkVOVVRPIENPUlJFVFRBTUVOVEU8L3A+JztcbiAgICAgICAgY29uc3QgZGlhbG9nID0gbmV3IERpYWxvZyhoZWFkZXIsYXZ2aXNvKTtcbiAgICB9XG4gICAgXG4gICAgXG4gICAgXG4gICAgLy9BcGVydHVyYSBzY2hlZGEgdXRlbnRlIGUvbyBjYXRhbG9nYXppb25lIG5lbCBjYXNvIHNpYW5vIGdpw6AgcHJlc2VudGkgbmVsbCdVUkxcbiAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5kZXhPZihcInNpZ2xhX2ludlwiKSAhPT0gLTEgJiYgbG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJudW1faW52XCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGxvY2F0aW9uLnNlYXJjaC5zcGxpdChcIiZcIik7XG4gICAgICAgIGNvbnN0IHByb3ByaWV0YSA9IHF1ZXJ5WzBdLnNwbGl0KFwiPVwiKVsxXTtcbiAgICAgICAgY29uc3QgbnVtX2ludiA9IHF1ZXJ5WzFdLnNwbGl0KFwiPVwiKVsxXTtcbiAgICAgICAgY29uc3QgcmFkaW9Qcm9wcmlldGEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbbmFtZT1cInByb3ByaWV0YV9wXCJdJyk7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHJhZGlvUHJvcHJpZXRhLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgIGlmKHJhZGlvUHJvcHJpZXRhW2ldLnZhbHVlID09IHByb3ByaWV0YSkge1xuICAgICAgICAgICAgICAgIHJhZGlvUHJvcHJpZXRhW2ldLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJhZGlvUHJvcHJpZXRhW2ldLnBhcmVudEVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjOTZlOTc5XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbnVtX2ludmVudGFyaW9fcC52YWx1ZSA9IG51bV9pbnY7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJvcHJpZXTDoDpcIitwcm9wcmlldGErXCJOdW1JbnY6XCIrbnVtX2ludik7XG4gICAgICAgIGNhcmRDYXRhbG9ndWluZyhwcm9wcmlldGEsbnVtX2ludik7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibnVtX3Rlc19wXCIpLmZvY3VzKCk7XG4gICAgfVx0XG4gICAgaWYobG9jYXRpb24uc2VhcmNoLmluZGV4T2YoXCJudW1fdGVzXCIpICE9PSAtMSkge1xuICAgICAgICBjb25zdCBxdWVyeSA9IGxvY2F0aW9uLnNlYXJjaC5zcGxpdChcIiZcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHF1ZXJ5WzBdKTtcbiAgICAgICAgY29uc3QgbnVtX3RlcyA9IHF1ZXJ5WzBdLnNwbGl0KFwiPVwiKVsxXTtcbiAgICAgICAgY29uc29sZS5sb2cobnVtX3Rlcyk7XG4gICAgICAgIG51bV90ZXNfcC52YWx1ZSA9IG51bV90ZXM7XG4gICAgICAgIGNhcmRTdWJzY3JpYmVyKG51bV90ZXMpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBlcnJvcihlbGVtLGRlc2NFcnJvcikge1xuICAgICAgICBzZW5kID0gMDtcbiAgICAgICAgaWYoZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJjb250YWluZXItcmFkaW9cIikpIHtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW0uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgI0YwMFwiO1xuICAgICAgICB9XG4gICAgICAgIC8vRWxpbWlubyBsZSBwcmVjZWRlbnRpIEJveCBEaWFsb2cgICAgICAgIFxuICAgICAgICBpZihlbGVtLnBhcmVudEVsZW1lbnQubGFzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbWctZXJyb3JcIikpIHtcbiAgICAgICAgICAgIGVsZW0ucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBpbWFnZUVycm9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgaW1hZ2VFcnJvci5jbGFzc0xpc3QuYWRkKFwiaW1nLWVycm9yXCIpO1xuICAgICAgICBjb25zdCBib3hFcnJvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGJveEVycm9yLmNsYXNzTGlzdC5hZGQoXCJib3gtZXJyb3JcIik7XG4gICAgICAgIGJveEVycm9yLmlubmVySFRNTCA9IGRlc2NFcnJvcitcIjxiciAvPlwiO1xuICAgICAgICBpbWFnZUVycm9yLmFwcGVuZENoaWxkKGJveEVycm9yKTtcbiAgICAgICAgZWxlbS5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGltYWdlRXJyb3IpO1xuICAgICAgICBcbiAgICAgICAgaW1hZ2VFcnJvci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGJveEVycm9yLmNsYXNzTGlzdC5hZGQoXCJvcGVuZWRcIik7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgaW1hZ2VFcnJvci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgYm94RXJyb3IuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5lZFwiKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBcbiAgICAvL0NvbnRyb2xsbyBzZSBjaSBzb25vIGVycm9yaSBuZWwgZm9ybVxuICAgIGZvcm1BZGRMb2FuLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICBzZW5kID0gMTtcbiAgICAgICAgY29uc3QgZmllbGRzID0gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XG4gICAgICAgIGNvbnN0IGVycm9yX3QgPSBcIiZFZ3JhdmU7IG9iYmxpZ2F0b3JpbyBjb21waWxhcmUgcXVlc3RvIGNhbXBvLlwiO1xuICAgICAgICBjb25zdCBlcnJvcl9yID0gXCImRWdyYXZlOyBvYmJsaWdhdG9yaW8gc2NlZ2xpZXJlIHF1ZXN0byBjYW1wby5cIjtcblxuICAgICAgICBmaWVsZHMuZm9yRWFjaChmdW5jdGlvbih2LGksYSkge1xuICAgICAgICAgICAgIC8vIEFkIG9nbmkgY29udHJvbGxvIHJpbWV0dG8gaWwgYm9yZG8gc3RhbmRhcmQgZSB0b2xnbyBsJ2ljb25hIGRlbGwnZXJyb3JlXG4gICAgICAgICAgICBhW2ldLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkICMwMDU3OThcIjtcbiAgICAgICAgICAgIGlmKGFbaV0ucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5jb250YWlucyhcImltZy1lcnJvclwiKSkge1xuICAgICAgICAgICAgICAgIGFbaV0ucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoYVtpXS52YWx1ZSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoKGFbaV0ubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaXNibl9wXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBudW1faW52ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJudW1faW52X3BcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihudW1faW52LnZhbHVlID09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLGVycm9yX3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm51bV9pbnZfcFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNibiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXNibl9wXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXNibi52YWx1ZSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxlcnJvcl90KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJudW1fdGVzX3BcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sZXJyb3JfdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZGF0YV9wcmVzX3BcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sZXJyb3JfdCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxlcnJvcl90KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmKGFbaV0udmFsdWUgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2goYVtpXS5uYW1lKXtcbiAgICAgICAgICAgICAgICAgICAgLy9EYXRhIFByZXN0aXRvXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYXRhX3ByZXNfcFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05XXs0fS1bMC05XXsyfS1bMC05XXsyfSRcIikudGVzdChhW2ldLnZhbHVlKSA9PT0gZmFsc2Upe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKGFbaV0sXCJIYWkgaW5zZXJpdG8gdW4gdmFsb3JlIG5vbiBjb3JyZXR0by48YnIgLz5JbCB2YWxvcmUgZGEgaW5zZXJpcmUgZGV2ZSBlc3NlcmUgc2NyaXR0byBpbiBxdWVzdGEgZm9ybWEgJnF1b3Q7QW5ubyZtaW51cztNZXNlJm1pbnVzO0dpb3JubyZxdW90Oy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAvL051bWVybyB0ZXNzZXJhXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJudW1fdGVzX3BcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeWzAtOV0rJFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLiBJbCB2YWxvcmUgZGV2ZSBlc3NlcmUgdW4gbnVtZXJvLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIC8vTnVtZXJvIGludmVudGFyaW9cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm51bV9pbnZfcFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYobmV3IFJlZ0V4cChcIl5bMC05XFwoXFwpXSskXCIpLnRlc3QoYVtpXS52YWx1ZSkgPT09IGZhbHNlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcihhW2ldLFwiSGFpIGluc2VyaXRvIHVuIHZhbG9yZSBub24gY29ycmV0dG8uIElsIHZhbG9yZSBkZXZlIGVzc2VyZSB1biBudW1lcm8uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgLy9JU0JOXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpc2JuX3BcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeWzAtOV17MTAsMTN9JFwiKS50ZXN0KGFbaV0udmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpXSxcIkhhaSBpbnNlcml0byB1biB2YWxvcmUgbm9uIGNvcnJldHRvLiBJbCB2YWxvcmUgZGV2ZSBlc3NlcmUgdW4gbnVtZXJvLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGFbaV0udHlwZSA9PSBcInJhZGlvXCIpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2goYVtpXS5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwcm9wcmlldGFfcFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoYVtpXS5jaGVja2VkID09IGZhbHNlICYmIGFbaSsxXS5jaGVja2VkID09IGZhbHNlICYmIGFbaSsyXS5jaGVja2VkID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNibiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaXNibl9wXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzYm4udmFsdWUgPT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihhW2krMl0ucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImNvbnRhaW5lci1yYWRpb1wiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IoYVtpKzJdLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCxlcnJvcl9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYVtpKzJdLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50Lmxhc3RFbGVtZW50Q2hpbGQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW1nLWVycm9yXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFbaSsyXS5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5sYXN0RWxlbWVudENoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZihzZW5kID09PSAwKXtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAvLyAgRmluZXN0cmEgZGkgYXZ2aXNvXG4gICAgICAgICAgICBjb25zdCBoZWFkZXIgPSBcIkF2dmlzb1wiO1xuICAgICAgICAgICAgY29uc3QgYXZ2aXNvID0gJzxwPkNJIFNPTk8gREVHTEkgPHN0cm9uZz5FUlJPUkk8L3N0cm9uZz4sIENPUlJFR0dFUkxJIEUgUFJFTUVSRSBOVU9WQU1FTlRFIFNVTCBQVUxTQU5URSBcIklOVklBXCIsIEdSQVpJRS48L3A+JztcbiAgICAgICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGF2dmlzbyk7XG4gICAgICAgIH07XG4gICAgfSk7XG59O1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBQYWdpbmEgSXNjcml0dGkgcGVyIGNsYXNzZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIC8vXG4vL0RpY2hpYXJhemlvbmUgVmFyaWFiaWxpXG4vLyAgQ29udHJvbGxvIGVycm9yaSBGT1JNXG5jb25zdCByZWdpc3RlcmVkQnlDbGFzcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVnaXN0ZXJlZF9ieV9jbGFzc1wiKTtcblxuaWYocmVnaXN0ZXJlZEJ5Q2xhc3MgIT0gbnVsbCkge1xuICAgIFxuICAgIGNvbnN0IHByaW50QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFtcGFcIik7XG4gICAgY29uc3QgZm9ybSA9IHJlZ2lzdGVyZWRCeUNsYXNzO1xuICAgIHByaW50QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBcbiAgICBcbiAgICBcbiAgICBjb25zdCBpbnB1dFRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cInRleHRcIl0nKTtcbiAgICBcbiAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlucHV0VGV4dC5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKSB7XG4gICAgICAgICAgICBpZihhW2ldLmdldEF0dHJpYnV0ZSgnZGlzYWJsZWQnKSA9PSBcImRpc2FibGVkXCIpIHtcbiAgICAgICAgICAgICAgICBhW2ldLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgXG4gICAgaW5wdXRUZXh0WzBdLnZhbHVlID0gXCIwXCI7XG4gICAgaW5wdXRUZXh0WzBdLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XG4gICAgaW5wdXRUZXh0WzFdLmZvY3VzKCk7XG4gICAgaW5wdXRUZXh0WzFdLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZih0aGlzLnZhbHVlICE9IFwiXCIpIHtcbiAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeWzAtOV0rJFwiKS50ZXN0KHRoaXMudmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgLy8gIEZpbmVzdHJhIGRpIGF2dmlzb1xuICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgYXZ2aXNvID0gXCI8cD4mRWdyYXZlOyBwb3NzaWJpbGUgaW5zZXJpcmUgc29sbyBudW1lcmkgaW50ZXJpIHBvc2l0aXZpLjwvcD5cIjtcbiAgICAgICAgICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixhdnZpc28pO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXMoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XHRcdFxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbG9yZSA9IHBhcnNlSW50KHRoaXMudmFsdWUpKzE7XG4gICAgICAgICAgICAgICAgaW5wdXRUZXh0WzJdLnZhbHVlID0gdmFsb3JlO1xuICAgICAgICAgICAgICAgIGlucHV0VGV4dFsyXS5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgICAgIGlucHV0VGV4dFszXS5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuICAgIGlucHV0VGV4dC5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKSB7XG4gICAgICAgIGFbaSsyXS5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIixmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKGFbaSsxXS52YWx1ZSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgYVtpKzFdLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBhW2krM10uYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIixmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIGlmKHRoaXMudmFsdWUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGlmKG5ldyBSZWdFeHAoXCJeWzAtOV0rJFwiKS50ZXN0KHRoaXMudmFsdWUpID09PSBmYWxzZSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAvLyAgRmluZXN0cmEgZGkgYXZ2aXNvXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGF2dmlzbyA9IFwiPHA+JkVncmF2ZTsgcG9zc2liaWxlIGluc2VyaXJlIHNvbG8gbnVtZXJpIGludGVyaSBwb3NpdGl2aS48L3A+XCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpYWxvZyA9IG5ldyBEaWFsb2coaGVhZGVyLGF2dmlzbyk7XG4gICAgICAgICAgICAgICAgICAgIGV4aXQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYocGFyc2VJbnQodGhpcy52YWx1ZSkgPCBwYXJzZUludChhW2krMl0udmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAvLyAgRmluZXN0cmEgZGkgYXZ2aXNvXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IFwiQXZ2aXNvXCI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGF2dmlzbyA9IFwiPHA+SGFpIGluc2VyaXRvIHVuIHZhbG9yZSBpbmZlcmlvcmUgcmlzcGV0dG8gYWxsYSBjYXNlbGxhIHByZWNlZGVudGUuPC9wPlwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWFsb2cgPSBuZXcgRGlhbG9nKGhlYWRlcixhdnZpc28pO1xuICAgICAgICAgICAgICAgICAgICBleGl0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcdFx0XHRcbiAgICAgICAgICAgICAgICAgICAgaWYoKHR5cGVvZiBwYXJzZUludCh0aGlzLnZhbHVlKSA9PSBcIm51bWJlclwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsb3JlID0gcGFyc2VJbnQodGhpcy52YWx1ZSkrMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFbaSs0XS52YWx1ZSA9IHZhbG9yZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFbaSs0XS5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBhW2krNV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgPSBpICsgMjtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBQYWdpbmEgQ2F0YWxvZ2F6aW9uaSBOb3ZpdMOgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogLy9cbi8vRGljaGlhcmF6aW9uZSBWYXJpYWJpbGlcbi8vICBDb250cm9sbG8gZXJyb3JpIEZPUk1cbmNvbnN0IG5ld3NDYXRhbG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtLW5vdml0YVwiKTtcblxuaWYobmV3c0NhdGFsb2cgIT0gbnVsbCkge1xuICAgIG5ld3NDYXRhbG9nLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgIGNvbnN0IGl0ZW1zTmV3cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0eXBlPVwiY2hlY2tib3hcIl0nKTtcbiAgICAgICAgbGV0IG51bUNoZWNrZWQgPSAwO1xuICAgICAgICBpdGVtc05ld3MuZm9yRWFjaChmdW5jdGlvbih2LGksYSkge1xuICAgICAgICAgICAgaWYoYVtpXS5jaGVja2VkID09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBudW1DaGVja2VkKys7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgaWYobnVtQ2hlY2tlZCA9PSAwKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH07XG4gICAgfSk7XG59O1xuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqICBQYWdpbmEgQ2F0YWxvZ2F6aW9uaSBBbGllbmF0ZSAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIC8vXG4vL0RpY2hpYXJhemlvbmUgVmFyaWFiaWxpXG4vLyAgQ29udHJvbGxvIGVycm9yaSBGT1JNXG5jb25zdCBhbGllbkNhdGFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm0tYWxpZW5hdGVcIik7XG5cbmlmKGFsaWVuQ2F0YWxvZyAhPSBudWxsKSB7XG4gICAgYWxpZW5DYXRhbG9nLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgIGNvbnN0IGl0ZW1zQWxpZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbdHlwZT1cImNoZWNrYm94XCJdJyk7XG4gICAgICAgIGxldCBudW1DaGVja2VkID0gMDtcbiAgICAgICAgaXRlbXNBbGllbi5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKSB7XG4gICAgICAgICAgICBpZihhW2ldLmNoZWNrZWQgPT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIG51bUNoZWNrZWQrKztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICBpZihudW1DaGVja2VkID09IDApIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbn07XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiBQYWdpbmEgQWdnaXVudGEgUHJlc3RpdG8gKioqKioqKioqKioqKioqKioqKioqKiogLy9cbi8vUmVuZG8gZHJhZyBhbmQgZHJvcCBsZSBzY2hlZGUgQ2F0YWxvZ2F6aW9uZSBlIFV0ZW50ZVxuY29uc3QgY2FyZFN1YnNjcmliZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1YnNjcmliZXJcIik7XG5jb25zdCBjYXJkQ2F0YWxvZ3VpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhdGFsb2d1aW5nXCIpO1xuY29uc3QgbW92ZUNhcmRDYXRhbG9ndWluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZS1jYXRhbG9ndWluZ1wiKTtcbmNvbnN0IG1vdmVDYXJkU3Vic2NyaWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW92ZS1zdWJzY3JpYmVyXCIpO1xuaWYoY2FyZENhdGFsb2d1aW5nICE9IG51bGwgJiYgY2FyZFN1YnNjcmliZXIgIT0gbnVsbCkge1xuICAgIGNhcmRTdWJzY3JpYmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnc3RhcnRcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dFwiLCBlLnRhcmdldC5pZCk7XG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSBcIm1vdmVcIjtcbiAgICB9KTtcbiAgICBcbiAgICBjYXJkQ2F0YWxvZ3VpbmcuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0XCIsIGUudGFyZ2V0LmlkKTtcbiAgICAgICAgZS5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9IFwibW92ZVwiO1xuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFyZ2V0XCIpO1xuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIixmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbnRlclwiLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwiZHJvcFwiLGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBkYXRhID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHRcIik7XG4gICAgICAgIGlmKGRhdGEgPT0gXCJzdWJzY3JpYmVyXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUub2Zmc2V0WCtcIiBcIitlLnBhZ2VYKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUub2Zmc2V0WStcIiBcIitlLnBhZ2VZKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUucmVsYXRlZFRhcmdldCk7XG4gICAgICAgICAgICBjYXJkU3Vic2NyaWJlci5zdHlsZS5sZWZ0ID0gZS5wYWdlWCtcInB4XCI7XG4gICAgICAgICAgICBjYXJkU3Vic2NyaWJlci5zdHlsZS50b3AgPSBlLnBhZ2VZK1wicHhcIjtcbiAgICAgICAgfSBlbHNlIGlmKGRhdGEgPT0gXCJjYXRhbG9ndWluZ1wiKXtcbiAgICAgICAgICAgIGNhcmRDYXRhbG9ndWluZy5zdHlsZS5sZWZ0ID0gZS5jbGllbnRYK1wicHhcIjtcbiAgICAgICAgICAgIGNhcmRDYXRhbG9ndWluZy5zdHlsZS50b3AgPSBlLmNsaWVudFkrXCJweFwiO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZGF0YSkpO1xuICAgIH0pO1xufVxuXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogSW5zZXJpbWVudG8gbW90aXZhemlvbmUgc29zcGVuc2lvbmUgKioqKioqKioqKioqKioqKioqKioqKiogLy9cbmNvbnN0IG1vdGl2YXppb25pID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIm1vdGl2YXppb25lXCIpO1xuY29uc3QgZm9ybU1vdGl2YXppb25lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtX21vdGl2YXppb25lXCIpO1xuaWYoZm9ybU1vdGl2YXppb25lICE9PSBudWxsKSB7XG4gICAgZm9ybU1vdGl2YXppb25lLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufVxuaWYobW90aXZhemlvbmkgIT09IG51bGwgJiYgbW90aXZhemlvbmkubGVuZ3RoID4gMCkge1xuICAgIGxldCBudW1iZXJfbW90aXZhdGlvbiA9IG1vdGl2YXppb25pLmxlbmd0aDtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBtb3RpdmF6aW9uaS5sZW5ndGg7aSsrKSB7XG4gICAgICAgIG1vdGl2YXppb25pW2ldLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGZvcm1Nb3RpdmF6aW9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybV9tb3RpdmF6aW9uZVwiKTtcbiAgICAgICAgICAgIGZvcm1Nb3RpdmF6aW9uZS5wYXJlbnRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vdGl2YXppb25lXCIpLmZvY3VzKCk7XG4gICAgICAgICAgICBmb3JtTW90aXZhemlvbmUuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkX3Nvc3Blc28gPSBtb3RpdmF6aW9uaVtpXS5pZDtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpZF9zb3NwZXNvKTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb3RpdmF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb3RpdmF6aW9uZVwiKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhtb3RpdmF0aW9uKTtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBcIi4vaW5jbHVkZS1waHAvY29udGVudF9nbG9iYWwucGhwP3RpcG89bW90aXZhemlvbmUmbW90aXZhemlvbmU9XCIrZW5jb2RlVVJJQ29tcG9uZW50KG1vdGl2YXRpb24pK1wiJmlkX3Nvc3Blc289XCIraWRfc29zcGVzbztcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBmZXRjaCh1cmwpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnJvciA9IFwiRXJyb3JlIGRhbCBTZXJ2ZXJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLnRyaW0oKSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZF9pc2NyaXR0byA9IGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwiaWRfaXNjcml0dG89XCIpKzEyKSwxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBsb2NhdGlvbi5wYXRobmFtZStcIj9pZF9pc2NyaXR0bz1cIitpZF9pc2NyaXR0bytcIiZzdWNjZXNzX21vdGl2YXRpb249eWVzXCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpZF9pc2NyaXR0byA9IGxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoKGxvY2F0aW9uLnNlYXJjaC5pbmRleE9mKFwiaWRfaXNjcml0dG89XCIpKzEyKSwxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBsb2NhdGlvbi5wYXRobmFtZStcIj9pZF9pc2NyaXR0bz1cIitpZF9pc2NyaXR0bytcIiZlcnJvcl9tb3RpdmF0aW9uPXllc1wiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVycm9yID0gXCJFcnJvcmUgZGkgcmV0ZVwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn0iXSwiZmlsZSI6Imdlc3Rpb25lLmpzIn0=
