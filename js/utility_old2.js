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
    
    constructor(header = "Avviso", testo = null, auto = true) {
        
        //Parametri costruttore
        this.header = header;
        this.testo = testo;
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
            buttonCloseDialog.addEventListener("click", function(event) {
                backgroundAvviso.classList.add("close");
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
        buttonCloseDialog.addEventListener("click", function(event) {
            backgroundAvviso.classList.add("close");
        });
    }
}


class Autocomplete {
    
    constructor(element,url,event) {
    
        const listaAutorePrecedenti = document.querySelectorAll(".list-autocomplete");
        listaAutorePrecedenti.forEach(function(v,i,a){
            a[i].remove();
        });
        fetch(url).then(function(response){
            return response.json();
        }).then(function(autori) {
            let lista = "";
            autori.forEach(function(v,i,a){
                console.log(a[i]);
                lista += '<li class="autocomplete-item" tabindex="0">'+a[i]+'</li>';
            });
            console.log(lista);
            const listaAutori = document.createElement("ul");
            listaAutori.classList.add("list-autocomplete");
            listaAutori.style.width = (element.offsetWidth-16)+"px";
            listaAutori.innerHTML = lista;
            element.parentElement.style.position = "relative";
            element.parentElement.appendChild(listaAutori);
            console.log(autori);
            
            const itemList = document.querySelectorAll(".autocomplete-item");
            itemList.forEach(function(v,i,a){
               a[i].addEventListener("click", function(event){
                   let testo = a[i].textContent;
                   element.value = testo;
                   listaAutori.style.display = "none";
                   element.focus();
               });
            });
            KeyboardTrap.autocomplete(element,listaAutori);
            
            
        }).catch(function(error){
            console.log(error);
        });
    }
}


class KeyboardTrap {
    
    static autocomplete(elem,lista) {
        console.log(document.activeElement.classList);
        console.log(document.activeElement.classList.contains("focus"));

        // Will hold previously focused element
        let focusedElement;

        // Save current focus
        focusedElement = document.activeElement;

        // Listen for and trap the keyboard
        document.addEventListener('keydown', trapTabKey);

        // Find all focusable children
        let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
        let focusableElements = lista.querySelectorAll(focusableElementsString);
        // Convert NodeList to Array
        focusableElements = Array.prototype.slice.call(focusableElements);

        let firstTabStop = focusableElements[0];
        let lastTabStop = focusableElements[focusableElements.length - 1];
        let index = 0;
        
        // Focus first child
      //  firstTabStop.focus();

        function trapTabKey(e) {
            
            // Check for TAB key press
            if (e.keyCode === key["horizontal tab"]) {
                
                // SHIFT + TAB
                if (e.shiftKey) {
                    if (document.activeElement === firstTabStop) {
                        e.preventDefault();
                        lastTabStop.focus();
                    }
                    index--;

                // TAB
                } else {
                    if (document.activeElement === lastTabStop) {
                        e.preventDefault();
                        firstTabStop.focus();
                    }
                    index++;
                }
            }

            // ESCAPE
            else if (e.keyCode === key["escape"]) {
              exitTrap();
            }
            
            // ARROW DOWN
            else if (e.keyCode === key["down"]) {
                if(document.activeElement.classList.contains("focus")) {
                    firstTabStop.focus();
                }
                if (document.activeElement === lastTabStop) {
                    e.preventDefault();
                    firstTabStop.focus();
                    index = 0;
                } else {
                    e.preventDefault();
                    focusableElements[index+1].focus();
                    index++;
                }
            }
            
            // ARROW UP
            else if (e.keyCode === key["up"]) {
                console.log(document.activeElement.value);
                if(document.activeElement.classList.contains("focus")) {
                    firstTabStop.focus();
                }
                if (document.activeElement === firstTabStop) {
                    e.preventDefault();
                    lastTabStop.focus();
                    index = (focusableElements.length-1);
                } else {
                    e.preventDefault();
                    focusableElements[index-1].focus();
                    index--;
                }
            }
            
            // ENTER
            else if (e.keyCode === key["enter"]) {
                e.preventDefault();
                lista.previousSibling.value = document.activeElement.textContent;
              //  elem.removeEventListener("keyup", this);
                exitTrap();
            }
        }
        
        function exitTrap() {
            
            index = 0;
            
            lista.previousSibling.focus();
            
      /*      const listAutocomplete = document.querySelectorAll(".list-autocomplete");
            listAutocomplete.forEach(function(v,i,a){
                a[i].remove();
            }); */
            
            // Hide the modal and overlay
            lista.style.display = "none";
            
        }
    }
}

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