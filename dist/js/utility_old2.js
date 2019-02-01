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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlsaXR5X29sZDIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gTWFwcGF0dXJhIGNhcmF0dGVyaSB0YXN0aWVyYVxubGV0IGtleSA9IFtdO1xua2V5W1wiYmFja3NwYWNlXCJdID0gODtcbmtleVtcImhvcml6b250YWwgdGFiXCJdID0gOTtcbmtleVtcImVudGVyXCJdID0gMTM7XG5rZXlbXCJlc2NhcGVcIl0gPSAyNztcbmtleVtcImRlbGV0ZVwiXSA9IDEyNztcbmtleVtcInNwYWNlXCJdID0gMzI7XG5rZXlbXCJleGNsYW1hdGlvbiBtYXJrXCJdID0gMzM7IC8vICFcbmtleVtcInF1b3RhdGlvbiBtYXJrXCJdID0gMzQ7IC8vIFwiXG5rZXlbXCJudW1iZXIgc2lnblwiXSA9IDM1OyAvLyAjXG5rZXlbXCJkb2xsYXIgc2lnblwiXSA9IDM2OyAvLyAkXG5rZXlbXCJwZXJjZW50IHNpZ25cIl0gPSAzNzsgLy8gJVxua2V5W1wiYW1wZXJzYW5kXCJdID0gMzg7IC8vICZcbmtleVtcImFwb3N0cm9waGVcIl0gPSAzOTsgLy8gJ1xua2V5W1wic29saWR1c1wiXSA9IDQ3OyAvLyAvXG5rZXlbXCJyZXZlcnNlIHNvbGlkdXNcIl0gPSA5MjsgLy8gXFxcbmtleVtcImxlZnRcIl0gPSAzNztcbmtleVtcInVwXCJdID0gMzg7XG5rZXlbXCJyaWdodFwiXSA9IDM5O1xua2V5W1wiZG93blwiXSA9IDQwO1xuXG5jbGFzcyBEaWFsb2cge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGhlYWRlciA9IFwiQXZ2aXNvXCIsIHRlc3RvID0gbnVsbCwgYXV0byA9IHRydWUpIHtcbiAgICAgICAgXG4gICAgICAgIC8vUGFyYW1ldHJpIGNvc3RydXR0b3JlXG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICB0aGlzLnRlc3RvID0gdGVzdG87XG4gICAgICAgIHRoaXMuYXV0byA9IGF1dG87XG4gICAgICAgIFxuICAgICAgICAvL0VsaW1pbm8gbGUgcHJlY2VkZW50aSBEaWFsb2dcbiAgICAgICAgY29uc3QgZXhpc3RpbmdEaWFsb2dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5iYWNrZ3JvdW5kLWRpYWxvZ1wiKTtcbiAgICAgICAgaWYoZXhpc3RpbmdEaWFsb2dzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGV4aXN0aW5nRGlhbG9ncy5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKXtcbiAgICAgICAgICAgICAgIGFbaV0ucmVtb3ZlKCk7IFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvL1ZhcmlhYmlsaSBpbnRlcm5lXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZEF2dmlzbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZEF2dmlzby5jbGFzc0xpc3QuYWRkKFwiYmFja2dyb3VuZC1kaWFsb2dcIik7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZEF2dmlzby5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1kaWFsb2dcIj48ZGl2IGNsYXNzPVwiZGlhbG9nXCI+PGgyPiR7dGhpcy5oZWFkZXJ9PC9oMj4ke3RoaXMudGVzdG99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwiY2xvc2UtZGlhbG9nXCIgY2xhc3M9XCJjbG9zZS1kaWFsb2dcIiB0YWJpbmRleD1cIjBcIj48L3NwYW4+PC9kaXY+PC9kaXY+YDtcbiAgICAgICAgaWYodGhpcy5hdXRvICYmIHRoaXMudGVzdG8gIT0gbnVsbCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRBdnZpc28pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBidXR0b25DbG9zZURpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2UtZGlhbG9nXCIpO1xuICAgICAgICAgICAgY29uc3QgYmFja2dyb3VuZEF2dmlzbyA9IHRoaXMuYmFja2dyb3VuZEF2dmlzbztcbiAgICAgICAgICAgIGJ1dHRvbkNsb3NlRGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdnZpc28uY2xhc3NMaXN0LmFkZChcImNsb3NlXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc2V0SGVhZGVyKGhlYWRlcikge1xuICAgICAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQXZ2aXNvLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWRpYWxvZ1wiPjxkaXYgY2xhc3M9XCJkaWFsb2dcIj48aDI+JHt0aGlzLmhlYWRlcn08L2gyPiR7dGhpcy50ZXN0b30ke3RoaXMuYnV0dG9uQ2xvc2VEaWFsb2d9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwiY2xvc2UtZGlhbG9nXCIgY2xhc3M9XCJjbG9zZS1kaWFsb2dcIiB0YWJpbmRleD1cIjBcIj48L3NwYW4+PC9kaXY+PC9kaXY+YDtcbiAgICB9XG4gICAgXG4gICAgc2V0VGVzdG8odGVzdG8pIHtcbiAgICAgICAgdGhpcy50ZXN0byA9IHRlc3RvO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRBdnZpc28uaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjb250YWluZXItZGlhbG9nXCI+PGRpdiBjbGFzcz1cImRpYWxvZ1wiPjxoMj4ke3RoaXMuaGVhZGVyfTwvaDI+JHt0aGlzLnRlc3RvfSR7dGhpcy5idXR0b25DbG9zZURpYWxvZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJjbG9zZS1kaWFsb2dcIiBjbGFzcz1cImNsb3NlLWRpYWxvZ1wiIHRhYmluZGV4PVwiMFwiPjwvc3Bhbj48L2Rpdj48L2Rpdj5gO1xuICAgIH1cbiAgICBcbiAgICBzZXRBdXRvKGF1dG8pIHtcbiAgICAgICAgdGhpcy5hdXRvID0gYXV0bztcbiAgICB9XG4gICAgXG4gICAgb3BlbigpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRBdnZpc28pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYnV0dG9uQ2xvc2VEaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlLWRpYWxvZ1wiKTtcbiAgICAgICAgY29uc3QgYmFja2dyb3VuZEF2dmlzbyA9IHRoaXMuYmFja2dyb3VuZEF2dmlzbztcbiAgICAgICAgYnV0dG9uQ2xvc2VEaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQXZ2aXNvLmNsYXNzTGlzdC5hZGQoXCJjbG9zZVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbmNsYXNzIEF1dG9jb21wbGV0ZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCx1cmwsZXZlbnQpIHtcbiAgICBcbiAgICAgICAgY29uc3QgbGlzdGFBdXRvcmVQcmVjZWRlbnRpID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5saXN0LWF1dG9jb21wbGV0ZVwiKTtcbiAgICAgICAgbGlzdGFBdXRvcmVQcmVjZWRlbnRpLmZvckVhY2goZnVuY3Rpb24odixpLGEpe1xuICAgICAgICAgICAgYVtpXS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZldGNoKHVybCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGF1dG9yaSkge1xuICAgICAgICAgICAgbGV0IGxpc3RhID0gXCJcIjtcbiAgICAgICAgICAgIGF1dG9yaS5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhW2ldKTtcbiAgICAgICAgICAgICAgICBsaXN0YSArPSAnPGxpIGNsYXNzPVwiYXV0b2NvbXBsZXRlLWl0ZW1cIiB0YWJpbmRleD1cIjBcIj4nK2FbaV0rJzwvbGk+JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobGlzdGEpO1xuICAgICAgICAgICAgY29uc3QgbGlzdGFBdXRvcmkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICAgICAgICBsaXN0YUF1dG9yaS5jbGFzc0xpc3QuYWRkKFwibGlzdC1hdXRvY29tcGxldGVcIik7XG4gICAgICAgICAgICBsaXN0YUF1dG9yaS5zdHlsZS53aWR0aCA9IChlbGVtZW50Lm9mZnNldFdpZHRoLTE2KStcInB4XCI7XG4gICAgICAgICAgICBsaXN0YUF1dG9yaS5pbm5lckhUTUwgPSBsaXN0YTtcbiAgICAgICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChsaXN0YUF1dG9yaSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhdXRvcmkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBpdGVtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXV0b2NvbXBsZXRlLWl0ZW1cIik7XG4gICAgICAgICAgICBpdGVtTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKXtcbiAgICAgICAgICAgICAgIGFbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICAgICBsZXQgdGVzdG8gPSBhW2ldLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSB0ZXN0bztcbiAgICAgICAgICAgICAgICAgICBsaXN0YUF1dG9yaS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgZWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIEtleWJvYXJkVHJhcC5hdXRvY29tcGxldGUoZWxlbWVudCxsaXN0YUF1dG9yaSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcil7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5jbGFzcyBLZXlib2FyZFRyYXAge1xuICAgIFxuICAgIHN0YXRpYyBhdXRvY29tcGxldGUoZWxlbSxsaXN0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkb2N1bWVudC5hY3RpdmVFbGVtZW50LmNsYXNzTGlzdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZm9jdXNcIikpO1xuXG4gICAgICAgIC8vIFdpbGwgaG9sZCBwcmV2aW91c2x5IGZvY3VzZWQgZWxlbWVudFxuICAgICAgICBsZXQgZm9jdXNlZEVsZW1lbnQ7XG5cbiAgICAgICAgLy8gU2F2ZSBjdXJyZW50IGZvY3VzXG4gICAgICAgIGZvY3VzZWRFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgICAgICAvLyBMaXN0ZW4gZm9yIGFuZCB0cmFwIHRoZSBrZXlib2FyZFxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdHJhcFRhYktleSk7XG5cbiAgICAgICAgLy8gRmluZCBhbGwgZm9jdXNhYmxlIGNoaWxkcmVuXG4gICAgICAgIGxldCBmb2N1c2FibGVFbGVtZW50c1N0cmluZyA9ICdhW2hyZWZdLCBhcmVhW2hyZWZdLCBpbnB1dDpub3QoW2Rpc2FibGVkXSksIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSwgYnV0dG9uOm5vdChbZGlzYWJsZWRdKSwgaWZyYW1lLCBvYmplY3QsIGVtYmVkLCBbdGFiaW5kZXg9XCIwXCJdLCBbY29udGVudGVkaXRhYmxlXSc7XG4gICAgICAgIGxldCBmb2N1c2FibGVFbGVtZW50cyA9IGxpc3RhLnF1ZXJ5U2VsZWN0b3JBbGwoZm9jdXNhYmxlRWxlbWVudHNTdHJpbmcpO1xuICAgICAgICAvLyBDb252ZXJ0IE5vZGVMaXN0IHRvIEFycmF5XG4gICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZm9jdXNhYmxlRWxlbWVudHMpO1xuXG4gICAgICAgIGxldCBmaXJzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1swXTtcbiAgICAgICAgbGV0IGxhc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIFxuICAgICAgICAvLyBGb2N1cyBmaXJzdCBjaGlsZFxuICAgICAgLy8gIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRyYXBUYWJLZXkoZSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBDaGVjayBmb3IgVEFCIGtleSBwcmVzc1xuICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0ga2V5W1wiaG9yaXpvbnRhbCB0YWJcIl0pIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBTSElGVCArIFRBQlxuICAgICAgICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBmaXJzdFRhYlN0b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXgtLTtcblxuICAgICAgICAgICAgICAgIC8vIFRBQlxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBsYXN0VGFiU3RvcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEVTQ0FQRVxuICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXlDb2RlID09PSBrZXlbXCJlc2NhcGVcIl0pIHtcbiAgICAgICAgICAgICAgZXhpdFRyYXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQVJST1cgRE9XTlxuICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXlDb2RlID09PSBrZXlbXCJkb3duXCJdKSB7XG4gICAgICAgICAgICAgICAgaWYoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJmb2N1c1wiKSkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGxhc3RUYWJTdG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzW2luZGV4KzFdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBBUlJPVyBVUFxuICAgICAgICAgICAgZWxzZSBpZiAoZS5rZXlDb2RlID09PSBrZXlbXCJ1cFwiXSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQudmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZm9jdXNcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RUYWJTdG9wLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBmaXJzdFRhYlN0b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IChmb2N1c2FibGVFbGVtZW50cy5sZW5ndGgtMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tpbmRleC0xXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gRU5URVJcbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PT0ga2V5W1wiZW50ZXJcIl0pIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgbGlzdGEucHJldmlvdXNTaWJsaW5nLnZhbHVlID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgICAgLy8gIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGV4aXRUcmFwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGV4aXRUcmFwKCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxpc3RhLnByZXZpb3VzU2libGluZy5mb2N1cygpO1xuICAgICAgICAgICAgXG4gICAgICAvKiAgICAgIGNvbnN0IGxpc3RBdXRvY29tcGxldGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpc3QtYXV0b2NvbXBsZXRlXCIpO1xuICAgICAgICAgICAgbGlzdEF1dG9jb21wbGV0ZS5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKXtcbiAgICAgICAgICAgICAgICBhW2ldLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSk7ICovXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIG1vZGFsIGFuZCBvdmVybGF5XG4gICAgICAgICAgICBsaXN0YS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLypcbi8vIFdpbGwgaG9sZCBwcmV2aW91c2x5IGZvY3VzZWQgZWxlbWVudFxuICAgICAgICBsZXQgZm9jdXNlZEVsZW1lbnRCZWZvcmVNb2RhbDtcblxuICAgICAgICAvLyBGaW5kIHRoZSBtb2RhbCBhbmQgaXRzIG92ZXJsYXlcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKTtcbiAgICAgICAgY29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLW92ZXJsYXknKTtcblxuICAgICAgICBjb25zdCBtb2RhbFRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC10b2dnbGUnKTtcbiAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Nb2RhbCk7XG5cbiAgICAgICAgZnVuY3Rpb24gb3Blbk1vZGFsKCkge1xuICAgICAgICAgICAgLy8gU2F2ZSBjdXJyZW50IGZvY3VzXG4gICAgICAgICAgICBmb2N1c2VkRWxlbWVudEJlZm9yZU1vZGFsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblxuICAgICAgICAgICAgLy8gTGlzdGVuIGZvciBhbmQgdHJhcCB0aGUga2V5Ym9hcmRcbiAgICAgICAgICAgIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0cmFwVGFiS2V5KTtcblxuICAgICAgICAgICAgLy8gTGlzdGVuIGZvciBpbmRpY2F0b3JzIHRvIGNsb3NlIHRoZSBtb2RhbFxuICAgICAgICAgICAgbW9kYWxPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VNb2RhbCk7XG5cbiAgICAgICAgICAgIC8vQ2xvc2UgbW9kYWxcbiAgICAgICAgICAgIGNvbnN0IGNsb3NlTW9kYWxCdXR0b24gPSBtb2RhbC5xdWVyeVNlbGVjdG9yKCcjY2xvc2UtbW9kYWwnKTtcbiAgICAgICAgICAgIGNsb3NlTW9kYWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsY2xvc2VNb2RhbCk7XG5cbiAgICAgICAgICAgIC8vIEZpbmQgYWxsIGZvY3VzYWJsZSBjaGlsZHJlblxuICAgICAgICAgICAgbGV0IGZvY3VzYWJsZUVsZW1lbnRzU3RyaW5nID0gJ2FbaHJlZl0sIGFyZWFbaHJlZl0sIGlucHV0Om5vdChbZGlzYWJsZWRdKSwgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSwgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLCBidXR0b246bm90KFtkaXNhYmxlZF0pLCBpZnJhbWUsIG9iamVjdCwgZW1iZWQsIFt0YWJpbmRleD1cIjBcIl0sIFtjb250ZW50ZWRpdGFibGVdJztcbiAgICAgICAgICAgIGxldCBmb2N1c2FibGVFbGVtZW50cyA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3JBbGwoZm9jdXNhYmxlRWxlbWVudHNTdHJpbmcpO1xuICAgICAgICAgICAgLy8gQ29udmVydCBOb2RlTGlzdCB0byBBcnJheVxuICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChmb2N1c2FibGVFbGVtZW50cyk7XG5cbiAgICAgICAgICAgIGxldCBmaXJzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1swXTtcbiAgICAgICAgICAgIGxldCBsYXN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzW2ZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgICAvLyBTaG93IHRoZSBtb2RhbCBhbmQgb3ZlcmxheVxuICAgICAgICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICBtb2RhbE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgICAgIC8vIEZvY3VzIGZpcnN0IGNoaWxkXG4gICAgICAgICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gdHJhcFRhYktleShlKSB7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIFRBQiBrZXkgcHJlc3NcbiAgICAgICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSA5KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gU0hJRlQgKyBUQUJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBmaXJzdFRhYlN0b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBUQUJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBsYXN0VGFiU3RvcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEVTQ0FQRVxuICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgICAgICAgICBjbG9zZU1vZGFsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHtcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIG1vZGFsIGFuZCBvdmVybGF5XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgbW9kYWxPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgICAgIC8vIFNldCBmb2N1cyBiYWNrIHRvIGVsZW1lbnQgdGhhdCBoYWQgaXQgYmVmb3JlIHRoZSBtb2RhbCB3YXMgb3BlbmVkXG4gICAgICAgICAgICBmb2N1c2VkRWxlbWVudEJlZm9yZU1vZGFsLmZvY3VzKCk7XG4gICAgICAgIH1cbiovIl0sImZpbGUiOiJ1dGlsaXR5X29sZDIuanMifQ==
