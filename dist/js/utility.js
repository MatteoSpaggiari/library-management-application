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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlsaXR5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIE1hcHBhdHVyYSBjYXJhdHRlcmkgdGFzdGllcmFcbmxldCBrZXkgPSBbXTtcbmtleVtcImJhY2tzcGFjZVwiXSA9IDg7XG5rZXlbXCJob3Jpem9udGFsIHRhYlwiXSA9IDk7XG5rZXlbXCJlbnRlclwiXSA9IDEzO1xua2V5W1wiZXNjYXBlXCJdID0gMjc7XG5rZXlbXCJkZWxldGVcIl0gPSAxMjc7XG5rZXlbXCJzcGFjZVwiXSA9IDMyO1xua2V5W1wiZXhjbGFtYXRpb24gbWFya1wiXSA9IDMzOyAvLyAhXG5rZXlbXCJxdW90YXRpb24gbWFya1wiXSA9IDM0OyAvLyBcIlxua2V5W1wibnVtYmVyIHNpZ25cIl0gPSAzNTsgLy8gI1xua2V5W1wiZG9sbGFyIHNpZ25cIl0gPSAzNjsgLy8gJFxua2V5W1wicGVyY2VudCBzaWduXCJdID0gMzc7IC8vICVcbmtleVtcImFtcGVyc2FuZFwiXSA9IDM4OyAvLyAmXG5rZXlbXCJhcG9zdHJvcGhlXCJdID0gMzk7IC8vICdcbmtleVtcInNvbGlkdXNcIl0gPSA0NzsgLy8gL1xua2V5W1wicmV2ZXJzZSBzb2xpZHVzXCJdID0gOTI7IC8vIFxcXG5rZXlbXCJsZWZ0XCJdID0gMzc7XG5rZXlbXCJ1cFwiXSA9IDM4O1xua2V5W1wicmlnaHRcIl0gPSAzOTtcbmtleVtcImRvd25cIl0gPSA0MDtcblxuY2xhc3MgRGlhbG9nIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihoZWFkZXIgPSBcIkF2dmlzb1wiLCB0ZXN0byA9IG51bGwsIGZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCwgYXV0byA9IHRydWUpIHtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvL1BhcmFtZXRyaSBjb3N0cnV0dG9yZVxuICAgICAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcbiAgICAgICAgdGhpcy50ZXN0byA9IHRlc3RvO1xuICAgICAgICB0aGlzLmZvY3VzZWRFbGVtZW50ID0gZm9jdXNlZEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuYXV0byA9IGF1dG87XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgLy9FbGltaW5vIGxlIHByZWNlZGVudGkgRGlhbG9nXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nRGlhbG9ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYmFja2dyb3VuZC1kaWFsb2dcIik7XG4gICAgICAgIGlmKGV4aXN0aW5nRGlhbG9ncy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBleGlzdGluZ0RpYWxvZ3MuZm9yRWFjaChmdW5jdGlvbih2LGksYSl7XG4gICAgICAgICAgICAgICBhW2ldLnJlbW92ZSgpOyBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLy9WYXJpYWJpbGkgaW50ZXJuZVxuICAgICAgICB0aGlzLmJhY2tncm91bmRBdnZpc28gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRBdnZpc28uY2xhc3NMaXN0LmFkZChcImJhY2tncm91bmQtZGlhbG9nXCIpO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRBdnZpc28uaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjb250YWluZXItZGlhbG9nXCI+PGRpdiBjbGFzcz1cImRpYWxvZ1wiPjxoMj4ke3RoaXMuaGVhZGVyfTwvaDI+JHt0aGlzLnRlc3RvfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBpZD1cImNsb3NlLWRpYWxvZ1wiIGNsYXNzPVwiY2xvc2UtZGlhbG9nXCIgdGFiaW5kZXg9XCIwXCI+PC9zcGFuPjwvZGl2PjwvZGl2PmA7XG4gICAgICAgIGlmKHRoaXMuYXV0byAmJiB0aGlzLnRlc3RvICE9IG51bGwpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZ3JvdW5kQXZ2aXNvKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgYnV0dG9uQ2xvc2VEaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlLWRpYWxvZ1wiKTtcbiAgICAgICAgICAgIGNvbnN0IGJhY2tncm91bmRBdnZpc28gPSB0aGlzLmJhY2tncm91bmRBdnZpc287XG4gICAgICAgICAgICBjb25zdCBmb2N1c2VkRWxlbWVudCA9IHRoaXMuZm9jdXNlZEVsZW1lbnQ7XG4gICAgICAgICAgICBidXR0b25DbG9zZURpYWxvZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQXZ2aXNvLmNsYXNzTGlzdC5hZGQoXCJjbG9zZVwiKTtcbiAgICAgICAgICAgICAgICBmb2N1c2VkRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc2V0SGVhZGVyKGhlYWRlcikge1xuICAgICAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQXZ2aXNvLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWRpYWxvZ1wiPjxkaXYgY2xhc3M9XCJkaWFsb2dcIj48aDI+JHt0aGlzLmhlYWRlcn08L2gyPiR7dGhpcy50ZXN0b30ke3RoaXMuYnV0dG9uQ2xvc2VEaWFsb2d9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwiY2xvc2UtZGlhbG9nXCIgY2xhc3M9XCJjbG9zZS1kaWFsb2dcIiB0YWJpbmRleD1cIjBcIj48L3NwYW4+PC9kaXY+PC9kaXY+YDtcbiAgICB9XG4gICAgXG4gICAgc2V0VGVzdG8odGVzdG8pIHtcbiAgICAgICAgdGhpcy50ZXN0byA9IHRlc3RvO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRBdnZpc28uaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjb250YWluZXItZGlhbG9nXCI+PGRpdiBjbGFzcz1cImRpYWxvZ1wiPjxoMj4ke3RoaXMuaGVhZGVyfTwvaDI+JHt0aGlzLnRlc3RvfSR7dGhpcy5idXR0b25DbG9zZURpYWxvZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJjbG9zZS1kaWFsb2dcIiBjbGFzcz1cImNsb3NlLWRpYWxvZ1wiIHRhYmluZGV4PVwiMFwiPjwvc3Bhbj48L2Rpdj48L2Rpdj5gO1xuICAgIH1cbiAgICBcbiAgICBzZXRBdXRvKGF1dG8pIHtcbiAgICAgICAgdGhpcy5hdXRvID0gYXV0bztcbiAgICB9XG4gICAgXG4gICAgb3BlbigpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRBdnZpc28pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYnV0dG9uQ2xvc2VEaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlLWRpYWxvZ1wiKTtcbiAgICAgICAgY29uc3QgYmFja2dyb3VuZEF2dmlzbyA9IHRoaXMuYmFja2dyb3VuZEF2dmlzbztcbiAgICAgICAgY29uc3QgZm9jdXNlZEVsZW1lbnQgPSB0aGlzLmZvY3VzZWRFbGVtZW50O1xuICAgICAgICBidXR0b25DbG9zZURpYWxvZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRBdnZpc28uY2xhc3NMaXN0LmFkZChcImNsb3NlXCIpO1xuICAgICAgICAgICAgZm9jdXNlZEVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbmNsYXNzIEF1dG9jb21wbGV0ZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCx1cmwpIHtcbiAgICAgICBcbiAgICAgICAgY29uc3QgbGlzdGFWYWxvcmkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICAgIGxpc3RhVmFsb3JpLmNsYXNzTGlzdC5hZGQoXCJsaXN0LWF1dG9jb21wbGV0ZVwiKTtcbiAgICAgICAgbGlzdGFWYWxvcmkuc3R5bGUud2lkdGggPSAoZWxlbWVudC5vZmZzZXRXaWR0aC0xNikrXCJweFwiO1xuICAgICAgICBsZXQgdXJsX2ZldGNoO1xuICAgICAgICBsZXQgbGlzdGE7XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBmZXRjaF9kYXRhKHVybF9mZXRjaCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBmZXRjaCh1cmxfZmV0Y2gpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHZhbG9yaSkge1xuICAgICAgICAgICAgICAgIGxpc3RhID0gXCJcIjtcbiAgICAgICAgICAgICAgICBpZih2YWxvcmkubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICB2YWxvcmkuZm9yRWFjaChmdW5jdGlvbih2LGksYSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RhICs9ICc8bGkgY2xhc3M9XCJhdXRvY29tcGxldGUtaXRlbVwiIHRhYmluZGV4PVwiMFwiPicrYVtpXSsnPC9saT4nO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobGlzdGEpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxpc3RhVmFsb3JpLmlubmVySFRNTCA9IGxpc3RhO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChsaXN0YVZhbG9yaSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHZhbG9yaSk7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RhVmFsb3JpLmNsYXNzTGlzdC5hZGQoXCJvcGVuZWRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmF1dG9jb21wbGV0ZS1pdGVtXCIpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgYVtpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRlc3RvID0gYVtpXS50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSB0ZXN0bztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RhVmFsb3JpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaW5wdXRcIikuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RhVmFsb3JpLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuZWRcIik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09PSBrZXlbXCJiYWNrc3BhY2VcIl0pIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdXJsX2ZldGNoID0gXCJcIjtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dElucHV0ID0gdGhpcy52YWx1ZStTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICAgICAgICAgICAgICAgIHVybF9mZXRjaCA9IHVybCt0ZXh0SW5wdXQ7XG5cbiAgICAgICAgICAgICAgICBmZXRjaF9kYXRhKHVybF9mZXRjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09PSBrZXlbXCJob3Jpem9udGFsIHRhYlwiXSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50LnBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLmNoaWxkTm9kZXNbMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICBsaXN0YVZhbG9yaS5jbGFzc0xpc3QucmVtb3ZlKFwib3BlbmVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PT0ga2V5W1widXBcIl0gfHwgZS5rZXlDb2RlID09PSBrZXlbXCJkb3duXCJdKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpc3RhKTtcbiAgICAgICAgICAgICAgICBLZXlib2FyZFRyYXAuYXV0b2NvbXBsZXRlKGVsZW1lbnQsbGlzdGEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PT0ga2V5W1wiYmFja3NwYWNlXCJdKSB7XG4gICAgICAgICAgICAgICAgdXJsX2ZldGNoID0gXCJcIjtcbiAgICAgICAgICAgICAgICBsZXQgdGV4dElucHV0ID0gZWxlbWVudC52YWx1ZS5zdWJzdHIoMCxlbGVtZW50LnZhbHVlLmxlbmd0aC0xKTtcbiAgICAgICAgICAgICAgICB1cmxfZmV0Y2ggPSB1cmwrdGV4dElucHV0O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHVybF9mZXRjaCk7XG4gICAgICAgICAgICAgICAgZmV0Y2hfZGF0YSh1cmxfZmV0Y2gpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGUua2V5Q29kZSA9PT0ga2V5W1wiZXNjYXBlXCJdKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIGxpc3RhVmFsb3JpLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH1cbn1cblxuXG5jbGFzcyBLZXlib2FyZFRyYXAge1xuICAgIFxuICAgIHN0YXRpYyBhdXRvY29tcGxldGUoZWxlbWVudCxsaXN0YSkge1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coZWxlbWVudCk7XG4gICAgICAgIC8vIFdpbGwgaG9sZCBwcmV2aW91c2x5IGZvY3VzZWQgZWxlbWVudFxuICAgICAgICBsZXQgZm9jdXNlZEVsZW1lbnQ7XG5cbiAgICAgICAgLy8gU2F2ZSBjdXJyZW50IGZvY3VzXG4gICAgICAgIGZvY3VzZWRFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgXG4gICAgICAgIC8vIExpc3RlbiBmb3IgYW5kIHRyYXAgdGhlIGtleWJvYXJkXG4gICAgICAgIGxldCBjb250YWluZXJMaXN0YTtcbiAgICAgICAgaWYoZm9jdXNlZEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5jb250YWlucyhcImltZy1lcnJvclwiKSkge1xuICAgICAgICAgICAgY29udGFpbmVyTGlzdGEgPSBmb2N1c2VkRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyTGlzdGEgPSBmb2N1c2VkRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7ICAgICBcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gRmluZCBhbGwgZm9jdXNhYmxlIGNoaWxkcmVuXG4gICAgICAgIGxldCBmb2N1c2FibGVFbGVtZW50c1N0cmluZyA9ICdhW2hyZWZdLCBhcmVhW2hyZWZdLCBpbnB1dDpub3QoW2Rpc2FibGVkXSksIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSwgYnV0dG9uOm5vdChbZGlzYWJsZWRdKSwgaWZyYW1lLCBvYmplY3QsIGVtYmVkLCBbdGFiaW5kZXg9XCIwXCJdLCBbY29udGVudGVkaXRhYmxlXSc7XG4gICAgICAgIGxldCBmb2N1c2FibGVFbGVtZW50cyA9IGNvbnRhaW5lckxpc3RhLnF1ZXJ5U2VsZWN0b3JBbGwoZm9jdXNhYmxlRWxlbWVudHNTdHJpbmcpO1xuICAgICAgICAvLyBDb252ZXJ0IE5vZGVMaXN0IHRvIEFycmF5XG4gICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZm9jdXNhYmxlRWxlbWVudHMpO1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoKTtcbiAgICAgICAgXG4gICAgICAgIGxldCBmaXJzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1swXTtcbiAgICAgICAgbGV0IGxhc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIFxuICAgICAgICBjb250YWluZXJMaXN0YS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdHJhcFRhYktleSk7XG4gICAgICAgIFxuICAgICAgICAvLyBGb2N1cyBmaXJzdCBjaGlsZFxuICAgICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcblxuICAgICAgICBmdW5jdGlvbiB0cmFwVGFiS2V5KGUpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbnRhaW5lckxpc3RhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGxpc3RhKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZpcnN0VGFiU3RvcCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsYXN0VGFiU3RvcCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBUQUIga2V5IHByZXNzXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBrZXlbXCJob3Jpem9udGFsIHRhYlwiXSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAvLyBTSElGVCArIFRBQlxuICAgICAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBmaXJzdFRhYlN0b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IChmb2N1c2FibGVFbGVtZW50cy5sZW5ndGgtMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tpbmRleC0xXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gVEFCXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGxhc3RUYWJTdG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2luZGV4KzFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBFU0NBUEVcbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PT0ga2V5W1wiZXNjYXBlXCJdKSB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZXhpdFRyYXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQVJST1cgRE9XTlxuICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXlDb2RlID09PSBrZXlbXCJkb3duXCJdKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBsYXN0VGFiU3RvcCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2luZGV4KzFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBBUlJPVyBVUFxuICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXlDb2RlID09PSBrZXlbXCJ1cFwiXSkge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZmlyc3RUYWJTdG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gKGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aC0xKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tpbmRleC0xXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRU5URVJcbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PT0ga2V5W1wiZW50ZXJcIl0pIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50LnRleHRDb250ZW50KTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnZhbHVlID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgICBleGl0VHJhcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBleGl0VHJhcCgpIHtcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSGlkZSB0aGUgQ29udGFpbmVyIExpc3RcbiAgICAgICAgICAgIGNvbnRhaW5lckxpc3RhLmNsYXNzTGlzdC5yZW1vdmUoXCJvcGVuZWRcIik7XG4gICAgICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgVGFicyB7XG4gICAgXG4gICAgY29uc3RydWN0b3IodGFic0NvbnRhaW5lciwgdGFiT3BlbmVkID0gbnVsbCkge1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgc29ucyA9IHRhYnNDb250YWluZXIuY2hpbGRyZW47XG4gICAgICAgIGNvbnN0IGxpbmtzID0gc29uc1swXS5xdWVyeVNlbGVjdG9yQWxsKFwiYVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coc29ucyk7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHNvbnMubGVuZ3RoO2krKykge1xuICAgICAgICAgICAgaWYodGFiT3BlbmVkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZihpICE9IDAgJiYgaSAhPSB0YWJPcGVuZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc29uc1tpXS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgIGxpbmtzW2ktMV0uc3R5bGUuYm9yZGVyQm90dG9tID0gXCIxcHggc29saWQgIzk5OVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihpID09IHRhYk9wZW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBsaW5rc1tpLTFdLnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiMXB4IHNvbGlkICNmY2ZjZmNcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYoaSAhPSAwICYmIGkgIT0gMSkge1xuICAgICAgICAgICAgICAgIHNvbnNbaV0uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZihpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGlua3NbMF0uc3R5bGUuYm9yZGVyQm90dG9tID0gXCIxcHggc29saWQgI2ZjZmNmY1wiO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBcblxuICAgICAgICBjb25zb2xlLmxvZyhsaW5rcyk7XG4gICAgICAgIGxpbmtzLmZvckVhY2goZnVuY3Rpb24odixpLGEpe1xuICAgICAgICAgICAgYVtpXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvcyA9IHRoaXMuaHJlZi5sYXN0SW5kZXhPZihcIiNcIik7XG4gICAgICAgICAgICAgICAgbGlua3MuZm9yRWFjaChmdW5jdGlvbih2LGksYSl7XG4gICAgICAgICAgICAgICAgICAgIGFbaV0uc3R5bGUuYm9yZGVyQm90dG9tID0gXCIxcHggc29saWQgIzk5OVwiO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhW2ldKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiMXB4IHNvbGlkICNmY2ZjZmNcIjtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBzb25zLmxlbmd0aDtpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihzb25zW2ldLmlkID09IHRoaXMuaHJlZi5zdWJzdHIocG9zKzEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb25zW2ldLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb25zW2ldLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgIH07XG59O1xuXG4vKlxuLy8gV2lsbCBob2xkIHByZXZpb3VzbHkgZm9jdXNlZCBlbGVtZW50XG4gICAgICAgIGxldCBmb2N1c2VkRWxlbWVudEJlZm9yZU1vZGFsO1xuXG4gICAgICAgIC8vIEZpbmQgdGhlIG1vZGFsIGFuZCBpdHMgb3ZlcmxheVxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xuICAgICAgICBjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtb3ZlcmxheScpO1xuXG4gICAgICAgIGNvbnN0IG1vZGFsVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXRvZ2dsZScpO1xuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk1vZGFsKTtcblxuICAgICAgICBmdW5jdGlvbiBvcGVuTW9kYWwoKSB7XG4gICAgICAgICAgICAvLyBTYXZlIGN1cnJlbnQgZm9jdXNcbiAgICAgICAgICAgIGZvY3VzZWRFbGVtZW50QmVmb3JlTW9kYWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgICAgICAgICAvLyBMaXN0ZW4gZm9yIGFuZCB0cmFwIHRoZSBrZXlib2FyZFxuICAgICAgICAgICAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRyYXBUYWJLZXkpO1xuXG4gICAgICAgICAgICAvLyBMaXN0ZW4gZm9yIGluZGljYXRvcnMgdG8gY2xvc2UgdGhlIG1vZGFsXG4gICAgICAgICAgICBtb2RhbE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU1vZGFsKTtcblxuICAgICAgICAgICAgLy9DbG9zZSBtb2RhbFxuICAgICAgICAgICAgY29uc3QgY2xvc2VNb2RhbEJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZS1tb2RhbCcpO1xuICAgICAgICAgICAgY2xvc2VNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixjbG9zZU1vZGFsKTtcblxuICAgICAgICAgICAgLy8gRmluZCBhbGwgZm9jdXNhYmxlIGNoaWxkcmVuXG4gICAgICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudHNTdHJpbmcgPSAnYVtocmVmXSwgYXJlYVtocmVmXSwgaW5wdXQ6bm90KFtkaXNhYmxlZF0pLCBzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLCB0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSksIGJ1dHRvbjpub3QoW2Rpc2FibGVkXSksIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgW3RhYmluZGV4PVwiMFwiXSwgW2NvbnRlbnRlZGl0YWJsZV0nO1xuICAgICAgICAgICAgbGV0IGZvY3VzYWJsZUVsZW1lbnRzID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbChmb2N1c2FibGVFbGVtZW50c1N0cmluZyk7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IE5vZGVMaXN0IHRvIEFycmF5XG4gICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZvY3VzYWJsZUVsZW1lbnRzKTtcblxuICAgICAgICAgICAgbGV0IGZpcnN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzWzBdO1xuICAgICAgICAgICAgbGV0IGxhc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgICAgIC8vIFNob3cgdGhlIG1vZGFsIGFuZCBvdmVybGF5XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIG1vZGFsT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICAgICAgLy8gRm9jdXMgZmlyc3QgY2hpbGRcbiAgICAgICAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiB0cmFwVGFiS2V5KGUpIHtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgVEFCIGtleSBwcmVzc1xuICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDkpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBTSElGVCArIFRBQlxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGZpcnN0VGFiU3RvcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRBQlxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGxhc3RUYWJTdG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gRVNDQVBFXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xuICAgICAgICAgICAgLy8gSGlkZSB0aGUgbW9kYWwgYW5kIG92ZXJsYXlcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBtb2RhbE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICAgICAgLy8gU2V0IGZvY3VzIGJhY2sgdG8gZWxlbWVudCB0aGF0IGhhZCBpdCBiZWZvcmUgdGhlIG1vZGFsIHdhcyBvcGVuZWRcbiAgICAgICAgICAgIGZvY3VzZWRFbGVtZW50QmVmb3JlTW9kYWwuZm9jdXMoKTtcbiAgICAgICAgfVxuKi8iXSwiZmlsZSI6InV0aWxpdHkuanMifQ==
