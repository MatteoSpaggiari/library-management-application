// Mappatura caratteri tastiera
let key = [];
key["backspace"] = 8;
key["horizontal tab"] = 9;
key["enter"] = 13;
key["escape"] = 27;
key["delete"] = 127;
key["space"] = 32;
key["exclamation mark"] = 33; // !
key["quotation mark"] = 34; // "
key["number sign"] = 35; // #
key["dollar sign"] = 36; // $
key["percent sign"] = 37; // %
key["ampersand"] = 38; // &
key["apostrophe"] = 39; // '
key["solidus"] = 47; // /
key["reverse solidus"] = 92; // \
key["left"] = 37;
key["up"] = 38;
key["right"] = 39;
key["down"] = 40;

class Dialog {
    
    constructor(header = "Avviso", testo = null, focusedElement = document.activeElement, auto = true) {
        
        
        //Parametri costruttore
        this.header = header;
        this.testo = testo;
        this.focusedElement = focusedElement;
        this.auto = auto;
        
        
        //Elimino le precedenti Dialog
        const existingDialogs = document.querySelectorAll(".background-dialog");
        if(existingDialogs.length > 0) {
            existingDialogs.forEach(function(v,i,a){
               a[i].remove(); 
            });
        };
        
        //Variabili interne
        this.backgroundAvviso = document.createElement("div");
        this.backgroundAvviso.classList.add("background-dialog");
        this.backgroundAvviso.innerHTML = `<div class="container-dialog"><div class="dialog"><h2>${this.header}</h2>${this.testo}
                                            <span id="close-dialog" class="close-dialog" tabindex="0"></span></div></div>`;
        if(this.auto && this.testo != null) {
            document.body.appendChild(this.backgroundAvviso);
            
            const buttonCloseDialog = document.getElementById("close-dialog");
            const backgroundAvviso = this.backgroundAvviso;
            const focusedElement = this.focusedElement;
            buttonCloseDialog.addEventListener("click", function(event) {
                backgroundAvviso.classList.add("close");
                focusedElement.focus();
            });
        }
    }
    
    setHeader(header) {
        this.header = header;
        this.backgroundAvviso.innerHTML = `<div class="container-dialog"><div class="dialog"><h2>${this.header}</h2>${this.testo}${this.buttonCloseDialog}
                                            <span id="close-dialog" class="close-dialog" tabindex="0"></span></div></div>`;
    }
    
    setTesto(testo) {
        this.testo = testo;
        this.backgroundAvviso.innerHTML = `<div class="container-dialog"><div class="dialog"><h2>${this.header}</h2>${this.testo}${this.buttonCloseDialog}
                                            <span id="close-dialog" class="close-dialog" tabindex="0"></span></div></div>`;
    }
    
    setAuto(auto) {
        this.auto = auto;
    }
    
    open() {
        document.body.appendChild(this.backgroundAvviso);
        
        const buttonCloseDialog = document.getElementById("close-dialog");
        const backgroundAvviso = this.backgroundAvviso;
        const focusedElement = this.focusedElement;
        buttonCloseDialog.addEventListener("click", function(event) {
            backgroundAvviso.classList.add("close");
            focusedElement.focus();
        });
    }
}


class Autocomplete {
    
