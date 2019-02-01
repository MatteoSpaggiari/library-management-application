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
        document.getElementById("num_tes_p").focus();
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