class Dialog {
    
    constructor(header = "Avviso", testo = null, auto = true) {
        
        //Parametri costruttore
        this.header = header;
        this.testo = testo;
        this.auto = auto;
        
        //Variabili interne
        this.backgroundAvviso = document.createElement("div");
        this.avviso = document.createElement("div");
        this.dialog = document.createElement("div");
        this.buttonCloseDialog = document.createElement("span");
        this.contentDialog = `<h2>${this.header}</h2>${this.testo}`;
        
        this.backgroundAvviso.classList.add("background-dialog");
        this.avviso.classList.add("container-dialog");
        this.dialog.classList.add("dialog");
        this.buttonCloseDialog.classList.add('close-dialog');
        this.buttonCloseDialog.setAttribute("tabindex","0");
        this.dialog.innerHTML = this.contentDialog;
        this.dialog.appendChild(this.buttonCloseDialog);
        this.avviso.appendChild(this.dialog);
        this.backgroundAvviso.appendChild(this.avviso);
        if(this.auto && this.testo != null) {
            document.body.appendChild(this.backgroundAvviso);
        }
        
        const backgroundAvviso = this.backgroundAvviso;
        this.buttonCloseDialog.addEventListener("click", function(event) {
            backgroundAvviso.classList.add("close");
        });
        
    }
    
    setHeader(header) {
        this.header = header;
        this.contentDialog = `<h2>${this.header}</h2>${this.testo}`;
        this.dialog.innerHTML = this.contentDialog;
    }
    
    setTesto(testo) {
        this.testo = testo;
        this.contentDialog = `<h2>${this.header}</h2>${this.testo}`;
        this.dialog.innerHTML = this.contentDialog;
    }
    
    setAuto(auto) {
        this.auto = auto;
    }
    
    open() {
        document.body.appendChild(this.backgroundAvviso);
        const backgroundAvviso = this.backgroundAvviso;
        backgroundAvviso.classList.remove("close");
        this.buttonCloseDialog.addEventListener("click", function(event) {
            backgroundAvviso.classList.add("close");
        });
    }
    
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ1dGlsaXR5X29sZC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBEaWFsb2cge1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKGhlYWRlciA9IFwiQXZ2aXNvXCIsIHRlc3RvID0gbnVsbCwgYXV0byA9IHRydWUpIHtcbiAgICAgICAgXG4gICAgICAgIC8vUGFyYW1ldHJpIGNvc3RydXR0b3JlXG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICB0aGlzLnRlc3RvID0gdGVzdG87XG4gICAgICAgIHRoaXMuYXV0byA9IGF1dG87XG4gICAgICAgIFxuICAgICAgICAvL1ZhcmlhYmlsaSBpbnRlcm5lXG4gICAgICAgIHRoaXMuYmFja2dyb3VuZEF2dmlzbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuYXZ2aXNvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy5kaWFsb2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLmJ1dHRvbkNsb3NlRGlhbG9nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIHRoaXMuY29udGVudERpYWxvZyA9IGA8aDI+JHt0aGlzLmhlYWRlcn08L2gyPiR7dGhpcy50ZXN0b31gO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQXZ2aXNvLmNsYXNzTGlzdC5hZGQoXCJiYWNrZ3JvdW5kLWRpYWxvZ1wiKTtcbiAgICAgICAgdGhpcy5hdnZpc28uY2xhc3NMaXN0LmFkZChcImNvbnRhaW5lci1kaWFsb2dcIik7XG4gICAgICAgIHRoaXMuZGlhbG9nLmNsYXNzTGlzdC5hZGQoXCJkaWFsb2dcIik7XG4gICAgICAgIHRoaXMuYnV0dG9uQ2xvc2VEaWFsb2cuY2xhc3NMaXN0LmFkZCgnY2xvc2UtZGlhbG9nJyk7XG4gICAgICAgIHRoaXMuYnV0dG9uQ2xvc2VEaWFsb2cuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIixcIjBcIik7XG4gICAgICAgIHRoaXMuZGlhbG9nLmlubmVySFRNTCA9IHRoaXMuY29udGVudERpYWxvZztcbiAgICAgICAgdGhpcy5kaWFsb2cuYXBwZW5kQ2hpbGQodGhpcy5idXR0b25DbG9zZURpYWxvZyk7XG4gICAgICAgIHRoaXMuYXZ2aXNvLmFwcGVuZENoaWxkKHRoaXMuZGlhbG9nKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQXZ2aXNvLmFwcGVuZENoaWxkKHRoaXMuYXZ2aXNvKTtcbiAgICAgICAgaWYodGhpcy5hdXRvICYmIHRoaXMudGVzdG8gIT0gbnVsbCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRBdnZpc28pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBiYWNrZ3JvdW5kQXZ2aXNvID0gdGhpcy5iYWNrZ3JvdW5kQXZ2aXNvO1xuICAgICAgICB0aGlzLmJ1dHRvbkNsb3NlRGlhbG9nLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgYmFja2dyb3VuZEF2dmlzby5jbGFzc0xpc3QuYWRkKFwiY2xvc2VcIik7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICB9XG4gICAgXG4gICAgc2V0SGVhZGVyKGhlYWRlcikge1xuICAgICAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcbiAgICAgICAgdGhpcy5jb250ZW50RGlhbG9nID0gYDxoMj4ke3RoaXMuaGVhZGVyfTwvaDI+JHt0aGlzLnRlc3RvfWA7XG4gICAgICAgIHRoaXMuZGlhbG9nLmlubmVySFRNTCA9IHRoaXMuY29udGVudERpYWxvZztcbiAgICB9XG4gICAgXG4gICAgc2V0VGVzdG8odGVzdG8pIHtcbiAgICAgICAgdGhpcy50ZXN0byA9IHRlc3RvO1xuICAgICAgICB0aGlzLmNvbnRlbnREaWFsb2cgPSBgPGgyPiR7dGhpcy5oZWFkZXJ9PC9oMj4ke3RoaXMudGVzdG99YDtcbiAgICAgICAgdGhpcy5kaWFsb2cuaW5uZXJIVE1MID0gdGhpcy5jb250ZW50RGlhbG9nO1xuICAgIH1cbiAgICBcbiAgICBzZXRBdXRvKGF1dG8pIHtcbiAgICAgICAgdGhpcy5hdXRvID0gYXV0bztcbiAgICB9XG4gICAgXG4gICAgb3BlbigpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJhY2tncm91bmRBdnZpc28pO1xuICAgICAgICBjb25zdCBiYWNrZ3JvdW5kQXZ2aXNvID0gdGhpcy5iYWNrZ3JvdW5kQXZ2aXNvO1xuICAgICAgICBiYWNrZ3JvdW5kQXZ2aXNvLmNsYXNzTGlzdC5yZW1vdmUoXCJjbG9zZVwiKTtcbiAgICAgICAgdGhpcy5idXR0b25DbG9zZURpYWxvZy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGJhY2tncm91bmRBdnZpc28uY2xhc3NMaXN0LmFkZChcImNsb3NlXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG59Il0sImZpbGUiOiJ1dGlsaXR5X29sZC5qcyJ9
