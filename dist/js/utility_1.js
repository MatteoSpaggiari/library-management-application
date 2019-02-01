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
               });
            });
            KeyboardTrap.autocomplete(listaAutori);
            
        }).catch(function(error){
            console.log(error);
        });
    }
}


class KeyboardTrap {
    
    static autocomplete(elem) {
        // Will hold previously focused element
        let focusedElement;

        // Save current focus
        focusedElement = document.activeElement;

        // Listen for and trap the keyboard
        elem.addEventListener('keydown', trapTabKey);

        // Find all focusable children
        let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
        let focusableElements = elem.querySelectorAll(focusableElementsString);
        // Convert NodeList to Array
        focusableElements = Array.prototype.slice.call(focusableElements);

        let firstTabStop = focusableElements[0];
        let lastTabStop = focusableElements[focusableElements.length - 1];
        let index = 0;
        
        // Focus first child
        firstTabStop.focus();

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
                elem.value = document.activeElement.textContent;
              //  elem.removeEventListener("keyup", this);
                exitTrap();
            } else {
                
            }
        }
        
        function exitTrap() {
            
            index = 0;
            
            const listAutocomplete = document.querySelectorAll(".list-autocomplete");
            listAutocomplete.forEach(function(v,i,a){
                a[i].remove();
            });
            
            // Hide the modal and overlay
            elem.style.display = "none";

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlsaXR5XzEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gTWFwcGF0dXJhIGNhcmF0dGVyaSB0YXN0aWVyYVxubGV0IGtleSA9IFtdO1xua2V5W1wiYmFja3NwYWNlXCJdID0gODtcbmtleVtcImhvcml6b250YWwgdGFiXCJdID0gOTtcbmtleVtcImVudGVyXCJdID0gMTM7XG5rZXlbXCJlc2NhcGVcIl0gPSAyNztcbmtleVtcImRlbGV0ZVwiXSA9IDEyNztcbmtleVtcInNwYWNlXCJdID0gMzI7XG5rZXlbXCJleGNsYW1hdGlvbiBtYXJrXCJdID0gMzM7IC8vICFcbmtleVtcInF1b3RhdGlvbiBtYXJrXCJdID0gMzQ7IC8vIFwiXG5rZXlbXCJudW1iZXIgc2lnblwiXSA9IDM1OyAvLyAjXG5rZXlbXCJkb2xsYXIgc2lnblwiXSA9IDM2OyAvLyAkXG5rZXlbXCJwZXJjZW50IHNpZ25cIl0gPSAzNzsgLy8gJVxua2V5W1wiYW1wZXJzYW5kXCJdID0gMzg7IC8vICZcbmtleVtcImFwb3N0cm9waGVcIl0gPSAzOTsgLy8gJ1xua2V5W1wic29saWR1c1wiXSA9IDQ3OyAvLyAvXG5rZXlbXCJyZXZlcnNlIHNvbGlkdXNcIl0gPSA5MjsgLy8gXFxcbmtleVtcImxlZnRcIl0gPSAzNztcbmtleVtcInVwXCJdID0gMzg7XG5rZXlbXCJyaWdodFwiXSA9IDM5O1xua2V5W1wiZG93blwiXSA9IDQwO1xuXG5jbGFzcyBEaWFsb2cge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGhlYWRlciA9IFwiQXZ2aXNvXCIsIHRlc3RvID0gbnVsbCwgYXV0byA9IHRydWUpIHtcbiAgICAgICAgXG4gICAgICAgIC8vUGFyYW1ldHJpIGNvc3RydXR0b3JlXG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICB0aGlzLnRlc3RvID0gdGVzdG87XG4gICAgICAgIHRoaXMuYXV0byA9IGF1dG87XG4gICAgICAgIFxuICAgICAgICAvL0VsaW1pbm8gbGUgcHJlY2VkZW50aSBEaWFsb2dcbiAgICAgICAgY29uc3QgZXhpc3RpbmdEaWFsb2dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5iYWNrZ3JvdW5kLWRpYWxvZ1wiKTtcbiAgICAgICAgaWYoZXhpc3RpbmdEaWFsb2dzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGV4aXN0aW5nRGlhbG9ncy5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKXtcbiAgICAgICAgICAgICAgIGFbaV0ucmVtb3ZlKCk7IFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvL1ZhcmlhYmlsaSBpbnRlcm5lXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZEF2dmlzbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZEF2dmlzby5jbGFzc0xpc3QuYWRkKFwiYmFja2dyb3VuZC1kaWFsb2dcIik7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZEF2dmlzby5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImNvbnRhaW5lci1kaWFsb2dcIj48ZGl2IGNsYXNzPVwiZGlhbG9nXCI+PGgyPiR7dGhpcy5oZWFkZXJ9PC9oMj4ke3RoaXMudGVzdG99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwiY2xvc2UtZGlhbG9nXCIgY2xhc3M9XCJjbG9zZS1kaWFsb2dcIiB0YWJpbmRleD1cIjBcIj48L3NwYW4+PC9kaXY+PC9kaXY+YDtcbiAgICAgICAgaWYodGhpcy5hdXRvICYmIHRoaXMudGVzdG8gIT0gbnVsbCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRBdnZpc28pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBidXR0b25DbG9zZURpYWxvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2UtZGlhbG9nXCIpO1xuICAgICAgICAgICAgY29uc3QgYmFja2dyb3VuZEF2dmlzbyA9IHRoaXMuYmFja2dyb3VuZEF2dmlzbztcbiAgICAgICAgICAgIGJ1dHRvbkNsb3NlRGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgIGJhY2tncm91bmRBdnZpc28uY2xhc3NMaXN0LmFkZChcImNsb3NlXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgc2V0SGVhZGVyKGhlYWRlcikge1xuICAgICAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQXZ2aXNvLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWRpYWxvZ1wiPjxkaXYgY2xhc3M9XCJkaWFsb2dcIj48aDI+JHt0aGlzLmhlYWRlcn08L2gyPiR7dGhpcy50ZXN0b30ke3RoaXMuYnV0dG9uQ2xvc2VEaWFsb2d9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwiY2xvc2UtZGlhbG9nXCIgY2xhc3M9XCJjbG9zZS1kaWFsb2dcIiB0YWJpbmRleD1cIjBcIj48L3NwYW4+PC9kaXY+PC9kaXY+YDtcbiAgICB9XG4gICAgXG4gICAgc2V0VGVzdG8odGVzdG8pIHtcbiAgICAgICAgdGhpcy50ZXN0byA9IHRlc3RvO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRBdnZpc28uaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjb250YWluZXItZGlhbG9nXCI+PGRpdiBjbGFzcz1cImRpYWxvZ1wiPjxoMj4ke3RoaXMuaGVhZGVyfTwvaDI+JHt0aGlzLnRlc3RvfSR7dGhpcy5idXR0b25DbG9zZURpYWxvZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCJjbG9zZS1kaWFsb2dcIiBjbGFzcz1cImNsb3NlLWRpYWxvZ1wiIHRhYmluZGV4PVwiMFwiPjwvc3Bhbj48L2Rpdj48L2Rpdj5gO1xuICAgIH1cbiAgICBcbiAgICBzZXRBdXRvKGF1dG8pIHtcbiAgICAgICAgdGhpcy5hdXRvID0gYXV0bztcbiAgICB9XG4gICAgXG4gICAgb3BlbigpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRBdnZpc28pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYnV0dG9uQ2xvc2VEaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlLWRpYWxvZ1wiKTtcbiAgICAgICAgY29uc3QgYmFja2dyb3VuZEF2dmlzbyA9IHRoaXMuYmFja2dyb3VuZEF2dmlzbztcbiAgICAgICAgYnV0dG9uQ2xvc2VEaWFsb2cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQXZ2aXNvLmNsYXNzTGlzdC5hZGQoXCJjbG9zZVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cbmNsYXNzIEF1dG9jb21wbGV0ZSB7XG4gICAgXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCx1cmwsZXZlbnQpIHtcbiAgICBcbiAgICAgICAgY29uc3QgbGlzdGFBdXRvcmVQcmVjZWRlbnRpID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5saXN0LWF1dG9jb21wbGV0ZVwiKTtcbiAgICAgICAgbGlzdGFBdXRvcmVQcmVjZWRlbnRpLmZvckVhY2goZnVuY3Rpb24odixpLGEpe1xuICAgICAgICAgICAgYVtpXS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZldGNoKHVybCkudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKGF1dG9yaSkge1xuICAgICAgICAgICAgbGV0IGxpc3RhID0gXCJcIjtcbiAgICAgICAgICAgIGF1dG9yaS5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhW2ldKTtcbiAgICAgICAgICAgICAgICBsaXN0YSArPSAnPGxpIGNsYXNzPVwiYXV0b2NvbXBsZXRlLWl0ZW1cIiB0YWJpbmRleD1cIjBcIj4nK2FbaV0rJzwvbGk+JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobGlzdGEpO1xuICAgICAgICAgICAgY29uc3QgbGlzdGFBdXRvcmkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICAgICAgICBsaXN0YUF1dG9yaS5jbGFzc0xpc3QuYWRkKFwibGlzdC1hdXRvY29tcGxldGVcIik7XG4gICAgICAgICAgICBsaXN0YUF1dG9yaS5zdHlsZS53aWR0aCA9IChlbGVtZW50Lm9mZnNldFdpZHRoLTE2KStcInB4XCI7XG4gICAgICAgICAgICBsaXN0YUF1dG9yaS5pbm5lckhUTUwgPSBsaXN0YTtcbiAgICAgICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIjtcbiAgICAgICAgICAgIGVsZW1lbnQucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChsaXN0YUF1dG9yaSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhdXRvcmkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBpdGVtTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXV0b2NvbXBsZXRlLWl0ZW1cIik7XG4gICAgICAgICAgICBpdGVtTGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKXtcbiAgICAgICAgICAgICAgIGFbaV0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgICAgICAgICBsZXQgdGVzdG8gPSBhW2ldLnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSB0ZXN0bztcbiAgICAgICAgICAgICAgICAgICBsaXN0YUF1dG9yaS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgS2V5Ym9hcmRUcmFwLmF1dG9jb21wbGV0ZShsaXN0YUF1dG9yaSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cblxuY2xhc3MgS2V5Ym9hcmRUcmFwIHtcbiAgICBcbiAgICBzdGF0aWMgYXV0b2NvbXBsZXRlKGVsZW0pIHtcbiAgICAgICAgLy8gV2lsbCBob2xkIHByZXZpb3VzbHkgZm9jdXNlZCBlbGVtZW50XG4gICAgICAgIGxldCBmb2N1c2VkRWxlbWVudDtcblxuICAgICAgICAvLyBTYXZlIGN1cnJlbnQgZm9jdXNcbiAgICAgICAgZm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgICAgIC8vIExpc3RlbiBmb3IgYW5kIHRyYXAgdGhlIGtleWJvYXJkXG4gICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRyYXBUYWJLZXkpO1xuXG4gICAgICAgIC8vIEZpbmQgYWxsIGZvY3VzYWJsZSBjaGlsZHJlblxuICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudHNTdHJpbmcgPSAnYVtocmVmXSwgYXJlYVtocmVmXSwgaW5wdXQ6bm90KFtkaXNhYmxlZF0pLCBzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLCB0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSksIGJ1dHRvbjpub3QoW2Rpc2FibGVkXSksIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgW3RhYmluZGV4PVwiMFwiXSwgW2NvbnRlbnRlZGl0YWJsZV0nO1xuICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudHMgPSBlbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoZm9jdXNhYmxlRWxlbWVudHNTdHJpbmcpO1xuICAgICAgICAvLyBDb252ZXJ0IE5vZGVMaXN0IHRvIEFycmF5XG4gICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZm9jdXNhYmxlRWxlbWVudHMpO1xuXG4gICAgICAgIGxldCBmaXJzdFRhYlN0b3AgPSBmb2N1c2FibGVFbGVtZW50c1swXTtcbiAgICAgICAgbGV0IGxhc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV07XG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIFxuICAgICAgICAvLyBGb2N1cyBmaXJzdCBjaGlsZFxuICAgICAgICBmaXJzdFRhYlN0b3AuZm9jdXMoKTtcblxuICAgICAgICBmdW5jdGlvbiB0cmFwVGFiS2V5KGUpIHtcbiAgICAgICAgICAgIC8vIENoZWNrIGZvciBUQUIga2V5IHByZXNzXG4gICAgICAgICAgICBpZiAoZS5rZXlDb2RlID09PSBrZXlbXCJob3Jpem9udGFsIHRhYlwiXSkge1xuXG4gICAgICAgICAgICAgICAgLy8gU0hJRlQgKyBUQUJcbiAgICAgICAgICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZmlyc3RUYWJTdG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYXN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4LS07XG5cbiAgICAgICAgICAgICAgICAvLyBUQUJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gbGFzdFRhYlN0b3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBFU0NBUEVcbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PT0ga2V5W1wiZXNjYXBlXCJdKSB7XG4gICAgICAgICAgICAgIGV4aXRUcmFwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEFSUk9XIERPV05cbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PT0ga2V5W1wiZG93blwiXSkge1xuICAgICAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBsYXN0VGFiU3RvcCkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50c1tpbmRleCsxXS5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQVJST1cgVVBcbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PT0ga2V5W1widXBcIl0pIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZmlyc3RUYWJTdG9wKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFRhYlN0b3AuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAoZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoLTEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudHNbaW5kZXgtMV0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEVOVEVSXG4gICAgICAgICAgICBlbHNlIGlmIChlLmtleUNvZGUgPT09IGtleVtcImVudGVyXCJdKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGVsZW0udmFsdWUgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50LnRleHRDb250ZW50O1xuICAgICAgICAgICAgICAvLyAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcyk7XG4gICAgICAgICAgICAgICAgZXhpdFRyYXAoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGV4aXRUcmFwKCkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGxpc3RBdXRvY29tcGxldGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpc3QtYXV0b2NvbXBsZXRlXCIpO1xuICAgICAgICAgICAgbGlzdEF1dG9jb21wbGV0ZS5mb3JFYWNoKGZ1bmN0aW9uKHYsaSxhKXtcbiAgICAgICAgICAgICAgICBhW2ldLnJlbW92ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIG1vZGFsIGFuZCBvdmVybGF5XG4gICAgICAgICAgICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKlxuLy8gV2lsbCBob2xkIHByZXZpb3VzbHkgZm9jdXNlZCBlbGVtZW50XG4gICAgICAgIGxldCBmb2N1c2VkRWxlbWVudEJlZm9yZU1vZGFsO1xuXG4gICAgICAgIC8vIEZpbmQgdGhlIG1vZGFsIGFuZCBpdHMgb3ZlcmxheVxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbCcpO1xuICAgICAgICBjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtb3ZlcmxheScpO1xuXG4gICAgICAgIGNvbnN0IG1vZGFsVG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsLXRvZ2dsZScpO1xuICAgICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk1vZGFsKTtcblxuICAgICAgICBmdW5jdGlvbiBvcGVuTW9kYWwoKSB7XG4gICAgICAgICAgICAvLyBTYXZlIGN1cnJlbnQgZm9jdXNcbiAgICAgICAgICAgIGZvY3VzZWRFbGVtZW50QmVmb3JlTW9kYWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgICAgICAgICAvLyBMaXN0ZW4gZm9yIGFuZCB0cmFwIHRoZSBrZXlib2FyZFxuICAgICAgICAgICAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRyYXBUYWJLZXkpO1xuXG4gICAgICAgICAgICAvLyBMaXN0ZW4gZm9yIGluZGljYXRvcnMgdG8gY2xvc2UgdGhlIG1vZGFsXG4gICAgICAgICAgICBtb2RhbE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZU1vZGFsKTtcblxuICAgICAgICAgICAgLy9DbG9zZSBtb2RhbFxuICAgICAgICAgICAgY29uc3QgY2xvc2VNb2RhbEJ1dHRvbiA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZS1tb2RhbCcpO1xuICAgICAgICAgICAgY2xvc2VNb2RhbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixjbG9zZU1vZGFsKTtcblxuICAgICAgICAgICAgLy8gRmluZCBhbGwgZm9jdXNhYmxlIGNoaWxkcmVuXG4gICAgICAgICAgICBsZXQgZm9jdXNhYmxlRWxlbWVudHNTdHJpbmcgPSAnYVtocmVmXSwgYXJlYVtocmVmXSwgaW5wdXQ6bm90KFtkaXNhYmxlZF0pLCBzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLCB0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSksIGJ1dHRvbjpub3QoW2Rpc2FibGVkXSksIGlmcmFtZSwgb2JqZWN0LCBlbWJlZCwgW3RhYmluZGV4PVwiMFwiXSwgW2NvbnRlbnRlZGl0YWJsZV0nO1xuICAgICAgICAgICAgbGV0IGZvY3VzYWJsZUVsZW1lbnRzID0gbW9kYWwucXVlcnlTZWxlY3RvckFsbChmb2N1c2FibGVFbGVtZW50c1N0cmluZyk7XG4gICAgICAgICAgICAvLyBDb252ZXJ0IE5vZGVMaXN0IHRvIEFycmF5XG4gICAgICAgICAgICBmb2N1c2FibGVFbGVtZW50cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGZvY3VzYWJsZUVsZW1lbnRzKTtcblxuICAgICAgICAgICAgbGV0IGZpcnN0VGFiU3RvcCA9IGZvY3VzYWJsZUVsZW1lbnRzWzBdO1xuICAgICAgICAgICAgbGV0IGxhc3RUYWJTdG9wID0gZm9jdXNhYmxlRWxlbWVudHNbZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMV07XG5cbiAgICAgICAgICAgIC8vIFNob3cgdGhlIG1vZGFsIGFuZCBvdmVybGF5XG4gICAgICAgICAgICBtb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgICAgIG1vZGFsT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgICAgICAgICAgLy8gRm9jdXMgZmlyc3QgY2hpbGRcbiAgICAgICAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiB0cmFwVGFiS2V5KGUpIHtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBmb3IgVEFCIGtleSBwcmVzc1xuICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDkpIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBTSElGVCArIFRBQlxuICAgICAgICAgICAgICAgICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGZpcnN0VGFiU3RvcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRBQlxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGxhc3RUYWJTdG9wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0VGFiU3RvcC5mb2N1cygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gRVNDQVBFXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xuICAgICAgICAgICAgLy8gSGlkZSB0aGUgbW9kYWwgYW5kIG92ZXJsYXlcbiAgICAgICAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBtb2RhbE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICAgICAgLy8gU2V0IGZvY3VzIGJhY2sgdG8gZWxlbWVudCB0aGF0IGhhZCBpdCBiZWZvcmUgdGhlIG1vZGFsIHdhcyBvcGVuZWRcbiAgICAgICAgICAgIGZvY3VzZWRFbGVtZW50QmVmb3JlTW9kYWwuZm9jdXMoKTtcbiAgICAgICAgfVxuKi8iXSwiZmlsZSI6InV0aWxpdHlfMS5qcyJ9