    constructor(element,url) {
       
        const listaValori = document.createElement("ul");
        listaValori.classList.add("list-autocomplete");
        listaValori.style.width = (element.offsetWidth-16)+"px";
        let url_fetch;
        let lista;
        
        function fetch_data(url_fetch) {
            
            fetch(url_fetch).then(function(response){
                return response.json();
            }).then(function(valori) {
                lista = "";
                if(valori.length > 1) {
                    valori.forEach(function(v,i,a){
                        console.log(a[i]);
                        lista += '<li class="autocomplete-item" tabindex="0">'+a[i]+'</li>';
                    });
                    console.log(lista);

                    listaValori.innerHTML = lista;
                    element.parentElement.style.position = "relative";
                    element.parentElement.appendChild(listaValori);
                    console.log(valori);
                    listaValori.classList.add("opened");

                    const itemList = document.querySelectorAll(".autocomplete-item");
                    itemList.forEach(function(v,i,a){
                       a[i].addEventListener("click", function(event){
                           let testo = a[i].textContent;
                           element.value = testo;
                           listaValori.style.display = "none";
                           element.parentElement.querySelector("input").focus();
                       });
                    });
                } else {
                    listaValori.classList.remove("opened");
                }

            }).catch(function(error){
                console.log(error);
            });
        }
        
        element.addEventListener("keypress", function(e){
            if(e.keyCode === key["backspace"]) {
                
            } else {
                url_fetch = "";
                let textInput = this.value+String.fromCharCode(e.which);
                url_fetch = url+textInput;

                fetch_data(url_fetch);
            }
        });
        
        element.addEventListener("keydown", function(e){
            
            if(e.keyCode === key["horizontal tab"]) {
                e.preventDefault();
                console.log(element.parentElement.nextElementSibling);
                element.parentElement.nextElementSibling.childNodes[1].focus();
                listaValori.classList.remove("opened");
            } else if(e.keyCode === key["up"] || e.keyCode === key["down"]) {
                e.preventDefault();
                console.log(lista);
                KeyboardTrap.autocomplete(element,lista);
            } else if(e.keyCode === key["backspace"]) {
                url_fetch = "";
                let textInput = element.value.substr(0,element.value.length-1);
                url_fetch = url+textInput;
                console.log(url_fetch);
                fetch_data(url_fetch);
            } else if(e.keyCode === key["escape"]) {
                e.preventDefault();
                element.parentElement.focus();
                listaValori.classList.remove("opened");
            }
            
        });
        
    }
}


class KeyboardTrap {
    
    static autocomplete(element,lista) {
        
        console.log(element);
        // Will hold previously focused element
        let focusedElement;

        // Save current focus
        focusedElement = element;
        
        // Listen for and trap the keyboard
        let containerLista;
        if(focusedElement.nextElementSibling.classList.contains("img-error")) {
            containerLista = focusedElement.nextElementSibling.nextElementSibling;
        } else {
            containerLista = focusedElement.nextElementSibling;     
        }
        
        // Find all focusable children
        let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
        let focusableElements = containerLista.querySelectorAll(focusableElementsString);
        // Convert NodeList to Array
        focusableElements = Array.prototype.slice.call(focusableElements);
        
        console.log(focusableElements.length);
        
        let firstTabStop = focusableElements[0];
        let lastTabStop = focusableElements[focusableElements.length - 1];
        let index = 0;
        
        containerLista.addEventListener('keydown', trapTabKey);
        
        // Focus first child
        firstTabStop.focus();

        function trapTabKey(e) {
            
            e.stopPropagation();
            console.log(containerLista);
            console.log(lista);
            console.log(firstTabStop);
            console.log(lastTabStop);
            
            // Check for TAB key press
            if (e.keyCode === key["horizontal tab"]) {
                e.preventDefault();
                // SHIFT + TAB
                if (e.shiftKey) {
                    if (document.activeElement === firstTabStop) {
                        lastTabStop.focus();
                        index = (focusableElements.length-1);
                    } else {
                        focusableElements[index-1].focus();
                        index--;
                    }

                // TAB
                } else {
                    if (document.activeElement === lastTabStop) {
                        firstTabStop.focus();
                        index = 0;
                    } else {
                        focusableElements[index+1].focus();
                        index++;
                    }
                }
            }

            // ESCAPE
            else if (e.keyCode === key["escape"]) {
                e.stopPropagation();
                e.preventDefault();
                exitTrap();
            }
            
            // ARROW DOWN
            else if (e.keyCode === key["down"]) {
                e.preventDefault();
                if (document.activeElement === lastTabStop) {
                    firstTabStop.focus();
                    index = 0;
                } else {
                    focusableElements[index+1].focus();
                    index++;
                }
            }
            
            // ARROW UP
            else if (e.keyCode === key["up"]) {
                e.preventDefault();
                if (document.activeElement === firstTabStop) {
                    lastTabStop.focus();
                    index = (focusableElements.length-1);
                } else {
                    focusableElements[index-1].focus();
                    index--;
                }
            }
            
            // ENTER
            else if (e.keyCode === key["enter"]) {
                e.stopPropagation();
                e.preventDefault();
                
                console.log(document.activeElement.textContent);
                element.value = document.activeElement.textContent;
                exitTrap();
            }
        }
        
        function exitTrap() {
            index = 0;
            
            // Hide the Container List
            containerLista.classList.remove("opened");
            element.focus();

        }
    }
}

class Tabs {
    
    constructor(tabsContainer, tabOpened = null) {
        
        const sons = tabsContainer.children;
        const links = sons[0].querySelectorAll("a");
        console.log(sons);
        for(let i = 0;i < sons.length;i++) {
            if(tabOpened != null) {
                if(i != 0 && i != tabOpened) {
                    sons[i].style.display = "none";
                    links[i-1].style.borderBottom = "1px solid #999";
                }
                if(i == tabOpened) {
                    links[i-1].style.borderBottom = "1px solid #fcfcfc";
                }
            } else if(i != 0 && i != 1) {
                sons[i].style.display = "none";
            } else {
                if(i == 0) {
                    links[0].style.borderBottom = "1px solid #fcfcfc";
                };
            }
        };
        
        

        console.log(links);
        links.forEach(function(v,i,a){
            a[i].addEventListener("click", function(e){
                e.preventDefault();
                const pos = this.href.lastIndexOf("#");
                links.forEach(function(v,i,a){
                    a[i].style.borderBottom = "1px solid #999";
                    console.log(a[i]);
                });
                this.style.borderBottom = "1px solid #fcfcfc";
                for(let i = 0;i < sons.length;i++) {
                    if(i == 0) {
                    } else if(sons[i].id == this.href.substr(pos+1)) {
                        sons[i].style.display = "block";
                    } else {
                        sons[i].style.display = "none";
                    }
                };
            });
        });
        
    };
};

/*
// Will hold previously focused element
        let focusedElementBeforeModal;

        // Find the modal and its overlay
        const modal = document.querySelector('.modal');
        const modalOverlay = document.querySelector('.modal-overlay');

        const modalToggle = document.querySelector('.modal-toggle');
        elem.addEventListener('click', openModal);

        function openModal() {
            // Save current focus
            focusedElementBeforeModal = document.activeElement;

            // Listen for and trap the keyboard
            modal.addEventListener('keydown', trapTabKey);

            // Listen for indicators to close the modal
            modalOverlay.addEventListener('click', closeModal);

            //Close modal
            const closeModalButton = modal.querySelector('#close-modal');
            closeModalButton.addEventListener("click",closeModal);

            // Find all focusable children
            let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
            let focusableElements = modal.querySelectorAll(focusableElementsString);
            // Convert NodeList to Array
            focusableElements = Array.prototype.slice.call(focusableElements);

            let firstTabStop = focusableElements[0];
            let lastTabStop = focusableElements[focusableElements.length - 1];

            // Show the modal and overlay
            modal.style.display = 'block';
            modalOverlay.style.display = 'block';

            // Focus first child
            firstTabStop.focus();

            function trapTabKey(e) {
                // Check for TAB key press
                if (e.keyCode === 9) {

                    // SHIFT + TAB
                    if (e.shiftKey) {
                        if (document.activeElement === firstTabStop) {
                            e.preventDefault();
                            lastTabStop.focus();
                        }

                    // TAB
                    } else {
                        if (document.activeElement === lastTabStop) {
                            e.preventDefault();
                            firstTabStop.focus();
                        }
                    }
                }

                // ESCAPE
                if (e.keyCode === 27) {
                  closeModal();
                }
            }
        }

        function closeModal() {
            // Hide the modal and overlay
            modal.style.display = 'none';
            modalOverlay.style.display = 'none';

            // Set focus back to element that had it before the modal was opened
            focusedElementBeforeModal.focus();
        }
*/